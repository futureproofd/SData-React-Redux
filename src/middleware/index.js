import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import logger from './logger';

/**
 * the applyMiddleware function from redux, combined with our middlewares
 */
export default applyMiddleware(thunk, logger);
