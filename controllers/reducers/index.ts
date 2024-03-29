import { combineReducers } from "redux";
import dateReducer from "./date.reducer";
import invoicesReducer from "./invoices.reducer";
import todoReducer from "./todo.reducer";
import uiReducer from "./ui.reducer";
import userReducer from "./user.reducer";
import contactsReducer from './contacts.reducer'
import chatReducer from './chat.reducer'

const reducers = combineReducers({
    ui:uiReducer,
    date:dateReducer,
    todo:todoReducer,
    invoices:invoicesReducer,
    user:userReducer,
    contacts:contactsReducer,
    chat:chatReducer,
})

export default reducers

export type State = ReturnType<typeof reducers>