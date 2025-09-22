const cron = require("node-cron");
const Insurance = require("../models/Insurance");
const sendEmail = require("../utils/sendMail"); // nodemailer utility

// Run every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("🔔 Running insurance expiry reminder job...");

  try {
    // Find policies expiring within 7 days
    const now = new Date();
    const upcoming = new Date();
    upcoming.setDate(upcoming.getDate() + 7);

    const policies = await Insurance.find({
      expiryDate: { $gte: now, $lte: upcoming },
    }).populate({
      path: "pet",
      populate: {
        path: "owner", // pet → owner (User)
        select: "name email", // only fetch needed fields
      },
    });
    for (let policy of policies) {
      const owner = policy.pet?.owner;
      const petName = policy.pet?.name;
      const expiryDate = policy.expiryDate;

      if (owner?.email) {
        const message = `
          <h2>Insurance Expiry Reminder</h2>
          <p>Hello ${owner.name},</p>
          <p>Your pet <strong>${petName}</strong>'s insurance policy with 
          <strong>${policy.provider}</strong> will expire on 
          <strong>${expiryDate.toDateString()}</strong>.</p>
          <p>Please renew your policy to avoid a lapse in coverage.</p>
        `;

        await sendEmail({
          to: owner.email,
          subject: `Insurance Expiry Reminder for ${petName}`,
          text: message,
        });

        console.log(`Reminder sent to ${owner.email} for ${petName}`);
      }
    }
  } catch (error) {
    console.error("❌ Error in reminder job:", error.message);
  }
});
