class Auth {
  constructor(options) {
    this._url = options.url;    
  }  

  registerUser(password, email) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })    
  }

  authorizeUser(password, email) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })    
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {        
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })        
  }
}

const auth = new Auth({
  url: 'https://auth.nomoreparties.co'  
})

export default auth;