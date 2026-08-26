# JUTH HOS Search

## Search Philosophy

Search is a clinical safety capability. It must make the Digital Patient Folder discoverable quickly while preventing wrong-patient selection, duplicate registration, unauthorized disclosure, and hidden history.

## Search Contract

Search endpoints accept a bounded `search` term and return minimum-disclosure projections. The owning context defines searchable fields, ranking, normalization, scopes, and explanation of matches. Search must return stable identifiers and enough context for safe confirmation.

## Patient Identity Search

The Patient context is the authority for identity search. Future Patient search must support approved, indexed lookup by:

- Enterprise Patient Number.
- Hospital Number or MRN.
- Name.
- Phone number.
- Approved national or external identifiers.

Patient search must preserve original display values, use explainable matching, and make duplicate candidates visible to authorized staff. No search result may silently merge identities.

## Matching Modes

Prefix and exact search are baseline modes. Fuzzy, phonetic, multilingual, and transliteration matching are extension points and require clinical, privacy, performance, and data-quality review before activation.

## Medical Records

Medical Records remains the custodian of legal record availability and filing status. Search may expose governed record-location or completeness information through a published contract; it must not bypass Medical Records ownership or direct database boundaries.

## Performance and Privacy

Search must be indexed, bounded, rate-limited, observable, and scoped. Search logs must be auditable without storing more patient data than required. Failed or ambiguous searches should guide safe resolution rather than encourage registration of a new identity.
