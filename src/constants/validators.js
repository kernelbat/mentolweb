export const required = value => {
    console.log("value required",value)
    return value ? undefined : 'This field is required'
  }
  export const validatePhone = value => {
    return value !== undefined ? value.length < 10 ? 'Please enter valid Mobile number' : '' : 'This field is required'
  }
  export const emailField = (value) => {
    return (value ?
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : '' : 'Email is required')
  }