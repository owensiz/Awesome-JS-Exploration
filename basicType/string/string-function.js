// charAt() charCodeAt() concat() endsWith() includes() indexOf() lastIndexOf() localeCompare() match()

/*
 * @Name: charAt() charCodeAt()
 * @Use: 从一个字符串中返回指定的字符;
 * 返回值是一表示给定索引处（String中index索引处）字符的 UTF-16 代码单元值的数字；如果索引超出范围，则返回 NaN。
 * @Syntax: str.charAt(index);
 * index为介于0 和字符串长度减1之间的整数、默认为0
 */
const str = "lorem_123";
const returnVal = str.charAt(1);
const returnVal1 = str.charCodeAt(1);
console.log(returnVal, returnVal1); // o  111

/*
 * @Name: concat()
 * @Use: 将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。
 * @Syntax: str.concat(string2, string3[, ..., stringN])
 * 性能 强烈建议使用 赋值操作符（+, +=）🙋🙋🙋代替 concat 方法
 */
const str = "lorem_123";
const returnVal = str.concat("_456", "_789");
console.log(returnVal, str); //lorem_123_456_789 lorem_123

/*
 * @Name: endsWith()
 * @Use: 用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。
 * @Syntax: str.endsWith(searchString[, length]) ;
 * length可选。作为 str 的长度。默认值为 str.length。
 */
const str = "lorem_123";
const returnVal = str.endsWith("123");
const returnVal1 = str.endsWith("rem", 5);
console.log(returnVal, returnVal1); // true true

/*
 * @Name: includes()
 * @Use: 用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。
 * @Syntax: str.includes(searchString[, position])
 * position可选。从当前字符串的哪个索引位置开始搜寻子字符串，默认值为0。
 */
const str = "lorem_123";
const returnVal = str.includes("rem");
const returnVal1 = str.includes("rem", 5);
console.log(returnVal, returnVal1); // true false

/*
 * @Name: indexOf()
 * @Use: 返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。
 * @Syntax: str.indexOf(searchValue[, fromIndex])
 * fromIndex 可选,表示开始查找的位置。可以是任意整数，默认值为 0。
 * 如果 fromIndex 小于 0，则查找整个字符串（等价于传入了 0）。如果 fromIndex 大于等于 str.length，则必返回 -1。
 */
const str = "lorem_123";
const returnVal = str.indexOf("rem");
const returnVal1 = str.indexOf("rem", 5);
const returnVal2 = str.indexOf("", 5);
const returnVal3 = str.indexOf("", 100);
const returnVal4 = str.indexOf("", -100);
console.log(returnVal, returnVal1, returnVal2, returnVal3, returnVal4); // 2 -1 5 9 0

/*
 * @Name: lastIndexOf()
 * @Use: 返回调用String 对象的指定值最后一次出现的索引，在一个字符串中的指定位置 fromIndex处从后向前搜索。如果没找到这个特定值则返回-1 。
 * @Syntax: str.lastIndexOf(searchValue[, fromIndex])
 */

/*
 * @Name: localeCompare()
 * @Use: 待定
 * @Syntax: str.lastIndexOf(searchValue[, fromIndex])
 */

/*
 * @Name: match()
 * @Use: 检索返回一个字符串匹配正则表达式的的结果。
 * @Syntax: str.match(regexp)
 */
const str = "For more information, see Chapter 3.4.5.1";
const re = /see (chapter \d+(\.\d)*)/i;
const returnVal = str.match(re);
const returnVal1 = str.match(); //不传参时
console.log(returnVal, returnVal1);
// ["see Chapter 3.4.5.1", "Chapter 3.4.5.1", ".1", index: 22, input: "For more information, see Chapter 3.4.5.1", groups: undefined]
// ["", index: 0, input: "For more information, see Chapter 3.4.5.1", groups: undefined]
// 匹配的结果包含如下所述的附加特性。
// groups: 一个捕获组数组 或 undefined（如果没有定义命名捕获组）。
// index: 匹配的结果的开始位置
// input: 搜索的字符串.

/*
 * @Name: matchAll()
 * @Use: 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。
 * @Syntax: str.matchAll(regexp)
 * 如果所传参数不是一个正则表达式对象，则会隐式地使用 new RegExp(obj) 将其转换为一个 RegExp 。
 * @Return: 一个迭代器（不可重用，结果耗尽需要再次调用方法，获取一个新的迭代器）。
 */
// 🌰
var str = "test1-test2";
var re = /test/; //无需使用g标志
var arr = [...str.matchAll(re)];
console.log(arr, arr[0]);
// [Array(1), Array(1)]
// ["test", index: 0, input: "test1-test2", groups: undefined]

// 相当于
var str = "test1-test2";
var re = /test/g;
var arr = [];
var result;
while ((result = re.exec(str) !== null)) {
  arr.push(result);
}
console.log(arr, arr[0]);
// [true, true]
// 0: true1: truelength: 2__proto__: Array(0) true

// 🌰
// 捕获组的更佳途径
// 当使用match()和/g标志方式获取匹配信息时，捕获组会被忽略;
// 使用 matchAll 可以通过如下方式获取分组捕获:
var str = "test1-test2";
var re = /test/g; //使用match()和/g标志，捕获组会被忽略;
var arr = str.match(re);
var arr1 = [...str.matchAll(re)]; //获取分组捕获
console.log(arr[0], arr1[0]);
// test
// ["test", index: 0, input: "test1-test2", groups: undefined]

/*
 * @Name: padEnd()  padStart()
 * @Use: 会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。
 * @Syntax: str.padEnd(targetLength [, padString])
 * targetLength 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
 * padString 可选 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "（U+0020）。
 */
const str = "abc";
const returnVal = str.padEnd(6, "123456"); //abc123
const returnVal1 = str.padEnd(1); //abc
const returnVal2 = str.padEnd(10); // "abc       "
const returnVal3 = str.padStart(6, "123456"); //123abc
console.log(returnVal, returnVal1, returnVal2, returnVal3);

/*
 * @Name: toString()  valueOf()
 * @Use: 返回指定对象的字符串形式。
 * @Syntax: str.toString()
 * 对于 String 对象，toString 方法返回该对象的字符串形式，和 String.prototype.valueOf() 方法返回值一样。
 */
var str = new String("Hello world");
console.log(str.toString());
console.log(str);
// Hello world
// String {"Hello world"}

/*
 * @Name: valueOf()
 * @Use: 返回一个String对象的原始值（primitive value）。👀
 * @Syntax: str.valueOf()
 * String 对象的 valueOf 方法返回一个String对象的原始值。该值等同于String.prototype.toString()。👀👀
 */
var str = new String("Hello world");
console.log(str.valueOf());
console.log(str);
// Hello world
// String {"Hello world"}
