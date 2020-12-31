const questionnaire = [
    {
        id: 1,
        text: `What is the output of print str if str = 'Hello World!'?`,
        options: {
            1: "Hello World!",
            2: "Error",
            3: "str",
            4: "None of the Above"
        },
        correctOption: 1
    },
    {
        id: 2,
        text: `Which of the following function convert a string to an int in python?`,
        options: {
            1: "int(x, [,base])",
            2: "long(x, [,base])",
            3: "float(x)",
            4: "str(x)"
        },
        correctOption: 1
    },
    {
        id: 3,
        text: `Which of the following function merges elements in a sequence?`,
        options: {
            1: "isupper()",
            2: "join(seq)",
            3: "len(string)",
            4: "ljust(width[, fillchar])"
        },
        correctOption: 2
    }
]
export default questionnaire;