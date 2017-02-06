import React, { Component } from 'react'

export default class GuessButton extends Component {
  constructor(props) {
    super(props)
  }

  clickHandler(event) {
    event.preventDefault()
    this.props.onGuess()
  }

  render() {
    let buttonClass = this.props.finished ? (this.props.correct ? 'btn-success' : 'btn-danger') : 'btn-default'

    return (
      <div className="row">
        <div className="form-group col">
          <button type="submit" id="guess" ref="guessButton" className={`form-control btn ${buttonClass}`} onClick={this.clickHandler.bind(this)} disabled={this.props.finished}>
            Guess
            <svg version="1.1" id="tick" x="0px" y="0px"
               viewBox="0 0 37 37" style={{enableBackground: 'new 0 0 37 37'}}>
              <path className="circ path" style={{fill: 'none', stroke: '#fff', strokeWidth: 3, strokeLinejoin: 'round', strokeMiterlimit: 10}} d="
                M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
                />
              <polyline className="tick path" style={{fill: 'none', stroke: '#fff', strokeWidth: 3, strokeLinejoin: 'round', strokeMiterlimit: 10}} points="
                11.6,20 15.9,24.2 26.4,13.8 "/>
              <polyline className="cross path" style={{fill: 'none', stroke: '#fff', strokeWidth: 3, strokeLinejoin: 'round', strokeMiterlimit: 10}} points="10.9,26.4 26.4,10.9"/>
              <polyline className="cross path" style={{fill: 'none', stroke: '#fff', strokeWidth: 3, strokeLinejoin: 'round', strokeMiterlimit: 10}} points="10.9,10.9 26.4,26.4 "/>
            </svg>
          </button>
        </div>
      </div>
    )
  }
}
