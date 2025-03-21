const mem_no = 0000000
const cookie = "ncookie=done; connect.sid=s%3A6F9lXf2r_eorqQELPMP4nQbZeLvNVux3.OYTkQ%2BibHxtiWMsfvs0zLWG8VQVGYqRQjlrtDX1FxN3"

function ss(v, ts) {
  // try and avoid pauses after seeking
  v.pause()
  v.currentTime = ts // if this is far enough away from current, it implies a "play" call as well...oddly. I mean seriously that is junk.
  // however if it close enough, then we need to call play manually
  // some shenanigans to try and work around this:
  var timer = setInterval(function () {
    if (v.readyState == 4 || !v.paused) {
      v.play()
      clearInterval(timer)
    }
  }, 50)
}

function skip(i) {
  let v = document.getElementsByTagName('video')[0]
  let duration = v.duration
  let target = duration - 1
  ss(v, target)
  sendAjax(target, mem_no, cookie)
}

async function sendAjax(time, mem_no, cookie) {
  await fetch("https://www.cdec.kr/education/player/ajax", {
    "method": "POST",
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9,ko;q=0.8",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Content-Length": "69",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie,
      "DNT": "1",
      "Host": "www.cdec.kr",
      "Origin": "https://www.cdec.kr",
      "Pragma": "no-cache",
      "Referer": "https://www.cdec.kr/education/player/basic",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
      "sec-ch-ua": '"Not;A=Brand";v="24", "Chromium";v="128"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "macOS"
    },
    "body": new URLSearchParams({
      'mem_no': mem_no,
      'mov_order': '18',
      'currentTime': `${time}`,
      'volume': '1',
      'muted': 'false'
    }).toString()
  })
}
