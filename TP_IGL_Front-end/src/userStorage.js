// userStorage.js
export const saveUser = (user) => {
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
  };
  
  export const getUser = () => {
    const userString = localStorage.getItem('authenticatedUser');
    return userString ? JSON.parse(userString) : null;
  };
  
  export const clearUser = () => {
    localStorage.removeItem('authenticatedUser');
  };