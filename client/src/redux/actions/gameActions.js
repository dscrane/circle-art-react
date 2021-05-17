import {
  START_GAME,
  END_GAME,
  NEXT_FORM,
  PREV_FORM,
  RESET_FORM,
  UPDATE_PLAYER,
  FINAL_DISPLAY,
  INITIALIZE_GAME,
  NEXT_PLAYER,
  PREV_PLAYER,
  UPDATE_PLAYER_CIRCLE,
  RESIZE_PLAYER_CIRCLES,
  UPDATE_VIEW,
  UPDATE_DISPLAY_GRID,
} from "../types";
import { createCircleDesign, handleGridUpdate } from "../../utils";
import { api } from "../../utils";

/* ----   START_GAME ACTION CREATOR    ---- */
export const startGame = () => async (dispatch) => {
  // const { data: { _id } } =  await api.post("/games/create")
  dispatch({
    type: START_GAME,
    payload: {
      // gameId: _id,
      inProgress: true,
      currentForm: 1,
      displayGrid: true,
      currentPlayer: 0,
    },
  });
};
/* ----   END_GAME ACTION CREATOR    ---- */
export const endGame = () => (dispatch) => {
  dispatch({ type: END_GAME });
};
/* ----   CREATE_PLAYERS ACTION CREATOR    ---- */
export const initializeGame = (gameId, formData) => async (dispatch) => {
  const { interest, players } = formData;
  const { data } = await api.post("/games/initializeGame", {interest, players})
  dispatch({
    type: INITIALIZE_GAME,
    payload: { game: data.game, players: data.players },
  });
};
/* ----   CREATE_PLAYERS ACTION CREATOR    ---- */
export const createPlayers = (responses) => {};
/* ----   NEXT_PLAYER ACTION CREATOR    ---- */
export const nextPlayer = (currentPlayer) => (dispatch) => {
  const newPlayer = currentPlayer + 1;
  dispatch({
    type: NEXT_PLAYER,
    payload: { currentPlayer: newPlayer },
  });
};
/* ----    PREV_PLAYER ACTION CREATOR    ---- */
export const prevPlayer = (currentPlayer) => (dispatch) => {
  const newPlayer = currentPlayer - 1;
  dispatch({
    type: PREV_PLAYER,
    payload: { currentPlayer: newPlayer },
  });
};
/* ----    UPDATE_PLAYER ACTION CREATOR    ---- */
export const updatePlayer = (playerIndex, playerId, formData, currentForm) => async (dispatch, getState) => {
  const { centerPoint } = getState().gameState
  const {data: { data, error }} = await api.patch("/users/update", {
    centerPoint,
    _id: playerId,
    responses: formData,
    updateStep: currentForm
  })

  if (error) {
    await alert(error.message);
    dispatch({
      type: RESET_FORM,
      payload: {currentPlayer: playerIndex}
    });
    return false;
  }
    console.log("data", data)
    const circleSVG = createCircleDesign(playerId,data.circleData, centerPoint)
    console.log(circleSVG)
    dispatch({
      type: UPDATE_PLAYER,
      payload: {
        circleSVG,
        circles: { ...data },
        playerIndex,
      },
    });
  return true;

};
/* ----    UPDATE_PLAYER_CIRCLE ACTION CREATOR    ---- */
export const updatePlayerCircle = (player, currentPlayer, currentForm) => async (dispatch, getState) => {
  const { centerPoint } = getState().gameState;



  return;
  // dispatch({
  //   type: UPDATE_PLAYER_CIRCLE,
  //   payload: { currentPlayer, updatedPlayerCircle, updateCircles: true },
  // });
};
/* ----    FINAL_DISPLAY ACTION CREATOR    ---- */
export const finalDisplay = (players) => (dispatch, getState) => {
  const allPlayerCircles = [...getState().gameState.circles];
  console.log(players);
  Object.keys(players).forEach((player) => {
    allPlayerCircles.push(players[player].initialCircleSVG);
  });
  dispatch({
    type: FINAL_DISPLAY,
    payload: { finalCircles: allPlayerCircles, displayGrid: false },
  });
};
/* ----   NEXT_FORM ACTION CREATOR    ---- */
export const nextForm = (currentForm) => async (dispatch, getState) => {
  const { players, currentPlayer } = getState().gameState;
  const newForm = currentForm + 1;
  const nextPlayer = players.length === 0 ? currentPlayer : 0;
  await dispatch({
    type: NEXT_FORM,
    payload: { currentPlayer: nextPlayer, currentForm: newForm },
  });
};
/* ----   PREV_FORM ACTION CREATOR    ---- */
export const prevForm = (currentForm) => async (dispatch, getState) => {
  const { numPlayers } = getState().gameState;
  const newForm = currentForm - 1;
  await dispatch({
    type: PREV_FORM,
    payload: { currentForm: newForm, currentPlayer: numPlayers },
  });
};
/* ----   RESIZE_PLAYER_CIRCLES ACTION CREATOR    ---- */
export const resizePlayerCircles = ({ cx, cy }) => (dispatch) => {
  console.log("hit");
  dispatch({
    type: RESIZE_PLAYER_CIRCLES,
    payload: { cx, cy },
  });
};
/* ----   UPDATE_VIEW ACTION CREATOR    ---- */
export const updateView = (dimensions) => (dispatch) => {
  dispatch({
    type: UPDATE_VIEW,
    payload: {
      height: Math.round(dimensions.height),
      width: Math.round(dimensions.width),
    },
  });
};
/* ----   UPDATE_DISPLAY_GRID ACTION CREATOR    ---- */
export const updateGridDisplay = (view) => async (dispatch, getState) => {
  const multiplier = getState().gameState.canvasDisplay.adjustmentMultiplier;
  const updatedGrid = await handleGridUpdate(view, multiplier);

  dispatch({
    type: UPDATE_DISPLAY_GRID,
    payload: { ...updatedGrid },
  });
};
