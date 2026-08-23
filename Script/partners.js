// Optional Mouse Wheel Control

const track=document.querySelector('.track');

let speed=35;

track.addEventListener('mouseenter',()=>{
track.style.animationPlayState='paused';
});

track.addEventListener('mouseleave',()=>{
track.style.animationPlayState='running';
});

