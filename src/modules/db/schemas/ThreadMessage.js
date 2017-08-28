const ThreadMessage = {
  body: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  threadId: {
    type: Number,
    required: true
  },
  group: {
    type: Array,
    required: false
  }
}

export default ThreadMessage;
