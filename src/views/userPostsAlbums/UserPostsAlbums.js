import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Api from '../../api/Api';

const UserPostsAlbums = () => {
  const { id } = useParams();
  const { state: { userName }} = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('1');
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [modal, setModal] = useState(false);
  const [titlePost, setTitlePost] = useState("");
  const [bodyPost, setBodyPost] = useState("");
  const [currentPostId, setCurrentPostId] = useState("");
  const [onDelete, setOnDelete] = useState(false);

  /* eslint-disable */
  useEffect(() => {
    Api.fetchUserPosts(id)
      .then((resp) => {
        setPosts(resp);
      })
      .catch((err) => {
        console.error("error: ", err);
      });

    Api.fetchUserAlbums(id)
      .then((resp) => {
        setAlbums(resp);
      })
      .catch((err) => {
        console.error("error: ", err);
      })
  }, []);
  /* eslint-enable */

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const toggleModal = () => {
    setOnDelete(false);
    setCurrentPostId("");
    setTitlePost("");
    setBodyPost("");
    setModal(!modal)
  };

  const confirmDelete = (id) => {
    setOnDelete(true);
    setCurrentPostId(id);
    setModal(true);
  }

  const handleDelete = () => {
    Api.deletePost(currentPostId)
      .then(() => {
        setOnDelete(false);
        setCurrentPostId("");
        setModal(false);
      })
      .catch((err) => {
        console.error("error: ", err);
      })
  }

  const handleEdit = (id, title, body) => {
    setCurrentPostId(id);
    setTitlePost(title);
    setBodyPost(body);
    setModal(true);
  }

  const handleSavePost = (e) => {
    e.preventDefault();

    let payload;
    
    if (currentPostId) {
      payload = {
        body: bodyPost,
        title: titlePost,
        userId: id,
        id: currentPostId,
      }

      Api.updatePost(currentPostId, payload)
        .then(() => {
          setOnDelete(false);
          setCurrentPostId("");
          setTitlePost("");
          setBodyPost("");
          setModal(false);
        })
        .catch((err) => {
          console.error("error: ", err);
        })
    } else {
      payload = {
        body: bodyPost,
        title: titlePost,
        userId: id,
      }

      Api.savePost(payload)
      .then(() => {
        setOnDelete(false);
        setCurrentPostId("");
        setTitlePost("");
        setBodyPost("");
        setModal(false);
      })
      .catch((err) => {
        console.error("error: ", err);
      })
    }
  }

  const goToPostDetail = (postId, postTitle, postBody, postUser) => {
    history.push({
      pathname: `/post/${postId}`,
      search: `?title=${postTitle}&body=${postBody}&user=${postUser}`
    });
  };

  return (
    <div>
      <h3>{userName}</h3>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
            style={{ cursor: 'pointer' }}
          >
            Posts
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
            style={{ cursor: 'pointer' }}
          >
            Albums
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div>
            <Button
              color="primary"
              style={{ marginTop: '16px', marginBottom: '16px' }}
              onClick={() => setModal(true)}
            >
              Add Post
            </Button>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  {
                    posts.map((post, i) => {
                      return (
                        <tr key={post.id}>
                          <th scope="row">{`${i+1}`}</th>
                          <td>{post.title}</td>
                          <td>
                            <Button color="link" onClick={() => goToPostDetail(post.id, post.title, post.body, userName)}>view</Button>
                            <Button color="link" onClick={() => handleEdit(post.id, post.title, post.body)}>edit</Button>
                            <Button color="link" onClick={() => confirmDelete(post.id)}>delete</Button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
            </Table>
          </div>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            {
              albums.map((album, i) => {
                return (
                  <Col xs="6"  key={album.id} style={{ marginTop: '16px' }}>
                    <Card>
                      <CardBody>
                        <CardTitle tag="h5">{album.title}</CardTitle>
                        <div>
                          <Link
                            to={{
                              pathname: `/users/${id}/album/${album.id}`,
                              state: { userName: userName, albumTitle: album.title },
                            }}
                          >
                            View Photos
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </TabPane>
      </TabContent>
      <Modal isOpen={modal} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>
          {
            onDelete ? "Confirm Delete" : currentPostId ? "Edit Post" : "Add Post"
          }
        </ModalHeader>
        <ModalBody>
          {
            onDelete
            ? (
                <>
                  <div>Delete post ?</div>
                  <Button color="primary" onClick={handleDelete}>Yes</Button>
                </>
              )
            : (
                <>
                  <Form>
                    <FormGroup>
                      <Label for="titlepost">Title</Label>
                      <Input
                        type="text"
                        name="title-post"
                        id="titlepost"
                        placeholder="Post Title"
                        value={titlePost}
                        onChange={(e) => setTitlePost(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup style={{ marginTop: '16px' }}>
                      <Label for="bodypost">Body</Label>
                      <Input
                        type="textarea"
                        name="body-post"
                        id="bodypost"
                        placeholder="Input your post here"
                        value={bodyPost}
                        onChange={(e) => setBodyPost(e.target.value)}
                      />
                    </FormGroup>
                  </Form>
                  <div style={{ marginTop: '16px' }}>
                    <Button
                      color="primary"
                      onClick={handleSavePost}
                      disabled={!titlePost || !bodyPost}
                    >
                      Save
                    </Button>
                  </div>
                </>
              )
          }
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserPostsAlbums;