const jwt = require("jsonwebtoken");
const conn = require("../dbConnection").promise();

exports.getUser = async (req) => {
  try {
    /* if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(422).json({
        message: "Please provide the token",
      });
    } */

    //const theToken = req.headers.authorization.split(" ")[1];

    // const decoded = jwt.verify(theToken, 'the-super-strong-secret');

    const id = req.body.id;

    const row = await conn.execute(
      // `SELECT id, name,email FROM users WHERE id=${id}`
      `select * from users where id = ${id};`
    );


    return row[0][0];


  } catch (err) {}
};
