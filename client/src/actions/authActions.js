import { TEST_DISPATCH } from "./types";

//Register User (Action creator)
export const registeruser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
