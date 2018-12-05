import { combineReducers } from "redux";
import { notes } from "./notes";
import { core } from "./core";

export const reducer = combineReducers({ core, notes });
