import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    (() => {
      fetch("http://localhost:4000/questions")
        .then((r) => {
          if (!r.ok) {
            throw new Error("The json server is not running");
          }
          return r.json();
        })
        .then(setQuiz);
    })();
  }, []);

  const onAddNewQuestion = (newForm) => {
    setQuiz([...quiz, newForm]);
  };



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddNewQuestion={onAddNewQuestion} />
      ) : (
        <QuestionList
          quiz={quiz}
          setQuiz={setQuiz}
        />
      )}
    </main>
  );
}

export default App;
