import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/style.scss";
import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Collapse,
    Container,
    Row,
} from "reactstrap";

const Task = ({
    tasks,
    toggleDelete,
    toggleEdit,
    setSelectedTask,
    selectedDate,
    setSelectedDate,
    priority,
    handlePriorityChange,
    setTag,
}) => {
    // Array to track the collapse state for each task
    const [isOpenArray, setIsOpenArray] = useState(
        Array(tasks.length).fill(false)
    );

    // Function to toggle the collapse for a specific task
    const toggleCollapse = (currentIndex) => {
        setIsOpenArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[currentIndex] = !newArray[currentIndex];
            return newArray;
        });
    };
    return (
        <>
            <Container fluid className="my-3 task">
                <Row className="justify-content-center align-items-start ">
                    <Col className="col-12 col-sm-6 col-md-6 col-lg-6  p-0">
                        <Card className="TaskCard p-md-4 p-sm-3 py-3 ">
                            <CardHeader className="mb-3">
                                <h4 className="text-center  outline-none rounded">
                                    Your Tasks
                                </h4>
                            </CardHeader>
                            {tasks.length === 0 ? (
                                <p className="text-center">
                                    No task added yet!
                                </p>
                            ) : (
                                tasks.map((task, currentIndex) => (
                                    <Row
                                        key={task.id}
                                        className="mx-0 my-2 taskItem "
                                        onClick={() =>
                                            toggleCollapse(currentIndex)
                                        }
                                    >
                                        <div>Current Date:</div>
                                        <Col
                                            className="col-8 rounded"
                                            id="taskCol"
                                        >
                                            <div className="text-center">
                                                {task.text}
                                            </div>
                                        </Col>
                                        <Col className="col-2">
                                            <div
                                                className="text-center "
                                                onClick={() => {
                                                    toggleEdit();
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPenToSquare}
                                                    onClick={() =>
                                                        setSelectedTask(task)
                                                    }
                                                />
                                            </div>
                                        </Col>
                                        <Col className="col-2">
                                            <div
                                                className="text-center  "
                                                onClick={() => {
                                                    toggleDelete();
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    onClick={() =>
                                                        setSelectedTask(task)
                                                    }
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                ))
                            )}

                            <Collapse
                                isOpen={isOpenArray[currentIndex]}
                                className="m-1"
                            >
                                <Card id="collapseCard">
                                    <CardBody className="p-2">
                                        <Row className=" m-2">
                                            <div>
                                                <label>Date:</label>
                                                <DatePicker
                                                    selected={selectedDate}
                                                   onChange={(date) =>
                                                        setSelectedDate(date)
                                                    }
                                                    dateFormat="dd/MM/yyyy"
                                                    // Other DatePicker props...
                                                />
                                            </div>
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

export default Task;
