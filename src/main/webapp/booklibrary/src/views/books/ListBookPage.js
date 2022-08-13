import React, {useEffect, useState} from 'react';
import {ButtonGroup, Card, Col, Form, Image, Pagination, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faInfo, faList, faRemove} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import DangerToast from "../../components/toasts/DangerToast";

function ListBookPage(props) {

    const [books, setBooks] = useState([{id: ""}])
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    const [booksPerPage, setBooksPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalElement, setTotalElement] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [sortBy, setSortBy] = useState("id")
    const [sortDir, setSortDir] = useState("asc")

    const [search, setSearch] = useState("")
    const [searchAction, setSearchAction] = useState(false)

    useEffect(() => {
        console.log("searchAction: " + searchAction)
        if(!searchAction){
            findAllBooks(currentPage)
        } else {
            searchData(currentPage)
        }
    }, [sortBy, sortDir, booksPerPage]);

    function findAllBooks(currentPage) {
        setSearchAction(false)
        currentPage--
        let link = 'http://localhost:8080/book/all?'
            + 'pageNumber=' + currentPage
            + '&pageSize=' + booksPerPage
            + '&sortBy=' + sortBy
            + '&sortDir=' + sortDir
        console.log(link)
        fetch(link)
            .then(response => response.json())
            .then((allBooks) => {
                console.log(allBooks.content)
                setBooks(allBooks.content)
                setTotalElement(allBooks.totalElements)
                setTotalPages(allBooks.totalPages)
            })
    }

    function deleteBook(id) {
        fetch('http://localhost:8080/book/delete/' + id, {
            method: "DELETE"
        })
            .then((book) => {
                if (book) {
                    console.log("Successfully deleted book")
                    setShow(true)
                    selectActionShow(currentPage)
                    setTimeout(() => {
                            setShow(false)
                        },
                        3000)
                }
            })
            .catch(error => console.error(error))
    }

    function selectActionShow(value) {
        console.log("SELECT")
        if (!searchAction) {
            findAllBooks(value)
        } else {
            searchData(value)
        }
    }

    function firstPage() {
        if (currentPage !== 1) {
            setCurrentPage(1)
            selectActionShow(1)
        }
    }

    function prevPage() {
        if (currentPage !== 1) {
            let value = currentPage - 1
            setCurrentPage(value)
            selectActionShow(value)
        }
    }

    function nextPage() {
        if (currentPage !== totalPages) {
            let value = currentPage + 1
            setCurrentPage(value)
            selectActionShow(value)
        }
    }

    function lastPage() {
        if (currentPage !== totalPages) {
            setCurrentPage(totalPages)
            selectActionShow(totalPages)
        }
    }

    function changePage(e) {
        let value = parseInt(e.target.value)
        selectActionShow(value)

        if (value > 0 && value <= totalPages) {
            setCurrentPage(value)
        }
    }

    function changeSortBy(e) {
        console.log("Sort by " + e.target.value)
        setSortBy(e.target.value)
        selectActionShow(currentPage)
    }

    function changeSortDir(e) {
        console.log("Sort dir " + e.target.value)
        setSortDir(e.target.value)
        selectActionShow(currentPage)
    }

    function changeCountElementRepPage(e) {
        let value = parseInt(e.target.value)
        console.log("Sort by " + value)
        setBooksPerPage(value)
        setCurrentPage(1)
        selectActionShow(currentPage)
    }

    function changeSearch(e) {
        setSearch(e.target.value)
    }

    function searchDataAction(){
        setCurrentPage(1)
        searchData(1)
    }

    function searchData(currentPage) {
        setSearchAction(true)
        currentPage -= 1
        let link = 'http://localhost:8080/book/search/' + search
            + '?pageNumber=' + currentPage
            + '&pageSize=' + booksPerPage
            + '&sortBy=' + sortBy
            + '&sortDir=' + sortDir
        console.log(link)
        fetch(link)
            .then(response => response.json())
            .then((allBooks) => {
                console.log(allBooks.content)
                setBooks(allBooks.content)
                setTotalElement(allBooks.totalElements)
                setTotalPages(allBooks.totalPages)
            })
    }

    function resetData() {
        setSearch("")
        setCurrentPage(1)
        findAllBooks(currentPage)
    }

    return (
        <div>
            <div style={{"display": show ? "block" : "none"}}>
                <DangerToast
                    show={show}
                    message={"Book deleted successfully!"}
                />
            </div>
            <Card className="element_color_border element_color text-white" style={{marginBottom: "100px"}}>
                <Card.Header>
                    <Row>
                        <Col sm={4}>
                            <h4><FontAwesomeIcon icon={faList}/> Book List ({totalElement} count)</h4>
                        </Col>
                        <Col sm={8}>
                            <Row>
                                <Col sm={2}>
                                    Sorted by
                                    <Form.Select size="sm" onChange={(e) => changeSortBy(e)}>
                                        <option value="id">Not Sorted</option>
                                        <option value="title">Title</option>
                                        <option value="author">Author</option>
                                        <option value="price">Price</option>
                                        <option value="language">Language</option>
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                    Sorted dir
                                    <Form.Select size="sm" onChange={(e) => changeSortDir(e)}>
                                        <option value="asc">by asc</option>
                                        <option value="dsc">by dsc</option>
                                    </Form.Select>
                                </Col>
                                <Col sm={2}>
                                    Show by
                                    <Form.Select size="sm" onChange={(e) => changeCountElementRepPage(e)}>
                                        <option value="5">show by 5</option>
                                        <option value="10">show by 10</option>
                                        <option value="25">show by 25</option>
                                        <option value="100">show by 100</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    Search
                                    <Form className="d-flex justify-content-end end-0">
                                        <Form.Control
                                            style={{height: "32px"}}
                                            type="search"
                                            onChange={changeSearch}
                                            value={search}
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                        />
                                        <Button variant="btn btn-outline-light"
                                                onClick={() => searchDataAction()}
                                                style={{height: "32px"}}>Search</Button>

                                        <Button variant="btn btn-outline-light"
                                                onClick={() => resetData()}
                                                style={{height: "32px"}}>Reset</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
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
                            <th>Genre</th>
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
                                        <td>{b.genre}</td>
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