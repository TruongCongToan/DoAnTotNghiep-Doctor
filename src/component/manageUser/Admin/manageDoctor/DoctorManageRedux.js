import React, { useState ,useEffect,useCallback} from 'react'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Header from '../../Header/Header';

import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './DoctorManageRedux.css';
import Select from 'react-select';
import { useSelector,useDispatch } from 'react-redux';
import { useFetch ,handleLoginAPI,editMarkdown} from '../../../CustomHooks/useFetch'
import LoadingPage from '../../../CustomHooks/LoadingPage/LoadingPage';
import {getDetailInforDoctor} from '../../../CustomHooks/useFetch';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
   
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const url_MarkDown = 'https://api-truongcongtoan.herokuapp.com/api/markdowns/';
const url_doctor = 'https://api-truongcongtoan.herokuapp.com/api/users/doctors'; 

const DoctorManageRedux = () => {


    const [contentMarkDown, setContentMarkDown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [selectedDoctor, setselectedDoctor] = useState({});
    const [description, setdescription] = useState('');
    const [loading,setloading] = useState(false);
    const [errorFlg,setErrorFlg] = useState(false);
    const [detailDoctor, setdetailDoctor] = useState({});
    const [HaveOldData, setHaveOldData] = useState(false);
    const [user, setUser] = useState({});

    let listDoctors = [];
    let listfullDoctors = [];
 
    const [state, setstate] = useState({
        contentMarkDown:'',
        contentHTML:'',
        description:'',
        markdown_id:'',
        specialtyID:'',
        clinicID:'',
        users:''
        
    });

    //fetch data doctor 
    const { data:doctors } = useFetch(url_doctor);
    
    const [isOK, setIOK] = useState(false)

    //handle save content markdown
    const handleSaveContentMarkdown = () =>{
        if (HaveOldData === false) {
            try {
                createNewPost(state);
            } catch (error) {
                toast.error("Không thể thêm mới thông tin vui lòng kiểm tra lại !")
            }
        }else if(HaveOldData === true){           
            try {
                editMarkdown(url_MarkDown,state);
                toast.success("Cập nhật thông tin thành công !")
            } catch (error) {
                toast.error("Không thể sửa thông tin vui lòng kiểm tra lại !")
            }
        }  
    }

    const createNewPost = async (data) =>{                                                                                                                                                         
        try {
           handleLoginAPI(url_MarkDown,data);
          toast.success("Thêm thông tin thành công !")
          setHaveOldData(true);

        } catch (error) {
            console.log(error)
        }
    }
//handle change selected doctor
    const handleSelect = async (doctor) =>{
    try{   setselectedDoctor(doctor);
        let response = await getDetailInforDoctor(doctor.value);

          if (response!=null) {
            setdetailDoctor(response.data);
            }
        if (response && response.status===200 && response.data) {
           let doctorInfo = response.data;
            if(!doctorInfo.description && !doctorInfo.contentMarkDown){
                setdescription('');
                setContentMarkDown('');
                setHaveOldData(false);
            }else
            if (doctorInfo.description && !doctorInfo.contentMarkDown) {
                setdescription(doctorInfo.description);
                setContentMarkDown('');
                setHaveOldData(true);
            }else{
                setdescription(doctorInfo.description);
                setContentHTML(doctorInfo.contentHTML);
                setContentMarkDown(doctorInfo.contentMarkDown);
                setHaveOldData(true)
            }
            setIOK(true);
            
        }
        else{
            setdescription('');
            setContentHTML('');
            setContentMarkDown('');
            setHaveOldData(false);
        }

    }catch(error){
        console.log(error)
        setdescription('');
        setContentHTML('');
        setContentMarkDown('');
        setHaveOldData(false);

        }
    }

    //handle on change desciption
    const handleOnchangeDescription = (event) =>{
        setdescription(event.target.value);
    }

    // Finish!
const handleEditorChange = ({ html, text }) =>{
    setContentMarkDown(text);
    setContentHTML(html);
  }

  const redux_user_Admin=useSelector(state=>state.admin);

  useEffect(() => {
  if ( doctors&&doctors.length>0) {
    for (let i = 0; i < doctors.length; i++) {
        listDoctors.push(buildDataInput(doctors[i]));   
        listfullDoctors.push(doctors[i])
    }
  }
  let obj = listfullDoctors.find(o => o.hovaten === selectedDoctor.label);
  setUser(obj);
  },[selectedDoctor,listDoctors]);

//   console.log("nguoi dung duoc chon la ",user)
  useEffect(() => {
    setstate({
        contentMarkDown:contentMarkDown,
        contentHTML:contentHTML,
        description:description,
        users:user,
        // selectedDoctor:selectedDoctor,
        markdown_id:selectedDoctor.value
    });
    
 

  }, [contentMarkDown,description]);

  useEffect(() => {
    if (doctors) {
        setloading(true);
    }

}, [doctors]);

  const buildDataInput = (inputData) =>{
    let object  = {};
   if ( inputData ) {
      
    object.value = inputData.user_id;
 object.label = `${inputData.hovaten}`;
    //    console.log("input data is ",inputData)
   }
    return object;
  }

  

    return (
       <React.Fragment>
          {
               loading ?
            <React.Fragment>
            <Header/>
            <div className='manage-doctor-container'>
            
                   <div className='manage-doctor-title'>
                      Tạo thông tin cho bác sỹ
                   </div>
                  
                   <div className='manage-doctor-editor'>
                   <div className='doctor-info'>
                   <div className='content-left form-group'>
                        <label>Chọn bác sỹ</label>
                        <Select
                           defaultValue={selectedDoctor}
                           onChange={handleSelect}
                           options={listDoctors}
                       />
                         
                    </div>
                    <div className='content-right form-group'>
                        <label>Thông tin giới thiệu: </label>
                         <textarea className='form-control' 
                         rows="4"
                         onChange={(event)=>handleOnchangeDescription(event)}
                         value={description}
                         >
                         </textarea>
                    </div>
                    </div>
                       <MdEditor 
                       style={{ height: '500px' }} 
                       renderHTML={text => mdParser.render(text)} 
                       onChange={handleEditorChange} 
                       value={contentMarkDown}
                       />

                   </div>
                   <button 
                   className={HaveOldData === true ?'save-content-doctor':'create-content-doctor'}
                   onClick={() => handleSaveContentMarkdown()}
                  
                   >
                     {
                         HaveOldData===true?
                           <span>Lưu thông tin</span>
                           :  <span>Tạo thông tin</span>
                     }
                   </button>
          
           </div>
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
       </React.Fragment>
    )
}

export default DoctorManageRedux
