export class LoginUtils {
  public static TOKEN_NAME: string = 'token';
  public static saveToken(token: string) {
    if (localStorage.getItem(LoginUtils.TOKEN_NAME)) {
      this.clearToken();
    }
    localStorage.setItem(LoginUtils.TOKEN_NAME, token);
  }

  public static clearToken() {
    localStorage.removeItem(LoginUtils.TOKEN_NAME);
  }

  public static getToken() {
    return localStorage.getItem(LoginUtils.TOKEN_NAME);
  }
}
