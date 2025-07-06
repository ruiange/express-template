
export const getWallpaper =  async (req, res) => {


  const imageUrls = [
    "https://img.picui.cn/free/2025/07/06/686a0275716e4.webp",
    "https://img.picui.cn/free/2025/07/06/686a01e51718c.webp",
    "https://img.picui.cn/free/2025/07/06/686a01e527153.webp",
    "https://img.picui.cn/free/2025/07/06/686a01e5cf3a2.webp",
    "https://img.picui.cn/free/2025/07/06/686a01e63b7d6.webp",
    "https://img.picui.cn/free/2025/07/06/686a01e629c88.webp",
    "https://img.picui.cn/free/2025/07/06/686a01e9d424f.webp",
    "https://img.picui.cn/free/2025/07/06/686a01eab0bd8.webp",
    "https://img.picui.cn/free/2025/07/06/686a01ebdeb65.webp",
    "https://img.picui.cn/free/2025/07/06/686a01ecac436.webp",
    "https://img.picui.cn/free/2025/07/06/686a01ee7b34f.webp",
    "https://img.picui.cn/free/2025/07/06/686a01ef7f047.webp",
    "https://img.picui.cn/free/2025/07/06/686a01f0d1422.webp",
    "https://img.picui.cn/free/2025/07/06/686a01f2d9570.webp",
    "https://img.picui.cn/free/2025/07/06/686a01f37ce2a.webp",
    "https://img.picui.cn/free/2025/07/06/686a01f4467c9.webp",
    "https://img.picui.cn/free/2025/07/06/686a01eb6176e.webp",
    "https://img.picui.cn/free/2025/07/06/686a01f5a5574.webp",
    "https://img.picui.cn/free/2025/07/06/686a01f909ce4.webp",
    "https://img.picui.cn/free/2025/07/06/686a01fa5e7ad.webp",
    "https://img.picui.cn/free/2025/07/06/686a01f9287d7.webp",
    "https://img.picui.cn/free/2025/07/06/686a01fb6c86c.webp",
    "https://img.picui.cn/free/2025/07/06/686a01fd79c9b.webp",
    "https://img.picui.cn/free/2025/07/06/686a01ff1247f.webp",
    "https://img.picui.cn/free/2025/07/06/686a01fa85412.webp",
    "https://img.picui.cn/free/2025/07/06/686a01ffdb9d7.webp",
    "https://img.picui.cn/free/2025/07/06/686a0200d9b0b.webp",
    "https://img.picui.cn/free/2025/07/06/686a02040b201.webp",
    "https://img.picui.cn/free/2025/07/06/686a0204ba8c1.webp",
    "https://img.picui.cn/free/2025/07/06/686a020589eb3.webp",
    "https://img.picui.cn/free/2025/07/06/686a020700553.webp",
    "https://img.picui.cn/free/2025/07/06/686a020928dad.webp",
    "https://img.picui.cn/free/2025/07/06/686a0208bfefc.webp",
    "https://img.picui.cn/free/2025/07/06/686a025b62100.webp",
    "https://img.picui.cn/free/2025/07/06/686a025b52531.webp",
    "https://img.picui.cn/free/2025/07/06/686a025c4711d.webp",
    "https://img.picui.cn/free/2025/07/06/686a025c34da6.webp",
    "https://img.picui.cn/free/2025/07/06/686a026054c1c.webp",
    "https://img.picui.cn/free/2025/07/06/686a0260b501e.webp",
    "https://img.picui.cn/free/2025/07/06/686a0262c4dc3.webp",
    "https://img.picui.cn/free/2025/07/06/686a026570f36.webp",
    "https://img.picui.cn/free/2025/07/06/686a026834026.webp",
    "https://img.picui.cn/free/2025/07/06/686a02680399a.webp",
    "https://img.picui.cn/free/2025/07/06/686a026af35d1.webp",
    "https://img.picui.cn/free/2025/07/06/686a026e83c34.webp",
    "https://img.picui.cn/free/2025/07/06/686a026d77e3e.webp",
    "https://img.picui.cn/free/2025/07/06/686a0271cd6ca.webp",
    "https://img.picui.cn/free/2025/07/06/686a02745ef3f.webp",
    "https://img.picui.cn/free/2025/07/06/686a0275716e4.webp",
    "https://img.picui.cn/free/2025/07/06/686a026305db3.webp"
  ];

  return res.json(
    {
      code:2000,
      data:imageUrls,
      message:'获取成功'
    }
  );

};