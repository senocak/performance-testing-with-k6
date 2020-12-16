#!/usr/bin/env node
const   axios   = require('axios'),
        qs      = require('qs'),
        program = require('commander')
class Fill{
    async  getToken(url, username, password, grant_type, client_id, scope){
        return await axios.post(`https://${url}/cpaas/auth/v1/token`, qs.stringify({username:username , password:password, grant_type:grant_type, client_id:client_id, scope: scope}), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    }
    async timeout(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async addUser(url, access_token, accountID, projectID, prefix, i){
        const user = {
            "user": {
                "firstName" : `Lorem${i}`,
                "lastName" : `Ipsum${i}`,
                "userName" : `${prefix}${i}`,
                "email" : `${prefix}${i}@email.com`,
                "roles": [
                    "User"
                ],
                "idpInfo": {
                    "identityProvider": "Cpaas",
                    "password": "Kandy-1234"
                }
            }
        }
        return await axios.post(`https://${url}/cpaas/account/v1/${accountID}/projects/${projectID}/users`, user, {headers: { Authorization: `Bearer ${access_token}` }}).catch((error)=>{return error.response})
    }
    async getStatusCode(kod){
        const http_codes = {
            100 : 'Informational: Continue',
            101 : 'Informational: Switching Protocols',
            102 : 'Informational: Processing',
            200 : 'Successful: OK',
            201 : 'Successful: Created',
            202 : 'Successful: Accepted',
            203 : 'Successful: Non-Authoritative Information',
            204 : 'Successful: No Content',
            205 : 'Successful: Reset Content',
            206 : 'Successful: Partial Content',
            207 : 'Successful: Multi-Status',
            208 : 'Successful: Already Reported',
            226 : 'Successful: IM Used',
            300 : 'Redirection: Multiple Choices',
            301 : 'Redirection: Moved Permanently',
            302 : 'Redirection: Found',
            303 : 'Redirection: See Other',
            304 : 'Redirection: Not Modified',
            305 : 'Redirection: Use Proxy',
            306 : 'Redirection: Switch Proxy',
            307 : 'Redirection: Temporary Redirect',
            308 : 'Redirection: Permanent Redirect',
            400 : 'Client Error: Bad Request',
            401 : 'Client Error: Unauthorized',
            402 : 'Client Error: Payment Required',
            403 : 'Client Error: Forbidden',
            404 : 'Client Error: Not Found',
            405 : 'Client Error: Method Not Allowed',
            406 : 'Client Error: Not Acceptable',
            407 : 'Client Error: Proxy Authentication Required',
            408 : 'Client Error: Request Timeout',
            409 : 'Client Error: Conflict',
            410 : 'Client Error: Gone',
            411 : 'Client Error: Length Required',
            412 : 'Client Error: Precondition Failed',
            413 : 'Client Error: Request Entity Too Large',
            414 : 'Client Error: Request-URI Too Long',
            415 : 'Client Error: Unsupported Media Type',
            416 : 'Client Error: Requested Range Not Satisfiable',
            417 : 'Client Error: Expectation Failed',
            418 : 'Client Error: I\'m a teapot',
            419 : 'Client Error: Authentication Timeout',
            420 : 'Client Error: Method Failure',
            422 : 'Client Error: Unprocessable Entity',
            423 : 'Client Error: Locked',
            424 : 'Client Error: Failed Dependency',
            425 : 'Client Error: Unordered Collection',
            426 : 'Client Error: Upgrade Required',
            428 : 'Client Error: Precondition Required',
            429 : 'Client Error: Too Many Requests',
            431 : 'Client Error: Request Header Fields Too Large',
            444 : 'Client Error: No Response',
            449 : 'Client Error: Retry With',
            450 : 'Client Error: Blocked by Windows Parental Controls',
            451 : 'Client Error: Unavailable For Legal Reasons',
            494 : 'Client Error: Request Header Too Large',
            495 : 'Client Error: Cert Error',
            496 : 'Client Error: No Cert',
            497 : 'Client Error: HTTP to HTTPS',
            499 : 'Client Error: Client Closed Request',
            500 : 'Server Error: Internal Server Error',
            501 : 'Server Error: Not Implemented',
            502 : 'Server Error: Bad Gateway',
            503 : 'Server Error: Service Unavailable',
            504 : 'Server Error: Gateway Timeout',
            505 : 'Server Error: HTTP Version Not Supported',
            506 : 'Server Error: Variant Also Negotiates',
            507 : 'Server Error: Insufficient Storage',
            508 : 'Server Error: Loop Detected',
            509 : 'Server Error: Bandwidth Limit Exceeded',
            510 : 'Server Error: Not Extended',
            511 : 'Server Error: Network Authentication Required',
            598 : 'Server Error: Network read timeout error',
            599 : 'Server Error: Network connect timeout error',
        }
        return http_codes[kod]
    }
}

(async() => {
    program.option('-l, --lab <type>', 'Please specify type lab', 'nvs-cpaas-oauth.kandy.io')
    program.option('-u, --username <type>', 'Account Username', '')
    program.option('-pw, --password <type>', 'Account Password', '')
    program.option('-a, --accountID <type>', 'Account ID', '')
    program.option('-pi, --projectID <type>', 'Account Project ID', '')
    program.option('-gt, --grant_type <type>', 'Account Grant Type', 'password')
    program.option('-c, --client_id <type>', 'Account Client Id', '')
    program.option('-sc, --scope <type>', 'Account Scope', 'openid')

    program.option('-p, --prefix <type>', 'User Prefix', 'anil')

    program.option('-s, --start <number>', 'User Start', '1')
    program.option('-e, --end <number>', 'User End', '10')

    program.version('1.0.0').description('github.com/senocak')
    program.parse(process.argv)

    if (program.username && program.password && program.accountID && program.client_id  && program.projectID ) {
        const fill = new Fill()
        let access_token, error
        try {
            access_token = await fill.getToken(program.lab, program.username, program.password, program.grant_type, program.client_id, program.scope)
        } catch (err) {
            error = err
        }
        if (!error){
            var totalTime = 0, piece = 0
            for (let i = parseInt(program.start); i < parseInt(program.end); i++) {
                /*
                if (i % 15 == 0){
                    console.log("Waiting 1 min...")
                    await fill.timeout(1 * 60 *1000) // 1 min
                }
                */
                var start   = Date.now(),
                    user    = await fill.addUser(program.lab, access_token.data.access_token, program.accountID, program.projectID, program.prefix, i),
                    millis  = Date.now() - start
                totalTime   += millis
                piece += 1
                console.log(`${i}. user: ${await fill.getStatusCode(user.status)}`, totalTime / 1000, piece)
                if (piece > 15 && totalTime < 1 * 60 * 1000){
                    console.log(totalTime, " Waiting "+ ((1 * 60 * 1000) - totalTime) +" second...")
                    await fill.timeout((1 * 60 * 1000) - totalTime)
                    totalTime = 0
                    piece = 0
                }
                if (totalTime >= 1 * 60 * 1000) {
                    totalTime = totalTime - 1 * 60 * 1000
                    piece = 0
                }
            }
        }else{
            console.log("Invalid Token." + error)
        }
    }else{
        console.log("Invalid Credentials.")
    }
})()
// npm i & npm link

// dbfill --username cenowi5389@qortu.com --password Kandy-1234 --accountID vJ1rNvWnAxY2wBA5 --projectID app_RZQoxZ1ikR5P20Mr --client_id PUB-cenowi5389.lr08 --start 5 --end 9 --prefix asenocak

// dbfill --lab alderaan-cpaas-oauth.genband.com --username jaymie.prabhjot@andyes.net --password Kandy-1234 --client_id PUB-jaymie.prabhjot.nzlb --accountID nei7kQTvoGxXLJIp --projectID app_rwrEc1Ua7ElSlpyY --start 1 --end 999 --prefix anil1

// dbfill --lab kessel-cpaas-oauth.genband.com --username rigby.river@andyes.net --password Kandy-1234 --client_id PUB-rigby.river.x4wf --accountID AfegzPWMl0q8I2sP --projectID app_d777v44bXqRsvJ2g --start 1 --end 9999 --prefix anilproject2
// dbfill --lab kessel-cpaas-oauth.genband.com --username rigby.river@andyes.net --password Kandy-1234 --client_id PUB-rigby.river.x4wf --accountID AfegzPWMl0q8I2sP --projectID app_yaiVInlPgMqW3orj --start 19558 --end 19999 --prefix anilproject1
// dbfill --lab kessel-cpaas-oauth.genband.com --username bobbie.quan@andyes.net --password Kandy-1234 --client_id PUB-bobbie.quan.5ywg --accountID jMxrn9L3MCOtlT2S --projectID app_Mc1cmQzGYeMMj6BK --start 1 --end 9999 --prefix anilproject3


//MALTAY: 0542 231 2290