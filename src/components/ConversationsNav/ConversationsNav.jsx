import { NavLink } from "react-router-dom"
import {useSelector} from "react-redux"


function ConversationsNav(){
  const  conversations  = useSelector(state => state.conversations.value)


    return (
        <>
            <nav className=" bg-slate-900 pt-16 h-full md:h-screen max-h-full w-full overflow-y-auto overflow-x-hidden scrollbar text-ellipsis">
                <ul>
                    <li>
                        <NavLink to='/' className = {({isActive})=>isActive? ' bg-slate-500 flex justify-center py-3 m-2 text-center  border border-gray-200 hover:bg-slate-300 hover:text-neutral-900':'bg-slate-700 flex justify-center py-3 m-2 text-center  border border-gray-200 hover:bg-slate-300 hover:text-neutral-900'}>New Conversation</NavLink>
                    </li>
                    {conversations.map(convo=>(
                        <li key={convo.conversationID}>
                            <NavLink className = {({isActive})=>isActive? ' bg-slate-500 flex justify-center py-3 m-2 text-center overflow-x-hidden hover:bg-slate-300 hover:text-neutral-900':'bg-slate-900 flex justify-center py-3 m-2 text-center overflow-x-hidden hover:bg-slate-300 hover:text-neutral-900'} to={`/ChatScreen/${convo.conversationID}`} state={{conversationID: convo.conversationID}} >{convo.conversationTitle}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>  
        </>
    )
}


export default ConversationsNav