import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  CardFooter,
  Link,
  Image,
  Input,
  Button,
} from "@nextui-org/react";
import { useState, useMemo } from "react";
export default function LoginFormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const validatePassword = (password) =>
    password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);

  const isPasswordInvalid = useMemo(() => {
    if (password === "") return false;

    return validatePassword(password) ? false : true;
  }, [password]);

  return (
    <div className="w-screen flex flex-col items-center">
      <Card className="lg:w-1/3 my-7">
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
        <CardBody className="flex flex-col gap-5 p-6">
          <Input
            type="email"
            label="Email"
            size="sm"
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : ""}
            errorMessage={isInvalid && "Please enter a valid email"}
            onValueChange={setEmail}
          />
          <Input
            isInvalid={isPasswordInvalid}
            color={isPasswordInvalid ? "danger" : ""}
            errorMessage={isPasswordInvalid && "The password should be 8 characters containing: \n uppercase, lowercase and numbers"}
            onValueChange={setPassword}
            type="password"
            label="Password"
            size="sm"
          />
          <Button color="primary">Login</Button>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-center">
          Don't have an account
          <Link
            href="/register"
            className="ml-1"
          >
            register now !
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
