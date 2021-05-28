import React from "react";
import "./App.scss";
import Header from "./components/Header";

const App = ({ children }) => {
  return (
    <div className="App">
      <Header />
    </div>
  );
};

export default App;
