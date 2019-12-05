import React from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001', {  transports: ['websocket'] })

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latency: 0
    };
  }

  componentDidMount() {
    window.addEventListener('click', () => {
      socket.emit('click');
    });

    let startTime;

    setInterval( () => {
      socket.emit('pingServer');
      startTime = Date.now();
    }, 500);

    socket.on('pong', () => {
      const latency = Date.now() - startTime;
      console.log(latency);
      this.setState({ latency });
    });
  }

  render() {
    return(
    <h1>{this.state.latency} ms</h1>
    );
  }
}

export default Game;