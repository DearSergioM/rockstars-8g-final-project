import React, {useEffect} from 'react'
import { Link, useLocation, useParams,useNavigate  } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function Cart() {
  const match = useParams();
  const history = useNavigate();
  const location = useLocation();

  const albumId = match.id
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1
  
  console.log('qty:', quantity )
  
  const dispatch = useDispatch()

  const cart = useSelector<any>(state => state.cart)
  const {cartItems}:any = cart

  console.log('cartItems:', cartItems)

  useEffect(() => {
    if(albumId){
      dispatch(addToCart(albumId, quantity) as any)
    }
  }, [dispatch, albumId, quantity])

  const removeFromCartHandler = (id:any) => {
    console.log('remove', id)
    dispatch(removeFromCart(id) as any)
  }

  const checkoutHandler = () => {
    history('/login?redirect=shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>My Cart: </h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item: { album: React.Key | null | undefined; image: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; quantity: string | number | string[] | undefined; countInStock: any }) => (
              <ListGroup key={item.album}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name as any} fluid rounded/>
                  </Col>

                  <Col md={3}>
                    <Link to={`/album/${item.album}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    ${item.price}
                  </Col>

                  <Col md={3}>
                  <Form.Control 
                        as="select" 
                        value={item.quantity} 
                        onChange={(e) => dispatch<any>(addToCart(item.album, Number(e.target.value)))}>
                          {
                            [...Array(item.countInStock).keys()].map((x) =>(
                              <option key={x+1} value={x+1}>{x +1}</option>
                            ))
                          }
                      </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button 
                      onClick={() => removeFromCartHandler(item.album)}
                      type='button' 
                      variant='light'>
                        <i className='fas fa-trash'></i>
                    </Button>
                  
                  </Col>

                </Row>
              </ListGroup>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc:any, item:any) => acc + item.quantity, 0)}) items</h2>
              
              ${cartItems.reduce((acc:any, item:any) => acc + item.quantity * item.price, 0).toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Cart