import { api } from "../../config/axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAuthData, isLogin } from "../store/authDataReducer";
import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const dispatch = useDispatch();
  let dataUser = useSelector((state) => state);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const csrf = await api.get("/sanctum/csrf-cookie");

    const login = await api.post("/api/v1/auth/login", {
      email: "jovani24@example.com",
      password: "password",
    });

    const user = await api.get("/api/v1/user");
    if (user.status >= 200 && user.status < 300) {
      dispatch(addAuthData(user.data.data));
      dispatch(isLogin());
    }
  }
  console.log(dataUser);

  return (
    <>
    
       </>
  );
};

export default LoginPage;
