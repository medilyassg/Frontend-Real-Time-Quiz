import { api } from "../../config/axios";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Image,
  Card,
  CardFooter,
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
  const [userData, setUserData] = useState({});
  const [quizData, setQuizData] = useState({});
  const navigate = useNavigate();
  const menuItems = [
    { label: "Profile", link: "/profile" },
    { label: "Dashboard", link: "/dashboard" },
    { label: "Scores", link: "#" },
    { label: "New quiz", link: "/creator" },
    { label: "Rooms", link: "#" },
    { label: "Old users", link: "#" },
    { label: "Log Out", link: "/logout" },
  ];

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await api.get("/api/v1/user");
      setUserData(response.data.data);

      if (response.data.data) {
        const id = response.data.data.id;
        const quizzesResponse = await api.get(`/api/v1/quizzes/${id}`);
        setQuizData(quizzesResponse.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }
  const handleLogout = async () => {
    try {
      const csrf = await api.get("/sanctum/csrf-cookie");
      const response = await api.post("/api/v1/auth/logout");

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log("");
    }
  };
  return (
    <div>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="lg:fixed md:fixed xl:fixed 2xl:fixed bg-[#111233]"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-white sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-white">QuizMinds</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button onClick={handleLogout} color="primary" variant="ghost">
              Logout
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
          <div className="flex-col justify-between hidden h-screen bg-white sm:flex border-e">
            <div className="px-4 py-6">
              <span className="grid h-10 w-32 place-content-center rounded-lg  text-xs text-gray-600"></span>

              <ul className="mt-6 space-y-1">
                <li>
                  <a
                    href=""
                    className="block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
                  >
                    General
                  </a>
                </li>

                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium"> Teams </span>

                      <span className="transition duration-300 shrink-0 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
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

                    <ul className="px-4 mt-2 space-y-1">
                      <li>
                        <a
                          href=""
                          className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                          Old users
                        </a>
                      </li>

                      <li>
                        <a
                          href=""
                          className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                          Rooms
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>

                <li>
                  <a
                    href="/creator"
                    className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    New quiz
                  </a>
                </li>

                <li>
                  <a
                    href=""
                    className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Scores
                  </a>
                </li>

                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium"> Account </span>

                      <span className="transition duration-300 shrink-0 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
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

                    <ul className="px-4 mt-2 space-y-1">
                      <li>
                        <a
                          href=""
                          className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
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
                className="flex items-center gap-2 p-4 bg-white hover:bg-gray-50"
              >
                <Avatar name={userData.name} />

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
        <div className="flex gap-3 m-auto justify-center items-center flex-wrap">
          {quizData.length > 0 ? (
            quizData.map((quiz, index) => (
              <Card
                key={index}
                isFooterBlurred
                radius="lg"
                className="border-none"
              >
                <Image
                  alt="quiz"
                  className="object-cover"
                  height={200}
                  src="https://s1.qwant.com/thumbr/474x511/1/f/cd923303f864cc55ae4f8dc31a0abedfc3e89adc447d71296aeaae2b4d7845/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.B5fKN_0J_wr4haO-4UdFegHaH_%26pid%3DApi&q=0&b=1&p=0&a=0"
                  width={200}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-white/80">{quiz.title}</p>
                    <p className="text-tiny text-white/80">
                      created:
                      {new Date(quiz.created_at).toLocaleDateString()}
                    </p>
                  </div>{" "}
                  <Button
                    className="text-tiny text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    See more
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col gap-2 m-auto justify-center items-center h-screen">
              <p>No quizzes yet! Create yours right now!</p>
              <Button as={Link} color="primary" to="/creator" className="w-1/2">
                Create quiz
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
