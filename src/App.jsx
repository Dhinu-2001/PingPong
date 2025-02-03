import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import { Toaster } from "sonner";
import { persistor } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </>
  );
}

export default App;
