import React, {useEffect, useState} from 'react';
import {Card, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-regular-svg-icons";
import Button from "react-bootstrap/Button";
import {faEdit, faList} from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import UpdateToast from "../../components/toasts/UpdateToast";

export default function EditBookPage(props) {

    const {id} = useParams()
    const [book, setBook] = useState(
        {
            id: 0,
            title: "",
            author: "",
            coverPhotoUrl: "",
            isbnNumber: "",
            price: "",
            language: ""
        }
    )
    const [show, setShow] = useState(false)


    useEffect(() => {
        findBook()
    }, []);

    function findBook() {
        fetch("http://localhost:8080/book/" + id)
            .then(response => response.json())
            .then((book) => {
                if (book)
                    setBook(book)
            })
            .catch(error => console.error(error))
    }

    // function findBook() {
    //     axios.get("http://localhost:8080/book/" + id)
    //         .then(res => {
    //             setBook(res.data)
    //         })
    //         .catch(error => console.error(error))
    // }

    function editBook(e) {

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        fetch("http://localhost:8080/book/update", {
            method: 'PUT',
            body: JSON.stringify(book),
            headers
        }).then(response => response.json())
            .then((book) => {
                console.log(book)
                if (book) {
                    setShow(true)
                    setTimeout(() => {
                            setShow(false)
                        },
                        3000)
                }
            })
            .catch(error => console.error(error))
    }

    // function editBook(e) {
    //     console.log(book)
    //     axios.put("http://localhost:8080/book/update", book)
    //         .then(res => {
    //             console.log(res.data)
    //             setShow(true)
    //             setTimeout(() => {
    //                     setShow(false)
    //                 },
    //                 3000)
    //         })
    //         .catch(error => console.error(error))
    // }

    function changeBook(e) {
        setBook({...book, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <div style={{"display": show ? "block" : "none"}}>
                <UpdateToast
                    show={show}
                    message={"Book update successfully!"}
                />
            </div>
            <Card className="element_color_border element_color text-white">
                <Card.Header>
                    <h4><FontAwesomeIcon icon={faPlusSquare}/> Edit book "{book.title}"</h4>
                </Card.Header>
                <Form id="bookFormId" onSubmit={editBook}>
                    <Card.Body>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control required type="text" name="title" placeholder="Name book"
                                              defaultValue={book.title}
                                              onChange={(e) => changeBook(e)}
                                              autoComplete="off"/>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formGridAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="text" name="author" placeholder="Author book"
                                              defaultValue={book.author}
                                              onChange={(e) => changeBook(e)}
                                              autoComplete="off"/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="formGridCoverPhotoUrl">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control type="text" name="coverPhotoUrl" placeholder="Image URL"
                                              defaultValue={book.coverPhotoUrl}
                                              onChange={(e) => changeBook(e)}
                                              autoComplete="off"/>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formGridIsbnNumber">
                                <Form.Label>ISBN Number</Form.Label>
                                <Form.Control type="number" name="isbnNumber" placeholder="ISBN Number book"
                                              defaultValue={book.isbnNumber}
                                              onChange={(e) => changeBook(e)}
                                              autoComplete="off"/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control required type="number" step="any" name="price" placeholder="Price"
                                              defaultValue={book.price}
                                              onChange={(e) => changeBook(e)}
                                              autoComplete="off"/>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formGridLanguage">
                                <Form.Label>Language</Form.Label>
                                <Form.Control type="text" name="language" placeholder="Language"
                                              defaultValue={book.language}
                                              onChange={(e) => changeBook(e)}
                                              autoComplete="off"/>
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Footer style={{textAlign: "center"}}>
                        <Button variant="success" type="button" onClick={(e) => editBook(e)}
                                className="btn_function btn btn-sm btn-outline-success">
                            <FontAwesomeIcon icon={faEdit}/> &nbsp; Edit</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={"/books"}>
                            <Button variant="primary" type="button"
                                    className="btn_function btn btn-sm btn-outline-primary">
                                <FontAwesomeIcon icon={faList}/> &nbsp; Back to List
                            </Button>
                        </Link>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
    );
}