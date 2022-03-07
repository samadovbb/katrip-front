let timeOutError;
function sayError(error){
    console.log(error);
    if (document.querySelector("#say_error")){
        document.querySelector("#say_error").remove();
        clearTimeout(timeOutError);
    }
    error_div=document.createElement("div");
    error_div.id="say_error";
    error_div.innerHTML='<div class="err_icon"> × </div> <p class="err_text"> </p>'
    document.body.append(error_div);
    error_div.querySelector('.err_text').innerHTML=error;
    setTimeout(function(){
        document.querySelector("#say_error").classList.add("active");
    }, 400)
    timeOutError=setTimeout(function(){
        document.querySelector("#say_error").classList.remove("active");
        setTimeout(function(){
            error_div.remove();
        }, 200)
    }, 10000)
}

function req_error(event){
    sayError("Nomalum xatolik: '"+JSON.stringify(event.type)+"'. Internetga ulanishni tekshiring ");
    console.log(event);
}
function req_load(event){
    console.log(event);
}
function req_progress(event){
    console.log(event);
}
function send_req(url, method, body, req_load1=req_load, req_error1=req_error, req_progress1=req_progress){
    url="https://katrip.incrm.uz/api/v1/"+url;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("progress", req_progress1, false);
    xhr.addEventListener("load", req_load1, false);
    xhr.addEventListener("error", req_error1, false);
    xhr.addEventListener("abort", req_error1, false);
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(body);
}
const token=localStorage.getItem("token")|| "";
function checkToken(){
    const token=localStorage.getItem("token")|| "";
    if (token!==""){
        send_req(token+"/me", "GET", JSON.stringify({}), onCheckToken);
    } else {
        window.location.href="login.html";
    }
}
