import React from "react";
import "./App.scss";
import BlockNumber from "./components/BlockNumber";

const App = ({ children }) => {
  return (
    <div className="App">
      <BlockNumber />
      {children}
    </div>
  );
};

export default App;
