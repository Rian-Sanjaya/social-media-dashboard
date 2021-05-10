import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import Api from '../../api/Api';

const UserAlbum = () => {
  const { albumId } = useParams();
  const { state: { userName, albumTitle } } = useLocation();
  const history = useHistory();
  
  const [photos, setPhotos] = useState([]);
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState('');
  const [photoTitle, setPhotoTitle] = useState('');

  /* eslint-disable */
  useEffect(() => {
    Api.fetchUserAlbum(albumId)
      .then((resp) => {
        setPhotos(resp);
      })
      .catch((err) => {
        console.log("error: ", error);
      });
  }, []);
  /* eslint-enable */

  const toggle = () => setModal(!modal);

  const handlePhotoCllck = (url, title) => {
    setUrl(url);
    setPhotoTitle(title);
    setModal(true);
  };

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
        <h3>{`${userName} Album`}</h3>
      </div>
      <h4>{ albumTitle }</h4>
      <Row>
        {
          photos.map((photo, i) => {
            return (
              <Col sm="4" md="2" key={photo.id} style={{ marginTop: '16px' }}>
                <Card style={{ cursor: 'pointer' }} onClick={() => handlePhotoCllck(photo.url, photo.title)}>
                <CardImg top width="100%" src={photo.thumbnailUrl} alt="Card image cap" />
                  <CardBody>
                    <CardText>{`${photo.title.slice(0, 12)} ...`}</CardText>
                  </CardBody>
                </Card>
              </Col>
            )
          })
        }
      </Row>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>{ photoTitle }</ModalHeader>
        <ModalBody>
          <img src={url} alt="album" style={{ width: '100%' }}/>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserAlbum;