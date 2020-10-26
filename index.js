const express = require('express');
const app = express(); 
const path = require('path'); 
const mongoose = require('mongoose');
const methodOverride = require('method-override'); 
const PORT = process.env.PORT || 5000; 


const uri = "mongodb+srv://kurikania:putovago@cluster0.dyqst.mongodb.net/todo?retryWrites=true&w=majority"
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));

const commentSchema = new mongoose.Schema({
    text: String,
  });
  
var Comment = mongoose.model("Comment", commentSchema);


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index'); 
})

app.get('/survey', (req, res) => {
    res.render('survey');
})

app.get('/articles', (req, res) => {
    res.render('articles');
})

app.get('/feedback', (req, res) => {
    Comment.find({}, function(err, comment){
        if(err){
          console.log(err);
        } else {
          if(req.xhr) {
            res.json();
          } else { 
          res.render("feedback", {comment: comment}); 
          } 
        }
      })
})

app.post('/feedback', (req, res) => {
    var formData = req.body.comment;
    Comment.create(formData, function(err, newComment){
       if(err){
         console.log(err);
       } else { 
           if (req.xhr) {
             res.json(newComment);
           } else {
             res.redirect('/feedback');
           }
         }
     });
})

app.delete("/feedback/:id", function(req, res){
    Comment.findById(req.params.id, function(err, comment){
      if(err){
        console.log(err);
      } else {
         comment.remove();
         res.redirect("/feedback");
      }
    }); 
   });

app.get('/finish', (req, res) => {
    res.render('finish')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/quotes', (req, res) => {
    const quote = require('prog-quote')().next().value
    res.render('qoutes', {quote}); 
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))