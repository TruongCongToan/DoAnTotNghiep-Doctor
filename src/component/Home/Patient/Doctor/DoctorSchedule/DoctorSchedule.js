import React,{useState,useEffect} from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { getSchedulebyDate } from '../../../../CustomHooks/useFetch'
import { useParams } from 'react-router-dom';
import './DoctorSchedule.css'
const DoctorSchedule = () => {

   const [alldays, setalldays] = useState([]);
    const [allAvaiableTime, setallAvaiableTime] = useState([])

   let { id } = useParams();
         // console.log(moment(new Date).locale('vi').format('dddd - DD/MM'))
  let arrDate = [];
  for (let i = 0; i < 7; i++) {
    let object = {}
    object.label=moment(new Date()).locale('vi').add(i,'days').format('dddd - DD/MM')
    object.value=moment(new Date()).add(i,'days').startOf('day').valueOf();

    arrDate.push(object);

  }
  useEffect( () => {
    setalldays(arrDate);
  }, [])
  // console.log("gia tri cua mang la ",alldays)
  const handleOnchangeSelect = async (e) =>{
    let date = e.target.value
  

   if(id != null){
    let res = await getSchedulebyDate(id,date)
    if (res) {
      setallAvaiableTime(res.data?res.data:[])
    }else{

    }
    console.log("gia tri ket qua",res)
   }
  }


  return (

    <div className='doctor-schedule-container'> 
        <div className='all-schedule'>
          <select onChange={(e)=>handleOnchangeSelect(e)}>
            {
              alldays && alldays.length > 0 && 
              alldays.map((item,index) =>{
                return(
                  <option value={item.value} key={index}>{item.label}</option>
                )
              })
            }
          </select>
        </div>
        <div className='all-available-time'> 
            <div className='text-calendar'>
            <i className="fas fa-calendar-alt">  <span>Lịch khám</span></i>
            </div>
            <div className='time-content'>
               {allAvaiableTime && allAvaiableTime.length>0&&allAvaiableTime.map((item,index) =>{
                 console.log("item la ",item.timetype)
               })}
            </div>
        </div>
    </div>
  )
}

export default DoctorSchedule