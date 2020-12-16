import http from "k6/http"
import { check, sleep } from "k6"
import encoding from "k6/encoding"
import { Rate  } from 'k6/metrics'

export let allResponse201 = new Rate("allResponse201")

export const options = {
  iterations: 13000,
  //vusMax: 20,
  //vus: 2,
  //duration: "120s",
  thresholds: {
    'allResponse201': ['rate>0.9'],
    'http_req_duration': ['p(95)<500']
  }
}

export default function() {
  let user = {
    "username": `anilproject1${__ITER+1+1000}@email.com`,
    "password": "Kandy-1234",
    "grant_type": "password",
    "client_id": "196d4537-b44f-48b9-879f-e53da0688c87",
    "client_secret": "7401fa2e-c374-4bd8-85ea-ccb49f784d6e",
    "scope": "openid"
}
  let authRes = http.post(`https://kessel-cpaas-oauth.genband.com/cpaas/auth/v1/token`, user, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  const token = JSON.parse(authRes.body).access_token
  const preferred_username = JSON.parse(encoding.b64decode(token.split(".")[1], "rawstd")).preferred_username
  let subsData = {
    "notificationChannel": {
      "fcmChannelData": {
        "appId": "com.genband.smartoffice",
        "deviceToken": "deviceToken"
      },
      "channelType": "omapush",
      "clientCorrelator": "clientCorrelator3"
    }
  }
  var currentdate = new Date();
  var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + ":" + currentdate.getMilliseconds();
  let subsRes = http.post(`https://kessel-cpaas-oauth.genband.com/cpaas/notificationchannel/v1/${preferred_username}/channels/`, JSON.stringify(subsData), { headers: { "Authorization": "Bearer " + token }})
  console.log(user.username, preferred_username, subsRes.status, datetime)
  check(subsRes, {"status is 201": r => r.status === 201})
  //allResponse201.add(subsRes.status == 201)
  sleep(2)
}

//docker-compose run k6 run /tests/subscribe.js