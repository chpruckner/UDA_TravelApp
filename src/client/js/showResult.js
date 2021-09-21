const showResult = (arr, days) => {
  const container = document.getElementById("trip-container");
  const destInput = document.getElementById("city");
  const dateInput = document.getElementById("start-date");

  if (arr.name === "not found") {
    const warn = document.createElement("section");
    warn.classList.add("warning");
    warn.innerHTML = `${destInput.value} was not found. Please check your input or try a bigger locality near your destination!`;
    const main = document.getElementById("main");
    main.appendChild(warn);
    destInput.value = "";

  } else if (arr.length > 0) {
    //show result section
    document.getElementById("results").classList.add("show");

    // delete possible previous warnings
    const warning = document.querySelector(".warning");
    warning && warning.remove();

    // clear previous results
    container.innerHTML = "";

    // create card for each trip saved in the array
    let i = 1;
    arr.forEach(trip => {
        // creating card with content
        const card = document.createElement("div");
        card.classList.add("trip-list-item");
        const id = i.toString();
        card.setAttribute("id", id);
        i++;

        const picCont = document.createElement("div");
        picCont.classList.add("trip-list-item-img");

        const pic = document.createElement("img");
        pic.setAttribute("alt", "");
        pic.setAttribute("src", trip.picUrl);
        pic.setAttribute("width", trip.picWidth);
        pic.setAttribute("height", trip.picHeight);

        const cardBody = document.createElement("div");
        cardBody.classList.add("trip-list-item-body");

        const dest = document.createElement("h3");
        dest.classList.add("trip-list-item-dest");
        dest.innerHTML = `Trip to: ${trip.name}, ${trip.countryCode}`;

        const date = document.createElement("h3");
        date.classList.add("trip-list-item-start");
        date.innerHTML = `Starting: ${trip.date}`;

        const time = document.createElement("div");
        time.classList.add("trip-list-item-until");
        days > 0 ? time.innerHTML = `This trip is ${days} days away.`: time.innerHTML = "The trip starts today!";

        const weather = document.createElement("div");
        weather.classList.add("trip-list-item-weather");
        const descr = trip.weather_desc;
        weather.innerHTML = 
        `<p>The weather in ${trip.name} is ${descr.toLowerCase()} with a temperature between  ${trip.min_temp}°C and ${trip.max_temp}°C and a relative humidity of ${trip.rh}.</p>
        
        <p>The wind speed is ${Math.round(trip.wind_spd)} m/s coming from ${trip.wind_cdir_full}.</p>
        
        <p>The probability of rain is ${trip.pop}%.</p>
        
        <p>There are ${trip.snow / 10} cm snow.</p>`

        cardBody.appendChild(dest);
        cardBody.appendChild(date);
        cardBody.appendChild(time);
        cardBody.appendChild(weather);
        picCont.appendChild(pic);
        card.appendChild(picCont);
        card.appendChild(cardBody);
        container.appendChild(card);
    });

    // clear inptus
    destInput.value = "";
    dateInput.value = "";
  } 
};

export { showResult };
