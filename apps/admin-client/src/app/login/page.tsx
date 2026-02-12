import { Box, Paper } from "@mui/material";
import { LOGIN_BOX_WIDTH, styles } from "./page.styles";
import { LoginForm } from "@/components/login-form/login-form";

export default function LoginPage() {
  return (
    <Box sx={styles.page}>
      <Paper sx={{ p: 4, maxWidth: LOGIN_BOX_WIDTH, width: "100%" }}>
        <LoginForm />
      </Paper>
    </Box>
  );
}
