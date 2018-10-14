////////////////////////////////////////////////////////////////////
//Initialize Firebase
////////////////////////////////////////////////////////////////////
var config = {
    apiKey: "AIzaSyDVl4JcXYyFk_qpMMTazPmrWBN9cRJFhGc",
    authDomain: "train-scheduler-fa495.firebaseapp.com",
    databaseURL: "https://train-scheduler-fa495.firebaseio.com",
    projectId: "train-scheduler-fa495",
    storageBucket: "train-scheduler-fa495.appspot.com",
    messagingSenderId: "823114571840"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  //////////////////////////////////////////////////////////////////
  //FIREBASE DATABASE DETAILS
  //////////////////////////////////////////////////////////////////
  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();
  console.log(name, destination, firstTrain, frequency);
  
  database.ref("/train").push({
      name: name,
      destination: destination,
      train: firstTrain,
      frequency: frequency
  })
  });
  
  
  
  
  
  
  var arrivalDetails = 3;
  
  //////////////////////////////////////////////////////////////////
  // REMOVE BUTTON
  //////////////////////////////////////////////////////////////////
  var removeButton = $("<button>Remove</button>").addClass("remove-button").val("remove");
  
  
  var minutesAway =3;
  //////////////////////////////////////////////////////////////////////
  //TIME
  //////////////////////////////////////////////////////////////////////
  
  //////////////////////////////////////////////////////////////////////
  //////////HELP
  //////////////////////////////////////////////////////////////////////
  // var tFrequency = 3;
  // var firstTime = "12:30";
  var tFrequency = $("#frequency").val().trim();
  var firstTime = $("#first-train").val().trim();
  
  
  
  
  
  
  
  
  
  
  
  
  
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);
  
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  /////////////////////////////////////////////////////////////////
  // Set up the childe_added event for firebase employees location
  /////////////////////////////////////////////////////////////////
  database.ref("/train").on("child_added", function(snapshot){
      console.log(snapshot.val());
  
      var newRow = $("<div>").addClass("row");
      var nameCol = $("<div>").addClass("col-2").text(snapshot.val().name);
      var destCol = $("<div>").addClass("col-2").text(snapshot.val().destination);
      var freqCol = $("<div>").addClass("col-2").text(snapshot.val().frequency);
      //////////////////
      // var startDate = moment(snapshot.val().startDate);
      // console.log(startDate.format());
      // console.log(moment().diff(startDate, "days"));
      // /////////////////
      var nextArrival = $("<div>").addClass("col-2").text(moment(nextTrain).format("hh:mm"));
      ///////////////
  
  
      ///////////////
      var minAway = $("<div>").addClass("col-2").text(tMinutesTillTrain);
      var remButton = $("<div>").addClass("col-2").append(removeButton);
  
  
      newRow.append(nameCol, destCol, freqCol, nextArrival, minAway, remButton);
      $("#new-train-rows").append(newRow)
  })
  
  ////////////////////////////////////////////////////
  //REMOVE BUTTON FUNCTION
  ////////////////////////////////////////////////////
  $(removeButton).on("click", function(){
  
  });