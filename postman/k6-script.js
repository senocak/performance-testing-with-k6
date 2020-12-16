// Auto-generated by the Load Impact converter

import "./libs/shim/core.js";
import "./libs/shim/expect.js";
import "./libs/shim/urijs.js";
import URI from "./libs/urijs.js";

export let options = { maxRedirects: 4, iterations: "1"  };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options,
  environment: {
    restgwAddr: "https://Kessel-cpaas-oauth.genband.com",
    testUser1: "u1002@spidr.com",
    appleBundleId: "com.genband.smartoffice.alpha.omni.mobile",
    voipDeviceToken: "voipDeviceToken",
    standardDeviceToken: "standardDeviceToken",
    clientCorrelator: "clientCorrelator",
    realm: "default",
    isProduction: "isProduction"

  }
});

export default function() {
  postman[Request]({
    name: "bundleID is valid Copy",
    id: "f5f99159-c51f-4c6f-9e7b-96878b32f4cb",
    method: "POST",
    address: "https://Kessel-cpaas-oauth.genband.com/rest/version/1/user/u1002@spidr.com/push/apple/devices",
    data:
      '{"bundleID": "{{appleBundleId}}","voipDeviceToken": "{{voipDeviceToken}}","standardDeviceToken" : "{{standardDeviceToken}}","clientCorrelator": "{{clientCorrelator}}","service": ["IM","call"],"realm": "{{realm}}","isProduction": {{isProduction}}}',
    headers: {
      "Content-Type": "application/json"
    },
    post(response) {
      console.log(JSON.stringify(response))
      /*
      var responseData = pm.response.json();
      pm.test("Status code is 200 or 201", function() {
        pm.expect(pm.response.code).to.be.oneOf([201, 200]);
      });
      pm.test("Verify Status Code of RespnseData", function() {
        var responseData = pm.response.json();
        var statusCode =
          responseData.appleDeviceRegistrationResponse.statusCode;
        pm.expect(statusCode).to.be.oneOf([0, 2]);
      });
      pm.test("deviceId validation", function() {
        console.log("deviceId validation");
        var deviceIdURL = responseData.appleDeviceRegistrationResponse.registration.split(
          "/"
        );
        var deviceId = deviceIdURL[deviceIdURL.length - 1];
        if (deviceId !== null && deviceId !== undefined) {
          pm.globals.set("testChannel", deviceId);
        }
      });
      */
    },
    auth(config, Var) {
      const address = new URI(config.address);
      address.username(`${pm[Var]("testUser1")}`);
      address.password("1234");
      config.address = address.toString();
      config.options.auth = "basic";
    }
  });

  postman[Request]({
    name: "User sends (Apple) Push subscription deletion Copy",
    id: "b894f367-cfdc-4363-a851-696944c18196",
    method: "DELETE",
    address:
      "{{restgwAddr}}/rest/version/1/user/{{testUser1}}/push/apple/devices/{{testChannel}}",
    headers: {
      Authorization: "Basic NDAwMkBzcGlkci5kZXYuZ2VuYmFuZC5jb206YWJjZDEyMzQ="
    },
    post(response) {
      pm.test("Status code is 200", function() {
        pm.expect(pm.response.code).to.be.oneOf([200]);
      });
    },
    auth(config, Var) {
      const address = new URI(config.address);
      address.username(`${pm[Var]("testUser1")}`);
      address.password("1234");
      config.address = address.toString();
      config.options.auth = "basic";
    }
  });
}
