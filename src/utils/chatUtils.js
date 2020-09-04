export const BOT_MESSAGES = {
    INTRO: () => [{message: `Hi, I’m Maya! Today you’re going to help me to ace my game.`}, {message: `Let’s start by telling me your name`}], // V
    NICE_TO_MEET: name => [{message: `Nice to meet you ${name}!`}],
    NICE_TO_SEE: name => [ {message: `Nice to see you again ${name}. Let’s pick this up from where we left off`}], 
    DESCRIBE_PROCESS: () => [{message: `Alright, this is how it’s going to work`}, {message: `List any mathematical expression you can think of - I’ll crunch it in no time`}], 
    BOT_FEEDBACK: () => [{message: `This was easy, give me something harder ;)`}]
}

export const calculateMathExpression = (expression = '') => {

    const numbers = expression.match(/\d+/g)?.map(num => parseInt(num)) || []
    const operators = expression.replace(/[0-9]/g, '').replace(/ /g,'').split('') || []

    let currNum = numbers.shift()

    return numbers.reduce((total, curr) => {
        const currOpertor = operators.shift()
        const currOpertorFunc = opertorFuncMapper[currOpertor]
        return currOpertorFunc ? currOpertorFunc(total, curr) : total
    }, currNum)
   
}


const opertorFuncMapper = {
    '+': (a, b) => a + b, 
    '-': (a, b) => a - b, 
    '*': (a, b) => a * b, 
    '/': (a, b) => a / b
}