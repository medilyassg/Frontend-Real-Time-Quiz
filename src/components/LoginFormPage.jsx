import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  CardFooter,
  Link,
  Input,
  Button,
} from "@nextui-org/react";
import { useState, useMemo } from "react";
import { api } from "../../config/axios";
import { NavLink, useNavigate } from 'react-router-dom';
export default function LoginFormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const validatePassword = (password) =>
    password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/
    );

  const isPasswordInvalid = useMemo(() => {
    if (password === "") return false;

    return validatePassword(password) ? false : true;
  }, [password]);
  async function handleLogin() {
    try {
      const csrf = await api.get("/sanctum/csrf-cookie");
      const login = await api.post("/api/v1/auth/login", {
        email: email,
        password: password,
      });
  
      const user = await api.get("/api/v1/user");
  
      if (user.status >= 200 && user.status < 300) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      navigate("/login")
    }
  }

  return (
    <div className="w-screen flex flex-col items-center">
      <Card className="lg:w-1/3 my-7">
        <CardHeader className="flex  justify-center">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">QuizMinds</p>
          </div>
        </CardHeader>
        <Divider />
          <CardBody className="flex flex-col gap-5 p-6">
            <Input
              isRequired
              type="email"
              label="Email"
              size="sm"
              isInvalid={isInvalid}
              color={isInvalid ? "danger" : ""}
              errorMessage={isInvalid && "Please enter a valid email"}
              onValueChange={setEmail}
            />
            <Input
              isRequired
              isInvalid={isPasswordInvalid}
              color={isPasswordInvalid ? "danger" : ""}
              errorMessage={
                isPasswordInvalid &&
                "The password should be 8 characters containing: \n uppercase, lowercase, special character and numbers"
              }
              onValueChange={setPassword}
              type="password"
              label="Password"
              size="sm" 
            />
            <Button color="primary" onClick={handleLogin}>
              Login
            </Button>
          </CardBody>
        <Divider />
        <CardFooter className="flex justify-center">
          Don't have an account
          <NavLink to="/register" className="ml-1 text-blue-600">
            register now !
          </NavLink>
        </CardFooter>
      </Card>
    </div>
  );
}
