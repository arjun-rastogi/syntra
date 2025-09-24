import React from "react";
import { BrowserRouter } from "react-router-dom";
import RootNavigation from "./navigation";

const App = () => {
  return (
    <BrowserRouter>
      <RootNavigation />
    </BrowserRouter>
  );
};

export default App;
