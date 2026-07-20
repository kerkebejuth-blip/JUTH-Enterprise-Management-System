import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PatientWorkspaceLayout from "../../modules/patient-workspace/layouts/PatientWorkspaceLayout";

const Placeholder = ({ title }: { title: string }) => (
    <div className="p-6">
        <h1 className="text-3xl font-bold">{title}</h1>

        <p className="mt-2 text-slate-500">
            {title} module is under development.
        </p>
    </div>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <PatientWorkspaceLayout />,
            },

            {
                path: "patients",
                element: <Placeholder title="Patients" />,
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