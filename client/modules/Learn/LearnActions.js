import callApi from '../../util/apiCaller';

// Export Constants
export const NEXT = 'NEXT';
export const PREV = 'PREV';
export const ADD_STEP = 'ADD_STEP';
export const ADD_STEPS = 'ADD_STEPS';
export const RANDOM_SOUND = 'RANDOM_SOUND';

// Export Actions
export function nextStep(step) {
  return {
    type: NEXT,
    step,
  };
}

export function prevStep(step) {
  return {
    type: PREV,
    step,
  };
}

export function addStep(step) {
  return {
    type: ADD_STEP,
    step,
  };
}

export function addStepRequest(step) {
  return (dispatch) => {
    return callApi('learn', 'post', {
      step: {
        title: step.title,
        number: step.number,
        desc: step.desc,
      },
    }).then(res => dispatch(addStep(res.step)));
  };
}

export function addSteps(steps) {
  return {
    type: ADD_STEPS,
    steps,
  };
}

export function fetchSteps() {
  return (dispatch) => {
    return callApi('learn').then(res => {
      dispatch(addSteps(res.steps));
    });
  };
}

export function fetchStep(cuid) {
  return (dispatch) => {
    return callApi(`/learn/${cuid}`).then(res => dispatch(addStep(res.step)));
  };
}

export function randomSound() {
  return {
    type: RANDOM_SOUND,
  };
}
