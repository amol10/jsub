var input1 = "| Test |    1234 456456 erd  |"
var regex_t4 = /\|\s+(.*?)\s+\|\s+(.*?)\s+\|/gm;
var output_text = input1.replace(regex_t4, "| $1 | $2 |");

console.log(output_text);



const regex = /\|\s+(.*?)\s+\|\s+(.*?)\s+\|/gm;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('\\|\\s+(.*?)\\s+\\|\\s+(.*?)\\s+\\|', 'gm')

const str = `| test |     123123 234234 |`;
const subst = `| $1 | $2 |`;

// The substituted value will be contained in the result variable
const result = str.replace(regex, subst);

console.log('Substitution result: ', result);
