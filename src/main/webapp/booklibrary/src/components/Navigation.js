import React from 'react';
import {Nav, Navbar} from "react-bootstrap";

function Navigation() {
    return (
        <div>
            <Navbar className="element_color" variant="dark" style={{padding: "5px 30px"}}>
                <Navbar.Brand href="/">
                    <img src={"images/book.png"} alt="" width="35px"/>
                </Navbar.Brand>
                <Nav className="mr-auto" style={{fontSize: "18px"}}>
                    <Nav.Link href="/add_book">Add book</Nav.Link>
                    <Nav.Link href="/books">List book</Nav.Link>
                    <Nav.Link href="/users">List user</Nav.Link>
                </Nav>
                {/*<Form className="d-flex justify-content-end end-0" style={{marginLeft: "600px"}}>*/}
                {/*    <Form.Control*/}
                {/*        type="search"*/}
                {/*        placeholder="Search"*/}
                {/*        className="me-2"*/}
                {/*        aria-label="Search"*/}
                {/*    />*/}
                {/*    <Button variant="btn btn-outline-light">Search</Button>*/}
                {/*</Form>*/}
            </Navbar>
        </div>
    );
}

export default Navigation;