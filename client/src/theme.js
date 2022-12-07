import { createTheme } from "@mui/material";

export const theme = createTheme({

    typography: {
        h3: {
            color: '#7d4218',
            paddingBottom: '10px'
        },
        h4: {
            color: '#7d4218',
            paddingTop: '5px',
            paddingBottom: '2px',
        },
        h5: {
            color: '#7d4218',
            paddingTop: '5px',
            paddingBottom: '2px',

        },
        h6: {
            color: '#7d4218',
            paddingBottom: '2px',
        },
        subtitle: {
            lineHeight: 1.5,
            color: '#914d1c'
        },
        subtitle2: {
            lineHeight: 1.5,
            color: '#914d1c'
        }
    },
    palette: {
        primary: {
            main: "#083d77",
            light: '#FAFAFA'
        },
        secondary: {
            main: "#083d77"
        }
    }
})