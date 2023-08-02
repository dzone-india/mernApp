import DropzoneWrapper from './index';
import { useDispatch,useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as InvestwithusAction from "../../redux/actions/InvestwithusAction";

const i=["https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZXxlbnwwfHwwfHw%3D&w=1000&q=80","https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60","https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=440&h=220&q=60"]
const names=["tree-736885__480.jpg","pexels-photo-674010.jpeg","field-6574455__480.jpg"]
const DropzoneWrapperTest=()=>{
    const investwithus=useSelector(st=>st.investwithus)
    let investwithusData = investwithus?.investwithusData;
    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
      let query = useQuery();
    let id = query.get("id");
    // const [, setRefresh] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
      let data = {
        _id: id,
      };
      if (id != null) {
        dispatch(InvestwithusAction.InvestwithusDataRequestAsync(data));
      }
    }, [id, dispatch]);
  
    return (
        investwithusData?.media[0]?.whatWeDoImages ?
        investwithusData?.media[0]?.whatWeDoImages.map((item,index)=>{
            debugger
            return (
                <DropzoneWrapper preLoaded urls={[i[index]]} fileNames={[names[index]]}/>
            )
        }):null
    )
    
}
export default DropzoneWrapperTest