import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/style.scss";
import React from "react";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";

const Task = ({ tasks, toggleDelete, toggleEdit, setSelectedTask }) => {
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
                                tasks.map((task) => (
                                    <Row
                                        key={task.id}
                                        className="mx-0 my-2 taskItem "
                                    >
                                        <Col className="col-8">
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
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Task;
