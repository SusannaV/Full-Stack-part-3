require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

//käynnistä komennolla npm run dev
//Heroku päivitetään komennolla npm run deploy:full JA SE TULEE AJAA JOSSAIN MUUALLA
//KUIN VSC:N TERMINAALISSA!
//Herokun nimi on Boiling River  (https://boiling-river-75884.herokuapp.com/)

app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    console.log('Sending all dudes your way!')
    response.json(persons.map(dude => dude.toJSON()))
  })
})

app.get('/info', async (request, response) => {
  const numberOfDudes = await Person.countDocuments({})
  response.send(`<div><p>Phonebook has info for ${numberOfDudes} people.</p><p>${new Date()}</p></div>`)
}
)

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(dude => {
    if(dude){
      response.json(dude.toJSON())
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})


morgan.token('bodytoken', function getBody(req){return JSON.stringify(req.body)} )


app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodytoken'))

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(body)

  const person = new Person({
    name: body.name,
    number: body.number
  })
  console.log(person)

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then (savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})



app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
}
)




app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
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
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})