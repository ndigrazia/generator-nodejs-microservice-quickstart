const DEFAULT_ROLE = {
  name: 'Employee',
  description: 'General users of the system.'
}

const userRoles = [
  {
    name: 'Administrator',
    description: 'Highest level of access and control.'
  },
  {
    name: 'Supervisor',
    description: 'Manages and oversees other users or teams.'
  },
  DEFAULT_ROLE,
  {
    name: 'Customer',
    description: 'End-users or external individuals who interact with the application.'
  },
  {
    name: 'Anonymous',
    description: 'Users who have not created an account or logged in.'
  },
  {
    name: 'Vendor',
    description: 'External entities that provide goods or services to the organization.'
  },
  {
    name: 'Auditor',
    description: 'Monitors and reviews system activity for compliance, security, and auditing purposes.'
  },
  {
    name: 'Support',
    description: 'Assists users with inquiries, issues, and technical support.'
  }
]

const firstNameType = {
  type: String
}

const lastNameType = {
  type: String
}

const emailType = {
  type: String,
  match: /^\S+@\S+\.\S+$/,
  trim: true,
  lowercase: true
}

const streetType = {
  type: String,
  match: /^[a-zA-Z0-9\s.,'-]+$/
}

const zipCodeType = {
  type: String,
  match: /^[0-9]{5}$/
}

const cityType = {
  type: String
}

const stateType = {
  type: String,
  match: /^[A-Za-z]{2}$/
}

const countryType = {
  type: String
}

const addressType = {
  street: streetType,
  city: cityType,
  state: stateType,
  zipCode: zipCodeType,
  country: countryType
}

const roleType = {
  type: String,
  enum: userRoles.map(role => role.name)
}

const userSchema = {
  firstName: {
    ...firstNameType,
    required: true
  },
  lastName: {
    ...lastNameType,
    required: true
  },
  email: {
    ...emailType,
    required: true
  },
  address: {
    ...addressType,
    required: true
  },
  delivery: {
    ...addressType,
    required: true
  },
  role: {
    ...roleType,
    default: DEFAULT_ROLE.name
  }
}

module.exports = {
  userSchema,
  types: {
    firstName: firstNameType,
    lastName: lastNameType,
    email: emailType,
    address: addressType,
    role: roleType
  }
}
