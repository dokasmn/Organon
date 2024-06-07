import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [data, setData] = useState<[{title:String, body:String}]>([{"title":"", "body":""}])

  useEffect(() => {
    async function fetchData(){
      try {
        const response = await fetch(`${
          import.meta.env.VITE_API_URL
        }`)

        if(!response.ok){
          throw new Error('network response was not ok')
        }

        const result = await response.json();
        console.log(result);
        setData(result);
      }catch(error){
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [])

  return (
    <>
      <p>{data[0].title}</p>
      <p>{data[0].body}</p>
    </>
  )
}

export default App
