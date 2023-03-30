import { CopyAll, Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, styled } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import useStore, { ITask } from "store/store";

export interface IProps {
    task: ITask;
}

const TaskMenu: React.FC<IProps> = ({ task }) => {
    const setEditing = useStore((state) => state.setEditingTask);
    const deleteTask = useStore((state) => state.deleteTask);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setEditing(task);
        handleClose();
    };

    const handleDelete = () => {
        deleteTask(task.id);
        handleClose();
    };

    const handleDuplicate = () => {
        setEditing({
            ...task,
            id: 0,
        });
        handleClose();
    };

    const ITEM_HEIGHT = 48;
    return (
        <Wrapper>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                    },
                }}
            >
                <MenuItemWrapper onClick={handleEdit}>
                    <EditIcon />
                    Edit
                </MenuItemWrapper>
                <MenuItemWrapper onClick={handleDuplicate} disableRipple>
                    <CopyAll />
                    Duplicate
                </MenuItemWrapper>
                <MenuItemWrapper onClick={handleDelete} disableRipple>
                    <Delete />
                    Delete
                </MenuItemWrapper>
            </Menu>
        </Wrapper>
    );
};

const Wrapper = styled("div")`
    flex-shrink: 0;
`;

const MenuItemWrapper = styled(MenuItem)`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export default TaskMenu;
