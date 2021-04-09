import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Button, Container } from "react-bootstrap";
import IssuesList from "./components/IssuesList.js";

// import components
import SearchBar from "./components/SearchBar";
import IssueModal from "./components/IssueModal";

function App() {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataIssues, setDataIssues] = useState([]);

  // state for modal
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const showDetail = (item) => {
    setShowModal(true);

    setSelectedIssue(item);
  };

  // fetch issue data cơ bản chỉ với base url
  useEffect(() => {
    const fetchIssueData = async () => {
      if (!owner || !repo) return;
      setLoading(true);
      try {
        const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
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
  }, [owner, repo, errorMsg]);

  return (
    <div>
      <Container
        fluid
        className=" justify-content-center align-content-center text-center"
      >
        {/* Search bar here */}
        <SearchBar loading={loading} />

        {loading ? (
          <PacmanLoader color={"red"} size={30} margin={5} />
        ) : (
          <>
            <h1>noi dung bai</h1>
          </>
        )}

        <IssueModal
          issue={selectedIssue}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Container>
    </div>
  );
}

export default App;
