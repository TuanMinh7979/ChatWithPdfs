import React from "react";
import ChatBoard from "./components/ChatBoard";
import FileUpload from "./components/FileUpload";
function Home() {
  return (
    <div className="flex gap-5">
      <div className="w-1/4">
        <FileUpload />
      </div>
      <div className="w-full">
        <ChatBoard />
      </div>
    </div>
  );
}
export default Home;
