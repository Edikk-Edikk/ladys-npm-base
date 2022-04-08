import { createBrowserHistory, createMemoryHistory } from 'history';

let historyLocal;
if (process.env.isServer) {
  historyLocal = createMemoryHistory();
} else {
  historyLocal = createBrowserHistory({ basename: process.env.BASE_URL });
}

const history = historyLocal;

export { history };
