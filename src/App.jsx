import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          {/* <Route path="/admin*" element={}/> */}
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        expand={true}
        closeButton
        richColors
        duration={5000}
      />
    </>
  );
}

export default App;
