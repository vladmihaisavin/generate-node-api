import bcrypt from 'bcrypt';

export default (httpClient) => {

  const index = async () => {
    try {
      //Here, the API that you use for data persistence should be called
      return [];
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const store = async (body) => {
    try {
      body.password = await hashPassword(body.password);
      //Here, the API that you use for data persistence should be called
      return {};
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const show = async (id) => {
    try {
      //Here, the API that you use for data persistence should be called
      return {};
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const update = async (id, body) => {
    try {
      //Here, the API that you use for data persistence should be called
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const destroy = async (id) => {
    try {
      //Here, the API that you use for data persistence should be called
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getByEmail = async (email) => {
    try {
      //Here, the API that you use for data persistence should be called
      return {};
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
