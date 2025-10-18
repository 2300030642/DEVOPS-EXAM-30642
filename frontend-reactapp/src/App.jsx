import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
