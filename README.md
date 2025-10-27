# OTP Manager CLI

Simple Node.js CLI that generates and validates one-time passcodes (OTPs) with per-OTP expiration timers and a live countdown display.

---

## Features
- Generate unique 5-digit OTPs.
- Validate/extend existing OTPs.
- Per-OTP expiry (configurable duration).
- Live countdown displayed in the terminal when an OTP is generated/validated.
- Simple in-memory storage (Map) for active OTPs.

## Requirements
- macOS (commands shown for macOS).
- Node.js 16+ (recommended) with ES module support.

## Setup

1. Open terminal in the project folder:
   cd <path_to_folder_where_main.js_is_placed>

2. Initialize package.json (if you don't have one) and set module type:
   ```bash
   npm init -y
   # ensure ES modules so `import` works
   # edit package.json and add: "type": "module"
   # or run:
   node -e "let p=require('./package.json'); p.type='module'; require('fs').writeFileSync('package.json', JSON.stringify(p, null,2))"
   ```

3. There are no external dependencies. (Uses built-in `readline/promises`.)

## Files
- OTPManager.js  
  - OTPManager class with:
    - generateRandomOTP(): random 5-digit number
    - generateOrValidateOTP(duration, otp?): create new or extend existing OTP
    - isValid(otp): check validity
- main.js  
  - CLI loop using readline/promises
  - Prompts for default OTP duration (seconds)
  - Commands:
    - g : generate new OTP
    - v : validate/submit existing OTP (extends timer if exists)
    - c : check OTP validity and remaining time
    - q : quit
  - Starts a live countdown display for generated/validated OTPs

## Usage

Run the CLI:
```bash
node main.js
```

Example session:
- Start -> asked: "Please enter OTP duration in seconds (default 30):"  
  (Press Enter for default 300s (5 minutes) or type e.g. `60` for 60 seconds)
- Commands prompt appears:
  - Type `g` → generates an OTP and shows a live countdown for that OTP.
  - Type `v` → you will be asked to enter an OTP number. If it exists, its timer is extended; if not, it will be created.
  - Type `c` → check whether an OTP is valid and how many seconds remain.
  - Type `q` → quit.

Notes about countdown display:
- Countdown is printed to stdout and updates every second. Because the CLI also prompts, output can interleave with prompts. Press Enter if prompt appears mixed with countdown output to get a fresh prompt line.

## Important notes
- Storage is in-memory (Map). Restarting the process clears all OTPs.
- OTP uniqueness is ensured at generation time (collision avoided by regenerating).
- Expired OTPs are cleaned when generating/validating and when checking validity.

## Troubleshooting
- If you get module import errors: ensure package.json contains `"type": "module"`.
- If `readline/promises` is unavailable, upgrade Node to v16.6+.

## License
MIT
