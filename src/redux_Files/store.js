import { configureStore } from "@reduxjs/toolkit";
import conversationsReducer from "./features/conversations/conversationsSlice";

export default configureStore({
    reducer:{
        conversations: conversationsReducer
    }
})