const questionnaire = [
    {
        id: 1,
        text: `What is the output of print str if str = 'Hello World!'?`,
        options: {
            a: "Hello World!",
            b: "Error",
            c: "str",
            d: "None of the Above"
        },
        correctOption: 1
    },
    {
        id: 2,
        text: `Which of the following function convert a string to an int in python?`,
        options: {
            a: "int(x, [,base])",
            b: "long(x, [,base])",
            c: "float(x)",
            d: "str(x)"
        },
        correctOption: 1
    },
    {
        id: 3,
        text: `Which of the following function merges elements in a sequence?`,
        options: {
            a: "isupper()",
            b: "join(seq)",
            c: "len(string)",
            d: "ljust(width[, fillchar])"
        },
        correctOption: 2
    }
]
export default questionnaire;