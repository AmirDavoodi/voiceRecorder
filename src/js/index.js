import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById('voiceRecorder');
const root = createRoot(container); 
root.render(<h1>I am React App!</h1>)