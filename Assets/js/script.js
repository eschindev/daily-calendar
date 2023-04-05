$(function () {
  // get current time and render to header
  var currentTime = dayjs();
  $('#currentDay').text(dayjs().format('MMMM D, YYYY'));
  // declare necessary variables,
  var calArea = $('#calArea');
  var hourBlocks = [];
  var hourName;
  var hourTextArea;
  var saveButton;
  var key;
  var saveButtonChild;
  var hour;
  var ampm;
  var index;
  // use for loop to iterate over hours of the day and create / populate elements per hour
  for (i = 9; i <= 17; i++){
    index = i - 9;
    if (Math.floor(i / 12) === 0) {
      ampm = "AM";  
    } else {ampm = "PM"}
    // create each row
    if (i === 12) {
      hour = 12;
    } else {
      hour = i % 12;
    }
    hourBlocks[index] = $("<div>").attr("id", `${hour}${ampm}`).addClass("row time-block");
    // set each row as past, present, or future
    if (i < parseInt(currentTime.format("H"))) {
      hourBlocks[index].addClass("past");
    } else if (i === parseInt(currentTime.format("H"))) {
      hourBlocks[index].addClass("present");
    } else {
      hourBlocks[index].addClass("future");
    }
    // create content for each row, and check localStorage for item with matching key, populating hourTextArea with value if found
    hourName = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(`${hour}${ampm}`);
    hourTextArea = $("<textarea>").attr({
      class: "col-8 col-md-10 description",
      rows: "3"
    });

    key = `${hour}${ampm}-save`;
    if (localStorage.key) {
      hourTextArea.text(localStorage.getItem(key));
    }

    saveButton = $("<button>").attr({
      id: `${hour}${ampm}-save`,
      class: "btn saveBtn col-2 col-md-1",
      "aria-label": "save"
    });

    saveButtonChild = $("<i>").attr({
      class: "fas fa-save",
      "aria-hidden": "true"
    });

    // append content together in appropriate structure
    saveButton.append(saveButtonChild);
    hourBlocks[index].append(hourName);
    hourBlocks[index].append(hourTextArea);
    hourBlocks[index].append(saveButton);
    calArea.append(hourBlocks[index]);
  }
  // function to save content to localStorage
  function addToLocalStorage(ev) {
    localStorage.setItem(ev.target.id, $(ev.target).siblings("textarea").val());
  }
  // eventListener using event delegation to catch events propagating up from the button element and trigger above function
  calArea.on('click', '.btn', addToLocalStorage);
});
