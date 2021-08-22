import { createStore, combineReducers } from 'redux';
// import { Reducers } from '../reducers';

function counterReducer(state = 0, action){
    let param = action.parametro || 1;
    switch (action.type) {
        case 'INCREMENTAR':
          return state + param
        case 'DECREMENTAR':
          return state - param
        default:
          return state
      }
}
function nameReducer(state = '', action){
    let param = action.parametro || state;
    switch (action.type) {
        case 'ALTERAR':
          return param
        default:
          return state
      }
}

export default createStore(combineReducers({
	counter: counterReducer,
	name: nameReducer
}));