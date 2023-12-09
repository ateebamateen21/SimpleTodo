import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/style.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import {
    Container,
    Row,
    Col,
    Button,
    CardBody,
    Card,
    Input,
    Collapse,
    Label,
} from "reactstrap";

const Prompt = ({
    addTask,
    selectedDate,
    setSelectedDate,
    handlePriorityChange,
    tag,
    setTag,
}) => {
    const [taskText, setTaskText] = useState("");

    //The collapsible component triggered by Input
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        if (!isOpen) {
            // Only toggle if the collapse is not open
            setIsOpen(!isOpen);
        }
    };

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
                                            onChange={(e) => {
                                                setTaskText(e.target.value);
                                            }}
                                            onKeyPress={(e) => {
                                                
                                                if (e.key === "Enter") {
                                                    // Update the state first, then call addTask
                                                    if (taskText === "") {
                                                        alert("Please enter a task");
                                                    } else {
                                                        addTask(taskText);
                                                        setTaskText(""); 
                                                    }
                                                }
                                            }}
                                            onClick={toggle}
                                        />
                                    </Col>
                                    <Col className="col-2 px-sm-0 ">
                                        <Button
                                            className="btnPrompt btn-outline-light "
                                            onClick={() => {
                                                if (taskText === "") {
                                                    alert(
                                                        "Please enter a task"
                                                    );
                                                } else {
                                                    // Update the state first, then call addTask
                                                    addTask(taskText);
                                                    setTaskText("");
                                                }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>

                            <Collapse isOpen={isOpen} className="m-1">
                                <Card id="collapseCard">
                                    <CardBody className="p-2">
                                        {/* Date picker */}
                                        <Row className=" m-2">
                                            <Col
                                                className="col-sm-3 col-md-3 col-lg-3 d-flex  p-1 justify-content-center "
                                                xs={12}
                                            >
                                                <div className=" fw-bold ">
                                                    Date:{" "}
                                                </div>
                                            </Col>
                                            <Col
                                                className="col-sm-8  col-md-8 col-lg-8 d-flex p-1 justify-content-center "
                                                xs={12}
                                            >
                                                <div className="datePickerWrapper ">
                                                    <input
                                                        type="date"
                                                        name="datePicker"
                                                        id="datePicker"
                                                        format="dd/MM/yyyy"
                                                        placeholder={
                                                            selectedDate
                                                        }
                                                        className="border-0 outline-none bg-transparent"
                                                        value={selectedDate}
                                                        onChange={(e) => {
                                                            const enteredDate =
                                                                e.target.value;
                                                            if (
                                                                enteredDate.match(
                                                                    /^\d{4}-\d{2}-\d{2}$/
                                                                )
                                                            ) {
                                                                setSelectedDate(
                                                                    enteredDate
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        {/* Priority Buttons */}
                                        <Row className="m-2 ">
                                            <Col
                                                className="col-sm-3 col-md-3 col-lg-3 d-flex  p-1 justify-content-center  "
                                                xs={12}
                                            >
                                                <div className=" fw-bold ">
                                                    Priority:{" "}
                                                </div>
                                            </Col>
                                            <Col
                                                className="col-sm-3 col-md-3 col-lg-3 d-flex  p-1 justify-content-center"
                                                xs={12}
                                            >
                                                <Input
                                                    id="low"
                                                    className="mr-1"
                                                    type="radio"
                                                    name="priority"
                                                    value="low"
                                                    // Add onChange handler to handle the selected priority
                                                    onChange={(e) =>
                                                        handlePriorityChange(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Label check for="low">
                                                    Low
                                                </Label>
                                            </Col>
                                            <Col
                                                className="col-sm-3 col-md-3 col-lg-3 d-flex  p-1 justify-content-center"
                                                xs={12}
                                            >
                                                <Input
                                                    id="mild"
                                                    type="radio"
                                                    name="priority"
                                                    value="mild"
                                                    onChange={(e) =>
                                                        handlePriorityChange(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Label check for="mild">
                                                    Mild
                                                </Label>
                                            </Col>
                                            <Col
                                                className="col-sm-3 col-md-3 col-lg-3 d-flex  p-1 justify-content-center"
                                                xs={12}
                                            >
                                                <Input
                                                    id="high"
                                                    type="radio"
                                                    name="priority"
                                                    value="high"
                                                    onChange={(e) =>
                                                        handlePriorityChange(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Label check for="high">
                                                    High
                                                </Label>
                                            </Col>
                                        </Row>

                                        {/* Tag Buttons */}
                                        <Row className="m-2">
                                            <Col
                                                className="col-sm-3 col-md-3 col-lg-3 d-flex p-1 justify-content-center "
                                                xs={12}
                                            >
                                                <div className=" fw-bold ">
                                                    Tag:{" "}
                                                </div>
                                            </Col>
                                            <Col
                                                className="col-sm-8  col-md-8 col-lg-8 d-flex  p-1 justify-content-center "
                                                xs={12}
                                            >
                                                <div className="tagWrapper">
                                                    <input
                                                        type="text"
                                                        name="tagTask"
                                                        id="tagTask"
                                                        value={tag}
                                                        placeholder="#tags"
                                                        className="border-0 outline-none bg-transparent"
                                                        onChange={(e) => {
                                                            setTag(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Prompt;
