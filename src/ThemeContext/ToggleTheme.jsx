import { useContext } from "react";
import { ThemeContext } from "./CreateContext";
import "./style.css";

const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const settingTheme = (theme) => {
    return theme === "light" ? "dark" : "light";
  };

  return (
    <button
      onClick={() => setTheme(settingTheme(theme))}
      className="light-dark-icon"
    >
      {theme === "light" ? (
        <img src="./icon-moon.svg" alt="dark-mode-icon" />
      ) : (
        <img src="./icon-sun.svg" alt="light-mode-icon" />
      )}
    </button>
  );
};

export default ToggleTheme;
