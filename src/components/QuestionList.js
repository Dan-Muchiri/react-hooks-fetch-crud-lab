
import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectAnswer }) {
  if (!questions || !Array.isArray(questions)) {
    return <p>No questions available.</p>;
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={onDeleteQuestion}
            onUpdateCorrectAnswer={onUpdateCorrectAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
