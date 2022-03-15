import { combineReducers } from "redux";
import dateReducer from "./date.reducer";
import todoReducer from "./todo.reducer";
import uiReducer from "./ui.reducer";

const reducers = combineReducers({
    ui:uiReducer,
    date:dateReducer,
    todo:todoReducer,
})

export default reducers

export type State = ReturnType<typeof reducers>