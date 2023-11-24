import React from "react";
import {
    Container,
    Row,
    Col,
    Button,
    CardBody,
    Card,
    Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Prompt = () => {
    return (
        <>
            <Container fluid className="bg-secondary ">
                <Row className="justify-content-center align-content-center y ">
                    <Col className="col-12 col-md-6 col-lg-6  p-0">
                        <Card className="">
                            <h4 className="text-center">Simple Todo</h4>
                            <CardBody className="text-center p-sm-2">
                                <Row>
                                    <Col className="col-10 ">
                                        <Input
                                            type="text"
                                            placeholder="Enter your Todo"
                                        />
                                    </Col>
                                    <Col className="col-2 ">
                                        <Button color="primary">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Prompt;
