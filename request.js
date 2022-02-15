document.body.innerHTML+=(`        <div id="say_error">
<div class="err_icon"> &times; </div>
<p class="err_text">
    
</p>
</div>`)
const errorDiv=document.querySelector("#say_error");
let timeOutError;
function sayError(error){
    console.log(error)
    if (timeOutError){
        clearTimeout(timeOutError);
        errorDiv.classList.remove("active");
        errorDiv.querySelector(".err_text").innerText=error;
        setTimeout(function(){
            errorDiv.classList.add("active");
        }, 1000)
    } else {
        errorDiv.querySelector(".err_text").innerText=error;
        errorDiv.classList.add("active");
    }
    timeOutError=setTimeout(function(){
        errorDiv.classList.remove("active");
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
    url="http://katrip.incrm.uz/api/v1/"+url;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("progress", req_progress1, false);
    xhr.addEventListener("load", req_load1, false);
    xhr.addEventListener("error", req_error1, false);
    xhr.addEventListener("abort", req_error1, false);
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(body);
}

function checkToken(){
    const token=localStorage.getItem("token")|| "";
    if (token!==""){
        send_req(token+"/me", "GET", JSON.stringify({}), onCheckToken);
    } else {
        window.location.href="login.html";
    }
}