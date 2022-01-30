const BlogDb = require('../Models/Blog');
const {body, validationResult} = require('express-validator');
const {sanitizeBody} = require('express-validator');
const apiResponse = require('../Components/apiresponse');


module.exports.createBlog =[
	body('id').isLength({min: 1}).trim().withMessage('id must be specified.'),
	body('title').isLength({min: 1}).trim().withMessage('title must be specified.'),
	body('description').isLength({min: 1}).trim().withMessage('title must be specified.'),
	sanitizeBody('id').escape(),
	sanitizeBody('title').escape(),
	sanitizeBody('description').escape(),
	(async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
						 return apiResponse.validationErrorWithData(res, 'Validation Error.', errors.array());
			} else {
					const Blog = await new BlogDb(req.body).save();
					if (Blog) {
						return apiResponse.successResponseWithData(res, 'Blog has been created successfully', Blog);
					}
				
			}
		} catch (err) {
			return apiResponse.errorResponse(res, err);
		}
	})];


module.exports.updateBlog =[
  			   body('id').isLength({min: 1}).trim().withMessage('id must be specified'),
               body('title').isLength({min: 1}).trim().withMessage('status number must be specified'),
			   body('description').isLength({min: 1}).trim().withMessage('note must be specified.'),
			   sanitizeBody('updateid').escape(),
		     	sanitizeBody('id').escape(),
	             sanitizeBody('title').escape(),
	             sanitizeBody('description').escape(),
	(async (req, res) => {
				 try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, 'Validation Error.', errors.array());
				   } else {
	              const updateBlog = await BlogDb.updateOne({id: req.body.id}, req.body);
	            				return apiResponse.successResponse(res, 'Blog  successfully updated', updateBlog);
				}
		} catch (err) {
			return apiResponse.errorResponse(res, err);
		}
	})];



module.exports.getBlog=[
	(async (req, res) => {
		try {
 		   const Blog = await BlogDb.findOne({id: req.params.id});
				return apiResponse.successResponseWithData(res, ' Successfully Found.', Blog);
     	} catch (err) {
	     	return apiResponse.errorResponse(res, err);
		}
	})];





	module.exports.getBlogs=[
	(async (req, res) => {
		try {
		     		   const Blogs = await BlogDb.find();
		     		   	 
		    				return apiResponse.successResponseWithData(res, ' Successfully Found.', Blogs);
		     		  
		 	    } catch (err) {
	     	return apiResponse.errorResponse(res, err);
		}
	})];




	module.exports.deleteBlog=[
	(async (req, res) => {
		try {
 		   const Blogs = await BlogDb.deleteOne({id: req.params.id});
 		   	 
				return apiResponse.successResponseWithData(res, 'Deleted successfully', Blogs);
		     		  
		 	    } catch (err) {
	     	return apiResponse.errorResponse(res, err);
		}
	})];