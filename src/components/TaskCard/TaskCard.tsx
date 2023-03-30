import { Checkbox, Stack, styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TaskMenu from "components/Menu/TaskMenu";
import React from "react";
import useStore, { ITask } from "store/store";

interface IProps {
    task: ITask;
}

const label = { inputProps: { "aria-label": "Completion Status" } };

const TaskCard: React.FC<IProps> = ({ task }) => {
    const toggleComplete = useStore((state) => state.toggleTask);
    const handleToggle = () => {
        toggleComplete(task.id);
    };

    return (
        <CardWrapper>
            {task.imgUrl && (
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={task.imgUrl}
                />
            )}
            <CardContent>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Checkbox
                        {...label}
                        sx={{ flexShrink: 0 }}
                        checked={task.completed}
                        onChange={handleToggle}
                    />
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1}
                        sx={{ flexGrow: 1, maxWidth: "calc(100% - 100px)" }}
                    >
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h4"
                            sx={{ width: "100%" }}
                        >
                            {task.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ width: "100%" }}
                        >
                            {task.description}
                        </Typography>
                    </Stack>
                    <TaskMenu task={task} />
                </Stack>
            </CardContent>
            <CardActions></CardActions>
        </CardWrapper>
    );
};

const CardWrapper = styled(Card)`
    max-width: 700px;
    width: 100%;
`;

export default TaskCard;
