import React from 'react'
import Container from 'react-bootstrap/Container';
import Crypto from './components/Crypto';


const App = () => (
    <div>
        <Crypto name="ETH_USD" />
        <Crypto name="ETH_MXN" />
    </div>
)

export default App