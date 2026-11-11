# Salesforce Playwright Framework

An enterprise-style test automation framework for Salesforce Lightning, built with Playwright and TypeScript.

> **Status:** in progress. Built step by step as a public portfolio project. See the roadmap below.

## Why this exists

Salesforce Lightning is hard to automate reliably: the page structure is generated at run time, IDs change between page loads, components sit inside shadow DOM, and Salesforce ships three releases a year. In ten years of testing Salesforce programmes, I've seen the same pattern: scripts built on brittle selectors break every release, the team stops trusting them, and regression goes back to manual, which is slow, expensive and a release risk. This framework shows how to build UI tests that survive Lightning and releases, and that fit into a CI quality gate.

## What's in it today

- **Login page loads correctly:** opens the Salesforce login page and checks the page title, the Username field and the Log In button are shown.
- **Forgot password journey:** clicks "Forgot Your Password?" and checks the reset page opens (URL and "Reset Your Password" heading).
- **Password screen after username:** enters a test username on the login page, clicks "Log In" and checks the Password field appears (found by role and name).
- Locators follow a priority list: role → label → text → test ID → CSS/XPath only as a last resort. We use role and name (`getByRole`), not XPath, because XPath only gives the position of the element (like an address) that can change with page loads and Salesforce releases, which breaks the tests.
- Screenshots on failure; trace collected on retry.

None of the tests logs in, so no credentials are needed yet. Logged-in tests arrive with saved sessions per persona (PW-04).

## How to run

Requires Node.js 22 or later.

```bash
npm ci                  # install the exact locked versions
npx playwright install  # first time only: download the browsers
npx playwright test     # run the tests
npm run report          # open the HTML report
```

## Roadmap

- [x] Project set-up and first tests (PW-01)
- [ ] Lightning locators and shadow DOM (PW-02) - in progress
- [ ] Login once per persona with saved sessions (PW-04)
- [ ] Page Object Model (PW-05)
- [ ] Framework structure, fixtures, API test data, CI (PW-07 onwards)

## Security

Credentials and org settings live in a local `.env` file (and in CI secrets later), which `.gitignore` excludes, so no secrets, usernames or org IDs are ever committed. All test data is synthetic.
