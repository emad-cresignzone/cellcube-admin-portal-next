---
name: feature-sliced-frontend
description: >-
  Architecture and coding-standard skill for feature-sliced TypeScript
  front-end applications (React / Next.js App Router, Redux Toolkit, Formik +
  Yup, Tailwind, key-based i18n). Use when creating a feature, adding a screen,
  wiring a data layer or API module, adding state, writing a form, or
  refactoring existing front-end code toward a consistent structure. Encodes a
  strict data-layer seam, fixed feature anatomy, one read/write hook per
  feature, and a single error-reporting contract — plus explicit rules for
  applying all of it to an existing codebase without breaking behaviour.
---

# Feature-Sliced Front-End Architecture

## 1. Skill Overview

This skill describes how to structure and write code in a feature-sliced
front-end application. It was reverse-engineered from a production TypeScript /
React / Next.js App Router codebase and generalised so it can be installed into
other projects.

It covers: folder layout, feature anatomy, the data-layer seam, state
management, hooks, forms and validation, error reporting, i18n, styling,
naming, imports, comments, in-file code ordering, dependency boundaries, and
the workflows for both new features and existing code.

**Two modes of use:**

- **New project / new feature** — this is the architectural baseline. Follow it.
- **Existing project** — this is a *direction*, not a mandate. Read
  [§25 Existing Code Modification Workflow](#25-existing-code-modification-workflow)
  and [§26 Refactoring Rules](#26-refactoring-rules--preserve-behaviour)
  **before** touching anything. Do not restructure a codebase because it
  differs from this document.

**Rule levels** are marked throughout: **MUST**, **SHOULD**, **MAY**, **AVOID**.

Where a rule could not be derived with confidence from evidence, it is marked
`Project convention could not be confidently determined.` — such rules are open
questions for the host project to answer, not defaults to invent.

---

## 2. Core Philosophy

1. **A feature owns its whole vertical slice.** UI, state, data access,
   validation, types and constants for one domain live together. Crossing a
   feature boundary is possible but should be rare and deliberate.
2. **There is exactly one seam where data comes from.** Every feature has a
   data-layer module. It is the only place that knows whether rows come from an
   HTTP call, a cache, a mock or a static fixture. Swapping the source must not
   change anything above it.
3. **Components consume one hook, not the store.** A feature exposes its
   read/write surface as a hook. Screens call the hook. They do not select
   state, dispatch actions, or call the transport.
4. **Separate when there is an architectural reason, not because you can.**
   No wrapper components, no one-line abstractions, no folders with a single
   trivial file, no interfaces that restate a literal.
5. **Consistency over cleverness.** Repeated shapes are extracted into shared
   reducers / factories / helpers so parallel modules cannot drift apart.
6. **Behaviour is sacred.** Structure improvements never change what the app
   does. See [§26](#26-refactoring-rules--preserve-behaviour).

---

## 3. Architecture Principles

**MUST**

- Keep a **one-directional dependency graph**:

  ```
  routes/pages  →  features  →  shared (components, hooks, lib, types, utils, vendored packages)
  ```

  Shared layers **MUST NOT** import from a feature. A shared module that needs a
  domain vocabulary means the vocabulary belongs in the shared types layer, not
  that the import direction may be reversed.

- Keep route/page files **thin**. A page resolves its params, optionally awaits
  the data layer, picks a component, and renders it. Business logic, layout
  composition and state belong in the feature.

- Put every piece of domain logic in a feature, even a small one. "Where does
  this go?" should never be answered by "the page file".

**SHOULD**

- Give a feature the same internal anatomy as every other feature, so a
  developer who knows one knows all of them.
- Extract a shared factory/helper when the *third* near-identical copy appears,
  not the second.

**AVOID**

- Layer-first top-level folders (`/components`, `/services`, `/hooks` holding
  domain code). Shared folders hold only genuinely cross-feature code.
- Cyclic imports between features. If two features need each other, the shared
  part belongs in the shared layer.

---

## 4. Project Structure

The canonical top-level layout (names may be adapted to the host project's
framework; the *roles* must be preserved):

```
src/
├── app/ (or pages/, routes/)  thin route shells only
├── components/                shared, cross-feature UI
│   ├── ui/                    primitives (Button, Badge, Card, Modal, …)
│   ├── layouts/               app chrome (top bar, sidebar)
│   ├── form/                  framework-form bridges/adapters
│   ├── i18n/                  locale-aware navigation wrappers
│   ├── constants/             shared style/config tables
│   ├── interfaces/            props types for the shared components
│   └── utils/                 helpers used only by shared components
├── context/                   app-wide providers
├── features/<domain>/         ⭐ almost all logic lives here
├── hooks/                     genuinely cross-feature hooks
├── lib/                       infrastructure: transport, i18n, storage, export
├── packages/                  vendored third-party libs copied into the repo
├── store/                     root store, middleware, hydration, provider
├── types/                     shared type aliases and vocabularies
├── utils/                     shared pure helpers
└── <routing middleware>
```

**MUST**

- Configure a path alias for the source root (`@/*` → `./src/*`) and use it for
  every cross-directory import.
- Keep `lib/` free of any domain knowledge. `lib/` is *how*, features are *what*.

**SHOULD**

- Put a type in `types/` when a data or feature module needs it and putting it
  next to a component would invert the dependency direction (e.g. a colour-tone
  or status vocabulary that fixture data references).
- Keep vendored third-party code in its own top-level folder, untouched, and
  follow its existing prop contracts rather than rewriting it.

**MAY**

- Omit any shared folder the project does not actually need. Do not create empty
  scaffolding.

---

## 5. Feature Organization

### 5.1 Feature anatomy

```
features/<domain>/
  components/    UI for this domain (client components)
  constants/     static data, frozen vocabularies, config tables
  hooks/         the feature's read/write surface
  interfaces/    the feature's types (API shapes, view shapes, props, hooks)
  models/        ⭐ the data layer — the only module that knows the data source
  routes/        endpoint path constants
  store/
    initials/    initial state per slice
    interfaces/  state types per slice
    slices/      the slices
    store.ts     the feature's reducer map
  utils/         pure derivations for this domain
  validations/   schema factories
  __tests__/     tests, mirroring the sub-folders above
```

**MUST**

- Create only the sub-folders the feature actually uses. A read-only catalogue
  feature needs no `validations/`; a feature with no writes needs no mutation
  plumbing.
- Keep the folder *names* identical across features. Consistency here is the
  whole point.

**SHOULD**

- Nominate one small, complete feature as the project's **canonical reference**
  and keep it exemplary. New features are written by reading it, not by reading
  documentation.

**AVOID**

- Adding a new sub-folder concept to one feature only. If a feature genuinely
  needs a new kind of module, either it belongs in an existing folder or the
  convention changes for everyone.
- Barrel `index.ts` files inside a feature. Import the concrete module. (Barrels
  are acceptable only for an infrastructure module in `lib/` that is genuinely
  consumed as one unit.)

### 5.2 Feature boundaries

**MUST**

- Import across features through the alias (`@/features/<other>/…`) and only
  from its **stable surface**: its hooks, its `interfaces/`, its pure `utils/`,
  or its frozen vocabularies.

**SHOULD**

- Treat a cross-feature import as a design signal. If a feature reaches into
  three others, the shared concept probably belongs in the shared layer.

**AVOID**

- Importing another feature's slice, initial state, or data-layer module
  directly from a component or hook. The **root store wiring is the single
  exception** — it exists precisely to compose slices.

---

## 6. File Organization

**MUST**

- **One component per file.** A file exporting a component exports exactly one.
  If a screen needs a sub-part, that sub-part gets its own file.
- Name the file after what it exports (`RoleForm.tsx` exports `RoleForm`).

**SHOULD**

- Keep files focused enough that the section banners (§18) stay short. A
  component whose `Variables` section runs for 100 lines is really two
  components, or a component plus a hook.

**AVOID**

- Splitting a file only to make it smaller. A 200-line screen with one clear
  responsibility is correct; four 50-line files that only exist together are not.

---

## 7. Separation of Concerns

This is the spine of the architecture. Each layer answers exactly one question.

| Layer | Answers | Never does |
|---|---|---|
| `routes/routes.ts` | *What is the endpoint path?* | Call anything |
| `models/` | *Where does the data come from?* | Know about React, Redux, or presentation |
| `utils/` mappers | *What shape does the UI want?* | Perform I/O, hold state |
| `store/slices/` | *What is the current state?* | Talk to the transport directly (it calls `models/`) |
| `hooks/` | *What may a component read and do?* | Render |
| `components/` | *What does it look like?* | Fetch, select raw state, know endpoints |
| `validations/` | *Is this input acceptable?* | Submit |
| `constants/` | *What are the fixed values?* | Compute |

**MUST**

- Components **MUST NOT** call the transport client. Zero exceptions.
- Components **MUST NOT** import a feature's static/fixture *entity* data
  module. The only permitted import from `constants/` into a component is a
  **frozen vocabulary** — an enum-like list of statuses, types, permissions or
  levels. Entities go through `models/` → store → hook.
- Endpoint URLs **MUST NOT** be inlined at a call site. They live in
  `routes/routes.ts` as a `const` object, with functions for parameterised paths.
- Mapping between backend shapes and view shapes **MUST** be a pure function in
  `utils/`, never inline inside a slice, a hook or a component.

**SHOULD**

- Components read state through the feature hook. Direct `useSelector` in a
  component is a deviation to be justified, not a pattern to copy.

---

## 8. Components

### 8.1 Structure

**MUST**

- Mark interactive components as client components where the framework requires
  it (`"use client"` at the top of the file, before imports).
- Keep server/data-layer boundaries honest: files under `models/`, `utils/`,
  `store/` and `lib/` **MUST NOT** be client-marked unless they genuinely use a
  browser-only API.
- Export a screen/dialog/section component as the **default export**.
- Export a small presentational primitive (badge, button, card part, label) as a
  **named export**.

  *Why the split:* defaults are for the "one thing this file is"; named exports
  are for the small vocabulary pieces that get imported in groups.

- Declare props types in the feature's `interfaces/` folder, **not inline in the
  component file**. Import them as `import type { XProps } from "../interfaces/…"`.

**SHOULD**

- Compose screens out of shared primitives (page header, card, table, empty
  state, modal, confirm dialog, pagination) rather than re-styling markup.
- Keep derived values in `useMemo` when they feed a memo-sensitive child (table
  columns, option lists), and plain otherwise.

**AVOID**

- Wrapper components that only forward props.
- Prop-drilling state that the feature hook can supply directly at the leaf.

### 8.2 In-file ordering

A component file reads top to bottom in a fixed order. Sections are marked with
banner comments (§18) and **omitted when empty**:

```
"use client"
imports
doc comment
export default function Screen() {
  context / router / shared hooks

  //  Reducers    → the feature hook(s) and any state selection
  //  Variables   → local state, derived values, memoised tables/columns
  //  Methods     → event handlers and callbacks
  //  Mutations   → effects, dispatched writes
  //  Conditions  → early returns (missing record, empty, unauthorised)
  //  Render      → only when the JSX needs its own marker

  return (…)
}
```

**MUST** — keep this relative order. A `Conditions` early-return block comes
after the values it tests, and before the main `return`.

**MAY** — repeat a section with a qualifier when a file has two distinct groups
(e.g. `Variables — table`). Use sparingly.

### 8.3 Reusable UI

**MUST**

- Put a component in the shared UI folder only when **two or more features** use
  it, or it is obviously a primitive of the design system.
- Give shared primitives a props interface in the shared `interfaces/` folder.

**SHOULD**

- Give style variants a small lookup table (a `constants/` or `utils/` style
  function) rather than conditional class strings scattered across call sites.

**AVOID**

- Feature-specific components in the shared folder. If it names a domain
  concept, it belongs to that domain.

---

## 9. Hooks

**MUST**

- Give each feature **one hook per consumable surface**, and make it the entire
  read/write API for the components of that surface. It returns the data plus
  the callbacks that mutate it.
- Name hooks `use<Feature><Surface>` — e.g. `useXCollection`, `useXRecords`,
  `useLiveX`. The name says which surface, not which slice.
- Wrap returned callbacks in `useCallback` so consumers can memoise safely.
- Declare the hook's return type in `interfaces/<Feature>Hooks.ts` when the
  surface is stable and consumed widely; a small internal hook **MAY** rely on
  inference.

**SHOULD**

- Put the "fetch when not loaded" effect inside the hook, never in a component.
- Keep hooks free of JSX. A hook that builds table columns containing JSX is a
  known, deliberate exception — name it `.tsx` and keep it in `hooks/`.
- Return a memoised object (`useMemo`) when the hook has many members and
  consumers pass it down.

**AVOID**

- A hook that only wraps `useSelector` for one field. Read it in the existing
  surface hook instead.
- Two hooks that both own writes for the same entity. One surface, one hook.

---

## 10. Services / API / Data Layer

### 10.1 The seam

```
routes/routes.ts        endpoint constants
        ↓
models/<x>.ts           the data layer — the ONLY module that performs I/O
        ↓
utils/<x>Mappers.ts     pure backend-shape → view-shape functions
        ↓
store/slices/           thunks call models/, reducers store views
        ↓
hooks/use<X>()          the components' whole surface
        ↓
components/
```

**MUST**

- Keep **one transport client** in `lib/`. It owns base URL, headers, auth
  token, query serialisation, response-envelope unwrapping and error
  normalisation — and knows **nothing** about any domain.
- Let only `models/` call that client. Anything else calling it is a bug.
- Model functions are `async`, take plain arguments, return **view shapes**, and
  accept an `AbortSignal` where cancellation matters.
- Define **two type families** when a backend shape differs from what the UI
  renders:
  - `<Entity>Dto` — exactly what the backend sends (optional/nullable as the
    backend actually is).
  - `<Entity>View` — exactly what the UI needs (no nulls where the UI shows a
    placeholder; formatted values resolved).

  Keep them in separate files under `interfaces/`.
- Convert with **pure mapper functions** in `utils/`. Mappers never throw on
  missing optional data — they substitute the UI's placeholder.
- Normalise transport failures into a **single error type** carrying at minimum
  a human-readable message, a status, and any structured field errors.

**SHOULD**

- Put pagination/envelope plumbing in `lib/` generically, so features do not
  each re-implement "find the list inside the response".
- Bound any "fetch every page" helper with an explicit maximum and deduplicate
  by id. Never loop unbounded against a remote endpoint.
- Document a non-obvious backend contract in a comment **at the route or model
  where it bites** (odd parameter order, a missing relation, an endpoint that
  omits a field), not in a separate document that will go stale.

**AVOID**

- Building a request URL by string concatenation at a call site.
- Mapping inside a component ("just this once").
- Silently swallowing an error and rendering an empty list — see §16.

### 10.2 Dual-source projects (real backend + fixtures/mocks)

Some projects run the same UI against either a live backend or bundled
fixtures. When that is the case:

**MUST**

- Gate on **one exported flag** derived from configuration, read from `lib/`.
- Keep the fixture path and the live path as **separate modules** at every
  layer (`models/x.ts` vs `models/live/x.ts`, `xSlice` vs `liveXSlice`,
  `useX` vs `useLiveX`, `XScreen` vs `LiveXScreen`). Do not thread a boolean
  through one implementation.
- **Never fall back to fixture data when a live request fails.** A failed
  request renders an error state. A fabricated row is worse than an error.
- When the backend has no endpoint for a capability, the capability is
  **absent** in live mode — not simulated client-side. Gate the route (return a
  not-found) rather than shipping a fake.

**SHOULD**

- Do the branch in the route shell (`if (LIVE) return <LiveScreen />`), so the
  two implementations stay independently readable.

---

## 11. State Management

### 11.1 Store composition

**MUST**

- Each feature exports a plain object of reducers from `store/store.ts`:

  ```ts
  import xReducer from "./slices/xSlice";
  const XStore = { xReducer };
  export default XStore;
  ```

- The root store spreads those objects. This makes the mounting rule
  mechanical: **a slice named `x` is always read at `state.xReducer`.** Rely on
  it; do not rename keys at the root.
- Export `RootState`, `AppDispatch` (and a thunk type if used) from one place
  and type every `useSelector` / `useDispatch` with them.

### 11.2 Canonical state shapes

**MUST**

- Identify the small number of state *shapes* the app actually needs and give
  each one: a type, an initial-state factory, and a set of shared reducer
  bodies. Slices then wire those bodies rather than re-implementing them.

  In the reference codebase these were: a **CRUD collection** (immutable
  baseline + created + updated + deleted overlay), a **record overlay** (rows
  plus soft-delete/status overrides, no create/update), and a **read-only
  list**. A host project may need a different set — but it **MUST** have *a*
  set, and parallel slices **MUST** share it.

- Include an async status and an error field in every shape, even when the
  current data source is synchronous. Swapping in a real request must not change
  the shape.

**SHOULD**

- Write shared reducer bodies as functions that mutate the Immer draft in place,
  so a slice wires one with `reducers: { createX: applyCreate }`.
- Keep derivations (merge overlays, split live/trashed, project the persistable
  delta) as **pure selector functions** in the shared `utils/`, invoked from a
  `useMemo` inside the surface hook.

**MAY**

- Skip a memoised-selector library when derivations are cheap and already
  memoised at the hook. If the project *does* adopt one, adopt it everywhere.

### 11.3 Async writes

**MUST**

- Use the toolkit's async-thunk primitive. One thunk per endpoint call.
- Catch in the thunk and `rejectWithValue` a **normalised failure object**
  (message + optional field errors). Do not let a raw error reach a reducer.
- Read a rejection's text from the **serialized** error the toolkit produces
  (`action.error.message`), never via `instanceof Error` — the instance does not
  survive serialisation.
- Ignore an **aborted** request in the rejected reducer; an abort is not a
  failure and must not paint an error.
- Keep a `mutation` sub-state (in-flight flag + last error) for a slice's writes,
  shared across all of them via a matcher rather than duplicated per thunk.

**SHOULD**

- **Backend first, then UI.** Do not write optimistically. Await the thunk, then
  either invalidate and refetch, or patch the cached row from what the response
  actually confirmed.
- Prefer **invalidate + refetch** as the default. Only patch the cache in place
  when the response genuinely confirms the new values, and say so in a comment.
  A create whose response carries a message but no row has no id to insert —
  that write invalidates.
- Guard against duplicate in-flight requests with the thunk's `condition` option
  when two mounted consumers can fire the same load effect.
- Declare any non-serialisable payload (a `File` on a thunk argument, a raw
  login response) in the store's serialisability configuration rather than
  disabling the check wholesale.

**AVOID**

- Optimistic updates that fabricate an id. If the response carries no row, ask
  the backend again.
- Reducers that perform I/O or read from storage.

### 11.4 Persistence (when the project persists state)

**MUST**

- Mirror state to storage from **middleware keyed off the action stream**, not
  from ad-hoc calls after each mutation.
- Skip persistence on the server, and skip re-persisting a hydration action.
- Persist only the **delta** the app authored, never the full baseline.
- Replay persisted state from an **effect after mount**, not at module scope,
  when the framework server-renders — applying it earlier desyncs hydration.
- Preserve existing storage keys and payload shapes when refactoring. Changing
  them silently discards users' local state.

---

## 12. Types / Interfaces / Models

**MUST**

- Put a feature's types in `features/<domain>/interfaces/`, one file per
  concern, with a consistent naming scheme. The reference scheme:

  | File | Holds |
  |---|---|
  | `<Entity>Api.ts` | the domain entity as the app models it |
  | `<Entity>Dto.ts` | the raw backend shape |
  | `<Entity>View.ts` | the presentation shape (+ page/form-value shapes) |
  | `<Feature>Props.ts` | props for this feature's components + form-value types |
  | `<Feature>Hooks.ts` | the return types of this feature's surface hooks |

- Put a type in the shared `types/` folder **only** when more than one feature
  needs it, or when keeping it in a feature would invert the dependency
  direction.
- Use `import type` for type-only imports.
- Prefer `interface` for object shapes and `type` for aliases/unions.
- Derive union types from a `const` tuple rather than hand-writing both:

  ```ts
  export const tones = ["blue", "red", "purple"] as const;
  export type Tone = (typeof tones)[number];
  ```

**SHOULD**

- Document non-obvious fields with a one-line doc comment on the field, not a
  paragraph above the interface.
- Split an entity type explicitly when part of it is a **payload shape** and
  part is **presentation/workflow state** — and derive display values rather
  than storing them twice.
- Document deliberately coexisting id conventions (e.g. slug ids in one data
  space, integer ids in another) and confine the conversion to **one** module.

**AVOID**

- `any`. Narrow `unknown` with a type guard instead.
- Interfaces that exist only to be spread into one component.
- Duplicating a backend shape and a view shape in one interface with everything
  optional.

---

## 13. Constants and Utilities

**MUST**

- `constants/` holds values that never compute: fixed vocabularies, fixture
  data, table metadata, filter definitions, style lookup tables, field-error
  maps. Freeze vocabularies with `as const`.
- `utils/` holds **pure functions only** — no state, no I/O, no React.
- Keep a formatting/derivation rule in exactly one place so every screen renders
  it identically (initials, date formatting, status resolution, id minting).

**SHOULD**

- Keep a feature's constants in that feature. Promote to shared `utils/` only on
  the second real consumer outside the feature.

**AVOID**

- A `helpers.ts` / `misc.ts` grab-bag. Name the file after what it derives.
- Re-implementing a derivation locally "because importing felt heavy".

---

## 14. Forms and Validation

**MUST**

- Put validation schemas in `features/<domain>/validations/` as **factory
  functions that take the translate function** (and any dynamic context, such as
  the set of already-taken names) and return the schema. Build them inside
  `useMemo` keyed on those inputs so messages re-resolve on locale change.
- Route every form control through the project's single form-field component so
  labels, hints, required markers, error rendering and accessibility attributes
  are identical everywhere.
- Declare form-value types in `interfaces/<Feature>Props.ts` (or the view file
  for backend-backed forms), never inline.
- Bridge a type mismatch between the form library and the domain **once, in a
  shared adapter component** (e.g. a select that speaks numeric ids while the
  underlying control speaks strings). Do not cast at each call site.

**SHOULD**

- Set `enableReinitialize` when a form's initial values come from asynchronously
  resolved data.
- Exclude the record being edited from any uniqueness check, so re-saving
  unchanged does not trip the rule.
- Trim string values at the submit handler, not in the schema.

**AVOID**

- Validation logic duplicated in the component *and* the schema.
- Building a message string by concatenation instead of an interpolated
  catalogue key.

---

## 15. Error Handling

This is the most opinionated area of the skill, and the most valuable to carry
across projects.

**MUST**

- Have **one contract** for reporting the outcome of a write, implemented once
  as a shared hook/helper, and used by every feature:

  1. Await the dispatched write.
  2. On success → success toast.
  3. On failure → hand the normalised failure back to the caller, and toast it
     **unless** the caller is a form that will render it under its inputs.

- Split failures by whether an input can fix them:

  - **Field-keyed validation failure (e.g. HTTP 422)** → every message goes
    **under the input it names**. No toast, because the fields already say it.
  - **Everything else** (auth, permission, not-found, conflict, server, network)
    → **a toast**. No input can hold it.

- **Never render a general error block inside a form.** It duplicates the toast
  word-for-word and pushes field messages out of view.

- Map backend error keys to form field names through a **declared map per form**
  kept in `constants/`, not by guessing at the call site. The map handles:
  - flat keys → one field,
  - indexed keys that belong to a single control (`files.0` → `files`),
  - indexed keys that address a real per-row input (`rows.0.qty` stays intact) —
    these fields are listed explicitly as "indexed".
- **Never drop a message.** Keys the form renders no input for are surfaced
  (toast) rather than discarded.
- When pinning a message onto a field, also mark the field **touched** — most
  form libraries hide errors for untouched fields, so a server error the user
  never typed into would stay invisible.
- Focus and scroll to the **first** offending field.

**SHOULD**

- Provide the same behaviour by hand for dialogs without a form library: map →
  set the one field's error → toast the unmapped remainder → toast
  non-validation failures.
- Let a rejected **list** fetch mark the list as *attempted* (`loaded = true`) as
  well as failed. Otherwise a "fetch if not loaded" effect retries forever
  against a failing endpoint.
- Give an error region `role="alert"`.
- Restrict any debug logging of failed requests to non-production builds, and
  never log headers or credentials.

**AVOID**

- `alert()` / `confirm()` / `prompt()`. Use the project's modal and confirm
  dialog. *(In the reference codebase a handful of legacy fixture-only screens
  still call `window.confirm`; that is a known deviation being retired, not the
  rule. New code, and any screen you touch, uses the shared confirm dialog.)*
- Logging an error and continuing as if it succeeded.
- Rendering fabricated/placeholder rows after a failed request.

---

## 16. Loading, Empty and Error States

**MUST**

- Model async status explicitly in state (`idle | pending | succeeded | failed`,
  or an equivalent flag pair) — even when the current data source is
  synchronous.
- Render three distinct states for any async surface: **loading**, **empty**
  (succeeded, no rows), **error**. They are not interchangeable.
- Use the shared empty-state and spinner components rather than ad-hoc markup.

**SHOULD**

- Give a failed load a **manual retry** affordance that re-dispatches the same
  fetch.
- Show in-flight state on the control that triggered it (a `loading` prop on the
  button), and disable it while the request runs so a second click cannot fire.
- Guard a confirm dialog against closing while its action is in flight.
- Where an initial data source is already in memory, initialise the slice at
  "succeeded" so the first paint matches a loaded screen — no skeleton flash.
  The seam to a real request must then be a one-line change to the initial state.

**AVOID**

- A spinner that replaces the whole page for a partial update.
- Treating "empty" as "error" or vice versa.

---

## 17. Localization

Applies when the project is localised. If it is not, skip this section rather
than introducing i18n.

**MUST**

- Keep one flat message file **per locale per module**
  (`messages/<locale>/<module>.json`).
- Key messages by the **source-language sentence**, not by dot paths:
  `t("Create item")`, not `t("items.create.button")`. A missing translation then
  degrades to a readable sentence instead of a key.
- Make the type system enforce completeness: derive a `MessageKey` union from
  the source-language catalogue and type every other locale as
  `Record<MessageKey, string>`, so a missing message is a **compile error**.
- Type every `*Key` prop (`titleKey`, `labelKey`, …) as `MessageKey` so an
  unknown id cannot reach runtime.
- Keep keys globally unique. When two screens need the same word with different
  translations, **qualify the loser** — `"Category (settings)"` — rather than
  splitting namespaces.
- Map enum values to keys through an explicit lookup table. **Never build a key
  by string interpolation from a value** — it defeats the type check.
- Interpolate with named slots (`{{count}}`), never by concatenation.

**SHOULD**

- Alias the translate function in the shared `types/` folder so non-component
  code (validation schemas, mappers) can accept it without importing the
  provider.
- Add every new message to **all** locale files in the same change.

### Routing and direction

**MUST** (locale-prefixed routing)

- Use the project's locale-aware `Link` and router wrappers everywhere in app
  code. Importing the framework's raw `Link` / `useRouter` **drops the locale
  prefix** and is a bug.
- Decide the un-prefixed-path rule **once**, in routing middleware, and state it
  in a comment. If the product has a default locale, the URL is the only thing
  that may override it — do not silently negotiate from a cookie or
  `Accept-Language` unless that is the intended product behaviour.
- Use logical CSS properties (`margin-inline-start`, `ps-`/`pe-`, `start`/`end`)
  rather than physical left/right, and flip directional icons, when any
  supported locale is RTL.

**MAY**

- Keep a fully-built locale out of the language picker (catalogue and routes
  still compile and resolve) when the product is not ready to ship it. Drive both
  the picker and any auto-selection from **one** "selectable locales" list.

---

## 18. Comments and Documentation

**MUST**

- Open a non-trivial module with a short doc comment saying **what it is and why
  it exists** — especially the constraint that shaped it.
- Mark in-file sections with the banner comment, using **only** the approved
  vocabulary, in this order:

  ```
  /**
   * --------------------------------------------------
   *  Functions
   * --------------------------------------------------
   */
  ```

  Vocabulary: `Reducers`, `Variables`, `Methods`, `Mutations`, `Conditions`,
  `Functions`, `Render`. Omit any section that is empty.
  - `Functions` is used in non-component modules (models, utils, mappers, lib).
  - `Reducers → Variables → Methods → Mutations → Conditions → Render` is the
    component and hook order.
  - Slices use `Functions` (helpers) → `Mutations` (thunks) → `Reducers`.
- Keep the banner geometry identical everywhere (a fixed rule width — 50 dashes
  in the reference codebase — and two spaces before the title). Consistency is
  the point; the exact width is a project choice made once.

**MAY**

- Use a single-line variant inside a long list or object:
  `//  --------------------------------------------------  Live modules`

**SHOULD**

- Comment the **why**, never the what. Prefer explaining a constraint ("the
  index is the only endpoint that returns members"), a deliberate deviation, or
  a preserved legacy behaviour.

**AVOID**

- Restating the code (`// set the name`).
- Commented-out code left behind.
- Banners in a file with no sections to mark.

---

## 19. Naming Conventions

**MUST**

| Thing | Convention | Example |
|---|---|---|
| Component file & export | `PascalCase` | `RoleForm.tsx` → `RoleForm` |
| Hook file & export | `camelCase` starting `use` | `useRolesCollection.ts` |
| Model / util / constant file | `camelCase` | `orderMappers.ts` |
| Type/interface file | `PascalCase` | `RoleApi.ts` |
| Slice file | `<name>Slice.ts` | `rolesSlice.ts` |
| Route constants object | `<feature>Routes` | `rolesRoutes` |
| Feature reducer map | `<Feature>Store` | `RolesStore` |
| Reducer key | `<sliceName>Reducer` | `rolesReducer` |
| State type | `<Feature>State` | `RolesState` |
| Initial state | `initial<Feature>State` | `initialRolesState` |
| Schema factory | `<entity>Schema` | `roleSchema` |
| Props interface | `<Component>Props` | `RoleFormProps` |
| Form values interface | `<Entity>FormValues` | `RoleFormValues` |
| DTO / View types | `<Entity>Dto` / `<Entity>View` | `GroupDto` / `GroupView` |
| Thunk | `fetchX` / `createXThunk` | — |
| Boolean | reads as a predicate | `isActive`, `hasMembers`, `canEdit` |

**SHOULD**

- Prefix a whole parallel implementation consistently (e.g. `Live…` for the
  backend-backed variant) across **every** layer: interfaces, models, mappers,
  slices, hooks, components. A reader must be able to tell which world a file
  belongs to from its name alone.
- Name a model function after the operation, not the endpoint verb:
  `listGroupsPage`, `getGroupWithMembers`, `createGroup`.

**AVOID**

- Abbreviations that are not already domain vocabulary.
- `data`, `item`, `obj`, `temp` where a real name is available.

---

## 20. Imports and Exports

**MUST**

- **Inside a feature → relative imports** (`../interfaces/RoleApi`).
  **Outside a feature → the alias** (`@/components/ui/Button`).
  This makes a feature relocatable and makes cross-feature coupling visible in
  the diff.
- Use `import type` for types.
- Default-export screen/dialog components, slice reducers, and the feature
  reducer map. Named-export everything else (utils, models, hooks, constants,
  types, small primitives).

**SHOULD**

- Order imports: framework/React → third-party → shared alias imports →
  relative imports, with type-only imports grouped at the end of their block.
  *(Applied consistently in intent across the reference codebase but not
  machine-enforced there — treat it as a strong convention, not a lint rule,
  unless the host project adds one.)*

**AVOID**

- Barrel files inside features. They hide dependency direction and defeat
  tree-shaking for little gain.
- Deep imports into another feature's `store/` or `models/`.

---

## 21. Styling and UI

**MUST**

- Use the project's **semantic design tokens** — surface, canvas, ink,
  ink-secondary, muted, outline, divider, brand, danger, warn, success — and
  **not raw palette colours**. Raw colours break theming.
- Define tokens once as CSS custom properties per theme and map them into the
  utility framework's theme layer. Adding a colour means adding a token.
- Set the theme attribute **before paint** (an inline script in the document
  head) and mark the root element to suppress the resulting hydration mismatch.
- Use logical spacing/positioning utilities when any locale is RTL.

**SHOULD**

- Compose class strings with the project's class utility (`clsx` or equivalent)
  rather than template-literal concatenation with conditionals.
- Constrain intrinsically narrow content (a two-column table, a single-field
  form) with a `max-w-*` rather than letting it stretch across a wide viewport —
  and say why in a comment when the value is non-obvious.

**AVOID**

- Inline `style` objects for anything the token system covers.
- Changing visual design during an architectural refactor. See §26.

---

## 22. Authentication and Authorization

Applies when the project has a session. Adapt, do not import wholesale.

**MUST**

- Keep the credential (token) accessor in the **infrastructure layer**, not the
  auth feature — the transport client reads it on every request and `lib/` must
  not depend on a feature. The auth feature *writes* it; the client only reads.
- Guard every storage access with a `typeof window === "undefined"` check and a
  `try/catch`, returning a safe default. Storage can be unavailable.
- Narrow any stored identity through a **type guard** before use. Never cast a
  parsed JSON blob into a typed shape.
- Express an authorization decision as a **named hook or predicate**
  (`useCanManageX(ownerId)`), used by every screen that gates on it — never an
  inline comparison repeated across components.
- **Default to denying** when the information needed to decide is missing
  (unknown owner, absent session). Never guess in the user's favour.

**SHOULD**

- Keep the client-side check aligned with the server's rule and treat it as UX,
  not enforcement.

---

## 23. Dependency Boundaries — the hard rules

These are the invariants worth checking mechanically in review:

| # | Rule |
|---|---|
| 1 | `lib/`, `types/`, `utils/`, `components/`, `hooks/` **never** import from `features/` |
| 2 | Components **never** import the transport client |
| 3 | Components **never** import a feature's entity fixture module (frozen vocabularies excepted) |
| 4 | Only `models/` performs I/O |
| 5 | Endpoint strings exist only in `routes/` |
| 6 | Only the root store imports another feature's slice |
| 7 | `models/`, `utils/`, `store/`, `validations/` contain no JSX and no React imports |
| 8 | App-code navigation goes through the project's `Link` / router wrapper, never the framework's raw ones (the wrapper itself is the sole importer of the framework's) |

**Two carve-outs worth naming, because they recur:**

- **App chrome consuming the session feature** (a user menu reading the auth
  hook) is an accepted exception to rule 1. It is chrome, not a primitive.
- **A shared UI primitive reaching into a feature for a type or a label
  vocabulary** is *not* an exception — it is rule 1 firing correctly. The fix is
  to move that type/vocabulary into the shared `types/` layer, not to allow the
  import. In the reference codebase a small number of shared primitives still
  import a feature type; those are known debt, not the pattern to copy.

---

## 24. New Feature Workflow

Follow in order. Skip a step only when the feature genuinely has no such
concern.

1. `interfaces/<Entity>Api.ts` — the domain shape. (For a backend-backed
   feature: `<Entity>Dto.ts` + `<Entity>View.ts`.)
2. `constants/<entity>Data.ts` — fixtures / frozen vocabularies, if any.
3. `routes/routes.ts` — endpoint constants.
4. `models/<entity>.ts` — the async data layer over whichever source.
5. `utils/<entity>Mappers.ts` — pure DTO → View mapping, if the shapes differ.
6. `store/interfaces/`, `store/initials/`, `store/slices/`, `store/store.ts`.
7. Root store — spread the feature's reducer map. Add a persistence/hydration
   line only if the slice persists.
8. `hooks/use<Feature>.ts` — the components' only surface.
9. `interfaces/<Feature>Hooks.ts` + `interfaces/<Feature>Props.ts`.
10. `validations/<entity>Schema.ts` — if the feature has a form.
11. `constants/<entity>FieldErrorMap.ts` — if the form submits to a backend.
12. `components/` — client components consuming only the hook.
13. Route shell — resolve params, pick the component, render.
14. Add every new message to **all** locale catalogues.
15. Tests for the pure layers (§28).
16. Run the verification checklist (§28).

---

## 25. Existing Code Modification Workflow

**When this skill is installed into an existing project, it does not authorise a
rewrite.**

**MUST**

1. **Inspect before proposing.** Read the actual feature: its data flow, its
   state shape, its consumers. Do not assume this document describes it.
2. **Scope to the task.** Apply the conventions to the code you are already
   changing for a real reason. Do not open unrelated files to "align" them.
3. **Find every consumer** of anything you move or rename — imports, dynamic
   references, storage keys, action type strings, route paths, test files.
4. **Match the local dialect** when it conflicts with this skill *within a file
   you are only lightly touching*. A file that is 90% one style should not
   become 50/50.
5. **Make the smallest safe change** that accomplishes the task and moves the
   code toward the convention.
6. **Verify** (§28) before reporting done.

**SHOULD**

- Raise larger structural mismatches as a **recommendation with a cost
  estimate** and let the human decide. Say what would improve and what would be
  at risk.
- Prefer a sequence of small reversible commits over one large one.

**AVOID**

- Renaming files or exports project-wide as a side effect of a feature task.
- Introducing this skill's folder anatomy into a feature that does not need it
  yet — e.g. creating empty `validations/` and `routes/` folders "for later".
- Converting a working pattern (a different state library, a different form
  library) to this document's choice. **The principles port; the library choices
  do not.** Apply the *separation* rules using whatever the project already uses.

---

## 26. Refactoring Rules — Preserve Behaviour

**This is non-negotiable. Architectural and code-quality work MUST NEVER change
what the application does.**

**MUST preserve, exactly:**

- Business logic and every edge case, including ones that look like bugs — if
  something looks wrong, **report it, do not fix it silently**.
- API request shapes, parameter names, ordering, headers and response handling.
- State transitions, action names, action type strings, and store keys.
- Storage keys and persisted payload shapes.
- Authentication and authorization behaviour.
- Validation rules and their messages.
- Routing, URL shapes, redirects and locale prefixes.
- Loading, empty and error states, and when each appears.
- All user interactions: click targets, keyboard behaviour, focus handling,
  dialog open/close semantics.
- Visual output: layout, spacing, colours, responsive breakpoints.
- Accessibility attributes: roles, labels, `aria-*`, focus order.
- Localization: every existing key keeps its id and its text.

**Procedure for any structural change:**

1. Identify all consumers and references.
2. Read and understand the current runtime behaviour, including error paths.
3. Change the structure **without touching logic** — move, extract, rename,
   re-type only.
4. Keep public interfaces stable where you can. When a signature must change,
   change every call site in the same commit.
5. Verify (§28).
6. If behaviour must change to satisfy the task, **state that explicitly** in
   the summary rather than folding it into a refactor.

**Explicitly out of bounds during a refactor**

- Redesigning UI.
- Changing an API contract.
- "Improving" copy, labels or messages.
- Reshaping data structures without auditing every consumer.
- Deleting code that looks unused without proving it is.
- Adding a dependency.

---

## 27. Anti-Patterns

**AVOID — architecture**

- Business logic in a route/page file.
- A component that fetches.
- A hook that renders.
- A util that has state or performs I/O.
- A slice that talks to the network directly instead of through `models/`.
- Cross-feature imports of internal modules.
- Barrels inside features.

**AVOID — over-engineering** *(as important as the rules above)*

- A folder holding one trivial file.
- A wrapper component that only forwards props.
- An interface that restates a single literal's shape.
- A custom hook wrapping one `useState`.
- A util that wraps one standard-library call.
- A generic abstraction built for a second use case that does not exist yet.
- Splitting a coherent file to hit a line count.
- Comments narrating the code line by line.

**AVOID — correctness**

- Optimistic writes that invent ids.
- Falling back to fixture data when a request fails.
- Unbounded pagination loops.
- `instanceof Error` on a serialized redux rejection.
- Building an i18n key by interpolating a runtime value.
- Native `alert` / `confirm`.
- `any`.

---

## 28. Verification Checklist

**MUST run after applying this skill's rules to any code.**

1. **Typecheck** — the primary gate. Run the project's strict typecheck
   (e.g. `tsc --noEmit`). Zero new errors.
2. **Build** — run the production build when the change touches routing, server
   components, or anything the typecheck alone does not cover.
3. **Lint** — run it **if it actually works**. Verify the command is configured
   before relying on it; a lint script that drops into an interactive setup
   prompt is not a check. If lint is unavailable, say so rather than claiming it
   passed.
4. **Tests** — run the suite if one exists. Run at minimum the tests covering
   the files you touched.
5. **Import resolution** — confirm no dangling imports after a move/rename; grep
   for the old path and the old symbol name.
6. **Reference sweep** — grep for renamed action types, storage keys, route
   paths and message keys.
7. **i18n completeness** — every new key exists in every locale (the typecheck
   should enforce this if §17 is followed).
8. **Runtime-sensitive logic** — re-read the diff for what a typecheck cannot
   catch: effect dependency arrays, memo keys, early returns, boolean
   inversions, async ordering.
9. **Manual check of the affected screen** when the change touches UI, forms,
   loading/error states or interactions.

**MUST report honestly.** If a check could not be run, say which and why. Do not
write tests that assert current behaviour merely to produce a green tick — that
is false confidence. When an area has no automated coverage, perform the
strongest practical verification available and state exactly what was verified.

### Tests

**SHOULD**

- Place tests in `__tests__/` mirroring the feature's sub-folders
  (`__tests__/utils/`, `__tests__/store/`, `__tests__/validations/`).
- Target the **pure layers first**: mappers, derivations, reducers, thunk
  outcomes, validation schemas, model functions with a stubbed transport. They
  are cheap and catch the most.
- Test hooks by rendering them inside the real store provider, not by mocking
  the store.

**AVOID**

- Snapshot tests of large component trees — they break on every legitimate
  change and assert nothing anyone reads.

---

## 29. Decision-Making Rules

When a situation is not covered, decide in this order:

1. **Does the project already do this somewhere?** Match it. An existing
   consistent pattern beats this document.
2. **Does this document cover it?** Apply the rule at its stated level.
3. **Which layer's question is it?** Use the §7 table. The answer usually falls
   out of "which layer is allowed to know this".
4. **Would separating it prevent a real problem?** If yes, separate. If it only
   adds a file, don't.
5. **Would it change behaviour?** If yes and the task did not ask for it, stop
   and ask.
6. **Still ambiguous?** Ask, or implement the smaller reversible option and say
   what you assumed. Do not invent a convention and apply it broadly.

**When this skill conflicts with the host project**

- **Library choices** (which state manager, which form library, which CSS
  approach): **the project wins, always.** Apply the separation and boundary
  rules through whatever it uses.
- **Structural principles** (data-layer seam, one surface hook, no I/O in
  components, no inlined endpoints, no fabricated fallbacks, behaviour
  preservation): apply these to **new and touched** code, and recommend — do not
  perform — a wider migration.
- **Cosmetic conventions** (banner comments, import ordering, file naming):
  adopt the project's if it has one. Only introduce this document's when the
  project has none.

---

## 30. Examples

### 30.1 The data-layer seam

```ts
// ✅ features/x/models/x.ts — the only module that knows the source
export const listItems = async (page = 1, signal?: AbortSignal): Promise<ItemPage> => {
  const paginator = await fetchPaginator<ItemDto>(itemRoutes.index, { page }, signal);
  return itemPaginatorToPage(paginator);   // pure mapper, lives in utils/
};
```

```ts
// ❌ inside a component
const res = await fetch(`${BASE}/items?page=${page}`);
const json = await res.json();
setRows(json.data.items.map((i: any) => ({ ...i, label: i.name ?? "—" })));
```

**Why:** the bad version pins the URL, the envelope, the mapping and the state
into a render tree. Changing the endpoint or the response shape then means
editing components. In the good version, only `models/` and the mapper change.

---

### 30.2 One surface hook

```ts
// ✅ the screen's entire data dependency
const { rows, loading, error, create, remove } = useItems();
```

```ts
// ❌ the screen reaching into the store
const rows = useSelector((s: RootState) => s.itemsReducer.items);
const dispatch = useDispatch<AppDispatch>();
const create = (v: Item) => dispatch(createItemThunk(v));
```

**Why:** the second version spreads store knowledge across every screen. When
the slice changes, every consumer changes. The hook is the contract; the slice
is an implementation detail.

---

### 30.3 Reporting a failed write

```ts
// ✅ 422 → under the inputs; everything else → toast; never a block in the form
const failure = await submit(values);   // returns a normalised failure, or null
if (failure) reportDialogFailure(failure, itemFieldErrorMap, formikHelpers);
```

```tsx
// ❌
{error && <div className="error-box">{error}</div>}   // duplicates the toast and
                                                      // hides the field messages
```

**Why:** a validation failure has a home — the input that caused it. A summary
block repeats the toast and pushes the actionable message off screen.

---

### 30.4 Not fabricating data

```ts
// ✅
.addCase(fetchItems.rejected, (state, action) => {
  if (action.meta.aborted) return;   // an abort is not a failure
  state.loading = false;
  state.loaded  = true;              // attempted — stops the effect re-firing forever
  state.error   = action.error?.message ?? "Request failed";
})
```

```ts
// ❌
.addCase(fetchItems.rejected, (state) => {
  state.items = SEED_ITEMS;          // silently shows data that does not exist
})
```

---

### 30.5 Right-sized separation

```
✅ features/orders/utils/orderTotals.ts     — a real derivation, reused by 3 screens
❌ features/orders/utils/getId.ts           — `(o) => o.id`
❌ features/orders/hooks/useOrderName.ts    — wraps one field of another hook
❌ components/ui/ButtonWrapper.tsx          — forwards every prop to Button
```

**Why:** each ❌ adds a file, an import and a lookup, and removes nothing.
Separation must pay for itself.

---

### 30.6 In-file ordering

```tsx
"use client";
// imports…

/** Items list: search, export, row actions, bulk delete. */
export default function ItemsScreen() {
  const { t } = useI18n();

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { rows, loading, remove } = useItems();

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => …, [rows, query]);
  const columns  = useMemo(() => …, [t]);

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const confirmDelete = async () => { … };

  /**
   * --------------------------------------------------
   *  Conditions
   * --------------------------------------------------
   */
  if (!loading && rows.length === 0) return <EmptyState … />;

  return ( … );
}
```

---

## Open Questions for the Host Project

Answer these explicitly when installing the skill rather than guessing:

- **Import group ordering** — consistent in spirit across the reference codebase
  but not machine-enforced. As a strict rule,
  `Project convention could not be confidently determined.` Adopt the host
  project's linter configuration if it has one.
- **Line length and formatting** — no formatter configuration was present in the
  reference codebase. `Project convention could not be confidently determined.`
- **Component test strategy** — the reference codebase tests pure layers and
  hooks thoroughly and components barely at all. Whether that is deliberate
  policy or simply where coverage stopped:
  `Project convention could not be confidently determined.` Do not infer
  "components must not be tested".
- **Commit and branch conventions** — not derivable from the reference history.
  `Project convention could not be confidently determined.`
- **Where a shared UI primitive's props type lives** when the project has no
  shared `interfaces/` folder — the reference codebase always used one, but a
  project with colocated props types is not violating anything.
