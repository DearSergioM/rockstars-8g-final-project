
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listAlbumDetails} from '../actions/albumActions'

function AlbumScreen() {
  
  const match = useParams();
  const history = useNavigate();
  const dispatch = useDispatch()
  const albumDetails:any = useSelector<any>(state => state.albumDetails)
  const {  loading, error, album} = albumDetails

  const [quantity, setQuantity] = useState(1)

  useEffect(()=> {
    dispatch(listAlbumDetails(match.id) as any)

  }, [dispatch, match])

  const addToCartHandler = () => {
    history(`/cart/${match.id}?quantity=${quantity}`)
  }

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'> Go Back </Link>

      {loading? <Loader/>
          : error ? <Message variant='danger'>{error}</Message> 
            :(
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

              {album?.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Qty:
                    </Col>
                    <Col xs='auto' className='my-1'>
                      <Form.Control 
                        as="select" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value as any)}>
                          {
                            [...Array(album.countInStock).keys()].map((x) =>(
                              <option key={x+1} value={x+1}>{x +1}</option>
                            ))
                          }
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}


              <ListGroup.Item>
                <Button 
                  onClick={addToCartHandler}
                  className='btn-block' 
                  disabled={album?.countInStock == 0 as number} 
                  type='button'> 
                    Add to Cart 
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Col>
      </Row>
            )
      }
    </div>
  )
}

export default AlbumScreen
