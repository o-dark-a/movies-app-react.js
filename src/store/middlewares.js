import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
const logger = createLogger();

const customLogger = (store) => (next) => (action) => {
  console.warn('prev state:', store.getState());
  console.log('action:', action);
  next(action);
  console.error('next state', store.getState());
};

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export { middlewares };
