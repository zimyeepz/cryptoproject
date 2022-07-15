import React from "react";

class Crypto extends React.Component{
    render(){
        return(
            <h2>La hora es {this.props.date.toLocaleTimeString()}</h2>
        )
    }
}

export default Crypto