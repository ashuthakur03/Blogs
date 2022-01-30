const BlogRoute = require('../Services/Blog');

module.exports=(app)=>{
	app.post('/createBlog', BlogRoute.createBlog);
	app.put('/updateBlog', BlogRoute.updateBlog);
   	app.get('/getBlog/:id', BlogRoute.getBlog);
   	app.get('/getBlogs', BlogRoute.getBlogs);
   	app.delete('/deleteBlog/:id', BlogRoute.deleteBlog);
};

