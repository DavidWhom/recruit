export function navigateTo (url) {
  wx.navigateTo({
    url: url
  })
}

export function makePhoneCall (url) {
  wx.makePhoneCall({
    phoneNumber: '15859122565'
  })
}

export function switchTab (url) {
  wx.switchTab({
    url: url
  })
}

export function setNavigationBarTitle (title) {
  wx.setNavigationBarTitle({
    title: title
  })
}

export function setStorage (key, value) {
  wx.setStorage({
    key: key,
    data: value
  })
}

export function getStorageSync (key) {
  try {
    const value = wx.getStorageSync(key)
    return value
  } catch (e) {
    return null
  }
}

export function reLaunch (url) {
  wx.reLaunch({
    url: url
  })
}

export function clearStorage () {
  wx.clearStorage()
}
