import _axios from 'axios';

const axios = (baseURL) => {  // 可以給定 baseURL
    
    const instance = _axios.create({
        baseURL: 
            baseURL || process.env.REACT_APP_API_DOMAIN || 'http://localhost:3003',  
            // 給定baseURL 或 開發環境url 或 生產環境本地3003
        timeout: 1000
    });
    console.log()

    instance.interceptors.request.use(  // 攔截 request
        (config) => {  // req 送出前執行下方命令
            const jwtToken = global.auth.getToken();  // 取得 token
            config.headers['authorization'] = 'Bearer ' + jwtToken;  // headers 加上正確格式 
            return config;  // 返回格式化 token 訊息
        },
        (error) => {
            return Promise.reject(error);  // 回傳一個以 reason 拒絕的 Promise(失敗訊息) 物件
        }
    );

    return instance;
};

export { axios }  // 傳參輸出
export default axios();