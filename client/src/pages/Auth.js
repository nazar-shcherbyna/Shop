import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { Context } from '..'
import { login, registration } from '../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='mt-2'
                        placeholder='Enter your email'    
                    />
                    <Form.Control 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='mt-2'
                        placeholder='Enter your password'  
                        type='password'  
                    />
                    <Row className='d-flex justify-content-between'>
                        {isLogin ?
                            <div className='my-2'>
                                Dont have an account? 
                                <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
                            </div>
                            :
                            <div className='my-2'>
                                Do you have an account? 
                                <NavLink to={LOGIN_ROUTE}>Sign In</NavLink>
                            </div>
                        }
                        <Button  
                            className='mt-2'
                            variant='outline-success'
                            onClick={click}
                        >
                            {isLogin ? 'Enter' : 'Registration'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth