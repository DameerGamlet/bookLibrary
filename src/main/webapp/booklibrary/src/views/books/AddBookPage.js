import React, {Component} from 'react';
import {Card, Col, Form, Image, InputGroup, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave} from '@fortawesome/free-regular-svg-icons';
import {faList, faUndo} from "@fortawesome/free-solid-svg-icons";
import SuccessToast from "../../components/toasts/SuccessToast";
import {Link} from "react-router-dom";
import axios from "axios";

import {connect} from "react-redux";
import {saveBook} from "../../services/index";

class AddBookPage extends Component {

    constructor(props) {
        super(props)

        this.state = this.initialState
        this.state.show = false
        this.state = {
            genres: [],
            languages: []
        }
    }

    initialState = {
        title: '', author: '', coverPhotoUrl: '', isbnNumber: '', price: '', language: '', genre: ''
    }

    componentDidMount() {
        this.initAllGenre();
        this.initAllLanguage();
    }

    initAllLanguage() {
        axios.get('http://localhost:8080/languages')
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    languages: [{
                        value: '', display: "Select language"
                    }]
                        .concat(data.map(l => {
                            return {
                                value: l, display: l
                            }
                        }))
                })
            })
    }

    initAllGenre() {
        axios.get('http://localhost:8080/genres')
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    genres: [{
                        value: '', display: 'Select a genre'
                    }]
                        .concat(data.map(g => {
                            return {
                                value: g, display: g
                            }
                        }))
                })
            })
    }

    addBook = (e) => {
        e.preventDefault()

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        this.props.saveBook(this.state)

        setTimeout(() => {
            if (this.props.saveBookObject.book != null) {
                this.setState({"show": true})
                setTimeout(() => {
                    this.setState({"show": false})
                }, 3000)
            } else {
                this.setState({"show": false})
            }
        }, 500)

        this.resetBook();
    }

    bookChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    resetBook = () => {
        this.setState(() => this.initialState)
    }

    selectLanguage = (e) => {
        console.log(e.target.value)
        this.setState({language: e.target.value})
    }

    selectGenre = (e) => {
        console.log(e.target.value)
        this.setState({genre: e.target.value})
    }

    render() {
        const {
            title, author, coverPhotoUrl, isbnNumber, price
        } = this.state

        return (<div>
            <div style={{"display": this.state.show ? "block" : "none"}}>
                <SuccessToast
                    show={this.state.show}
                    message={"Book added successfully!"}
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
                                <InputGroup>
                                    <Form.Control type="text" name="coverPhotoUrl" placeholder="Image URL"
                                                  value={coverPhotoUrl} autoComplete="off"
                                                  onChange={this.bookChange}/>
                                    {coverPhotoUrl !== '' &&
                                        <Image src={coverPhotoUrl} rounded width="40px"/>
                                    }
                                </InputGroup>
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
                                <Form.Label>Language ({this.state.languages.length})</Form.Label>
                                <Form.Select name="language" onChange={this.selectLanguage} value={this.state.language}>
                                    {this.state.languages.map(lang => <option key={lang.value} value={lang.value}>
                                        {lang.display}
                                    </option>)}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formGridLanguage">
                                <Form.Label>Genre ({this.state.genres.length})</Form.Label>
                                <Form.Select name="genre" onChange={this.selectGenre} value={this.state.genre}>
                                    {this.state.genres.map((g) =>
                                        <option key={g.display} value={g.display}>
                                            {g.display}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Footer style={{textAlign: "center"}}>
                        <Button variant="success" type="reset"
                                className="btn_function btn btn-sm">
                            <FontAwesomeIcon icon={faUndo}/> &nbsp; &nbsp; Reset</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant="primary" type="submit"
                                className="btn_function btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faSave}/> &nbsp; &nbsp; Save</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={"/books"}>
                            <Button variant="primary" type="button"
                                    className="btn_function btn btn-sm btn-outline-primary">
                                <FontAwesomeIcon icon={faList}/> &nbsp; Go to List
                            </Button>
                        </Link>
                    </Card.Footer>
                </Form>
            </Card>
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        saveBookObject: state.book
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveBook: (book) => dispatch(saveBook(book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookPage);