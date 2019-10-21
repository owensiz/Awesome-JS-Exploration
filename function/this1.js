var a = {
  b: function() {
    this.age = '100000'
    return () => {
      console.log(this)
    }
  },
  age: 12,
}
a.b()() // 也就只是a里面调了一下b

c = a.b()
c()

d = a.b
d()()
