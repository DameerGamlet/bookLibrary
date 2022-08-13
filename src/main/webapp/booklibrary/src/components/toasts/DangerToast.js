import React, {Component} from 'react';
import {Toast} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleMinus} from "@fortawesome/free-solid-svg-icons";

class DangerToast extends Component {
    render() {
        return (
            <div className={this.props.show ? "toastCss" : null}>
                <Toast
                    className="d-inline-block m-1"
                    bg="danger"
                >
                    <Toast.Header>
                        <FontAwesomeIcon icon={faCircleMinus} width="20" height="20" className="rounded me-2"/>
                        <strong className="me-auto">Delete book</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        <p style={{fontWeight: "bold", fontSize: 16}}>{this.props.message}</p>
                    </Toast.Body>
                </Toast>
            </div>
        );
    }
}

export default DangerToast;