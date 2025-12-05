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
  // find people by name
  Person.find({ name: personName}, function(err, personFound){
    //standard error handling
    if (err){
      return done(err);
    }
    //success!
    //'personFound' is an array of the found documents
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  // find one person by favorite food
  Person.findOne({favouriteFoods: food}, function(err,data){
    //standard error handling
    if (err){
      return done(err);
    }
    //success!
    //Note: 'data' is a single objct{name : ..., age: ..., favoriteFoods: [...]}
    //we can access to name like data.name
    //if no match is found 'data' is null
    done(null, data);
  })
};

const findPersonById = ((personId, done) => {
  // find person by ID
  Person.findById(personId, function(err, data){
    //standard error handling
    if (err){
      return done(err);
    }
    //success!
    //'data' is the single documentmatching ID

  done(null , data);
});
});

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // find person by ID
  Person.findById(personId, function(err, person){
    if (err){
      return done(err);
    }
    //add the food to the person's favoriteFoods array
    person.favoriteFoods.push(foodToAdd);
    //save the updated document
    person.save(function(err, updatedPerson){
      if (err){
        return done(err);
      }
      //success!
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // find one person by name and update their age
  //Patterrn : Model.findOneAndUpdate(conditions, update, options, callback)

  Person.findOneAndUpdate(
    { name: personName }, //conditions
    {age: ageToSet} ,//update
    { new: true }, //options: return the updated document
    function(err, updatedPerson){
      if (err){
        return done(err);
      }
      //success!
      done(null, updatedPerson);
    }
  );
};



const removeById = (personId, done) => {
  /*Think?
  1.Model? -> Person
  2.Method? -> findByIdAndRemove
  3.Arguments? -> personId, callback
  4.Callback? -> function(err, data){...}
  5.Error Handling? -> if(err) return done(err);
  6.Success Handling? -> done(null, data);
  7.What is data? -> the removed document
  8.Return? -> done(null, data);
  9.Final Code? -> see below
  */

  Person.findByIdAndDelete(personId, function(err, data){
    if (err){
      return done(err);
    }
    //success!
    //'removedDoc' contains the object details of the person we just deleted.
    //If the ID didn't exist, 'removedDoc' is null
    done(null, data);
  }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  /*Think?
  1.Model? -> Person
  2.Method? -> .deleteMany()
  3.Arguments? -> {name: nameToRemove}, callback
  4.Callback? -> function(err, data){...}
  5.Error Handling? -> if(err) return done(err);
  6.Success Handling? -> done(null, data);
  7.What is data? -> the result object containing info about the operation
  8.Return? -> done(null, data);
  9.Final Code? -> see below
  */

  Person.remove({ name: nameToRemove }, function(err, data){
    if (err){
      return done(err);
    }
    //success!
    //'data' contains info about the operation
    //like number of documents deleted
    done(null, data);
  }
  );
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  //build the pipeline of query methods
  Person.find({ favoriteFoods: foodToSearch }) //find people who like burrito
    .sort({ name: 1 }) //sort by name ascending
    .limit(2) //limit to 2 results
    .select({ age: 0 }) //exclude age field
    .exec(function(err, data){ //execute the query
      if (err){
        return done(err);
      }
      //success!
      //'data' is the array of matching documents
      done(null, data);
    }
    );
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
