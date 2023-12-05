const express= require("express");
const router = express.Router();
const friends = require("../models/friends");

// ● Part 1: Add support to the 'filter' endpoint for a new query parameter 'letter' which filters friends by starting letter
// ● Part 2: Modify the 'info' route to only return the user-agent, content-type and accept header data
// ● Part 3: Modify the dynamic GET route to return a single friend object matching the dynamic 'id' request parameter
// ● Part 4: Complete the PUT route which will update data for an existing friend

router.get('/',(req,res)=>{
    res.json(friends)
})

// Step 1: 
router.get ('/',(req,res)=>{
    console.log(req.query)
let filterGender= req.query.gender;
let filterLetter= req.query.letter;

let matchingFriends = [...friends];

if(filterLetter){
    matchingFriends = matchingFriends.filter(friend => friend.name.startsWith(filterLetter))
}
if(filterGender){
    matchingFriends = matchingFriends.filter(friend => friend.gender === filterGender)
}

if (matchingFriends.length>0){
    res.json(matchingFriends)
}else{
    res.status(404).send("No friends found")
}
});

// step 2: Get information about this request from the headers
router.get('/info', (req, res) => {
    const userAgent = req.get('User-Agent');
    const contentType = req.get('Content-Type');
    const accept = req.get('Accept');
    res.send(`User-Agent: ${userAgent} Content-Type: ${contentType} Accept: ${accept}`);
});
// step 3:// 3. Dynamic request param endpoint - get the friend matching the specific ID ie. /friends/3
router.get('/:id', (req, res) => {
    console.log(req.params);
    const friend = friends.find(friend => friend.id === parseInt(req.params.id));
    if (friend) {
        res.json(friend);
    } else {
        res.status(404).send('Friend not found');
    }
});
// Step 4: 
router.put('/:id', (req, res) => {
    const friend = friends.find(friend => friend.id === parseInt(req.params.id));
    if (friend) {
        friend.name = req.body.name;
        friend.gender = req.body.gender;
        res.json(friend);
    } else {
        res.status(404).send('Friend not found');
    }
});


module.exports = router;