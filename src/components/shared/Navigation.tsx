import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavLinks = () => {
  return (
    <>
      <div className="flex gap-x-10 items-center">
        <Link to={"/"}>Home</Link>
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        <SignedOut>
          <Link to={"/sign-in"}>Sign In</Link>
          <Button asChild>
            <Link to={"/sign-up"}>Sign Up</Link>
          </Button>
        </SignedOut>
      </div>
    </>
  );
};

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex py-12 justify-between items-center">
        <div>
          <Link to={"/"} className="text-4xl font-medium text-underlay-1">
            HirelyAI
          </Link>
        </div>

        <div className="hidden sm:flex justify-center items-center">
          <NavLinks />
        </div>

        {/* menu icon */}
        <div className="sm:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="sm:hidden flex flex-col items-center pb-4 basis-full">
          <NavLinks />
        </div>
      )}
    </>
  );
}

export default Navigation;
