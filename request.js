
const errorDiv=document.querySelector("#say_error");
let timeOutError;
function sayError(error){
    console.log(error)
    if (timeOutError){
        clearTimeout(timeOutError);
        document.querySelector("#say_error").classList.remove("active");
        document.querySelector("#say_error").querySelector(".err_text").innerText=error;
        setTimeout(function(){
            document.querySelector("#say_error").classList.add("active");
        }, 1000)
    } else {
        document.querySelector("#say_error").querySelector(".err_text").innerText=error;
        document.querySelector("#say_error").classList.add("active");
    }
    timeOutError=setTimeout(function(){
        document.querySelector("#say_error").classList.remove("active");
    }, 10000)
}

function req_error(event){
    sayError("Nomalum xatolik: '"+JSON.stringify(event.type)+"'. Internetga ulanishni tekshiring ");
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
