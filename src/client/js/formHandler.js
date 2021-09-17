const handleSubmit = (event) => {
  event.preventDefault();
  //hide result div
  document.getElementById("results").classList.remove("show");

  let city = document.getElementById("city").value;
  let date = document.getElementById("start-date").value;

  //console.log({city});
  //console.log({date});

  const { check, days } = Client.handleDate(date);
  if (check) {
    fetch("/travel", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city, date, days }),
    })
      .then((response) => response.json())
      .then((response) => {
        Client.showResult(response, days);
        //console.log(response);
      });

  } else {
    console.error("Date must be filled out and not in the past.");
    alert("Please enter a valid date that is not in the past!");
  }
};

export { handleSubmit };
