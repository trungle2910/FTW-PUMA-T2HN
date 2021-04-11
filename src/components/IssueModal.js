import React from "react";
import { Modal, Media, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { MoonLoader } from "react-spinners";

const Comment = ({ user, body, created_at, updated_at }) => {
  return (
    <Media as="li" className="mb-3 mt-3 comment">
      <Media.Body className="text-left">
        <div className="mb-2 comment-header">
          <span>
            <img
              src={user.avatar_url}
              alt="User profile"
              className="modal-avatar mr-2"
            />
          </span>

          <span className="comment-user-name mr-2">@{user.login}</span>

          {updated_at && updated_at !== created_at ? (
            <span className="text-grey">
              comment edited <Moment fromNow>{updated_at}</Moment>
            </span>
          ) : (
            <span className="text-grey">
              comment created <Moment fromNow>{created_at}</Moment>
            </span>
          )}
        </div>

        <div className="comment-content">
          <ReactMarkdown source={body} />
        </div>
      </Media.Body>
    </Media>
  );
};

const IssueModal = ({
  issue,
  showModal,
  setShowModal,
  comments,
  loadingComments,
  handleMore,
  disableShowMore,
}) => {
  return (
    issue && (
      <Modal
        size="xl"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="issue-detail-modal"
        animation
      >
        <Modal.Header closeButton className="modal-title">
          <Modal.Title id="issue-detail-modal">
            <span className="mr-2 badge badge-info">#{issue.number}</span>
            <span>{issue.title}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Issue content */}
          <div>
            {issue.body && issue.body.length ? (
              <ReactMarkdown source={issue.body} className="issue-content" />
            ) : (
              <section className="issue-content text-center">
                <h3>THE CONTENT OF ISSUE IS EMPTY</h3>
              </section>
            )}
          </div>

          <hr className="horizontal-line" />

          <h4>Comments:</h4>
          {/* comment list here */}
          <ul className="list-unstyled">
            {comments && comments.length ? (
              comments.map((comment) => (
                <Comment key={comment.id} {...comment} />
              ))
            ) : (
              <li>There is no comment of this issue</li>
            )}
          </ul>

          <div className="d-flex justify-content-center">
            {loadingComments ? (
              <MoonLoader color="#3F3BA7" size={75} loading={loadingComments} />
            ) : (
              <>
                {!disableShowMore && (
                  <Button
                    className="btn btn-warning"
                    type="button"
                    onClick={handleMore}
                    disabled={disableShowMore}
                  >
                    Show more
                  </Button>
                )}
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    )
  );
};

export default IssueModal;
