import axios from 'axios';

export const douyinService = async (str, minimal = false) => {
  str = encodeURIComponent(str);
  const douyinUrl = `${process.env.DY_URL}/api/hybrid/video_data?url=${str}&minimal=${minimal}`;
  const { data } = await axios({
    method: 'get',
    url: douyinUrl,
  });
  return data.data || {};
};
