import react, {useEffect, useState} from 'react';

import { Router } from 'react-router-dom';
import GlobalStyle from './styles/global';

import Routes from './routes';
import history from './services/history';

import DefaultContext from './stores/defaultContext';

import {API} from './services/api'

function App() {

  const [defaultContext, setDefaultContext] = useState({});

  useEffect(() => {
    setDefaultContext({
      applicationName: "React Base"
    })
  }, [])

  return (
    <DefaultContext.Provider value={defaultContext}>
      <Router history={history}>
        <Routes />
        <GlobalStyle />
      </Router>
    </DefaultContext.Provider>
    
  );
}

export default App;
