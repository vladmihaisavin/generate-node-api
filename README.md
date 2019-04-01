# generate-node-api
Out of the box structure for an API

# Contents
1. Express
2. Authentication and Authorization: PassportJS with JWT
3. Testing: Mocha and Chai
4. Data persistence:<br>
4.1. Mongo with mongodb driver;<br>
4.2. PostgreSQL with pg driver and Sequelize ORM.
5. Validation: Joi
6. Documentation: Swagger

# How to install
`npm i generate-node-api -g`

# How to use
1. Go to a directory where you want to start a project;
2. Run `generate-node-api` in your terminal or command prompt;
3. Type a project name when your are prompted;
4. Select one of the boilerplates:<br>
4.1. Mongo - the boilerplate will need a mongo URI and DB to connect to. The tables must be created manually;<br>
4.2. Postgres - the boilerplate will need a PostgreSQL database. You can run the migration to initialize the tables;<br>
4.3. API - the boilerplate is useful to microservices which do not have direct access to a database. In this case, 
for data persistence purposes, some third party API will be called. 
5. Open the directory with that project name
6. Follow the instructions from the README file
7. Happy coding!
