// Credits: Aiperi Eldar, Sam Lawson, and Ryan "RyRy" 
// for helping our team figure out the text to speech software as well as the proper
// logic for the PUTS / GETS in the CRUD functionality.

module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    //Result
    app.get('/', function(req, res) {
        //tells us what page to render in the dom
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      //get request grabs profile function
      // routes js line 14-19 is our request. GET is what we use to achieve this
        db.collection('orders').find().toArray((err, result) => {
          //reuest to grabbatabase collection named message,into array
          if (err) return console.log(err)
          //conditional console logged for error
          res.render('profile.ejs', {
            user : req.user,
            orders: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================
    //Create
    app.post('/orders', (req, res) => {
//creating a message with the username ( email) the message they post, thumbUp and thumbDown and each time you press submit, this is activated and saves to the database
//console.log redirects you back to profile.ejs (refresh)
        db.collection('orders').save({name: req.body.name, order: req.body.order, size: req.body.size, cream: req.body.cream, milk: req.body.milk, espresso: req.body.espresso, caramel: req.body.caramel, sugar: req.body.sugar, status: "not made yet!",barista:""}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to coffee database')
        //refreshing the page, which will then display with the latest message added.
        res.redirect('/')
      })
    })


//When the user clicks UP/Down etc , a PUT/Update will happen
    app.put('/orders',isLoggedIn,(req, res) => {
      db.collection('orders')
      .findOneAndUpdate({name: req.body.name, order: req.body.order, status: "not made yet!" }, {
        //relates to put /messages
        //goes into the array andgoes into individualnames of the constructors.
        //need to perfect..
// The $set operator replaces the value of a field with the specified value.
        $set: {
          status: "COMPLETED!!",
          barista: req.user.local.email
        }
      }, {
        // sort is an arrayfunction tosort the order [bottom to top: -1]
        //upsert [insert & update that specific thing [thumbsUp]]
        sort: {_id: -1}, //this sorts the information bottom to top (-1)
        upsert: true //insett andupdate = upsert
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.put('/thumbDown', (req, res) => {
      db.collection('orders')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbUp:req.body.thumbUp - 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/orders', (req, res) => {
      //deletemethod:Deletes a single document based on the filter and sort criteria, returning the deleted document https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndDelete/
      db.collection('orders').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {//looks at messages collection,s finds and deletes.
        if (err) return res.send(500, err)//if error, send error
        res.send('Message deleted!')
      })
    })

//Authenticates the user and makes sure user is logged in and only on their account  =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
