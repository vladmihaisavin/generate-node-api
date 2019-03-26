import passport from 'passport';
import response from './response';

export default (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user) => {
    if (err) {
      response(res).error('Internal server error', 500);
    } else if (!user) {
      response(res).unauthorized('Not authorized to access this resource');
    } else {
      req.currentUser = user;
      next();
    }
  })(req, res, next);
}
