import React,{useState,useEffect, Fragment}  from 'react'
import './UserManagerRedux.css'
import { useFetch ,handleLoginAPI,deleteUser,editUser} from '../../CustomHooks/useFetch'
import Header from '../Header/Header'
import { useSelector,useDispatch } from 'react-redux';
import allAction from '../../../redux/actions/allAction';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

import TableManagerUser from './TableManagerUser';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModalUser from './modalUser';

import {CRUD_ACTION } from '../../../redux/constant'

import LoadingPage from '../../CustomHooks/LoadingPage/LoadingPage';


const UserManagerRedux = () => {

    var url_Gender='https://api-truongcongtoan.herokuapp.com/api/allcode/gender';
    var url_Position= 'https://api-truongcongtoan.herokuapp.com/api/allcode/position';
    var url_Roles= 'https://api-truongcongtoan.herokuapp.com/api/allcode/role';
    var url_Users="https://api-truongcongtoan.herokuapp.com/api/users";
    var url_OutStandingDoctor = "https://api-truongcongtoan.herokuapp.com/api/users/0/6";
    //fetch data 
    const { data:gender } = useFetch(url_Gender);
    const {data:position} = useFetch(url_Position);
    const {data:role} = useFetch(url_Roles);
    const {data:userList} = useFetch(url_Users);
    const {data:outstandingDoctor} = useFetch(url_OutStandingDoctor);
    //truyen data len redux
    const dispatch = useDispatch();


    //object de luu vao redux
    const allCode ={
        gender:[],
        position:[],
        role:[],
       
    }
    const user={
        username:'',
        email:'',
        password:'',
        phonenumber:'',
        gender:'M',
        position:'P0',
        image:'',
        role:'R1',
        address:'',
        action:''
       
    }
   
   //delete user
   const removeUser = async (user) =>{
    
    try {
        let response = await deleteUser(url_Users,user.username)
        console.log(response)
        // refresh(); //reload lai trang
    } catch (error) {
        console.log(error)
    } 
}

    //lay ra data from redux
    const redux_AllCode = useSelector(state => state.allCode);

    const redux_user_Admin=useSelector(state=>state.admin);

    const redux_user_Doctors=useSelector(state=>state.doctor);
    // console.log("api data thu duioc la :" ,redux_user_Doctors.listOutStandingDoctors) 

     const [previewImgURL, setpreviewImgURL] = useState('');
     const [isOpen, setisOpen] = useState(false);
     const [avatarIn, setavatarIn] = useState('');
     const [isOpenModal, setIsOpenModal] = useState(false);
     const [userEditData, setuserEditData] = useState('');
     const [loading, setloading] = useState(false);


    const [state, setstate] = useState({
        email:'',
        username:'',
        password:'',
        phonenumber:'',
        gender:'M',
        position:'P0',
        image:'',
        role:'R1',
        address:'',
        action:CRUD_ACTION.CREATE

    });
  
    //loop to push data into redux of allcode
        useEffect(() => {
            allCode.gender=gender;
            allCode.role=role;
            allCode.position=position;
            dispatch(allAction.allCodeAction.addAllCode(allCode));
            // dispatch(allAction.adminAction.addUserByAdmin(userList));
        }, [gender,role,position]);

  
        useEffect(() => {
            if (userList) {
                dispatch(allAction.adminAction.addUserByAdmin(userList));
                setloading(true);
            }

        }, [userList]);
        useEffect(() => {
          if (outstandingDoctor) {
            dispatch(allAction.addOutStandingDoctors.addOutStandingDoctors(outstandingDoctor));
          }
        }, [outstandingDoctor])
        //onchange input
    const onChangeInput = (event,id) =>{

        let copyState={...state};
        copyState[id] = event.target.value;
        setstate({...copyState});
    }
    //check validate
    const checkValidnput = () =>{
      let isValid = true;
        let arrCheck = ['username','email','password','phonenumber','gender','position','role','address'];
        for (let index = 0; index < arrCheck.length; index++) {
            const element = arrCheck[index];
             if (!state[element]) {
                alert("Không được bỏ trống ô : "+element +" !")
                // toast.error("Dữ liệu không được bỏ trống !")
                isValid = false;
                break;
            }
         }
        return isValid;
    }
  
      //create new user
      const createNewUser =async (data) =>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        try {
            let response = await handleLoginAPI(url_Users,data);
             console.log("response" , response)
            
        } catch (error) {
            // alert("username bạn vừa nhập đã có trong danh sách. Bạn vui lòng thực hiện lại !")
            console.log(error)
        }
    }
    //function update user
    const updateUser = (data) =>{    
         handleAddUser();
        var index = userList.indexOf(data);
        // console.log("index la " ,index)
        setuserEditData(data);
        if (index > -1) {
            
            redux_user_Admin.listUsers && redux_user_Admin.listUsers.length >0
            &&redux_user_Admin.listUsers.map( (item) =>{
                
              if (item.username === data.username) {
                
               setstate({
               email:item.email,
               username:item.username,
               password:item.password,
               phonenumber:item.phonenumber,
               gender:item.gender,
               position:item.position,
               image:item.image,
               role:item.role,
               address:item.address,
               action:CRUD_ACTION.EDIT
           });
        
          dispatch(allAction.adminAction.addUserFromTable(state));

               }
           })
        }
}

    //handle onchange
    const handleOnchangeImage =(event) =>{
        let file = event.target.files[0];
       if (file) {
        let objectUrl = URL .createObjectURL(file);
        setpreviewImgURL(objectUrl);
        setavatarIn(file);
       }
    }

    //handle open zoom image
    const openPreviewImg =() =>{
        if (!previewImgURL ) {
            return;
        }
        setisOpen(true);
    }
    //close zoom anh
    const closePrviewImg =() =>{
        setisOpen(false);
    }
    //open modal
    const handleAddUser = () =>{
       
        setIsOpenModal(!isOpenModal);
       
     }

    //close modal
     const toggleUserModal = () =>{
        setIsOpenModal(!isOpenModal);
    }  


    const [baseImage, setBaseImage] = useState("");
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
      };
    
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
      
    return (
   
        <div className='user-redux-container'>    
        {
            loading?

            <React.Fragment>
            <ModalUser
             isOpen = {isOpenModal}
             toggleCloseModel = {toggleUserModal}
            //  createNewUser ={handleSave}
             userList ={userList}
             redux_AllCode = {redux_AllCode}
             />
                

             <Header/>
            <div className='user-manager-redux-title'>
            
                Quản lý người dùng Redux
            </div>
            <div className='user-manager-redux-body'>
         
            <div className='container'>

                 <div className='mx-1'>
                        <button 
                        className='btn btn-primary px-3' 
                        onClick={() => handleAddUser()}
                        >
                        <i className="fas fa-plus"></i>Thêm người dùng</button>
                </div>

                <div className='row'>

                    <div className='col-12'>
                
                        <TableManagerUser 
                          removeUser = {removeUser} 
                          userList = {userList}  
                          editOneUser = {updateUser}
                          action={state.action}
                         
                          /> 
                      
                     </div>
                
                </div>
            </div>
            

            </div>
          {/* {
              isOpen===true &&
              <Lightbox
              mainSrc={previewImgURL}
              onCloseRequest={() => closePrviewImg()}
            />
          } */}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
        />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
        />
            </React.Fragment>
            :<LoadingPage/>
        }
        </div>

    )
}

export default UserManagerRedux;