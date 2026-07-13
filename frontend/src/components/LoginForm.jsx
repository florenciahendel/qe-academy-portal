import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
  Paper,
} from "@mantine/core";

import { useAuth } from "../context/AuthContext";

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

    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.detail);
          });
        }

        return response.json();
      })
      .then((userData) => {
        setErrorMessage("");

        setUser({
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          role: userData.role,
          status: userData.status,
        });

        navigate("/dashboard");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <Paper
      shadow="sm"
      p="xl"
      radius="md"
      withBorder
    >
      <Stack>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          data-testid="login-email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          data-testid="login-password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {errorMessage && (
          <Alert
            color="red"
            data-testid="login-error"
          >
            {errorMessage}
          </Alert>
        )}

        <Button
          fullWidth
          data-testid="login-submit"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Stack>
    </Paper>
  );
}