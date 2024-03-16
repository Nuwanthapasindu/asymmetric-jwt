const app = require("./app");
const fs = require("fs");
const path = require("path");
const process = require("process");
const jwt = require("jsonwebtoken");

const port = 3000

function CreateKeyStoreFolder() {
    if (!fs.existsSync(path.join(process.cwd(), "keys"))) {
        fs.mkdirSync(path.join(process.cwd(), "keys"));
    }
}


/*
# Don't add passphrase
ssh-keygen -t rsa -b 1024 -m PEM -f keys/rsa.key
# Write public key to keys/rsa.key.pub file
openssl rsa -in keys/rsa.key -pubout -outform PEM -out keys/rsa.key.pub
*/


const privateKey = fs.readFileSync(path.join(process.cwd(), "keys", "rsa.key"), "utf-8");
const publicKey = fs.readFileSync(path.join(process.cwd(), "keys", "rsa.key.pub"), "utf-8");

app.get("/",(request,response)=>{
    response.send({
        message:"Hello world"
    })
})

// TOKEN CREATING
app.post("/create-token",async (request,response)=>{
 try {
    const token = jwt.sign({
        data: "Hello World"
    }, privateKey,{
        algorithm:"RS256"
    })
    response.send({
        token
    })
 
 } catch (error) {
    console.log(error)
 }
})
//  TOKEN VALIDATING
app.get("/validate",async(request,response)=>{
    const token = request.headers["authorization"];
    const jwtToken = token.split(" ")[1];
    const check = await jwt.verify(jwtToken,publicKey,{
        algorithms:"RS256"
    });
    response.send({
        check
    })

})


app.listen(port, () => {
    CreateKeyStoreFolder();
    console.log(`Server is running on http://localhost:${port}
    please Create public and private RSA keys and store them in the keys folder"`);
});
