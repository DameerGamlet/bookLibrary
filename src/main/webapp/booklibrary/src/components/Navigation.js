import React, {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faSignOutAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../services";

class Navigation extends Component {

    componentDidMount() {
        console.log(123)
    }

    logout = () => {
        this.props.logoutUser()
    }

    render() {
        const guestLinks = (
            <>
                <div className="mr-auto"></div>
                <Navbar.Collapse className="justify-content-end mr-auto" style={{fontSize: "18px", color: "white"}}>
                    <Nav.Link href="/register" style={{marginRight: "20px"}}> <FontAwesomeIcon
                        icon={faUserPlus}/> &nbsp;&nbsp;&nbsp;Register </Nav.Link>
                    <Nav.Link href="/login"> <FontAwesomeIcon icon={faSignInAlt}/> &nbsp;&nbsp;&nbsp;Login </Nav.Link>
                </Navbar.Collapse>
            </>
        );
        const userLinks = (
            <>
                <Nav className="mr-auto" style={{fontSize: "18px"}}>
                    <Nav.Link href="/add_book">Add book</Nav.Link>
                    <Nav.Link href="/books">List book</Nav.Link>
                    <Nav.Link href="/users">List user</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end mr-auto" style={{fontSize: "18px", color: "white"}}>
                    <Nav.Link href="/logout" onClick={this.logout}>
                        <FontAwesomeIcon icon={faSignOutAlt}/> &nbsp;&nbsp;&nbsp;Logout </Nav.Link>
                </Navbar.Collapse>
            </>
        );

        return (
            <Navbar className="element_color" variant="dark" style={{padding: "5px 30px"}}>
                <Navbar.Brand href="/" className="row">
                    <div className="col">
                        <img src={"images/book.png"} alt="" width="35px"/>
                    </div>
                    <div className="col">
                        <h3>Book Store</h3>
                    </div>
                </Navbar.Brand>
                {
                    this.props.auth.isLoggedIn ? userLinks : guestLinks
                }
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return{
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navigation);