import React, { useContext } from "react";
import { Button, Grid, Paper, makeStyles } from "@material-ui/core";
import ReactPlayer from "react-player";
import { SocketContext } from "../Context";
import JoyComponent from "./JoyComponent";
import { io } from "socket.io-client";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "800px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "100%",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "5px",
    margin: "10px",

    // [theme.breakpoints.down("md")]: {
    //   width: "100%",
    // },
  },
  videoContainer: {
    position: "relative",
    width: "100",
    height: "100%",
  },
  joystickContainer: {
    alignItems: "center",
    position: "absolute",
    top: "25%",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    pointerEvents: "auto",
  },
  inputButtonContainer: {
    justifyContent: "center",
  },
  inputButton: {
    margin: 5,
    marginTop: 20,
    backgroundColor: "#5faaed",
    color: "#FFFFFF",
    fontWeight: "bold",
  },
}));

const VideoPlayer = () => {
  const { callAccepted, userVideo, callEnded } = useContext(SocketContext);
  const classes = useStyles();

  const { SERVER } = useContext(SocketContext);
  const socket = io(SERVER);

  const inputButtonHandler = async (value) => {
    try {
      await axios.post(`${SERVER}/non-joy-input`, { value });
    } catch (error) {
      console.log(error);
      console.error("Error sending data to Redis:", error);
    }
  };

  return (
    <Grid container className={classes.gridContainer}>
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          {console.log(userVideo)}
          <Grid item xs={12} md={6} className={classes.videoContainer}>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            ></video>
            <Grid item xs={12} md={12} className={classes.joystickContainer}>
              <JoyComponent />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} className={classes.inputButtonContainer}>
            <Button
              variant="contained"
              className={classes.inputButton}
              onClick={() => {
                inputButtonHandler("UP");
              }}
              value="up"
            >
              Move Up
            </Button>
            <Button
              variant="contained"
              className={classes.inputButton}
              onClick={() => {
                inputButtonHandler("DOWN");
              }}
            >
              Move Down
            </Button>
            <Button
              variant="contained"
              className={classes.inputButton}
              onClick={() => {
                inputButtonHandler("LEFT");
              }}
            >
              Move Left
            </Button>
            <Button
              variant="contained"
              className={classes.inputButton}
              onClick={() => {
                inputButtonHandler("RIGHT");
              }}
            >
              Move Right
            </Button>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
