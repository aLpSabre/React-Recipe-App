import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { forgotPassword } from "../../auth/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
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
      <ToastContainer />
    </Container>
  );
}
