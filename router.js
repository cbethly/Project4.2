const express = require("express");
const router = express.Router();
const db = require("./dbConnection");
const { signupValidation, loginValidation } = require("./Validation");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/image-upload', upload.single('image'),(req, res) => {
  const image = req.image;
    res.send(apiResponse({message: 'File uploaded successfully.', image}));
});

function apiResponse(results){
  return JSON.stringify({"status": 200, "error": null, "response": results});
}

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

router.post("/login", loginValidation, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              { id: result[0].id },
              "the-super-strong-secrect",
              { expiresIn: "1h" }
            );
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});
router.post("/get-user", signupValidation, (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(422).json({
      message: "Please provide the token",
    });
  }
  const theToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(theToken, "the-super-strong-secrect");
  db.query(
    "SELECT * FROM users where id=?",
    decoded.id,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "Fetch Successfully.",
      });
    }
  );
});




module.exports = router;
