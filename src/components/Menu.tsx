"use client";

import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode"; // Correctly import jwtDecode
import { useEffect, useState } from "react";
// Function to get the role from JWT token in local storage
const getRole = () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return null; // Return null if no token is found
  }

  try {
    const decoded: { role: string } = jwtDecode(token); // Decode the JWT token
    return decoded.role; // Return the role from the token
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    return null;
  }
};

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
     
     
      {
        icon: "/class.png",
        label: "Session",
        href: "/list/session",
        visible: ["admin"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/setting.png",
        label: "Help",
        href: "/settings",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student"],
      },
    ],
  },
];

const Menu = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Set the role when the component mounts
    const userRole = getRole();
    setRole("admin");
  }, []);

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            // Only render items visible to the user's role
            if (role && item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
