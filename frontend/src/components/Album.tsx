import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Album = ({album}:any) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/album/${album._id}`}>
            <Card.Img src={album.image}/>
        </Link>
        <Card.Body>
            <Link to={`/album/${album._id}`}>
                <Card.Title as="div">
                <strong>{album.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="div">
                <div className='my-3'>
                    <Rating value={album.rating} text={`${album.numReviews} reviews`} color={'#F1F10B'} />
                </div>
            </Card.Text>

            <Card.Text as="h3">
                ${album.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
};

export default Album