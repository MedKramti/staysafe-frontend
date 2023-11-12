(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["sheltersBaseUrl"] = "${SHELTER_BASE_URL}";
  window["env"]["authserverBaseUrl"] = "${AUTHSERVER_BASE_URL}";
})(this);
