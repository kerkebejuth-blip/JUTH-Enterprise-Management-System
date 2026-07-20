import { Bell, Search } from "lucide-react";

export default function Topbar() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">

            <h2 className="text-xl font-semibold">
                Hospital Operating System
            </h2>

            <div className="flex items-center gap-4">

                <Search />

                <Bell />

                <div className="h-10 w-10 rounded-full bg-blue-600"></div>

            </div>

        </header>
    );
}