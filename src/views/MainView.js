import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Prompt from "../components/Section1/Prompt";
import Task from "../components/Section2/Task";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.scss";
import {
    Button,
    Container,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import { useEffect, useState, useRef } from "react";

const AdminView = (props) => {
    // State to manage tasks
    const [tasks, setTasks] = useState([]);
    // State to manage selected task
    const [selectedTask, setSelectedTask] = useState(null);

    // Function to add a new task
    const addTask = (taskText) => {
        // Create a new task object
        const newTask = {
            id: Date.now(), // Unique ID (using timestamp)
            text: taskText,
        };

        // Update the tasks state
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };
    const [modalDelete, setModalDelete] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const toggleDeleteModal = () => setModalDelete(!modalDelete);
    const toggleEditModal = () => setModalEdit(!modalEdit);

    const deleteTask = () => {
        console.log("you clicked the tick button");
        if (selectedTask) {
            const updatedTasks = tasks.filter(
                (task) => task.id !== selectedTask.id
            );
            setTasks(updatedTasks);
            setSelectedTask(null); // Reset selected task after deletion
        }
        toggleDeleteModal(); // Close the modal after deletion
    };

    const inputRef = useRef(null);
    useEffect(() => {
        if (modalEdit) {
            const input = document.getElementById("editInput");
            if (input) {
                input.focus();
                input.select();
            }
        }
    }, [modalEdit]);

    const updateTask = () => {
        if (!selectedTask || selectedTask.text.trim() === "") {
            // Throw an error or display a message here
            console.error("Task text cannot be empty!");
            return;
        }

        const updatedTasks = tasks.map((task) =>
            task.id === selectedTask.id
                ? { ...task, text: selectedTask.text }
                : task
        );

        setTasks(updatedTasks);
        toggleEditModal(); // Close the modal after updating
    };

    return (
        <>
            <Container
                fluid
                className=" min-vh-100 d-flex flex-column align-items-center justify-content-start justify-content-md-center   "
            >
                <Prompt onAddTask={addTask} />

                <Task
                    tasks={tasks}
                    toggleDelete={toggleDeleteModal}
                    toggleEdit={toggleEditModal}
                    setSelectedTask={setSelectedTask}
                />

                <Modal isOpen={modalDelete} toggle={toggleDeleteModal}>
                    <ModalHeader toggle={toggleDeleteModal}>
                        Deletion Confirmation
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this task?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={toggleDeleteModal}>
                            <FontAwesomeIcon icon={faXmark} />
                        </Button>{" "}
                        <Button onClick={deleteTask}>
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                    </ModalFooter>
                </Modal>

                {/* //edit modal */}

                <Modal isOpen={modalEdit} toggle={toggleEditModal}>
                    <ModalHeader toggle={toggleEditModal}>
                        Edit Task
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            id="editInput"
                            type="text"
                            value={selectedTask ? selectedTask.text : ""}
                            onChange={(e) =>
                                setSelectedTask({
                                    ...selectedTask,
                                    text: e.target.value,
                                })
                            }
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    updateTask();
                                }
                            }}
                            innerRef={inputRef}
                            required
                            style={{
                                borderColor:
                                    selectedTask &&
                                    selectedTask.text.trim() === ""
                                        ? "red"
                                        : "",
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={toggleEditModal}>
                            <FontAwesomeIcon
                                icon={faXmark}
                                onClick={toggleEditModal}
                            />
                        </Button>{" "}
                        <Button>
                            <FontAwesomeIcon
                                icon={faCheck}
                                onClick={updateTask}
                            />
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </>
    );
};

export default AdminView;
