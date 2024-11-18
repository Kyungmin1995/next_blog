"use client";

import Link from "next/link";
import { MenuArray } from "./Nav";

interface btnProps {
  btn: boolean;

  closeMenu: () => void;
}
export default function MenuModal({ btn, closeMenu }: btnProps) {
  return (
    <div className="conteiner ">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          padding: 20,
          boxSizing: "border-box",
        }}
        className="menumodal"
      >
        <div className="menubtnDiv" onClick={closeMenu}>
          <span className={btn ? "menubtn active " : "menubtn"} />
        </div>
        <div className="full-menu">
          {MenuArray.map((_) => (
            <Link
              key={_.path}
              href={_.path}
              className={"navStyle"}
              onClick={closeMenu}
            >
              {_.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
