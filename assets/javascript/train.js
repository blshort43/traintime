  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAIn5XZsjrPd5jI55o_q3QzglwaRuwbYm8",
    authDomain: "traintime-c84af.firebaseapp.com",
    databaseURL: "https://traintime-c84af.firebaseio.com",
    storageBucket: "traintime-c84af.appspot.com",
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  var trainName, trainDestination, firstTrain, trainFrequency;

  // Button to add trains
  $("#addTrainButton").on("click", function(){

  	// Get user input
  	trainName = $("#trainInput").val().trim();
  	trainDestination = $("#destinationInput").val().trim();
  	firstTrain = $("#firstTrainInput").val().trim();
  	trainFrequency = $("#frequencyInput").val().trim();

  	// Local temporary info object
  	var newTrain = {
  		name: trainName,
  		destination: trainDestination,
  		first: firstTrain,
  		frequency: trainFrequency
  	};

  	// upload data to database
  	database.ref().push(newTrain);

  	// console log
  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.first);
  	console.log(newTrain.frequency);

  	// clear text boxes
  	$("#trainInput").val("");
  	$("#destinationInput").val("");
  	$("#firstTrainInput").val("");
  	$("#frequencyInput").val("");

  });

  	// Firebase event for adding train to database & row in html when user adds input
  	database.ref().on("child_added", function(childSnapshot){

  	console.log(childSnapshot.val());

  	// Store in variable
 	trainName = childSnapshot.val().name;
 	trainDestination = childSnapshot.val().destination;
 	firstTrain = childSnapshot.val().first;
 	trainFrequency = childSnapshot.val().frequency;

 	// Train info
 	console.log(trainName);
 	console.log(trainDestination);
 	console.log(firstTrain);
 	console.log(trainFrequency);

 	//calculate the time of the next train's arrival

		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTrain,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % trainFrequency;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = trainFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
  })