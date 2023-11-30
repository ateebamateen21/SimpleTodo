import React from "react";
import { Container, Row, Col, Button, CardBody, Card, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/style.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Prompt = ({ onAddTask }) => {
    const [taskText, setTaskText] = useState("");

    const addTask = () => {
        if (taskText.trim() !== "") {
            onAddTask(taskText);
            setTaskText("");
        }
    };

    const [inputStyle, setInputStyle] = useState({ border: "none" });

    return (
        <>
            <Container fluid className="my-3 py-3  prompt ">
                <Row className="justify-content-center align-items-start ">
                    <Col className="col-12 col-sm-6 col-md-6 col-lg-6  p-0">
                        <Card className="p-md-4 p-sm-3 py-3 PromptCard bg-color4 ">
                            <h4 className="text-center">Simple Todo</h4>
                            <CardBody className="text-center p-sm-0">
                                <Row className="mx-0">
                                    <Col className="col-10 px-sm-0 ">
                                        <Input
                                            type="text"
                                            placeholder="Enter your Todo"
                                            className="outline-none border-0 text-dark"
                                            value={taskText}
                                            onChange={(e) =>
                                                setTaskText(e.target.value)
                                            }
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    addTask();
                                                }
                                            }}
                                            style={inputStyle}
                                        />
                                    </Col>
                                    <Col className="col-2 px-sm-0 ">
                                        <Button
                                            className="btnPrompt btn-outline-light "
                                            onClick={() => {
                                                if (taskText === "") {
                                                    // alert("Please enter a task")
                                                    setInputStyle({
                                                        border: "1px solid red",
                                                    });
                                                }
                                                addTask();
                                            }}
                                        >
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
