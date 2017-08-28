const Thread = {
  name: { // User name or Company name
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
}

export default Thread
