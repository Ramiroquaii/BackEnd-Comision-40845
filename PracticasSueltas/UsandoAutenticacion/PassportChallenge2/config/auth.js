const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { hashSync, compareSync } = require('bcrypt');

const users = [];

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  const user = users.find(user => user.username === username);
  done(null, user);
});

passport.use('login', new LocalStrategy((username, password, done) => {
  const user = users.find(user => user.username === username && compareSync(password, user.password));

  if (user) {
    done(null, user);
    return;
  }

  done(null, false);
}));

passport.use('signup', new LocalStrategy((username, password, done) => {
  const existentUser = users.find(user => user.username === username);
  if (existentUser) {
    done(new Error('User already exists'));
    return;
  }


  const user = { username, password: hashSync(password, 10) };
  console.log({ user });
  users.push(user);

  done(null, user);
}));
