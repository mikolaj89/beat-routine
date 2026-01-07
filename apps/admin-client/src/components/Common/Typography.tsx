import { FormHelperText, styled } from "@mui/material";
import theme from "../layout/theme";

export const ErrorMessage = styled(FormHelperText)({
  color: theme.palette.error.dark,
});

export const FormError = styled(FormHelperText)({
  fontSize: 14
});

