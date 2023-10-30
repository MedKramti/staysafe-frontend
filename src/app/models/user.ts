export class User {
  private id: number;
  private username: string;
  private password: string;
  private role: string;

  constructor(id: number, username: string, password: string, role: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public getId(): number {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getRole(): string {
    return this.role;
  }
}
