import http from "k6/http"
import { check, sleep } from "k6"
import encoding from "k6/encoding"
import { Rate  } from 'k6/metrics'

export let allResponse201 = new Rate("allResponse201")

export const options = {
    iterations: 10,
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
        "username": `anil1${__ITER+1}@email.com`,
        "password": "Kandy-1234",
        "grant_type": "password",
        "client_id": "6b7dca22-0498-4035-810b-5fa108d533d5",
        "client_secret": "69afe9f4-86b9-4d44-85c1-3c2bc5ccfec6",
        "scope": "openid"
    }
    let authRes = http.post(`https://alderaan-cpaas-oauth.genband.com/cpaas/auth/v1/token`, user, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    const token = JSON.parse(authRes.body).access_token
    const preferred_username = JSON.parse(encoding.b64decode(token.split(".")[1], "rawstd")).preferred_username
    let subsData = {
        "notificationChannel": {
        "fcmChannelData": {
            "appId": "com.genband.smartoffice",
            "deviceToken": "deviceToken"
        },
        "channelType": "omapush",
        "clientCorrelator": "clientCorrelator6"
        }
    }
    let subsRes = http.post(`https://alderaan-cpaas-oauth.genband.com/cpaas/notificationchannel/v1/${preferred_username}/channels/`, JSON.stringify(subsData), { headers: { "Authorization": "Bearer " + token }})
    const ps = JSON.parse(subsRes.body).notificationChannel.callbackURL
    let delRes = http.del(`https://alderaan-cpaas-oauth.genband.com/cpaas/notificationchannel/v1/${preferred_username}/channels/${ps}`, null, { headers: { "Authorization": "Bearer " + token }})
    console.log(user.username, preferred_username, subsRes.status, ps, delRes.status)
    check(delRes, {"status is 204": r => r.status === 204})
}