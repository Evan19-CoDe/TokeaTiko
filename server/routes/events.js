const express = require('express');
const mongoose = require('mongoose');  
const Event = require('../models/Event');
const router = express.Router();
const { authMiddleware } = require('./auth');

// Create a new event
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, date, location } = req.body;
    try {
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            createdBy: req.userId
        });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error creating event' });
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'username email');
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
});

// Get a single event by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id).populate('createdBy', 'username email');
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching event' });
    }
});

// Update an event
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, description, date, location } = req.body;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        if (event.createdBy.toString() !== req.userId) {
            return res.status(403).json({ error: 'Not authorized to update this event' });
        }
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;
        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Error updating event' });
    }
});

// Delete an event
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        if (event.createdBy.toString() !== req.userId) {
            return res.status(403).json({ error: 'Not authorized to delete this event' });
        }
        await event.remove();
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting event' });
    }
});

// Export the router
module.exports = router;