import { useState } from "react";

/**
 * Isolated, synthetic integration preview adapted from JUTH Care Design Studio.
 * NO backend, PHI, clinical actions, clearance or financial transactions.
 * Replace fixture data with authorized NestJS contracts before operational use.
 */
const clinicDirectory = [
  { id: "mopd", name: "MOPD", units: ["Cardiology", "Nephrology", "Dermatology", "Endocrinology"] },
  { id: "sopd", name: "SOPD", units: ["General Surgery", "Orthopaedics", "Urology"] },
  { id: "popd", name: "POPD", units: ["General Paediatrics", "Paediatric Cardiology"] },
  { id: "gopd", name: "GOPD", units: ["General Consultation", "Follow-up"] },
  { id: "eye", name: "Eye Clinic", units: ["General Ophthalmology", "Glaucoma"] },
  { id: "dental", name: "Dental Clinic", units: ["Oral Surgery", "Restorative Dentistry"] },
  { id: "physio", name: "Physiotherapy", units: ["Musculoskeletal", "Neurological Rehabilitation"] },
  { id: "anc", name: "Antenatal", units: ["General Antenatal", "High-Risk Antenatal"] },
];
const queueFixtures = [
  { clinic: "MOPD", unit: "Cardiology", token: "M-024", room: "Room assignment pending" },
  { clinic: "MOPD", unit: "Nephrology", token: "M-012", room: "Room assignment pending" },
  { clinic: "SOPD", unit: "Orthopaedics", token: "S-008", room: "Room assignment pending" },
];

export default function LovableIntegrationPreviewPage() {
  const [clinicId, setClinicId] = useState("mopd");
  const [unit, setUnit] = useState("Cardiology");
  const clinic = clinicDirectory.find((entry) => entry.id === clinicId) ?? clinicDirectory[0];
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <header className="rounded-xl bg-slate-950 p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Integration pilot · synthetic preview only</p>
        <h1 className="mt-2 text-3xl font-bold">JUTH HOS · Staff Portal Adoption</h1>
        <p className="mt-2 text-slate-300">Clinic/subclinic directory and privacy-safe waiting-area board adapted from Lovable. No patient data or clinical actions are connected.</p>
      </header>
      <section className="grid gap-5 lg:grid-cols-[minmax(260px,1fr)_2fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Clinic hierarchy</h2>
          <p className="mt-1 text-sm text-slate-600">Illustrative units; JUTH clinical approval pending.</p>
          <label htmlFor="pilot-clinic" className="mt-5 block text-sm font-medium">Parent clinic</label>
          <select id="pilot-clinic" className="mt-1 w-full rounded-lg border p-3" value={clinicId} onChange={(e) => { const next = clinicDirectory.find((item) => item.id === e.target.value) ?? clinicDirectory[0]; setClinicId(next.id); setUnit(next.units[0]); }}>
            {clinicDirectory.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <label htmlFor="pilot-subclinic" className="mt-4 block text-sm font-medium">Subclinic / service stream</label>
          <select id="pilot-subclinic" className="mt-1 w-full rounded-lg border p-3" value={unit} onChange={(e) => setUnit(e.target.value)}>
            {clinic.units.map((item) => <option key={item}>{item}</option>)}
          </select>
          <div className="mt-5 rounded-lg bg-blue-50 p-4 text-sm text-blue-950">
            <strong>{clinic.name} → {unit}</strong>
            <p className="mt-2">Appointments, clearance, triage, assigned team, queue and consultation require real API integration and server-enforced RBAC.</p>
          </div>
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950" role="status">
            Records officers cannot start consultations. This preview provides no clinical-action controls.
          </div>
        </div>
        <section className="rounded-xl bg-slate-950 p-5 text-white" aria-label="Synthetic public patient call board">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
            <div><h2 className="text-2xl font-bold">Patient Call Board</h2><p className="text-slate-300">Queue tokens only · no names or hospital numbers</p></div>
            <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-950">DEMO DATA</span>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {queueFixtures.map((item) => <article key={item.token} className="rounded-lg border border-slate-700 bg-slate-900 p-5">
              <p className="text-sm font-semibold text-slate-300">{item.clinic} · {item.unit}</p>
              <p className="mt-4 text-xs uppercase tracking-wider text-slate-400">Illustrative called token</p>
              <p className="my-2 font-mono text-5xl font-bold text-amber-300">{item.token}</p>
              <p className="text-sm text-slate-300">{item.room}</p>
            </article>)}
          </div>
          <p className="mt-5 text-sm text-slate-400">Static demonstration. Real queue calls, destinations, synchronization and permissions will come from the authoritative JUTH HOS backend.</p>
        </section>
      </section>
    </div>
  );
}
