import React, {Component} from 'react';
import {ButtonGroup, Card, Image, Table} from "react-bootstrap";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faInfo, faList, faRemove} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import DangerToast from "../../blocks/toasts/DangerToast";
import {Link} from "react-router-dom";

class ListBooksPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: [],
            show: false
        }
        this.bookList = []
    }

    componentDidMount() {
        this.findAllBooks();
    }

    findAllBooks() {
        let link = 'http://localhost:8080/book/all'
        axios.get(link)
            .then(response => response.data)
            .then((data) => {
                this.bookList = data
                this.setState({"": ""})
                console.log(this.bookList)
                console.log("count books: " + this.bookList.length)
            })
    }


    deleteBook(id) {
        let link = 'http://localhost:8080/book/delete/' + id
        axios.delete(link)
            .then(response => response.data)
            .then(() => {
                console.log("Successfully deleted book")
                this.findAllBooks();
                this.setState({"show": true})
                setTimeout(() => {
                        this.setState({"show": false})
                    },
                    3000)
            })
            .catch(error => console.error(error))
    }

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <DangerToast
                        show={this.state.show}
                        message={"Book deleted successfully!"}
                    />
                </div>
                <Card className="element_color_border element_color text-white">
                    <Card.Header>
                        <h4><FontAwesomeIcon icon={faList}/> Book List ({this.bookList.length} count)</h4>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered className="text-white">
                            <thead>
                            <tr bgcolor="#697075">
                                <th>Img</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN Number</th>
                                <th>Price</th>
                                <th>Language</th>
                                <th width="100px">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.bookList.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">No Books Available</td>
                                </tr>
                                :
                                this.bookList.map((b) => (
                                    <tr align="center" key={b.id}>
                                        <td><Image src={b.coverPhotoUrl} roundedCircle width="25" height="25"/></td>
                                        <td>{b.title}</td>
                                        <td>{b.author}</td>
                                        <td>{b.isbnNumber}</td>
                                        <td>{b.price}</td>
                                        <td>{b.language}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"info/" + b.id} className="btn btn-sm btn-outline-light">
                                                    <FontAwesomeIcon icon={faInfo} width={15}/>
                                                </Link>
                                                &nbsp;&nbsp;
                                                <Link to={"edit/" + b.id} state={{name: "text"}} className="btn btn-sm btn-outline-light">
                                                    <FontAwesomeIcon icon={faEdit} width={15}/>
                                                </Link>
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
}

export default ListBooksPage;