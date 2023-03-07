import React, { useState } from 'react'
import { Button, Form, FormControl, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { createType } from '../../http/deviceAPI'

const CreateType = ({show, onHide}) => {

    const [value, setValue] = useState('')
    const addType = () => {
        createType({name: value}).then(data => setValue(''))
        onHide()
    }

    return (
        <Modal 
            size='lg' 
            centered
            show={show}
            onHide={onHide}
        >
            <ModalHeader>
                <ModalTitle>Add type</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormControl
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder='Enter type name'
                    />
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant='outline-danger' onClick={addType}>Add type</Button>
                <Button variant='outline-success' onClick={onHide}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CreateType
