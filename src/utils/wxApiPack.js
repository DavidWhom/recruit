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
