import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
// <<<<<<< Hoang
import { Button, Container } from "react-bootstrap";
import IssuesList from "./components/IssuesList.js";
import PaginationA from "./components/Pagination";
import Navbar from "./components/Navbar";
// =======
// import { Container } from "react-bootstrap";

// // import IssuesList from "./components/IssuesList";
// >>>>>>> master

function App() {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [searchInput, setSearchInput] = useState("facebook/react");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataIssues, setDataIssues] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);

  // const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

  // fetch issue data cơ bản chỉ với base url
  useEffect(() => {
    const fetchIssueData = async () => {
      if (!owner || !repo) return;
      setLoading(true);
      try {
        const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.status === 200) {
          const link = res.headers.get("link");

          if (link) {
            const getTotalPage = link.match(
              /page=(\d+)&per_page=\d+>; rel="last"/
            ); // regular expression
            if (getTotalPage) {
              setTotalPageNum(parseInt(getTotalPage[1]));
            }
          }
          setDataIssues(data);
          setErrorMsg(null);
          console.log(data);
        } else {
          setErrorMsg(`FETCH ISSUES ERROR: ${data.message}`);
        }
      } catch (error) {
        setErrorMsg(`FETCH ISSUES ERROR: ${error.message}`);
        alert(errorMsg);
      }
      setLoading(false);
    };
    fetchIssueData();
  }, [owner, repo, pageNum]);

  // function getOwnerAndRepo() {
  //   const repo = searchInput.substring(searchInput.lastIndexOf("/") + 1);
  //   const withoutRepo = searchInput.substring(0, searchInput.lastIndexOf("/"));
  //   const owner = withoutRepo.substring(withoutRepo.lastIndexOf("/") + 1);
  //   return { repo, owner };
  // }
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    // const { owner, repo } = getOwnerAndRepo();
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
            <div style={{ marginTop: "100px" }}>
              <ClimbingBoxLoader color={"#f0b6cd"} size={50} />
            </div>
          ) : (
            <IssuesList data={dataIssues} />
          )}
        </div>
        <div className="fixed-bottom">
          <PaginationA
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
          />
        </div>
      </Container>
    </>
    // >>>>>>> master
  );
}

export default App;
