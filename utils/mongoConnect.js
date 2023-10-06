const mongoose = require("mongoose");

//tanto password como usuario deberian estar en variables de entorno
const rescueUri = () => {
  return `mongodb+srv://rifa2002:BZQg3JqzaEQXuw7N@cluster0.oguua.mongodb.net/test?retryWrites=true&w=majority`;
};

const mongoConnect = () => {
  console.log("loop on mongo connect");
  mongoose.Promise = global.Promise;
  mongoose
    .connect(rescueUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      (data) => {
        console.log(
          "Database sucessfully connected!",
          data.connections[0].name
        );
      },
      (error) => {
        console.log("Could not connect to database: " + error.message);
        if (error.message.includes("querySrv ENODATA")) {
          console.log("Trying again with rescue uri...");
          mongoose
            .connect(rescueUri(), {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
            })
            .then(
              (data) => {
                console.log(
                  "Database sucessfully connected!",
                  data.connections[0].name
                );
              },
              (error) => {
                console.log("Could not connect to database: " + error);
              }
            );
        }
      }
    );
};

module.exports = mongoConnect;
