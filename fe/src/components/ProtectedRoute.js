import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-gray-100 p-2">
      {/* header */}
      <div className="flex justify-between p-5 bg-sky-900 rounded">
        <div className="flex items-center gap-1">
          <i className=" text-2xl text-white"></i>
          <h1
            className="text-white text-2xl uppercase font-bold cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Chat With Books
          </h1>
        </div>
      </div>
      {/* content (pages) */}
      <div className="py-5">{children}</div>
    </div>
  );
}
export default ProtectedRoute;
