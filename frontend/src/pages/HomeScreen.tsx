import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Album from '../components/Album'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listAlbums } from '../actions/albumActions'

function HomeScreen() {
  const dispatch = useDispatch()
  const albumList:any = useSelector<any>((state) => state.albumList);
  const { error , loading, albums } = albumList

  useEffect(()=> {
    dispatch(listAlbums() as any)
  }, [])

  return (
    <div>
        <h1>Music</h1>
        {loading? <Loader/>
          : error ? <Message variant='danger'>{error}</Message> 
            : 
            <Row>
              {albums.map((album: { _id: React.Key | null | undefined }) => (
                  <Col key={album._id} sm={12} md={6} lg={4} xl={3}>
                    <Album album={album} />
                  </Col>
              ))}
          </Row>
        } 
    </div>
  )
}
export default HomeScreen