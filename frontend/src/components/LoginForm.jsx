import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../data/users";
import { useAuth } from "../context/AuthContext";

import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
  Paper,
} from "@mantine/core";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (!email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your password.");
      return;
    }

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!matchedUser) {
      setErrorMessage("Invalid credentials.");
      return;
    }

    setErrorMessage("");

    setUser(matchedUser);

    navigate("/dashboard");
  };

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder>
      <Stack>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          data-testid="login-email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          data-testid="login-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && (
          <Alert color="red" data-testid="login-error">
            {errorMessage}
          </Alert>
        )}

        <Button fullWidth data-testid="login-submit" onClick={handleLogin}>
          Login
        </Button>
      </Stack>
    </Paper>
  );
}
