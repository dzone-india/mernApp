import axios from "axios";
import Logger from "../utils/Logger";
import history from "../components/history";
export default class ApiClient {
  static BASE_URL = "https://api.vishalconstructioncompany.com/api";

  static REQUEST_METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  };

  static addCommonHeaders(headers) {
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";
    return headers;
  }

  /**
   *
   * @param {*} method to use for api request -> GET, POST, DELETE, PUT
   * @param {*} url - endpoint to append after baseUrl
   * @param {*} payload - to send with request
   * @param {*} params - to append as query strings
   * @param {*} apiHeaders - additional headers
   * @param {*} isAuthTokenRequired - if true must pass the token with API request
   * @returns
   */
  static async call(
    method,
    url,
    payload,
    params,
    apiHeaders,
    isAuthTokenRequired = true
  ) {
    let headers = apiHeaders ? apiHeaders : {};
    let requestParams = params ? params : {};

    headers = this.addCommonHeaders(headers);
    //TODO: get tokens from reducer or localstorage
    let userData = JSON.parse(window.localStorage.getItem("user"));
    const token = userData?.token;
    if (isAuthTokenRequired) {
      headers["Authorization"] = "Bearer " + token;
      headers["Cookie"] =
        "connect.sid=s%3Ab5CsaQ8AubwFJarKCp2IKl9-y3y-ZFII.e0rcCZy4JLlhhpqWh68UtPh3AQ6wL%2F7j%2Bl9Z15H9sWE";
    }

    // let axiosInstance = axios.create({baseURL: process.env.REACT_APP_BASE_URL});
    // TODO: Need to rework on .env setup
    let axiosInstance = axios.create({ baseURL: this.BASE_URL });

    // Logger.log('Web Service Url:', `${process.env.REACT_APP_BASE_URL}${url}`);
    Logger.log("Web Service Url:", `${this.BASE_URL}${url}`);
    Logger.log("Web Service Method:", method);
    Logger.log("Web Service payload:", payload);
    Logger.log("Web Service headers:", headers);
    Logger.log("Web Service params:", requestParams);

    try {
      let response;
      if(payload)
      {
        response = await axiosInstance.request({
          method: method,
          url: url,
          data: payload,
          params: requestParams,
          headers: headers,
        });
      }else{
        response = await axiosInstance.request({
          method: method,
          url: url,          
          params: requestParams,
          headers: headers,
        });
      }
      Logger.log("Web Service Response:", response);
      // debugger
      // response.data={
      //   ...response.data,
      //   error:true,
      //   message:"Invalid token"
      // }
      if (response.status === 200) {
        if (response.data != null && !response.data.error) {
          return response.data;
        } else if(response.data.error){
          throw new Error(response.data.message);
        }else{
          throw new Error("Something went wrong");
        }
        //   if (response.data?.message === "Invalid token") {
        //     window.localStorage.removeItem("user");
        //     history.push("/login");
        //     window.location.reload();
        //   }
        //   return response.data;
        // } else {
        //   throw new Error("Something went wrong");
        // }
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if(error.message==="Token exipred"||error.message==="Invalid token"){
        localStorage.removeItem("user")
        localStorage.removeItem("bookNow");
        localStorage.removeItem("postProperty");
        localStorage.removeItem("social-links");
        localStorage.removeItem("company_detials");
        history.replace("/login");;  
        return;
      }
      Logger.log("API-Error:", error);
      throw error;
    }
  }
}
