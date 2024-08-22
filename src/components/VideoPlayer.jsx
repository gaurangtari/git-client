import React, { useContext } from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const VideoPlayer = () => {
  const { callAccepted, userVideo, callEnded } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {/* {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )} */}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          {console.log(userVideo)}
          <Grid item xs={12} md={6}>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
