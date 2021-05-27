import React from "react";
import "./App.scss";
import MetaMaskLogin from "./components/MetaMaskLogin";

const App = ({ children }) => {
  return (
    <div className="App">
      <MetaMaskLogin />
    </div>
  );
};

export default App;
