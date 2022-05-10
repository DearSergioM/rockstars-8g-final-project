
import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

function AlbumScreen() {
  
  const match = useParams();

  const [album, setAlbum] = useState<any>([])

  useEffect(()=> {
    console.log('useEffect triggered')

    async function fetchAlbum(){
      const { data } = await axios.get(`/api/albums/${match.id}`)
      setAlbum(data)
    }

    fetchAlbum()
  }, [])

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'> Go Back </Link>
      <Row>
        <Col md={6}>
          
          <Image src={album?.image} alt={album?.name} fluid/>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{album?.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating value={album?.rating} text={`${album?.numReviews} rating `} color={'#F1F10B'}/>
              </ListGroup.Item>

              <ListGroup.Item>
                Price: ${album?.price}
              </ListGroup.Item>

              <ListGroup.Item>
                Release date: {album?.year}
              </ListGroup.Item>

            </ListGroup>
          </Col>
          
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col><strong>${album?.price}</strong></Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {album?.countInStock as number > 0 ?  'In Stock' : 'Out of stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button className='btn-block' disabled={album?.countInStock == 0 as number} type='button'> Add to Cart </Button>
              </ListGroup.Item>

            </ListGroup>
          </Col>
      </Row>
    </div>
  )
}

export default AlbumScreen
