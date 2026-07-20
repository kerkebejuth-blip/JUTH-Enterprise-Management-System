import {
  AlertTriangle,
  CalendarDays,
  CreditCard,
  Droplets,
  HeartPulse,
  IdCard,
  ShieldAlert,
  User,
} from "lucide-react";

const info = [
  {
    label: "Hospital No.",
    value: "JUTH-2026-004512",
    icon: IdCard,
  },
  {
    label: "Age / Sex",
    value: "54 Years • Male",
    icon: User,
  },
  {
    label: "Blood Group",
    value: "O+",
    icon: Droplets,
  },
  {
    label: "Current Clinic",
    value: "Eye Clinic",
    icon: HeartPulse,
  },
  {
    label: "Current Visit",
    value: "20 Jul 2026",
    icon: CalendarDays,
  },
  {
    label: "Payment",
    value: "NHIA",
    icon: CreditCard,
  },
];

export default function PatientBanner() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">

      <div className="relative">

        {/* Watermark */}

        <div
          className="absolute inset-0 opacity-[0.03] bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url('/images/juth-logo.png')",
          }}
        />

        <div className="relative p-6">

          <div className="flex items-start justify-between">

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Ahmed Musa
              </h1>

              <p className="mt-1 text-slate-500">
                Enterprise Electronic Medical Record
              </p>

            </div>

            <div className="flex gap-2">

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                Allergy: Penicillin
              </span>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700 flex items-center gap-1">
                <ShieldAlert size={16} />
                High Risk
              </span>

            </div>

          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">

            {info.map(({ label, value, icon: Icon }) => (

              <div
                key={label}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-2 text-slate-500">

                  <Icon size={16} />

                  <span className="text-xs uppercase tracking-wide">
                    {label}
                  </span>

                </div>

                <div className="mt-2 font-semibold text-slate-900">
                  {value}
                </div>

              </div>

            ))}

          </div>

          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 flex items-center gap-2">

            <AlertTriangle
              size={18}
              className="text-red-600"
            />

            <span className="text-sm text-red-700">

              Previous adverse drug reaction recorded. Review allergy history before prescribing.

            </span>

          </div>

        </div>

      </div>

    </section>
  );
}