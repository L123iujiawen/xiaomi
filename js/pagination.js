
class Pagination {
  constructor (select, options = {}) {
    this.ele = document.querySelector(select)
    this.current = 1
    this.total = options.total || 90
    this.pagesize = options.pagesize || 10
    this.totalPage = Math.ceil(this.total / this.pagesize)
    this.sizeList = options.sizeList || [10, 20, 30, 40]
    this.first = options.first || 'first'
    this.prev = options.prev || 'prev'
    this.next = options.next || 'next'
    this.last = options.last || 'last'
    this.jump = options.jump || 'go'
    this.change = options.change || function () {}

    this.init()
  }

  init () {
    this.setHtml()
    this.setEvent()
  }

  setHtml () {
    let str = `
      <select class="sizeList">
    `
    this.sizeList.forEach(item => {
      str += `<option value="${ item }">${ item }</option>`
    })

    str += `
      </select>
      <p class="first ${ this.current === 1 ? 'disable' : '' }">${ this.first }</p>
      <p class="prev ${ this.current === 1 ? 'disable' : '' }">${ this.prev }</p>
      <div class="list">
    `

    if (this.totalPage <= 9) {
      for (let i = 1; i <= this.totalPage; i++) {
        str += `<p class="item ${ this.current === i ? 'active' : '' }">${ i }</p>`
      }
    } else {
      if (this.current <= 3) {
        for (let i = 1; i <= 5; i++) {
          str += `<p class="item ${ this.current === i ? 'active' : '' }">${ i }</p>`
        }
        str += `<span>···</span><p class="item">${ this.totalPage }</p>`
      } else if (this.current <= this.totalPage - 2) {
        str += `<span>···</span>`
        for (let i = this.current - 2; i <= this.current + 2; i++) {
          str += `<p class="item ${ this.current === i ? 'active' : '' }">${ i }</p>`
        }
        str += `<span>···</span>`
      } else { 
        str += `<p class="item">1</p><span>···</span>`
        for (let i = this.totalPage - 4; i <= this.totalPage; i++) {
          str += `<p class="item ${ this.current === i ? 'active' : '' }">${ i }</p>`
        }
      }
    }

    str += `
      </div>
      <p class="next ${ this.current === this.totalPage ? 'disable' : '' }">${ this.next }</p>
      <p class="last ${ this.current === this.totalPage ? 'disable' : '' }">${ this.last }</p>
      <input type="text" value="${ this.current }" class="jumpText">
      <span>/ ${ this.totalPage }</span>
      <button class="jumpBtn">${ this.jump }</button>
    `

    this.ele.innerHTML = str

    const select = this.ele.querySelector('select')
    select.value = this.pagesize
    this.change(this.current, this.pagesize)
  }

  setEvent () {
    this.ele.onclick = e => {
      e = e || window.event
      const target = e.target || e.srcElement
      if (target.className.search(/(disable|active)/) !== -1) return
      if (target.className.indexOf('first') !== -1) {
        this.current = 1
        this.setHtml()
        return
      }

      if (target.className.indexOf('prev') !== -1) {
        this.current--
        this.setHtml()
        return
      }

      if (target.className.indexOf('next') !== -1) {
        this.current++
        this.setHtml()
        return
      }

      if (target.className.indexOf('last') !== -1) {
        this.current = this.totalPage
        this.setHtml()
        return
      }

      if (target.className.indexOf('item') !== -1) {
        this.current = target.innerText - 0
        this.setHtml()
        return
      }
      if (target.className.indexOf('jumpBtn') !== -1) {
        const text = this.ele.querySelector('.jumpText').value.trim()
        if (isNaN(text)) return
        if (text < 1) return
        if (text > this.totalPage) return
        this.current = text - 0
        this.setHtml()
        return
      }
    }
    this.ele.onchange = e => {
      e = e || window.event
      const target = e.target || e.srcElement
      if (target.nodeName === 'SELECT') {
        this.pagesize = target.value - 0
        this.totalPage = Math.ceil(this.total / this.pagesize)
        this.current = 1
        this.setHtml()
        return
      }
    }
  }
}


