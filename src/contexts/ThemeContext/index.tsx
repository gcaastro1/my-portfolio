"use client"

import React, { useEffect, useState } from "react";
import { ThemeContextProps, ThemeProviderProps } from "./props";

export const initialThemeState = {
    theme: "light",
};

const ThemeContext = React.createContext({theme: 'light'} as ThemeContextProps);

const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState(initialThemeState.theme)

    useEffect(() => {
        const savedTheme = localStorage.getItem('@Theme')
        if (savedTheme) setTheme(savedTheme)
    }, [])

    useEffect(() => {
        localStorage.setItem('@Theme', theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div className={`${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )

}

export {ThemeProvider, ThemeContext}