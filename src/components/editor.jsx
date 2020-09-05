import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor(props) {
    const { text, setText } = props;
    const modules = {
        'syntax': false,
        'toolbar': [
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['direction', { 'align': [] }],
            ['formula'],
            ['clean']
        ]
    };

    return (
        <div id="editor">
            <ReactQuill modules={modules} theme="snow" value={text} onChange={setText} />
        </div>
    );
}

export default Editor;