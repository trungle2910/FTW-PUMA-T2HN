import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Container } from "react-bootstrap";

function App() {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

  // fetch issue data cơ bản chỉ với base url
  useEffect(() => {
    const fetchIssueData = async () => {
      if (!owner || !repo) return;
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
      } catch (error) {
        setErrorMsg(`FETCH ISSUES ERROR: ${error.message}`);
      }
      setLoading(false);
    };
    fetchIssueData();
  }, [owner, repo]);

  return (
    <div>
      <Container
        fluid
        className=" justify-content-center align-content-center text-center"
      >
        {loading ? (
          <PacmanLoader color={"red"} size={30} margin={5} />
        ) : (
          <>
            <h1>noi dung bai</h1>
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
