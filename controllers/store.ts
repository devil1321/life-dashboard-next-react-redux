import { createStore , applyMiddleware , compose  } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const initState = {}
const middleware = [thunk]

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    initState,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
    
)

export default store