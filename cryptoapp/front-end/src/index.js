import React from "react";
import ReactDOM from 'react-dom/client'
import About from "./components/About";
import Crypto from "./components/Crypto";



const root = ReactDOM.createRoot(
    document.getElementById('app')
);


const element = <Crypto date={new Date()} />;
root.render(element);

/*ReactDOM.render(
    element,
    document.getElementById('app')
);
*/