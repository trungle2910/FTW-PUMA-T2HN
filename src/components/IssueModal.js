import React from "react";
import { Modal } from "react-bootstrap";
import { MoonLoader } from "react-spinners";

const IssueModal = ({ issue }) => {
  return (
    issue && (
      <Modal>
        <Modal.Header>This is header</Modal.Header>
        <Modal.Body>This is body</Modal.Body>
      </Modal>
    )
  );
};

export default IssueModal;
