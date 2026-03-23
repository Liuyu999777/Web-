let isPlaying = false;

function toggleMusic() {
    const bgm = document.getElementById('bgm');
    const cd = document.getElementById('CD');
    
    if (isPlaying) {
        bgm.pause();
        cd.classList.remove('playing');
    } else {
        bgm.play().catch(err => {
            console.log("播放被拦截，请确保用户已点击页面");
        });
        cd.classList.add('playing');
    }
    isPlaying = !isPlaying;
}