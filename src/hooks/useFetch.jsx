import { useEffect, useState } from 'react'
const baseURL = process.env.REACT_APP_BASE_URL;

const useFetch = (url)=>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
        
          const response = url !== undefined ?await fetch(`${baseURL}${url}` ):  await fetch(`${baseURL}` )
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return { data, loading, error };

}

export default useFetch
