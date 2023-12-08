import React, { useState } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const formatDate = (indate) => {
    const date = new Date(indate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
const TodoListUpdate = () => {
    const [task, setTask] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [mainTask, setMainTask] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const cross = () => setModal(false);
    const toggle = (i) => {
        setModal(true);
        setModalMessage("Are You Sure to Delete the Task?");
        setDeleteIndex(i);
    };
    const deleteHandler = () => {
        if (deleteIndex !== null) {
            const copyTask = [...mainTask];
            copyTask.splice(deleteIndex, 1);
            setMainTask(copyTask);
        }
        setModal(false);
        setDeleteIndex(null);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        setTask("");
        setDesc("");
        setDate("");
        if (editIndex !== null) {
            const copyTask = [...mainTask];
            copyTask[editIndex] = { task, desc, date };
            setMainTask(copyTask);
            setEditIndex(null);
        } else {
            setMainTask((prevMainTask) => {
                const newTask = { task, desc, date };
                const updatedTaskList = [newTask, ...prevMainTask].sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                );
                return updatedTaskList;
            });
        }
    };
    const editHandler = (i) => {
        const taskToEdit = mainTask[i];
        setTask(taskToEdit.task);
        setDesc(taskToEdit.desc);
        setDate(taskToEdit.date);
        setEditIndex(i);
    };
    const completeHandler = (i) => {
        const copyTask = [...mainTask];
        copyTask[i].completed = true;
        setMainTask(copyTask);
    };
    const renderTask =
        mainTask.length > 0 ? (
            mainTask.map((t, i) => (
                <Container
                    fluid
                    className="my-2 shadow rounded-2"
                    key={i}
                    id="outpt-container"
                >
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row
                                        className={` ${
                                            t.completed
                                                ? "text-decoration-line-through text-secondary"
                                                : ""
                                        }`}
                                    >
                                        <Col
                                            className={` ${
                                                t.completed
                                                    ? "text-primary"
                                                    : ""
                                            }`}
                                        >
                                            <p className="text-success fw-bold">
                                                {t.task}
                                            </p>
                                            <p className="text-secondary">
                                                {t.desc}
                                            </p>
                                            <p className="text-danger">
                                                {formatDate(t.date)}
                                            </p>
                                        </Col>
                                        <Col
                                            className={`d-md-flex flex-md-column d-lg-block d-lg-inline  ${
                                                t.completed
                                                    ? "text-primary fw-bold display-6 "
                                                    : "text-warning fw-bold display-6"
                                            }`}
                                        >
                                            <Button
                                                className={`btn border-success ml-auto border-3 rounded-5 bg-white mx-1 my-1 text-success fw-semibold ${
                                                    t.completed ? "d-none" : ""
                                                }`}
                                                onClick={() =>
                                                    completeHandler(i)
                                                }
                                                disabled={
                                                    t.completed ||
                                                    new Date(t.date) <
                                                        new Date().setHours(
                                                            0,
                                                            0,
                                                            0,
                                                            0
                                                        )
                                                }
                                            >
                                                Complete
                                            </Button>
                                            <Button
                                                onClick={() => editHandler(i)}
                                                className={`btn border-warning border-3 rounded-5 bg-white mx-1 my-1 text-warning fw-semibold ${
                                                    t.completed ? "d-none" : ""
                                                }`}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => toggle(i)}
                                                className="btn border-danger border-3 rounded-5 bg-white mx-1 my-1 text-danger fw-semibold"
                                            >
                                                Delete
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            ))
        ) : (
            <h4 className="mt-4 mb-2 mx-5 shadow">Add Your Plans here...</h4>
        );
    return (
        <Container fluid className=" vh-100" id="full-container">
            <Row>
                <Col>
                    <h1 className="text-center m-4 text-warning fw-bold ">
                        My To Do List
                    </h1>
                    <Container>
                        <Row>
                            <Col>
                                <Card className=" mt-5" id="input-container">
                                    <Form onSubmit={submitHandler}>
                                        <CardBody>
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label className="text-white fw-bold">
                                                            Task:
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter the task..."
                                                            required
                                                            value={task}
                                                            onChange={(e) =>
                                                                setTask(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label className="text-white fw-bold">
                                                            Description:
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter task description..."
                                                            required
                                                            value={desc}
                                                            onChange={(e) =>
                                                                setDesc(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label className="text-white fw-bold">
                                                            Date:
                                                        </Label>
                                                        <Input
                                                            type="date"
                                                            placeholder="Enter Date..."
                                                            required
                                                            value={date}
                                                            onChange={(e) =>
                                                                setDate(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Button
                                                            className="button border-1 border-white fw-bold"
                                                            color="info"
                                                            type="submit"
                                                        >
                                                            Submit
                                                        </Button>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <ul>{renderTask}</ul>
                                        <Modal isOpen={modal} toggle={toggle}>
                                            <ModalHeader toggle={cross}>
                                                Please Confirm again before
                                                press OK!
                                            </ModalHeader>
                                            <ModalBody>
                                                <p>{modalMessage}</p>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button
                                                    color="primary"
                                                    onClick={deleteHandler}
                                                >
                                                    Okay
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
export default TodoListUpdate;
