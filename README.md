# Salesforce Playwright Framework

An enterprise-style test automation framework for Salesforce Lightning, built with Playwright and TypeScript.

> **Status:** in progress. Built step by step as a public portfolio project. See the roadmap below.

## Why this exists

Salesforce Lightning is hard to automate reliably: the page structure is generated at run time, IDs change between page loads, components sit inside shadow DOM, and Salesforce ships three releases a year. In ten years of testing Salesforce programmes, I've seen the same pattern: scripts built on brittle selectors break every release, the team stops trusting them, and regression goes back to manual, which is slow, expensive and a release risk. This framework shows how to build UI tests that survive Lightning and releases, and that fit into a CI quality gate.

## What's in it today

**Tests against the public Salesforce login page** (`tests/login-page.spec.ts`)

- **Login page loads correctly:** checks the page title, the Username field and the Log In button are shown.
- **Forgot password journey:** clicks "Forgot Your Password?" and checks the reset page opens (URL and "Reset Your Password" heading).
- **Password screen after username:** enters a test username, clicks "Log In" and checks the Password field appears.
- **Remember me checkbox:** checks it is unticked by default, ticks it with `.check()` and checks it is ticked.

**Waiting demo on a fake slow page** (`tests/flaky-demo.spec.ts`). This uses a small made-up page that loads slowly, not Salesforce. It shows the fix for flaky waits:

- **Web-first assertion:** `await expect(locator).toBeVisible()` retries until the heading appears, instead of a hard sleep and a one-off `isVisible()` check.
- **`click()` auto-waits:** the Save button starts disabled; the click waits until it is enabled.
- **Success message:** after Save, `toHaveText('Record saved')` waits for the late message.

**How the tests are written**

- Locators follow a priority list: role → label → text → test ID → CSS/XPath only as a last resort. We use role and name (`getByRole`), not XPath, because XPath only gives the position of the element (like an address) that can change with page loads and Salesforce releases, which breaks the tests.
- No hard waits (`waitForTimeout`): actions auto-wait and assertions retry.

**Running and evidence**

- A GitHub Actions workflow runs the tests on every pull request.
- Screenshots and a page snapshot on failure; a trace is recorded on the first retry (locally, run with `--trace on`).

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
- [x] Lightning locators and shadow DOM (PW-02)
- [ ] Auto-waiting and web-first assertions (PW-03) - in progress: demo done, real Lightning spinners after login (PW-04)
- [ ] Login once per persona with saved sessions (PW-04)
- [ ] Page Object Model (PW-05)
- [ ] Framework structure, fixtures, API test data, CI (PW-07 onwards)

## Security

Credentials and org settings live in a local `.env` file (and in CI secrets later), which `.gitignore` excludes, so no secrets, usernames or org IDs are ever committed. All test data is synthetic.
