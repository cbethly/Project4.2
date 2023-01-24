const router = require("express").Router();
const { body } = require("express-validator");
const { register } = require("./controllers/registerController");
const { login } = require("./controllers/loginController");
const { getUser } = require("./controllers/getUserController");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



router.post(
  "/register",
  [
    body("name", "The name must be of minimum 3 characters length")
      .notEmpty()
      .escape()
      .trim()
      .isLength({ min: 3 }),
    body("email", "Invalid email address").notEmpty().escape().trim().isEmail(),
    body("password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  register
);

router.post(
  "/login",
  [
    body("email", "Invalid email address").notEmpty().escape().trim().isEmail(),
    body("password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  login
);

router.get("/getuser", getUser);

router.post('/upload', upload.single('image'), (req, res) => {
    const image = req.file;
    const name = req.body.name;
    const type = image.mimetype;
    const data = fs.readFileSync(image.path);

    connection.query('INSERT INTO images SET ?', {
        name: name,
        type: type,
        data: data
    }, (error, results, fields) => {
        if (error) {
            res.send(JSON.stringify({
                status: false,
                message: 'Error occured: ' + error
            }));
        } else {
            fs.unlinkSync(image.path);
            res.send(JSON.stringify({
                status: true,
                data: results
            }));
        }
    });
});
module.exports = router;
