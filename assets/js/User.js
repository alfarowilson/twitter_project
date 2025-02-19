class User {

  constructor() {
    this._users = null;
  };

  getUsers() {
    if(this._users === null) {
      try {
        const storedUsers = localStorage.getItem('users');
        this._users = storedUsers ? JSON.parse(storedUsers) : [];
      } 
      catch (error) {
        return this._users = [];
      };
    };
    return this._users;
  };

  saveUser(userData){
    // melakukan proses validasi
    const { name, username, avatar, password } = userData;

    if(typeof name !== 'string' || name.trim() === '') {
      return {
        success: false,
        error: 'name is missing'
      };
    };

    if(typeof username !== 'string' || name.trim() === '') {
      return {
        success: false,
        error: 'username is missing'
      };
    };

    if(typeof avatar !== 'string' || name.trim() === '') {
      return {
        success: false,
        error: 'avatar is missing'
      };
    };

    if(typeof password !== 'string' || name.trim() === '') {
      return {
        success: false,
        error: 'password is missing'
      };
    };

    if(password.length < 8) {
      return {
        success: false,
        error: 'password at least 8 characters'
      };
    };

    const newUser = {
      id: Date.now(),
      isActive: true,
      ...userData
    };

    const users = this.getUsers();
    users.push(newUser);

    try{
      localStorage.setItem('users', JSON.stringify(users));
      return{
        success: true,
      };
    }
    catch(error){
      return{
        success: false,
      }
    }


  };

  userSignIn(userData) {
    
    // melakukan proses validasi
    const { username, password } = userData;

    if(typeof username !== 'string' || username.trim() === '') {
      return {
        success: false,
        error: 'username is missing'
      };
    };

    if(typeof password !== 'string' || password.trim() === '') {
      return {
        success: false,
        error: 'password is missing'
      }
    }

    const userExists = this.getUsers().some(user => user.username.toLowerCase() === username.toLowerCase() && user.password === password);

    if(userExists) {
      return {
        success: true,
      };
    }
    else {
      return {
        success: false,
        error: 'Username atau password salah!',
      }
    }

  }
}