import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import {
  addConversation,
  updateConversation,
} from "../../redux_Files/features/conversations/conversationsSlice";
import roboImage from "../../images/call-center-isometric-concept_1284-69078-removebg-preview (1).png";

function ChatScreen() {
  const conversations = useSelector((state) => state.conversations.value);
  const dispatch = useDispatch();
  let location = useLocation();
  let { state } = location;
  // console.log(state)

  // console.log('test')
  const [textBoxText, setTextBoxText] = useState("");
  // const [newConversation, setNewConversation] = useState(state === null)
  const [processingRequest, setProcessingRequest] = useState(false);
  const convoHistoryDiv = useRef();

  // console.log(location.pathname)

  // console.log(newConversation)

  // function updateConverstionHistory(role, text){
  //     // update history
  // }
  function handleSendBtnClick() {
    // let fullConvoContext = conversations[conversations.findIndex(convo=> convo.conversationID === state.conversationID)].conversationHistory.reduce((fullHistory, currentText)=>[fullHistory, {role: currentText.role, content:currentText.content}]).map(elem=>({role:elem.role, content:elem.content}))

    // console.log(fullConvoContext)
    if (textBoxText !== "") {
      if (state) {
        // console.log('old coversation')
        dispatch(
          updateConversation({
            conversationID: state.conversationID,
            role: "User",
            content: textBoxText,
            speechID: crypto.randomUUID(),
          })
        );

        // let fullConvoContext = conversations[conversations.findIndex(convo=> convo.conversationID === state.conversationID)].conversationHistory.reduce((fullHistory, currentText)=>[fullHistory, {role: currentText.role, content:currentText.content}])
        let fullConvoContext = conversations[
          conversations.findIndex(
            (convo) => convo.conversationID === state.conversationID
          )
        ].conversationHistory
          .reduce((fullHistory, currentText) => [
            fullHistory,
            { role: currentText.role, content: currentText.content },
          ])
          .map((elem) => ({ role: elem.role, content: elem.content }));

        let chatPrePrompt =
          "The folowing prompt comes with a history of conversation prompts and responses between I, the user and chatGPT/open AI's API. Consider it in the context for answering the prompt at the end of this request if needed";

        // let fullQueryContent = /* chatPrePrompt + */ fullConvoContext + 'The new prompt is:' + textBoxText
        let fullQueryContent = [
          ...fullConvoContext,
          { role: "User", content: textBoxText },
        ];

        console.log(fullQueryContent);

        setTextBoxText("");
        setProcessingRequest(true);
        askOpenAI(fullQueryContent);
      } else {
        // console.log('New conversation')
        // console.log(crypto.randomUUID())
        let newID = crypto.randomUUID();
        location.state = { conversationID: newID };
        location.pathname = `/ChatScreen/${newID}`;
        console.log(state);
        setProcessingRequest(true);
        dispatch(
          addConversation({
            conversationID: newID,
            role: "User",
            content: textBoxText,
            speechID: crypto.randomUUID(),
          })
        );
        askOpenAI([{ role: "User", content: textBoxText }], newID);
        setProcessingRequest(true);
        setTextBoxText("");
      }
    }
  }

  function handleTextBoxInput(e) {
    e.preventDefault();
    if (e.keyCode !== 13) {
      setTextBoxText(e.target.value);
    }
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSendBtnClick();
    }
  }

  function askOpenAI(fullQuery, conversationID = state.conversationID) {
    // fetch(`/.netlify/functions/queryOpenAI?queryText=${text}`)
    fetch(`/.netlify/functions/queryOpenAI`, {
      method: "POST",
      body: JSON.stringify(fullQuery),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
          alert("There was an error fetching the query response");
          throw new Error("There was an error fetching the query response");
        } else {
          return response.json();
        }
      })
      .then((response) => {
        // console.log(response);
        // console.log(response.choices[0].text)
        if (!response) {
          alert("There was an error");
          setProcessingRequest(false);
          console.log("!!!");
        } else {
          setProcessingRequest(false);
          dispatch(
            updateConversation({
              conversationID: conversationID,
              role: response.choices[0].message.role,
              content: response.choices[0].message.content,
              speechID: crypto.randomUUID(),
            })
          );
        }
        // console.log(state.conversationID)

        // sythesize voice to read out the response
      });
    // .then(response=>{
    //     console.log(response)
    // })
  }

  useEffect(() => {
    if (state) {
      convoHistoryDiv.current.scrollTop = convoHistoryDiv.current.scrollHeight;
    }
  }, [conversations, state]);

  function handleTestClick() {
    console.log("testing.....");
    // let fullQueryContent = conversations[conversations.findIndex(convo=> convo.conversationID === 1)].conversationHistory.reduce((fullHistory, currentText)=>(`${fullHistory} [${currentText.role}: ${currentText.text}]`), '')
    // console.log(fullQueryContent)
    // console.log(convoHistoryDiv.current)
    // console.log(conversations)

    let info = [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "User",
        content: "Hello!",
      },
    ];

    fetch(`/.netlify/functions/queryOpenAI?queryText=${"apple"}`, {
      method: "POST",
      body: JSON.stringify(info),
    }).then((response) => {
      if (response.status !== 200) {
        console.log(response);
        alert("There was an error fetching the query response");
        throw new Error("There was an error fetching the query response");
      } else {
        let data = response.json();
        //    return response.json()
      }
    });
  }

  return (
    <div className=" h-screen max-h-full px-6 bg-zinc-700 w-full flex justify-center">
      {state ? (
        <>
          {/* <div>Old Conversation</div> */}
          <div
            ref={convoHistoryDiv}
            className=" max-h-[85vh] overflow-y-auto scrollbar pt-12 pb-7 mb-5 md:pt-0"
          >
            {conversations[
              conversations.findIndex(
                (convo) => convo.conversationID === state.conversationID
              )
            ].conversationHistory.map((speech) => (
              <div
                className={
                  speech.role === "assistant"
                    ? " py-3 px-3 md:px-28 my-2 bg-zinc-600"
                    : "py-3 px-3 md:px-28 my-2 bg-zinc-700"
                }
                key={speech.speechID}
              >
                <span
                  className={
                    speech.role === "assistant"
                      ? " bg-teal-700 px-3 mr-2"
                      : " bg-purple-800 px-3 mr-2"
                  }
                >
                  {speech.role === "assistant" ? "ChatAI" : speech.role}:
                </span>
                <span>{speech.content}</span>
              </div>
            ))}
            {processingRequest && (
              <div className="py-3 px-3 md:px-28 my-2 bg-zinc-600">
                <span className=" bg-teal-700 px-3 mr-2">ChatAI:</span>
                <span>
                  <span className=" h-2 mx-1 aspect-square rounded-md inline-block bg-neutral-200 animate-stretching1"></span>
                  <span className=" h-2 mx-1 aspect-square rounded-md inline-block bg-neutral-200 animate-stretching2"></span>
                  <span className=" h-2 mx-1 aspect-square rounded-md inline-block bg-neutral-200 animate-stretching3"></span>
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className=" max-h-[85vh] overflow-y-none scrollbar pt-12 pb-7 mb-5 md:pt-0">
            <div className=" text-center">New Conversation</div>
            <div className=" flex flex-col justify-center items-center mt-4">
              <img
                className=" aspect-square h-80 drop-shadow-md"
                src={roboImage}
                alt=""
              />
              <h3 className=" px-3 text-center text-lg font-semibold">
                downtimeGPT is ready to answer your questions
              </h3>
            </div>
          </div>
          {processingRequest && (
            <div className="py-3 px-3 md:px-28 my-2 bg-zinc-600">
              <span className=" bg-teal-700 px-3 mr-2">ChatAI:</span>
              <span>
                <span className=" h-2 mx-1 aspect-square rounded-md inline-block bg-neutral-200 animate-stretching1"></span>
                <span className=" h-2 mx-1 aspect-square rounded-md inline-block bg-neutral-200 animate-stretching2"></span>
                <span className=" h-2 mx-1 aspect-square rounded-md inline-block bg-neutral-200 animate-stretching3"></span>
              </span>
            </div>
          )}
        </>
      )}
      <div className=" fixed bottom-0 w-full mr-6 pb-2 flex justify-center bg-gradient-to-b from-transparent to-zinc-700">
        <textarea
          className=" resize-none overflow-y-auto p-2 w-[60%] max-h-32 min-h-32 scrollbar border border-r-slate-200 outline-none rounded-l-md bg-slate-400 text-zinc-800 placeholder:text-neutral-200"
          type="text"
          placeholder="Type Your Query Here"
          value={textBoxText}
          onInput={(e) => handleTextBoxInput(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button
          className=" bg-green-500 px-5 rounded-r-md"
          onClick={handleSendBtnClick}
        >
          Send
        </button>
        {/* <button onClick={handleTestClick}>Test Button</button> */}
      </div>
    </div>
  );
}

export default ChatScreen;
