// get elements 

const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressFill = document.querySelector('.progress__filled');
const startButton = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('.player__button');
const sliders = document.querySelectorAll('.player__slider');

// build functions 

function togglePlay(){
  if (video.paused){
    video.play()
  } else {
    video.pause()
  }
}

function updateButton(){
  const icon = this.paused ? '►' : '❚ ❚';
  startButton.textContent = icon;
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip)
}

function updateRange(){
  
  // console.log(this.value)
  // console.log(this.name)
  video[this.name] = this.value
}

function updateProgress(){
  // const percentage = (video.currentTime/ video.duration) * 100
  // progressFill.style.flexBasis = `${percentage}%`
  const percent = (video.currentTime / video.duration) * 100;
  progressFill.style.flexBasis = `${percent}%`;
}

function scrub(e){
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration
  video.currentTime = scrubTime
}
//hook up the event listeners 

startButton.addEventListener('click', togglePlay)
video.addEventListener('click',togglePlay)
video.addEventListener('play',updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', updateProgress)


skipButtons.forEach((skipButton)=> skipButton.addEventListener('click',skip))

sliders.forEach(slider => slider.addEventListener('mousemove', updateRange))

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);