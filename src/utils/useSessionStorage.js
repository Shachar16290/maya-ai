import { useState } from 'react'
 
 const useSessionStorage = (key, initialValue) => {
    // State to store the value
    const [storedValue, setStoredValue] = useState(() => {
        const item = sessionStorage.getItem(key)
       
        return item || initialValue
    })
  
    const setValue = value => {
        setStoredValue(value)
        sessionStorage.setItem(key, value)
    };
  
    return [storedValue, setValue]
  }

  export default useSessionStorage