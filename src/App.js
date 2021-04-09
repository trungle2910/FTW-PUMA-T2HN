import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Button, Container } from "react-bootstrap";
import IssuesList from "./components/IssuesList.js";

function App() {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataIssues, setDataIssues] = useState([]);

  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

  // fetch issue data cơ bản chỉ với base url
  useEffect(() => {
    const fetchIssueData = async () => {
      if (!owner || !repo) return;
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        setDataIssues(data);
        console.log(data);
      } catch (error) {
        setErrorMsg(`FETCH ISSUES ERROR: ${error.message}`);
        alert(errorMsg);
      }
      setLoading(false);
    };
    fetchIssueData();
  }, [owner, repo, url]);

  return (
    <div>
      {loading ? (
        <PacmanLoader color={"red"} size={30} margin={5} />
      ) : (
        <>
          <IssuesList data={dataIssues} />
        </>
      )}
    </div>
  );
}

export default App;
