import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import { api } from "../../config/axios";
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactNotifications, Store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate()

  const validateName = (name) => name.match(/^[A-Za-z\s]{1,50}$/);
  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validatePassword = (password) =>
    password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);

  const isNameInvalid = name !== "" && !validateName(name);
  const isEmailInvalid = email !== "" && !validateEmail(email);
  const isPasswordInvalid = password !== "" && !validatePassword(password);
  const isConfirmPasswordInvalid =
    confirmPassword !== "" && confirmPassword !== password;
    async function handleRegister() {
      try {
        const registerResponse = await api.post(
          "/api/v1/registre",
          {
            name: name,
            email: email,
            password: password,
          },
        );
    
        if (registerResponse.status >= 200 && registerResponse.status < 300) {
          showNotification('Registration Successful!', 'success');
          navigate('/login');
        } else {
          showNotification('An error occurred during registration. Please try again.', 'danger');
          navigate('/register');
        }
      } catch (error) {
          showNotification('An error occurred during registration. Please try again.', 'danger');
        navigate('/register');
      }
    }
    const showNotification = (message, type) => {
      Store.addNotification({
        title: "Oops!",
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    };
  return ( <>
  <ReactNotifications/>
    <div className="w-screen flex flex-col items-center justify-center">
      <Card className="lg:w-1/3 my-2 md:my-7">
        <CardHeader className="flex  justify-center">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">QuizMinds</p>
          </div>
        </CardHeader>
        <Divider />
          <form >
        <CardBody className="flex flex-col gap-4 p-6">
            <Input isRequired
              type="text"
              label="Full name"
              isInvalid={isNameInvalid}
              color={isNameInvalid ? "danger" : ""}
              errorMessage={isNameInvalid && "Please enter a valid nom"}
              onValueChange={setName}
              size="sm"
            />
            <Input isRequired
              type="email"
              isInvalid={isEmailInvalid}
              color={isEmailInvalid ? "danger" : ""}
              errorMessage={isEmailInvalid && "Please enter a valid email"}
              onValueChange={setEmail}
              label="Email"
              size="sm"
            />
            <Input isRequired
              type="password"
              isInvalid={isPasswordInvalid}
              color={isPasswordInvalid ? "danger" : ""}
              errorMessage={
                isPasswordInvalid &&
                "The password should be 8 characters containing: \n uppercase, lowercase and numbers"
              }
              onValueChange={setPassword}
              label="Password"
              size="sm"
            />
            <Input isRequired
              type="password"
              isInvalid={isConfirmPasswordInvalid}
              color={isConfirmPasswordInvalid ? "danger" : ""}
              errorMessage={
                isConfirmPasswordInvalid && "Passwords does not match!"
              }
              onValueChange={setConfirmPassword}
              label="Confirm password"
              size="sm"
            />
            <Button color="primary" onClick={handleRegister}>
              Register
            </Button>
          <p className="text-center">
            Already have an account
            <NavLink to="/login" className="ml-1 text-blue-600">
              login now !
            </NavLink>
          </p>
        </CardBody>
          </form>
      </Card>
    </div></>
  );
};
export default RegisterPage;
