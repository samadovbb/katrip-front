const date = new Date();
let date2 = date;
const week=[
  "Yak",
  "Dush",
  "Sesh",
  "Chor",
  "Pay",
  "Jum",
  "Shan"
], 
months=[
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyn",
  "Iyl",
  "Avg",
  "Sen",
  "Okt",
  "Noy",
  "Dek"
]
function renderCalendar(target){
  const return_element = target.querySelector(".selected-value")
  const monthDays = document.querySelector(".days");
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
    const date2=new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    );
  const firstDayIndex = date2.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - (lastDayIndex==6?0:lastDayIndex) - 1;

  let days = "";
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === date.getDate()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }
  if (lastDayIndex!=6)
  for (let j = 1; j <= nextDays; j++) {
     days += `<div class="next-date">${j}</div>`;
    
  }
  document.getElementsByName("month")[0].value=date.getMonth()+1;
  document.getElementsByName("year")[0].value=date.getFullYear();
  monthDays.innerHTML = days;
  document.querySelectorAll(".days div").forEach(function(item){
    item.style.height=item.offsetWidth+"px";
    item.addEventListener("click", (event) => {
      date.setDate(event.target.innerHTML);
      if (event.target.classList[0]=="next-date") date.setMonth(date.getMonth()+1);
      if (event.target.classList[0]=="prev-date") date.setMonth(date.getMonth()-1);
      if (date <= new Date()) { 
        sayError("Ushbu sana bo'yicha chipta buyurtma qilib bo'lmaydi"); 
        if (event.target.classList[0]=="next-date") date.setMonth(date.getMonth()-1);
        if (event.target.classList[0]=="prev-date") date.setMonth(date.getMonth()+1);
        return 'UNDER_OR_EQUAL_TODAY'; 
      }
      return_element.innerText=date.getDate()+" "+months[date.getMonth()]+", "+week[date.getDay()];
      if(target.classList[0]=="from-date"){
        from_date=date.getTime();
      } else {
        to_date=date.getTime();
      }
      renderCalendar(target);
    });
  });
};
function create_picker(target){
  document.querySelector(".month").addEventListener("change", function(event){
    date.setMonth(event.target.value-1);
    renderCalendar(target);
  });
  
  document.querySelector(".year").addEventListener("change", function(event){
    date.setFullYear(event.target.value);
    renderCalendar(target);
  });
  document.querySelector(".calendar").parentElement.style.display="flex";
  document.querySelector(".calendar").parentElement.style.justifyContent="center";
  renderCalendar(target);
}