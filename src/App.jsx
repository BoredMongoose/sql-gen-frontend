import styles from './index.module.css'
import sqlLogo from './assets/sql-server.png'
import { useState } from 'react'
import generate from '../Server/generate' 


function App() {

  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const sqlQuery = await generateQuery()
    setResponse(sqlQuery)
    console.log("returned from server:", sqlQuery)


  };

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    })
    const data = await response.json()
    return data
  }


  return (
    <main className={styles.main}>
      <img src={sqlLogo} alt="g" className={styles.icon} />
      <h3>Generate SQL with AI</h3>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="query-description"
          placeholder='Describe your query'
          onChange={(e) => setQuery(e.target.value)}/> 

        <input type="submit" value="Generate Query"/> 

        <pre>{response.response}</pre>        
      </form>
    </main>

  )
}

export default App
