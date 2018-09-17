
    // START CODING BELOW!!

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBcb6tIJjPK_G5pe1V_mGEwMpzbVl5FNOk",
    authDomain: "train-scheduler-79647.firebaseapp.com",
    databaseURL: "https://train-scheduler-79647.firebaseio.com",
    projectId: "train-scheduler-79647",
    storageBucket: "",
    messagingSenderId: "45475312281"
  };
  firebase.initializeApp(config);


    // Create a variable to reference the database.
    var scheduleTable = firebase.database();

    // Initial Values
    var name = "";
    var destination= "";
    var firstTrain = "";
    var frequency= "";
    
   

    // Capture Button Click
    $("#add-train").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text-boxes
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrain= moment($("#time-input").val().trim(),"HH:mm").subtract(10, "years").format("X");
      frequency= $("#Frequency-input").val().trim();
      
    

      // Code for "Setting values in the database"
       scheduleTable.ref("/trains").push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded:firebase.database.ServerValue.TIMESTAMP


        
      });

 // Clears all of the text-boxes
 $("#name-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#Frequency-input").val("");

return false;

    });

    // Firebase watcher + initial loader HINT: .on("value")
    scheduleTable.ref("/trains").on("child_added", function(childSnapshot) {

        let sv=childSnapshot.val();


let trainName = sv.name;
let trainDestination = sv.destination;
let trainFrequency = sv.frequency;
let FirstTrain = sv.firstTrain;


//calculates the how many minutes left
      
    let Remainder = moment().diff(moment.unix(FirstTrain), "minutes") % trainFrequency;
    let minutesAway = trainFrequency - Remainder;

    // To calculate the arrival time, add the tMinutes to the currrent time
    let nextArrival = moment().add(minutesAway, "m").format("hh:mm A");

            

$("#trainSchedule > tbody").append("<tr><td>" + trainName+ "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "mins" + "</td></tr>");

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

 