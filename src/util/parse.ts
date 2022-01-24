import type { FlatValType,Heap } from "../service/submitCode";


export const parse = (
  input: Heap, _curr: FlatValType|null = null):any => {
  const current = _curr || input["0"];

  switch(current.type) {
    case "object":
    
      return Object.fromEntries(current.value.map(
        ({key,value}) => [
          parse(input, input[key])
          , parse(
          input, input[value]
        )]
      ))
    case "array":
      return current.value.map(
        item => parse(
          input, input[item]
        )
      )
    case "error":
      return new Error(current.value.message)
    case "undefined":
      return undefined;
    case "null":
      return null;
    // primitive
    case "boolean":
    case "string":
    case "number":
      return current.value;
    default: 
      const exhaustiveCheck: never = current;
      throw new Error("this shouldn't happen")

  }
}