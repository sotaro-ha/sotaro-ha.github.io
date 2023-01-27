// import  data from "/public/data_0"
// import  name from "/public/data_0"

// export function pick(name) {
//     return [name[Math.floor(Math.random() * name.length)], name[Math.floor(Math.random() * name.length)]]
// }

// export function eixst(name,word) {
//     return name.includes(word)
// }

// export default function calc(name,data,word1, word2) {
//     let min = [10000000, 0]
//     let distance = 0;
//     const word1Index = name.indexOf(word1);
//     const word2Index = name.indexOf(word2);
//     const vector1 = data[word1Index];
//     const vector2 = data[word2Index];
//     const vector3 = Array(vector1.length);
//     [...Array(vector1.length)].map((_, i) => vector3[i] = vector1[i] - vector2[i]);
//     [...Array(data.length)].map((_, i) => {
//         distance = 0;
//         [...Array(vector1.length)].map((_, j) => {
//             distance += (vector3[j] - data[i][j]) * (vector3[j] - data[i][j])
//         }
//         )
//         if (distance < min[0] && i != name.indexOf(word1) && i != name.indexOf(word2)) {
//             min = [distance, i]
//         }
//     }
//     )
//     return name[min[1]]
// }
