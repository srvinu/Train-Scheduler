  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAdlBK6PnY0FefDPC9sok3sLUZO2NDzp1s",
    authDomain: "trainscheduler-99556.firebaseapp.com",
    databaseURL: "https://trainscheduler-99556.firebaseio.com",
    projectId: "trainscheduler-99556",
    storageBucket: "trainscheduler-99556.appspot.com",
    messagingSenderId: "872995042348"
  };
  firebase.initializeApp(config);
///////////<— Defining  FireBase References —> ////////////
var database = firebase.database()
var trainName;
var destiny;
var firstTT;
var freqMin;
var awayMin = 0;

$("#submit-add").on("click", function(event) {
    event.preventDefault();
    trainName = $('#tName').val().trim();
    destiny = $('#destN').val().trim();
    var fTT = $('#firstTime').val().trim();
    firstTT = moment(fTT, "hh:mm").format("X");
    freqMin =  $('#freq').val().trim();
    var data = {
      trainName: trainName,
      destiny: destiny,
      firstTT: firstTT,
      freqMin: freqMin
    }
    database.ref().push(data);
      // console.log(data);

  });

database.ref().on("child_added", function(snapshot, prevChildKey) {
  var newtrainDetails = snapshot.val();
  var nxtTrain = moment.unix(newtrainDetails.firstTT).format("hh:mm a");
  // console.log(nxtTrain);
  var firstTTConv = moment(newtrainDetails.firstTT, "hh:mm").subtract(1, "years");
  // console.log(firstTTConv);
  var timeNow = moment();

  var diffTime = moment().diff(moment(firstTTConv), "minutes");
  // console.log(diffTime);
  var Rtime =  diffTime % newtrainDetails.freqMin;
  // console.log(Rtime)
  var awayMin = newtrainDetails.freqMin - Rtime;
  // console.log(awayMin);
  var nextTrain = moment().add(awayMin, 'minutes').format("hh:mm")


  generateHTML = "<tr><th scope='row'>" +newtrainDetails.trainName+"</th><td>"+newtrainDetails.destiny+"</td><td>"+newtrainDetails.freqMin+"</td><td>"+nextTrain+"</td><td>"+awayMin+"</td></tr>"
  $("#mainTBody").append(generateHTML)

});
