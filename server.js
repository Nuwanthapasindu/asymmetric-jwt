const fs = require("fs");
const path = require("path");
const process = require("process");
const jwt = require("jsonwebtoken");

/*
# Don't add passphrase
ssh-keygen -t rsa -b 1024 -m PEM -f keys/rsa.key
# Write public key to keys/rsa.key.pub file
openssl rsa -in keys/rsa.key -pubout -outform PEM -out keys/rsa.key.pub
*/

const privateKey = fs.readFileSync(
  path.join(process.cwd(), "keys", "rsa.key"),
  "utf-8"
);
const publicKey = fs.readFileSync(
  path.join(process.cwd(), "keys", "rsa.key.pub"),
  "utf-8"
);

app.get("/", (request, response) => {
  response.send({
    message: "Hello world",
  });
});

// TOKEN CREATING
function generateToken() {
  try {
    const token = jwt.sign(
      {
        data: "Hello World",
      },
      privateKey,
      {
        algorithm: "RS256",
      }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
}

function validateToken(token) {
  return jwt.verify(token, publicKey, { algorithm: "RS256" });
}
const token = generateToken();
console.log(
  "=============================TOKEN ========================================"
);
console.log(token);
console.log(
  "=============================TOKEN ========================================"
);
console.log(
  "=============================TOKEN VERIFY========================================"
);
console.log(validateToken(token));
console.log(
  "=============================TOKEN VERIFY========================================"
);
