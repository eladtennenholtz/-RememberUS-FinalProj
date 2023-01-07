import { Link } from "react-router-dom";
import "../CSS/Start.css";

function Start() {
  return (
    <div className="FirstBtn">
      <Link to="/Login" style={{ textDecoration: "none" }}>
        {<h1>Click to start</h1>}
      </Link>
    </div>
  );
}

export default Start;
