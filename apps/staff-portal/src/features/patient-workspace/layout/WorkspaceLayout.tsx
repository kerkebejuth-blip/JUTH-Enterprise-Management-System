import { ReactNode } from "react";

interface Props {
  banner: ReactNode;
  ribbon: ReactNode;
  tabs: ReactNode;
  children: ReactNode;
  ai?: ReactNode;
  vitals?: ReactNode;
  timeline?: ReactNode;
}

export default function WorkspaceLayout({
  banner,
  ribbon,
  tabs,
  children,
  ai,
  vitals,
  timeline,
}: Props) {
  return (
    <div className="space-y-5">

      {banner}

      {ribbon}

      {tabs}

      <div className="grid grid-cols-12 gap-5">

        <div className="col-span-12 xl:col-span-9">
          {children}
        </div>

        <div className="col-span-12 xl:col-span-3">
          {ai}
        </div>

      </div>

      {vitals}

      {timeline}

    </div>
  );
}