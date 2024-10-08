import './App.css';
import { useState } from 'react';

const App = () => {
  const cardPairs = [
    { Q: "Freedom of Religion, Speech, Press, Assembly, and Petition", A: "Amendment 1", },
    { Q: "Right to bear arms", A: "Amendment 2"},
    { Q: "Restrict Quartering of soldiers", A: "Amendment 3"},
    { Q: "Prohibit Search and Seizures", A: "Amendment 4" },
    { Q: "Right to Due Process", A: "Amendment 5"},
    { Q: "Right to Speedy Trial", A: "Amendment 6"},
    { Q: "Right to a Jury",  A: "Amendment 7"},
    { Q: "Prohibit Excessive Fines and Cruel and Unusual Punishment", A: "Amendment 8"},
    { Q: "Rights not in the Constitution are retained by the People", A: "Amendment 9"},
    { Q: "Federal Govt only has powers through Constitution; all other powers for the states", A: "Amendment 10"},
  ];

  const [currCard, setCurrCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  const showCard = (direction) => {
    let newCardIdx = currCard;
    if (direction === 'next') {
      newCardIdx = (currCard + 1) % cardPairs.length;
    } else if (direction === 'prev') {
      newCardIdx = (currCard - 1 + cardPairs.length) % cardPairs.length;
    }
    setCurrCard(newCardIdx);
    setShowAnswer(false);
    setFeedback('');
    setUserGuess('');
  };

  const toggleAnswer = () => {
    setShowAnswer(prevState => !prevState);
  };

  const handleGuess = () => {
    if (userGuess.toLowerCase() === cardPairs[currCard].A.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect. Try again!');
    }
  };

  const { Q, A } = cardPairs[currCard];

  return (
    <div className="App">
      <h1>Bill of Rights</h1>
      <h3>Do you remember the first 10 amendments?</h3>
      <h4>Number of cards: 10</h4>

      <div className="card-container">
        <div className="card" onClick={toggleAnswer}>
          <div className="question"><strong>{Q}</strong></div>
          {showAnswer && <div className="answer">{A}</div>}
        </div>
      </div>

      <div className="input-container">
        <input 
          type="text" 
          value={userGuess} 
          onChange={(e) => setUserGuess(e.target.value)} 
          placeholder="Enter your guess" 
        />
        <button onClick={handleGuess}>Submit</button>
        {feedback && <div className="feedback">{feedback}</div>}
      </div>

      <div className="navigation">
        <button onClick={() => showCard('prev')}>Back</button>
        <button onClick={() => showCard('next')}>Next</button>
      </div>
    </div>
  );
};

export default App;
