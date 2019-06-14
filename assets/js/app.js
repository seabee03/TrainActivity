// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyA6v_MlguatzU9-TIQgDiQvT5gCQfA3QHI",
    authDomain: "train-schedule-8e6d0.firebaseapp.com",
    databaseURL: "https://train-schedule-8e6d0.firebaseio.com",
    projectId: "train-schedule-8e6d0",
    storageBucket: "train-schedule-8e6d0.appspot.com",
    messagingSenderId: "415388740740",
    appId: "1:415388740740:web:fabf42ddae3b01cb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user values
    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    // temporary object for holding train information
    var newTrain = {
        name: trainName,
        destination: destinationName,
        first: firstTrainTime,
        frequency: trainFrequency
    };

    // pushes train information to firebase
    database.ref().push(newTrain);

    // logs details to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    alert("Train details successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});


// This creates a firebase event for adding trains to the database and a row in the html
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    // Train Details
    console.log(trainName);
    console.log(destinationName);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    var tfrequency = 25;

    var firstTime = "03:30";

    //First time minus a year 
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    //Current time
    var currentTime = moment();
    console.log("Current Time: ") + moment(currentTime).format("HH:mm")

    //Difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time: " + diffTime);

    //time remaining
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    //Minutes until the next train 

    var tMinutesTilTrain = tfrequency - tRemainder
    console.log("Minutes until the next train: " + tMinutesTilTrain);

    // The next train
    var nextTrain = moment().add(tMinutesTilTrain, "minutes");
    console.log("Next train arrival time: " + moment(nextTrain).format("HH:mm"))

    // Prettify the train's first start
    var trainStartPretty = moment.unix(firstTrainTime).format("HH:mm");

    // Creates new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationName),
        $("<td>").text(trainFrequency,
            $("<td>").text(nextTrain),
            $("<td>").text(tMinutesTilTrain),
        ));

    // Appending the new row to the table
    $("#train-table > tbody").append(newRow);
});