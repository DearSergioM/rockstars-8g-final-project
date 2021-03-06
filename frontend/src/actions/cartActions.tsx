import axios from 'axios'
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'

export const addToCart = (id:any, quantity:any) => async (dispatch:any, getState:any) => {
    const {data} = await axios.get(`/api/albums/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            album: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id:any) => (dispatch:any, getState:any) =>  {
        dispatch({
            type:CART_REMOVE_ITEM,
            payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}