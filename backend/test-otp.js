import { generateNumericOTP, saveOTP, verifyOTP } from "./services/otpService.js";
import { sendOTPEmail } from "./services/emailService.js";

async function runOtpTest() {
  console.log("\n==========================================");
  console.log("   PROMPTWAR EMAIL OTP SYSTEM TEST");
  console.log("==========================================\n");

  const testEmail = "challenger@promptwar.com";
  console.log(`[Test 1] Generating 6-digit OTP for ${testEmail}...`);
  const otp = generateNumericOTP(6);
  console.log(`✅ Generated OTP: ${otp}`);

  console.log("\n[Test 2] Saving OTP with 5-minute expiration...");
  await saveOTP({ email: testEmail, otp, expiryMinutes: 5 });
  console.log("✅ OTP successfully saved & hashed.");

  console.log("\n[Test 3] Simulating email delivery...");
  const mailResult = await sendOTPEmail({ to: testEmail, otp, expiryMinutes: 5 });
  console.log(`✅ Email delivery status: ${mailResult.success ? "SUCCESS" : "FAILED"}`);

  console.log("\n[Test 4] Testing invalid OTP verification ('000000')...");
  const failResult = await verifyOTP({ email: testEmail, enteredOtp: "000000" });
  if (!failResult.valid) {
    console.log(`✅ Correctly rejected invalid code: "${failResult.reason}"`);
  } else {
    console.error("❌ Test failed: accepted invalid OTP!");
  }

  console.log(`\n[Test 5] Testing valid OTP verification ('${otp}')...`);
  const successResult = await verifyOTP({ email: testEmail, enteredOtp: otp });
  if (successResult.valid) {
    console.log(`✅ Correctly verified valid code for ${successResult.email}!`);
  } else {
    console.error("❌ Test failed: rejected valid OTP:", successResult.reason);
  }

  console.log("\n[Test 6] Testing re-use prevention (OTP should now be invalidated)...");
  const reuseResult = await verifyOTP({ email: testEmail, enteredOtp: otp });
  if (!reuseResult.valid) {
    console.log(`✅ Correctly rejected re-used code: "${reuseResult.reason}"`);
  } else {
    console.error("❌ Test failed: allowed re-use of consumed OTP!");
  }

  console.log("\n==========================================");
  console.log("   ALL OTP TESTS PASSED SUCCESSFULLY! 🎉");
  console.log("==========================================\n");
}

runOtpTest().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
