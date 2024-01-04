// Importing necessary React hooks and components from React and React Bootstrap
import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import './index.css'; // Importing CSS for styling

// DrumPad component representing each individual drum pad
const DrumPad = ({ keyTrigger, id, url, handleDisplay, clipName }) => {
  const audioRef = useRef(null); // Using useRef to reference the audio element

  // useEffect hook to add and clean up event listeners
  useEffect(() => {
    // Function to handle key press events
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === keyTrigger) {
        playSound(); // Play sound if the pressed key matches the drum pad
      }
    };

    // Function to play the drum sound
    const playSound = () => {
      audioRef.current.currentTime = 0; // Reset audio to start
      audioRef.current.play(); // Play the audio
      handleDisplay(clipName); // Update the display with the clip name
    };

    // Adding the keydown event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [keyTrigger, clipName, handleDisplay]); // Dependencies for useEffect

  // Function to play sound (used on button click)
  const playSound = () => {
    audioRef.current.currentTime = 0; // Reset audio to start
    audioRef.current.play(); // Play the audio
    handleDisplay(clipName); // Update the display with the clip name
  };

  // Rendering the drum pad as a button
  return (
    <Col xs={4} className="mb-3">
      <Button id={id} className="drum-pad w-100 shadow btn-light" onClick={playSound}>
        {keyTrigger} {/* Display the key trigger on the button */}
        <audio id={keyTrigger} className="clip" src={url} ref={audioRef}></audio> {/* Audio element */}
      </Button>
    </Col>
  );
};

// DrumMachine component representing the entire drum machine
const DrumMachine = () => {
  const [currentSound, setCurrentSound] = useState(''); // State to track the current sound

  // Function to update the current sound
  const handleDisplay = (clipName) => {
    setCurrentSound(clipName);
  };

  // Data for each drum pad
  const drumPads = [
    // Array of objects representing each drum pad with its properties
    // ...
  ];

  // Rendering the drum machine
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-3 double-border">
        <Card.Title className="text-center musical-font">DRUM MACHINE</Card.Title>
        <div id="drum-machine">
          <Row>
            {/* Mapping each drum pad data to a DrumPad component */}
            {drumPads.map((drumPad) => (
              <DrumPad
                key={drumPad.id}
                // Passing props to DrumPad component
                // ...
              />
            ))}
          </Row>
          <h2 id="display" className="text-center mt-3">{currentSound}</h2> {/* Displaying the current sound */}
        </div>
      </Card>
    </Container>
  );
};

export default DrumMachine; // Exporting the DrumMachine component
