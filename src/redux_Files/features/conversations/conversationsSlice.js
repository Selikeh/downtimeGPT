import { createSlice } from '@reduxjs/toolkit'

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState: {
        value: [
            // {
            //     conversationID: 1,
            //     conversationTitle: 'Trials',
            //     conversationHistory:[
            //         {
            //             speechID: 1,
            //             role: 'You',
            //             content: 'Trial content 123'
            //         },
            //         {
            //             speechID: 2,
            //             role: 'Phil',
            //             content: 'Quick fox'
            //         }
            //     ]
            // },
            // {
            //     conversationID: 2,
            //     conversationTitle: 'Fill In',
            //     conversationHistory:[
            //         {
            //             speechID: 1,
            //             role: 'You',
            //             content: 'Fill In content 356'
            //         },
            //         {
            //             speechID: 2,
            //             role: 'Rick',
            //             content: 'Lazy Dog'
            //         }
            //     ]
            // }
        ]
    },
    reducers:{
        addConversation: (state, action)=>{
            const { conversationID, role, content, speechID } = action.payload
            state.value.push({
                conversationID,
                conversationTitle: content,
                conversationHistory:[
                    {
                        speechID,
                        role,
                        content
                    }
                ]   
            })
        },
        updateConversation: (state, action)=>{
            const {conversationID, role, content, speechID} = action.payload
            state.value[state.value.findIndex(convo=> convo.conversationID === conversationID)].conversationHistory.push({
                speechID,
                role,
                content
            })
        }
    }
})

export const { addConversation, updateConversation } = conversationsSlice.actions

export default conversationsSlice.reducer