import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import Api from "../../api/Api";

const PostDetail = () => {
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search)

  const postId = location.pathname.split("/")[2];
  const postTitle = urlParams.get("title");
  const postBody = urlParams.get("body");
  const postUser = urlParams.get("user");

  const [comments, setComments] = useState([]);

  /* eslint-disable */
  useEffect(() => {
    Api.fetchComments(postId)
      .then(resp => {
        setComments(resp);
      })
      .catch(err => {
        console.error("error: ", err);
      })
  }, []);
  /* eslint-enable */

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <span
          onClick={() => history.goBack()}
          style={{
            fontSize: '28px',
            fontWeight: 600,
            color: 'blue',
            cursor: 'pointer',
            marginRight: '16px',
            marginTop: '-1px',
          }}
        >
          {`<`}
        </span>
        <h3>Post Detail</h3>
      </div>
      <div
        style={{ marginTop: '16px', color: '#5484D7', fontSize: '22px', fontWeight: 600 }}
      >
        {postTitle}
      </div>
      <div
        style={{ marginTop: '16px', color: '#A5A6A8', fontSize: '16px' }}
      >{`by ${postUser}`}</div>
      <div
        style={{ marginTop: '16px', fontSize: '18px' }}
      >{postBody}</div>
      <div style={{ marginTop: '16px' }}>
        Comments
      </div>
      {
        comments.map((comment, i) => {
          return (
            <Card key={comment.id} style={{ marginTop: '16px' }}>
              <CardBody>
                <CardTitle tag="h5">{comment.name}</CardTitle>
                <div style={{ marginBottom: '16px', color: '#A5A6A8', fontSize: '16px' }}>
                  {comment.email}
                </div>
                <div>
                  {comment.body}
                </div>
              </CardBody>
            </Card>
          )
        })
      }
    </div>
  );
};

export default PostDetail;