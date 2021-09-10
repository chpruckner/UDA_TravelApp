const handleSubmit = (event) => {
  event.preventDefault();
  //hide result div
  document.getElementById("results").classList.remove("show");

  let userUrl = document.getElementById("url").value;

  if (Client.checkInput(userUrl)) {
    fetch("/evaluation", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: userUrl }),
    })
      .then((response) => response.json())
      .then((response) => {
        Client.showResult(response);
      });

  } else {
    console.error(`${userUrl} is not a valid URL.`);
    alert("Please enter a valid URL starting wit 'http' or 'https'!");
  }
};

export { handleSubmit };
