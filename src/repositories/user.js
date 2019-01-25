import userModel from '../models/user';
import bcrypt from 'bcrypt';

const moment = require('moment');
const mongoDB = require('mongodb');

export default (db) => {

  const index = async () => {
    try {
      return await userModel(db).find().toArray();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const store = async (body) => {
    try {
      const now = moment().unix();
      body.password = await hashPassword(body.password);
      body.created_at = now;
      body.updated_at = now;
      return await userModel(db).insertOne(body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const show = async (id) => {
    try {
      return await userModel(db).findOne({_id: mongoDB.ObjectId(id)}, {password: 0});
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const update = async (id, body) => {
    try {
      const now = moment().unix();
      body.created_at = now;
      body.updated_at = now;
      return await userModel(db).findOneAndUpdate({_id: mongoDB.ObjectId(id)}, body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const destroy = async (id) => {
    try {
      return await userModel(db).findOneAndDelete({_id: mongoDB.ObjectId(id)});
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getByEmail = async (email) => {
    try {
      return await userModel(db).findOne({email});
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
