export function validate(input) {
  let error = {
    isError: false,
    firstName: "",
    gender: "",
    lastName: "",
    codeVerification: ""
  }

  if (!input.firstName) {
    error.firstName = "First Name is required"
    error.isError = true
  } else if (input.firstName.length < 3) {
    error.firstName = "A valid name is required"
    error.isError = true
  }
  if (!input.lastName) {
    error.lastName = "Last name is required"
    error.isError = true
  } else if (input.lastName.length < 3) {
    error.lastName = "A valid last name is required"
    error.isError = true
  }
  if (!input.gender) {
    error.gender = "Gender is required"
    error.isError = true
  }
  if (!input.codeVerification) {
    error.codeVerification = "Check your whatsapp"
    error.isError = true
  } else if (Number(input.codeVerification) !== input.code) {
    error.codeVerification = "invalid Code"
    error.isError = true
  }
  return error
}