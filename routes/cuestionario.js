const Router=require('express');
const router=new Router();
const {CreateForm, SearchForm}= require('../controllers/formController');

router.post('/',[],CreateForm);
router.get('/:id',[],SearchForm);

module.exports=router;
