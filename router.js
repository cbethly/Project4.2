const express = require("express");
const router = express.Router();
const db = require("./dbConnection");
const { signupValidation, loginValidation } = require("./Validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", signupValidation, (req, res) => {
  const email = db.escape(req.body.email.toLowerCase());
  const query = `SELECT * FROM users WHERE LOWER(email) = ${email}`;
  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }
    if (result.length) {
      return res.status(409).send({ msg: "This user is already in use!" });
    }
    bcrypt.hash(req.body.password, 10, (hashError, hash) => {
      if (hashError) {
        return res.status(500).send({ msg: hashError });
      }
      const insertQuery = `INSERT INTO users (name, email, password)
        VALUES ('${req.body.name}', ${email}, ${db.escape(hash)})`;
      db.query(insertQuery, (insertError, insertResult) => {
        if (insertError) {
          return res.status(400).send({ msg: insertError });
        }
        return res
          .status(201)
          .send({ msg: "The user has been registered with us!" });
      });
    });
  });
});

router.post("/login", loginValidation, (req, res) => {
  const email = db.escape(req.body.email);
  const query = `SELECT * FROM users WHERE email = ${email}`;
  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }
    if (!result.length) {
      return res.status(401).send({ msg: "Email or password is incorrect!" });
    }
    bcrypt.compare(req.body.password, result[0]["password"], (compareError, match) => {
      if (compareError) {
        return res.status(401).send({ msg: "Email or password is incorrect!" });
      }
      if (match) {
        const token = jwt.sign({ id: result[0].id }, "the-super-strong-secret", {
          expiresIn: "1h",
        });
        const updateQuery = `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`;
        db.query(updateQuery);
        return res.status(200).send({
          msg: "Logged in!",
          token,
          user: result[0],
        });
      }
      return res.status(401).send({ msg: "Email or password is incorrect!" });
    });
  });
});

module.exports = router;
