import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './modules/App'
import SingleStep from './modules/SingleStep'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/learn-the-basics" component={SingleStep} title="Learn the Basics" description="Learn slocks basics by listening to some times." learnStep="0" />
      <Route path="/learn-the-basics/:step" component={SingleStep} title="Learn the Basics" description="Learn slocks basics by listening to some times." learnStep="0" />
      <Route path="/try-it-yourself" component={SingleStep} title="Try it Yourself" description="Listen to some times and guess." learnStep="1" />
      <Route path="/try-it-yourself/:step" component={SingleStep} title="Try it Yourself" description="Listen to some times and guess." learnStep="1" />
      <Route path="/become-an-expert" component={SingleStep} title="Become an Expert" description="Test your knowledge and become a slock expert!" learnStep="2" />
      <Route path="/become-an-expert/:step" component={SingleStep} title="Become an Expert" description="Test your knowledge and become a slock expert!" learnStep="2" />
    </Route>
  </Router>
), document.getElementById('react-container'))
