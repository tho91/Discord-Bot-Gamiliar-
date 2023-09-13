const fs = require("fs");
const PATH = "./t.json";


const x = {
    "1": {
        "name": 1
    },
    "2": {
        "name": 2
    },
    "3": {
        "name": 3
    },
    "4": {
        "name": 4
    },
    "5": {
        "name": 5
    },
}



for (const d in x)
    console.log(d);