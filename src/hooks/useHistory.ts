import { useState, useRef, useCallback, useEffect } from 'react';
import { SubmitCodeResponse, submitCode } from '../service/submitCode'

type History = [string, SubmitCodeResponse][]

const randomContext = () => Math.floor(Math.random() * 1000)

export const useCodeHistory = () => {
  const contextId = useRef<number>(randomContext())

  // better to use a real async state mgmt tool for this 
  const [isLoading, setLoading] = useState<boolean>(false)
  const [history, setHistory] = useState<History>([])

  useEffect(() => {
    console.log(history)
  }, [history])
  
  const addHistory = useCallback(
    // post to API
    (code) =>  {
      if(isLoading) return;
      setLoading(true)
      return submitCode(code, contextId.current)
    .then(val => {
      setLoading(false)
      setHistory([
      // append our current response to history
      ...history,
      [code, val], 
      ])
    }
    )},
    // 
     [ history, setHistory, isLoading ])

  return { history, addHistory, isLoading, contextId: contextId.current }
}
const statements = [
    `let a = 42`,
    `let myList = [0, "hello world", a]`,
    `let myObj = { foo: "bar", myList: myList }`
  ].join(';')

