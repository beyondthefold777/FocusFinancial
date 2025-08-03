const ENV = {
  development: {
    apiUrl: 'http://localhost:5000',  // your local backend server
  },
  production: {
    apiUrl: 'https://focus-financial.fly.dev',  // your deployed backend
  },
};

const getEnvVars = () => {
  if (process.env.NODE_ENV === 'development') {
    return ENV.development;
  }
  return ENV.production;
};

export default getEnvVars();
