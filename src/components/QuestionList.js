import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ quiz, setQuiz }) {
  const onDeleteQuestion = (deletedQuestion) => {
    const updatedQuestionList = quiz.filter((q) => q.id !== deletedQuestion.id);
    setQuiz(updatedQuestionList);
  };

  const onCorrectIndexChange = (id, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => {
        if (!r.ok) {
          alert("failed");
          return;
        } else {
          return r.json().then((newUpdatedQuestionObj) => {
            setQuiz(
              quiz.map((question) =>
                question.id === id ? newUpdatedQuestionObj : question
              )
            );
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const mappedQuiz = quiz?.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDeleteQuestion={onDeleteQuestion}
      onCorrectIndexChange={onCorrectIndexChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{mappedQuiz}</ul>
    </section>
  );
}

export default QuestionList;
