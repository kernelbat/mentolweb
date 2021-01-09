export const required = value => {
  console.log('required', typeof value)
  if (Array.isArray(value)) {
    if (value.length > 0) {
      return undefined
    } else {
      return 'This field is required'
    }

  } else if ((value && typeof value === 'number') || (value && typeof value === 'object') || (value && value.trim())) {
    return undefined
  } else {
    return 'This field is required'
  }
}
export const validatePhone = value => {
  return value !== undefined ? value.length < 10 ? 'Please enter valid Mobile number' : '' : 'This field is required'
}
export const emailField = (value) => {
  return (value ?
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
      'Invalid email address' : '' : 'Email is required')
}