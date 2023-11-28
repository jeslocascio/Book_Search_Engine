// Importing the 'jwt-decode' library for decoding JWT tokens
import decode from 'jwt-decode';

// Creating a class named 'AuthService' to handle user authentication
class AuthService {
  // Method to extract user data from a token
  getProfile() {
    return decode(this.getToken());
  }

  // Method to check if a user is logged in by verifying the presence and validity of the token
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // Method to check if a token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // Method to retrieve the user token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Method to save the user token to localStorage upon login
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

   // Method to clear user token and profile data from localStorage upon logout
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

// Exporting an instance of the 'AuthService' class
export default new AuthService();
