import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OpenModal from "./component/OpenModal";
import ShowData from "./component/ShowData";

const App = () => {
  return (
    <div>
      <OpenModal></OpenModal>
      <ShowData></ShowData>
    </div>
  );
};

export default App;
