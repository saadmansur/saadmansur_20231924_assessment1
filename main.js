import { OTPManager } from "./OTPManager.js";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { Console } from "console";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatTimeLeft(ms) {
  const seconds = Math.ceil(ms / 1000);
  return `${seconds} seconds`;
}

async function displayCountdown(otp, expiryTime) {
  while (Date.now() < expiryTime) {
    const timeLeft = expiryTime - Date.now();
    process.stdout.write(`\rTime remaining for OTP ${otp}: ${formatTimeLeft(timeLeft)}`);
    console.log("\n\n")
    await sleep(1000);
  }
  console.log(`\nOTP ${otp} has expired!`);
}

(async () => {
  const rl = readline.createInterface({ input, output });
  const otpManager = new OTPManager();
  let activeTimers = new Map();

  // Ask for default duration in seconds (press Enter for 30s)
  const durAnswer = await rl.question("Please enter OTP duration in seconds (default 30): ");
  const duration = Number(durAnswer) > 0 ? Number(durAnswer) * 1000 : 30 * 1000;


  while (true) {
    console.log("\nCommands: g = generate new OTP, v = validate given OTP, c = check OTP validity, q = quit");
    const cmd = (await rl.question("\n> ")).trim().toLowerCase();

    if (cmd === "q") {
      console.log("Exiting.");
      break;
    }

    if (cmd === "g") {
      const { otp, exists } = otpManager.generateOrValidateOTP(duration);
      console.log(`Generated OTP: ${otp}`);
      if (exists) {
        console.log("Warning: OTP already existed.");
      } else {
        console.log("OTP is a new one.");
      }
      // Start countdown timer
      const expiryTime = Date.now() + duration;

      const timeLeft = expiryTime - Date.now();
      process.stdout.write(`\rTime remaining for OTP ${otp}: ${formatTimeLeft(timeLeft)}`);
      console.log("\n\n")
      continue;
    }

    if (cmd === "v") {
      const raw = await rl.question("Enter OTP to validate (digits only): ");
      const n = Number(raw);
      if (!Number.isInteger(n)) {
        console.log("Invalid input.");
        continue;
      }
      const { otp, exists } = otpManager.generateOrValidateOTP(duration, n);
      console.log(`OTP ${otp} validated.`);
      if (exists) {
        console.log("Warning: OTP already existed.");
      } else {
        console.log("New OTP is generated.");
      }
      // Start/restart countdown timer
      const expiryTime = Date.now() + duration;
      displayCountdown(otp, expiryTime);
      continue;
    }

    if (cmd === "c") {
      const raw = await rl.question("Enter OTP to check validity: ");
      const n = Number(raw);
      if (!Number.isInteger(n)) {
        console.log("Invalid input.");
        continue;
      }
      
      if (otpManager.isValid(n)) {
        const timeLeft = otpManager.activeOTPs.get(n) - Date.now();
        console.log(`OTP is still valid for: ${formatTimeLeft(timeLeft)}\n`);
      } else {
        console.log(`OTP ${n} is invalid or expired.\n`);
      }
      continue;
    }

    console.log("Unknown command. Use g, v, c or q.");
  }

  rl.close();
})();