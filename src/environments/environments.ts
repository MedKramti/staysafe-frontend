interface Window {
  env: {
    sheltersBaseUrl: string;
    authserverBaseUrl: string;
  };
}
export const environment = {
  SHELTER_SERVER:
    (window as unknown as Window).env?.sheltersBaseUrl ||
    'http://localhost:8080',

  AUTHSERVER_SERVER:
    (window as unknown as Window).env?.authserverBaseUrl ||
    'http://localhost:8081',
};
