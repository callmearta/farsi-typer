import React, { useState } from 'react';
import './App.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Editor from './components/editor';
import Speech from './components/speech';

function App() {
  const [text, setText] = useState('');
  const prevArticles = localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : [];

  const handleSaveButton = () => {
    localStorage.setItem('articles', JSON.stringify(prevArticles.concat([text])));
    toast.success('نوشته با موفقیت در دستگاه شما ذخیره شد.', { autoClose: true });
    setText('');
  };

  const handlePrevArticle = article => {
    setText(article);
  };

  return (
    <div className="App">
      <h1>فارسی تایپر</h1>
      <h2>تو بگو من می‌نویسم، سرویس تبدیل گفتار به نوشتار فارسی</h2>
      <Speech text={text} setText={setText} />
      <Editor text={text} setText={setText} />
      <div className="d-flex align-items-center justify-content-end">
        <button className="btn-dark font-weight-bold" onClick={handleSaveButton}>ذخیره</button>
      </div>
      <p className="font-weight-bold">دستور‌های کمکی:</p>
      <div className="d-flex align-items-center justify-content-start help-commands">
        <p>پاک کن پاک کن - <b>پاک‌کردن کل متن</b></p>
        <p>ویرگول ویرگول</p>
        <p>نقطه نقطه</p>
        <p>برو خط بعد</p>
      </div>
      {prevArticles.length ?
        <React.Fragment>
          <h3 className="text-right">نوشته‌های گذشته</h3>
          {prevArticles.map((article, i) =>
            <div className="prev-article" key={i} dangerouslySetInnerHTML={{ __html: article }} onClick={() => handlePrevArticle(article)}></div>
          )}
        </React.Fragment>
        : ''}
      <ToastContainer />
    </div>
  );
}

export default App;
