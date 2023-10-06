function setCookie(name, value, daysToExpire) {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  const cookieString = `${name}=${value}; ${expires}; path=/`;
  // console.log("Setting cookie:", cookieString);
  document.cookie = cookieString;
}
export  default setCookie;