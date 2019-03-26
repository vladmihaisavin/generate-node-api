export default callback => {
  callback(require('./models')._sequelize);
}
