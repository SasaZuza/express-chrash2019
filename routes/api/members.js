// Importing express
const express = require('express');
// Importing 'uuid' for creating random id numbers - 'npm i uuid'
const uuid = require('uuid');
// Importing router
const router = express.Router();
// Importing members file
const members = require('../../Members');


// Creating route that gets all members as JSON file
router.get('/', (req, res) => {
    res.json(members);
});


// Get single member from 'Members.js' file by geting it's ID
router.get('/:id', (req, res) => {
    // With some method we display 'false' if that member doesn't exsist
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        // This is how we get single user by using filter method
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
});


// Create member with sending some data with 'send' request
router.post('/', (req, res) => {
    const newMember = {
        // This will generate universal id
        id: uuid.v4(),
        // This will post other type of data
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    // Checking if name and email are sent
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please add name and email for this user!' });
    }

    // Pushing 'newMember' to members array
    members.push(newMember);
    // Returning new updated array of members
    res.json(members);

    // Redirect after adding a new member into input form to homepage
    // res.redirect('/');
});


// Update member with 'put' request
router.put('/:id', (req, res) => {
    // With some method we display 'false' if that member doesn't exsist
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            // We check if name is updated if not we use the previosly saved name
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member is updated', member })
            }
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
});


// Delete member with delete request
router.delete('/:id', (req, res) => {
    // With some method we display 'false' if that member doesn't exsist
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        // This is how we get single user by using filter method
        res.json({ msg: 'Member is deleted', mambers: members.filter(member => member.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
});


module.exports = router;