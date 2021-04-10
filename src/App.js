import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import IssuesList from "./components/IssuesList";

function App() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [searchInput, setSearchInput] = useState("facebook/react");
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
        setErrorMsg("FETCH ISSUES ERROR:", error.message);
        alert(errorMsg);
      }
      setLoading(false);
    };
    fetchIssueData();
  }, [owner, repo, url]);

  function getOwnerAndRepo() {
    const repo = searchInput.substring(searchInput.lastIndexOf("/") + 1);
    const withoutRepo = searchInput.substring(0, searchInput.lastIndexOf("/"));
    const owner = withoutRepo.substring(withoutRepo.lastIndexOf("/") + 1);
    return { repo, owner };
  }
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    const { owner, repo } = getOwnerAndRepo();
    setOwner(owner);
    setRepo(repo);
  };
  return (
    <>
      <Navbar
        searchInput={searchInput}
        handleInputChange={handleSearchInputChange}
        handleSubmit={handleSearchFormSubmit}
        loading={loading}
      />
      <h1 className="nav-text"> Github Issues </h1>
      <Container
        fluid
        className=" justify-content-center align-content-center text-center"
      >
        <div>
          {loading ? (
            <PacmanLoader color={"red"} size={30} margin={5} />
          ) : (
            <IssuesList data={dataIssues} />
          )}
        </div>
      </Container>
    </>
  );
}

export default App;
