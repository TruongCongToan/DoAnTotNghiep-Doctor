import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (URL = "", params = {}) =>{
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const [shouldRefetch, refetch] = useState({}); 
  const refresh = () => refetch({});

  useEffect(() => {
    let isSubscribe = true;
    (async function fetchData() {
      try {
        const response = await axios.get(URL,params);
        if (isSubscribe && response.status === 200) {
          setData(response.data || null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        isSubscribe && setIsLoading(false);
      }
    })();
    return () => (isSubscribe = false);
  }, [shouldRefetch]);
  return { isLoading, data,refresh };
}
//https://api-truongcongtoan.herokuapp.com/api/users

//add new user 
const handleLoginAPI = (URL = "", data = {}) => {
  // console.log(" bac sy la",data , "url la ",URL)

  axios.post(URL, data)
  .then(response =>
    console.log(response)
    );

  // return axios.post(URL, data);
};

//delete user
const deleteUser = (URL = "",username) =>{
  return axios.delete(URL+'/'+username);
}
//sua user
const editUser = (URL = "",params = {}) =>{
  return axios.put(URL+"/"+params.username,params);
 
}
//sua markdown
const editMarkdown = (URL = "",params = {}) =>{
  return axios.put(URL+"/"+params.markdown_id,params);
}
//get markdown thong qua markdown_id
const getDetailInforDoctor = async (inputId) =>{
  let url = `https://api-truongcongtoan.herokuapp.com/api/markdowns/${inputId}`;
  return  axios.get(url);  
}

export  {useFetch,handleLoginAPI,deleteUser,editUser,editMarkdown,getDetailInforDoctor};