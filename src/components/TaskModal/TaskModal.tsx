import { Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import useStore, { ITask } from "store/store";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "min(400px, calc(100% - 32px))",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    p: 4,
};

const emptyTask: ITask = {
    name: "",
    id: 0,
    description: "",
    completed: false,
};

export default function BasicModal() {
    const editingTask = useStore((state) => state.editingTask);
    const setEditingTask = useStore((state) => state.setEditingTask);
    const updateTask = useStore((state) => state.updateTask);

    const open = !!editingTask;
    const handleOpen = () =>
        setEditingTask({
            ...emptyTask,
        });

    const [task, setTask] = useState(editingTask || { ...emptyTask });
    const addNewTask = useStore((state) => state.addTask);
    const setEditing = useStore((state) => state.setEditingTask);

    const handleAdd = () => {
        if (editingTask) {
            editingTask.id > 0
                ? updateTask(editingTask)
                : addNewTask(editingTask.name, editingTask.description);
            setEditing(null);
        }
        handleClose();
    };

    const handleClose = () => {
        setEditingTask(null);
        setTask({
            ...emptyTask,
        });
    };

    return (
        <div>
            <Stack spacing={2} direction="row" justifyContent="space-between">
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Tasks
                </Typography>
                <Button variant="contained" onClick={handleOpen}>
                    New Task
                </Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                    >
                        {editingTask && editingTask.id > 0
                            ? "Edit Task"
                            : "New Task"}
                    </Typography>

                    <TextField
                        id="standard-basic"
                        label="Title"
                        variant="standard"
                        value={editingTask ? editingTask.name : task.name}
                        onChange={(e) =>
                            editingTask
                                ? setEditingTask({
                                      ...editingTask,
                                      name: e.target.value,
                                  })
                                : setTask({
                                      ...task,
                                      name: e.target.value,
                                  })
                        }
                    />
                    <TextField
                        id="standard-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        variant="standard"
                        value={
                            editingTask
                                ? editingTask.description
                                : task.description
                        }
                        onChange={(e) =>
                            editingTask
                                ? setEditingTask({
                                      ...editingTask,
                                      description: e.target.value,
                                  })
                                : setTask({
                                      ...task,
                                      description: e.target.value,
                                  })
                        }
                    />
                    <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="flex-end"
                    >
                        <Button variant="text" onClick={handleClose}>
                            Discard
                        </Button>
                        <Button variant="contained" onClick={handleAdd}>
                            Save
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
