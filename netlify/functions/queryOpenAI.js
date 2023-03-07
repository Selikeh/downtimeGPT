const axios = require("axios");

exports.handler = async function (event, context) {
    const {queryText} = event.queryStringParameters
   
    console.log(event);
    console.log(context);

    try{
        let response = await axios('https://api.openai.com/v1/completions', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.REACT_APP_OPENAI_API_KEY
            },
            // body: '{\n  "model": "text-davinci-003",\n  "prompt": "Say this is a test",\n  "max_tokens": 7,\n  "temperature": 0\n}',
            data: {
                'model': 'text-davinci-003',
                'prompt': `${queryText}`,
                "max_tokens": 256,
                'temperature': 0,
                "top_p": 1,
                "n": 1,
                "stream": false,
                "logprobs": null,
                
            }
        })
    
        const data = await response.data
        console.log(data)
        return{
            statusCode: 200,
            body: JSON.stringify({ ...data })
        }
    } catch(err){
        return{
            statusCode: 404,
            body: err.toString(),
        };
    }


    
  };