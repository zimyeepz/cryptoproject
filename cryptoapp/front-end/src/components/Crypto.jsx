import React from "react";
import Card from 'react-bootstrap/Card';

const Crypto = (props) => (

    <Card style={{ width: '18rem' }}>
        <Card.Header className="text-center">
            {props.name}
        </Card.Header>
        <Card.Body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta suscipit numquam tempore perferendis odit eveniet placeat hic, corporis aut dicta, nobis provident nisi quas incidunt accusantium vitae reprehenderit in culpa.
        </Card.Body>
    </Card>
   
)
export default Crypto