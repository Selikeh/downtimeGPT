import { useState } from 'react'
// import './App.css'
import { useSelector } from 'react-redux'
// import { addConversation } from './redux_Files/features/conversations/conversationsSlice'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ConversationsNav from './components/ConversationsNav/ConversationsNav'
import ChatScreen from './components/ChatScreen/ChatScreen'

function App() {
  const conversations  = useSelector(state => state.conversations.value)
  const [showMenu, setShowMenu] = useState(false)
  // const dispatch = useDispatch()

  return (
    <div className=" h-screen text-neutral-200">

      {/* <div>
        {conversations.map(convo=>(<div key={convo}>{convo}</div>))}
      </div>
      <button onClick={()=>dispatch(addConversation(2233))} >click</button> */}
      <BrowserRouter>
        <div className=' bg-zinc-700 grid grid-cols-9'>
          <div className=' bg-zinc-700 border-b border-b-neutral-200 fixed top-0 w-full h-12 text-black md:hidden'>
            <button className=' relative h-full w-8 ml-4 outline-none' onClick={()=>setShowMenu(prev=>!prev)}>
              <div className={showMenu?' h-1 w-8 bg-neutral-200 absolute top-0 translate-y-[22px] transition-all duration-500 rotate-45':' h-1 w-8 bg-neutral-200 absolute top-0 translate-y-[12px] transition-all duration-500'}></div>
              <div className={showMenu?' hidden h-1 w-8 bg-neutral-200 absolute top-0 translate-y-[22px] transition-all duration-500':' h-1 w-8 bg-neutral-200 absolute top-0 translate-y-[22px] transition-all duration-500'}></div>
              <div className={showMenu?' h-1 w-8 bg-neutral-200 absolute top-0 translate-y-[22px] transition-all duration-500 -rotate-45':' h-1 w-8 bg-neutral-200 absolute top-0 translate-y-[32px] transition-all duration-500'}></div>
            </button>
          </div>
          <div className={showMenu?' fixed z-10 h-[calc(100vh-48px)] md:h-full md:translate-x-0 top-12 md:static md:col-span-2 md:block transition-all duration-300':' fixed z-10 h-[calc(100vh-48px)] md:h-full  -translate-x-full md:translate-x-0 top-12 md:static md:col-span-2 md:block transition-all duration-300'}>
            <ConversationsNav/>
          </div>
          <div className=' col-span-9 md:col-span-7' onClick={()=> setShowMenu(false)}>
            <Routes>
              <Route path='/' index element={<ChatScreen key='newConvo'/>}/>
              {/* <Route path="/ChatScreen" index element={<ChatScreen key='newConvo' />}/> */}
              {conversations.map(conversation=>(<Route key={conversation.conversationID} path={`/ChatScreen/${conversation.conversationID}`} element={<ChatScreen key={conversation.conversationID}/>}/>))}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>

  )
}

export default App
