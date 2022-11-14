import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { forgotPassword, googleAuth, signIn } from "../../auth/firebase";
import GoogleIcon from "@mui/icons-material/Google";

const theme = createTheme();

export default function ForgotPassword() {
  /*   const auth = getAuth(app); */
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    forgotPassword(input);
    setInput("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            component="h2"
            align="left"
            color="#11263c"
            mb={1}
          >
            Forgot Password?
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
            Send E-Mail
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
