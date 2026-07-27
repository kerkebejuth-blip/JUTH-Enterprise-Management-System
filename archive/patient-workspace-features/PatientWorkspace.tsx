import PatientBanner from "./components/PatientBanner";
import PatientContextBar from "./components/PatientContextBar";

export default function PatientWorkspace() {

    return (

        <div className="space-y-4">

            <PatientBanner />

            <PatientContextBar />

            <div className="grid grid-cols-12 gap-4">

                <aside className="col-span-2 rounded-xl border bg-white p-4">

                    Clinical Journey

                </aside>

                <main className="col-span-7 rounded-xl border bg-white p-4">

                    Dynamic Workspace

                </main>

                <aside className="col-span-3 rounded-xl border bg-white p-4">

                    Clinical Intelligence

                </aside>

            </div>

        </div>

    );

}
