import { Autocomplete, List, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TaskCard from "components/TaskCard";
import { useState } from "react";
import useStore from "store/store";

export default function BasicList() {
    const tasks = useStore((state) => state.tasks);
    const [filter, setFilter] = useState("");
    const [completionFilter, setCompletionFilter] = useState<number>(2);

    const options = tasks.filter((task) => task.name);

    let filteredTasks = filter.length
        ? options.filter((task) =>
              task.name.toLowerCase().includes(filter.toLowerCase())
          )
        : options;

    if (completionFilter !== 2) {
        filteredTasks = filteredTasks.filter(
            (task) => task.completed === !!completionFilter
        );
    }

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "360",
                backgroundColor: "background.paper",
                paddingTop: "16px",
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
            >
                <Autocomplete
                    freeSolo
                    id="search"
                    disableClearable
                    sx={{
                        flexGrow: 1,
                    }}
                    options={options.map((option) => option.name)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Task"
                            InputProps={{
                                ...params.InputProps,
                                type: "search",
                            }}
                        />
                    )}
                    onInputChange={(event, newInputValue, reason) => {
                        if (reason === "reset") {
                            setFilter("");
                            return;
                        } else {
                            setFilter(newInputValue);
                        }
                    }}
                    onChange={(event, newValue) => {
                        setFilter(newValue);
                    }}
                />
                <FormControl sx={{ width: "110px" }}>
                    <InputLabel id="demo-simple-select-label">
                        Filter
                    </InputLabel>
                    <Select
                        value={completionFilter}
                        label="Status"
                        onChange={(event) =>
                            setCompletionFilter(event.target.value as number)
                        }
                    >
                        <MenuItem value={0}>Done</MenuItem>
                        <MenuItem value={1}>Pending</MenuItem>
                        <MenuItem value={2}>None</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <List>
                {filteredTasks.map((task, i) => (
                    <ListItem
                        disablePadding
                        key={i}
                        sx={{ paddingBottom: "24px" }}
                    >
                        <TaskCard task={task} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
