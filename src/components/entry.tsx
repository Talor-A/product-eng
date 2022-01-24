import React from 'react';
import {parse} from '../util/parse.ts'

import { SubmitCodeResponse } from '../service/submitCode'
export interface EntryProps {
  input: string;
  result: SubmitCodeResponse
}

export const Entry = ({ input, result }: EntryProps) => {
  return (
    <div>
      <hr />
      <code>{"> "}{input}</code>
      <Result {...result} />
    </div>
  )
}
export const Result = (props: SubmitCodeResponse) => {
  if(props.status === "success") return (
    <pre style={{color:'green'}}>
        <code>
          {JSON.stringify(parse(props.result), null, 2)}
        </code>
      </pre>
  )
  return (<pre style={{color: 'red'}}>
        <code>
          {"An error occured. try again?"}
        </code>
      </pre>)
}

