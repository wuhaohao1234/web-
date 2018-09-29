let i = 0;
$('.container').on('click',()=>{
  i ++;
  if(i>$('li').length - 1) {
    i = 0
  }
  for(let j = 0;j < $('li').length;j ++){
    $('li')[j].className=''
  }
  $('li')[i].className = 'active'
})
