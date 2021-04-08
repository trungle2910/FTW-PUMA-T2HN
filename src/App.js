import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import IssueModal from "./components/IssueModal";

const App = () => {
  return (
    <>
      <IssueModal issue={""} />
    </>
  );
};

export default App;
