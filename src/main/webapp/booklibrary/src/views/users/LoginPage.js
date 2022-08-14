import React, {Component} from 'react';
import {Alert, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignInAlt, faUndo} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {authenticateUser} from "../../services/index";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        email: '', password: '', error: '', authResult: false
    }

    resetForm = () => {
        this.setState(() => this.initialState)
    }

    changeForm = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    validateUser = () => {
        this.props.authenticateUser(this.state.email, this.state.password)
        setTimeout(() => {
            if(this.props.auth.isLoggedIn){
                this.setState({"authResult": true})
            } else {
                this.resetForm()
                this.setState({"error": "Invalid email or password"})
            }
        }, 500)
    }

    render() {

        const {email, password, error, authResult} = this.state

        return (
            <div>
                {
                    authResult &&
                    <Navigate to="/books" replace={true}/>
                }
                <Row className={"justify-content-md-center"}>
                    <Col xs={5}>
                        {
                            this.state.error &&
                            <Alert variant="danger">
                                {error}
                            </Alert>
                        }
                        <Card className="element_color text-white element_color_border">
                            <Card.Header style={{fontSize: "24px"}}>
                                <FontAwesomeIcon icon={faSignInAlt}/> &nbsp;&nbsp;Login
                            </Card.Header>
                            <Card.Body>
                                <InputGroup className="mb-4 mt-3">
                                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon
                                        icon={faEnvelope}/></InputGroup.Text>
                                    <FormControl required autoComplete="off" type="email" name={"email"}
                                                 value={email} onChange={(e) => this.changeForm(e)}
                                                 className="border-0 form-field"
                                                 placeholder="Enter email address"/>
                                </InputGroup>

                                <InputGroup className="mb-4 mt-2">
                                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon
                                        icon={faLock}/></InputGroup.Text>
                                    <FormControl required autoComplete="off" type='password'
                                                 name="password"
                                                 value={password} onChange={(e) => this.changeForm(e)}
                                                 className="border-0 form-field"
                                                 placeholder="Enter password"/>
                                </InputGroup>
                            </Card.Body>

                            <Card.Footer style={{textAlign: "right"}}>
                                <Button type="button" variant="primary"  className="mt-3 mb-2"
                                        onClick={this.validateUser}
                                        disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                                    <FontAwesomeIcon icon={faSignInAlt}/> Login
                                </Button>
                                <Button type="button" variant="primary" style={{marginLeft: "20px"}}  className="mt-3 mb-2"
                                        disabled={this.state.error.length === 0 || (this.state.email.length === 0 && this.state.password.length === 0)}
                                        onClick={this.resetForm}>
                                    <FontAwesomeIcon icon={faUndo}/> Reset
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);