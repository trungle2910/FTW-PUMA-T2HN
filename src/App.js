import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import IssuesList from "./components/IssuesList";

// import components

import IssueModal from "./components/IssueModal";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";

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

  // state for issue comments
  const [commentsFetchUrl, setCommentsFetchUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentPageNum, setCommentPageNum] = useState(1);
  const [commentTotalPageNum, setCommentTotalPageNum] = useState(1);

  const showDetail = (item) => {
    setShowModal(true);

    if (
      selectedIssue?.number !== item.number ||
      selectedIssue?.number === item.number
    ) {
      setComments([]);
      setCommentPageNum(1);
      setCommentTotalPageNum(1);
      setSelectedIssue(item);
      setCommentsFetchUrl(
        `https://api.github.com/repos/${owner}/${repo}/issues/${item.number}/comments?page=1&per_page=5`
      );
    }
  };

  const handleMoreComments = () => {
    if (commentPageNum >= commentTotalPageNum) return;

    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${
      selectedIssue.number
    }/comments?page=${commentPageNum + 1}&per_page=5`;
    setCommentPageNum((num) => num + 1);
    setCommentsFetchUrl(url);
  };

  // fetch issue comment url
  useEffect(() => {
    const fetchComments = async () => {
      if (!commentsFetchUrl && !showModal) return;

      setLoadingComments(true);

      try {
        const response = await fetch(commentsFetchUrl);
        const data = await response.json();

        if (response.status === 200) {
          const link = response.headers.get("link");
          if (link) {
            const getTotalPage = link.match(
              /page=(\d+)&per_page=\d+>; rel="last"/
            );
            if (getTotalPage) {
              setCommentTotalPageNum(parseInt(getTotalPage[1]));
            }
          }
          setComments((comment) => [...comment, ...data]);
          setErrorMsg(null);
        } else {
          setErrorMsg(`Fetch Comments Error: ${data.message}`);
          setShowModal(false);
        }

        console.log(data);
      } catch (error) {
        setErrorMsg(`Fetch comments error: ${error.message}`);
        setShowModal(false);
      }

      setLoadingComments(false);
    };

    fetchComments();
  }, [commentsFetchUrl, showModal]);

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
    const temp = searchInput.split("/");
    if (temp.length === 2) {
      setOwner(owner);
      setRepo(repo);
    } else if (
      temp[0] === "https:" &&
      temp[1] === "" &&
      temp[2] === "github.com"
    ) {
      setOwner(owner);
      setRepo(repo);
    } else {
      setErrorMsg("Wrong format of search Input");
    }
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

        <div>
          {loading ? (
            <PacmanLoader color={"red"} size={30} margin={5} />
          ) : (
            <IssuesList data={dataIssues} showDetail={showDetail} />
          )}
        </div>

        <IssueModal
          issue={selectedIssue}
          showModal={showModal}
          setShowModal={setShowModal}
          comments={comments}
          loadingComments={loadingComments}
          handleMore={handleMoreComments}
          disableShowMore={commentPageNum === commentTotalPageNum}
        />
      </Container>
    </>
  );
}

export default App;
