import React, { Component } from 'react'

export default class Account extends Component {
  constructor () {
    super()

    this.state = { accounts: [] }
  }

  componentDidMount () {
    window.fetch('https://api.monzo.com/accounts', {
      headers: {
        'Authorization': `Bearer ${window.user.token}`
      }
    })
      .then((res) => res.json())
      .then(({ accounts }) => { this.setState({ accounts }) })
  }

  render () {
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
