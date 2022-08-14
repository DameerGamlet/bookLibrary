import React, {Component} from 'react';
import {Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faPhone, faSignInAlt, faUndo, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        name: '', email: '', number: '', password: ''
    }


    resetForm = () => {
        this.setState(() => this.initialState)
    }

    changeForm = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {name, email, number, password} = this.state

        return (<div>
                <Row className={"justify-content-md-center"}>
                    <Col xs={5}>
                        <Card className="element_color text-white element_color_border">
                            <Card.Header style={{fontSize: "24px"}}>
                                <FontAwesomeIcon icon={faUserPlus}/> &nbsp;&nbsp;Register
                            </Card.Header>
                            <Card.Body>
                                <InputGroup className="mb-4 mt-3">
                                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon
                                        icon={faUser}/></InputGroup.Text>
                                    <FormControl required autoComplete={'off'} type="text" name={"name"}
                                                 value={name} onChange={(e) => this.changeForm(e)}
                                                 className="border-0 form-field"
                                                 placeholder="Enter name"/>
                                </InputGroup>
                                <InputGroup className="mb-4 mt-3">
                                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon
                                        icon={faEnvelope}/></InputGroup.Text>
                                    <FormControl required autoComplete={'off'} type="email" name={"email"}
                                                 value={email} onChange={(e) => this.changeForm(e)}
                                                 className="border-0 form-field"
                                                 placeholder="Enter email address"/>
                                </InputGroup>
                                <InputGroup className="mb-4 mt-2">
                                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon
                                        icon={faLock}/></InputGroup.Text>
                                    <FormControl required autoComplete={'off'} type='password'
                                                 name="password"
                                                 value={password} onChange={(e) => this.changeForm(e)}
                                                 className="border-0 form-field"
                                                 placeholder="Enter password"/>
                                </InputGroup>
                                <InputGroup className="mb-4 mt-3">
                                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon
                                        icon={faPhone}/></InputGroup.Text>
                                    <FormControl required autoComplete={'off'} type="text" name={"number"}
                                                 value={number} onChange={(e) => this.changeForm(e)}
                                                 className="border-0 form-field"
                                                 placeholder="Enter number"/>
                                </InputGroup>
                            </Card.Body>

                            <Card.Footer style={{textAlign: "right"}}>
                                <Button type="button" variant="success" className="mt-3 mb-2"
                                        disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                                    <FontAwesomeIcon icon={faSignInAlt}/> &nbsp;&nbsp;Login
                                </Button>
                                <Button type="button" variant="primary" style={{marginLeft: "20px"}}
                                        className="mt-3 mb-2"
                                        disabled={this.state.email.length === 0 && this.state.password.length === 0}
                                        onClick={this.resetForm}>
                                    <FontAwesomeIcon icon={faUndo}/>&nbsp;&nbsp; Reset
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}

export default RegisterPage;