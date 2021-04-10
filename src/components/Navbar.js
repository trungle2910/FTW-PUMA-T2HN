import React from "react";
import logo from "../image/logo.svg";
import github from "../image/github.png";
import { Form, Button, Col } from "react-bootstrap";

const Navbar = ({ searchInput, handleInputChange, handleSubmit, loading }) => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img className="logo-re-size" src={logo} alt="coder-img" />
        </div>
        <div>
          <Form onSubmit={handleSubmit} className="form-search">
            <Form.Row>
              <Col>
                <Form.Control
                  id="search-input"
                  type="text"
                  placeholder="Search.."
                  value={searchInput}
                  onChange={handleInputChange}
                />
              </Col>
              {loading ? (
                <Button variant="info" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {searchInput}
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
          <a href="https://github.com/trungle2910/FTW-PUMA-T2HN">
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
