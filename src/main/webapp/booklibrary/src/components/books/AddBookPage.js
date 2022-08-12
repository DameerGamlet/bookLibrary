import React, {Component} from 'react';
import {Card, Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave} from '@fortawesome/free-regular-svg-icons';
import axios from "axios";
import {faUndo} from "@fortawesome/free-solid-svg-icons";
import SuccessToast from "../../blocks/toasts/SuccessToast";

class AddBookPage extends Component {

    constructor(props) {
        super(props)

        this.state = this.initialState
        this.file = ""
        this.state.show = false
    }

    initialState = {
        title: '', author: '', coverPhotoUrl: '', isbnNumber: '', price: '', language: ''
    }

    addBook = (e) => {
        e.preventDefault()
        let link = 'http://localhost:8080/book/create'
        console.log(this.state)
        axios.post(link, this.state)
            .then(response => response.data)
            .then(data => {
                console.log(data)
                if (data != null) {
                    this.setState({"show": true})
                    setTimeout(() => {
                            this.setState({"show": false})
                        },
                        3000)
                } else {
                    this.setState({"show": false})
                }
            })
            .catch(error => console.error(error))
        this.resetBook();
    }

    bookChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    resetBook = () => {
        this.setState(() => this.initialState)
    }

    render() {
        const {
            title,
            author,
            coverPhotoUrl,
            isbnNumber,
            price,
            language
        } = this.state

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <SuccessToast
                        show = {this.state.show}
                        message = {"Book added successfully!"}
                    />
                </div>
                <Card className="element_color_border element_color text-white">
                    <Card.Header>
                        <h4><FontAwesomeIcon icon={faPlusSquare}/> Add new book</h4>
                    </Card.Header>
                    <Form id="bookFormId" onSubmit={this.addBook} onReset={this.resetBook}>
                        <Card.Body>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="formGridTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required type="text" name="title" placeholder="Name book"
                                                  value={title} autoComplete="off"
                                                  onChange={this.bookChange}/>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="formGridAuthor">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" name="author" placeholder="Author book"
                                                  value={author} autoComplete="off"
                                                  onChange={this.bookChange}/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="formGridCoverPhotoUrl">
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control type="text" name="coverPhotoUrl" placeholder="Image URL"
                                                  value={coverPhotoUrl} autoComplete="off"
                                                  onChange={this.bookChange}/>
                                    {/*<Form.Control type="file" name="file"/>*/}
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="formGridIsbnNumber">
                                    <Form.Label>ISBN Number</Form.Label>
                                    <Form.Control type="number" name="isbnNumber" placeholder="ISBN Number book"
                                                  value={isbnNumber} autoComplete="off"
                                                  onChange={this.bookChange}/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required type="number" name="price" placeholder="Price"
                                                  value={price} autoComplete="off"
                                                  onChange={this.bookChange}/>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="formGridLanguage">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control type="text" name="language" placeholder="Language"
                                                  value={language} autoComplete="off"
                                                  onChange={this.bookChange}/>
                                </Form.Group>
                            </Row>
                        </Card.Body>
                        <Card.Footer style={{textAlign: "center"}}>
                            <Button variant="success" type="reset"
                                    className="btn_function">
                                <FontAwesomeIcon icon={faUndo}/> &nbsp; &nbsp; Reset</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button variant="primary" type="submit"
                                    className="btn_function">
                                <FontAwesomeIcon icon={faSave}/> &nbsp; &nbsp; Save</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default AddBookPage;