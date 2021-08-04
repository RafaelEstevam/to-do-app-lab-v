import react, {useContext} from 'react';
import DefaultContext from '../../stores/defaultContext'

function Home () {

    const currentDefaultContext = useContext(DefaultContext);

    return (
        <h1>React base Home</h1>
    )
}

export default Home;