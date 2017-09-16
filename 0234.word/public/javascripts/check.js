var pad = document.getElementById("pad");
function check(){
  if(pad.value.length !== 8){
    alert("密码必须是8位!!!");
    pad.value = '';
  }
  console.log(pad.value.length);
}
