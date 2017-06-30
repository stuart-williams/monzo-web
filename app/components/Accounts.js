import React, { Component } from 'react'
import fetch from '../common/api-fetch'

export default class Account extends Component {
  constructor () {
    super()

    this.state = {
      accounts: []
    }
  }

  componentDidMount () {
    fetch('accounts')
      .then(({ accounts }) => { this.setState({ accounts }) })
      .catch(({ message }) => { this.setState({ error: message }) })
  }

  render () {
    if (this.state.error) return <p>{this.state.error}</p>

    return (
      <ul>
        {this.state.accounts.map(({ id, description, type }) => (
          <div key={id}>
            <span>{description}</span>
            <span>{type}</span>
          </div>
        ))}
      </ul>
    )
  }
}
