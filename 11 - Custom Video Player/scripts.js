/* Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const full = player.querySelector('.fullscreen');

/* Build out functions */
function togglePlay() {
    //We use .paused because video doesnt have a .play
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
//We made this function because some people have plugins that could play or pause a video
//Therefor we added play and pause eventlisteners to counter that
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    //Will either be the volume name or playbackrate name of input you have selected
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function openFullscreen() {
    video.requestFullscreen();
}

/* Hook up the event listeners */
//Play/Pause listener on video:
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

//Toggle fullscreen:
full.addEventListener('click', openFullscreen);


//Listen for the video to emit an event called timeupdate
video.addEventListener('timeupdate', handleProgress);

//Skip back or foward listener:
skipButtons.forEach(button => button.addEventListener('click', skip));

//Range changes listeners:
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//Listen for a click on the progress bar and update as it moves
let mouseDown = false;
progress.addEventListener('click', scrub);
//The function in the listener will see if mouseDown is true and then run the function if not then it will not run
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
