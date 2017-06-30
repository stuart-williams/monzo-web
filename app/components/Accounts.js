import React, { Component } from 'react'

export default class Account extends Component {
  constructor () {
    super()

    this.state = {
      accounts: []
    }
  }

  componentDidMount () {}

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
