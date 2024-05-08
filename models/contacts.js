const { json } = require('express');
const Contact = require('./contact-schema')

const paginationOptions = {
  page: 1,
  limit: 20,
}


const listContacts = async (ownerId) => {
  //const result = await Contact.find({owner: ownerId})
  const result = await Contact.paginate({owner: ownerId}, paginationOptions)
  return result
}

const getContactById = async (contactId, ownerId) => {
  try {
    const result = await Contact.findOne({ _id: contactId, owner: ownerId })
    return result
  } catch (error) {
    return null
  }
  
}

const removeContact = async (contactId) => {

  try {
    const result = await Contact.findByIdAndDelete({ _id: contactId })
    return result
  } catch (error) {
    return null
  }
  
}

const addContact = async (body) => {
 
  const result = await Contact.create(body)
  return result
  
}

const updateContact = async (contactId, body) => {
   try {
     const result = await Contact.findByIdAndUpdate({ _id: contactId }, { name : body.name, email : body.email, phone : body.phone })
    return result
  } catch (error) {
    return null
  }
  
}

const updateStatusContact = async (contactId, favorite) => {
   try {
     const result = await Contact.findByIdAndUpdate({ _id: contactId }, { favorite: favorite })
     return result
  } catch (error) {
    return null
  }
}

const favContacts = async () => {
  try {
    const result = await Contact.find({ favorite: true}).exec();
    return result
  } catch (error) {
    return null
  }
  
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  favContacts
}
