import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state={cartItems:[]}, action:any) =>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem:any = state.cartItems.find((x: { album: any }) => x.album === item.album) 
            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map((x: { album: any }) => x.album === existItem.album ? item: x)
                }
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((x: { album: any }) => x.album !== action.payload)
            }
        default:
            return state
    }
}