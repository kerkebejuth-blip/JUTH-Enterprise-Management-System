import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * First adoption slice from the JUTH Care Design Studio handoff (2026-10-21).
 * Deliberately read-only: NO synthetic clinical records, approvals or queue calls.
 * Backend endpoint is a PROPOSED contract, not an asserted existing API.
 */
type Session = { id: string; startsAt: string; endsAt: string; timezone: string; roomId: string; staffIds: readonly string[] };
type Subclinic = {
  parentClinicId: string; subclinicId: string; displayName: string;
  active: boolean; effectiveFrom: string; effectiveTo?: string;
  configurationVersion: string; clinicalApproval: { reference: string };
  sessions: readonly Session[];
};
const parents = [
  ["gopd", "GOPD"], ["mopd", "MOPD"], ["sopd", "SOPD"], ["popd", "POPD"],
  ["eye", "Eye Clinic"], ["physio", "Physiotherapy"], ["postnatal", "Postnatal"],
  ["ent", "ENT"], ["dental", "Dental"], ["anc", "Antenatal"],
  ["obgyn", "O&G"], ["other", "Other Specialty Clinics"],
] as const;
const SCBU_NOTE = "SCBU belongs to Inpatient & Ward Management, not outpatient scheduling.";
function isActive(s: Subclinic, at: number) {
  return s.active && Boolean(s.clinicalApproval?.reference) &&
    Number.isFinite(Date.parse(s.effectiveFrom)) && Date.parse(s.effectiveFrom) <= at &&
    (!s.effectiveTo || Date.parse(s.effectiveTo) > at);
}
export default function ClinicDirectoryPilotPage() {
  const [params, setParams] = useSearchParams();
  const parent = params.get("clinic") ?? "gopd";
  const subclinic = params.get("subclinic") ?? "";
  const [entries, setEntries] = useState<Subclinic[]>([]);
  const [status, setStatus] = useState<"loading" | "unavailable" | "ready">("loading");
  useEffect(() => {
    const abort = new AbortController();
    setStatus("loading");
    // Endpoint must be implemented in NestJS with session RBAC before enabling workflows.
    fetch("/api/v1/clinic-directory", { credentials: "include", signal: abort.signal })
      .then(async response => {
        if (!response.ok) throw Error("Directory service unavailable");
        const body: unknown = await response.json();
        if (!Array.isArray(body)) throw Error("Invalid directory response");
        const valid = body.filter((item): item is Subclinic =>
          typeof item === "object" && item !== null &&
          typeof item.parentClinicId === "string" && typeof item.subclinicId === "string" &&
          typeof item.displayName === "string" && typeof item.effectiveFrom === "string" &&
          Array.isArray(item.sessions));
        setEntries(valid);
        setStatus("ready");
      })
      .catch(() => { if (!abort.signal.aborted) setStatus("unavailable"); });
    return () => abort.abort();
  }, []);
  const active = entries.filter(s => s.parentClinicId === parent && isActive(s, Date.now()));
  const selected = active.find(s => s.subclinicId === subclinic);
  const choose = (clinic: string, child = "") => setParams(child ? { clinic, subclinic: child } : { clinic });
  return (
    <section className="space-y-5 p-5" aria-label="Clinic directory integration pilot">
      <header>
        <h1 className="text-2xl font-bold">Clinic & Subclinic Directory</h1>
        <p className="text-sm text-slate-600">JUTH HOS integration pilot · read-only · awaiting approved directory and backend enforcement</p>
      </header>
      <div className="rounded-lg border bg-slate-50 p-3 text-sm" role="status">
        {status === "loading" ? "Checking the approved JUTH clinic directory…" :
         status === "unavailable" ? "Approved clinic directory not connected. No appointments, queues or consultation actions are enabled." :
         "Approved directory response received. Only effective, active and approved subclinics are selectable."}
      </div>
      <div className="grid gap-4 md:grid-cols-[230px_1fr]">
        <nav aria-label="Parent clinics" className="space-y-1 rounded-lg border p-3">
          {parents.map(([id, label]) =>
            <button key={id} type="button" onClick={() => choose(id)}
              aria-current={parent === id ? "page" : undefined}
              className={`block w-full rounded px-3 py-2 text-left text-sm ${parent === id ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}>
              {label}
            </button>)}
          <p className="border-t pt-3 text-xs text-slate-500">{SCBU_NOTE}</p>
        </nav>
        <main className="space-y-4 rounded-lg border p-4">
          <h2 className="text-lg font-semibold">{parents.find(([id]) => id === parent)?.[1] ?? "Unknown clinic"}</h2>
          <label className="block text-sm font-medium" htmlFor="subclinic-choice">Subclinic / service stream</label>
          <select id="subclinic-choice" className="w-full rounded border p-2" value={selected?.subclinicId ?? ""}
            onChange={e => choose(parent, e.target.value)} disabled={status !== "ready"}>
            <option value="">Select an approved subclinic</option>
            {active.map(s => <option key={s.subclinicId} value={s.subclinicId}>{s.displayName}</option>)}
          </select>
          {subclinic && !selected && <p role="alert" className="text-sm text-amber-800">This subclinic is not approved, effective or accessible. No queue is loaded.</p>}
          {selected ? <div className="space-y-3">
            <h3 className="font-semibold">{selected.displayName}</h3>
            <p className="text-sm">Configuration version: {selected.configurationVersion}</p>
            <h4 className="font-medium">Approved sessions</h4>
            {selected.sessions.length === 0 ? <p className="text-sm">No approved sessions registered.</p> :
              <ul className="list-disc pl-5 text-sm">{selected.sessions.map(s =>
                <li key={s.id}>{s.startsAt} – {s.endsAt} ({s.timezone}); room ID {s.roomId}</li>)}</ul>}
            <p className="rounded border p-3 text-sm">Patient queue, clearance, triage and Call Next remain disabled until NestJS verifies staff assignment, room, session, clinical eligibility and transaction rules.</p>
          </div> : <p className="text-sm text-slate-600">Select a registered subclinic to view its approved sessions. No demo patients are displayed.</p>}
        </main>
      </div>
    </section>
  );
}
