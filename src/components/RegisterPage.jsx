import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Input,
  Link,
} from "@nextui-org/react";
import { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateName = (name) => name.match(/^[A-Za-z\s]{1,50}$/);
  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validatePassword = (password) =>
    password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
    );

  const isNameInvalid = name !== "" && !validateName(name);
  const isEmailInvalid = email !== "" && !validateEmail(email);
  const isPasswordInvalid = password !== "" && !validatePassword(password);
  const isConfirmPasswordInvalid =
    confirmPassword !== "" && confirmPassword !== password;

  return (
    <div className="w-screen flex flex-col items-center">
      <Card className="lg:w-1/3 my-2">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">QuizMinds</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4 p-6">
          <Input
            type="text"
            label="Full name"
            isInvalid={isNameInvalid}
            color={isNameInvalid ? "danger" : ""}
            errorMessage={isNameInvalid && "Please enter a valid nom"}
            onValueChange={setName}
            size="sm"
          />
          <Input
            type="email"
            isInvalid={isEmailInvalid}
            color={isEmailInvalid ? "danger" : ""}
            errorMessage={isEmailInvalid && "Please enter a valid email"}
            onValueChange={setEmail}
            label="Email"
            size="sm"
          />
          <Input
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
          <Input
            type="password"
            isInvalid={isConfirmPasswordInvalid}
            color={isConfirmPasswordInvalid ? "danger" : ""}
            errorMessage={isConfirmPasswordInvalid && "Passwords does not match!"}
            onValueChange={setConfirmPassword}
            label="Confirm password"
            size="sm"
          />
          <Button color="primary">Register</Button>
          <p className="text-center">
            Already have an account
            <Link href="/login" className="ml-1">
              login now !
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
export default RegisterPage;
