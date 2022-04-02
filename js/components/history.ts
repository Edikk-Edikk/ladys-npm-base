import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ basename: process.env.BASE_URL });

export { history };
