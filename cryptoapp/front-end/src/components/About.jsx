import React from "react";

const user = {
    firstName : 'Carlos',
    lastName: 'Chavez'
}

const About = () => {
    return(
        <div>
            <h1>Hola mundo! {user.firstName}</h1>
        </div>
    )
};

export default About;