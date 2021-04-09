import React from "react";
import logo from "../image/logo.svg";
import github from "../image/github.png";
import { Form, Button, Col } from "react-bootstrap";

const Navbar = (searchInput, handleInputChange, handleSubmit, loading) => {
  return (
    <>
      {/* <nav className="nav">
        <div>
          <img className="logo-re-size" src={logo} alt="coder-img" />
        </div>
        <div>
          <a href="https://github.com/coderschool/ftw_w5_github_issues">
            {" "}
            <img
              className="github-re-size"
              src={github}
              alt="github-img"
            />{" "}
          </a>
        </div>
      </nav> */}

      <nav class="navbar">
        <div className="logo">
          <img className="logo-re-size" src={logo} alt="coder-img" />
        </div>

        <a class="navbar-brand" href="http://localhost:3000/">
          {" "}
          Home
        </a>

        <div>
          <Form onSubmit={handleSubmit} className="form-search">
            <Form.Row>
              <Col>
                <Form.Control
                  className="search-input"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  onChange={handleInputChange}
                />
              </Col>
              {loading ? (
                <Button variant="primary" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Searching...
                </Button>
              ) : (
                <Button type="submit" variant="success" disabled={!searchInput}>
                  Search
                </Button>
              )}
            </Form.Row>
          </Form>
        </div>
        <div>
          <a href="https://github.com/coderschool/ftw_w5_github_issues">
            {" "}
            <img
              className="github-re-size"
              src={github}
              alt="github-img"
            />{" "}
          </a>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
