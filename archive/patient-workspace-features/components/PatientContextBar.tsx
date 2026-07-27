import {
    Building2,
    GitBranch,
    MapPin,
    Stethoscope,
    UserRound
} from "lucide-react";

function Item({
    icon: Icon,
    label,
    value
}: any) {

    return (

        <button
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50 transition">

            <Icon
                size={16}
                className="text-slate-500"
            />

            <div className="text-left">

                <div className="text-[10px] uppercase tracking-wide text-slate-500">

                    {label}

                </div>

                <div className="text-sm font-semibold">

                    {value}

                </div>

            </div>

        </button>

    );

}

export default function PatientContextBar() {

    return (

        <section className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">

            <Item
                icon={UserRound}
                label="Patient"
                value="OP-003"
            />

            <Item
                icon={Building2}
                label="Service"
                value="Eye Centre"
            />

            <Item
                icon={Stethoscope}
                label="Unit"
                value="Retina Clinic"
            />

            <Item
                icon={GitBranch}
                label="Encounter"
                value="20 Jul 2026"
            />

            <Item
                icon={UserRound}
                label="Consultant"
                value="Dr Goyol"
            />

            <Item
                icon={MapPin}
                label="Location"
                value="Eye Clinic"
            />

        </section>

    );

}
