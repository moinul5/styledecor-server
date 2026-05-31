const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  decoratorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  projectStatus: {
    type: String,
    enum: [
      'Assigned',
      'Planning Phase',
      'Materials Prepared',
      'On The Way',
      'Setup In Progress',
      'Completed',
    ],
    default: 'Assigned',
  },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
