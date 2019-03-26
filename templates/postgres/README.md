# generate-node-api
Out of the box structure for an API

# How to install
Create a database<br>
Populate the environment file (.env)<br>
`npm run migrate`<br>
`npm run build`<br>
`npm run dev` OR `npm run start`, depending on environment.

# How to access swagger docs
Open browser and load `http://localhost:3000/api-docs/`, considering the PORT at which the server is running is 3000

# How to test
`npm test`

# Troubleshooting
If there is a problem while running bcrypt, try recompiling it. <br>
On my mac, this worked: `CXX=clang++ npm rebuild bcrypt --build-from-source`
