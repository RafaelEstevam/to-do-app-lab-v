import react, {useEffect, useState} from 'react';
import { Router } from 'react-router-dom';
import GlobalStyle from './styles/global';

import Routes from './routes';
import history from './services/history';

import DefaultContext from './stores/defaultContext';

function App() {

  const [defaultContext, setDefaultContext] = useState({});

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
