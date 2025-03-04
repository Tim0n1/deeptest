import { useState } from "react";
import { useModel } from "../context/ModelContext";
import { useNavigate } from "react-router-dom"; // Import navigation
import "./UploadModel.css"; // Import the CSS file


function UploadModel() {
  const { loadModel,loadRandomModel, isModelLoaded, setJsonFile, setBinFiles } = useModel();
  const [jsonFileName, setJsonFileName] = useState("");
  const [binFileNames, setBinFileNames] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const jsonFiles = files.filter((file) => file.name.endsWith(".json"));
    const binFiles = files.filter((file) => file.name.endsWith(".bin"));

    if (jsonFiles.length === 0) {
      alert("⚠️ Please select a valid .json file.");
      return;
    }
    if (jsonFiles.length > 1) {
      alert("⚠️ Please select only one .json file.");
      return;
    }
    
    setJsonFile(jsonFiles[0]);
    setJsonFileName(jsonFiles[0].name);
    setBinFiles(binFiles);
    setBinFileNames(binFiles.map((file) => file.name));
  };

  // Determine if both files are set
  const canLoadModel = jsonFileName !== "";
  const handleLoadRandomModel = async () => {
    await loadRandomModel();
    navigate("/dashboard"); // Redirect to dashboard after model loads
  };

  return (
    <div className="container">
      <h2>Upload Your Model</h2>
      
      {/* Combined File Upload Button */}
      <div className="upload-load">
      <div className="upload-box">
        <label>Upload Model Files (JSON + BIN)</label>
        <label className="file-input">
          📂 Choose Files
          <input 
            type="file" 
            accept=".json,.bin" 
            multiple 
            onChange={handleFileChange} 
          />
        </label>
      </div>

      {/* Confirmation Messages */}
      {jsonFileName && (
        <p className="confirmation">✔️ JSON file added: {jsonFileName}</p>
      )}
      {binFileNames.length > 0 && (
        <p className="confirmation">
          ✔️ BIN file(s) added: {binFileNames.join(", ")}
        </p>
      )}

      {/* Load Model Button */}
      <div className="load-box">
      <button 
        onClick={loadModel} 
        className="load-button"
        disabled={!canLoadModel}  // Button is disabled until both files are set
      >
        🚀 Load Model
      </button>
      <button
        onClick={handleLoadRandomModel}
        className="load-random-button"
      >
        🎲 Load Random Model
        </button>

      </div>
      </div>
    </div>
  );
}

export default UploadModel;
