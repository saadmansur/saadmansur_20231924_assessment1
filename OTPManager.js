

export class OTPManager {
  constructor() {
    this.activeOTPs = new Map();
  }

  /**
   * Generates a random 5-digit OTP
   * @returns {number} - Random integer between 10000 and 99999
   */
  generateRandomOTP() {
    return Math.floor(10000 + Math.random() * 90000);
  }

  /**
   * Generates or validates a one-time passcode
   * @param {number} duration - Duration in milliseconds
   * @param {number} [otp] - Optional: specify OTP to validate or overwrite
   * @returns {{otp: number, exists: boolean}} - Generated OTP and whether it existed before
   */
  generateOrValidateOTP(duration, otp = null) {
    const now = Date.now();

    // Clean expired OTPs
    for (const [key, expiration] of this.activeOTPs.entries()) {
      if (now >= expiration) {
        this.activeOTPs.delete(key);
      }
    }

    if (otp !== null && this.activeOTPs.has(otp)) {
      // OTP exists, extend duration
      this.activeOTPs.set(otp, now + duration);
      return { otp, exists: true };
    }

    // Generate a new OTP if not provided
    if (otp === null) {
      do {
        otp = this.generateRandomOTP();
      } while (this.activeOTPs.has(otp)); // Ensure uniqueness
    }

    this.activeOTPs.set(otp, now + duration);
    return { otp, exists: false };
  }

  /**
   * Check if a passcode is valid
   * @param {number} otp
   * @returns {boolean}
   */
  isValid(otp) {
    const now = Date.now();
    if (this.activeOTPs.has(otp) && this.activeOTPs.get(otp) > now) {
      return true;
    }
    this.activeOTPs.delete(otp);
    return false;
  }
}