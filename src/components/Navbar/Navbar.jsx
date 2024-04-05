import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import logo from "../../Assets/Logo_SnapSynk.png";
import avatar from "../../Assets/avatar.jpeg";
import "../../index.css";

function Navbar() {
  const [profilecardVisible, setPCVisible] = useState();
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("isSession");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserType");
    if (!localStorage.getItem("isSession")) {
      navigate("/Login");
    }
  }

  function HendleProfileClick() {
    setPCVisible((prev) => !prev);
  }

  return (
    <div className="flex flex-row w-[100%] justify-between bg-sky-50 py-2 px-3 navbar">
      <div className="justify-start bg-red px-3">
        <Link to="" className="flex row font-extrabold text-lg">
          <img src={logo} className="w-[50px]" />
          <span>Snap Synk</span>
        </Link>
      </div>
      <div className="flex items-center">
        <nav className="text-lg font-semibold">
          {!localStorage.getItem("isSession") ? (
            <>
              <Link to="Login" className="mx-6" href="#">
                Login
              </Link>
              <Link to="Register" className="mx-3" href="#">
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center">
              <Menu>
                <MenuButton
                  px={4}
                  py={2}
                  transition="all 0.2s"
                  borderRadius="md"
                  borderWidth="1px"
                  _hover={{ bg: "gray.400" }}
                  _expanded={{ bg: "blue.400" }}
                  _focus={{ boxShadow: "outline" }}
                  rightIcon={<div>hi</div>}
                >
                  <img className="rounded-full  m-2 h-[30px] " src={avatar} />
                </MenuButton>
                <MenuList
                  style={{
                    minWidth: "10rem",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    borderColor: "gray.400",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
                    marginTop: "-5px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                    gap: "5px",
                  }}
                >
                  <MenuItem className="mx-6">
                    <button className="mx-6" href="#">
                      {localStorage.getItem("UserName")}
                    </button>
                  </MenuItem>
                  <MenuItem className="mx-6">
                    <button
                      className="mx-6"
                      href="#"
                      style={{ fontSize: "12px" }}
                    >
                      {localStorage.getItem("UserType")}
                    </button>
                  </MenuItem>
                  <MenuDivider sx={{ width: "100%" }} />
                  <MenuItem>
                    <button onClick={handleLogOut} className="mx-6" href="#">
                      Logout
                    </button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
export default Navbar;
