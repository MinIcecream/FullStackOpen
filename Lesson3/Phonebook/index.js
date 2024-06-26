const express = require("express")
const morgan = require("morgan")
const Person = require("./models/person")
const app = express()

app.use(express.json())
app.use(morgan((tokens, req, res) => {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, "content-length"), "-",
		tokens["response-time"](req, res), "ms",
		JSON.stringify(req.body)
	].join(" ")
}))
app.use(express.static("dist"))

app.get("/api/persons", (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id).then(person => {
		if (person) {
			response.json(person)
		}
		else {
			response.status(404).end()
		}
	})
		.catch(error => next(error))
})

app.get("/info", (request, response) => {
	const now = new Date()
	Person.countDocuments({}).then(count => {
		response.send(`
        <p>Phonebook has info for ${count} people</p> 
        <p>${now}</p>
    `)
	})
})

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndDelete(request.params.id).then(deletedPerson => {
		response.json(deletedPerson)
	})
		.catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
	const body = request.body

	const newPerson = new Person({
		name: body.name,
		number: body.number,
	})
	newPerson.save().then(savedPerson => {
		response.json(savedPerson)
	})
		.catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
	const body = request.body

	const newPerson = {
		name: body.name,
		number: body.number,
	}
	Person.findByIdAndUpdate(request.params.id, newPerson, { new: true, runValidators: true, context: "query" })
		.then(updatedPerson => {
			console.log("updated ", updatedPerson)
			response.json(updatedPerson)
		})
		.catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {

	console.log(error)
	if(error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	}
	else if (error.name === "ValidationError")
	{
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

app.use(errorHandler)

const PORT = process.env.port || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

