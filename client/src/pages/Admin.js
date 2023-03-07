import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    return (
        <Container className='d-flex flex-column'>
            <Button 
                className='my-2 p-3' 
                variant='outline-dark'
                onClick={() => setTypeVisible(true)}
            >
                Add type
            </Button>
            <Button 
                className='my-2 p-3' 
                variant='outline-dark'
                onClick={() => setBrandVisible(true)}
            >
                Add brand
            </Button>
            <Button 
                className='my-2 p-3' 
                variant='outline-dark'
                onClick={() => setDeviceVisible(true)}
            >
                Add device
            </Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Container>
    )
}

export default Admin
