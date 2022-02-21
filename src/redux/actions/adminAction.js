
import {ADD_USER_BY_ADMIN,ADD_USER_FROM_TABLE} from '../constant'

const addUserByAdmin = (userObj) =>{

    
    return {
        type:ADD_USER_BY_ADMIN,
        payload: userObj
    }
}
const addUserFromTable = (userObj) =>{

    
    return {
        type:ADD_USER_FROM_TABLE,
        payload: userObj
    }
}


export default {addUserByAdmin,addUserFromTable};