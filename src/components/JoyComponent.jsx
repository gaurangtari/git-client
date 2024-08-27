import { useEffect, useState } from "react";
import { Joystick } from "react-joystick-component";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

function JoyComponent() {
  const classes = useStyles();
  const hostedServer = "https://nio-server.onrender.com";
  const localhost = "http://localhost:9090";
  const [joystickData, setJoystickData] = useState({
    surge: 0,
    sway: 0,
    heave: 0,
    yaw: 0,
  });

  useEffect(() => {
    sendDataRedis(joystickData);
  }, [joystickData]);

  //Joystick One
  const handleMove = (joyOneData) => {
    const newData = {
      ...joystickData,
      surge: joyOneData.y,
      sway: joyOneData.x,
    };
    setJoystickData(newData);
  };
  //Joystick Two
  const handleMove2 = (joyTwoData) => {
    const newData = {
      ...joystickData,
      heave: joyTwoData.y,
      yaw: joyTwoData.x,
    };
    setJoystickData(newData);
  };
  //Sending Joystick Data
  const sendDataRedis = async (data) => {
    try {
      await axios.post(`${localhost}/joystick-data`, data);
      console.log("Data Sent");
    } catch (error) {
      console.log(error);
      console.error("Error sending data to Redis:", error);
    }
  };
  // const handleStop = () => {};
  return (
    <>
      {/* <div className="gap-1 columns-2 flex felx-row  justify-between "> */}
      <Container className={classes.container}>
        <div>
          <Joystick
            baseColor="#355764"
            stickColor="#FFEA11"
            size={100}
            move={(e) => {
              handleMove({ x: e.x, y: e.y });
            }}
            stop={() => {
              handleMove({ x: 0, y: 0 });
            }}
          />
        </div>
        <div>
          <Joystick
            baseColor="#355764"
            stickColor="#FFEA11"
            size={100}
            move={(e) => {
              handleMove2({ x: e.x, y: e.y });
            }}
            stop={() => {
              handleMove2({ x: 0, y: 0 });
            }}
          />
        </div>
      </Container>
    </>
  );
}
export default JoyComponent;
