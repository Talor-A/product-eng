import * as React from 'react'
import { Submit } from './components/submit'
import { Entry } from './components/entry'

import {useCodeHistory} from './hooks/useHistory'

export default function App() {
  const {history, addHistory, contextId} = useCodeHistory()
  return (
    <main style={{ display: 'flex', flexDirection: 'column' , height: '100%'}}>
      <code>contextId: {contextId}</code>
      <div style={{flex: 1, overflowY: 'auto'}}>
        {
          history.map(
            ([input, response]) => 
            <Entry input={input} result={response} />
          )
        }
      </div>
      <Submit onSubmit={addHistory} />
    </main>
  )
}
