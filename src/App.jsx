import React, { useEffect, useRef, useState } from "react";
import RouterRoot from "./routes/RouterRoot.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessengerButton from "./components/chatbox/MessengerButton.jsx";
import ZaloBot from "./components/chatbox/zaloBot.jsx";

function App() {
  return (
    <>
      <RouterRoot />
      <ZaloBot />
      <MessengerButton />
      <ToastContainer
        position="top-right"
        autoClose={2000} // tự đóng sau 2 giây
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
