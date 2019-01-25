import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import userRepo from './repositories/user';

export default (db, passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.AUTH_SECRET;
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    let user;
    try {
      user = await userRepo(db).getByEmail(jwt_payload.email);
      if (!user) {
        return done(null, false, {message: 'No user by that email'});
      }
    }
    catch (e) {
      return done(e);
    }
    return done(null, user);
  }));
};
