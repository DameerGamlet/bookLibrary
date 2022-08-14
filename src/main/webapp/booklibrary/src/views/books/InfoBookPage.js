import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {Image, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function InfoBookPage(props) {

    const location = useLocation();

    useEffect(() => {
        console.log(location.state)
    })

    return (
        <div className="jumbotron element_color text-white rounded" style={{paddingBottom: "30px"}}>
            <Row className="mt-2" style={{marginLeft: "5px"}}>
                <div className="col-1">
                    <Button className="btn btn-primary" style={{width: "100px"}}>Back</Button>
                </div>
                <div className="col-6" style={{marginLeft: "30px"}}>
                    <h2>Book: {location.state.title}</h2>
                </div>
            </Row>
            <hr className="mt-3 mb-3"/>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <Image src={location.state.coverPhotoUrl} width="300" height="400"/>
                    </div>
                    <div className="col-8">

                        <Table  className="text-white" style={{fontSize: "20px"}}>
                            <thead >
                            <tr>
                                <td width="200px"><b>Author</b></td>
                                <td>{location.state.author}</td>
                            </tr>
                            <tr>
                                <td><b>ISBN Number</b></td>
                                <td>{location.state.isbnNumber}</td>
                            </tr>
                            <tr>
                                <td><b>Price</b></td>
                                <td>{location.state.price}</td>
                            </tr>
                            <tr>
                                <td><b>Language</b></td>
                                <td>{location.state.language}</td>
                            </tr>
                            <tr>
                                <td><b>Genre</b></td>
                                <td>{location.state.genre}</td>
                            </tr>
                            </thead>
                        </Table>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoBookPage;

