# OTP Manager CLI

Simple Node.js CLI to generate and validate one-time passcodes (OTPs) with per-OTP expiry and a displayed time-left counter.

## Features
- Generates unique 5-digit OTPs.
- Validates an existing OTP and extends its expiry if re-used.
- Per-OTP expiry duration (configurable at start).
- Displays remaining time for an OTP when generated/validated or checked.
- In-memory storage (Map) — restart clears OTPs.

## Requirements
- Node.js 16.6+ (for `readline/promises` and ES module support)
- macOS (commands shown; works on other OSes with Node installed)
- No external npm packages required

## Project files
- `OTPManager.js` — OTPManager class (generate, validate, expiry tracking).
- `main.js` — CLI: prompt for duration, commands, and displays timers.
- `README.md` — this file.

## Setup
1. Open terminal in project folder:
   cd <path_to_folder_of_main.js_file>

2. Ensure package.json has ES module type:
   ```bash
   npm init -y
   node -e "let p=require('./package.json'); p.type='module'; require('fs').writeFileSync('package.json', JSON.stringify(p,null,2))"
   ```

## Run
```bash
node main.js
```

On start you will be asked:
Please enter OTP duration in seconds (default 300s = 5 minutes)

Press Enter for default or type a number (e.g. `60` for 60 seconds).

## Commands (interactive)
- `g` — generate a new OTP (starts a countdown display).
- `v` — enter an OTP to validate; if it exists its expiry is extended, otherwise it is created (and timer started).
- `c` — check validity and remaining time for a specific OTP.
- `q` — quit.

Example session:
- Enter duration `60`
- Type `g` → prints OTP and shows "Time remaining for OTP XXXXX: 60 seconds"
- Type `c`, enter the OTP → prints remaining seconds
- Type `v`, enter the OTP → extends expiry and prints new remaining time

## Notes & limitations
- OTPs are stored only in memory; process restart clears them.
- Countdown display prints to stdout and may interleave with prompts.
- Expired OTPs are cleaned during generate/validate/check operations.
- OTP uniqueness is ensured at generation time by checking the Map.

## Troubleshooting
- If you see `Error: Cannot find module 'readline/promises'` — upgrade Node to v16.6+.
- If `import` fails, ensure package.json contains `"type": "module"`.

## License
MIT
