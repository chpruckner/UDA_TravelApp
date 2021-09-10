const showResult = (data) => {
  const agreement = document.querySelector(".char-agree-content");
  const subjectivity = document.querySelector(".char-sub-content");
  const confidence = document.querySelector(".char-confi-content");
  const irony = document.querySelector(".char-irony-content");
  const score_tag = document.querySelector(".char-score-content");

  //show result div
  document.getElementById("results").classList.add("show");

  // clear last result
  agreement.innerHTML = "";
  subjectivity.innerHTML = "";
  confidence.innerHTML = "";
  irony.innerHTML = "";
  score_tag.innerHTML = "";

  switch (data.agreement) {
    case "AGREEMENT":
      agreement.innerHTML = "the different elements have the same polarity.";
      break;
  
    case "DISAGREEMENT":
      agreement.innerHTML = "there is disagreement between the different elements' polarity.";
      break;
  }

  switch (data.subjectivity) {
    case "OBJECTIVE":
      subjectivity.innerHTML = "the text does not have any subjectivity marks.";
      break;
  
    case "SUBJECTIVE":
      subjectivity.innerHTML = "the text has subjective marks.";
      break;
  }

  confidence.innerHTML = data.confidence;

  switch (data.irony) {
    case "NONIRONIC":
      irony.innerHTML = "the text does not have any irony marks.";
      break;
  
    case "IRONIC":
      irony.innerHTML = "the text has irony marks.";
      break;
  }

  switch (data.score_tag) {
    case "P+":
      score_tag.innerHTML = "strong positive";
      break;

    case "P":
      score_tag.innerHTML = "positive";
      break;

    case "NEU":
      score_tag.innerHTML = "neutral";
      break;

    case "N":
      score_tag.innerHTML = "negative";
      break;

    case "N+":
      score_tag.innerHTML = "strong negative";
      break;

    case "NONE":
      score_tag.innerHTML = "without polarity";
      break;
  }  
};

export { showResult };
