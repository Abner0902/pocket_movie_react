import React, { Component } from 'react';
import email from 'email'

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            feedback: '',
            formErrors: { email: '', name: '' },
            emailValid: false,
            nameValid: false,
            formValid: false
        }

        this.sendEmail = this.sendEmail.bind(this);
    }

    handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    handleFeedBack(e) {
        const value = e.target.value;
        this.setState({ feedback: value });
    }

    validateField(fieldName, value) {
        var fieldValidationErrors = this.state.formErrors;
        var emailValid = this.state.emailValid;
        var nameValid = this.state.nameValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'name':
                //https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
                nameValid = value.match(/^(([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+)$/i);
                fieldValidationErrors.name = nameValid ? '' : ' format is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            nameValid: nameValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.nameValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'is-invalid');
    }

    sendEmail() {
        var Email = email.Email
        var myMsg = new Email(
            {
                from: this.state.email,
                to: "abnerliu26@gmail.com",
                subject: "Customer Feedback from " + this.state.name,
                body: this.state.feedback
            })

        // if callback is provided, errors will be passed into it
        // else errors will be thrown
        alert("Email body: " + myMsg.body);
    }

    render() {
        var styles = {
            textAlign: 'center'
        };

        let nameRegex = "^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
        return (

            <div className="container" >
                <h2>Contact Us</h2>
                <form className='was-validated'>

                    <div className='form-group row'>
                        <label htmlFor="inputName" className="col-sm-1 col-form-label">Name</label>
                        <div className="col-sm-12">
                            <input type="text" className={"form-control " + this.errorClass(this.state.formErrors.name)} pattern={nameRegex} name='name' id="inputName" placeholder="John Smith" value={this.state.name} onChange={(event) => this.handleInput(event)} />
                            <div className="invalid-feedback">
                                Please provide a valid name.
                            </div>
                        </div>

                    </div>

                    <div className='form-group row'>
                        <label htmlFor="inputEmail" className="col-sm-1 col-form-label">Email</label>
                        <div className="col-sm-12">
                            <input type="email" className={"form-control " + this.errorClass(this.state.formErrors.email)} name='email' id="inputEmail" placeholder="email@example.com" value={this.state.email} onChange={(event) => this.handleInput(event)} />
                            <div className="invalid-feedback">
                                Please provide a valid email.
                            </div>
                        </div>

                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-sm-1 col-form-label">Feedback</label>
                        <div className="col-sm-12">
                            <textarea type="text" className="form-control" id="inputFeedback" placeholder="Any feedback..." value={this.state.feedback} onChange={(event) => this.handleFeedBack(event)} />
                        </div>
                    </div>
                    <div className='form-group row' style={styles}>
                        <div className='offset-sm-2 col-sm-8'>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.sendEmail} disabled={!this.state.formValid}>Submit</button>
                        </div>
                    </div>
                </form>
            </div >
        );
    }
}

export default Contact;