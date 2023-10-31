export class LoginUtils {
  public static saveToken(token: string) {
    if (localStorage.getItem('token')) {
      this.clearToken();
    }
    localStorage.setItem('token', token);
  }

  public static clearToken() {
    localStorage.removeItem('token');
  }
}
