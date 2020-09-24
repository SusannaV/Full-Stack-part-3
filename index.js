require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')


app.use(cors())
app.use(express.static('build'))
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      console.log('Sending all dudes your way!')
      response.json(persons.map(dude => dude.toJSON()))
    })
  })

  // app.get('/info', (req, res) => {
  //   res.send('<div><p>Phonebook has info for ' + persons.length +  ' people</p><p>' + new Date() + '</p></div>')
  // })

  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(dude => {
      if(dude){
        console.log('Here you go!')
        response.json(dude.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })


  morgan.token("bodytoken", function getBody(req){return JSON.stringify(req.body)} )


  app.use(express.json()) 
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodytoken'))

  const findDoubles = (props) => {
        const namelist = [...persons.map(n => n.name)]
        if (namelist.includes(props)){
            return true;
        } else {
            return false
        }
    
  }

  // app.post('/api/persons', (request, response) => {
  //   const body = request.body

  //   if (!body.name || !body.number) {
  //       console.log('there was something missing')
  //       return response.status(400).json({ 
  //         error: 'content missing' 
  //       })
  //     }


  //     if (findDoubles(body.name)) {
  //       console.log('name already exists')
  //       return response.status(400).json({ 
  //         error: 'name must be unique' 
  //       })
  //     }

  //   const person = {
  //     name: body.name,
  //     number: body.number,
  //     id: Math.floor(Math.random()*(10000-1)+1)
  //   }
  //   persons = persons.concat(person)
  //   response.json(person)
    
  // })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
  
    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    console.log('made it this far')
    const person = new Person({
      name: body.name,
      number: body.number
      //id: Math.floor(Math.random()*(10000-1)+1)
    })
    console.log(person)
  
    person.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'You seem to have made a cast error' })
    }
  
    next(error)
  }
  
  app.use(errorHandler)


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  // let persons = [
//     {
//         "name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//       },
//       {
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523",
//         "id": 2
//       },
//       {
//         "name": "Dan Abramov",
//         "number": "12-43-234345",
//         "id": 3
//       },
//       {
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122",
//         "id": 4
//       }
//   ]