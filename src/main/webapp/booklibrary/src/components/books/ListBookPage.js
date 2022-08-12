import React, {useEffect, useState} from 'react';
import {ButtonGroup, Card, Image, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faInfo, faList, faRemove} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

function ListBookPage(props) {

    const [books, setBooks] = useState([{id: ""}])
    const navigate = useNavigate()

    useEffect(() => {
        findAllBooks()
    }, []);

    function findAllBooks() {
        let link = 'http://localhost:8080/book/all'
        axios.get(link)
            .then(response => {
                setBooks(response.data)
                console.log(response.data)
                console.log("count books: " + books.length)
            })
        console.log("books")
        console.log(books)
    }

    return (
        <div>
            <Card className="element_color_border element_color text-white">
                <Card.Header>
                    <h4><FontAwesomeIcon icon={faList}/> Book List ({books.length} count)</h4>
                </Card.Header>
                <Card.Body>
                    <Table bordered className="text-white">
                        <thead>
                        <tr bgcolor="#697075">
                            <th width="100px">Preview</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN Number</th>
                            <th>Price</th>
                            <th>Language</th>
                            <th width="100px">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((b) => (
                            <tr key={b.id}>
                                <td align="center"><Image src={b.coverPhotoUrl} roundedCircle width="40" height="40"/>
                                </td>
                                <td>{b.title}</td>
                                <td>{b.author}</td>
                                <td>{b.isbnNumber}</td>
                                <td>{b.price} $</td>
                                <td>{b.language}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button className="btn btn-sm btn-outline-light"
                                                onClick={() => navigate("info/" + b.id, {state: b})}>
                                            <FontAwesomeIcon icon={faInfo} width={15}/>
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button className="btn btn-sm btn-outline-light"
                                        onClick={() => navigate("edit/" + b.id)}>
                                            <FontAwesomeIcon icon={faEdit} width={15}/>
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button size="sm" variant="outline-danger"
                                                onClick={() => this.deleteBook(b.id)}>
                                            <FontAwesomeIcon icon={faRemove} width={15}/>
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ListBookPage;