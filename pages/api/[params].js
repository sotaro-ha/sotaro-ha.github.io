import { readFileSync } from 'fs';
import path from 'path';
//create data set
let data = [];
let name = [];
for (let i = 0; i < 1; i++) {
  const file = path.join(process.cwd(), "public", "data.txt");
  data = data.concat(readFileSync(file, "utf-8").split("\n"));
}
function refineData(data) {
  [...Array(data.length)].map((_, i) => data[i] = data[i].split(" "));
  [...Array(data.length)].map((_, i) => name.push(data[i][0]));
  [...Array(data.length)].map((_, i) => data[i].shift());
  [...Array(data.length)].map((_, i) => data[i] = data[i].map(str => parseFloat(str)));
  return data
}
data = refineData(data)
export default function handler(req, res) {
  const { params } = req.query
  if (params === "word2vec") {
    res.status(200).json({ vector: [name[Math.floor(Math.random() * name.length)], name[Math.floor(Math.random() * name.length)]] })
  } else if (params === "exist") {
    res.status(200).json({ bool: name.includes(req.body["key"]) });
  } else if (params === "answer") {
    const word1 = req.body["word1"]
    const word2 = req.body["word2"]
    let min = [10000000, 0]
    let distance = 0;
    const word1Index = name.indexOf(word1);
    const word2Index = name.indexOf(word2);
    const vector1 = data[word1Index];
    const vector2 = data[word2Index];
    const vector3 = Array(vector1.length);
    [...Array(vector1.length)].map((_, i) => vector3[i] = vector1[i] - vector2[i]);
    [...Array(data.length - 1)].map((_, i) => {
      distance = 0;
      [...Array(vector3.length - 1)].map((_, j) => {
        distance += (vector3[j] - data[i][j]) * (vector3[j] - data[i][j]);
      }
      )
      if (distance < min[0] && i !== word1Index && i != word2Index) {
        min = [distance, i]
      }
      
    })
    res.status(200).json({ answer: name[min[1]] });
  }
}
