const secondDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
let countdown
const custom = document.customForm

const timer = (seconds)=>{
  clearInterval(countdown)
  const now = Date.now()
  const then = now + seconds*1000
  displayEndTime(then)
  displaySecond(seconds)
  countdown = setInterval(() => {
    const secondLeft = Math.round((then - Date.now())/1000)

    if (secondLeft < 0){
      clearInterval(countdown)
      return;
    }
    displaySecond(secondLeft)
  },1000)
}


const displaySecond = (seconds)=>{
  let min = Math.floor(seconds/60)
  if (min < 10){
    min = '0'+min
  }
  let sec = seconds%60
  if (sec < 10) {
    sec = '0' + sec
  }
  secondDisplay.textContent = `${min}:${sec}`
}

const displayEndTime = (time) => {
  const end = new Date(time)
  const hour = end.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  const min = end.getMinutes()
  if (min < 10) {
    min = '0' + min
  }
  endTime.textContent= `Be Back At ${hour}:${min}`
}

buttons.forEach(button=>{
  button.addEventListener('click',()=>{
    timer(button.dataset.time)
  })
})

custom.addEventListener('submit', (e)=>{
  e.preventDefault()
  timer(custom.minutes.value*60)
})