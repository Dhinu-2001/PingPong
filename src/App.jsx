import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes/>}/>
          {/* <Route path="/admin*" element={}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
