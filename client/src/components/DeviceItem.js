import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({device}) => {

    const history = useHistory()
    console.log(history);

    return (
        <Col 
            md={3} 
            className='mb-3'
            onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
        >
            <Card style={{width: 150, cursor: 'pointer'}} border='light'>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="d-flex my-2 justify-content-between">
                    <div className='text-black-50'>Samsung</div>
                    <div className='d-flex'>
                        <div>{device.rating}</div>
                        <div>Star*</div>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    )
}

export default DeviceItem
