import React, { ReactNode } from "react";
import { DropdownIcon } from "./DropdownIcon";
import { Menu } from "./Menu";

export const MePageLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <main
      className="flex w-full flex-row"
      style={{
        minHeight: "100%",
      }}
    >
      <Menu />
      <section className="flex h-full w-full flex-col pl-16 lg:pl-64">
        <nav className="flex w-full items-center justify-end p-8">
          <DropdownIcon />
        </nav>
        {children}
      </section>
    </main>
  );
};
