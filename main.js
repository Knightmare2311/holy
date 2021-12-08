noseX = 0;
noseY = 0;
difference = 0;
right_WristX = 0;
left_WristX = 0;

function setup() {
  canvas = createCanvas(550, 450);
  canvas.position(560, 150);
  video = createCapture(VIDEO);
  video.size(550, 500);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("PoseNet Is Initialized");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    noseX = results[0].pose.nose.x - 14;
    noseY = results[0].pose.nose.y - 8;
    console.log("nose x =" + results[0].pose.nose.x);
    console.log("nose y =" + results[0].pose.nose.y);
    left_WristX = results[0].pose.leftWrist.x;
    right_WristX = results[0].pose.rightWrist.x;
    difference = floor(left_WristX - right_WristX);
    console.log(
      "leftWrist x =" +
        left_WristX +
        "rightWrist x = " +
        right_WristX +
        "difference = " +
        difference
    );
  }
}

function draw() {
  background("gray");
  document.getElementById("square_side").innerHTML =
    "width and height od the square will be =  " + difference + "px";
  fill("green");
  stroke("white");
  square(noseX, noseY, difference);
}
