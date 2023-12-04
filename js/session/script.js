let flag = false;
function setAccess() {
  if (!sessionStorage.getItem('access_flag')) {
    sessionStorage.setItem('access_flag', true);
  } else {
    flag = true;
  }
  return flag;
}

if (!setAccess()) {
  console.log('一度目のログイン');
} else {
  console.log('二度目以降のログイン');
}
