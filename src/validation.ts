export interface Status {
  valid: boolean,
  message?: string
}

 type Rule = (value: string) => Status

export const required: Rule = (value: string): Status => {
  const result = Boolean(value)

  return {
    valid: result,
    message: result ? undefined : 'This field is required'
  }
}

/**
 * 
 * @param Options object {min: number, max: number}
 * @returns type Rule
 */
export function length({min,max}: {min: number,max: number}): Rule{
  return function (value: string): Status {
    const result = Boolean(value.length >= min && value.length <= max)
    return {
      valid: result,
      message: result ? undefined : `This field must be between ${min} and ${max}`
    }
  }
}

/**
 * 
 * @param value 
 * @param rules 
 * @returns true if all rules passed, else it returns the status for the first rule that matched an error
 */
export function validate (value: string, rules: Rule[]): Status {

  for(const rule of rules){ 
    const result = rule(value)
    if(!result.valid){
      return result
    }
  }

  return {
    valid: true
  }
}

console.log(
  validate('', [required]),
  validate('username', [required]),
  validate('username', [length({min:5, max:10})]),
  validate('', [length({min:5, max:10})])

);
