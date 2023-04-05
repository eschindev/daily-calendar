// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  var currentTime = dayjs();
  $('#currentDay').text(dayjs().format('MMMM D, YYYY'));

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
    // create content for each row
    hourName = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(`${hour}${ampm}`);
    hourTextArea = $("<textarea>").attr({
      class: "col-8 col-md-10 description",
      rows: "3"
    });
    // check localStorage for item with matching key and populate hourTextArea with value if found
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
    saveButton.append(saveButtonChild);
    

    hourBlocks[index].append(hourName);
    hourBlocks[index].append(hourTextArea);
    hourBlocks[index].append(saveButton);
    calArea.append(hourBlocks[index]);
  }
});
