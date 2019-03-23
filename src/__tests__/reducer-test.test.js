import authReducer from "../reducers/auth";

import {
  setAuthToken,
  clearAuth,
  authRequest,
  authSuccess,
  authError
} from "../actions/auth";

describe("authReducer", function() {
  const initialState = {
    authToken: null,
    currentUser: null,
    loading: false,
    error: null
  };

  const mockData = {
    authToken: "asdfjdf838474",
    currentUser: {
      username: "unoriginal"
    },
    error: {
      message: "There was an error"
    }
  };

  it("Should set the initial state when nothing is passed", function() {
    const state = authReducer(undefined, { type: "__UNKNOWN" });
    expect(state).toEqual(initialState);
  });

  it("Should return the current state on an unknown action", function() {
    const currentState = {};
    const state = authReducer(currentState, { type: "__UNKNOWN" });
    expect(state).toBe(currentState);
  });

  describe("setAuthToken", function() {
    it("Should set authToken", function() {
      const state = authReducer(initialState, setAuthToken(mockData.authToken));
      expect(state).toEqual({
        authToken: mockData.authToken,
        currentUser: null,
        loading: false,
        error: null
      });
    });
  });

  describe("clearAuth", function() {
    it("Should clear authToken & currentUser", function() {
      const currentState = {
        authToken: mockData.authToken,
        currentUser: mockData.currentUser,
        loading: false,
        error: null
      };
      const state = authReducer(currentState, clearAuth());
      expect(state).toEqual(initialState);
    });
  });

  describe("authRequest", function() {
    it("Should make request", function() {
      const state = authReducer(initialState, authRequest());
      expect(state).toEqual({
        authToken: null,
        currentUser: null,
        loading: true,
        error: null
      });
    });
  });

  describe("authSuccess", function() {
    it("Should set currentUser", function() {
      const state = authReducer(
        initialState,
        authSuccess(mockData.currentUser)
      );
      expect(state).toEqual({
        authToken: null,
        currentUser: mockData.currentUser,
        loading: false,
        error: null
      });
    });
  });
});
