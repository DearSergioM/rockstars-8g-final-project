import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Album from '../components/Album'
import axios from 'axios'

function HomeScreen() {
  const [albums, setAlbums] = useState<any[]>([])

  useEffect(()=> {
    console.log('useEffect triggered')

    async function fetchAlbums(){
      const { data } = await axios.get('/api/albums/')
      setAlbums(data)
    }

    fetchAlbums()

  }, [])

  return (
    <div>
        <h1>Music</h1>
        <Row>
            {albums.map(album => (
                <Col key={album._id} sm={12} md={6} lg={4} xl={3}>
                    <Album album={album} />
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default HomeScreen