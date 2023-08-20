const asyncHandler = require('express-async-handler');

const Contact = require('../models/contact'); 


const getAllcontacts = asyncHandler(async (req,res)=>{
    const allContacts = await Contact.find();
    res.status(200).json({
        url: req.url,
        message: 'all the contacts',
        users: allContacts,
        type: 'GET'
    })
})

const createContact = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {name, email, phone} =    req.body;
    if(!name || !email || !phone){
        res.status(400).json({
            url: req.url,
            message: 'please provide all the details',
            type: 'POST'
        })
    }
    const newContact = await Contact.create({
        name, email, phone 
    })
    res.status(200).json({
        url: req.url,
        newContact,
        type: 'POST'
    })
})


const getSpecificContact = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404).json({
            url: req.url,
            message: `contact with id ${id} not found`,

        })
    }
    res.status(200).json({
        url: req.url,
        user: contact,
        type: 'GET'
    })
})


const updateContact = asyncHandler(async (req,res)=>{
    // const id = req.params.id;
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json({
            url: req.url,
            message: `contact with id ${id} not found`,
        })
    }
    const updateContactDetails = await Contact.findByIdAndUpdate(req.params.id, req.body)
    console.log(updateContactDetails);
    res.status(200).json({
        url: req.url,
        data: updateContactDetails, 
        type: 'PUT'
    })
})

const deleteContact = asyncHandler(async (req,res)=>{
    const contact = Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json({
            url: req.url,
            message: `contact with id ${id} not found`,
        })
    }
    await contact.remove();
    res.status(200).json({
        url: req.url,
        message: 'deleted contact',
        type: 'DELETE'
    })
})

module.exports = {getAllcontacts, getSpecificContact, createContact, updateContact, deleteContact}