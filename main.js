let boxes=document.querySelector('input[type=range]');
const main_div=document.querySelector('.main-div');
const gridBtn=document.querySelector('.gridBtn');
const randomize=document.querySelector('.randomize');
const grey=document.querySelector('.shades-of-grey');
const color=document.querySelector('.color-selector');
let color_var=null;



document.querySelector('.clear-btn').addEventListener("click",()=>{
    document.querySelectorAll('.color-box').forEach(data=>{
        data.style.backgroundColor='transparent';
    })
    main_div.style.border=`1px solid transparent`
});

document.querySelectorAll('.control-wrapper').forEach((data,index)=>{
    if(index>2) return;
    data.addEventListener('click',()=>{
        if(index===0){
            color_var=data.querySelector('input').value;
            color.classList.add('outline');
            grey.classList.remove('outline');
            randomize.classList.remove('outline');
        }
        else if(index===1){
            color_var="black";
            color.classList.remove('outline');
            grey.classList.add('outline');
            randomize.classList.remove('outline');
        }
        else if(index===2){
            color_var=null;
            color.classList.remove('outline');
            grey.classList.remove('outline');
            randomize.classList.add('outline');
        }
    });
});
color.querySelector('input').addEventListener('input',()=>{
    color_var=color.querySelector('input').value;
    color.classList.add('outline');
    grey.classList.remove('outline');
    randomize.classList.remove('outline');
})

function randomer(){
    return Math.floor(Math.random()*(256-0)+0);
}

let booler=true;
gridBtn.addEventListener("click",()=>{
    gridBtn.textContent=(gridBtn.textContent==='Grid On')?'Grid Off':'Grid On';
    booler=!booler;
    let temp=document.querySelector('.color-box');
    if(temp.classList.contains('border')){
        document.querySelectorAll('.color-box').forEach(data=>{
            data.classList.remove('border');
        });
    }
    else{
        document.querySelectorAll('.color-box').forEach(data=>{
            data.classList.add('border');
        });
    }
})

boxes.addEventListener("input",()=>{
    let temp=boxes.value;
    document.querySelector('.range-cont div').innerHTML=`${temp}*${temp}`;
    document.documentElement.style.setProperty("--repeater",temp);
    temp=temp*temp;
    main_div.innerHTML='';
    let innerTemp=`<h2>Hover over Me</h2>`;
    let txt=(booler===true)?`<div class="color-box"></div>`:`<div class="color-box border"></div>`;
    while(temp>0){
        innerTemp+=txt;
        temp--;
    }
    main_div.innerHTML=innerTemp;
    hoverer();
})

function colorApplier(data){
    let t1,t2,t3;
    if(color_var===null){
      t1=randomer();
      t2=randomer();
      t3=randomer();
      data.style.backgroundColor=`rgb(${t1},${t2},${t3})`;
      document.querySelector('.color-code-cont').innerHTML=`RGB(${t1},${t2},${t3})`;
      main_div.style.border=`1px solid rgb(${t1},${t2},${t3})`;
  }
    else if(color_var==='black'){
        t1=randomer();
        t2=t1;
        t3=t1;
        data.style.backgroundColor=`rgb(${t1},${t2},${t3})`;
        document.querySelector('.color-code-cont').innerHTML=`RGB(${t1},${t2},${t3})`;
        main_div.style.border=`1px solid rgb(${t1},${t2},${t3})`;
      }
    else{
        data.style.backgroundColor=color_var;
        document.querySelector('.color-code-cont').innerHTML=color_var;
        main_div.style.border=`1px solid ${color_var}`;
      }
}


function hoverer(){
    let innerBoxes=[...document.querySelectorAll('.color-box')];
    innerBoxes.forEach(data=>{
        data.addEventListener("mouseover",(e)=>{
            colorApplier(data);
        })
        // data.addEventListener("touchstart",(e)=>{
        //     console.log(e);
        //     let touches=e.changedTouches;
        //     for(let i=0;i<e.changedTouches.length;i++){
        //         let touchId=e.changedTouches[i].identifier;
        //         let x=e.changedTouches[i].pageX;
        //         let y=e.changedTouches[i].pageY;
        //         console.log(touchId,x,y);

        //     }
        //     colorApplier(data);
        // })
    })
}

let prev=null;
main_div.addEventListener("touchmove",(e)=>{
    console.log(e);
    e.preventDefault();
    const ele=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY);
    if(ele===prev || ele===null || !ele.classList.contains('color-box')){
        return;
    }
    prev=ele;
    colorApplier(ele);
})

hoverer();