import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModel } from "../context/ModelContext";
import "./ModelDashboard.css";

function ModelDashboard() {
  const { model } = useModel();
  const navigate = useNavigate();
  const [modelSummary, setModelSummary] = useState("");

  function getLinearRegions(){
    
  }

  useEffect(() => {
    if (model) {
      const originalConsoleLog = console.log;
      let logOutput = "";

      console.log = (...args) => {
        logOutput += args.join(" ") + "\n";
        originalConsoleLog.apply(console, args);
      };

      model.summary();
      console.log = originalConsoleLog;
      setModelSummary(logOutput);
    }
  }, [model]);

  return (
    <div className="container">
      <p>Your model is ready for testing and inference.</p>
      <div className="model-features">
        <h1>feature1</h1>
        <h1>feature2</h1>
        <h1>feature3</h1>
      </div>
      {modelSummary && (
        <pre className="model-summary">{modelSummary}</pre>
      )}
      <button onClick={() => navigate("/")}>🔙 Go Back</button>
    </div>
  );
}

export default ModelDashboard;

