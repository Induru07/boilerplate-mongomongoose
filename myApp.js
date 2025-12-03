require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Database Connected Successfully!");
  })
  .catch((err) => {
    console.error("❌ Connection Error:", err);
  });

let Person;
const Schema = mongoose.Schema;// create a person schema
const personSchema = new Schema({// define the schema here
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

//create a model with the schema(the manufacturer of the document)
Person = mongoose.model("Person", personSchema);
/*in here  we create functions to make operations with the database 
and Person model we created before*/

const createAndSavePerson = (done) => {
  // create a person document
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["pizza", "pasta" , "kankun"] 
  })

  // save the document to the database
  person.save(function(err, data) {//we pass a callback function to handle the result

    //handle Error(Node Convention)
    if (err) {
      return done(err);//If error,tell the system we failed
    }
    //Handle Success
    //if no error, we pass null as the first argument and the saved data as the second
    done(null, data);

    
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  // create many people documents
  Person.create(arrayOfPeople, function(err, people){
    //standard Node error handling
    if (err){
      return done(err);
    }
    //success!
    //'people' is an array of the created documents
    done(null, people);
  })

};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
