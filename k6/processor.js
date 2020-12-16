module.exports = {
    ResponseOperation (requestParams, response, context, ee, next) {
        var deviceIdURL = response.body.appleDeviceRegistrationResponse.registration.split("/");
        var deviceId = deviceIdURL[deviceIdURL.length - 1];
        context.vars.deviceId = deviceId;
        console.log("deviceId:"+deviceId)
        return next()
    }
}