const {Router}= require('express');
const router=Router(); 

const {createResponse} =require('../controllers/answerController');
const { validateUserText } = require('../middleware/validateUserText');

router.post('/',[validateUserText],createResponse);

module.exports=router;