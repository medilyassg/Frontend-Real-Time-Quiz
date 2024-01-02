import { api } from "../../config/axios";
import { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData,setUserData]=useState({})
  const [isLogin,setIsLogin]=useState(null)
  const navigate=useNavigate()
  const menuItems = [
    { label: "Profile", link: "/profile" },
    { label: "Dashboard", link: "/dashboard" },
    { label: "Scores", link: "#" },
    { label: "Quizzes", link: "/quizzes" },
    { label: "Rooms", link: "#" },
    { label: "Old users", link: "#" },
    { label: "Log Out", link: "/logout" },
  ];

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    await api.get("/api/v1/user").then((response)=>{
        setUserData(()=>response.data.data)
        setIsLogin(true)
    }).catch((error)=>{
      if (error.response.status === 401) {
        setIsLogin(false)

    }
    })
  }
  if(!isLogin){
    navigate("/login",{ replace: true })
    return;
  }
  return (
    <div>
      <Navbar onMenuOpenChange={setIsMenuOpen} className="lg:fixed md:fixed xl:fixed 2xl:fixed bg-[#111233]">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-white"
          />
          <NavbarBrand>
            <p className="font-bold text-white">QuizMinds</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
        <NavbarItem>
            <Button as={Link} color="primary" to="/creator" variant="ghost">
              Create quiz
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Avatar name={userData.name} />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href={item.link}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <div className="flex gap-6">
        <div>
          <div className="hidden sm:flex h-screen flex-col justify-between border-e bg-white">
            <div className="px-4 py-6">
              <span className="grid h-10 w-32 place-content-center rounded-lg  text-xs text-gray-600">
                
              </span>

              <ul className="mt-6 space-y-1">
                <li>
                  <a
                    href=""
                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    General
                  </a>
                </li>

                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium"> Teams </span>

                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                      <li>
                        <a
                          href=""
                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          Old users
                        </a>
                      </li>

                      <li>
                        <a
                          href=""
                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          Rooms
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>

                <li>
                  <a
                    href=""
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Quizzes
                  </a>
                </li>

                <li>
                  <a
                    href=""
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Scores
                  </a>
                </li>

                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium"> Account </span>

                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                      <li>
                        <a
                          href=""
                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          Profile
                        </a>
                      </li>

                      <li>
                        <form action="/">
                          <button
                            type="submit"
                            className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                          >
                            Logout
                          </button>
                        </form>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
              <a
                href="#"
                className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
              >
                <Avatar name={userData.name}/>

                <div>
                  <p className="text-xs">
                    <strong className="block font-medium">
                      {userData.name}
                    </strong>

                    <span> {userData.email} </span>
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex gap-2 lg:mx-72 xl:mx-2/3 md:mx-36 flex-col justify-center items-center">
          <p>No quizzes yet! Create yours right now!</p>
          <Button as={Link} color="primary" to="/creator">
            Create quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
