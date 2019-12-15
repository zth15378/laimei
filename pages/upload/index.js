// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 2,
    scale: 2,
    itemIndex: 1,
    src: '',
    photoScale: 1,
    photoW: 750,
    photoH: 1483,
    old_width: 750,
    old_height: 1483,
    photoLeft: 0,
    photoTop: 0,
    photoX: 0,
    photoY: 0,
    isSc: true,
    start: {},
    end: {},
    distance: 1,
    pic_scale: 1,
    word: '',
    showCanvas: false,
    saveImg: '',
    qjSrc: '../../public/images/endQj.png',
    hzSrc: '../../public/images/bg.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        let p = 750 / res.windowWidth;
        that.setData({
          scale: p
        })
      }
    })

  },
  /**
   * 获取照片
   */
  getPhoto: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var tempFilePaths = res.tempFilePaths[0];
        that.setData({
          src: tempFilePaths,
          isSc: false
        })
        wx.getImageInfo({
          src: tempFilePaths,
          success: function (res) {
            console.log(res);
            let rW, rH, rP, rF;
            if (res.width < 650) {
              rW = 650;
              rH = parseInt(650 / res.width * res.height);
              rP = 650 / res.width;
              if (rH < 1050) {
                rH = 1050;
                rW = parseInt(1050 / res.height * res.width);
                rP = 1050 / res.height;
              }
              rF = 0 - (rW - 650) / 2;
            } else {
              if (res.height < 1050) {
                rH = 1050;
                rW = parseInt(1050 / res.height * res.width);
                rP = 1050 / res.height;
              } else {
                rW = res.width;
                rH = res.height;
                rP = 1;
              }
              rF = 0 - (rW - 650) / 2;
            }
            console.log(rW, rH);
            that.setData({
              photoW: rW,
              photoH: rH,
              old_width: rW,
              old_height: rH,
              photoLeft: rF,
              photoX: rF,
              img_width: res.width,
              img_height: res.height,
              rP: rP
            })
          }
        })
      }
    })

  },

  /**
   * 手势操作
   */
  photoStart: function (e) {
    var that = this;
    let start = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    if (e.touches.length == 2) {
      let _x = e.touches[1].pageX - e.touches[0].pageX,
        _y = e.touches[1].pageY - e.touches[0].pageY,
        distance = Math.sqrt(Math.pow(_x, 2) + Math.pow(_y, 2));//实际距离
      that.setData({
        distance: distance
      })
    }
    this.setData({
      start: start
    })
  },
  photoMove: function (e) {
    var that = this;
    let end = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    this.setData({
      end: end
    })
    let moveX = this.data.end.x - this.data.start.x + this.data.photoX;
    let moveY = this.data.end.y - this.data.start.y + this.data.photoY;
    let whS = that.data.photoW / that.data.photoH;
    that.setData({
      photoLeft: moveX,
      photoTop: moveY
    })
    if (e.touches.length == 2) {
      let _x = e.touches[1].pageX - e.touches[0].pageX,
        _y = e.touches[1].pageY - e.touches[0].pageY,
        newdistance = Math.sqrt(Math.pow(_x, 2) + Math.pow(_y, 2)),
        width = that.data.photoW,
        height = that.data.photoH,
        distance = that.data.distance,
        end_distance = newdistance - distance, //计算手指移动的距离
        pic_scale = 1 + end_distance * 0.002; //0.002是为了使图片放大和缩小时的平缓，不突兀
      let max = that.data.photoW / that.data.old_width;
      if (max > 1.5) {
        that.setData({
          photoW: parseInt(that.data.old_width * 1.5),
          photoH: parseInt(that.data.old_height * 1.5),
          distance: newdistance,
          pic_scale: 1.5
        })
      } else if (max < 0.5) {
        that.setData({
          photoW: parseInt(that.data.old_width * 0.5),
          photoH: parseInt(that.data.old_height * 0.5),
          distance: newdistance,
          pic_scale: 0.5
        })
      } else {
        that.setData({
          photoW: parseInt(width * pic_scale),
          photoH: parseInt(height * pic_scale),
          distance: newdistance,
          pic_scale: max
        })
      }
    }
  },
  photoEnd: function (e) {
    var that = this;
    this.setData({
      photoX: that.data.photoLeft,
      photoY: that.data.photoTop
    })
  },

  /**
   * 更换照片
   */
  photoRe: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // wx.showLoading({
        //   title: '加载中',
        // })
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
        that.setData({
          src: tempFilePaths,
          isSc: false
        })
        wx.getImageInfo({
          src: tempFilePaths,
          success: function (res) {
            let rW, rH, rP, rF;
            if (res.width < 650) {
              rW = 650;
              rH = parseInt(650 / res.width * res.height);
              rP = 650 / res.width;
              if (rH < 1050) {
                rH = 1050;
                rW = parseInt(1050 / res.height * res.width);
                rP = 1050 / res.height;
              }
              rF = 0 - (rW - 650) / 2;
            } else {
              if (res.height < 1050) {
                rH = 1050;
                rW = parseInt(1050 / res.height * res.width);
                rP = 1050 / res.height;
              } else {
                rW = res.width;
                rH = res.height;
                rP = 1;
              }
              rF = 0 - (rW - 650) / 2;
            }
            that.setData({
              photoW: rW,
              photoH: rH,
              old_width: rW,
              old_height: rH,
              photoLeft: rF,
              photoTop: 0,
              photoX: rF,
              photoY: 0,
              start: {},
              end: {},
              distance: 1,
              pic_scale: 1,
              img_width: res.width,
              img_height: res.height
            })
            console.log(res);
          }
        })
      }
    })
  },

  /**
   * 下一步
   */
  photoNext: function () {
    this.setData({
      itemIndex: 2
    })
    console.log(this.data)
  },

  /**
   * 照片语句
   */
  photoWord: function (e) {
    this.setData({
      word: e.detail.value
    })
  },

  /**
   * 上一步
   */
  photoLast: function () {
    this.setData({
      itemIndex: 1
    })
  },

  /**
   * 生成海报
   */
  photoCreate: function () {
    var that = this;
    if (this.data.word == '') {
      wx.showModal({
        title: '提示',
        content: '说一句话纪念一下今天吧！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      this.setData({
        showCanvas: true
      })

      wx.showLoading({
        title: '生成中',
      })
      let p = this.data.scale;
      let c_w = this.data.img_width,
        c_h = this.data.img_height,
        c_w_ = parseInt(this.data.photoW),
        c_h_ = parseInt(this.data.photoH),
        q_w = 750,
        q_h = 1483,
        t_x = 58,
        t_y = 982,
        c_x, c_y, c_x_, c_y_;
      if (this.data.photoLeft > 0) {
        c_x_ = that.data.photoLeft;
        c_x = 0;
      } else {
        c_x = Math.abs(that.data.photoLeft) / that.data.pic_scale;
        c_x_ = 0
      }
      if (this.data.photoTop > 0) {
        c_y_ = that.data.photoTop;
        c_y = 0;
      } else {
        c_y = Math.abs(that.data.photoTop) / that.data.pic_scale;
        c_y_ = 0
      }
      const ctx = wx.createCanvasContext('lookImg');
      ctx.drawImage(that.data.hzSrc, 0, 0, q_w, q_h);
      ctx.drawImage(that.data.src, c_x, c_y, c_w, c_h, c_x_, c_y_, c_w_, c_h_);
      ctx.drawImage(that.data.qjSrc, 0, 0, q_w, q_h);
      ctx.setFontSize(32);
      ctx.setFillStyle('#000000')
      ctx.fillText('"' + that.data.word + '"', t_x, t_y)
      ctx.draw(false, setTimeout(function () {
        console.log('draw')
        wx.canvasToTempFilePath({
          canvasId: 'lookImg',
          success: function (res) {
            console.log(res);
            that.loadImageCallback = function () {
              wx.hideLoading()
              that.setData({
                showCanvas: false,
                itemIndex: 3
              });
            }
            console.log()
            that.setData({
              saveImg: res.tempFilePath
            })
          }, fail: function (res) {
            console.log(res);
          }
        })
      }, 1000));
    }

  },
  loadImageCallback: () => { },
  loadImage() {
    console.log('loadimage');
    this.loadImageCallback();
  },
  /**
   * 画图
  */

  canvasFun: function () {
    var that = this;

  },

  /**
   * 再玩一次
   */
  photoAgain: function () {
    this.setData({
      itemIndex: 1,
      src: '',
      photoScale: 1,
      photoW: 750,
      photoH: 1483,
      old_width: 750,
      old_height: 1483,
      photoLeft: 0,
      photoTop: 0,
      photoX: 0,
      photoY: 0,
      isSc: true,
      start: {},
      end: {},
      distance: 1,
      pic_scale: 1,
      word: '',
      showCanvas: false,
      saveImg: '',
      qjSrc: '../images/photo/endQj.png'
    })
  },


  /**
   * 点击开始的时间
  */
  timestart: function (e) {
    var _this = this;
    _this.setData({ timestart: e.timeStamp });
  },
  /* 
   *  点击结束的时间
  */
  timeend: function (e) {
    var _this = this;
    _this.setData({ timeend: e.timeStamp });

    var times = _this.data.timeend - _this.data.timestart;
    if (times > 300) {
      wx.saveImageToPhotosAlbum({
        filePath: _this.data.saveImg,
        success(res) {
          wx.showToast({
            title: '保存成功',
            icon: "success",
            duration: 1000
          })
        }
      })
    }
  },
})