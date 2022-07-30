import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, update, merge } from './store';
import Crypto from './components/Crypto';


const App = () => {
    const cryptos = useSelector((state) => state.app.cryptos);
    const dispatch = useDispatch()
    const websocket = new WebSocket('wss://ws.bitso.com');
    //const [operation, setOperation] = useState({});

    useEffect(()=>{
        websocket.onopen = ()=>{
            websocket.send(JSON.stringify({ action: 'subscribe', book: 'eth_usd', type: 'trades' }));
            websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_usd', type: 'trades' }));
            websocket.send(JSON.stringify({ action: 'subscribe', book: 'aave_usd', type: 'trades' }));
        }
    },[]);

    useEffect(()=>{
        websocket.onmessage = (message)=>{
            let data = JSON.parse(message.data);
            console.log(data);
            if (data.type == 'trades' && data.payload)
                dispatch(merge(data));
        }
    });

    return (
        <div className='row'>            
            {
                cryptos.map((item, index)=>{
                    return <Crypto key={index} name="Hola Mundo" operation={item} />
                })
            }
        </div>
    )
}

export default App