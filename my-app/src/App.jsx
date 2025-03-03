import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ModelProvider } from "./context/ModelContext";
import UploadModel from "./components/UploadModel";
import ModelDashboard from "./components/ModelDashboard"; 
import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="title-container">
        <h1 
          onClick={() => navigate("/")} 
          className="title"
        >
          deepTest
        </h1>
      </div>
      <div className="upload-container">
        <div className="upload-box">
          <UploadModel navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ModelProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ModelDashboard />} /> {/* Redirects here after model loads */}
        </Routes>
      </Router>
    </ModelProvider>
  );
}

export default App;
