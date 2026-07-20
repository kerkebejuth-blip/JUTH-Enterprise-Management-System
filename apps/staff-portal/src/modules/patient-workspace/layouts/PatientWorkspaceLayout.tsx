import PatientBanner from "../components/PatientBanner";
import ClinicalRibbon from "../components/ClinicalRibbon";
import Navigator from "../components/Navigator";
import Workspace from "../components/Workspace";
import AIAssistant from "../components/AIAssistant";

export default function PatientWorkspaceLayout() {
    return (
        <div className="flex h-full flex-col gap-4">

            <PatientBanner />

            <ClinicalRibbon />

            <div className="grid flex-1 grid-cols-[260px_1fr_340px] gap-4 overflow-hidden">

                <aside className="overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                    <Navigator />
                </aside>

                <main className="overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                    <Workspace />
                </main>

                <aside className="overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                    <AIAssistant />
                </aside>

            </div>

        </div>
    );
}
