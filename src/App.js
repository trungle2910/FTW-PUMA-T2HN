import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import IssuesList from "./components/IssuesList";

// import components
import SearchBar from "./components/SearchBar";
import IssueModal from "./components/IssueModal";

function App() {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [searchInput, setSearchInput] = useState("facebook/react");
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
        {/* Search bar here */}
        <SearchBar loading={loading} />

        <div>
          {loading ? (
            <PacmanLoader color={"red"} size={30} margin={5} />
          ) : (
            <IssuesList data={dataIssues} />
          )}
        </div>

        <IssueModal
          issue={selectedIssue}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Container>
    </>
  );
}

export default App;
