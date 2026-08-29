import { useMemo, useState } from 'react';

import {
  CAPABILITY_STATUSES,
  CRITERION_KEYS,
  DISCOVERY_STATUSES,
  capabilities,
  countCriteria,
  filterCapabilities,
  filterWorkflowDiscovery,
  programmeStatus,
  risks,
  safeEvidence,
  workflowDiscovery,
  type CapabilityRecord,
  type CapabilityStatus,
  type DiscoveryStatus,
} from './data/programme-status';

type View = 'overview' | 'capabilities' | 'workflow' | 'risks';
const views: Array<{ id: View; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'capabilities', label: 'Capability Matrix' },
  { id: 'workflow', label: 'Workflow Discovery' },
  { id: 'risks', label: 'Risks and Decisions' },
];

function statusClass(status: string): string {
  return `status status-${status.toLowerCase().replaceAll('_', '-')}`;
}

function StatusBadge({ status }: { status: string }) {
  return <span className={statusClass(status)}>{status.replaceAll('_', ' ')}</span>;
}

function App() {
  const [view, setView] = useState<View>('overview');
  const [selectedId, setSelectedId] = useState('patient-mpi');
  const [capabilityStatus, setCapabilityStatus] = useState<CapabilityStatus | 'ALL'>('ALL');
  const [capabilityArea, setCapabilityArea] = useState('ALL');
  const [capabilitySearch, setCapabilitySearch] = useState('');
  const [workflowStatus, setWorkflowStatus] = useState<DiscoveryStatus | 'ALL'>('ALL');
  const [workflowArea, setWorkflowArea] = useState('ALL');

  const filteredCapabilities = useMemo(() => {
    return filterCapabilities(capabilities, {
      area: capabilityArea as 'ALL' | CapabilityRecord['area'],
      search: capabilitySearch,
      status: capabilityStatus,
    });
  }, [capabilityArea, capabilitySearch, capabilityStatus]);

  const selectedCapability = capabilities.find((item) => item.id === selectedId) ?? capabilities[0];
  const filteredWorkflow = useMemo(
    () =>
      filterWorkflowDiscovery(workflowDiscovery, {
        serviceType: workflowArea as 'ALL' | (typeof workflowDiscovery)[number]['serviceType'],
        status: workflowStatus,
      }),
    [workflowArea, workflowStatus],
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Development and Governance</p>
          <h1>JUTH HOS Programme Control Centre</h1>
        </div>
        <div className="topbar-meta">
          <span className="environment-tag">Development only</span>
          <span className="commit-tag">Evidence view</span>
        </div>
      </header>
      <div className="content-grid">
        <aside className="sidebar" aria-label="Programme views">
          <div className="sidebar-heading">Programme visibility</div>
          <nav>
            {views.map((item) => (
              <button
                className={view === item.id ? 'nav-item active' : 'nav-item'}
                key={item.id}
                onClick={() => setView(item.id)}
                type="button"
              >
                <span>{item.label}</span>
                {item.id === 'risks' && <span className="nav-count">{risks.length}</span>}
              </button>
            ))}
          </nav>
          <div className="boundary-note">
            <strong>Boundary</strong>
            <span>No PHI, clinical writes, database access, or production route.</span>
          </div>
        </aside>
        <main className="main-content">
          {view === 'overview' && <Overview onOpenCapabilities={() => setView('capabilities')} />}
          {view === 'capabilities' && (
            <CapabilitiesView
              area={capabilityArea}
              filter={capabilityStatus}
              onAreaChange={setCapabilityArea}
              onFilterChange={setCapabilityStatus}
              onSearchChange={setCapabilitySearch}
              onSelect={setSelectedId}
              search={capabilitySearch}
              selectedCapability={selectedCapability}
              selectedCapabilityId={selectedId}
              records={filteredCapabilities}
            />
          )}
          {view === 'workflow' && (
            <WorkflowView
              area={workflowArea}
              filter={workflowStatus}
              onAreaChange={setWorkflowArea}
              onFilterChange={setWorkflowStatus}
              records={filteredWorkflow}
            />
          )}
          {view === 'risks' && <RisksView />}
        </main>
      </div>
    </div>
  );
}

function Overview({ onOpenCapabilities }: { onOpenCapabilities: () => void }) {
  return (
    <>
      <PageIntro
        eyebrow="Programme overview"
        title="A factual view of the current platform state"
        description="This workspace presents repository-controlled architecture and delivery evidence. It does not infer clinical readiness from screens or route count."
      />
      <section className="metric-grid" aria-label="Programme summary">
        <Metric label="Repository" value={programmeStatus.repositoryStatus} tone="green" />
        <Metric label="Build evidence" value={programmeStatus.buildStatus} tone="amber" />
        <Metric label="Tests evidence" value={programmeStatus.testStatus} tone="amber" />
        <Metric
          label="Fitness tests"
          value={programmeStatus.architectureFitnessStatus}
          tone="red"
        />
      </section>
      <section className="overview-grid">
        <article className="panel milestone-panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Current slice</p>
              <h2>{programmeStatus.currentSlice}</h2>
            </div>
            <StatusBadge status="PARTIAL" />
          </div>
          <dl className="detail-list">
            <div>
              <dt>Sprint</dt>
              <dd>{programmeStatus.currentSprint}</dd>
            </div>
            <div>
              <dt>Checkpoint</dt>
              <dd>{programmeStatus.latestCheckpoint}</dd>
            </div>
            <div>
              <dt>Evidence file</dt>
              <dd>
                <code>{programmeStatus.checkpointPath}</code>
              </dd>
            </div>
            <div>
              <dt>Database</dt>
              <dd>{programmeStatus.databaseStatus}</dd>
            </div>
            <div>
              <dt>Security</dt>
              <dd>{programmeStatus.securityStatus}</dd>
            </div>
            <div>
              <dt>ADR status</dt>
              <dd>{programmeStatus.adrStatus}</dd>
            </div>
          </dl>
          <button className="primary-button" onClick={onOpenCapabilities} type="button">
            Review capability evidence
          </button>
        </article>
        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Blockers</p>
              <h2>Open programme risks</h2>
            </div>
            <span className="risk-count">{programmeStatus.blockers.length}</span>
          </div>
          <ul className="blocker-list">
            {programmeStatus.blockers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="recommendation">
            <span className="section-kicker">Recommended next slice</span>
            <p>{programmeStatus.recommendedNextSlice}</p>
          </div>
        </article>
      </section>
      <section className="panel status-strip">
        <div>
          <p className="section-kicker">Operating rule</p>
          <h2>Evidence before status</h2>
        </div>
        <p>
          A capability is only complete when its domain, persistence, API, authorization, audit, UI,
          validation, error handling, tests, workflow validation, and operational readiness evidence
          is available or explicitly not applicable.
        </p>
      </section>
    </>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'green' | 'amber' | 'red';
}) {
  return (
    <article className="metric-card">
      <span className="metric-label">{label}</span>
      <strong className={`metric-value tone-${tone}`}>{value.replaceAll('_', ' ')}</strong>
    </article>
  );
}

function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

interface CapabilitiesViewProps {
  records: CapabilityRecord[];
  selectedCapability: CapabilityRecord;
  selectedCapabilityId: string;
  onSelect: (id: string) => void;
  filter: CapabilityStatus | 'ALL';
  onFilterChange: (value: CapabilityStatus | 'ALL') => void;
  area: string;
  onAreaChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

function CapabilitiesView({
  records,
  selectedCapability,
  selectedCapabilityId,
  onSelect,
  filter,
  onFilterChange,
  area,
  onAreaChange,
  search,
  onSearchChange,
}: CapabilitiesViewProps) {
  return (
    <>
      <PageIntro
        eyebrow="Evidence matrix"
        title="Capability status across the enterprise"
        description="Filter the target catalogue and inspect the evidence behind each classification. Missing capabilities remain catalogue entries only."
      />
      <div className="toolbar">
        <label>
          Search
          <input
            aria-label="Search capabilities"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search capabilities"
            value={search}
          />
        </label>
        <label>
          Status
          <select
            aria-label="Filter capability status"
            onChange={(event) => onFilterChange(event.target.value as CapabilityStatus | 'ALL')}
            value={filter}
          >
            <option value="ALL">All statuses</option>
            {CAPABILITY_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.replaceAll('_', ' ')}
              </option>
            ))}
          </select>
        </label>
        <label>
          Area
          <select
            aria-label="Filter capability area"
            onChange={(event) => onAreaChange(event.target.value)}
            value={area}
          >
            <option value="ALL">All areas</option>
            <option>Enterprise / Platform</option>
            <option>Clinical</option>
            <option>Enterprise Operations</option>
          </select>
        </label>
      </div>
      <div className="capability-layout">
        <section className="panel table-panel" aria-label="Capability matrix">
          <div className="table-summary">{records.length} catalogue entries shown</div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Capability</th>
                  <th scope="col">Area</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr
                    className={selectedCapabilityId === record.id ? 'selected-row' : ''}
                    key={record.id}
                  >
                    <td>
                      <button
                        className="table-link"
                        onClick={() => onSelect(record.id)}
                        type="button"
                      >
                        {record.name}
                      </button>
                    </td>
                    <td>{record.area}</td>
                    <td>
                      <StatusBadge status={record.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <CapabilityDetail capability={selectedCapability} />
      </div>
    </>
  );
}

function CapabilityDetail({ capability }: { capability: CapabilityRecord }) {
  const counts = countCriteria(capability.criteria);
  return (
    <aside className="panel detail-panel" aria-label="Capability detail">
      <div className="panel-heading">
        <div>
          <p className="section-kicker">Capability detail</p>
          <h2>{capability.name}</h2>
        </div>
        <StatusBadge status={capability.status} />
      </div>
      <p>{capability.summary}</p>
      <div className="criteria-summary">
        <span>Verified {counts.VERIFIED}</span>
        <span>Partial {counts.PARTIAL}</span>
        <span>Missing {counts.MISSING}</span>
        <span>Not assessed {counts.NOT_ASSESSED}</span>
      </div>
      <h3>Evidence criteria</h3>
      <div className="criteria-list">
        {CRITERION_KEYS.map((key) => (
          <div className="criterion" key={key}>
            <div>
              <strong>{key.replaceAll('_', ' ')}</strong>
              <small>{capability.criteria[key].evidence}</small>
            </div>
            <StatusBadge status={capability.criteria[key].status} />
          </div>
        ))}
      </div>
      <DetailList title="Evidence" items={capability.evidence} />
      <DetailList title="Known gaps" items={capability.gaps} />
      <DetailList title="Dependencies" items={capability.dependencies} />
      <DetailList title="ADRs" items={capability.adrs} />
      <DetailList
        title="Tests"
        items={capability.tests.length > 0 ? capability.tests : ['No tests recorded.']}
      />
    </aside>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="detail-section">
      <h3>{title}</h3>
      <ul>
        {safeEvidence(items).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

interface WorkflowViewProps {
  records: typeof workflowDiscovery;
  filter: DiscoveryStatus | 'ALL';
  onFilterChange: (value: DiscoveryStatus | 'ALL') => void;
  area: string;
  onAreaChange: (value: string) => void;
}
function WorkflowView({ records, filter, onFilterChange, area, onAreaChange }: WorkflowViewProps) {
  return (
    <>
      <PageIntro
        eyebrow="Institutional discovery"
        title="Workflow Discovery Register"
        description="Software delivery status and workflow discovery status are independent. No department is treated as clinically validated without recorded evidence."
      />
      <div className="toolbar">
        <label>
          Service type
          <select
            aria-label="Filter service type"
            onChange={(event) => onAreaChange(event.target.value)}
            value={area}
          >
            <option value="ALL">All service types</option>
            <option>Clinical</option>
            <option>Diagnostic</option>
            <option>Administrative</option>
            <option>Support</option>
          </select>
        </label>
        <label>
          Discovery status
          <select
            aria-label="Filter discovery status"
            onChange={(event) => onFilterChange(event.target.value as DiscoveryStatus | 'ALL')}
            value={filter}
          >
            <option value="ALL">All discovery statuses</option>
            {DISCOVERY_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.replaceAll('_', ' ')}
              </option>
            ))}
          </select>
        </label>
      </div>
      <section className="panel table-panel">
        <div className="table-summary">
          {records.length} departments shown · initial evidence state is conservative
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Department / unit</th>
                <th scope="col">Service type</th>
                <th scope="col">Discovery status</th>
                <th scope="col">Owner</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>
                    <strong>{record.department}</strong>
                    <small className="table-note">{record.evidence}</small>
                  </td>
                  <td>{record.serviceType}</td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                  <td>{record.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function RisksView() {
  return (
    <>
      <PageIntro
        eyebrow="Governance attention"
        title="Risks and decisions"
        description="These records are drawn from the architecture realignment checkpoint. They are not clinical incidents or patient safety records."
      />
      <section className="risk-list">
        {risks.map((risk) => (
          <article className="panel risk-card" key={risk.id}>
            <div className="risk-card-top">
              <StatusBadge status={risk.severity} />
              <h2>{risk.title}</h2>
            </div>
            <p>
              <strong>Evidence:</strong> {risk.evidence}
            </p>
            <p>
              <strong>Decision required:</strong> {risk.decision}
            </p>
          </article>
        ))}
      </section>
    </>
  );
}

export default App;
