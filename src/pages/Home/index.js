import React, {useContext} from 'react';
import DefaultContext from '../../stores/defaultContext';
import { useSelector, useDispatch } from 'react-redux'

import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Counter = function(){

  // agora a função de callback, que é executada em cada dispatch, 
  // deve retornar state.counter e sate.name.
  let counter = useSelector(state => state.counter)
  let name = useSelector(state => state.name)

  const dispatch = useDispatch()

  // repare que, apesar de estar definido em outro componente, temos 
  // acesso ao name que está no Redux
  return (
    <div> 
    <p>counter: {counter} do {name}</p>
    <button 
    	onClick={ () => dispatch({type: 'INCREMENTAR'})}> 
    		Incrementar 
    </button>
    <button 
    	onClick={ () => dispatch({type: 'DECREMENTAR'})}> 
    		Decrementar 
    </button>
    <button 
    	onClick={ () => dispatch({type: 'INCREMENTAR', parametro: 2})}> 
    		Incrementar 
    2</button>
    <button 
    	onClick={ () => dispatch({type: 'DECREMENTAR', parametro: 2})}> 
    		Decrementar 
    2</button>
    </div>
  )
}

const Name = function(){
  let name = useSelector(state => state.name);
  const dispatch = useDispatch();  

  return (
    <div> 
      <input
        type="text"
        value={name}
        onChange={ (e) => dispatch({
        	type: 'ALTERAR', 
        	parametro: e.target.value})}
      />
    </div>
  )
}

function Album() {

  // const dispatch = useDispatch();
  
  // const currentDefaultContext = useContext(DefaultContext);
  // const counter = useSelector(state => state.counter)
  // const name = useSelector(state => state.name)


  // console.log(counter);
  
  return (
    // <>
    //   <AppBar position="relative">
    //     <Toolbar>
    //       <CameraIcon />
    //       <Typography variant="h6" color="inherit" noWrap>
    //         To do app
    //       </Typography>
    //     </Toolbar>
    //   </AppBar>

    // </>
    <>
      <Name />
      <Counter />
    </>
  );
}

export default Album;