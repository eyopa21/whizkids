const HASURA_OPERATION = `
query MyQuery($email: String!) {
  users(where: {email: {_eq: $email}}) {
    id
    email
    full_name
    phone_number
    sex
    password
    updated_at
    created_at
    appointments {
      id
      note
      price
      date
    }
  }

    doctors(where: {email: {_eq: $email}}) {
      email
      id
      full_name
      phone_number
      password
      updated_at
      created_at
      sex
      appointments {
        id
        note
        price
        date
      }
    }
}
`;
const HASURA_TEST = `
query myQuery($email, String!){
  login(email: $email) {
    email
    id
    password
  }
}
`

const login = async(req, res) => {
    const { email } = req.body.input;
    console.log("req", email);

};




module.exports = { login };