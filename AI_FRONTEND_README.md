# AI FRONTEND DEVELOPMENT INSTRUCTIONS

## IMPORTANT

Before writing even a single line of code, read this entire file.

This project already has a complete project specification (Master Prompt). That specification is the source of truth.

Your responsibility is NOT to redesign the application.

Your responsibility is to implement everything exactly according to that specification.

-------------------------------------------------------

## PROJECT

Frontend Brand:
Cresta Foods

Framework:
React + Vite

Existing frontend already exists.

Never recreate the project.

Never delete existing code unless explicitly requested.

Always extend the existing project.

-------------------------------------------------------

## PRIMARY RULE

The master prompt defines the entire project.

Nothing should be skipped.

Never simplify features.

Never replace functionality with placeholders.

Never write "TODO" or "Implement Later".

Everything must work.

-------------------------------------------------------

## UI RULES

Maintain one consistent UI across the entire project.

Never mix multiple design systems.

Reuse existing:

- Components
- CSS
- Variables
- Layout
- Typography
- Buttons
- Forms
- Cards
- Tables
- Modals

Never duplicate components.

-------------------------------------------------------

## COMPONENT RULES

Always check whether a component already exists.

If yes

Reuse it.

If not

Create a reusable component.

Never create duplicate logic.

-------------------------------------------------------

## ROUTING

Do not break existing routes.

Keep lazy loading.

Keep protected routes.

Keep layouts.

Keep authentication flow.

-------------------------------------------------------

## API

Never hardcode data.

Always consume backend APIs.

Every CRUD operation must connect with backend.

No fake JSON.

No local arrays.

No temporary data.

-------------------------------------------------------

## STATE MANAGEMENT

Reuse existing contexts.

Never create duplicate contexts.

Keep global state centralized.

-------------------------------------------------------

## SEO

Do not remove Helmet.

Do not remove PageSEO.

Keep SEO dynamic.

-------------------------------------------------------

## PERFORMANCE

Avoid unnecessary re-renders.

Lazy load pages.

Lazy load admin modules.

Memoize where required.

Split components when needed.

-------------------------------------------------------

## RESPONSIVE

Desktop

Tablet

Mobile

All must work.

Never ignore responsiveness.

-------------------------------------------------------

## ADMIN PANEL

Every admin page must:

List

Create

Edit

Delete

Search

Pagination (if required)

Validation

Loading

Error state

Success state

Confirmation dialogs

Permission checks

Everything must be functional.

-------------------------------------------------------

## FORMS

Every form must include

Validation

Error messages

Loading state

Disabled submit

Backend integration

Reset on success

-------------------------------------------------------

## ERROR HANDLING

Never silently fail.

Show proper UI.

Handle:

404

500

Network

Unauthorized

Validation

-------------------------------------------------------

## CLEAN CODE

Small components.

Reusable hooks.

Reusable helpers.

Meaningful names.

No duplicated code.

-------------------------------------------------------

## NEVER DO

Do not remove existing functionality.

Do not rewrite completed modules.

Do not change folder structure unnecessarily.

Do not invent new architecture.

Do not ignore backend API.

Do not skip responsiveness.

Do not skip validations.

Do not skip loading states.

Do not skip permissions.

-------------------------------------------------------

## BEFORE FINISHING ANY TASK

Verify

✓ UI matches project

✓ API connected

✓ Responsive

✓ Validation done

✓ Errors handled

✓ Loading handled

✓ Permissions handled

✓ Existing code not broken

✓ No missing feature

Only after verification consider the task complete.