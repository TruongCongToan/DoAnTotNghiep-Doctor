//tong hop cac reducers con lai

import { combineReducers } from "redux";
import loginedUser from './loginedUser'
import allCodeReducer from "./allCodeReducer";
import adminReducer from "./adminReducer";
import DoctorReducer from "./DoctorReducer";

// combineReducers de tong hop lai tat ca ca reducer 
const rootReducers = combineReducers({
    loginedUser: loginedUser,
    allCode:allCodeReducer,
    admin:adminReducer,
    doctor:DoctorReducer
   

});
export default rootReducers;