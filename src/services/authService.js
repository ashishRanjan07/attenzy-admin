// src/services/authService.js
export const authService = {
  async requestPasswordReset({ email, force = false }) {
    // POST /auth/forgot-password { email }
    // Server should:
    // - Always 200 with generic message
    // - Generate OTP linked to email with expiry, throttle by IP/device if needed
    await wait(600);
    return true;
  },
  async verifyOtp({ email, code }) {
    // POST /auth/verify-otp { email, code }
    await wait(500);
    // Demo: accept "123456"
    return code === "123456";
  },
  async resetPassword({ email, newPassword }) {
    // POST /auth/reset-password { email, token/otp, newPassword }
    await wait(700);
    return true;
  },
};

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
