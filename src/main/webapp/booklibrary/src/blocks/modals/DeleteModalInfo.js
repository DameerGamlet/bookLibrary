import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";

export function DeleteModalInfo(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Will you want to delete this book?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-dander" onClick={props.onHide}>Yes</Button>
                <Button className="btn btn-primary" onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}