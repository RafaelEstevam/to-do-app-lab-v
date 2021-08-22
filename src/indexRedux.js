import React from 'react';
import ReactDOM from 'react-dom';

import { createStore }  from 'redux';

function reducer(state = 0, action){
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

const store = createStore(reducer)

store.subscribe( () => console.log( store.getState() ) )
store.dispatch({type: 'INCREMENTAR', parametro: 3})
store.dispatch({type: 'INCREMENTAR'})
store.dispatch({type: 'DECREMENTAR', parametro: 2})
store.dispatch({type: 'DOBRAR'})

const element = (
    <div>
        {console.log(this)}
        <p>Usando o Redux</p>
    </div>
)
ReactDOM.render( element, document.getElementById('root'));
