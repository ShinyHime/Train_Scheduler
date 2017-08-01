var database = firebase.database();

//CLICK EVENT TO ADD NEW TRAIN TO FIREBASE
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  console.log('working');

  var trainName = $('#trainName').val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#firstTrain").val().trim();
  var frequency = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency,
  }

  //push new train object to firebase
  database.ref().push(newTrain);

  $('#trainName').val('');
  $('#destination').val('');
  $('#firstTrain').val('');
  $('#frequency').val('');

});


database.ref().on('child_added', function(childSnapshot) {

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;

  console.log(trainName + " || " + destination + " || " + firstTrain + " || " + frequency);

  var startTime = moment(firstTrain, 'hh:mm');
  console.log(moment(startTime).format('hh:mm'));

  //current time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  //difference between times
  var diffTime = moment().diff(moment(startTime), "minutes");
  console.log("Difference in time: " + diffTime);

  //remainder
  var remainder = diffTime % frequency;
  console.log(remainder);

  //minutes until train
  var minutesAway = frequency - remainder;
  console.log("minutes till train: " + minutesAway);

  //next train
  var nextTrain = moment().add(minutesAway, "minutes");
  console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

  $('.trainTable').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesAway + "</td></tr>");
});
