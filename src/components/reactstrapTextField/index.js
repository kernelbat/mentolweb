import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const renderReactStrapField = ({ input, hidden,disabled, label, type, props, meta: {asyncValidate, touched, error, warning } }) => {
    console.log('props',props)
    return <FormGroup style={{marginTop:hidden?'-37px':'0px'}} className={asyncValidate ? 'async-validating' : ''}>
        <Label for={label}>{label}</Label>
        <Input disabled={disabled} hidden={hidden} invalid={(touched && error) || (warning)} type={type} {...props} {...input} placeholder={label} />
        <FormFeedback>{error}</FormFeedback>
    </FormGroup>
}
export default renderReactStrapField