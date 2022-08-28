console.log("sa");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
// audioElement.play();
let playMaster = document.getElementById('playMaster');
let progressBar= document.getElementById('myProgressbar')
let gif = document.getElementById('gif');
let songNameBar = document.getElementById('songNameBar');
let songitems = Array.from(document.getElementsByClassName('songItem'));


let songs=[
    {songName:"wario - mortals",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Circles -post malone",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"Let me down - chain smoker",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Symphony - orchestra",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Titan - metal enegy",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Let me love you - pop",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"}
]

songitems.forEach((element ,i) => {
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
});
// listen to events
playMaster.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        playMaster.classList.remove('fa-play-circle');
        playMaster.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        songNameBar.innerText= songs[songIndex-1].songName;
    }else{
        audioElement.pause();
        playMaster.classList.remove('fa-pause-circle');
        playMaster.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    console.log('time');
    let progress = (audioElement.currentTime/audioElement.duration)*100;
    console.log(progress);
    progressBar.value=progress;
    
})

progressBar.addEventListener('change',()=>{
    audioElement.currentTime = (progressBar.value*audioElement.duration)/100;
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songIndex}.mp3`;
        audioElement.play();
        audioElement.currentTime=0;
        playMaster.classList.remove('fa-play-circle');
        playMaster.classList.add('fa-pause-circle');
        songNameBar.innerText= songs[songIndex-1].songName;
        gif.style.opacity=1;

    })
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
    })
}

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>6){
        songIndex=1;
    }else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    audioElement.play();
    audioElement.currentTime=0;
    playMaster.classList.remove('fa-play-circle');
    playMaster.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    songNameBar.innerText= songs[songIndex-1].songName;
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<1){
        songIndex=6;
    }else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    audioElement.play();
    audioElement.currentTime=0;
    playMaster.classList.remove('fa-play-circle');
    playMaster.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    songNameBar.innerText= songs[songIndex-1].songName;
})