import { ThemeProvider, createTheme } from '@mui/material'
import colors, { blueGrey, grey, purple } from '@mui/material/colors'
import React from 'react'
const theme = createTheme({
    palette: {
        primary: {
            main: grey[700]
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