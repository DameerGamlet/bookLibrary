import React from 'react';
import {Col, Container, Navbar} from "react-bootstrap";

function Footer() {
    let fullYear = new Date().getFullYear();

    return (
        <div>
            <Navbar fixed="bottom" className="nav_color" variant="dark">
                <Container>
                    <Col lg={12} className={"text-center text-muted"}>
                        <div className="text-white">
                            {fullYear} - {fullYear + 1}, All Rights Reserved by Almighty Java
                        </div>
                    </Col>
                </Container>
            </Navbar>
        </div>
    );
}

export default Footer;