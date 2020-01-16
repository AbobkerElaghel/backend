const express               = require("express"),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      app                   = express();
      port                  = process.env.PORT || 7000,
      jwt                   = require('jsonwebtoken'),
      JwtStrategy           = require('passport-jwt').Strategy,
      ExtractJWT            = require('passport-jwt').ExtractJwt,
      passport              = require('passport'),
      User                  = require("./models/user.js"),
      Friendship            = require("./models/friendship.js"),
      Message               = require("./models/message.js"),
      Request               = require("./models/request.js"),
      Group                 = require("./models/group.js"),
      users                 = require("./routes/users.js"),
      requests              = require("./routes/requests.js"),
      friends               = require("./routes/friends.js"),
      config                = require("./config.js"),
      cors                  = require("cors")

mongoose.connect("mongodb://waar:waarwaar7@ds263368.mlab.com:63368/nodes" , 
{ useUnifiedTopology: true ,  useNewUrlParser: true })      
mongoose.connection.once("open" , ()=> console.log("workin properly"))

app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new JwtStrategy({
        jwtFromRequest : ExtractJWT.fromAuthHeaderWithScheme("jwt"),
        secretOrKey : config.secret}, function(jwt_payload, done) {
        User.findById(jwt_payload._id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
    app.use("/api/users" , users)
    app.use("/api/requests" , requests)
    app.use("/api/friends" , friends)


app.get("/" , (req,res) => {
    res.json({team : "Waar" ,project : "Nodes", version : "1.0.0"})
})
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
      