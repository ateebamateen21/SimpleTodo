import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faTrashCan,
    faXmark,
    faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/style.scss";
import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    Collapse,
    Container,
    Input,
    Label,
    Row,
} from "reactstrap";

const Task = ({
    tasks,
    setSelectedTask,
    toggleEdit,
    toggleDelete,
    defaultSelectedValues,
    selectedDate,
    setSelectedDate,
    priority,
    setPriority,
    handlePriorityChange,
    tag,
}) => {
    // Use an array to maintain separate isOpen state for each task
    const [isOpenArray, setIsOpenArray] = useState(
        Array(tasks.length).fill(false)
    );

    // Function to toggle the collapse for a specific task
    const toggle = (index) => {
        setIsOpenArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = !newArray[index];
            return newArray;
        });
    };

    //For displaying edit button if task change is detected.
    const hasChanges = (task, index) => {
        return (
            task.text !== defaultSelectedValues[index].text ||
            task.selectedDate !== selectedDate ||
            task.priority !== priority ||
            task.tag !== tag
        );
    };

    return (
        <>
            <Container fluid className="my-3 task">
                <Row className="justify-content-center align-items-start ">
                    <Col className="col-12 col-sm-6 col-md-6 col-lg-6  p-0">
                        {tasks.map((task, index) => (
                            <Card
                                className="TaskCard p-md-4 p-sm-3 py-3 my-3"
                                key={task.id}
                            >
                                <Row className="mx-0 my-2 taskItem ">
                                    <Col
                                        className="col-10 rounded"
                                        id="taskCol"
                                    >
                                        <div className="text-center">
                                            {task.text}
                                        </div>
                                    </Col>
                                    <Col className="d-flex justify-content-end  col-2 rounded ">
                                        <div
                                            id="taskCollapse"
                                            className="px-2 rounded"
                                            onClick={() => toggle(index)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCaretDown}
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                {/* Dropdown Options */}
                                <Collapse isOpen={isOpenArray[index]}>
                                    {/* Date Seelected */}
                                    <Row className="m-2">
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
                                                    id="datePicker"
                                                    name="datePicker"
                                                    format="dd/MM/yyyy"
                                                    value={task.selectedDate || ""}
                                                    className="border-0 outline-none bg-transparent"
                                                    onChange={(e) =>
                                                        setSelectedDate(
                                                            e.target.value
                                                        )}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* PRIORITY OF TASKS */}
                                    <Row className="m-2">
                                        <Col
                                            className="col-sm-3 col-md-3 col-lg-3 d-flex  p-1 justify-content-center  "
                                            xs={12}
                                        >
                                            <div className=" fw-bold ">
                                                Priority:{" "}
                                            </div>
                                        </Col>
                                        <Col
                                            className="col-sm-3 col-md-3 col-lg-3 d-flex p-1 justify-content-center"
                                            xs={12}
                                        >
                                            <Input
                                                id="low"
                                                className="mr-1"
                                                type="radio"
                                                name="priority"
                                                defaultValue={"low"}
                                                //deafult checked if the task was created with this priority
                                                checked={
                                                    task.priority === "low"
                                                }
                                                // onChange={(e) =>
                                                //     handlePriorityChange(
                                                //         e.target.value
                                                //     )
                                                // }
                                            />
                                            <Label check for="low">
                                                Low
                                            </Label>
                                        </Col>

                                        <Col
                                            className="col-sm-3 col-md-3 col-lg-3 d-flex p-1 justify-content-center"
                                            xs={12}
                                        >
                                            <Input
                                                id="mild"
                                                className="mr-1"
                                                type="radio"
                                                name="priority"
                                                defaultValue="mild"
                                                // Check if the priority matches this radio button's value
                                                checked={
                                                    task.priority === "mild"
                                                }
                                                // onChange={(e) =>
                                                //     handlePriorityChange(
                                                //         e.target.value
                                                //     )
                                                // }
                                            />
                                            <Label check for="moderate">
                                                Mild
                                            </Label>
                                        </Col>

                                        <Col
                                            className="col-sm-3 col-md-3 col-lg-3 d-flex p-1 justify-content-center"
                                            xs={12}
                                        >
                                            <Input
                                                id="high"
                                                className="mr-1"
                                                type="radio"
                                                name="priority"
                                                defaultValue="high"
                                                // Check if the priority matches this radio button's value
                                                checked={
                                                    task.priority === "high"
                                                }
                                                // onChange={(e) =>
                                                //     handlePriorityChange(
                                                //         e.target.value
                                                //     )
                                                // }
                                            />
                                            <Label check for="high">
                                                High
                                            </Label>
                                        </Col>
                                    </Row>
                                    {/* TAGS OF TASKS */}
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
                                                    placeholder="#tags"
                                                    value={task.tag}
                                                    className="border-0 outline-none bg-transparent"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Collapse>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Task;
