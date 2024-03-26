import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../../service/api/chats";
import { addOne } from "../../../redux/messageSlice";
import TypingIndicator from "./TypingIndicator";
import chatIcon from "../../../assets/imgs/AiChatBot.png";
import userIcon from "../../../assets/imgs/user.png";
function ChatBoard() {
  const messageStore = useSelector(state => state.messageReducer)
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const sendNewMessage = async () => {
    dispatch(addOne({ user: "User", text: newMessage }))
    setShowTyping(true)
    const data = await addQuestion({ question: newMessage })
    setShowTyping(false)
    dispatch(addOne({ user: "AIChatBot", text: data?.answer?.result }))
  };
  useEffect(() => {
    // always scroll to bottom for messages id
    const messagesContainer = document.getElementById("messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [messageStore.allMessages]);
  return (
    <div className="bg-white h-[82vh] border rounded-2xl w-full flex flex-col justify-between p-5">

      <div className="h-[55vh] overflow-y-scroll p-5" id="messages">
        <div className="flex flex-col gap-2">
          {messageStore.allMessages.map((message, index) => {
            const isCurrentUserIsSender = message.user === "User";
            return (
              <div className={`flex`}>
                {<div className="p-2">
                  <img
                    src={isCurrentUserIsSender ? userIcon : chatIcon}
                    alt="profile pic"
                    className="w-[30px] h-[30px] min-w-[30px] "
                  />
                </div>}
                <div className="flex flex-col gap-1">
                  {message.text && (
                    <h1
                      className={`${isCurrentUserIsSender
                        ? "bg-sky-300 text-primary rounded-bl-none"
                        : "bg-gray-300 text-primary rounded-tr-none"
                        } p-2 rounded-xl`}
                    >
                      {message.text}
                    </h1>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {showTyping && <TypingIndicator />}
      </div>
      {/* 3rd part chat input */}
      <div className="h-18 rounded-xl border-gray-300 shadow border flex justify-between p-2 items-center relative">
        <input
          type="text"
          placeholder="Type a message"
          className="w-[90%] border-0 h-full rounded-xl focus:border-none"
          value={newMessage}
          onChange={(e) => {
        
            setNewMessage(e.target.value);
          }}
        />
        <button
          className={`bg-sky-600 text-white py-1 px-5 rounded h-max hover:bg-slate-800 ${showTyping || !newMessage ? 'disabled:bg-gray-400 disabled:cursor-not-allowed opacity-50' : ''}`}
          onClick={() => sendNewMessage()}
          disabled={showTyping || !newMessage}
        >
          <i className="ri-send-plane-2-line text-lime-300"></i>
        </button>
      </div>
    </div>
  );
}
export default ChatBoard;
