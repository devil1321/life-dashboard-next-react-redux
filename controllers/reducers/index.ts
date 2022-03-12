import { combineReducers } from "redux";
import dateReducer from "./date.reducer";
import calendarReducer from "./calendar.reducer";
import todoReducer from "./todo.reducer";

const reducers = combineReducers({
    date:dateReducer,
    calendar:calendarReducer,
    todo:todoReducer,
})

export default reducers

export type State = ReturnType<typeof reducers>