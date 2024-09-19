const express = require('express');
const { codeExecuter } = require("../controllers/controller")

const router = express.Router();

router.post('/', codeExecuter)

module.exports = router