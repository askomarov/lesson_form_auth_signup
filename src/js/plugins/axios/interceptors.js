const lsTonkenKey = 'my_app_token';

function setToken(req) {
  const isAuthUrl = req.url.includes('auth');

  if (!isAuthUrl) {
    const token = localStorage.getItem(lsTonkenKey);
    // заголовок токена авторизации, у рахных серверов он может называться по своему
    req.headers['x-access-token'] = token
  }

  return req;
}


function setTokenOnLogin(res) {
  const isLoginUrl = res.config.url.includes('login')

  if (isLoginUrl) {
    const token = res.data.token;
    localStorage.setItem(lsTonkenKey, token)
  }

  return res;
}

function getClearresponse(res) {
  return res.data;
}
// отработает если запрос прошел с ошибкой
function onError(err) {
  console.dir(err);
  return Promise.reject(err);
}

export default function (axios) {
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(setTokenOnLogin);
  axios.interceptors.response.use(getClearresponse, onError)
}
