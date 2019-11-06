import { decorate, observable, action } from "mobx";
import Auth from "../api/auth";
import { getUserFromCookie } from "../utils/index.js";

class UserStore {
  authUser = null;
  errorRegister = false;
  error = ``;
  users = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.authService = new Auth();
    this.setUser(getUserFromCookie());
  }

  setUser = value => (this.authUser = value);

  changeError = error => {
    this.error = error;
  };

  emptyError = () => {
    this.error = ``;
  };

  getUsers = () =>
    this.authService.getUsers().then(user => this.users.push(user));

  login = (history, username, password) => {
    return this.authService
      .login(history, username, password)
      .then(data => {
        this.setUser(getUserFromCookie());
        this.emptyError();
        Promise.resolve();
      })
      .catch(data => {
        this.setUser(null);

        if (data.error) this.changeError(data.error);
        if (data.message) this.changeError(data.message);
        Promise.reject();
      });
  };

  register = (name, email, pwd) => this.authService.register(name, email, pwd);

  logout = () => {
    this.authService.logout().then(() => this.setUser(null));
  };
}

decorate(UserStore, {
  authUser: observable,
  setUser: action,
  errorRegister: observable,
  error: observable,
  users: observable,
  changeError: action,
  emptyError: action
});

export default UserStore;
