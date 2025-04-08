import React, { useEffect } from "react";

function Bot() {
  useEffect(() => {
    const injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    document.body.appendChild(injectScript);

    const botScript = document.createElement("script");
    botScript.src = "https://files.bpcontent.cloud/2025/01/16/21/20250116213103-E0AOKJLX.js";
    document.body.appendChild(botScript);

    return () => {
      document.body.removeChild(injectScript);
      document.body.removeChild(botScript);
    };
  }, []);

  return null;
}

export default Bot;