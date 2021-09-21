const handleDate = date => {
  let today = new Date();
  let d = today.getDate();
  let m = today.getMonth() + 1; // Jan = 0
  let y = today.getFullYear();
  const userDate = new Date(date);

  // change date to right format -> only 2-digit numbers
  if (d < 10) {
    d = "0" + d;
  }

  if (m < 10) {
    m = "0" + m;
  }

  const todayShort = `${y}-${m}-${d}`;
  //document.getElementById("start-date").setAttribute("min", todayShort);

  const timespan = (userDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  const timespanRound = Math.ceil(timespan);

  if (todayShort <= date) {
    return {check: true, days: timespanRound};
  } else {
    return {check: false, days: 0};
  }
};

export { handleDate };