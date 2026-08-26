import { ArrowRight, Search, ShieldAlert, UserRound } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { ApiClientError } from "../../../app/api";
import { searchPatients, type PatientSummary } from "../services";

/** Staff Portal entry point for authorized, clinic-neutral Patient identity search. */
export default function PatientSearchPage() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<readonly PatientSummary[]>([]);
  const [searchedTerm, setSearchedTerm] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTerm = term.trim();

    if (trimmedTerm.length < 2) {
      setErrorMessage("Enter at least two characters to search patient identity.");
      setResults([]);
      setSearchedTerm(null);
      return;
    }

    setErrorMessage(null);
    setSearchedTerm(trimmedTerm);
    setIsLoading(true);

    try {
      const response = await searchPatients(trimmedTerm);
      setResults(response.items);
    } catch (error: unknown) {
      setResults([]);
      if (error instanceof ApiClientError && error.status === 401) {
        setErrorMessage(
          "An authenticated staff session is required before patient identity can be searched.",
        );
      } else if (error instanceof ApiClientError && error.status === 403) {
        setErrorMessage(
          "An authenticated staff session with Patient Read permission is required before patient identity can be searched.",
        );
      } else if (error instanceof ApiClientError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Patient search is temporarily unavailable.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
          Patient identity
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">
          Find a patient
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Search the enterprise identity index before starting a new workflow.
          Existing history must remain discoverable across departments.
        </p>

        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end"
          onSubmit={(event) => void handleSubmit(event)}
        >
          <div className="min-w-0 flex-1">
            <label
              className="mb-2 block text-sm font-semibold text-slate-800"
              htmlFor="patient-search"
            >
              Name, MRN, hospital number, phone, or identifier
            </label>
            <input
              id="patient-search"
              className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search patient identity"
              autoComplete="off"
              type="search"
              aria-describedby="patient-search-help"
            />
            <p id="patient-search-help" className="mt-2 text-xs text-slate-500">
              Results are bounded and returned through the enterprise API.
            </p>
          </div>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            type="submit"
            disabled={isLoading}
          >
            <Search size={17} aria-hidden="true" />
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </header>

      {isLoading ? (
        <div
          className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900"
          role="status"
        >
          Searching the enterprise patient identity index...
        </div>
      ) : null}

      {errorMessage ? (
        <div
          className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950"
          role="alert"
        >
          <ShieldAlert className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
          <p>{errorMessage}</p>
        </div>
      ) : null}

      {!isLoading && searchedTerm && !errorMessage && results.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <UserRound className="mx-auto text-slate-400" size={28} aria-hidden="true" />
          <h2 className="mt-3 text-lg font-semibold text-slate-950">
            No patient identity found
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
            Confirm the search details before creating any new identity. A failed
            search must never silently become a registration.
          </p>
        </div>
      ) : null}

      {results.length > 0 ? (
        <section aria-labelledby="patient-results-heading">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2
              id="patient-results-heading"
              className="text-lg font-semibold text-slate-950"
            >
              Patient results
            </h2>
            <span className="text-sm text-slate-500">{results.length} shown</span>
          </div>
          <div className="grid gap-3">
            {results.map((patient) => (
              <article
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                key={patient.patientId}
              >
                <div>
                  <h3 className="font-semibold text-slate-950">{patient.displayName}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    MRN {patient.hospitalNumber} · {patient.dateOfBirth} · {patient.gender}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Enterprise ID {patient.enterprisePatientNumber}
                  </p>
                </div>
                <Link
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  to={`/workspace?patientId=${encodeURIComponent(patient.patientId)}`}
                >
                  Open workspace
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
