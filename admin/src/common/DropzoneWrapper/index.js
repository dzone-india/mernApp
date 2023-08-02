import { useState, useEffect, useReducer } from "react";
import classes from "./DropzoneWrapper.module.css";
import API_ENDPOINTS from "../../constants/api-endpoints";
import Dropzone from "react-dropzone-uploader";
const initialState = {
  files: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FILES":
      state.files = action.payload;
      return { ...state };
    default:
      return state;
  }
};
const DropzoneWrapper = (props) => {
    // debugger
    // const {urls}=props
    // const [urlDisplay, setUrlDisplay] = useState('');
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setUrlDisplay(urls)
    //     },10)
    // },[])
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  //   const [initialFiles, setInitialFiles] = useState();
  const getFileBlob = async (url, filename) => {
    try {
      debugger
      const response = await fetch(API_ENDPOINTS.BASE_URL + url);
    //   const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], filename, { type: blob.type });
      // file.name=filename
      return file;
    } catch(error) {
      throw new Error("Error getting the file");
    }
    // const
  };
  const handleHowToInvestImagesUpload = (file, status) => {
    
    let files = [...state.files];
    if (status === "removed") {
      // const;
      setIsTouched(true);
      if(!multiple)
        files=[]
      else
        files = files.filter((f) => f.name !== file.file.name);
      dispatch({
        type: "ADD_FILES",
        payload: files,
      });
      // setState((prevState) => {
      //   return { ...prevState, howToInvestImages: files };
      // });
      //   setInitialFiles(files);
        props.changeFiles(files)
    } else {
      if (status === "done") {
        debugger;
        setIsTouched(true);
        files.push(file.file);
        dispatch({
          type: "ADD_FILES",
          payload: files,
        });
        // setState((prevState) => {
        //   return { ...prevState, howToInvestImages: files };
        // });

        // setInitialFiles(files);
        props.changeFiles(files)
      }
    }
  };
  const { urls, preLoaded, fileNames, accept, multiple, maxFiles } = props;
  //   const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  //   debugger
  useEffect(() => {
    const callFetch = async (urls, fileNames) => {
      const tasks = [];
      const results = [];
      urls.forEach((url, index) => {
        tasks.push(getFileBlob(url, fileNames[index]));
      });
      for (let iterator = 0; iterator < tasks.length; iterator++) {
        let result;
        try {
          result = await tasks[iterator];
          debugger
          results.push(result);
          if (iterator === tasks.length - 1) {
            dispatch({
              type: "ADD_FILES",
              payload: results,
            });
            // setInitialFiles(results)
            setIsLoaded(true);
            props.changeFiles(results)
          }
        } catch {}
      }
    };
    if (!preLoaded) {
      setIsLoaded(true);
      dispatch({
        type: "ADD_FILES",
        payload: [],
      });
    } else {
      if (urls && urls.length > 0 && urls[0] && !isTouched) {
        // debugger;
        callFetch(urls, fileNames);
      }
    }
  }, [urls, fileNames, preLoaded]);
  // debugger
  return (
    // state?.files && state?.files.length>0 ?
    <Dropzone
      maxFiles={maxFiles || 1}
      multiple={multiple || false}
      initialFiles={state?.files}
      onChangeStatus={handleHowToInvestImagesUpload}
      accept={accept || "image/*"}
    />
    // :null
  );
// return <div>URL:{state?.files && state?.files.length>0?state?.files[0]?.name:null}</div>
};
export default DropzoneWrapper;
