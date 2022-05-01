// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in mongoose model
const Event = require('../models/event')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// this is middleware that will remove blank fields from `req.body`, e.g.
// { event: { title: '', text: 'foo' } } -> { event: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })
// instantiate a router (mini app that only handles routes)
const router = express.Router()

// POST create a comment
// POST /comments/:eventId
router.post('/comments/:eventId', removeBlanks, (req, res, next) => {
    // get our comment from req.body
    const comment = req.body.comment
    // get our eventId from req.params.id
    const eventId = req.params.eventId
    // find the event
    Event.findById(eventId)
        //handle what happens if no events are found
        .then(handle404)
        // push the comment to comments array
        .then(event => {
            console.log('this is the event', event)
            console.log('this is the comment', comment)
            event.comments.push(comment)
            // save the comment
            return comment.save()
        })
        // the we send the comment as json
        .then(event => res.status(201).json({ event: event}))
        // catch errors and send to the handler
        .catch(next)
})

// UPDATE
// PATCH /comments
router.patch('/comments/:eventId/:commentId', requireToken, removeBlanks, (req, res, next) => {
    const commentId = req.params.commentId
    const eventId = req.params.eventId

    Event.findById(eventId)
        .then(handle404)
        .then(event => {
            const theComment = event.comments.id(commentId)
            console.log('this is the original event', theComment)
            //requireOwnership(req, event)

            theComment.set(req.body.comment)

            return event.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE a comment
// DELETE /comments/:eventId/:commentId
router.delete('/comments/:eventId/:commentId', requireToken, (req, res, next) => {
    const commentId = req.params.commentId
    const eventId = req.params.eventId

    Event.findById(eventId)
        // if event not found, throw 404
        .then(handle404)
        .then(event => {
            const theComment = event.comments.id(commentId)
            theComment.remove()
            // return the saved event
            return event.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router