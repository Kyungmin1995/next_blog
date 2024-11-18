import { ReactNode } from "react";
import Header from "../component/Header";
import Nav from "../component/Nav";
import ClientComponent from "../component/ClientComponent";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <Header>
        <Nav />
      </Header>
      <ClientComponent>{children}</ClientComponent>
    </div>
  );
}
