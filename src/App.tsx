import { styled } from "@mui/material";
import NavBar from "components/NavBar";
import TaskList from "components/TaskList";
import TaskModal from "components/TaskModal";
import "./App.css";
import "./reset.css";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Content>
                <TaskModal />
                <TaskList />
            </Content>
        </div>
    );
}

const Content = styled("div")({
    position: "relative",
    padding: "32px",
    maxWidth: "700px",
    margin: "auto",
});

export default App;
