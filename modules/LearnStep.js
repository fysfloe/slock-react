import React, { Component } from 'react';
import { Link } from 'react-router'

export default class LearnStep extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="learn-step-item col">
        <Link to={this.props.link}>
          <h2>{this.props.title}</h2>
          <p className="description">{this.props.description}</p>
          <div className="bottom">
            <div className="progress">
              <div className="progress-bar" style={{ width: (this.props.progress/this.props.possibleScore*100) + "%" }}></div>
            </div>
            <div className="score">
              {this.props.score}/{this.props.possibleScore}
            </div>
          </div>
        </Link>
      </li>
    )
  }
}
