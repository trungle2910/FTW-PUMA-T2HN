import React from "react";
import { Form, Col, Button } from "react-bootstrap";

const SearchBar = ({
  loading,
  searchInput,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <Form>
      <Form.Row>
        <Col>
          <Form.Control
            placeholder="Search..."
            value={searchInput}
            onChange={handleInputChange}
          />
        </Col>

        {loading ? (
          <Button disabled>Searching...</Button>
        ) : (
          <Button type="submit">Search</Button>
        )}
      </Form.Row>
    </Form>
  );
};

export default SearchBar;
