const axios = require("axios");

exports.handler = async function (event, context) {
    const {queryText} = event.queryStringParameters

    const { body } = await event



    const queryMessages = JSON.parse(body)
    
    // console.log(event);
    console.log(queryMessages);
    // console.log(context);
    

    // return {
    //     statusCode: 200,
    //     body: body
    // };

    try{
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            // '{\n  "model": "gpt-3.5-turbo",\n  "messages": [],\n  "temperature": 0.8,\n  "max_tokens": 256\n}',
            {
                'model': 'gpt-3.5-turbo-16k-0613',
                'messages': queryMessages,
                
                // [{
                //     "role": "system",
                //     "content": "You are a helpful assistant."
                //   },
                //   {
                //     "role": "user",
                //     "content": "Hello!"
                //   }],
                
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.REACT_APP_OPENAI_API_KEY
                }
            }
        );

        const data = await response.data
        // console.log(data.choices[0].message)
        return{
            statusCode: 200,
            body: JSON.stringify({ ...data })
        }

    }catch(err){
        console.log(err.message)
        return{
                    statusCode: 404,
                    body: err.toString(),
                };
    }

//    

    // try{

        // const response = await axios.post(
        //     'https://api.openai.com/v1/chat/completions',
        //     // '{\n  "model": "gpt-3.5-turbo",\n  "messages": [],\n  "temperature": 0.8,\n  "max_tokens": 256\n}',
        //     {
        //         'model': 'gpt-3.5-turbo',
        //         'messages': body,
                
        //         // [{
        //         //     "role": "system",
        //         //     "content": "You are a helpful assistant."
        //         //   },
        //         //   {
        //         //     "role": "user",
        //         //     "content": "Hello!"
        //         //   }],
        //         'temperature': 0.8,
        //         'max_tokens': 256
        //     },
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': process.env.REACT_APP_OPENAI_API_KEY
        //         }
        //     }
        // );


        // let response = await axios('https://api.openai.com/v1/completions', {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': process.env.REACT_APP_OPENAI_API_KEY
        //     },
        //     // body: '{\n  "model": "text-davinci-003",\n  "prompt": "Say this is a test",\n  "max_tokens": 7,\n  "temperature": 0\n}',
        //     data: {
        //         'model': 'gpt-3.5-turbo',
        //         'prompt': `${queryText}`,
        //         "max_tokens": 256,
        //         'temperature': 0,
        //         "top_p": 1,
        //         "n": 1,
        //         "stream": false,
        //         "logprobs": null,
                
        //     }
        // })
    
    //     const data = await response.data
    //     console.log(data)
    //     return{
    //         statusCode: 200,
    //         body: JSON.stringify({ ...data })
    //     }
    // } catch(err){
    //     return{
    //         statusCode: 404,
    //         body: err.toString(),
    //     };
    // }


    
  };