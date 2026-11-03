        // Counter Animation
        document.addEventListener("DOMContentLoaded",()=>{
        const numbers=document.querySelectorAll(".metric h3,.impact-box h4");
        numbers.forEach(el=>{
        const text=el.innerText;
        const value=parseInt(text.replace(/\D/g,'')) || 0;
        let count=0;
        const speed=Math.max(value/80,1);
        const interval=setInterval(()=>{
        count+=speed;
        if(count>=value){
        el.innerText=text;
        clearInterval(interval);
        }else{
        if(text.includes('%')){
        el.innerText=Math.floor(count)+'%';
        }
        else if(text.includes('$')){
        el.innerText='$'+Math.floor(count)+'K';
        }
        else{
        el.innerText=Math.floor(count).toLocaleString()+'+';
        }}
        },20);
        });
        });