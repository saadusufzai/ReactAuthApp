import localStorage from './localStorage';

const loadUserStatus = () => {
  const tokens = localStorage.getToken();
  if (tokens && Object.entries(tokens).length) {
    return true;
  }
  return false;
};

export default loadUserStatus;
