// Using References (Normalisation) -> CONSISTENCY
let author = {
    name: 'Mosh'
}

let course = {
    author: 'id',
}

// Using Embedded Documents (Denormalisation) -> PERFORMANCE
let course = {
    author: {
        name: 'Mosh'
    }
}

// Hybrid
let author = {
    name: 'Mosh'
    // 50 other properties 
}

let course = {
    author: {
        id: 'ref',
        name: 'Mosh'
    }
}