const admin = require('../config/firebase/firebase-config');
const { Book, User } = require('../config/database/models');

class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);

      if (decodeValue) {
        req.user = decodeValue;
        const uid = decodeValue.uid;
        console.log(uid);
        /* console.log(req.user.uid);
        console.log(req.user.id);
        console.log(req.user.name); */
        console.log(decodeValue);
        return next();
      }
      return res.json({ message: 'Un authorize' });
    } catch (e) {
      return res.json({ message: 'Internal Error' });
    }
  }

  async findOrCreateUser(req, res, next) {
    try {
      console.log('look at me here');
      console.log(req.user.uid);
      const useruid = req.user.uid;

      const userdisplayname = req.user.name;
      const user = await User.findOrCreate({
        where: { displayName: userdisplayname },
      });
      /* 
      const isUIdUnique = (userUid) =>
        User.findOne({ where: { Uid }, attributes: ['uid'] })
          .then((token) => token !== null)
          .then((isUnique) => isUnique);

      console.log(isUIdUnique(Uid));
      if (!isUIdUnique(Uid)) {
        const dbuser = User.create({ useruid, userid, userdisplayname });
      } */
      /*  console.log('ich bin hei');
      await this.decodeToken(req, res, next);
      console.log(req.user.uid);
        const useruid = req.user.uid;
        const userid = '1';
        const userdisplayname = req.user.name; */
      /*  const useruid = req.user.uid;
      const userid = '1';
      const userdisplayname = 'abbas';
      const dbuser = User.create({ useruid, userid, userdisplayname }); */
      //console.log(dbuser);

      /*  const users = await User.findAll({
        where: { uid: useruid },
      }); */
      /* if (!user) {
        console.log('loosafsafak at me here');

        const useruid = req.user.uid;
        const userid = '1';
        const userdisplayname = req.user.displayname;
        const dbuser = await User.create({ useruid, userid, userdisplayname });
        console.log(dbuser);

        return next();
      } */
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
    /* 
      console.log(req.user.id);
      console.log(req.user.name);
      const useruid = req.user.uid;
      const userid = req.user.id;
      const userdisplayname = 'hay';
      const user = await User.findOne({
        where: { uid },
      }); 
    } catch (e) {
      //const user = await User.create({ useruid, userid, userdisplayname });
      res.json({ message: 'Unsss authorize' });
    } */
  }
}

module.exports = new Middleware();
