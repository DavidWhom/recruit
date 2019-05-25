function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime,
  dateDiff
}

export function dateDiff (sDate1) {
  var date2 = new Date()
  var date1 = new Date(Date.parse(sDate1.replace(/-/g, '/')))
  var iDays = parseInt(Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24)
  return iDays
}

/**
 * 1.密码必须由字母、数字、特殊符号组成，区分大小写
 2.特殊符号包含（. _ ~ ! @ # $ ^ & *）
 3.密码长度为8-20位
 *
 */
export function validPwd (text) {
  var pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{8,20}$/
  if (pattern.test(text.trim())) {
    return (true)
  } else {
    return (false)
  }
}

export function formateDate (obj, fmt) {
  let date
  // 传进来的参数有可能为string 也有可能为date
  // ios系统下 Date会出现NaN
  if (isNaN(obj)) {
    date = new Date(obj.replace(/-/g, '/'))
  } else {
    date = new Date(obj)
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

export function isNum (num) {
  var re = /^[0-9]+.?[0-9]*$/
  if (!re.test(num)) {
    return false
  }
  return true
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
