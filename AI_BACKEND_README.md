# AI BACKEND DEVELOPMENT INSTRUCTIONS

## IMPORTANT

Before writing code, read this file completely.

The Master Prompt is the source of truth.

Backend implementation must exactly follow that architecture.

Never simplify.

Never skip modules.

-------------------------------------------------------

## PROJECT

Backend

Node.js

Express

MongoDB

Mongoose

JWT

Socket.IO

Sharp

Nodemailer

The backend already exists.

Extend it.

Do not recreate it.

-------------------------------------------------------

## PRIMARY RULE

Every feature described in the master prompt must exist.

Never implement partial functionality.

Never leave TODOs.

Never use fake APIs.

Everything must work.

-------------------------------------------------------

## DATABASE

Always use Mongoose.

Never use raw JSON files.

Never use temporary storage.

Always create proper:

Models

Controllers

Routes

Middleware

Validation

Indexes

Populate

Relationships

-------------------------------------------------------

## API RULES

Every CRUD must include

Create

Read

Update

Delete

Validation

Authentication

Authorization

Error handling

Status codes

-------------------------------------------------------

## AUTH

Keep JWT.

Keep middleware.

Keep permission system.

Keep role system.

Never bypass authentication.

-------------------------------------------------------

## FILES

Keep folder structure clean.

Models

Controllers

Routes

Middleware

Utils

Config

Constants

Never mix responsibilities.

-------------------------------------------------------

## IMAGE UPLOADS

Always optimize.

Always use Sharp.

Always return proper URLs.

Never store unnecessary files.

-------------------------------------------------------

## EMAIL

Use Nodemailer.

Handle failures.

Return meaningful responses.

-------------------------------------------------------

## SOCKET.IO

Never break realtime functionality.

Keep socket initialization centralized.

-------------------------------------------------------

## SECURITY

Validate every request.

Sanitize input.

Protect private routes.

Never expose secrets.

Use environment variables.

-------------------------------------------------------

## ERROR HANDLING

Return proper HTTP status.

400

401

403

404

409

422

500

Always send meaningful JSON.

-------------------------------------------------------

## RESPONSE FORMAT

Keep responses consistent.

Example

success

message

data

pagination

errors

-------------------------------------------------------

## PERFORMANCE

Avoid unnecessary queries.

Use indexes.

Use populate only when needed.

Keep controllers clean.

Move reusable logic into helpers.

-------------------------------------------------------

## NEVER DO

Never remove existing APIs.

Never change routes unnecessarily.

Never rename models randomly.

Never skip validation.

Never skip authentication.

Never skip permissions.

Never hardcode values.

Never use placeholder logic.

-------------------------------------------------------

## BEFORE FINISHING

Verify

✓ Route exists

✓ Controller exists

✓ Model updated

✓ Validation complete

✓ JWT protected

✓ Permission checked

✓ Error handling done

✓ Proper status codes

✓ API tested

✓ No missing feature

Only then consider the implementation complete.