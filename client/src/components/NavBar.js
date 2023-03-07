import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Context } from '..'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { useHistory } from 'react-router'

const NavBar = observer(() => {
    const {user}  = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" className='d-flex justify-content-between' variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Buy Device</NavLink>
                {user.isAuth ? 
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button 
                            variant='outline-light' 
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Admin Panel
                        </Button>
                        <Button 
                            variant='outline-light' 
                            onClick={() => logOut()} 
                            className='mx-4'
                        >
                            Exit
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant='outline-light' onClick={() => history.push(LOGIN_ROUTE)}>Authorization</Button>
                    </Nav>

                }
            </Container>
        </Navbar>
    )
})

export default NavBar

