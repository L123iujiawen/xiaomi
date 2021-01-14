

    const ul = document.querySelector('.sousuo > ul')
    const inp = document.querySelector('.sousuo > input')
    const body = document.querySelector('body')
    inp.addEventListener('input', function () {
      const text = this.value.trim()
      const script = document.createElement('script')
      script.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,33222,33306,33259,33235,32973,33351,33313,33312,33311,33310,33309,33308,33307,33145,22159,33389&wd=${ text }&req=2&csor=4&pwd=aiq&cb=bindHtml&_=1608775410035`
    
      document.body.appendChild(script)
      script.remove()
    })


    function bindHtml(res) {
      console.log(res)
      if (!res.g) {
        ul.style.display = 'none'
        return
      }

      let str = ''
      res.g.forEach(item => {
        str += `
          <li>${ item.q }</li>
        `
      })
      ul.innerHTML = str
      ul.style.display = 'block'

    }
    body.onclick = function(){
        ul.style.display = 'none'
    }
    