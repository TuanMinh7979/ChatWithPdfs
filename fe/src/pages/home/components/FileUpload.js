import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { uploadFiles } from '../../../service/api/chats';
import { HideLoader, ShowLoader } from '../../../redux/loaderSlice';
const FileUploadButton = () => {
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const handleUpload = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const formData = new FormData();
    const newFileNames = [];
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
      newFileNames.push(files[i].name);
    }
    dispatch(ShowLoader())
    await uploadFiles(formData)
    dispatch(HideLoader())
    setUploadedFiles([...uploadedFiles, ...newFileNames]);
  };
  return (
    <div className="p-4 border bg-white rounded-2xl shadow-md relative">
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        multiple
      />
      <button
        onClick={handleUpload}
        className={`border border-slate-400 border-2 text-lime-300 text-white px-4 py-2 rounded-md hover:bg-slate-800`}
      >
        Upload Files
      </button>
      <div id="files-board" className="p- flex flex-col gap-3 mt-5  shadow-sm border p-2 rounded-xl bg-white cursor-pointer w-full" style={{ minHeight: '460px', overflowY: 'auto' }}>
        {uploadedFiles.length > 0 && (
          <div className="mt-2">
            <ul>
              {uploadedFiles.map((fileName, index) => (
                <li key={index}>{fileName}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default FileUploadButton;
