const admin = require('../config/firebase/firebase-config');

const { Book, User } = require('../config/database/models');

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
  /* 

  async findOrCreateUser(req, res, next) {
    try {
      console.log('look at me here');
      console.log(req.user.uid);
      const useruid = req.user.uid;
      const userdisplayname = req.user.name;
      const user = await User.findOrCreate({
        where: { displayName: userdisplayname },
      });
      if (user != null) {
        console.log(user);
        return next();
      }
      //const useruid = req.user.uid;
      const userid = '2';
      //const userdisplayname = req.user.displayname;
      const dbuser = await User.create({ useruid, userid, userdisplayname });
      res.json({ message: 'Un authorize' });
      //return
    } catch (e) {
      return res.json({ message: 'Internal Error' });
    }
    
  } */
}

module.exports = new Middleware();
