const date = new Date();
let date2 = date;
const renderCalendar = () => {

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
    //console.log(lastDayIndex);

  const nextDays = 7 - (lastDayIndex==6?0:lastDayIndex) - 1;

  let days = "";
    //console.log(firstDayIndex)
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
  
  for (let j = 1; j <= nextDays; j++) {
    if (lastDayIndex!=6) days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
  document.querySelectorAll(".days div").forEach(function(item){
    item.style.height=item.offsetWidth+"px";
    item.addEventListener("click", (event) => {
      date.setDate(event.target.innerHTML);
      //console.log(date);
      renderCalendar();
    });
  });
};

document.querySelector(".month1").addEventListener("change", (event) => {
  date.setMonth(event.target.value-1);
  
  renderCalendar();
  // console.clear();
});

document.querySelector(".year").addEventListener("change", (event) => {
  date.setFullYear(event.target.value);
  renderCalendar();
});

renderCalendar();