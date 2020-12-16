const loadtest = require('loadtest');
const options = {
    url: 'http://localhost:8000',
    maxRequests: 1,
};
loadtest.loadTest(options, function(error, result)
{
    if (error){
        return console.error('Got an error: %s', error);
    }
    console.log(result);
});