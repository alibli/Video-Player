import './App.css';
import { Component } from 'react';
import VideoPlayerComponent from './UI/PlayerComponents/VideoPlayerComponent';

class App extends Component {
  render() {
    return (
      <>
        <div className="app">
          <VideoPlayerComponent />
        </div>
      </>
    ); 
  } 
}

export default App;
