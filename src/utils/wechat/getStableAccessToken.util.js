import axios from 'axios';

/**
 * 获取稳定 access_token
 * @see https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getStableAccessToken.html
 * @param {Object}  opts
 * @param {string}  [opts.appid=process.env.MINI_PROGRAM_APPID]   小程序 AppID
 * @param {string}  [opts.secret=process.env.MINI_PROGRAM_APPSECRET] 小程序 AppSecret
 * @param {boolean} [opts.forceRefresh=false]           是否强制刷新
 * @returns {Promise<string>}                           access_token 字符串
 */
let _cacheToken = '';
let _cacheExpireAt = 0; // 毫秒时间戳

const getStableAccessToken = async (opts = {}) => {
  const {
    appid = process.env.MINI_PROGRAM_APPID,
    secret = process.env.MINI_PROGRAM_APPSECRET,
    forceRefresh = false,
  } = opts;

  if (!appid || !secret) {
    throw new Error('MINI_PROGRAM_APPID / MINI_PROGRAM_APPSECRET 未配置，或参数缺失');
  }

  // 命中缓存直接返回
  const now = Date.now();
  if (_cacheToken && _cacheExpireAt > now && !forceRefresh) return _cacheToken;

  const url = 'https://api.weixin.qq.com/cgi-bin/stable_token';
  const { data } = await axios.post(url, {
    grant_type: 'client_credential',
    appid,
    secret,
    force_refresh: forceRefresh,
  });

  if (data.errcode) {
    // 微信接口报错，抛出详细信息
    throw new Error(`getStableAccessToken error: ${data.errcode} ${data.errmsg}`);
  }

  // 提前 300 秒失效，避免边界时间出错
  const effectiveMs = (data.expires_in - 300) * 1000;
  _cacheToken = data.access_token;
  _cacheExpireAt = now + effectiveMs;

  return _cacheToken;
};

export default getStableAccessToken;
