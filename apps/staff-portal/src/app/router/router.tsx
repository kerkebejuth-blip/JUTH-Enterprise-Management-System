import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PatientWorkspacePage from "../../modules/patient-workspace/pages/PatientWorkspacePage";
import PatientSearchPage from "../../modules/patients/pages/PatientSearchPage";
import PlatformDashboardPage from "../../modules/platform-dashboard/pages/PlatformDashboardPage";
import Placeholder from "./Placeholder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <PlatformDashboardPage />,
      },

      {
        path: "workspace",
        element: <PatientWorkspacePage />,
      },

      {
        path: "patients",
        element: <PatientSearchPage />,
      },

      {
        path: "clinics",
        element: <Placeholder title="Clinics" />,
      },

      {
        path: "pharmacy",
        element: <Placeholder title="Pharmacy" />,
      },

      {
        path: "laboratory",
        element: <Placeholder title="Laboratory" />,
      },

      {
        path: "radiology",
        element: <Placeholder title="Radiology" />,
      },

      {
        path: "billing",
        element: <Placeholder title="Billing" />,
      },

      {
        path: "inventory",
        element: <Placeholder title="Inventory" />,
      },

      {
        path: "hr",
        element: <Placeholder title="HR" />,
      },

      {
        path: "reports",
        element: <Placeholder title="Reports" />,
      },

      {
        path: "administration",
        element: <Placeholder title="Administration" />,
      },

      {
        path: "settings",
        element: <Placeholder title="Settings" />,
      },
    ],
  },
]);
