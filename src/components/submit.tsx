import React, { useState } from 'react';

export interface SubmitProps {
  onSubmit: (code:string) => void
}

export const Submit = ({ onSubmit }:SubmitProps) => {
  const [val, setVal] = useState('');

  return (
    <form onSubmit={
      (e) => {
        e.preventDefault();
        onSubmit(val)
        setVal('')
      }
    }>
    <input autofocus value={val} onChange={e => setVal(e.target.value)} 
    style={{ margin: 8 }}
    />
    <button type="submit">Submit</button>
    </form>
  )
}
