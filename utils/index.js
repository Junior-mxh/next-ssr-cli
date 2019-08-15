// 文件转base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

// 获取元素坐标值
export const getElementPosition = (element) => {
  let curLeft = 0
  let curTop = 0
  if (element.offsetParent) {
    curLeft = element.offsetLeft
    curTop = element.offsetTop
    while (element === element.offsetParent) {
      curLeft += element.offsetLeft
      curTop += element.offsetTop
    }
  }
  return {x: curLeft, y: curTop}
}

// 下载文件
export const downloadFile = (content, realFileName) => {
  const blob = new Blob([content])
  const fileName = realFileName
  if ('download' in document.createElement('a')) {
    const eLink = document.createElement('a')
    eLink.download = fileName
    eLink.style.display = 'none'
    eLink.href = URL.createObjectURL(blob)
    document.body.appendChild(eLink)
    eLink.click()
    URL.revokeObjectURL(eLink.href)
    document.body.removeChild(eLink)
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}

// 展平数组
export const flatten = (arr) => [].concat(...arr.map(x => Array.isArray(x) ? flatten(x) : x))
// 滚动条是否在底部
export const isToBottom = () => Math.abs(document.body.clientHeight - document.documentElement.clientHeight) <= (document.documentElement.scrollTop || document.body.scrollTop)
// 获取当前元素距离文档顶部的距离
export const getElementToPageTop = (element) => element.parentElement ? getElementToPageTop(element.parentElement) + element.offsetTop : element.offsetTop

// 滚动到指定位置
export function scrollToPositionSmooth (position = 0) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (cb) {
      return setTimeout(cb, 17)
    }
  }
  // 当前滚动高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const step = function () {
    let distance = position - scrollTop
    scrollTop = scrollTop + distance / 5
    if (Math.abs(distance) < 1) {
      window.scrollTo(0, position)
    } else {
      window.scrollTo(0, scrollTop)
      requestAnimationFrame(step)
    }
  }
  step()
}


export const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
