const admin = require('../config/firebase/firebase-config');
class Middleware {
  async decodeIDToken(req, res, next) {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
      const idToken = req.headers.authorization.split(' ')[1];
      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req['currentUser'] = decodedToken;
      } catch (err) {
        console.log(err);
      }
    }
    next();
  }
}

module.exports = new Middleware();
