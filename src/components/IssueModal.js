import React from "react";
import { Modal, Media } from "react-bootstrap";
import { MoonLoader } from "react-spinners";

const Comment = ({ user }) => {
  return (
    <Media as="li">
      <Media.Body></Media.Body>
    </Media>
  );
};

const IssueModal = ({ issue, showModal, setShowModal }) => {
  return (
    issue && (
      <Modal size="xl" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>This is header</Modal.Header>
        <Modal.Title>
          <h3>Title of Issue</h3>
        </Modal.Title>

        <Modal.Body>
          {/* Issue content */}
          <React.Markdown />

          <h4>Comments:</h4>
          {/* comment list here */}
          <ul></ul>
        </Modal.Body>
      </Modal>
    )
  );
};

export default IssueModal;
