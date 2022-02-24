import React from 'react'
import DoctorHeader from '../../manageUser/Header/DoctorHeader'
import AdminHeader from '../../manageUser/Header/AdminHeader'
import { useSelector } from 'react-redux';
import { USER_ROLE } from '../../../redux/constant';

const ManageSchedule = () => {

    const redux_user_loginedUser=useSelector(state=>state.loginedUser);

    const checkUserRole = () =>{
        if (redux_user_loginedUser && redux_user_loginedUser.user&&redux_user_loginedUser.user.role) {
              let role = redux_user_loginedUser.user.role;
              if (role === USER_ROLE.ADMIN) {
                  console.log("admin")
                  return <AdminHeader/>
              }else if(role === USER_ROLE.DOCTOR){
                  console.log("doctor");
                  return <DoctorHeader/>
              }else{
                  console.log("patient")
                  return <AdminHeader/>
              }
        }
    }
  return (
    <React.Fragment>
    {
        checkUserRole()
    }
          
    <div>manageSchedule</div>
    </React.Fragment>
  )
}

export default ManageSchedule