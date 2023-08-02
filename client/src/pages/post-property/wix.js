// In http-functions.js

import {response} from 'wix-http-functions';

// URL looks like:
// https://www.mysite.com/_functions/myFunction/
// or:
// https://user.wixsite.com/mysite/_functions/myFunction/

export function options_myFunction(request) {
  let headers = {
      "Access-Control-Allow-Origin": "https://www.example.com",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Max-Age": "86400"
  }
  return response({"status": 204, "headers": headers});
}
// In http-functions.js

export function use_myFunction(request) {

    let baseUrl = request.baseUrl;
    // Premium site: "https://www.domain.com/_functions"
    // Free site: "https://user.wix-sites.com/mysite/_functions"
  
  }
  import {fetch} from 'wix-fetch';

// ...

fetch("https://someapi.com/api/someendpoint", {"method": "get"})
  .then( (httpResponse) => {
    if (httpResponse.ok) {
      return httpResponse.json();
    } else {
      return Promise.reject("Fetch did not succeed");
    }
  } )
  .then(json => console.log(json.someKey))
  .catch(err => console.log(err));
// In http-functions.js

import {ok} from 'wix-http-functions';

// URL looks like:
// https://www.mysite.com/_functions/myFunction/someId
// or:
// https://user.wixsite.com/mysite/_functions/myFunction/someId
export function delete_myFunction(request) {

  const toRemove = request.path[0];

  // remove the resource

  return ok();
}
// In http-functions.js

import {created} from 'wix-http-functions';

// URL looks like:
// https://www.mysite.com/_functions/myFunction/
// or:
// https://user.wixsite.com/mysite/_functions/myFunction/
export function post_myFunction(request) {

  return request.body.text()
    .then( (body) => {

      // insert the info from the body somewhere

      return created();
    } );
}

