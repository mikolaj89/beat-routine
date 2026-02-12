import { createTheme } from "@mui/material/styles";

//color: theme.palette.primary.main,
const theme = createTheme({

  components : {
    MuiPaper: {
        defaultProps: {
            elevation: 3,
        },
    },
  },
  
  typography: {
    h1: {
      fontSize: "30px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    h2: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "15px",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
  },
});

export default theme;
