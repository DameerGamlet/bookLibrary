import React, {useEffect, useState} from 'react';
import {ButtonGroup, Card, Col, Form, Image, Pagination, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faInfo, faList, faRemove} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import DangerToast from "../../components/toasts/DangerToast";

function ListBookPage(props) {

    const [books, setBooks] = useState([{id: ""}])
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    const booksPerPage = 5
    const [currentPage, setCurrentPage] = useState(1)
    const [totalElement, setTotalElement] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        findAllBooks(currentPage)
    }, []);

    useEffect(() => {
        findAllBooks(currentPage)
    }, [currentPage]);

    function findAllBooks(currentPage) {
        currentPage--
        fetch('http://localhost:8080/book/all?page=' + currentPage
            + '&size=' + booksPerPage)
            .then(response => response.json())
            .then((allBooks) => {
                setBooks(allBooks.content)
                setTotalElement(allBooks.totalElements)
                setTotalPages(allBooks.totalPages)
            })
    }


    // function findAllBooks() {
    //     axios.get('http://localhost:8080/book/all')
    //         .then(response => {
    //             setBooks(response.data)
    //             console.log(response.data)
    //             console.log("count books: " + books.length)
    //         })
    //     console.log("books")
    //     console.log(books)
    // }

    function deleteBook(id) {
        fetch('http://localhost:8080/book/delete/' + id, {
            method: "DELETE"
        })
            .then((book) => {
                if (book) {
                    console.log("Successfully deleted book")
                    findAllBooks();
                    setShow(true)
                    setTimeout(() => {
                            setShow(false)
                        },
                        3000)
                }
            })
            .catch(error => console.error(error))
    }

    function firstPage  ()  {
        if(currentPage !== 1){
            setCurrentPage(1)
        }
    }

    function  prevPage () {
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }

    function  nextPage () {
        if(currentPage !== totalPages){
            setCurrentPage(currentPage + 1)
        }
    }

    function lastPage () {
        if(currentPage !== totalPages){
            setCurrentPage(totalPages)
        }
    }

    function changePage (e) {
        let value = parseInt(e.target.value)
        if(value > 0 && value <= totalPages){
            setCurrentPage(value)
        }
    }

    return (
        <div>
            <div style={{"display": show ? "block" : "none"}}>
                <DangerToast
                    show={show}
                    message={"Book deleted successfully!"}
                />
            </div>
            <Card className="element_color_border element_color text-white">
                <Card.Header>
                    <h4><FontAwesomeIcon icon={faList}/> Book List ({totalElement} count)</h4>
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
                        {
                            books.length === 1 ?
                                <tr>
                                    <td align="center">
                                        No have books !!
                                    </td>
                                </tr>
                                :
                                books.map((b) => (
                                    <tr key={b.id}>
                                        <td align="center"><Image src={b.coverPhotoUrl} roundedCircle width="40"
                                                                  height="40"/>
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
                                                        onClick={() => deleteBook(b.id)}>
                                                    <FontAwesomeIcon icon={faRemove} width={15}/>
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
                    <div style={{float: "left", marginTop: "20px"}}>
                        Showing Page {currentPage} of {totalPages}
                    </div>
                    <div style={{float: "right", marginTop: "20px"}}>
                        <Pagination>
                            <Pagination.First disabled={currentPage === 1} onClick={firstPage}/>
                            <Pagination.Prev disabled={currentPage === 1} onClick={prevPage}/>


                            <Form.Group as={Col} className="mb-3" controlId="formGridLanguage">
                                <Form.Control type="text" name="pagination" className="paginationPage"
                                              value={currentPage} autoComplete="off"
                                              onChange={changePage}/>
                            </Form.Group>

                            <Pagination.Next disabled={currentPage === totalPages} onClick={nextPage}/>
                            <Pagination.Last disabled={currentPage === totalPages} onClick={lastPage}/>


                        </Pagination>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default ListBookPage;