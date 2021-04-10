import React from "react";
import { Form, Button, Col } from "react-bootstrap";

const Searchform = (searchInput, handleInputChange, handleSubmit, loading) => {
  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-4">
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
    </>
  );
};

export default Searchform;
