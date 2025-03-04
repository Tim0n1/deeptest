import { createContext, useContext, useState } from "react";
import * as tf from "@tensorflow/tfjs";

// Create Context
const ModelContext = createContext();

// Create Provider Component
export function ModelProvider({ children }) {
  const [model, setModel] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [jsonFile, setJsonFile] = useState(null);
  const [binFiles, setBinFiles] = useState([]);

  // Function to load the model once both files are uploaded
  const loadModel = async () => {


    try {
      console.log("📂 Loading model:", jsonFile.name, "with", binFiles.length, "weight file(s)...");

      const loadedModel = await tf.loadLayersModel(tf.io.browserFiles([jsonFile, ...binFiles]));
      setModel(loadedModel);
      setIsModelLoaded(true);
      if (loadedModel.weights.length === 0) {
        throw new Error("Weights are missing or not loaded properly.");
      }
      else{
        loadedModel.weights.forEach((tensor, index) => {
          console.log(`Weight ${index + 1}: ${tensor.name}, Shape:`, tensor.shape);
          tensor.val.print(); // Prints the actual weight values
        });
        
    }
    

      alert("✅ Model loaded successfully!");
      console.log(loadedModel.summary());
    } catch (error) {
      console.error("❌ Error loading model:", error);
      setIsModelLoaded(false);
    }
  };

  const loadRandomModel = async () => {
    try {
      console.log("📂 Loading random model...");

      const model = await tf.loadLayersModel("https://storage.googleapis.com/tfjs-models/tfjs/iris_v1/model.json");
      setModel(model);
      setIsModelLoaded(true);

      model.weights.forEach((tensor, index) => {
        console.log(`Weight ${index + 1}: ${tensor.name}, Shape:`, tensor.shape);
      });
    
    
    } catch (error) {
      console.error("❌ Error loading random model:", error);
      setIsModelLoaded(false);
    }
  }

  return (
    <ModelContext.Provider value={{ 
      model, 
      isModelLoaded, 
      jsonFile, 
      binFiles, 
      setJsonFile, 
      setBinFiles, 
      loadModel,
      loadRandomModel
    }}>
      {children}
    </ModelContext.Provider>
  );
}

// Custom hook to use the Model Context
export function useModel() {
  return useContext(ModelContext);
}
