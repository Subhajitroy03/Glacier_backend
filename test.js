const { sendMail } = require("./src/utils/mailer");

async function main() {
  await sendMail({
    to: "subhajit.roy.23@aot.edu.in",
    subject: "Happy New Year",
    text: "Hi Subhajit, Happy New Year 🎉",
  });

  console.log("Email sent");
}

main().catch(console.error);