// import DropzoneWrapper from "./index";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Grid, Typography, Box, Link } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import SubHeading from "../../common/SubHeadingBox";
import ReactQuill from "react-quill";
import { Link as RouterLink } from "react-router-dom";
import React, { useState, useEffect, useReducer } from "react";
import * as InvestwithusAction from "../../redux/actions/InvestwithusAction";
import DropzoneWrapper from "../../common/DropzoneWrapper";
const initialState = {
  whatWeDoHeader: "",
  whatWeDoDescription: "",
  whatWeDo: [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ],
  howToInvestTitle: "",
  howToInvest: [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ],
  metaTitle: "",
  metaKeywords: "",
  metaDescription: "",
  imageUrl: [],
  bannerImageUrl: [],
  whatWeDoImageUrls: [],
  howToInvestImageUrls: [],
  image: [],
  bannerImage: [],
  whatWeDoImages: [],
  howToInvestImages: [],
  id: null,
};
// const initialState = {
//   files: null,
// };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REPLACE_STATE":
      state = action.payload;
      return { ...state };
    case "SET_VALUE":
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    default:
      return state;
  }
};
const AddInvestWithUs = () => {
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const investwithus = useSelector((st) => st.investwithus);
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
  useEffect(() => {
    if (investwithusData) {
      dispatchReducer({
        type: "REPLACE_STATE",
        payload: {
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
          imageUrl: investwithusData?.media[0]?.image || [],
          bannerImageUrl: investwithusData?.media[0]?.bannerImage || [],
          whatWeDoImageUrls: investwithusData?.media[0]?.whatWeDoImages || [],
          howToInvestImageUrls:
            investwithusData?.media[0]?.howToInvestImages || [],
          image: [],
          bannerImage: [],
          whatWeDoImages: [],
          howToInvestImages: [],
          id: id,
        },
      });
    }
  }, [investwithusData]);

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
      whatWeDoImages,
      howToInvestImages,
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
      debugger;
      bannerImage.forEach((b) => {
        data.append("bannerImage", b);
      });
      image.forEach((i) => {
        data.append("image", i);
      });
      whatWeDoImages.forEach((w) => {
        w.forEach(item=>{
        data.append("whatWeDoImages", item); //array
        })        
      });
      howToInvestImages.forEach((w) => {
        w.forEach(item=>{
            data.append("howToInvestImages", item); //array
        })        
      });
      dispatch(InvestwithusAction.InvestwithusAddRequestAsync(data));
    } else {
      debugger;
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
        w.forEach(item=>{
        data.append("whatWeDoImages", item); //array
        })        
      });
      howToInvestImages.forEach((w) => {
        w.forEach(item=>{
            data.append("howToInvestImages", item); //array
        })        
      });
      data.append("metaTitle", metaTitle);
      data.append("metaKeywords", metaKeywords);
      data.append("metaDescription", metaDescription);
      data.append("_id", id);
      dispatch(InvestwithusAction.InvestwithusUpdateRequestAsync(data));
    }
  };
  const onBannerImageChangeFiles = (files) => {
    dispatchReducer({
      type: "SET_VALUE",
      payload: { name: "bannerImage", value: files },
    });
  };
  const onImageChangeFiles = (files) => {
    dispatchReducer({
      type: "SET_VALUE",
      payload: { name: "image", value: files },
    });
  };
  const onWhatWeDoChangeFiles = (index, files) => {
    const whatWeDoImgs = [...state.whatWeDoImages];
    whatWeDoImgs[index] = files;
    dispatchReducer({
      type: "SET_VALUE",
      payload: { name: "whatWeDoImages", value: whatWeDoImgs },
    });
  };
  const onHowToInvestImagesFiles = (index, files) => {
    const howToInvestImgs = [...state.howToInvestImages];
    howToInvestImgs[index] = files;
    dispatchReducer({
      type: "SET_VALUE",
      payload: { name: "howToInvestImages", value: howToInvestImgs },
    });
  };
  const handleWhatWeDoDetailTextEditor = (index, content, editor) => {
    // const;
    const whatWeDos = state.whatWeDo ? [...state.whatWeDo] : [];
    whatWeDos[index].description = content;
    dispatchReducer({
      type: "SET_VALUE",
      payload: { name: "whatWeDo", value: whatWeDos },
    });
    // setState((prevState) => {
    //   return { ...prevState, whatWeDo: whatWeDos };
    // });
  };
  const handleHowToInvestTextEditor = (index, content, editor) => {
    const howToInvests = state.howToInvest ? [...state.howToInvest] : [];
    howToInvests[index].description = content;
    dispatchReducer({
      type: "SET_VALUE",
      payload: { name: "howToInvest", value: howToInvests },
    });

    // setState((prevState) => {
    //   return { ...prevState, howToInvest: howToInvests };
    // });
  };
  const handleChangeWhatWeDoTextEditor = (content, editor) => {
    // setState((prevState) => {
    //   return { ...prevState, whatWeDoDescription: content };
    // });
    dispatchReducer({
      type: "SET_VALUE",
      payload: { name: "whatWeDoDescription", value: content },
    });
  };
  //   if(state.whatWeDoDescription)
  //   {
  //       debugger
  //   }
  const inputChange = (e) => {
    let { name, value } = e.target;
    dispatchReducer({ type: "SET_VALUE", payload: { name: [name], value } });
    // setState({ ...state, [name]: value });
  };
  const whatToDoDetailTitleChange = (index, e) => {
    // let { name, value } = e.target;
    // const;
    const whatWeDos = [...state.whatWeDo];
    whatWeDos[index].title = e.target.value;
    dispatchReducer({
      type: "SET_VALUE",
      payload: { name: "whatWeDo", value: whatWeDos },
    });
    // setState({ ...state, whatWeDo: whatWeDos });
  };
  const deleteWhatWeDoHandler = (index) => {
    // const imgs = [...whatWeDoImages];
    // imgs.splice(index, 1);
    // setWhatWeDoImages(imgs);
    // setState((prevState) => {
    //   return { ...prevState, whatWeDoImages: imgs };
    // });
    const whatWeDos = [...state.whatWeDo];
    if (whatWeDos.length === 0) {
      whatWeDos[0] = { title: "", description: "" };
    } else {
      whatWeDos.splice(index, 1);
    }
    // setState({ ...state, whatWeDo: whatWeDos });
    dispatchReducer({
      type: "SET_VALUE",
      payload: { name: "whatWeDo", value: whatWeDos },
    });
  };
  const addWhatWeDoHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // let imgs = [...whatWeDoImages];
    // imgs.push(null);
    // setState((prevState) => {
    //   return { ...prevState, whatWeDoImages, imgs };
    // });
    // setWhatWeDoImages(imgs);
    const whatWeDos = [...state.whatWeDo];
    whatWeDos.push({ title: "", description: "" });
    // const;
    // setState({ ...state, whatWeDo: whatWeDos });
    dispatchReducer({
      type: "SET_VALUE",
      payload: { name: "whatWeDo", value: whatWeDos },
    });
  };
  const howToInvestTitleChange = (index, e) => {
    // let { name, value } = e.target;
    const howToInvests = [...state.howToInvest];
    howToInvests[index].title = e.target.value;
    // setState({ ...state, howToInvest: howToInvests });
    dispatchReducer({
      type: "SET_VALUE",
      payload: { name: "howToInvest", value: howToInvests },
    });
  };
  const content = (
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
                {/* <Dropzone
                  maxFiles="1"
                  multiple={false}
                  initialFiles={state?.bannerImage || []}
                  onChangeStatus={handleBannerImageUpload}
                  accept="image/*"
                /> */}
                <DropzoneWrapper
                  preLoaded
                  urls={investwithusData?.media[0]?.bannerImage.map(
                    (m) => m.path
                  )}
                  fileNames={investwithusData?.media[0]?.bannerImage.map(
                    (m) => m.originalname
                  )}
                  changeFiles={onBannerImageChangeFiles}
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

                  {/* <Dropzone
                    maxFiles="1"
                    multiple={false}
                    initialFiles={state?.image || []}
                    onChangeStatus={handleImageUpload}
                    accept="image/*"
                  />*/}
                  <DropzoneWrapper
                    preLoaded
                    urls={investwithusData?.media[0]?.image.map((m) => m.path)}
                    fileNames={investwithusData?.media[0]?.image.map(
                      (m) => m.originalname
                    )}
                    changeFiles={onImageChangeFiles}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={12} md={12}>
                  {state.whatWeDoDescription && (
                    <ReactQuill
                      onChange={handleChangeWhatWeDoTextEditor}
                      defaultValue={state.whatWeDoDescription || ""}
                      placeholder="What we do description"
                      theme="snow"
                    />
                  )}
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
                          key={whatWeDoItem.title}
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
                          {whatWeDoItem?.description && (
                            <ReactQuill
                              onChange={handleWhatWeDoDetailTextEditor.bind(
                                this,
                                index
                              )}
                              defaultValue={whatWeDoItem?.description || ""}
                              placeholder="Enter description"
                              theme="snow"
                            />
                          )}
                          {investwithusData?.media[0]?.whatWeDoImages &&
                          investwithusData?.media[0]?.whatWeDoImages.length >
                            index + 1 ? (
                            <DropzoneWrapper
                              preLoaded
                              urls={[investwithusData?.media[0]?.whatWeDoImages[
                                index
                              ].path]}
                              fileNames={[investwithusData?.media[0]?.whatWeDoImages[
                                index
                              ].originalname]}
                              changeFiles={onWhatWeDoChangeFiles.bind(
                                this,
                                index
                              )}
                            />
                          ) : (
                            <DropzoneWrapper
                              preLoaded={false}
                              changeFiles={onWhatWeDoChangeFiles.bind(
                                this,
                                index
                              )}
                            />
                          )}
                          {/* {whatWeDoImages.length === state.whatWeDo.length && (
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
                          )} */}
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
                          key={howToInvestItem.title}
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
                          {howToInvestItem?.description && (
                            <ReactQuill
                              onChange={handleHowToInvestTextEditor.bind(
                                this,
                                index
                              )}
                              defaultValue={howToInvestItem?.description || ""}
                              placeholder="Enter description"
                              theme="snow"
                            />
                          )}
                          {/* {investwithusData?.media[0]?.whatWeDoImages[index]
                        ?.filename && ( */}
                          {/* <DropzoneWrapper
                            preLoaded={true}
                            urls={[
                              investwithusData?.media[0]?.whatWeDoImages[index]
                                ?.path,
                            ]}
                            fileNames={[
                              investwithusData?.media[0]?.whatWeDoImages[index]
                                ?.filename,
                            ]}
                            changeFiles={handleChangedFiles.bind(this, index)}
                          /> */}
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
                          {investwithusData?.media[0]?.howToInvestImages &&
                          investwithusData?.media[0]?.howToInvestImages.length >
                            index + 1 ? (
                            <DropzoneWrapper
                              preLoaded
                              urls={[investwithusData?.media[0]?.howToInvestImages[
                                index
                              ].path]}
                              fileNames={[investwithusData?.media[0]?.howToInvestImages[
                                index
                              ].originalname]}
                              changeFiles={onHowToInvestImagesFiles.bind(
                                this,
                                index
                              )}
                            />
                          ) : (
                            <DropzoneWrapper
                              preLoaded={false}
                              changeFiles={onHowToInvestImagesFiles.bind(
                                this,
                                index
                              )}
                            />
                          )}
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
  debugger;
  return investwithusData ? content : null;
  //   return investwithusData?.media[0]?.whatWeDoImages
  //     ? investwithusData?.media[0]?.whatWeDoImages.map((item, index) => {
  //         debugger;
  //         return (
  //           <DropzoneWrapper
  //             preLoaded
  //             urls={[i[index]]}
  //             fileNames={[names[index]]}
  //             changeFiles={(files)=>{}}
  //           />
  //         );
  //       })
  //     : null;
};
export default AddInvestWithUs;
