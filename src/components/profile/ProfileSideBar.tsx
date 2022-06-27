import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import profileRoutes from "./ProfileRoutes";
const ProfileSideBar = () => {
  const { pathname } = useLocation();
  const activePath = (pathid: string) => {
    return pathname.split("/").pop() === pathid;
  };
  return (
    <div
      className="h-full w-250 flex top-0 bg-secondary flex-col rounded-lg p-20 color-white "
      style={{ borderLeft: "2px" }}
    >
      <div className="flex gap-20 align-center text-lg font-semibold letter-2 ">
        <Link to="../" className="xl:hidden flex color-white ">
          <RiArrowLeftLine />
        </Link>
        <span>PROFILE</span>
      </div>
      <div className="flex flex-col gap-30 my-100">
        {profileRoutes.map((route) => (
          <Link
            key={route.id}
            to={route.id}
            className="color-white text-sm font-medium"
            style={activePath(route.id) ? { color: "#d1004d" } : {}}
          >
            {route.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileSideBar;
