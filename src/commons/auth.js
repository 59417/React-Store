import jwt_decode from 'jwt-decode';

const storeTokenId = 'store_token_id';

// 儲存 token 到客戶端瀏覽器
const setToken = (token) => {
    localStorage.setItem(storeTokenId, token);  // setItem(儲存名稱, 儲存物件)
};

// 從 Local Storage 取得儲存的 token
const getToken = (token) => {
    return localStorage.getItem(storeTokenId);  // getItem(儲存名稱) > 取得(儲存名稱)
};

// 判斷是否登入
const isLogin = () => {
    const jwtToken = getToken(); // 取得儲存的 token
    return !!jwtToken && !isExpired(jwtToken);  // jwtToken 不為空 且 有效
};
// Falsy (0,-0,null,false,NaN,undefined,'') != False >>> !!Falsy === False

// 判斷token是否過期
const isExpired = (token) => {
    try {
        const _info = jwt_decode(token);  // 拿到解碼的 user 訊息
        if (_info.exp < (Date.now() / 1000)) {  // token 過期時間 < 現在時間: 未到期
            return true; 
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
// exp (Expiration Time): token過期時間 (Unix時間戳記) 1646062961
// iat (Issued At): token建立時間 (Unix時間戳記) 1646059361

// 拿到解碼的 user 資料
const getUser = () => {
    const jwtToken = getToken();
    if (isLogin()){
        const user = jwt_decode(jwtToken);
        return user;
    } else {
        return null;
    };
};

// 登出 (清除儲存的 token)
const logout = () => {
    localStorage.removeItem(storeTokenId);
};

// 將 auth 作為全局變量輸出
global.auth = {
    setToken,
    getToken,
    isLogin,
    getUser,
    logout
};