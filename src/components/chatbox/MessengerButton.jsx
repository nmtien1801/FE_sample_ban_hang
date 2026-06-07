import React from 'react';

const MessengerButton = () => {
  const messengerUrl = "https://m.me/508948142310781";

  return (
    <div className="fixed bottom-28 right-13 z-50 flex items-center group">
      {/* Nút tròn Messenger */}
      <a
        href={messengerUrl}
        target="_blank"
        rel="noreferrer"
        className="bg-[#0084ff] p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 
                   transition-all duration-200 ease-in-out flex items-center justify-center shrink-0"
        aria-label="Chat with us on Messenger"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.463 5.483 3.753 7.104V22l3.477-1.908c.87.241 1.79.37 2.77.37 5.523 0 10-4.145 10-9.258S17.523 2 12 2zm1.09 12.396l-2.55-2.724-4.978 2.724 5.476-5.814 2.614 2.724 4.914-2.724-5.476 5.814z" />
        </svg>
      </a>
    </div>
  );
};

export default MessengerButton;