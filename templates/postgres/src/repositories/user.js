import bcrypt from 'bcrypt';

export default (db) => {

  const userModel = db.user;

  const index = async () => {
    try {
      return await userModel.findAll({
        order: [
          ['id', 'DESC']
        ]
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const store = async (body) => {
    try {
      body.password = await hashPassword(body.password);
      return await userModel.create(body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const show = async (id) => {
    try {
      return await userModel.findByPk(id);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const update = async (id, body) => {
    try {
      await userModel.update(body, { where: { id } });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const destroy = async (id) => {
    try {
      const user = await userModel.findByPk(id);
      if (user) {
        await user.destroy();
      }
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getByEmail = async (email) => {
    try {
      return await userModel.findOne({
        where: {
          email
        },
        raw: true
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const comparePassword = async (pass, hashedPassword) => {
    try {
      return await bcrypt.compare(pass, hashedPassword);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    index,
    store,
    show,
    update,
    destroy,
    getByEmail,
    comparePassword
  };
}
