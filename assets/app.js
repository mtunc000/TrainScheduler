
  
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

    // Set up the Initial static Variables

    var name = "";
    var destination= "";
    var firstTrain = "";
    var frequency= "";
    
   

    // Capture Button Click 
    $("#add-train").on("click", function(event) {
      event.preventDefault();

      // Grab values from text-boxes store in the variables
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrain= moment($("#time-input").val().trim(),"HH:mm").subtract(10, "years").format("X");
      frequency= $("#Frequency-input").val().trim();
      
    

      // push the  values into the firebase database"
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

    // Firebase stores the new information as snapshots 
    
    scheduleTable.ref("/trains").on("child_added", function(childSnapshot) {

        let sv=childSnapshot.val();


        let trainName = sv.name;
        let trainDestination = sv.destination;
        let trainFrequency = sv.frequency;
        let FirstTrain = sv.firstTrain;


//calculates the minutes left
      
    let Remainder = moment().diff(moment.unix(FirstTrain), "minutes") % trainFrequency;
    let minutesAway = trainFrequency - Remainder;


    // calculates the next arrival time

    let nextArrival = moment().add(minutesAway, "m").format("hh:mm A");

       
    // Adds the new information to the page

$("#trainSchedule > tbody").append("<tr><td>" + trainName+ "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "mins" + "</td></tr>");

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

 