const express = require('express');

const router = express.Router();

const {getAllcontacts, getSpecificContact, createContact, updateContact, deleteContact} = require('../controllers/contactController');

router.get('/',getAllcontacts).post('/',createContact)

router.get('/:id',getSpecificContact).put('/:id',updateContact).delete('/:id',deleteContact)

module.exports = router;