var p1 =  {
  toLocaleString: function(){
    return 'ppp'
  },
  toString: function(){
    return 'pppName'
  }
}

var p2 =  {
  toLocaleString: function(){
    return 'qqq'
  },
  toString: function(){
    return 'qqqName'
  }
}

var arr = [p1,p2]

console.log(arr)
console.log(arr.valueOf())//arr本身

alert(arr)
alert(arr.valueOf())
alert(arr.toLocaleString())
alert(arr.toString())
alert(arr.join(undefined))

