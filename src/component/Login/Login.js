import React,{useState} from 'react'

import '../Login/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// import {handleLoginAPI} from '../Login/userService';
import {useFetch, editUser} from '../CustomHooks/useFetch'
import { useHistory} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import allAction from '../../redux/actions/allAction';


const Login = () => {

    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [isShowPassword, setisShowPassword] = useState(false);  
    const [errorMessage, setErrorMessage] = useState('');
   
    const history = useHistory();

    var url='https://api-truongcongtoan.herokuapp.com/api/users';
    var url_Admin = 'https://api-truongcongtoan.herokuapp.com/api/admin/';    
    //fetch data 
    const { data:data } = useFetch(url);
    const {data:admin} = useFetch(url_Admin);
    
    //connect voi redux , lay ra du lieu
    const currentUser = useSelector(state => state.loginedUser);
    // console.log("user redux :",currentUser)
    const user = {
      username:'toan',
      password:'123',
      email:'123',
      address:'123',
      gender:'123',

    };
    //truyen data len redux
     const dispatch = useDispatch()
    
      const handleOnchangeInputName = (event) =>{
        setUserName(event.target.value);
      }
      //function lay du lieu vao password
      const handleOnchangeInputPassword =(event) =>{
        setPassWord(event.target.value)
      }
      //create new user
    const checkLoggedin =async (url,data) =>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
      try {
          let response = await editUser(url,data);
   console.log("response" , response)
  
          
      } catch (error) {
          // alert("username bạn vừa nhập đã có trong danh sách. Bạn vui lòng thực hiện lại !")
          console.log(error)
      }
  }
    
      //function login ; neu function la bat dong bo thi se su dung async
      const handleLogin = async  () =>{
    
        if (userName === "admin") {
           
          if (admin[0].username === userName && admin[0].password !== passWord) {
        
            setErrorMessage("Sai mật khẩu")
           } else if (admin[0].username !== userName && admin[0].password === passWord) {
            setErrorMessage("Tên đăng nhập không chính xác")
  
          }else if  (admin[0].username !== userName && admin[0].password !== passWord) {
            
            setErrorMessage("Tên đăng nhập hoặc mật khẩu không chính xác")
          }else{
            dispatch(allAction.loginUser.addUser(admin[0]));
            checkLoggedin(url_Admin,admin[0]);
          }
          history.push("/manager-users-redux")
          console.log("dang nhap bang admin ");

        }else{
          
       data.map(item =>{
         if (item.username === userName && item.password !== passWord) {
          
          setErrorMessage("Sai mật khẩu")
         } else if (item.username !== userName && item.password === passWord) {
          setErrorMessage("Tên đăng nhập không chính xác")

        }else if  (item.username !== userName && item.password !== passWord) {
          
          setErrorMessage("Tên đăng nhập hoặc mật khẩu không chính xác")
        }else{
          

          user.username= item.username;
            user.email=item.email;
            user.password=item.password;
            user.phonenumber=item.phonenumber;
            user.gender=item.gender;
            user.position=item.position;
            user.role=item.role;
            user.address=item.address;
            user.image= item.image;
            user.action = item.action;
            user.active = 1;
  
            dispatch(allAction.loginUser.addUser(user));
            checkLoggedin(url,user);

            console.log("dang nhap bang user");

          // console.log("gia tri thu duoc la ", user)

          // dispatch(allAction.userAction.addUser({
          //   username:userName,
          //   password:passWord,
          // }));
        //  history.push("/")
        }      
       });
      }
    
    }
  
   //function an/hien password
      const handleShowHidePassword =() =>{
        setisShowPassword(!isShowPassword);
      }
       
    
    return (
        <div className ="login-background">
            <div className = "login-container">
            {/* them chu row de dung bootstrap ben duoi*/ }
              <div className ="login-content row "> 
                <div className ="col-12 text-login">Đăng nhập</div>
                <div className="col-12 form-group login-input">
                    <label className="lb-username">Tên đăng nhập:</label>
                    {/* muon dat gia tri cho 1 input thi su dung value va dau {} de truy cap den 1 bien trong react*/}
                    {/* su kien onchange lay ra gia tri nhap */}
                    <input type ="text" 
                    className="form-control"
                    placeholder="Nhập tên đăng nhập"
                    value={userName}
                    onChange ={(event) => handleOnchangeInputName(event) }
                    />
                </div>
                <div className="col-12 form-group">
                    <label className="lb-password">Mật khẩu:</label>
                    <div className="custom-input-password">
                    <input type ={isShowPassword ?'text':'password'} 
                    className="form-control" 
                    placeholder="Nhập mật khẩu"
                    value={passWord}
                    onChange ={(event) => handleOnchangeInputPassword(event) }
                    />
                   <span onClick = {() => handleShowHidePassword()}>
                   <i className={isShowPassword?'far fa-eye':'far fa-eye-slash'}></i>
                   </span>
                    </div>
                </div>

                <div className="col-12 errorMsg" >
                  {errorMessage}
                </div>

                <div className="col-12"> 
                  <button className="btn-login" onClick ={() => {handleLogin()}}>Đăng nhập</button>
                </div>
                <div className = "col-12">
                  <span className="forgot-password">Quên mật khẩu ?</span>
                  <span className="sign-up">Đăng ký tài khoản</span>
                </div> 
                 
                <div className="col-12 text-center mt-3">
                <span className="text-other-login">Hoặc đăng nhập với: </span>
                </div>
                <div className="col-12 social-login" >
                  <i className="fab fa-google-plus-g google" />   
                        
                  <i className="fab fa-facebook-f facebook" />                
                </div>
              </div>
            </div>
           
        </div>
        
    );
}

export default Login 
