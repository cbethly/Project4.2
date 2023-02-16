const express = require ('express');
const router = express.Router();
const {getReviews, updateReviews,setReviews,deleteReviews} = require('../controllers/reviewController');

router.route('/').get(getReviews).post(setReviews)
router.route('/:id').put(updateReviews).delete(deleteReviews)






module.exports = router