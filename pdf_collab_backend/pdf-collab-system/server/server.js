
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000, () => console.log("Server started on port 5000"));
});
