import { NEXT, PREVIOUS, ADD_STEP, ADD_STEPS } from './LearnActions';

// Initial State
const initialState = { data: [] };

const LearnReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STEP :
      return {
        data: [action.step, ...state.data],
      };

    case ADD_STEPS :
      return {
        data: action.steps,
      };

    case NEXT :
      return {
        data: [action.step, ...state.data],
      };

    case PREVIOUS :
      return {
        data: [action.step, ...state.data],
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all steps
export const getSteps = state => state.steps.data;

// Get post by cuid
export const getStep = (state, cuid) => state.steps.data.filter(step => step.cuid === cuid)[0];

export const quarters = [
  '00', '15', '30', '45',
];

export const audioURL = 'http://floe.media/slock/audio/';

// Export Reducer
export default LearnReducer;
