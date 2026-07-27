import { useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  return (
    <div className="border-b bg-white px-6 py-3 text-sm text-gray-500">
      {pathname}
    </div>
  );
}
