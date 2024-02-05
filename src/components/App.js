
import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setPage("List");
  };

  const handleDeleteQuestion = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== questionId));
        } else {
          console.error("Error deleting question from the server");
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleUpdateCorrectAnswer = (questionId, correctIndex) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: correctIndex,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
              question.id === questionId ? { ...question, correctIndex: correctIndex } : question
            )
          );
        } else {
          console.error("Error updating correct answer on the server");
        }
      })
      .catch((error) => console.error("Error updating correct answer:", error));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
