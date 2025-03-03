import { useNavigate } from "react-router-dom";

function ModelDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>🎉 Model Loaded Successfully!</h1>
      <p>Your model is ready for testing and inference.</p>
      <button onClick={() => navigate("/")}>🔙 Go Back</button>
    </div>
  );
}

export default ModelDashboard;
