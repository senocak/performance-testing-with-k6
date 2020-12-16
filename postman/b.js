import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';
import encoding from "k6/encoding";

const   username    = "u1002@spidr.com",
        password    = "1234",
        BASE_URL    = 'https://Kessel-cpaas-oauth.genband.com';
const form_data = {
        name: "Test Name",
        telephone: "123456789",
        email: "test@example.com",
        comment: "Hello world!",
        topping: [
            'onion',
            'bacon',
            'cheese'
        ]
};
let params = {
    "Content-Type": "application/json",
    "Authorization": "Basic " + encoding.b64encode(`${username}:${password}`),
};
export default (authToken) => {

  group('Push Subscription', () => {

    let payload = {};
    let params = {
        "Content-Type": "application/json",
        "Authorization: Basic dTEwMDJAc3BpZHIuY29tOjEyMzQ=":""
    };
    let resp = http.post(`${BASE_URL}/rest/version/1/user/${username}/push/apple/devices`, JSON.stringify(payload), params);
    console.log(resp.body);

    /*let responses = http.post(`${BASE_URL}/rest/version/1/user/${username}/push/apple/devices`, JSON.stringify({username : "u1002@spidr.com",password: "1234"}), params);
    console.log("responses:"+JSON.stringify(responses))
    
    const ages = Object.values(responses).map(res => res.json('age'));

    check(ages, {
      'Crocs are older than 5 years of age': Math.min(...ages) > 5
    });
    */
  });

  sleep(1);
}