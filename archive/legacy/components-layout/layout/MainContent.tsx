import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainContent({
  children,
}: Props) {
  return (
    <main
      className="
      flex-1
      overflow-auto
      p-6
      "
    >
      {children}
    </main>
  );
}