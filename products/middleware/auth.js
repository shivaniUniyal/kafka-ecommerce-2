const jwt = require("jsonwebtoken");
const producer = require("../../gateway/kafka/producer");
const config = process.env;

const verifyToken = async (req, res, next) => {
  try {
  const token =
    req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "A token is required for authentication." });
  }
  // console.log("Message Sent: ", token)
  //   await producer.send({
  //     topic: 'test-topic-new',
  //     messages: [
  //       { value: JSON.stringify(token) },
  //     ],
  //   })
    next();
  } catch (err) {
    return res.status(401).json({ message: "Please enter a valid token." });
  }
  
};

module.exports = verifyToken;
//req.body.token || req.query.token || req.headers["x-access-token"] ||