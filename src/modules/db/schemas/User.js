const User = {
  login: {
    type: String,
    required: true
  },
  reset_token: {
    type: String
  },
  reset_token_expire_date: {
    type: Date
  },
  password: {
    type: String,
    required: true
  },
  updated_date: {
    type: Date,
    default: new Date()
  },
  created_date: {
    type: Date,
    default: new Date()
  },
}

export default User