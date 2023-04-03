import { ThemeProvider, createTheme } from '@mui/material'
import colors, { blueGrey, grey, purple } from '@mui/material/colors'
import React from 'react'
const theme = createTheme({
    palette: {
        primary: {
            main: '#605dba'
        }
    }
})
const MaterialTheme = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default MaterialTheme