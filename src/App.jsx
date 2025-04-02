import "./App.css";
import TodoCard from "./components/TodoCard/TodoCard";
import { ThemeProvider } from "./ThemeContext/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <TodoCard />
    </ThemeProvider>
  );
}

export default App;
