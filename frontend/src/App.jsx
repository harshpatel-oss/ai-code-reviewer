import { useState , useEffect } from 'react'
import './App.css'
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from 'prismjs';
import axios from 'axios';
import  Markdown from 'react-markdown'
function App() {
  const [count, setCount] = useState(0)
  const [code,setCode]=useState(`function sum(){
    return 1+1;
    }`)
    const [review , setReview] = useState("");
  useEffect(() => {
    prism.highlightAll();
  })
  const url = "https://ai-code-reviewer-backend-s3hg.onrender.com";
  async function reviewCode(){
    const response = await axios.post(`${url}/ai/get-review`,{code});
    // backend returns { response: ... }
    setReview(response.data.response);
    console.log(response.data);
  }
  return (
    <>
      <main>
        <div className='left'>
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: '1px solid #ddd',
                height: '100%',
                width: '100%',
                borderRadius: '5px',
              }}
            />
          </div>
          <div 
          onClick={reviewCode}
          className="review">Review</div>
        </div>
        <div className='right'>
          <Markdown>
          {typeof review === 'object' && review !== null ? (
            <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(review, null, 2)}</pre>
          ) : (
            review
          )}

          </Markdown>
        </div>
      </main>
    </>
  )
}

export default App
