import './App.css';
import { useState } from 'react';

const App = () => {
  const initCardPairs = [
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

  const [cardPairs, setCardPairs] = useState(initCardPairs);
  const [currCard, setCurrCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currStreak, setCurrStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const shuffleCards = () => {
    const shuffled = [...cardPairs].sort(() => Math.random() - (1/2));
    setCardPairs(shuffled);
    setCurrCard(0);
    setShowAnswer(false);
    setFeedback('');
    setUserGuess('');
  };

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
    if (isAnswerCorrect(userGuess, cardPairs[currCard].A)) {
      setFeedback('Correct!');
      setCurrStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > longestStreak) setLongestStreak(newStreak);
        return newStreak;
      });
    } else {
      setFeedback('Incorrect. Please try again!');
      setCurrStreak(0);
    }
  };


  const isAnswerCorrect = (guess, answer) => {
    return guess.toLowerCase() === answer.toLowerCase();
  };

  const { Q, A } = cardPairs[currCard]

  
  return (
    <div className="App">
      <h1>Bill of Rights</h1>
      <h3>Do you remember the first 10 amendments?</h3>
      <h4>Number of cards: {cardPairs.length}</h4>
      <h4>Current Streak: {currStreak}</h4>
      <h4>Longest Streak: {longestStreak}</h4>

      <div className="card-container">
        {cardPairs.length > 0 ? (
          <div className="card" onClick={toggleAnswer}>
            <div className="question">{Q}</div>
            {showAnswer && <div className="answer">{A}</div>}
          </div>
        ) : (
          <div className="card">
            <div className="question"></div>
          </div>
        )}
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
        <button onClick={shuffleCards}>Shuffle Cards</button>
      </div>
    </div>
  );
};

export default App;
