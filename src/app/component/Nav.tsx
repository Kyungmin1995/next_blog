"use client";
import style from "./nav.module.css";
import Link from "next/link";
import React, { useState } from "react";
import MenuModal from "./Menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMenu } from "@/redux/features/menuSlice";
import { usePathname } from "next/navigation";

type MenuArrayProps = {
  path: string;
  name: string;
};
export const MenuArray: MenuArrayProps[] = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/post",
    name: "Post",
  },
  {
    path: "/about",
    name: "About",
  },
];

export default function Nav() {
  const store = useAppSelector((state) => state.menuReducer);
  const dispatch = useAppDispatch();
  const openMenu: () => void = () => dispatch(setMenu(true));
  const closeMenu = () => dispatch(setMenu(false));
  const params = usePathname();

  return (
    <>
      {store.value ? (
        <MenuModal btn={store.value} closeMenu={closeMenu} />
      ) : (
        <div className={style.navContainer}>
          <div className={"menubtnDiv m_navItem"} onClick={openMenu}>
            <span
              className={store.value ? "menubtn active " : "menubtn"}
            ></span>
          </div>
          <div
            style={{ minWidth: "150px", marginLeft: "20px" }}
            className="slide-left title"
          >
            {params === "/"
              ? "Home"
              : params === "/post"
              ? "Post"
              : params === "/about"
              ? "About"
              : ""}
          </div>
          <div
            className="slide-right navItem"
            style={{ width: "calc(70% - 40px)" }}
          >
            {MenuArray.map((_) => (
              <Link key={_.path} href={_.path} className={"navStyle"}>
                {_.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
