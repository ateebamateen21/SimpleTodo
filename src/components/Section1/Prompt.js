import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/style.scss";
import { faPlus, faCalendar } from "@fortawesome/free-solid-svg-icons";
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

const Prompt = ({ onAddTask, selectedDate, setSelectedDate, priority, handlePriorityChange, setTag}) => {
    const [taskText, setTaskText] = useState("");

    const addTask = () => {
        if (taskText.trim() !== "") {
            onAddTask(taskText);
            setIsOpen(false);
            setTaskText("");
           
        }
    };

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
                                            onChange={(e) =>
                                                setTaskText(e.target.value)
                                            }
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    addTask();
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
                                                    // alert(
                                                    //     "Please enter a task"
                                                    // );
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
                                                className="col-sm-3 col-md-3 col-lg-3 "
                                                xs={12}
                                            >
                                                <div className=" fw-bold ">
                                                    Date:{" "}
                                                </div>
                                            </Col>
                                            <Col
                                                className="col-sm-9 col-md-9 col-lg-9 "
                                                xs={12}
                                            >
                                                <DatePicker
                                                    id="datePicker"
                                                    selected={selectedDate}
                                                    onChange={(date) =>
                                                        setSelectedDate(date)
                                                    }
                                                    placeholderText="Select a due date"
                                                    className="border-0 outline-none" // Add these classes
                                                    color="#6c757d"
                                                    customInput={
                                                        <input
                                                            type="text"
                                                            value={
                                                                selectedDate
                                                                    ? selectedDate.toLocaleDateString()
                                                                    : ""
                                                            }
                                                            readOnly
                                                            className="border-0 outline-none rounded bg-transparent"
                                                        />
                                                    }
                                                />
                                                <FontAwesomeIcon
                                                    icon={faCalendar}
                                                    className=" clickable"
                                                    color="#6c757d"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                "datePicker"
                                                            )
                                                            .click()
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                        {/* Priority Buttons */}
                                        <Row className="m-2 ">
                                            <Col
                                                className="col-sm-4 col-md-4 col-lg-4 d-flex p-1"
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
                                                className="col-sm-4 col-md-4 col-lg-4 d-flex p-1"
                                                xs={12}
                                            >
                                                <Input
                                                    id="medium"
                                                    type="radio"
                                                    name="priority"
                                                    value="moderate"
                                                    onChange={(e) =>
                                                        handlePriorityChange(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Label check for="medium">
                                                    Medium
                                                </Label>
                                            </Col>

                                            <Col
                                                className="col-sm-4 col-md-4 col-lg-4 d-flex p-1"
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
