import React, { useContext } from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";

import { SocketContext } from "../Context";
import JoyComponent from "./JoyComponent";
import { Gif } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
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
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%"
  },
  joystickContainer: {
    position: "absolute",
    top: "60%",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    pointerEvents: "auto",
  }
}));

const VideoPlayer = () => {
  const { callAccepted, userVideo, callEnded } = useContext(SocketContext);
  const classes = useStyles();

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
            >
            </video>
            <Grid item xs={12} md={12} className={classes.joystickContainer}>
            <JoyComponent/>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
