# generate-node-api
Out of the box structure for an API

# How to install
1. Create a database<br>
2. Populate the environment file (.env)<br>
3. `npm install`<br>
4. `npm run migrate`<br>
5. `npm run build`<br>
6. `npm run dev` OR `npm run start`, depending on environment.

# How to access swagger docs
Open browser and load `http://localhost:3000/api-docs/`, considering the PORT at which the server is running is 3000

# How to test
`npm test`

# Troubleshooting
If there is a problem while running bcrypt, try recompiling it. <br>
On my mac, this worked: `CXX=clang++ npm rebuild bcrypt --build-from-source`
