import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUsername } from '../../redux/reducer'
import axios from 'axios'

class RegisterForm extends Component {
	constructor() {
		super()
		this.state = {
			loginUsername: '',
			loginPassword: '',
			firstname: '',
			lastname: '',
			email: '',
			username: '',
			password: '',
			loginError: false,
			loginErrorMessage: 'Username or password incorrect. Please try again.',
			registerError: false,
			registerErrorMessage: 'Email already in use.'
		}
	}

	handleFormUpdate = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
			loginError: false
		})
	}

	handleSignUpFormSubmit = async (e) => {
		e.preventDefault()
		const { username, password, firstname, lastname, email } = this.state
		try {
			await axios.post('/auth/register', {
				username,
				password,
				firstname,
				lastname,
				email
			})
			this.props.updateUsername(username)
			this.props.history.push('/info')
		} catch (err) {
			this.setState({ registerError: true })
		}
	}

	render() {
		return (
			<>
				<h1>Need an account? Sign up here</h1>
				<form onSubmit={this.handleSignUpFormSubmit}>
					<input
						type='text'
						name='firstname'
						placeholder='first name'
						onChange={this.handleFormUpdate}
					/>
					<input
						type='text'
						name='lastname'
						placeholder='last name'
						onChange={this.handleFormUpdate}
					/>
					<input
						type='text'
						name='email'
						placeholder='email'
						onChange={this.handleFormUpdate}
					/>
					<input
						type='text'
						name='username'
						placeholder='username'
						onChange={this.handleFormUpdate}
					/>
					<input
						type='text'
						name='password'
						placeholder='password'
						onChange={this.handleFormUpdate}
					/>
					<button>Sign Up</button>
				</form>
				{this.state.registerError && (
					<h3 style={{ color: 'tomato' }}>{this.state.registerErrorMessage}</h3>
				)}
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return { ...state }
}

const mapDispatchToProps = {
	updateUsername
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(RegisterForm))
