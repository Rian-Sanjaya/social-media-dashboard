import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
} from 'reactstrap';
import Api from '../../api/Api';

const UserPostsAlbums = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState('1');
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);

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

  return (
    <div>
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
            <Button color="primary" style={{ marginTop: '16px', marginBottom: '16px' }}>Add Post</Button>
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
                          <td>detail edit delete</td>
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
                        <span>view photos</span>
                      </CardBody>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default UserPostsAlbums;