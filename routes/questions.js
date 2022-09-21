const {Router}= require('express');
const router=Router(); 
const {createQuestions}= require('../controllers/questionController');

router.post('/',[],createQuestions);

module.exports=router;