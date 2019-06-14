  // Your web app's Firebase configuration
  var firebaseConfig = {
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

              // Grabs user input
              var trainpName = $("#train-name-input").val().trim();
              var destinationName = $("#destination-input").val().trim();
              var firstTrainTime = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
              var trainFrequency = $("#frequency-input").val().trim();