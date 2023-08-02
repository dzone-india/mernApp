import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box, Link } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import * as InvestwithusAction from "../../redux/actions/InvestwithusAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./blogManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import API_ENDPOINTS from "../../constants/api-endpoints";
// import API_ENDPOINTS from "./../../constants/api-endpoints";

import DropzoneWrapper from "../../common/DropzoneWrapper";
const InvestCreateUpdate = (props) => {
  // return null
  let investwithusData = props?.investwithus?.investwithusData;
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

  const getFileBlob = async (url, filename) => {
    // const
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], filename, { type: blob.type });
    return file;
  };
  const initialState = {
    whatWeDoHeader: investwithusData?.whatWeDoHeader || "",
    whatWeDoDescription: investwithusData?.whatWeDoDescription || "",
    whatWeDo: investwithusData?.whatWeDo
      ? investwithusData.whatWeDo
      : [
          { title: "", description: "" },
          { title: "", description: "" },
          { title: "", description: "" },
        ],
    howToInvestTitle: investwithusData?.howToInvestTitle || "",
    howToInvest: investwithusData?.howToInvest
      ? investwithusData?.howToInvest
      : [
          { title: "", description: "" },
          { title: "", description: "" },
          { title: "", description: "" },
        ],
    metaTitle: investwithusData?.metaTitle || "",
    metaKeywords: investwithusData?.metaKeywords || "",
    metaDescription: investwithusData?.metaDescription || "",
    image: investwithusData?.media[0]?.image || [],
    bannerImage: investwithusData?.media[0]?.bannerImage || [],
    // whatWeDoImages: investwithusData?.media[0]?.whatWeDoImages || [],
    // howToInvestImages: investwithusData?.media[0]?.howToInvestImages || [],
    id: id,
  };

  //
  const [state, setState] = useState(initialState);
  const [whatWeDoImages, setWhatWeDoImages] = useState([]);
  const [howToInvestImages, setHowToInvestImages] = useState([]);
  // const { whatWeDoImages, howToInvestImages } = state;
  useEffect(() => {
    if (props.investwithus.success) {
      // setRefresh(true);
      // const;
      setState(initialState);
    }
    // }, [investwithusData]);
  }, [investwithusData, whatWeDoImages, howToInvestImages]);
  // const [image, setImage] = useState([])
  // const [bannerImage, setBannerImage] = useState([])
  // const { image, bannerImage } = state;

  useEffect(() => {
    // const invokeBannerImage = async () => {
    //   if (investwithusData?.media[0].bannerImage?.length > 0) {
    //     // const
    //     const fileObject = await getFileBlob(
    //       API_ENDPOINTS.BASE_URL +
    //         investwithusData?.media[0].bannerImage[0]?.path,
    //       investwithusData?.media[0].bannerImage[0].filename
    //     );
    //     setState((prevState) => {
    //       return { ...prevState, bannerImage: [fileObject] };
    //     });
    //   }
    // };
    // invokeBannerImage();
    // const invokeImage = async () => {
    //   if (investwithusData?.media[0].image?.length > 0) {
    //     // const
    //     const fileObject = await getFileBlob(
    //       API_ENDPOINTS.BASE_URL + investwithusData?.media[0].image[0]?.path,
    //       investwithusData?.media[0].image[0].filename
    //     );
    //     setState((prevState) => {
    //       return { ...prevState, image: [fileObject] };
    //     });
    //   }
    // };
    // invokeImage();
    // const invokehowToInvestImages = async () => {
    //   if (investwithusData && investwithusData?.media[0]?.howToInvestImages) {
    //     const howToInvestImgs = [];
    //     // let counter = 0;

    //     await investwithusData?.media[0]?.howToInvestImages?.forEach(
    //       async (image, index) => {
    //         debugger;
    //         // const [fileObject,i]
    //         // const
    //         const fileObject = await getFileBlob(
    //           API_ENDPOINTS.BASE_URL + image.path,
    //           image.filename
    //         );
    //         howToInvestImgs.push(fileObject);

    //         // currWhatWeDoImages[i]=fileObject
    //         // const;
    //         if (
    //           index ===
    //           investwithusData?.media[0]?.howToInvestImages.length - 1
    //         ) {
    //           debugger;
    //           setHowToInvestImages(howToInvestImgs);
    //           // setState((prevState) => {
    //           //   return { ...prevState, howToInvestImages: howToInvestImgs };
    //           // });
    //         }
    //         // counter++;
    //       }
    //     );
    //     // setWhatWeDoImages(whatwedos);
    //   }
    // };
    // debugger;
    // invokehowToInvestImages();
    // const invokeWhatWeDoImages = async () => {
    //   if (investwithusData && investwithusData?.media[0]?.whatWeDoImages) {
    //     const whatwedos = [];
    //     // let counter = 0;
    //     await investwithusData?.media[0]?.whatWeDoImages?.forEach(
    //       async (image, index) => {
    //         // const [fileObject,i]
    //         // const
    //         const fileObject = await getFileBlob(
    //           API_ENDPOINTS.BASE_URL + image.path,
    //           image.filename
    //         );
    //         whatwedos.push(fileObject);

    //         // currWhatWeDoImages[i]=fileObject
    //         // const;
    //         if (
    //           index ===
    //           investwithusData?.media[0]?.whatWeDoImages.length - 1
    //         ) {
    //           setWhatWeDoImages(whatwedos);
    //           // setState((prevState) => {
    //           //   return { ...prevState, whatWeDoImages: whatwedos };
    //           // });
    //         }
    //         // counter++;
    //       }
    //     );
    //     // setWhatWeDoImages(whatwedos);
    //   }
    // };
    // invokeWhatWeDoImages();
  }, [investwithusData]);

  // useEffect(() => {
  //   if (investwithusData && investwithusData?.media[0]?.whatWeDoImages) {
  //     const whatwedos = new Array(investwithusData?.media[0]?.whatWeDoImages.length).fill(null);
  //     let counter=0
  //     investwithusData?.media[0]?.whatWeDoImages?.forEach((image,index) => {
  //       getFileObjectIndexed(index,image.filename,
  //         API_ENDPOINTS.BASE_URL + image.path,
  //          (fileObject,i) =>{

  //           // const
  //           // whatwedos.push(fileObject);
  //           whatwedos[i]=fileObject
  //           // currWhatWeDoImages[i]=fileObject
  //           if(i===counter)
  //           {
  //             setWhatWeDoImages(whatwedos)
  //           }
  //           counter++
  //         }
  //       );
  //     });
  //   }

  // }, [investwithusData]);
  // useEffect(() => {
  //   const howToInvestImgs = new Array(3).fill(null);;

  //   if (investwithusData && investwithusData?.media[0]?.howToInvestImages) {
  //     const
  //     // let counter=0
  //     investwithusData?.media[0]?.howToInvestImages?.forEach((image,index) => {
  //       getFileObjectIndexed(index,image.filename,
  //         API_ENDPOINTS.BASE_URL + image.path,
  //          (fileObject,i)=> {
  //           const
  //           howToInvestImgs[i]=fileObject
  //           // currWhatWeDoImages[i]=fileObject
  //           // if(i===counter)
  //           // {
  //           //   setHowToInvestImages(howToInvestImgs)
  //           // }
  //           // if(counter===investwithusData?.media[0]?.howToInvestImages.length-1)
  //           // {
  //           // }
  //           // counter++
  //         }
  //       );
  //     });
  //   }
  //   setHowToInvestImages(howToInvestImgs)
  // }, [investwithusData]);
  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };
  const whatToDoDetailTitleChange = (index, e) => {
    // let { name, value } = e.target;
    // const;
    const whatWeDos = [...state.whatWeDo];
    whatWeDos[index].title = e.target.value;
    setState({ ...state, whatWeDo: whatWeDos });
  };
  const howToInvestTitleChange = (index, e) => {
    // let { name, value } = e.target;
    const howToInvests = [...state.howToInvest];
    howToInvests[index].title = e.target.value;
    setState({ ...state, howToInvest: howToInvests });
  };
  const deleteWhatWeDoHandler = (index) => {
    const imgs = [...whatWeDoImages];
    imgs.splice(index, 1);
    setWhatWeDoImages(imgs);
    // setState((prevState) => {
    //   return { ...prevState, whatWeDoImages: imgs };
    // });
    const whatWeDos = [...state.whatWeDo];
    if (whatWeDos.length === 0) {
      whatWeDos[0] = { title: "", description: "" };
    } else {
      whatWeDos.splice(index, 1);
    }
    setState({ ...state, whatWeDo: whatWeDos });
  };
  console.log("whatwedo", state.whatWeDo);
  // console.log("bannerImage", state.bannerImage);
  // console.log("image", state.image);

  const addWhatWeDoHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let imgs = [...whatWeDoImages];
    imgs.push(null);
    // setState((prevState) => {
    //   return { ...prevState, whatWeDoImages, imgs };
    // });
    setWhatWeDoImages(imgs);
    const whatWeDos = [...state.whatWeDo];
    whatWeDos.push({ title: "", description: "" });
    // const;
    setState({ ...state, whatWeDo: whatWeDos });
  };
  console.log("state.whatWeDo", state.whatWeDo);
  const handleWhatWeDoImagesUpload = (index, file, status) => {
    //
    let imgs = [...whatWeDoImages];
    if (status === "removed") {
      imgs[index] = null;
      setWhatWeDoImages(imgs);
      // setState((prevState) => {
      //   return { ...prevState, whatWeDoImages: imgs };
      // });
    } else {
      if (status === "done") {
        imgs[index] = file.file;
        setWhatWeDoImages(imgs);
        // setState((prevState) => {
        //   return { ...prevState, whatWeDoImages: imgs };
        // });
      }
    }
  };
  const handleChangedFiles=(index,files)=>{
    let imgs = [...howToInvestImages];
    // if (status === "removed") {
      // const;
      // imgs[index] = null;
      // setState((prevState) => {
      //   return { ...prevState, howToInvestImages: imgs };
      // });
      // setHowToInvestImages(imgs);
    // } else {
      // if (status === "done") {
        // const;
        imgs[index] = files[0];
        // setState((prevState) => {
        //   return { ...prevState, howToInvestImages: imgs };
        // });

        setHowToInvestImages(imgs);
      // }
    // }
  }
  // const handleHowToInvestImagesUpload = (index, file, status) => {
  //   debugger;
  //   let imgs = [...howToInvestImages];
  //   if (status === "removed") {
  //     // const;
  //     imgs[index] = null;
  //     // setState((prevState) => {
  //     //   return { ...prevState, howToInvestImages: imgs };
  //     // });
  //     setHowToInvestImages(imgs);
  //   } else {
  //     if (status === "done") {
  //       // const;
  //       imgs[index] = file.file;
  //       // setState((prevState) => {
  //       //   return { ...prevState, howToInvestImages: imgs };
  //       // });

  //       setHowToInvestImages(imgs);
  //     }
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      whatWeDoHeader,
      whatWeDoDescription,
      whatWeDo,
      howToInvestTitle,
      howToInvest,
      id,
      metaTitle,
      metaKeywords,
      metaDescription,
      image,
      bannerImage,
      // whatWeDoImages,
      // howToInvestImages,
    } = state;
    const data = new FormData();
    if (id == null) {
      data.append("whatWeDoHeader", whatWeDoHeader);
      data.append("whatWeDoDescription", whatWeDoDescription);
      data.append("whatWeDo", JSON.stringify(whatWeDo)); //array
      // data.append("shortDescription", shortDescription);
      data.append("howToInvestTitle", howToInvestTitle);
      data.append("howToInvest", JSON.stringify(howToInvest)); //array
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);
      debugger
      bannerImage.forEach((b) => {
        data.append("bannerImage", b);
      });
      image.forEach((i) => {
        data.append("image", i);
      });
      whatWeDoImages.forEach((w) => {
        data.append("whatWeDoImages", w); //array
      });
      howToInvestImages.forEach((w) => {
        data.append("howToInvestImages", w); //array
      });
      dispatch(InvestwithusAction.InvestwithusAddRequestAsync(data));
    } else {
      debugger
      data.append("whatWeDoHeader", whatWeDoHeader);
      data.append("whatWeDoDescription", whatWeDoDescription);
      data.append("whatWeDo", JSON.stringify(whatWeDo)); //array
      data.append("howToInvest", JSON.stringify(howToInvest)); //array
      data.append("howToInvestTitle", howToInvestTitle);
      // data.append("header", header);
      bannerImage.forEach((b) => {
        data.append("bannerImage", b);
      });
      image.forEach((i) => {
        data.append("image", i);
      });
      whatWeDoImages.forEach((w) => {
        data.append("whatWeDoImages", w); //array
      });
      howToInvestImages.forEach((w) => {
        data.append("howToInvestImages", w); //array
      });
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);
      data.append("_id", id);
      dispatch(InvestwithusAction.InvestwithusUpdateRequestAsync(data));
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const handleWhatWeDoDetailTextEditor = (index, content, editor) => {
    // const;
    const whatWeDos = state.whatWeDo ? [...state.whatWeDo] : [];
    whatWeDos[index].description = content;
    setState((prevState) => {
      return { ...prevState, whatWeDo: whatWeDos };
    });
  };
  const handleHowToInvestTextEditor = (index, content, editor) => {
    const howToInvests = state.howToInvest ? [...state.howToInvest] : [];
    howToInvests[index].description = content;
    setState((prevState) => {
      return { ...prevState, howToInvest: howToInvests };
    });
  };
  const handleChangeWhatWeDoTextEditor = (content, editor) => {
    setState((prevState) => {
      return { ...prevState, whatWeDoDescription: content };
    });
  };
  const handleImageUpload = (file, status) => {
    if (status === "done") {
      // setImage([file.file] )
      setState({ ...state, image: [file.file] });
    }
  };

  const handleBannerImageUpload = (file, status) => {
    if (status === "done") {
      // setBannerImage([file.file])
      setState({ ...state, bannerImage: [file.file] });
    }
  };

  return (
    <Box className="MenuManagement_Data investWithUs">
      <FormHeader
        heading1={"Invest With Us Module Management"}
        heading2={"Create and Update Invest With Us Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"InvestwithusManagement"}
            heading2={"Edit Invest With Us Module"}
          />
          <SubHeading heading={"Edit Invest With Us Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"InvestwithusManagement"}
            heading2={"Add Invest With Us Module"}
          />
          <SubHeading heading={"Add Invest With Us Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        {/* <Box mt={2}/> */}
      </Grid>
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Invest With Us
            </Typography>
          </div>

          <div class="card-body">
            <ValidatorForm onSubmit={handleSubmit}>
              <Box mt={2} />
              <SubHeading heading={"Main Section"} />
              <Box mt={2} />

              <Grid
                className="form-group-item"
                item
                xs={12}
                sm={6}
                md={5}
                style={{ padding: "15px" }}
              >
                <Typography>Banner Image </Typography>
                <Dropzone
                  maxFiles="1"
                  multiple={false}
                  initialFiles={state?.bannerImage || []}
                  onChangeStatus={handleBannerImageUpload}
                  accept="image/*"
                />
              </Grid>
              <Grid
                className="form-group-item"
                item
                style={{ display: "flex", padding: "15px" }}
              >
                <Grid
                  className="form-group-item"
                  item
                  xs={12}
                  style={{ flex: 1 }}
                >
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Meta Title *"
                    fullWidth
                    value={state.metaTitle}
                    onChange={inputChange}
                    name="metaTitle"
                    id="metaTitle"
                  />
                </Grid>
                <Box sx={{ marginLeft: 3 }} />
                <Grid className="form-group-item" item style={{ flex: 1 }}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Meta Keywords*"
                    value={state.metaKeywords}
                    onChange={inputChange}
                    fullWidth
                    name="metaKeywords"
                    id="metaKeywords"
                  />
                </Grid>
                <Box sx={{ marginLeft: 3 }} />
                <Grid
                  className="form-group-item"
                  item
                  xs={12}
                  style={{ flex: 1 }}
                >
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    fullWidth
                    label="Meta Description*"
                    value={state.metaDescription}
                    onChange={inputChange}
                    name="metaDescription"
                    id="metaDescription"
                  />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={3}
                className="FormFildes"
                style={{ padding: "15px" }}
              ></Grid>
              <Box mt={2} />
              <SubHeading heading={"What We Do Section"} />
              <Box mt={2} />
              <Grid
                container
                spacing={3}
                className="FormFildes"
                style={{ padding: "15px" }}
              >
                <Grid
                  className="form-group-item"
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ padding: "15px" }}
                >
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="What we do header*"
                    fullWidth
                    value={state.whatWeDoHeader}
                    onChange={inputChange}
                    name="whatWeDoHeader"
                    id="whatWeDoHeader"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={3}
                className="FormFildes"
                style={{ padding: "15px" }}
              >
                <Grid className="form-group-item" item xs={12} sm={6} md={5}>
                  <Typography>Image </Typography>

                  <Dropzone
                    maxFiles="1"
                    multiple={false}
                    initialFiles={state?.image || []}
                    onChangeStatus={handleImageUpload}
                    accept="image/*"
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={12} md={12}>
                  <ReactQuill
                    onChange={handleChangeWhatWeDoTextEditor}
                    value={state.whatWeDoDescription || ""}
                    placeholder="What we do description"
                    theme="snow"
                  />
                </Grid>
              </Grid>

              <Grid
                className="form-group-item"
                item
                xs={12}
                style={{ padding: "15px" }}
              >
                <div className="card-header d-flex justify-content-between align-items-center">
                  <Typography component="h4" variant="h4">
                    What We Do Details
                  </Typography>
                </div>
                <Grid className="form-group-item" item xs={12} sm={12} md={12}>
                  {state.whatWeDo &&
                    state.whatWeDo.length > 0 &&
                    state.whatWeDo.map((whatWeDoItem, index) => {
                      // console.log("state?.whatWeDoImages[index]",whatWeDoImages[index])
                      return (
                        <Grid
                          className="form-group-item"
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <TextValidator
                            className="form-control-item"
                            variant="outlined"
                            style={{ marginTop: "15px" }}
                            label="Title*"
                            fullWidth
                            value={whatWeDoItem?.title || ""}
                            onChange={whatToDoDetailTitleChange.bind(
                              this,
                              index
                            )}
                            name="title"
                            // id="whatWeDoHeader"
                          />
                          <ReactQuill
                            onChange={handleWhatWeDoDetailTextEditor.bind(
                              this,
                              index
                            )}
                            value={whatWeDoItem?.description || ""}
                            placeholder="Enter description"
                            theme="snow"
                          />
                          {whatWeDoImages.length === state.whatWeDo.length && (
                            <Dropzone
                              maxFiles="1"
                              multiple={false}
                              initialFiles={
                                whatWeDoImages[index]
                                  ? [whatWeDoImages[index]]
                                  : []
                              }
                              onChangeStatus={handleWhatWeDoImagesUpload.bind(
                                this,
                                index
                              )}
                              accept="image/*"
                            />
                          )}
                          <div style={{ display: "flex" }}>
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              style={{ width: "10vw" }}
                              className={"CanceForm"}
                              onClick={deleteWhatWeDoHandler}
                            >
                              Delete
                            </Button>
                            {state.whatWeDo.length - 1 === index && (
                              <Button
                                onClick={addWhatWeDoHandler}
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ width: "10vw" }}
                                className={"SaveData"}
                              >
                                Add
                              </Button>
                            )}
                          </div>
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
              <Box mt={2} />
              <SubHeading heading={"How To Invest Components"} />
              <Box mt={2} />
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="How To Invest Title*"
                    fullWidth
                    value={state.howToInvestTitle}
                    onChange={inputChange}
                    name="howToInvestTitle"
                    id="howToInvestTitle"
                  />
                </Grid>
              </Grid>
              <Grid
                className="form-group-item"
                item
                xs={12}
                style={{ padding: "15px" }}
              >
                <div className="card-header d-flex justify-content-between align-items-center">
                  <Typography component="h4" variant="h4">
                    How To Invest Details
                  </Typography>
                </div>

                <Grid className="form-group-item" item xs={12} sm={12} md={12}>
                  {state?.howToInvest &&
                    state?.howToInvest.length > 0 &&
                    state?.howToInvest.map((howToInvestItem, index) => {
                      // debugger;
                      return (
                        <Grid
                          className="form-group-item"
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <TextValidator
                            className="form-control-item"
                            variant="outlined"
                            style={{ marginTop: "15px" }}
                            label="Title*"
                            fullWidth
                            value={howToInvestItem?.title || ""}
                            onChange={howToInvestTitleChange.bind(this, index)}
                            name="howToInvestDetailTitle"
                          />
                          <ReactQuill
                            onChange={handleHowToInvestTextEditor.bind(
                              this,
                              index
                            )}
                            value={howToInvestItem?.description || ""}
                            placeholder="Enter description"
                            theme="snow"
                          />
                          {/* {investwithusData?.media[0]?.whatWeDoImages[index]
                            ?.filename && ( */}
                            <DropzoneWrapper
                              preLoaded={true}
                              urls={[
                                investwithusData?.media[0]?.whatWeDoImages[
                                  index
                                ]?.path,
                              ]}
                              fileNames={[
                                investwithusData?.media[0]?.whatWeDoImages[
                                  index
                                ]?.filename,
                              ]}
                              changeFiles={handleChangedFiles.bind(
                                this,
                                index
                              )}
                            />
                          {/* )} */}
                          {/* {howToInvestImages.length === state.howToInvest.length  && (<>
                            <Dropzone
                              maxFiles="1"
                              multiple={false}
                              initialFiles={
                                howToInvestImages[index] > 0
                                  ? [howToInvestImages[index]]
                                  : []
                              }
                              onChangeStatus={handleHowToInvestImagesUpload.bind(
                                this,
                                index
                              )}
                              accept="image/*"
                            />
                            
                            </>
                          )} */}
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>

              <br />
              <br />
              <Box className="footer">
                <Button
                  // fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={"SaveData"}
                >
                  Save
                </Button>

                <Link component={RouterLink} to="/investwithus">
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    className={"CanceForm"}
                  >
                    Cancel
                  </Button>
                </Link>
              </Box>
            </ValidatorForm>
          </div>
        </div>
      </Grid>
    </Box>
  );
};

function mapStateToProps(state) {
  const { investwithus } = state;
  return {
    investwithus,
  };
}
export default connect(mapStateToProps)(InvestCreateUpdate);
