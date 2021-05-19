import {User} from '../models/User';

export class ManageLocalStorage {

  static setToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  static getToken(): any | null {
    try {
      return JSON.parse(localStorage.getItem('token'));
    } catch (e) {
      return null;
    }
  }

  static setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  static deleteApplyAlaido(): void {
    localStorage.removeItem('apply');
  }

  static removeApplyAliado(): void {
    localStorage.removeItem('apply');
  }
}
