import axios from 'axios'
import {
    ALBUM_LIST_REQUEST,
    ALBUM_LIST_SUCCESS,
    ALBUM_LIST_FAIL,

    ALBUM_DETAILS_REQUEST,
    ALBUM_DETAILS_SUCCESS,
    ALBUM_DETAILS_FAIL,
} from '../constants/albumConstants'


export const listAlbums = () => async (dispatch:any) => {
    try{
        dispatch({type: ALBUM_LIST_REQUEST})
        const { data } = await axios.get(`/api/albums/`)
        dispatch({
            type: ALBUM_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: ALBUM_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listAlbumDetails = (id:any) => async (dispatch:any) => {
    try{
        dispatch({type: ALBUM_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/albums/${id}`)
        dispatch({
            type: ALBUM_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: ALBUM_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}