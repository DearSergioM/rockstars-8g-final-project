import React, {useEffect} from 'react'
import { Link, useLocation, useParams,useNavigate  } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

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
  return (
    <div>
        Cart
    </div>
  )
}

export default Cart