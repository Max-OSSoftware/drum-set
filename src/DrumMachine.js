import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import './index.css';

const DrumPad = ({ keyTrigger, id, url, handleDisplay, clipName }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === keyTrigger) {
        playSound();
      }
    };

    const playSound = () => {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      handleDisplay(clipName);
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [keyTrigger, clipName, handleDisplay]);

  const playSound = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    handleDisplay(clipName);
  };

  return (
    <Col xs={4} className="mb-3">
      <Button id={id} className="drum-pad w-100 shadow btn-dark" onClick={playSound}>
        {keyTrigger}
        <audio id={keyTrigger} className="clip" src={url} ref={audioRef}></audio>
      </Button>
    </Col>
  );
};

const DrumMachine = () => {
  const [currentSound, setCurrentSound] = useState('');

  const handleDisplay = (clipName) => {
    setCurrentSound(clipName);
  };

  const drumPads = [
    { keyTrigger: 'Q', id: 'drum1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', clipName: 'Heater 1'},
    { keyTrigger: 'W', id: 'drum2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', clipName: 'Heater 2' },
    { keyTrigger: 'E', id: 'drum3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', clipName: 'Heater 3' },
    { keyTrigger: 'A', id: 'drum4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', clipName: 'Heater 4' },
    { keyTrigger: 'S', id: 'drum5', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', clipName: 'Clap' },
    { keyTrigger: 'D', id: 'drum6', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', clipName: 'Open-HH' },
    { keyTrigger: 'Z', id: 'drum7', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', clipName: "Kick-n'-Hat" },
    { keyTrigger: 'X', id: 'drum8', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', clipName: 'Kick' },
    { keyTrigger: 'C', id: 'drum9', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', clipName: 'Closed-HH' },
  ];

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-3 double-border">
        <Card.Title className="text-center musical-font">DRUM MACHINE</Card.Title>
        <div id="drum-machine">
          <Row>
            {drumPads.map((drumPad) => (
              <DrumPad
                key={drumPad.id}
                keyTrigger={drumPad.keyTrigger}
                id={drumPad.id}
                url={drumPad.url}
                clipName={drumPad.clipName}
                handleDisplay={handleDisplay}
              />
            ))}
          </Row>
          <h2 id="display" className="text-center mt-3">{currentSound}</h2>
        </div>
      </Card>
    </Container>
  );
};

export default DrumMachine;