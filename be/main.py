from fastapi import FastAPI, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain_pinecone import PineconeVectorStore
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.vectorstores import Pinecone 
from dotenv import load_dotenv
import fitz  # PyMuPDF
import os
from typing import List
load_dotenv()
index_name=os.getenv('PINECONE_INDEX_NAME')
def load_text_from_pdf(pdf_file: UploadFile):
    text=""
    with open(pdf_file.filename, "wb") as buffer:
        buffer.write(pdf_file.file.read())
        pdf_document = fitz.open(pdf_file.filename)
        num_pages = pdf_document.page_count
        for page_num in range(num_pages):
            page = pdf_document.load_page(page_num)
            text+= page.get_text()
    return text          
def get_text_chunks(text):
    text_spliter= CharacterTextSplitter(separator="\n", 
                                        chunk_size= 500,
                                        chunk_overlap= 100, 
                                        length_function= len)
    chunks = text_spliter.split_text(text)
    return chunks 
# RESOURCE
conversation_chain=None
llm = ChatOpenAI()
embeddings = OpenAIEmbeddings()
pinecone_vectorstore = PineconeVectorStore(index_name=index_name, embedding=embeddings)
#Prompt
template = """<|im_start|>system\nSử dụng tài liệu sau đây để trả lời câu hỏi. Nếu câu hỏi không liên quan đến tài liệu, hãy nói "Tôi không biết", đừng cố tạo ra câu trả lời\n
    {context}<|im_end|>\n<|im_start|>user\n{question}<|im_end|>\n<|im_start|>assistant"""
prompt = PromptTemplate(template = template, input_variables=["context", "question"])
#Chain
llm_chain = RetrievalQA.from_chain_type(
        llm = llm,
        chain_type= "stuff",
        retriever = pinecone_vectorstore.as_retriever(search_kwargs = {"k":3}, max_tokens_limit=1024),
        return_source_documents = True,
        chain_type_kwargs= {'prompt': prompt}
    )
# API
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 
@app.get("/")
async def root():
    return {"message": "Hi There!"}
@app.post("/uploadfile")
async def create_upload_file(files: List[UploadFile]):
    for file in files:
        if file.filename.endswith(".pdf"):
            text= load_text_from_pdf(file)
        
            if text:
                chunks =  get_text_chunks(text)
                Pinecone.from_texts(chunks, OpenAIEmbeddings(), index_name=index_name)
                if os.path.exists(file.filename):
                    os.remove(file.filename)         
    return {"msg":"Success"}
 
    
    
@app.post("/ask")
async def ask_question(request: Request):
    body = await request.json()
    
    if body:
        print(body.get("question"))
        response= llm_chain.invoke({"query": body.get("question")})
        return {"answer": response}
    else:
         raise HTTPException(status_code=400, detail="Request body cannot be empty")
    
