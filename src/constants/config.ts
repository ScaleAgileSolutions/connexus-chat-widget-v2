function generateSourceIdFromURL(): string {
    const url = window.location.origin;
    return btoa(url); // Simple base64 encoding; swap for SHA if you want stronger obfuscation
  }
  
  const scriptTag = document.currentScript as HTMLScriptElement | null;
  
  const widgetConfig = {
    sourceId:
    scriptTag?.getAttribute("data-source-id") || generateSourceIdFromURL(),
    agentId: scriptTag?.getAttribute("data-agent-id") || "",
    agentName: scriptTag?.getAttribute("data-agent-name") || "ConnexUSVRep",
    divId: scriptTag?.getAttribute("data-div-id") || "ConnexUSVRep-chat",
  };
  
  // Optional: attach globally if needed
  if (typeof window !== "undefined") {
    window.connexVRepConfig = {
      ...window.connexVRepConfig,
      ...widgetConfig,
    };
  }
  
  export default widgetConfig;