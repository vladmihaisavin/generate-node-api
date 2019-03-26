import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';

export default (httpClient, passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.AUTH_SECRET;
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    return done(null, jwt_payload);
  }));
};
