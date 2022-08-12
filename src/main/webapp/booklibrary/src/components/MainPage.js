import React, {Component} from 'react';

class MainPage extends Component {
    render() {
        return (
            <div className="jumbotron element_color text-white rounded">
                <h1 className="display-4">Book library</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra
                    attention to featured content or information.</p>
                <hr className="my-4"/>
            </div>
        );
    }
}

export default MainPage;