// 先列几个我见过的
// repeat replace search slice split sub substr substring trim

/*
 * @Name: repeat()
 * @Use: 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
 * @Syntax: str.repeat(count);
 * count: 介于0和正无穷大之间的整数
 */
const str = "lorem_123";
const returnVal = str.repeat(0); //  ''
const returnVal1 = str.repeat(2); //'lorem_123lorem_123'
console.log(returnVal, returnVal1);

/*
 * @Name: replace() 🙋
 * @Use: 返回一个由替换值（replacement）替换一些或所有匹配的模式（pattern）后的新字符串。原字符串不会改变。
 * 模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。
 * @Syntax:  str.replace(pattern, replacement)
 *  *  *  *  str.replace(regexp|substr, newSubStr|function)
 */
// 🌰
// 在 replace() 中使用正则表达式
var str = "Thx baobao";
// var reg = /\thx/i这是错误写法
var reg = /thx/i;
var returnVal = str.replace(reg, "thanks");
console.log(returnVal);
// 🌰
// 在 replace() 中使用 global 和 ignore 选项
var str = "thx thx Thx baobao";
var reg = /thx/gi;
var returnVal = str.replace(reg, "thanks");
console.log(returnVal);
// 🌰
// 交换字符串中的两个单词👀
// replacement可以插入特殊变量名：$n等，如下：
// $$	插入一个 "$"。
// $&	插入匹配的子串。
// $`	插入当前匹配的子串左边的内容。
// $'	插入当前匹配的子串右边的内容。
// $n	假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始
var str = "str1 str2";
var reg = /(\w+)\s(\w+)/;
var returnVal = str.replace(reg, "$2,$1");
console.log(returnVal);
// str2,str1
// 使用行内函数来修改匹配到的字符👀
// 可以指定一个函数作为第二个参数。下面是该函数的参数：
// match	匹配的子串。（对应于上述的$&。）
// p1,p2, ...  假如replace()方法的第一个参数是一个RegExp 对象，则代表第n个括号匹配的字符串。（对应于上述的$1，$2等。）例如，如果是用 /(\a+)(\b+)/ 这个来匹配，p1 就是匹配的 \a+，p2 就是匹配的 \b+。
// offset 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 'abcd'，匹配到的子字符串是 'bc'，那么这个参数将会是 1）
// string	被匹配的原字符串。
// 🌰
// NamedCaptureGroup	命名捕获组匹配的对象
// 驼峰转中划线格式：borderTop转border-top
function lowerFormat(match) {
  return "-" + match.toLowerCase();
}

var str = "borderTopSolid";
var returnVal = str.replace(/[A-Z]/g, lowerFormat);
console.log(returnVal);
// border-top-solid

// 🌰
// 使 abc12345#$*% 变成 'abc - 12345 - #$*%'
var str = "abc12345#$*%";
var re = /([^\d]*)(\d*)([^\w*])/;
function format(match, p1, p2, p3, offset, string) {
  // 这个函数参数是按顺序来的，要使用p1,p2,p3的话就不能省略前面的match
  return [p1, p2, p3].join("-");
}
var returnVal = str.replace(re, format);
console.log(returnVal);

/*
 * @Name: search()
 * @Use: 执行正则表达式和 String 对象之间的一个搜索匹配
 * @Syntax: str.search(regexp)
 * regexp 一个正则表达式（regular expression）对象。如果传入一个非正则表达式对象 obj，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象。
 * @Return: 如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。
 */

// 类似于数组的indexOf()
// 找一个非word也非空格的字符
var str = "hello wolrd!";
var re = /[^\w\s]/;
var returnVal = str.search(re);
var targetVal = str[returnVal];
console.log(returnVal, targetVal);
// 11 "!"

/*
 * @Name: slice() 切片
 * @Use: 提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
 * @Syntax: str.slice(beginIndex[, endIndex])
 * slice() 提取的新字符串包括beginIndex但不包括 endIndex。
 * 例 1：str.slice(1, 4) 提取第二个字符到第四个字符（被提取字符的索引值（index）依次为 1、2，和 3）。
 * 例 2：str.slice(2, -1) 提取第三个字符到倒数第一个字符。
 */

var str = "hello wolrd! byebye world! ";
var returnVal = str.slice(1);
var returnVal1 = str.slice(-1);
var returnVal1 = str.slice(-2);
var returnVal2 = str.slice(1, -1); //endIndex写-1，和endIndex不写是一样的
var returnVal3 = str.slice(1, -2);
var returnVal4 = str.slice(-2, -1);
console.log(returnVal, returnVal1, returnVal2, returnVal3);
// ello wolrd! byebye world!
// " "
// "! "
// "ello wolrd! byebye world"
// ello wolrd! byebye world!
// !

/*
 * @Name: split()
 * @Use: 使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。
 * @Syntax: str.split([separator[, limit]])
 * separator 可以是一个字符串或正则表达式。
 *  👀 如果在str中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。
 * limit 一个整数，限定返回的分割片段数量。该参数可指定返回的数组的最大长度。
 * 👀 String.split() 执行的操作与 Array.join 执行的操作是相反的。
 */
// 🌰
var str = "1,2,3";
var returnVal = str.split();
var returnVal1 = str.split(",");
var returnVal2 = str.split("");
var returnVal3 = str.split(",", 2);
console.log(returnVal, returnVal1, returnVal2, returnVal3);
// ["1,2,3"]
// (3) ["1", "2", "3"]
// (5) ["1", ",", "2", ",", "3"]
// (2) ["1", "2"]

// 🌰
var names = "Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ";
// 这个分隔符应当是：0或多个空格+分号+0或多个空格
var re = /\s*;\s*/;
var re1 = /\s*(;)\s*/;
var re2 = /\s*(?:;|$)\s*/; //非捕获括号
var re3 = /\s*[?:;|$]\s*/;
var returnVal = names.split(re);
var returnVal1 = names.split(re1);
var returnVal2 = names.split(re2);
var returnVal3 = names.split(re3);
console.log(returnVal, returnVal1, returnVal2, returnVal3);

// (5) ["Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand "]
// (9) ["Harry Trump", ";", "Fred Barney", ";", "Helen Rigby", ";", "Bill Abel", ";", "Chris Hand "]
// (6) ["Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand", ""]
// (5) ["Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand "]

/*
 * @Name: startsWith()
 * @Use: 判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。
 * @Syntax: str.startsWith(searchString[, position])
 */

var str = "hello wolrd!";
var returnVal = str.startsWith("hello"); //true
var returnVal1 = str.startsWith("hello", 3); //false

/*
 * @Name: substring()
 这玩意儿和slice有什么分别啊👀👀
 * @Use:  返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
 * @Syntax: str.substring(indexStart[, indexEnd])
 * substring 提取从 indexStart 到 indexEnd（不包括）之间的字符。特别地：

如果 indexStart 等于 indexEnd，substring 返回一个空字符串。
如果省略 indexEnd，substring 提取字符一直到字符串末尾。
如果任一参数小于 0 或为 NaN，则被当作 0。👀👀
如果任一参数大于 stringName.length，则被当作 stringName.length。
如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样。👀👀

 * @Return: 包含给定字符串的指定部分的新字符串。
 */
// 🌰
var str = "hello wolrd!";
var returnVal = str.substring(2); // llo wolrd!
var returnVal1 = str.substring(2, 5); // llo
var returnVal2 = str.substring(3, 0);
// hel 相当于str.substring(0, 3);
var returnVal3 = str.substring(3, -3);
// hel 相当于str.substring(3, 0) => 相当于str.substring(0, 3);
console.log(returnVal, returnVal1, returnVal2, returnVal3);

// 🌰
// 运用 length 属性来使用 substring()
// String.length 属性去获取指定字符串的倒数元素。注意，是倒数元素。
// 获取最后6个字符
var str = "hello wolrd!";
var returnVal = str.substring(str.length - 6);
console.log(returnVal); //wolrd!

/*
 * @Name: trim() trimRight() trimLeft()
 * 别名 trimEnd()  trimStart()
 * @Use: 会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）。
 * @Syntax: str.trim()
 * @Return: 一个代表调用字符串两端去掉空白的新字符串。
 */

var str = "   hello !   ";
var returnVal = str.trim();
// "hello !"
var returnVal1 = str.trimRight();
// "   hello !"
var returnVal2 = str.trimLeft();
// "hello !   "
console.log(returnVal, returnVal1, returnVal2);

/*
 * @Name: toLowerCase() toUpperCase() toLocaleUpperCase() toLocaleLowerCase()
 * @Syntax: str.toLowerCase()
 * @Return: 一个新的字符串，表示串转换为小写的调用字符。
 * 一个新的字符串，即根据本地化（locale-specific）的大小写映射规则将输入的字符串转化成大写形式的结果。
 */

var str = "   hEllo !   ";
var returnVal = str.toLowerCase();
// "   hello !   "
