import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ quiz, setQuiz }) {
  const onDeleteQuestion = (deletedQuestion) => {
    const updatedQuestionList = quiz.filter((q) => q.id !== deletedQuestion.id);
    setQuiz(updatedQuestionList);
  };

  const mappedQuiz = quiz.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      setQuiz={setQuiz}
      onDeleteQuestion={onDeleteQuestion}
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
