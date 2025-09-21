//Time Extraction and Display
function updateTime(){
    const now=new Date();
    let hours=now.getHours().toString().padStart(2,0);
    const meridiem= hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours=hours.toString().padStart(2,0);
    const minutes=now.getMinutes().toString().padStart(2,0);
    const seconds=now.getSeconds().toString().padStart(2,0);
    const timeString=`${hours}:${minutes}:${seconds} ${meridiem}`;
    document.querySelector('.displayTime').textContent=timeString;
}
updateTime();
setInterval(updateTime,1000);

//Display Date
const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
const day= new Date().getDay();
const month= new Date().getMonth();
const date= new Date().getDate();
const year= new Date().getFullYear();
document.querySelector('.date-container').textContent=`${days[day]}, ${months[month]} ${date}, ${year}`;


const text="Your smart companion for every weather condition.";
const typingElement=document.querySelector('.typing');
let index=0;

function type(){
    if(index<text.length){
        typingElement.textContent+=text.charAt(index);
        index++;
        setTimeout(type,100);
    }
}

type();