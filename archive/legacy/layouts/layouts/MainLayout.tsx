import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import MainContent from "../components/layout/MainContent";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
}