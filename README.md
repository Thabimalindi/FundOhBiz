# FundOhBiz — Team Clickers hackathon starter app

## Run locally
Open `index.html` in a browser. For a more realistic local development setup, use VS Code and its Live Server extension, or run `python -m http.server 8000` in this folder and visit http://localhost:8000.

## Features
- Business profile (browser-only storage)
- Funding readiness checklist, score, and personalised next steps
- Compliance deadlines and status, with links to official websites
- Responsive layout

## Important limitations
This is a **prototype**, not a production service. Data is saved only in the current browser's localStorage. It has no accounts, cloud database, automatic background reminders, email notifications, document uploads, or server-side security. Do not enter real IDs, tax numbers, passwords, or sensitive personal documents. Dates are entered manually. Verify renewal rules and official links before launch. The B-BBEE link is a general official site, not a direct renewal form.

## Next development steps
1. Confirm the team's technology stack and create a shared GitHub repository.
2. Add Firebase Authentication and a properly secured database with per-user access rules.
3. Build a server-side scheduled job for opt-in email reminders at 60, 30, 14, and 7 days.
4. Verify renewal URLs and different types of compliance deadlines.
5. Test security, mobile layout, and user journeys; deploy an HTTPS demo.
6. Record the actual app for the 90-second hackathon demo.
