import React from 'react'
import './Header.css'
import {Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,
    NavLink,UncontrolledDropdown,NavItem,DropdownToggle,DropdownMenu,DropdownItem,Navigator
} from 'reactstrap';
import { useHistory} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import allAction from '../../../redux/actions/allAction';
import { useFetch ,editUser} from '../../CustomHooks/useFetch';

const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.loginedUser);

    // console.log("user lay tu redux la ",currentUser)

    //goi api lay data 
    var url_Users="https://api-truongcongtoan.herokuapp.com/api/users";
    var url_Admin = 'https://api-truongcongtoan.herokuapp.com/api/admin';    

    // const {data:userData}= useFetch(url_Users);

    const user = {
        username:'toan',
        password:'123',
        email:'123',
        address:'123',
        gender:'123',
  
      };

    const redirectHome =() =>{

        history.push("/")
    }

    //lout user
    const checkLogOut =async (data) =>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        try {
            if (data.username === "admin") {
              await editUser(url_Admin,data);
             
            }else{
            await editUser(url_Users,data);
           
            }
  
        } catch (error) {
            // alert("username bạn vừa nhập đã có trong danh sách. Bạn vui lòng thực hiện lại !")
            console.log(error)
        }
    }

    //function logout
    const handleLogOut = () =>{
        // history.push("/login")
        // user.username= currentUser.user.username;
        // user.email=currentUser.user.email;
        // user.password=currentUser.user.password;
        // user.phonenumber=currentUser.user.phonenumber;
        // user.gender=currentUser.user.gender;
        // user.position=currentUser.user.position;
        // user.role=currentUser.user.role;
        // user.address=currentUser.user.address;
        // user.image= currentUser.user.image;
        // user.action = currentUser.user.action;
        // user.active = 0;

        // checkLogOut(user);

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
                            Người dùng
                        </DropdownToggle>
                        <DropdownMenu >
                        <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý người dùng
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageDoctor()}}>
                            Quản lý thông tin bác sỹ
                            </DropdownItem>
                          
                            <DropdownItem onClick={() =>{handleManageDoctor()}}>
                            Quản lý kế hoạch khám bệnh
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown
                        inNavbar
                        nav
                        >
                        <DropdownToggle caret nav>
                            Phòng khám
                        </DropdownToggle>
                        <DropdownMenu end>
                        <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý phòng khám
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý bác sỹ
                            </DropdownItem>
                         
                        </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown
                        inNavbar
                        nav
                        >
                        <DropdownToggle caret nav>
                            Chuyên khoa
                        </DropdownToggle>
                        <DropdownMenu end>
                        <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý chuyên khoa
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý bác sỹ
                            </DropdownItem>
                           
                        </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown
                        inNavbar
                        nav
                        >
                        <DropdownToggle caret nav>
                            Cẩm nang
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem onClick={() =>{handlerManagerUser()}} >
                            Quản lý cẩm nang
                            </DropdownItem>
                            <DropdownItem onClick={() =>{handleManageUserRedux()}}>
                            Quản lý bác sỹ
                            </DropdownItem>
                            {/* <DropdownItem divider /> */}
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                   
                    </Collapse>
             </Navbar>
        </div>
  
            <div className='header-logout'>
            <span className='welcome'>Xin chào : {currentUser&& currentUser.user.username ?currentUser.user.username:''}</span>
                <button className='btn-logout'onClick={() =>handleLogOut()}  title='Đăng xuất'>
                <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </div>
    )
}

export default Header
