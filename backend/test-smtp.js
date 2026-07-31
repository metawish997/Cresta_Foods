import nodemailer from 'nodemailer';

async function main() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465, // usually Hostinger is 465 with SSL, or 587 with TLS
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'info@crestafoods.in',
      pass: 'password-CrestaFoods@987',
    },
    // Optional: enable debug to see full SMTP trace
    debug: true,
    logger: true
  });

  try {
    console.log("Verifying connection to smtp.hostinger.com:465 with secure=true...");
    await transporter.verify();
    console.log("SUCCESS on port 465!");
  } catch (err) {
    console.error("FAILED on port 465:", err.message);
    
    console.log("\nTrying port 587 with secure=false (TLS)...");
    const transporter587 = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: 'info@crestafoods.in',
        pass: 'password-CrestaFoods@987',
      },
      debug: true,
      logger: true
    });
    
    try {
      await transporter587.verify();
      console.log("SUCCESS on port 587!");
    } catch (err2) {
      console.error("FAILED on port 587:", err2.message);
    }
  }
}

main();
