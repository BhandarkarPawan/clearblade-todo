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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const setEditing = useStore((state) => state.setEditingTask);
    const deleteTask = useStore((state) => state.deleteTask);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                <MenuItemWrapper
                    onClick={() => {
                        setEditing(task);
                        handleClose();
                    }}
                >
                    <EditIcon />
                    Edit
                </MenuItemWrapper>
                <MenuItemWrapper
                    onClick={() => {
                        setEditing({
                            ...task,
                            id: 0,
                        });
                        handleClose();
                    }}
                    disableRipple
                >
                    <CopyAll />
                    Duplicate
                </MenuItemWrapper>
                <MenuItemWrapper
                    onClick={() => {
                        deleteTask(task.id);
                        handleClose();
                    }}
                    disableRipple
                >
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
