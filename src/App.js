import React, {useState} from 'react';
import './App.css';
import * as Tone from 'tone';
import axios from 'axios';

const playTone = () => {
  const synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease('C4', '8n');
}

const Reddit = () => {
  const [posts, setPosts] = useState([]);

  // API call using axios
  React.useEffect(() => {
    axios.get('https://www.reddit.com/r/reactjs.json')
      .then(res => {
        const newPosts = res.data.data.children
          .map(obj => obj.data);

        setPosts(newPosts);
      });
  }, []);

  return (
    <div>
      <h1>r/reactjs</h1>

      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

    </div>
  );
}

const App = () => {
  return (
    <div>
      <Reddit />
    </div>
  )
}

export default App;