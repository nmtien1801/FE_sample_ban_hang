import React, { useEffect } from 'react';

const ZaloChatWidget = () => {
  useEffect(() => {
    // Tải SDK của Zalo
    const script = document.createElement('script');
    script.src = "https://sp.zalo.me/plugins/sdk.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Dọn dẹp script khi component bị unmount (tùy chọn)
      document.body.removeChild(script);
    };
  }, []);

  return (
    // Render widget theo đúng data-oaid của bạn
    <div
      className="zalo-chat-widget"
      data-oaid="1419288093834659177"
      data-welcome-message="Rất vui khi được hỗ trợ bạn!"
      data-autopopup="0"
      data-width=""
      data-height=""
    ></div>
  );
};

export default ZaloChatWidget;