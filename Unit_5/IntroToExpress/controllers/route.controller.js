const router = require('express').Router();
const db = require('../db.json');


/* 
Quick Challenge:
    - Frame a GET route
        - No endpoint is required to access. It will "Get All" based off /routes
            - note: Where is "/routes" coming from?
    
    No need to work through the logic within the code block.
*/
router.get('/', (req,res) => {
    try {
        
        res.status(200).json({
            results: db
        })

    } catch (err) {
        res.status(500).json({
            error: err.message  
        })
    }
})

/* 
    Syntax: 
        URL - /:id
            - denote a parameter value. Endpoint is expecting a reference value.

        example URL with a parameter:
            http://localhost:4000/routes/1

        - "1" would reference a parameter or flexible string.
            - This could be a name of something or anything that we want.
*/
router.get('/find-one/:id', (req,res) => {
    // console.log(req);
    // console.log(req.params);

    /* 
        - used to help us locate one item in our database
        - ID typically has a unique value to help us find that ONE item.
        - Can help us search several times.
    */

    try {

        let { id } = req.params;
        let results = db.filter(i => i.id == id);

        console.log(results);

        res.status(200).json({
            results: results[0]
        })

    } catch (err) {
        res.status(500).json({
            error: err.message  
        })
    }
})


//* Query
router.get('/query/', (req,res) => {

    /* 
        - Anything after the endpoint can be extracted.
        ex: 
            localhost:4000/routes/query/?firstname="John"
    */

    try {
        // console.log(req.query.firstName);
        const {firstName, lastName} = req.query;
        // multi query: localhost:4000/query/?firstName=John&lastName=Doe

        if(firstName && lastName) {
            console.log(firstName, lastName)
            res.status(200).json({
                results: {
                    first: firstName,
                    last: lastName,
                    fullName: `${firstName} ${lastName}`
                }
            })
        } else {
            throw new Error("Need to supply First and Last Names");
        }
        
    } catch (err) {
        res.status(500).json({
            error: err.message  
        })
    }
});

router.get('*', (req,res) => {
    try {
        res.status(200).json({
            results: "wild card"
        })
    } catch (err) {
        res.status(500).json({
            error: err.message  
        })
    }
});

module.exports = router;