import React from "react";
import { Badge, Container, Media } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faUser } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

const IssuesList = ({ data }) => {
  return (
    <Container>
      <ul className="list-unstyled">
        {data.map((itemData) => {
          return (
            <Media className="marrginIssuesList" key={itemData.id}>
              <img
                width={200}
                height={200}
                className="mr-5 styleImgIssuesList"
                src={itemData.user.avatar_url}
                alt="Generic placeholder"
              />
              <Media.Body>
                <div>
                  <h2>{itemData.title}</h2>
                  <div>
                    <span>
                      <FontAwesomeIcon
                        icon={faUser}
                        spin
                        className="mr-2 "
                        style={{ fontSize: "22px", color: "f54e8e" }}
                      />
                      <Badge
                        pill
                        variant="success"
                        className="mr-2"
                        style={{ fontSize: "14px" }}
                      >
                        @{itemData.user.login}
                      </Badge>
                    </span>
                    <span>
                      <Badge
                        pill
                        variant="success"
                        className="mr-2"
                        style={{ fontSize: "14px" }}
                      >
                        Created at: <Moment>{itemData.created_at}</Moment>
                      </Badge>
                    </span>
                    <span>
                      <Badge
                        pill
                        variant="success"
                        className="mr-2"
                        style={{ fontSize: "14px" }}
                      >
                        Last update:{" "}
                        <Moment fromNow>{itemData.updated_at}</Moment>
                      </Badge>
                    </span>
                    <span>
                      <Badge
                        pill
                        variant="success"
                        className="mr-2"
                        style={{ fontSize: "14px" }}
                      >
                        Comment: {itemData.comments}
                      </Badge>
                    </span>
                  </div>
                  <p className="mr-5">
                    {itemData.body.length <= 400
                      ? itemData.body
                      : itemData.body.slice(0, 400) + "......"}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faTags}
                  spin
                  className="mr-2 "
                  style={{ fontSize: "25px", color: "f54e8e" }}
                />
                {itemData.labels.map((label) => (
                  <Badge
                    pill
                    variant="info"
                    className="mr-3"
                    style={{ fontSize: "15px" }}
                  >
                    {label.name}
                  </Badge>
                ))}
              </Media.Body>
            </Media>
          );
        })}
      </ul>
    </Container>
  );
};

export default IssuesList;
