import React, { useState, useRef, useEffect } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function Speech(props) {
    const { text, setText } = props;

    const [available, setAvailable] = useState(true);
    const [listening, setListening] = useState(false);
    const [preview, setPreview] = useState('');
    const [localText, setLocalText] = useState('');
    const recognition = useRef(new SpeechRecognition());

    if (typeof SpeechRecognition === "undefined") {
        setAvailable(false);
    } else {
        recognition.current.lang = "fa-IR";
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
    }

    const handleMicClick = () => {
        if (!listening) {
            recognition.current.start();
            recognition.current.onresult = handleResult;
            setPreview('سخن بگویید...');
        } else {
            recognition.current.stop();
            setPreview('');
        }
        setListening(!listening);
    };

    const handleResult = event => {
        const last = event.results.length - 1;
        const res = event.results[last];
        const newText = res[0].transcript;

        if (res.isFinal) {
            if (newText.includes('پاک کن پاک کن')) {
                setLocalText(null);
            } else {
                setLocalText(newText.replace('ویرگول ویرگول', '،').replace('برو خط بعد', '\n').replace('نقطه نقطه', '.'));
            }
        } else {
            setPreview(newText);
        }
    };

    useEffect(() => {
        if (localText == null) {
            setText('');
            setLocalText('');
        } else {
            setText(text + ' ' + localText);
        }
    }, [localText]);

    return (
        available ?
            <React.Fragment>
                <div className={`mic ${listening ? 'active' : ''}`} onClick={handleMicClick}>
                    <i className="far fa-microphone"></i>
                </div>
                <p style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '2rem' }}>{preview}</p>
            </React.Fragment>
            :
            <p>برای استفاده از ویژگی تایپ صوتی از مرورگر کروم نسخه جدید استفاده نمایید.</p>
    );
}

export default Speech;