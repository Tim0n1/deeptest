import { useState } from 'react'
import './App.css'

import { ModelProvider } from "./context/ModelContext";
import UploadModel from "./components/UploadModel";


function App() {
  return (
    <ModelProvider>
      <div className='title'>
      <h1 
  onClick={() => window.location.reload()} 
  style={{ 
    cursor: "pointer",  
    display: "inline-block" 
  }}
>
  deepTest
</h1>
      </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <UploadModel />
      </div>
    </ModelProvider>
  );
}

export default App;
