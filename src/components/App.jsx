
import React, { useState, useEffect } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notifications';

const App = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  useEffect(() => {
    // Logica pentru useEffect - de exemplu, poți face ceva când componenta este montată
    console.log('Componenta App a fost montată.');

    // Cleanup logic (optional) - se va executa când componenta este demontată
    return () => {
      console.log('Componenta App a fost demontată.');
    };
  }, []); // [] indică că efectul trebuie să fie apelat doar la montare și demontare

  const options = Object.keys(state);

  const onLeaveFeedback = option => {
    setState(prevState => ({ ...prevState, [option]: prevState[option] + 1 }));
  };

  const totalFeedback = Object.values(state).reduce((acc, value) => acc + value, 0);

  const positivePercentage = totalFeedback === 0 ? 0 : Math.round((state.good / totalFeedback) * 100);

  return (
    <div>
      <Section title="Leave Feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      <Section title="Statistics">
        {totalFeedback === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
};

export default App;
