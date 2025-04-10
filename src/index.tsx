import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from '../src/components/ChatWidget';
import ChatWidgets from './components/ChatWidget/index'
import widgetConfig from "./constants/config";

// Create and export a global function to render the widget for embedding purposes
export const initializeChatWidget = () => {
    console.log('Initializing chat widget...');
    const div = document.createElement('div');
    div.id = widgetConfig.divId;
    div.style.position = 'fixed';
    div.style.bottom = '20px';
    div.style.right = '20px';
    div.style.zIndex = '1000';
    document.body.appendChild(div);


    // For React 18+, use createRoot instead of ReactDOM.render
    const root = ReactDOM.createRoot(div);
    root.render(<ChatWidgets />);
  };
  
  if (typeof window !== 'undefined') {
    window.onload = () => {
      console.log('Window loaded, initializing widget...');
      initializeChatWidget();
    };
  }
