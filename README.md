# DevCall

DevCall is a full-stack remote coding interview platform built with Next.js, Clerk, Convex, and Stream Video. It combines interview scheduling, real-time video calls, a live coding workspace, interviewer feedback, pass/fail review, and recording playback in one application.

This project demonstrates modern full-stack application development with authentication, real-time collaboration, role-based workflows, serverless backend functions, webhooks, and third-party video infrastructure.

---

## Why This Project Stands Out

DevCall is more than a basic CRUD app. It models a real-world hiring workflow from scheduling to live interview execution to post-interview review.

It demonstrates how multiple production-style systems work together:

- Authentication and user roles with Clerk
- Serverless backend data and mutations with Convex
- Real-time video meetings with Stream Video
- Live coding workspace with Monaco Editor
- Interview scheduling and review workflows
- Recording playback for completed meetings
- Webhook-based user syncing between Clerk and Convex

---

## Key Highlights

- Create instant coding interview rooms
- Schedule interviews with candidates and interviewers
- Join live video meetings with a shared coding workspace
- Use pre-call camera and microphone setup
- Switch between grid and speaker video layouts
- View meeting participants during calls
- Resize the coding panel during interviews
- Leave interviewer comments and star ratings
- Mark completed interviews as passed or failed
- Review and share saved meeting recordings
- Sync new Clerk users into Convex through webhooks

---

## Tech Stack

- **Next.js 16** – full-stack React framework and routing
- **React 19** – component-based UI development
- **TypeScript** – type-safe application logic
- **Tailwind CSS 4** – utility-first styling
- **Clerk** – authentication and user management
- **Convex** – backend database, queries, mutations, and HTTP actions
- **Stream Video SDK** – video meetings and recording support
- **Monaco Editor** – live coding workspace
- **Radix UI primitives** – accessible UI components

---

## What The App Does

DevCall supports the full interview lifecycle:

1. Interviewers create instant or scheduled interviews
2. Candidates and interviewers join a video meeting
3. Participants use a shared coding workspace during the call
4. Interviewers leave comments and ratings
5. Completed interviews are marked as passed or failed
6. Recordings can be reviewed after the meeting

---

## Core Features

### Interview Management

- Instant meeting creation from the home screen
- Scheduled interviews with title, description, date, time, candidate, and interviewer selection
- Interview cards grouped by interview status
- Admin dashboard for completed interview review

### Live Meeting Experience

- Stream-powered video calling
- Pre-join camera and microphone setup
- Grid and speaker video layouts
- Participant list toggle
- End meeting control for the meeting owner
- Resizable coding workspace during the call

### Feedback and Review

- Interview comments stored in Convex
- Star-based interviewer ratings
- Pass/fail interview status updates
- Recordings page for playback and link sharing

### Authentication and User Sync

- Clerk handles authentication and user identity
- Convex stores application-specific user records
- Clerk webhooks sync newly created users into Convex
- Default users are created with the `candidate` role
- Interviewer role enables scheduling and dashboard access

---

## Architecture Overview

1. User signs in through Clerk
2. Clerk authentication state is used throughout the Next.js app
3. New Clerk users are synced into Convex through a webhook
4. Convex stores users, interviews, comments, and role data
5. Interviewers create scheduled or instant interviews
6. Stream Video powers live meeting rooms and recordings
7. Monaco Editor provides the coding workspace inside the meeting route
8. Completed interviews can be reviewed with comments, ratings, status, and recordings

---

## Project Structure

```text
src/
  app/
    (root)/
      (home)/        Home screen and quick actions
      meeting/[id]/  Live meeting route
      recordings/    Recording browser
      schedule/      Interview scheduling UI
    (admin)/
      dashboard/     Interview review dashboard
  components/
    MeetingRoom.tsx
    MeetingSetup.tsx
    CodeEditor.tsx
    CommentDialog.tsx
    RecordingCard.tsx
  actions/
    stream.actions.ts

convex/
  comments.ts
  interviews.ts
  users.ts
  http.ts
  schema.ts
  auth.config.ts
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
```

---

## Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Services

Create accounts/projects for:

- Clerk
- Convex
- Stream Video

Make sure `convex/auth.config.ts` matches your Clerk issuer/domain.

### 3. Configure Clerk Webhook

This app syncs newly created Clerk users into Convex through the HTTP action in `convex/http.ts`.

Create a Clerk webhook for:

```text
user.created
```

Point it to the Convex HTTP endpoint:

```text
/clerk-webhook
```

Without this webhook, users can authenticate with Clerk but will not be inserted into the Convex `users` table.

### 4. Start Convex

```bash
npx convex dev
```

This handles function deployment, type generation, and local Convex development.

### 5. Start the Next.js App

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev
npm run build
npm run start
```

---

## Important Notes

- New users are synced into Convex with the default role `candidate`
- Interviewer functionality requires setting a user role to `interviewer`
- The current experience is interviewer-focused
- Candidate dashboard functionality is still minimal in the current version

---

## Production Build

To verify a production build locally:

```bash
npm run build
```

If the build succeeds, run the production server with:

```bash
npm run start
```

---

## What This Project Demonstrates

- Building a full-stack SaaS-style application with Next.js
- Managing authentication and role-based user flows
- Integrating real-time video infrastructure
- Building interview scheduling and review workflows
- Using Convex for backend data, queries, mutations, and webhooks
- Syncing third-party auth users into application data
- Embedding a coding workspace into a live meeting experience
- Handling environment configuration across multiple services

---

## Future Improvements

- Add a more complete candidate dashboard
- Add interviewer/candidate notification emails
- Add calendar integration for scheduled interviews
- Add coding challenge templates
- Add collaborative editing in the coding workspace
- Add automated tests for scheduling, role access, and interview review
- Add stronger role-management controls in the admin dashboard
- Add analytics for interview outcomes and candidate performance

---

## Author

Brandon May

---

## License

MIT
