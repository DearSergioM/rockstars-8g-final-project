import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {albumListReducers, albumDetailsReducers} from './reducers/albumReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
    albumList: albumListReducers,
    albumDetails: albumDetailsReducers,
    cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems') as string) : []

const initialState:any = {
    cart:{ cartItems: cartItemsFromStorage }
}

const middleware = [thunk]

const shop = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default shop