export type ID = number;
export type FlatValType =
  | {
    type: 'object';
    value: Array<{ key: ID; value: ID }>;
  }
  | {
    type: 'array';
    value: Array<ID>;
  }
  | {
    type: 'error';
    value: {
      name: string;
      message: string;
      stack?: string;
    };
  }
  | { type: 'undefined'; value: '' }
  | { type: 'string'; value: string }
  | { type: 'number'; value: number }
  | { type: 'boolean'; value: boolean }
  | { type: 'null', value: "" }
// Root element has ID of 0
export type Heap = Record<ID, FlatValType>
type FlatValResponse = { result: Heap };

export type SubmitCodeResponse = {
  status: "success" 
  result: Heap;
} | {
  "status": "error"
  result: { statusCode: number, statusText: string }
  }
const API = 'https://flatval.talora.repl.co'

export const submitCode = async (code: string, contextId: string | number): Promise<SubmitCodeResponse> => fetch(API, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    code, contextId
  })
}).then(async (res):Promise<SubmitCodeResponse> => {
  if(!res.ok) return {
    status: "error",
    result: { 
      statusCode: res.status, 
      statusText: res.statusText 
      }
  }
  return {
    status: "success",
    result: await res.json().then((json:FlatValResponse) => json.result)
  }
  
  })