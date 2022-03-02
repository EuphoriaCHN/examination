const axios = require('axios').default;

function a(r, o) {
  for (var t = 0; t < o.length - 2; t += 3) {
    var a = o.charAt(t + 2);
    a = a >= "a" ? a.charCodeAt(0) - 87 : Number(a),
      a = "+" === o.charAt(t + 1) ? r >>> a : r << a,
      r = "+" === o.charAt(t) ? r + a & 4294967295 : r ^ a
  }
  return r
}
var C = null;
var token = function (r, _gtk) {
  var o = r.length;
  o > 30 && (r = "" + r.substr(0, 10) + r.substr(Math.floor(o / 2) - 5, 10) + r.substring(r.length, r.length - 10));
  var t = void 0,
    t = null !== C ? C : (C = _gtk || "") || "";
  for (var e = t.split("."), h = Number(e[0]) || 0, i = Number(e[1]) || 0, d = [], f = 0, g = 0; g < r.length; g++) {
    var m = r.charCodeAt(g);
    128 > m ? d[f++] = m : (2048 > m ? d[f++] = m >> 6 | 192 : (55296 === (64512 & m) && g + 1 < r.length && 56320 === (64512 & r.charCodeAt(g + 1)) ? (m = 65536 + ((1023 & m) << 10) + (1023 & r.charCodeAt(++g)), d[f++] = m >> 18 | 240, d[f++] = m >> 12 & 63 | 128) : d[f++] = m >> 12 | 224, d[f++] = m >> 6 & 63 | 128), d[f++] = 63 & m | 128)
  }
  for (var S = h,
    u = "+-a^+6",
    l = "+-3^+b+-f",
    s = 0; s < d.length; s++) S += d[s],
      S = a(S, u);

  return S = a(S, l),
    S ^= i,
    0 > S && (S = (2147483647 & S) + 2147483648),
    S %= 1e6,
    S.toString() + "." + (S ^ h)
}

module.exports = async function (str, fromLang, toLang) {
  const data = {
    from: fromLang,
    to: toLang,
    query: encodeURIComponent(str),
    transtype: 'realtime',
    simple_means_flag: 3,
    // window.gtk
    sign: token(str, '320305.131321201'),
    // window.common.token
    token: '6421e87cfb238979ad2abd16e6606043',
    domain: 'common'
  };

  const body = Object.keys(data).reduce((prev, next) => prev.concat(`${next}=${data[next]}`), []).join('&');

  return axios.request({
    url: 'https://fanyi.baidu.com/v2transapi',
    headers: {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "BIDUPSID=1273F1B8A80BD43D7443765B5B9D3328; PSTM=1628664753; __yjs_duid=1_fc8035c2c69ef0cd3c0a620db15b3a011629181628990; BAIDUID=1273F1B8A80BD43D7443765B5B9D3328:FG=1; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; BAIDUID_BFESS=1273F1B8A80BD43D7443765B5B9D3328:FG=1; delPer=0; BCLID=8844493473431016015; BDSFRCVID=qUKOJeC624VvHfOH4Tq-qa0DcMVq6BoTH6ao3zkgOW1lAf4WGoJkEG0PoU8g0KAbAw74ogKK0mOTHv-F_2uxOjjg8UtVJeC6EG0Ptf8g0f5; H_BDCLCKID_SF=tb4eVCL-JCD3HnRY-PR5bJDBbeTb5RjJ-KTKQJOSHJrqfKvl3fRcy4LdjGKJLJ575eO7_UbhH4jHhhbnXqjajxDe3-Aq544eMD3M2M0hapjtMM3jhU6OQfbQ0MnPqP-jW26a5405Jn7JOpkxhfnxyb5DQRPH-Rv92DQMVU52QqcqEIQHQT3m5-5bbN3ht6T2-DA_oD8XtC3P; BCLID_BFESS=8844493473431016015; BDSFRCVID_BFESS=qUKOJeC624VvHfOH4Tq-qa0DcMVq6BoTH6ao3zkgOW1lAf4WGoJkEG0PoU8g0KAbAw74ogKK0mOTHv-F_2uxOjjg8UtVJeC6EG0Ptf8g0f5; H_BDCLCKID_SF_BFESS=tb4eVCL-JCD3HnRY-PR5bJDBbeTb5RjJ-KTKQJOSHJrqfKvl3fRcy4LdjGKJLJ575eO7_UbhH4jHhhbnXqjajxDe3-Aq544eMD3M2M0hapjtMM3jhU6OQfbQ0MnPqP-jW26a5405Jn7JOpkxhfnxyb5DQRPH-Rv92DQMVU52QqcqEIQHQT3m5-5bbN3ht6T2-DA_oD8XtC3P; H_WISE_SIDS=107316_110085_127969_179345_184716_189755_190791_191068_191242_192957_194085_195342_196050_196426_196514_196891_197242_197711_197958_198257_198418_198747_199022_199082_199466_199583_200150_200763_200993_201055_201233_201361_201534_201577_201601_201707_201979_202058_202476_202565_202759_202822_202905_202911_202927_203145_203174_203310_203361_203519_203544_203606_203997_204032_204111_204131_204154_204211_204260_204262_204438_204757_204859_204912_204940_204973_205008_205218_205349_205485_205548; APPGUIDE_10_0_2=1; H_PS_PSSID=34429_35104_31253_35913_34584_35872_35945_35973_35984_35324_26350_35867; PSINO=1; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BA_HECTOR=8g0h8k01210h2005t51h1uovd0q; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1646212171,1646224367,1646224729; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1646224729; ab_sr=1.0.1_OTNlMTdjYzA0MzdhNDQxZmE4MWQ1M2MyNGY3NGI5Nzk2N2ZjNTI4MmEyYjBhM2EwZjNlOTJhMDU0OGIxODJjN2ZjMWRmYTIxMTc3ZDY3MjZmMjBmMmE4NTk5ZTA1ZDZkOTkzNTYzM2E0MTA3YzgzZDEwMGI5ZmNkNjhmN2IxMDA1ZWJlZjY0NjQ4MDVkYzQ0MTZmM2EzZTJkZTZmOTc5MQ==",
      "Referer": "https://fanyi.baidu.com/translate?aldtype=16047&query=&keyfrom=baidu&smartresult=dict&lang=auto2zh",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    params: { from: fromLang, to: toLang },
    data: body,
    method: 'POST'
  });
}