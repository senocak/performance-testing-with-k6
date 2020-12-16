import http from "k6/http";
import { check } from "k6";
import encoding from "k6/encoding";

const username = "u1002@spidr.com",
      password = "1234"
const form_data = {
    "Authorization": "Basic " + encoding.b64encode(`${username}:${password}`),
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

export default function() {
    let res = http.post("https://Kessel-cpaas-oauth.genband.com/rest/version/1/user/u1002@spidr.com/push/apple/devices", form_data);

    // Verify response
    check(res, {
      res: res,
      /*
        "status is 200": (r) => r.status === 200,
        "has correct name": (r) => r.json().form.name === form_data.name,
        "has correct telephone number": (r) => r.json().form.telephone === form_data.telephone,
        "has correct email": (r) => r.json().form.email === form_data.email,
        "has correct comment": (r) => r.json().form.comment === form_data.comment,
        "has correct toppings": (r) => JSON.stringify(r.json().form.topping) === JSON.stringify(form_data.topping)
        */
    });
}