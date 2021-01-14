function Enlarge(elem){
    this.ele = document.querySelector(elem)
    console.log(this.ele)
    this.showBox = this.ele.querySelector('.show')
    this.maskBox = this.ele.querySelector('.mask')
    this.listBox = this.ele.querySelector('.list')
    this.enlargeBox = this.ele.querySelector('.enlarge')
    this.showWidth = this.showBox.clientWidth
    this.showHeight = this.showBox.clientHeight
    this.enlargeWidth = parseInt(window.getComputedStyle(this.enlargeBox).width) 
    this.enlargeHeight = parseInt(window.getComputedStyle(this.enlargeBox).height) 
    this.bgWidth = parseInt(window.getComputedStyle(this.enlargeBox).backgroundSize.split(' ')[0])
    this.bgHeight = parseInt(window.getComputedStyle(this.enlargeBox).backgroundSize.split(' ')[1])
    this.inout()
    this.setmask()
    this.setmove()
    this.setlist()
   
}
Enlarge.prototype.inout = function(){
    this.showBox.addEventListener('mouseover',()=>{
        this.maskBox.style.display = 'block'
        this.enlargeBox.style.display = 'block'
    })
    this.showBox.addEventListener('mouseout',()=>{
        this.maskBox.style.display = 'none'
        this.enlargeBox.style.display = 'none'
    })
}

Enlarge.prototype.setmask = function(){
    this.maskWidth = this.showWidth*this.enlargeWidth/this.bgWidth
    this.maskHeight = this.showHeight*this.enlargeHeight/this.bgHeight
    this.maskBox.style.width = this.maskWidth +'px'
    this.maskBox.style.height = this.maskHeight +'px'
}

Enlarge.prototype.setmove = function(){
    this.showBox.addEventListener('mousemove',(e)=>{
        e = e || window.event
       let moveX = e.offsetX - this.maskWidth/2
       let moveY = e.offsetY - this.maskHeight/2
       if(moveX <= 0) moveX = 0
       if(moveY <= 0) moveY = 0
       if(moveX >= this.showWidth - this.maskWidth) moveX = this.showWidth - this.maskWidth
       if(moveY >= this.showHeight - this.maskHeight) moveY = this.showHeight - this.maskHeight
       this.maskBox.style.left = moveX +'px'
       this.maskBox.style.top = moveY + 'px'
        let bgX = moveX*this.enlargeWidth/this.maskWidth
        let bgY = moveY*this.enlargeHeight/this.maskHeight
        this.enlargeBox.style.backgroundPosition = ` -${bgX}px  -${bgY}px`
    })
}
Enlarge.prototype.setlist = function(){
    this.listBox.addEventListener('click',(e)=>{
        e = e || window.event
        let target = e.target||e.srcElement
        if(target.nodeName === 'IMG'){
            let show = target.dataset.show
            let bg = target.dataset.bg
            this.showBox.firstElementChild.src = show
            this.enlargeBox.style.backgroundImage = `url(${bg}) `
            for(let i = 0;i<this.listBox.children.length;i++){
                this.listBox.children[i].classList.remove('active')
            }
            target.parentNode.classList.add('active')
        }
    })

}
