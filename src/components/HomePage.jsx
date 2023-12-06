import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

const HomePage = () => {
  return (
    <>
      <Navbar shouldHideOnScroll className="bg-[#03045E]">
      <NavbarBrand>
        <p className="font-bold text-inherit text-white">QuizMinds</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link className="text-white" href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <main>
        
    </main>
    </>
  );
};

export default HomePage;
