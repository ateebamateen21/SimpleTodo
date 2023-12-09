import { React, useState } from "react";
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

// 
const AdminView = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    //parameters with the task being added
    const [selectedDate, setSelectedDate] = useState("");

    // setSelectedDate(selectedDate)

    //State for priority in your component
    const [priority, setPriority] = useState("");

    // Function to handle priority changes
    const handlePriorityChange = (priority) => {
        setPriority(priority);
    };

    const [tag, setTag] = useState("");


    // Get states from this component
    // 
        const addTask = (taskText) => {
        // Create a new task object with additional properties
        const newTask = {
            id: Date.now(),
            text: taskText,
            tag: tag,
            selectedDate: selectedDate,
            priority: priority,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTag("");
        setSelectedDate("");
        setPriority("");
        // console.log(newTask); //see the recently added task
    };

    console.log(tasks)

    // console.log(tasks) // see the array of tasks

    // Update the tasks state

    //Code for the modals of the tasks.
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
                <Prompt
                    addTask={addTask}
                    // parameters for the task being added
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    priority={priority}
                    setPriority={setPriority}
                    handlePriorityChange={handlePriorityChange}
                    tag={tag}
                    setTag={setTag}
                />

                <Task
                    tasks={tasks}
                    toggleDelete={toggleDeleteModal}
                    toggleEdit={toggleEditModal}
                    setSelectedTask={setSelectedTask}
                    selectedDate={selectedDate} // Pass selectedDate here
                    setSelectedDate={setSelectedDate}
                    priority={priority}
                    setPriority={setPriority}
                    handlePriorityChange={handlePriorityChange}
                    tag={tag}
                    setTag={setTag}
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
