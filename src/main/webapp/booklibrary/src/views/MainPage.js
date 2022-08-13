import React from 'react';

function MainPage(props) {
    return (
        <div className="jumbotron element_color text-white rounded">
            <h1 className="display-4">{props.heading}</h1>
            <p className="lead">{props.desc}</p>
            <hr className="my-4"/>
            <p style={{color: "lightgray"}}> - Create by Damir - </p>
        </div>
    );
}

export default MainPage;