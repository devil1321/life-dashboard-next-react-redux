import { combineReducers } from "redux";
import dateReducer from "./date.reducer";
import invoicesReducer from "./invoices.reducer";
import todoReducer from "./todo.reducer";
import uiReducer from "./ui.reducer";

const reducers = combineReducers({
    ui:uiReducer,
    date:dateReducer,
    todo:todoReducer,
    invoices:invoicesReducer,
})

export default reducers

export type State = ReturnType<typeof reducers>