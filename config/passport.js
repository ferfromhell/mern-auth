const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
const coockieExtractor = (req)=>{
  let token = null;
  // console.log(req);
  if(req && req.cookies){
    token = req.cookies['cokkiebbs'];
    // console.log(`token: ${token}`);
  }
  return token;
}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = coockieExtractor;
opts.secretOrKey = keys.secretJWT;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
    User.findById(jwt_payload.id)
    .then(user => {
      if(user){
        return done(null, user); 
      }
      return done(null, false);
    })
    .catch(err => console.log(err));
    //console.log(jwt_payload);
  }));
}

