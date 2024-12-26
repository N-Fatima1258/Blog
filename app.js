const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const post = require("./dbconnection");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/" , async (req,res) => {
const foundData = await post.find({});

res.render("home" , {startingContent: homeStartingContent , posts : foundData});

});

app.get("/about" , (req,res) => {
res.render("about" , {abouts: aboutContent});
});

app.get("/contact" , (req,res) => {
 res.render("contact" , {contacts: contactContent});
})

app.get("/compose" , (req,res) => {
res.render("compose");

});

app.post("/compose" , async (req,res) => {

const newPost = new post({
  title : req.body.postTitle,
  content : req.body.postBody
});
await newPost.save();

res.redirect("/");
});

app.get("/posts/:topic" , async (req,res) => {
const requestedTitle = req.params.topic;

 const foundData = await post.findOne({title: requestedTitle});

try{
  
if(!foundData) {

  res.status(404).send("Requested title does not exist");
  }
else{
  res.render("post" , {title: foundData.title , body: foundData.content} );
}
}
catch(err) {
  console.log(err);
}


});



app.listen(5000, function() {
  console.log("Server started on port 3000");
});





// to restart nodemon : type command (rs)

// word-word-word    Example:   a-my-house-isb      This is called kebab case

/*  ******COMMENTS FOR .ejs FILE******  
* ejs already knows to look inside the views folder
* when we click on contact us , we are actually making a get request to /contact route
which gets called in our server and we render the contact us page
* textarea used for multi line input
*/






/*
********** EXPRESS ROUTING PARAMETERS **************  (we just need to require express in order to work with this method)

app.get("/news/:topic" , (req,res) => {
  console.log(req.params.topic);
});
//here topic is route parameter and in order to access it using express , the syntax is (req.params.topic)
If I head over to localhost/news/science then it should log science

**** Route parameters
Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }

To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})


app.get("/posts/:topic/news/:topic1" , (req,res) => {
  console.log(req.params); 
});
// log topic and topic1 and their respective values as a JAcaScript object

In Express.js, routing parameters allow you to capture dynamic values from the URL and use them in your route handlers. These dynamic values can be useful for creating more flexible and dynamic routes in your application. Parameters are defined in the route path using colon (:) followed by the parameter name.


******Lodash******
It is a JavaScript utility library.
_.lowerCase converts upper case to lower case letters and remove hyphens , EXAMPLE: stored title was (Another Post) requested title was (another-post) and it convderts both to (another post)

It removes all kinds of special characters

*/