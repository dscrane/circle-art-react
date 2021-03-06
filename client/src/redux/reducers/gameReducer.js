import {
  START_GAME,
  END_GAME,
  NEXT_FORM,
  PREV_FORM,
  RESET_FORM,
  NEXT_PLAYER,
  PREV_PLAYER,
  UPDATE_CIRCLES,
  DISPLAY_CIRCLES,
  DISPLAY_GRID,
  INITIALIZE_GROUP,
  UPDATE_PLAYER,
  INITIALIZE_GAME,
  UPDATE_DISPLAY_GRID,
  UPDATE_PLAYER_CIRCLE,
  UPDATE_VIEW,
  FINAL_DISPLAY,
  RESIZE_PLAYER_CIRCLES,
} from "../types";

const INITIAL_STATE = {
  _id: "",
  inProgress: false,
  updateCircles: false,
  displayGrid: false,
  complete: false,
  resizeCircles: false,
  numPlayers: 0,
  interest: "",
  currentForm: 0,
  currentPlayer: 0,
  players: {},
  playerIds: [],
  circles: [],
  finalCircles: [],
  centerPoint: {x: 0, y:0},
  canvasDisplay: {
    resizeRatio: 1,
    view: {
      height: 0,
      width: 0,
    },
    grid: {
      stage: 0,
      svgDim: 0,
      radius: 0,
      axis: 0,
      cross: 0,
      cx: 0,
      cy: 0,
      step: 0,
    },
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_GAME:
      console.info(action.type, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case END_GAME:
      console.info(action.type, action.payload);
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case INITIALIZE_GAME:
      console.info(action.type, action.payload);
      return {
        ...state,
        ...action.payload.game,
        players: {
          ...state.players,
          ...action.payload.players /*to change to players*/,
        },
      };
    case NEXT_FORM:
      console.info(action.type, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case PREV_FORM:
      console.info(action.type, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case RESET_FORM:
      console.log(action.type, action.payload);
      return {
        ...state,
        ...action.payload
      }
    case NEXT_PLAYER:
      console.info(action.type, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case PREV_PLAYER:
      console.info(action.type, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_PLAYER:
      console.info(action.type, action.payload);
      return {
        ...state,
        circles: [
          ...state.circles.map((circle, i) => {
            return i !== action.payload.playerIndex ? circle : action.payload.circleSVG;
          }),
        ],
        players: {
          ...state.players,
          [action.payload.playerIndex]: {
            ...state.players[action.payload.playerIndex],
            ...action.payload.circles
          },
        },
      };
    case UPDATE_PLAYER_CIRCLE:
      console.info(action.type, action.payload);
      return {
        ...state,
        circles: [
          ...state.circles.map((circle, i) => {
            return i !== action.payload.currentPlayer ? circle : action.payload.updatedPlayerCircle.circleSVG;
          }),
        ],
        players: {
          ...state.players,
          [action.payload.currentPlayer]: {
            ...state.players[action.payload.currentPlayer],
            ...action.payload.updatedPlayerCircle,
          },
        },
      };
    case RESIZE_PLAYER_CIRCLES:
      console.info(action.type, action.payload);
      return { ...state };
    case FINAL_DISPLAY:
      console.info(action.type, action.payload);
      return {
        ...state,
        displayGrid: action.payload.displayGrid,
        circles: action.payload.finalCircles,
      };
    case UPDATE_DISPLAY_GRID:
      console.info(action.type, action.payload);
      return {
        ...state,
        resizeCircles: action.payload.resizeCircles,
        centerPoint: {
          ...state.centerPoint,
          x: Math.round(action.payload.grid.cx),
          y: Math.round(action.payload.grid.cy)
        },
        canvasDisplay: {
          ...state.canvasDisplay,
          resizeRatio: action.payload.resizeRatio,
          grid: { ...action.payload.grid },
        },
      };
    case UPDATE_VIEW:
      console.info(action.type, action.payload);
      return {
        ...state,
        resizeCircles: action.payload.resizeCircles,
        canvasDisplay: {
          ...state.canvasDisplay,
          view: {
            ...state.canvasDisplay.view,
            oldHeight: state.canvasDisplay.view.height,
            oldWidth: state.canvasDisplay.view.width,
            ...action.payload.view,
          },
        },
      };
    default:
      return state;
  }
};
