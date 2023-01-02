const express = require("express");
const crypto = require("crypto");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/generate-otp", (req, res) => {
  //Getting mail from the request
  const { mail } = req.body;

  //Generating the OTP
  let min = 100000;
  let max = 999999;
  let rand_Number = Math.floor(Math.random() * (max - min + 1) + min);
  let mix = mail + rand_Number;
  let token = "";
  let hash = crypto.createHmac("sha256", mix).update(token).digest("hex");
  res.json(hash);

  //Code template for sending Email

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "",//mail
      pass: "",//password
      clientId:
        "",
      clientSecret: "",
      refreshToken:
        "",
    },
  });

  const mailConfigurations = {
    from: "nanigudimetla990@gmail.com",
    to: `${mail}`,
    subject: "OTP for Authentication",
    text: "Your OTP for Signing in application is " + rand_Number,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
  });
});

app.post("/verify-otp", (req, res) => {
  const { mail,token,otp } = req.body;
  console.log(mail);
  console.log(token);
  console.log(otp);
  let mix = mail + otp;
  let res_token = `${token}`;
  let token2 = "";
  let hash = crypto.createHmac("sha256", mix).update(token2).digest("hex");
  let x = crypto.timingSafeEqual(Buffer.from(res_token), Buffer.from(hash));
  res.send(x);
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log("server started");
});
