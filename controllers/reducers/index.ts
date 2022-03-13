import { combineReducers } from "redux";
import dateReducer from "./date.reducer";
import calendarReducer from "./calendar.reducer";
import todoReducer from "./todo.reducer";
import uiReducer from "./ui.reducer";

const reducers = combineReducers({
    ui:uiReducer,
    date:dateReducer,
    calendar:calendarReducer,
    todo:todoReducer,
})

export default reducers

export type State = ReturnType<typeof reducers>