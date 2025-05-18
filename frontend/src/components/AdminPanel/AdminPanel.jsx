import React from "react";
import "./style.css";

const AdminPanel = () => {
  return (
    <div className="AdminPanelContainer">
      <div className="Buttons">
        <button>Add a post </button>
        <button> Delete a job</button>
        <button> Edit a job</button>
        <button>Get All Applications</button>
        <button>Get All Users</button>
      </div>
    </div>
  );
};

export default AdminPanel;
