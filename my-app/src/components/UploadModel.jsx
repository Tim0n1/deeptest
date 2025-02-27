import { useState } from "react";
import { useModel } from "../context/ModelContext";
import "./UploadModel.css"; // Import the CSS file

function UploadModel() {
  const { loadModel, isModelLoaded, setJsonFile, setBinFiles } = useModel();
  const [jsonFileName, setJsonFileName] = useState("");
  const [binFileNames, setBinFileNames] = useState([]);

  const handleJsonChange = (event) => {
    const file = event.target.files[0];
    if (!file || !file.name.endsWith(".json")) {
      alert("⚠️ Please select a valid .json file.");
      return;
    }
    setJsonFile(file);
    setJsonFileName(file.name);
  };

  const handleBinChange = (event) => {
    const files = Array.from(event.target.files).filter((f) =>
      f.name.endsWith(".bin")
    );
    if (files.length === 0) {
      alert("⚠️ Please select at least one .bin file.");
      return;
    }
    setBinFiles(files);
    setBinFileNames(files.map((file) => file.name));
  };

  // Determine if both files are set
  const canLoadModel = jsonFileName !== "" && binFileNames.length > 0;

  return (
    <div className="container">
      <h2>Upload Your Model</h2>

      {/* File Upload Buttons in a Row */}
      <div className="upload-buttons">
        {/* JSON Upload */}
        <div className="upload-box">
          <label>Model JSON File</label>
          <label className="file-input">
            📄 Choose JSON File
            <input type="file" accept=".json" onChange={handleJsonChange} />
          </label>
        </div>

        {/* BIN Upload */}
        <div className="upload-box">
          <label>Model Weight Files (.bin)</label>
          <label className="file-input">
            📂 Choose BIN Files
            <input type="file" accept=".bin" multiple onChange={handleBinChange} />
          </label>
        </div>
      </div>

      {/* Load Model Button */}
      <button 
        onClick={loadModel} 
        className="load-button"
        disabled={!canLoadModel}  // Button is disabled until both files are set
      >
        🚀 Load Model
      </button>

      {/* Status Message */}
      {isModelLoaded && <p className="status">🎉 Model is ready to use!</p>}
    </div>
  );
}

export default UploadModel;
