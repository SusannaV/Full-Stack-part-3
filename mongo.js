const mongoose = require('mongoose')

  const password = process.argv[2]
  
  const url =
    
     `mongodb+srv://fullstackuser:${password}@puhelinluettelocluster.vg2su.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    //id: Number,
  })
  
  const Person = mongoose.model('Person', personSchema)
  
  if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    //id: 1,
  })
  
  person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })


  } else {
    console.log('Phonebook:')  
    Person.find({  }).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

  