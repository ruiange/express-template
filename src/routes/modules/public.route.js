import express from 'express';
import axios from 'axios';

const publicRoute = express.Router();

publicRoute.get('/weather', async (req, res) => {
  const clientIP = req.clientIP || 'Unknown';
  let ip = clientIP.replace(/[^0-9.]/g, '');

  console.log(ip, 'ip');
  if (ip === '1' || !ip) ip = '127.0.0.1';

  let city = ip;

  if (city === '127.0.0.1') {
    city = '北京';
  }

  const { data } = await axios({
    method: 'get',
    url: 'https://apis.tianapi.com/tianqi/index',
    params: {
      key: '9d146c513697e92404b90a66a3caa9e1',
      city: city,
      type: 1,
    },
  });

  res.success(data.result);
});

export default publicRoute;
