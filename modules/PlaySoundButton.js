import React, { Component } from 'react'

export default class PlaySoundButton extends Component {
  render() {
    return (
      <button id="play-sound" type="button" className="btn btn-default" onClick={this.props.onClick}>
        Play Sound
      </button>
    )
  }
}
