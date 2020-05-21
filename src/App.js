import React from 'react';
import './App.css';

const MediaCard = ({title, body, imageUrl}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{body}</p>
      <img src={imageUrl} alt="test" />
    </div>
  );
}

const Hi = ({firstName, lastName}) => {
  return (
    <div className="Main">
      <h1>This is a test.</h1>
      <h2>I don't remember HTML tags lmao</h2>
      <p>Saying hello to {firstName} {lastName}.</p>
    </div>
  );
}

const Gate = ({isOpen}) => {
  const display = isOpen ? 'open' : 'closed';
  return (
    <p>{display}</p>
  )
}

const paragraph = 'this is my paragraph :)';
const bodyText = 'this is the body text! uwu';

const Everything = () => {
  return (
    <>
      <MediaCard
        title={paragraph}
        body={<strong>{bodyText}</strong>}
        imageUrl="https://m.media-amazon.com/images/I/4141ztFVb3L._SS500_.jpg"
      />
      <Hi
        firstName="hi"
        lastName="bye"
      />
      <Gate isOpen={true} />
    </>
  )
}

export default Everything;
