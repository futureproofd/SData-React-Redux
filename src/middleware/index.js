import logger from './logger';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

//the applyMiddleware function from redux, combined with our middlewares
export default applyMiddleware(thunk, logger)