import React from 'react'
import './Header.css'
import {Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,
    NavLink,UncontrolledDropdown,NavItem,DropdownToggle,DropdownMenu,DropdownItem,Navigator
} from 'reactstrap';
import { useHistory} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import allAction from '../../../redux/actions/allAction';

const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.loginedUser);

    // console.log("user lay tu redux la ",currentUser)

    const redirectHome =() =>{

        history.push("/")
    }

    //function logout
    const handleLogOut = () =>{
    
        dispatch(allAction.loginUser.logOut());
        history.push('/login')
    }
    //function usermanager
    const handlerManagerUser = () =>{
        history.push('/manager-users')
    }

    //function usermanager redux
    const handleManageUserRedux = () =>{

            history.push('/manage-users')
    }

    const handleManageDoctor = () =>{
        history.push('/manager-doctors-redux')

    }
    const handleManageSchedule = () =>{
        history.push('/manage-schedule')

    }
    return (
        <div className='header-container'>
            <div className='header-title'>
            <Navbar
                    color="light"
                    expand="md"
                    light
                >
                    <NavbarBrand className='nav-home' onClick={() => redirectHome()}>
                    Home
                    </NavbarBrand>
                    <NavbarToggler onClick={function noRefCheck(){}} />
                    <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                  
                        <UncontrolledDropdown
                        inNavbar
                        nav
                        >
                        <DropdownToggle
                            caret
                            nav
                        >
                            Ng?????i d??ng
                        </DropdownToggle>
                        <DropdownMenu >
                        <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Qu???n l?? ng?????i d??ng
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageDoctor()}}>
                            Qu???n l?? th??ng tin b??c s???
                            </DropdownItem>
                          
                            <DropdownItem onClick={() =>{handleManageSchedule()}}>
                            Qu???n l?? k??? ho???ch kh??m b???nh
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown
                        inNavbar
                        nav
                        >
                        <DropdownToggle caret nav>
                            Ph??ng kh??m
                        </DropdownToggle>
                        <DropdownMenu end>
                        <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Qu???n l?? ph??ng kh??m
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Qu???n l?? b??c s???
                            </DropdownItem>
                         
                        </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown
                        inNavbar
                        nav
                        >
                        <DropdownToggle caret nav>
                            Chuy??n khoa
                        </DropdownToggle>
                        <DropdownMenu end>
                        <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Qu???n l?? chuy??n khoa
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Qu???n l?? b??c s???
                            </DropdownItem>
                           
                        </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown
                        inNavbar
                        nav
                        >
                        <DropdownToggle caret nav>
                            C???m nang
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem onClick={() =>{handlerManagerUser()}} >
                            Qu???n l?? c???m nang
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Qu???n l?? b??c s???
                            </DropdownItem>
                            {/* <DropdownItem divider /> */}
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                   
                    </Collapse>
             </Navbar>
        </div>
  
            <div className='header-logout'>
            <span className='welcome'>Xin ch??o : {currentUser&& currentUser.user.hovaten ?currentUser.user.hovaten:''}</span>
                <button className='btn-logout'onClick={() =>handleLogOut()}  title='????ng xu???t'>
                <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </div>
    )
}

export default Header
