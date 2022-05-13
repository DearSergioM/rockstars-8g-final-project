import { CART_ADD_ITEM } from '../constants/cartConstants'

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

        default:
            return state
    }
}