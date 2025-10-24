import { OTPManager } from "./OTPManager.js";

// Utility function to simulate a delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Example usage
(async () => {
  const otpManager = new OTPManager();
  const duration = 30 * 1000; // 30 seconds

  for (let i = 0; i < 3; i++) {
  // Generate a new OTP
  let { otp, exists } = otpManager.generateOrValidateOTP(duration);
  console.log(`Generated OTP: ${otp}, existed before: ${exists}`); // false

  // Validate the same OTP
  ({ otp, exists } = otpManager.generateOrValidateOTP(duration, otp));
  console.log(`Validated OTP: ${otp}, existed before: ${exists}`); // true


  console.log("Waiting 30 seconds for OTP to expire...");
  await sleep(duration);

  // OTP expired
  console.log(`After 30 seconds, OTP is valid: ${otpManager.isValid(otp)}`); // false

  // Generate a new OTP
    console.log(`OTP is expired, need to create a new OTP`);


  }
})();
