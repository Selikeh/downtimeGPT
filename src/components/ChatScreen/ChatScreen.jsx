import { useLocation } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { useState, useRef, useEffect} from "react"
import { addConversation, updateConversation } from "../../redux_Files/features/conversations/conversationsSlice"

function ChatScreen(){
    const conversations = useSelector(state => state.conversations.value)
    const dispatch = useDispatch()
    let location = useLocation()
    let {state} = useLocation()
    // console.log(state)
    

    // console.log('test')
    const [textBoxText, setTextBoxText] = useState('')
    // const [newConversation, setNewConversation] = useState(state === null)
    // const [processingRequest,setProcessingRequest] = useState(false)
    const convoHistoryDiv = useRef()

    // console.log(location.pathname)
    
    // console.log(newConversation)

    // function updateConverstionHistory(speaker, text){
    //     // update history
    // }
    function handleSendBtnClick(){
        if(textBoxText!==''){
            if(state){
                // console.log('old coversation')
                dispatch(updateConversation({
                    conversationID: state.conversationID,
                    speaker: "User",
                    text: textBoxText,
                    speechID: crypto.randomUUID()
                }))

                let fullConvoContext = conversations[conversations.findIndex(convo=> convo.conversationID === state.conversationID)].conversationHistory.reduce((fullHistory, currentText)=>(`${fullHistory} [${currentText.speaker}: ${currentText.text}]`), '')
                
                let chatPrePrompt = "The folowing prompt comes with a history of conversation prompts and responses between I, the user and chatGPT/open AI's API. Consider it in the context for answering the prompt at the end of this request if needed"

                let fullQueryText = chatPrePrompt + fullConvoContext + 'The new prompt is:' + textBoxText

                setTextBoxText('')
                askOpenAI(fullQueryText)
            }else{
                // console.log('New conversation')
                // console.log(crypto.randomUUID())
                let newID = crypto.randomUUID()
                dispatch(addConversation({
                    conversationID: newID,
                    speaker: "User",
                    text: textBoxText,
                    speechID: crypto.randomUUID()
                }))
                setTextBoxText('')
                location.state = {conversationID: newID}
                location.pathname = `/ChatScreen/${newID}`
                askOpenAI(textBoxText, newID)
            }
        }
    }

    function askOpenAI(text, conversationID = state.conversationID){
        
    
        fetch(`/netlify/functions/queryOpenAI?queryText=${text}`)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            // console.log(response.choices[0].text)
          
            dispatch(updateConversation({
                conversationID: conversationID,
                speaker: "ChatAI",
                text: response.choices[0].text,
                speechID: crypto.randomUUID()
            }))
            // console.log(state.conversationID)

            
          
        //   setProcessingRequest(false)
          
          // sythesize voice to read out the response
        });
        // .then(response=>{
        //     console.log(response)
        // })
        
       
      }

      useEffect(()=>{if(state){convoHistoryDiv.current.scrollTop = convoHistoryDiv.current.scrollHeight}}, [conversations, state])


    //   function handleTestClick(){
    //     let fullQueryText = conversations[conversations.findIndex(convo=> convo.conversationID === 1)].conversationHistory.reduce((fullHistory, currentText)=>(`${fullHistory} [${currentText.speaker}: ${currentText.text}]`), '')
    //     console.log(fullQueryText)
    //     // console.log(convoHistoryDiv.current)
    //     // console.log(conversations)
    //   }

      
    return (
        <div className=" h-screen max-h-full px-6 bg-zinc-700 w-full flex justify-center">
            
            {state?
            (
                <>
                    {/* <div>Old Conversation</div> */}
                    <div ref={convoHistoryDiv} className=" max-h-[85vh] overflow-y-auto scrollbar pt-12 pb-7 mb-5 md:pt-0">
                        {conversations[conversations.findIndex(convo=> convo.conversationID === state.conversationID)].conversationHistory.map(speech=>(
                            <div className={speech.speaker === 'ChatAI'?" py-3 px-3 md:px-28 my-2 bg-zinc-600":"py-3 px-3 md:px-28 my-2 bg-zinc-700"} key={speech.speechID}>
                                <span className={speech.speaker === 'ChatAI'?' bg-teal-700 px-3 mr-2':' bg-purple-800 px-3 mr-2'}>{speech.speaker}:</span>
                                <span>{speech.text}</span>
                            </div>
                        ))}
                    </div>
                </>

            )
            :
            (   
                <>
                    <div>New Conversation</div>
                    
                </>
                
            )}
            <div className=" fixed bottom-0 w-full mr-6 pb-2 flex justify-center bg-gradient-to-b from-transparent to-zinc-700">
                <textarea className=" resize-y p-2 w-[60%] max-h-32 min-h-[24px] scrollbar border border-r-slate-200 outline-none rounded-l-md bg-slate-400 text-zinc-800" type="text" value={textBoxText} onInput={(e)=>setTextBoxText(e.target.value)}/>
                <button className=" bg-green-500 px-5 rounded-r-md" onClick={handleSendBtnClick}>Send</button>
                {/* <button onClick={handleTestClick}>Test Button</button> */}
            </div>
        </div>
    )
}

export default ChatScreen