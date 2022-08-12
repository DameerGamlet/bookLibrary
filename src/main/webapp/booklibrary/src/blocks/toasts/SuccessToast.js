import React, {Component} from 'react';
import {Toast} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";

class SuccessToast extends Component {
    render() {
        return (
            <div className={this.props.show ? "toastCss" : null}>
                <Toast
                    className="d-inline-block m-1"
                    bg="success"
                >
                    <Toast.Header>
                        <FontAwesomeIcon icon={faPlusSquare} width="20" height="20" className="rounded me-2"/>
                        <strong className="me-auto">Added book</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        <p style={{fontWeight: "bold", fontSize: 16}}>{this.props.message}</p>
                    </Toast.Body>
                </Toast>
            </div>
        );
    }
}

export default SuccessToast;