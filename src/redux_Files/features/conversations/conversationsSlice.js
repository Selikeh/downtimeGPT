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
            //             speaker: 'You',
            //             text: 'Trial Text 123'
            //         },
            //         {
            //             speechID: 2,
            //             speaker: 'Phil',
            //             text: 'Quick fox'
            //         }
            //     ]
            // },
            // {
            //     conversationID: 2,
            //     conversationTitle: 'Fill In',
            //     conversationHistory:[
            //         {
            //             speechID: 1,
            //             speaker: 'You',
            //             text: 'Fill In Text 356'
            //         },
            //         {
            //             speechID: 2,
            //             speaker: 'Rick',
            //             text: 'Lazy Dog'
            //         }
            //     ]
            // }
        ]
    },
    reducers:{
        addConversation: (state, action)=>{
            const { conversationID, speaker, text, speechID } = action.payload
            state.value.push({
                conversationID,
                conversationTitle: text,
                conversationHistory:[
                    {
                        speechID,
                        speaker,
                        text
                    }
                ]   
            })
        },
        updateConversation: (state, action)=>{
            const {conversationID, speaker, text, speechID} = action.payload
            state.value[state.value.findIndex(convo=> convo.conversationID === conversationID)].conversationHistory.push({
                speechID,
                speaker,
                text
            })
        }
    }
})

export const { addConversation, updateConversation } = conversationsSlice.actions

export default conversationsSlice.reducer