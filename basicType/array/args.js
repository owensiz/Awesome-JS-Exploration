function outputFn(args) {
  var output = ''
  if (typeof args.name == 'string') {
    output += `name: ${args.name}, `
  }
  if (typeof args.age == 'number') {
    output += `age: ${args.age}, `
  }
  console.log(`output: ${output}`)
}

outputFn({ name: 'xiaohong', age: 20 })
outputFn({ name: 'xiaoming' })


