

// const express = require('express')

// const app = express()

// app.use("/",(req,res)=>{
//     res.send("Server is running");
// });
// app.listen(5000,console.log("on 5000"));


const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Path to the React app build directory
const buildPath = path.join(__dirname,'apps', 'frontend');

// Serve the static files from the React app
app.use(express.static(buildPath));

// A catch-all route to handle all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




