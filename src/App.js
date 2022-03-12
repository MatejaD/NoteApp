import React, {useState,useEffect} from 'react'
import { FiDelete, FiSun } from 'react-icons/fi'
import { BsMoonStars} from 'react-icons/bs'



function App() {
  const [modulOn,setModulOn] = useState(false)
  const [darkModeOn,setDarkModeOn] = useState(()=>{
    const saved = localStorage.getItem('mode')
    if(saved !== undefined || null){
    const initalValue = JSON.parse(saved)
      return initalValue
    }
    else{
      return true
    }
  })
  const [inputValue,setInputValue] = useState('')
  const [textareaValue,setTextareaValue] = useState('')
  const [id, setId] = useState(() => {
    const saved = localStorage.getItem('ID')
    if (typeof saved !== undefined || null) {
      const initalValue = JSON.parse(saved)
      return initalValue
    }
    else {
      return 0
    }
  })

//  Storing notes in local storage
  let data = JSON.parse(localStorage.getItem(`${id}`))
  let [info,] = useState(data)
  
// Remove single note 
  const removeNote = (id2) => {
    const newNotes = notes.filter((note) => note[1] !== id2)
    setNotes(newNotes)
    if(newNotes[1] !== id2){
      localStorage.removeItem(`${id2}`)
    }
  }
  
let [notes, setNotes] = useState(() => {
  if (info) {
    return info
  }
  else {
    return []
  }})
  
// Create a new note
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log("submited!")
    setModulOn(false)
    setId(id + 1)
   
    let newItem = {
      title: inputValue,
      text: textareaValue,
      // id: id,
    }

    notes.push([newItem, id])
    localStorage.setItem(`${id}`, JSON.stringify(notes))

    setInputValue('')
    setTextareaValue('')
  }

 
  let date =new Date().getDate().toLocaleString()
  let day = new Date().getDay().toLocaleString()
  let year = new Date().getFullYear().toString()

  useEffect(()=>{
      localStorage.setItem('ID', JSON.stringify(id))
  },[id])

  useEffect(()=>{
    localStorage.setItem('mode', darkModeOn)
  },[darkModeOn])

  return (
    <main style={{ backgroundColor:`${darkModeOn ? "#141411" :"#f8f6cf"}`}} className={`${modulOn ? 'background-dim modul-background' : ''}`}>
      {/* Dark/Light mode button */}
      {notes.length?
       <button className='remove-all' onClick={()=> setNotes(null)}>Remove Notes</button>: null
      }
      <button className={`${darkModeOn? 'dark-mode' : 'light-mode'}`} onClick={()=> setDarkModeOn(!darkModeOn)}>{darkModeOn?<BsMoonStars/>:<FiSun/>}</button>
      <form className={`${modulOn ? 'modul' : 'modul hide-modul'}`} onSubmit={handleSubmit}>
        <div className="title">
          <input maxLength='16' type="text"placeholder='Title' onChange={(e)=>setInputValue(e.target.value)} value={inputValue} className='title-input' />
        </div>
        <div className='text'>
          <textarea maxLength='175' onChange={(e) => setTextareaValue(e.target.value)} value={textareaValue}name="text" id="" cols="50" rows="10" className='text-input'></textarea>
        </div>
        <br />
        <button type='submit' className='submit-btn'>Submit</button>
        <h4 className='date'>{`${day}/${date}/${year}`}</h4>
      </form>
      <div>
        <button className='create-btn' onClick={()=> setModulOn(!modulOn)}>Create A New Note</button>
      </div>
      <section className='section'>
        {notes.map((note)=>{
          return <div className="note" key={note[1]}>
            <div className="cover">
            <h1>{note[0].title}</h1>
              <span>{`${day}/${date}/${year}`}</span>

            </div>
            <p className='notes-text'>{note[0].text}
            </p>
            <button className='remove-note' onClick={()=>{removeNote(note[1])}}><FiDelete/></button>
          </div>
        })}
      </section>
    </main>
  );
}

export default App;
