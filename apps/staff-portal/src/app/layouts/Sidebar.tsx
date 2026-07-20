import {
    LayoutDashboard,
    Users,
    Stethoscope,
    Pill,
    FlaskConical,
    ScanLine,
    CreditCard,
    Boxes,
    UsersRound,
    FileBarChart2,
    Shield,
    Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";

const items = [

    ["Dashboard","/",LayoutDashboard],
    ["Patients","/patients",Users],
    ["Clinics","/clinics",Stethoscope],
    ["Pharmacy","/pharmacy",Pill],
    ["Laboratory","/laboratory",FlaskConical],
    ["Radiology","/radiology",ScanLine],
    ["Billing","/billing",CreditCard],
    ["Inventory","/inventory",Boxes],
    ["HR","/hr",UsersRound],
    ["Reports","/reports",FileBarChart2],
    ["Administration","/administration",Shield],
    ["Settings","/settings",Settings]

];

export default function Sidebar(){

    return(

        <aside className="w-72 bg-slate-900 text-white">

            <div className="p-6 text-2xl font-bold">

                JUTH HOS

            </div>

            <nav className="space-y-1 px-3">

                {items.map(([label,path,Icon])=>(

                    <NavLink

                        key={String(label)}

                        to={String(path)}

                        className={({isActive})=>

                            `flex items-center gap-3 rounded-lg p-3 transition

                            ${isActive

                            ?'bg-blue-600'

                            :'hover:bg-slate-800'

                            }`

                        }

                    >

                        <Icon size={20}/>

                        {label}

                    </NavLink>

                ))}

            </nav>

        </aside>

    )

}