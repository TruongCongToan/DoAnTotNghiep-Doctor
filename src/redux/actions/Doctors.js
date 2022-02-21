import {ADD_ALL_DOCTORS,ADD_OUTSTANDING_DOCTORS} from '../constant'


const addAllDoctor = (doctorsObj) => {
    return {
        type:ADD_ALL_DOCTORS,
        payload: doctorsObj
    }
}

const addOutStandingDoctors = (doctorsObj) => {
    return {
        type:ADD_OUTSTANDING_DOCTORS,
        payload: doctorsObj
    }
}
export default {addAllDoctor,addOutStandingDoctors}
