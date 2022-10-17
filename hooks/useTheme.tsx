import React from "react";
import { light } from "../constants";

export const ThemeContext = React.createContext({
    theme: light
});

export default function useTheme() {
    const { theme } = React.useContext(ThemeContext);
    return theme;
}