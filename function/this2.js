function fn() {
  var person = {
    getName: function() {
      return () => {
        console.log(1, this)
      }
    },
    getAge: () => {
      console.log(2, this)
    },
  }
  var getBestPerson = () => {
    console.log(3, this)
  }
  person.getName()()
  person.getAge()
  getBestPerson()
}

fn()
// 1 {getName: ƒ, getAge: ƒ}
// 2 Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
// 3 Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}

China = { name: 'china' }
China.getSchool = fn

China.getSchool()
// 1 {getName: ƒ, getAge: ƒ}
// 2 {name: "china", getSchool: ƒ}
// 3 {name: "china", getSchool: ƒ}

