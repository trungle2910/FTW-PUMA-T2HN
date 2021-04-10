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
          <Button disabled>Seach...</Button>
        ) : (
          <Button type="submit">Seach</Button>
        )}
      </Form.Row>
    </Form>
  );
};

export default SearchBar;
