import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, ModalBody, ModalFooter, ModalTitle, Row } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { Context } from '../..'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI'

const CreateDevice = observer(({show, onHide}) => {

    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
    <Modal 
        size='lg' 
        centered
        show={show}
        onHide={onHide}
    >
        <ModalHeader>
            <ModalTitle>Add device</ModalTitle>
        </ModalHeader>
        <ModalBody>
            <Form>
                <Dropdown className='mt-2'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {device.selectedType.name || 'Select type'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {device.types.map(type => (
                            <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mt-2'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {device.selectedBrand.name || 'Select brand'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {device.brands.map(brand => (
                            <Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='mt-3'
                    placeholder='Enter device name'    
                />
                <Form.Control 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className='mt-3'
                    placeholder='Enter device price'  
                    type='number'  
                />
                <Form.Control 
                    className='mt-3'
                    type='file'   
                    onChange={selectFile}
                />
                <hr />
                <Button
                    variant='outline-dark' 
                    onClick={addInfo} 
                >
                    Add new property
                </Button>
                {info.map(i => (
                    <Row key={i.number}>
                        <Col md={4} className='my-2'>
                            <Form.Control
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                placeholder='Enter the title'
                            />
                        </Col>
                        <Col md={4} className='my-2'>
                            <Form.Control
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                placeholder='Enter the description'
                            />
                        </Col>
                        <Col md={4} className='my-2'>
                            <Button 
                                onClick={() => removeInfo(i.number)}
                                variant='outline-danger'
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                ))}
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button variant='outline-danger' onClick={addDevice}>Add Device</Button>
            <Button variant='outline-success' onClick={onHide}>Close</Button>
        </ModalFooter>
    </Modal>
    )
})

export default CreateDevice
