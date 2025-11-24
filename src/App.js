import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ApiList } from "./features/apikeys/ApiList";
import { AddApi } from "./features/apikeys/AddApi";

function App() {
  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/api-keys" style={{ marginRight: "10px" }}>רשימת API</Link>
        {/* <Link to="/add-api">צור API חדשה</Link> */}
      </nav>
      <Routes>
        <Route path="/api-keys" element={<ApiList />} />
        <Route path="/add-api" element={<AddApi onClose={() => window.history.back()} />} />
      </Routes>
    </div>
  );
}

export default App;
