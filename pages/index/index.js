//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    systemInfo: {},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sleepList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.getSystemInfo()
    this.getSleepList()
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getSystemInfo: function () {
    let _this = this;

    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          systemInfo: res
        })
      },
    })
  },
  getSleepList: function() {
    let sleepList = [];

    for (let i = 0; i < 8; i++) {
      sleepList.push('../../static/z-' + i + '.gif');
    }

    this.setData({
      sleepList: sleepList
    })
  },

  previewImage: function (e) {
    wx.navigateTo({
      url: '/pages/preview/index?id=' + e.currentTarget.dataset.id
    })
  }
})
