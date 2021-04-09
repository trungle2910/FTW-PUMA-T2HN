import React from "react";
import { Container, Media } from "react-bootstrap";
import Moment from "react-moment";

const IssuesList = ({ data }) => {
  return (
    <Container>
      <ul className="list-unstyled">
        {data.map((listData) => {
          return (
            <Media className="marrginIssuesList">
              <img
                width={130}
                height={130}
                className="mr-5 styleImgIssuesList"
                src={listData.user.avatar_url}
                alt="Generic placeholder"
              />
              <Media.Body>
                <div>
                  <h2>{listData.title}</h2>
                  <p>
                    {listData.body.length <= 400
                      ? listData.body
                      : listData.body.slice(0, 400) + "......"}
                  </p>
                </div>
              </Media.Body>
            </Media>
          );
        })}
      </ul>
    </Container>
  );
};

export default IssuesList;
