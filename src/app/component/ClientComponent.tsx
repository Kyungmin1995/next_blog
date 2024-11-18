"use client";

import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";

export default function ClientComponent({ children }: { children: ReactNode }) {
  const store = useAppSelector((state) => state.menuReducer);

  return <>{!store.value && <div>{children}</div>}</>;
}
