import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI'

const DevicePage = () => {

    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className='d-flex align-items-center justify-content-center'>
                        <h2 className='d-flex align-items-center justify-content-center text-align-center'>{device.name}</h2>
                        <div style={{fontSize: 60}} className='d-flex align-items-center justify-content-center text-align-center'>
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card 
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>From {device.price} HRN</h3>
                        <Button variant='outline-dark'>Add to Card</Button>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-5'>
                <h1>Характеристики</h1>
                {device.info.map((info, idx) => (
                    <Row 
                        key={info.id} 
                        className='py-2'
                        style={{background: idx%2 === 0 ? 'lightgray' : 'transparent'}}
                    >
                        {info.title}: {info.description}
                    </Row>
                ))}
            </Row>
        </Container>
    )
}

export default DevicePage
