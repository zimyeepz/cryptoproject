import React from "react";
import Card from 'react-bootstrap/Card';

const Crypto = (props) => (

    <div className="col">
    <Card>
        <Card.Header className="text-center">
            {props.operation.book}
        </Card.Header>
        <Card.Body>
            
                {
                    <table className="table">
                        <tr>
                            <td>Monto</td>
                            <td>{props.operation.payload[0].a}</td>
                        </tr>
                        <tr>
                            <td>Precio</td>
                            <td>{props.operation.payload[0].r}</td>
                        </tr>
                    </table>                                                       
                }   
                   
        </Card.Body>
    </Card>
    </div>
   
)
export default Crypto