import React, { useEffect, useState } from 'react';
import { Modal } from 'bootstrap'; 

function Nav({ onGenerate }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => setCategories(data.trivia_categories));
  }, []);

  const handleGenerate = () => {
    const url = `https://opentdb.com/api.php?amount=${numQuestions}${selectedCategory ? `&category=${selectedCategory}` : ''}`;
    onGenerate(url);

    const modalElement = document.getElementById('quizModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement); // ✅ Updated line
      modal.hide();
    }
  };

  return (
    <>

        <div className="x-5 py-3 nav-wrap">
            <nav className="navbar navbar-expand-lg d-flex justify-content-between gap-3 px-5">
                <h3 className='logo navbar-brand text-white'>QuizHub</h3>
                <button 
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#quizModal"
                >Get Quiz</button>
            </nav>
        </div>
        {/*Get Quiz Modal*/}
        <div 
          className="modal"
          id="quizModal"
          tabIndex = "-1"
          aria-labelledby="quizModalLabel"
          aria-hidden="true"

        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="quizModalLabel">Select Quiz Settings</h5>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb3">
                            <label className="form-label">Category</label>
                            <select 
                               className="form-select"
                               value={selectedCategory}
                               onChange={e => setSelectedCategory(e.target.value)}
                               >
                                <option value="">-- Select Category --</option>
                                {categories.map(cat =>(
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                               </select>
                        </div>
                        <div className="mb3">
                            <label className="form-label">Number of Questions</label>
                            <input
                              type="number"
                              className="form-control"
                              min="1"
                              max="30"
                              value={numQuestions}
                              onChange={e => setNumQuestions(e.target.value)}
                              />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss='modal'>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleGenerate}>Generate</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}
export default Nav