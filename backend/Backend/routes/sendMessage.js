const express = require('express');
const router = express.Router();
const {
    sendMessage
} = require('../controllers/sendMessage')


router.route('/sendmessage').post(sendMessage)


module.exports = router;