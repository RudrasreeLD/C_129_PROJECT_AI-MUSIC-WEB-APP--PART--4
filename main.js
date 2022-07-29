ON_MY_WAY_song="";
THE_SPECTRE_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
song_name = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    THE_SCEPTRE_song = loadSound("ON MY WAY.mp3");
    ON_MY_WAY_song = loadSound("THE SPECTRE.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("red");
    stroke("red");

    song_name = THE_SCEPTRE_song.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        ON_MY_WAY_song.stop();
        if(song_name == false){
            THE_SCEPTRE_song.play();
        }
        else{
            console.log("Song Name: THE SPECTRE");
            document.getElementById("song_id").innerHTML = "Song Name: ON MY WAY";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}