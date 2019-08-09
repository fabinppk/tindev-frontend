const dev = process.env.REACT_APP_NODE_ENV || 'development';
const domain =
    dev === 'production' ? 'https://tindev-backend.herokuapp.com' : 'http://localhost:3333';

export default domain;
