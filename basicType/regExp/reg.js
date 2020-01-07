/*
 * @Description: 正则表达式
 * @Refer: https://www.liaoxuefeng.com/wiki/1022910821149312/1023021582119488 RegEx入门
 * https://www.yuque.com/fe9/basic/xkdu76 描述具体规则
 * @Author: owensiz 
 * @Date: 2019-10-14 14:52:56
 */
// ----------------------👀ww principles
RegExp以反斜杠\开头，以斜杠//包裹
用\d可以匹配一个数字
\w可以匹配一个字母或数字
\s	匹配空白字符(空格、回车、制表符)
用*表示任意个字符（包括0个）
用+表示至少一个字符
用?表示0个或1个字符
用{n}表示n个字符
用{n,m}表示n-m个字符
用[]表示范围
[0-9a-zA-Z]	范围字符
^表示行的开头，^\d表示必须以数字开头。 
$表示行的结束，\d$表示必须以数字结束
提取子串。用()表示的就是要提取的分组（Group）
最常用的是g，表示全局匹配
指定i标志，表示忽略大小写
m标志，表示执行多行匹配

// ---------------------- 开始
// 因为正则表达式也是用字符串表示的，所以，我们要首先了解如何用字符来描述字符。
// 精确匹配
// 在正则表达式中，如果直接给出字符，就是精确匹配
// 用\d可以匹配一个数字，\w可以匹配一个字母或数字，.可以匹配任意字符
// d digit 数字，
// 🌰：
// '00\d'可以匹配'007'，但无法匹配'00A'；
// '\d\d\d'可以匹配'010'；
// '\w\w'可以匹配'js'；
// 'js.'可以匹配'jsp'、'jss'、'js!'等等

// 变长
// 要匹配变长的字符，用*表示任意个字符（包括0个），用+表示至少一个字符，用?表示0个或1个字符，用{n}表示n个字符，用{n,m}表示n-m个字符：
// 🌰：
// \d{3}\s+\d{3,8}
// 解读：
// \d{3}表示匹配3个数字，例如'010'；
// \s可以匹配一个空格（也包括Tab等空白符），所以\s+表示至少有一个空格，例如匹配' '，'\t\t'等；
// \d{3,8}表示3-8个数字，例如'1234567'。
// 综合起来，上面的正则表达式可以匹配以任意个空格隔开的带区号的电话号码。
// 如果要匹配'010-12345'这样的号码呢？由于'-'是特殊字符，在正则表达式中，要用'\'转义，所以，上面的正则是\d{3}\-\d{3,8}。

// ---------------------- 进阶
// 但是，仍然无法匹配'010 - 12345'，因为带有空格。所以我们需要更复杂的匹配方式。要做更精确地匹配，可以用[]表示范围，比如：

// [0-9a-zA-Z\_]可以匹配【一个】数字、字母或者下划线；
// [0-9a-zA-Z\_]+可以匹配至少由一个数字、字母或者下划线组成的字符串，比如'a100'，'0_Z'，'js2015'等等；
// [a-zA-Z\_\$][0-9a-zA-Z\_\$]*可以匹配由【字母或下划线、$开头】，后接【任意个】由一个数字、字母或者下划线、$组成的字符串，也就是JavaScript允许的变量名；
// [a-zA-Z\_\$][0-9a-zA-Z\_\$]{0, 19}更精确地限制了【变量的长度是1-20个字符】（前面1个字符+后面最多19个字符）。
// A|B可以匹配A或B，所以(J|j)ava(S|s)cript可以匹配'JavaScript'、'Javascript'、'javaScript'或者'javascript'。
// ^表示行的开头，^\d表示必须以数字开头。
// $表示行的结束，\d$表示必须以数字结束。
// 你可能注意到了，js也可以匹配'jsp'，但是加上^js$就变成了整行匹配，就只能匹配'js'了。

// ---------------------- RegExp
// JavaScript有两种方式创建一个RegExp：
// 1 直接通过 /正则表达式/ 写出来，
// 2 是通过new RegExp('正则表达式')创建一个RegExp对象。
// 这两种写法是一样的
// 🌰：
var re1 = /ABC\-001/
var re2 = new RegExp('ABC\\-001') //如果使用第二种写法，因为字符串的转义问题，字符串的两个\\实际上是一个\。
// RegExp对象的test()方法用于测试给定的字符串是否符合条件。
re1.test('ABC-001')
re2.test('a-001')

// RegExp对象的test()方法用于测试给定的字符串是否符合条件。返回true false
// 🌰：
var re = /.*@.*\..*/
re.test('xx@xx.com') // true
// ---------
var re = /^\d{3}\-\d{3,8}$/;
re.test('782-790808')


// ---------------------- 应用
// ----------------------👀在 JavaScript 下的使用方法
// 在 JavaScript 下使用正则表达式, 有两种方法:
// ----第一种方法: 使用 RegExp 类
// 提供的方法有: (正则表达式在前面)
// • test(str): 在字符串匹配是否有匹配模式的字符串, 返回 true/false
// • exec: 如果正则表达式中有子表达式, 使用 exec 方法, 返回 result[0] = 匹配结果, result[1] = 子表达式 1 的匹配结果 ……
// ----第二种方法是: 使用 String 类
// 提供的方法有: (正则表达式在后面)
// • search 返回匹配模式的字符串出现的位置, 如果没有, 返回 -1;
// • match 返回匹配模式匹配到的字符串, 如果有, 返回数组, 无, 返回 null;
// • replace 将匹配模式匹配到的字符串进行替换;
// • split 将字符串已匹配模式为分隔符进行字符串分隔, 返回数组;
// 🌰：
'TheBis'.search(/[A-Z]/) //0

'TheBis'.match(/[A-Z]/g)//  ["T", "B"]

'TheBis'.replace(/[A-Z]/,0) //"0heBis"

'1,2,2,3,'.split(/[\,\s]+/) // ["1", "2", "2", "3", ""]

// 切分字符串
// 应用： 如果用户输入了一组标签，用正则表达式来把不规范的输入转化成正确的数组。用正则表达式切分字符串比用固定的字符更灵活。
// 🌰：
// split
'a , xs, sd   '.split(/[\s\,]+/) //相当于'a   v  s  '.trim().split(/\s+/)
// ["a", "v", "s"]


// 分组
// 提取子串。用()表示的就是要提取的分组（Group）
// 如果正则表达式中定义了组，RegExp对象的exec()方法可以提取出子串来。
// exec()方法在匹配成功后，会返回一个Array，第一个元素是正则表达式匹配到的整个字符串，后面的字符串表示匹配成功的子串。
// exec()方法在匹配失败时返回null。
// 🌰：
// ^(\d{3})-(\d{3,8})$分别定义了两个组，可以直接从匹配的字符串中提取出区号和本地号码：
var re = /^(\d{3})-(\d{3,8})$/;
re.exec('010-12345'); // ['010-12345', '010', '12345']
re.exec('010 12345'); // null



// 贪婪匹配
// 正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符。
// 🌰：
// 匹配出数字后面的0：

var re = /^(\d+)(0*)$/;
re.exec('102300'); 
//  ["102300", "102300", "", index: 0, input: "102300", groups: undefined]
// 由于\d+采用贪婪匹配，直接把后面的0全部匹配了，结果0*只能匹配空字符串了。
// 必须让\d+采用非贪婪匹配（也就是尽可能少匹配），才能把后面的0匹配出来，加个?就可以让\d+采用非贪婪匹配：
var re = /^(\d+?)(0*)$/;
re.exec('102300'); 
// ["102300", "1023", "00", index: 0, input: "102300", groups: undefined]



// 全局搜索
// reg还有几个特殊的标志，最常用的是g，表示全局匹配：
// 🌰：
var r1 = /test/g;
// 等价于:
var r2 = new RegExp('test', 'g');

// 全局匹配可以多次执行exec()方法来搜索一个匹配的字符串。
// 当我们指定g标志后，每次运行exec()，正则表达式本身会更新lastIndex属性，表示上次匹配到的最后索引
// 🌰：
var s = 'JavaScript, VBScript, JScript and ECMAScript';
var re=/[a-zA-Z]+Script/g;

// 使用全局匹配:
re.exec(s); // ['JavaScript']
re.lastIndex; // 10

re.exec(s); // ['VBScript']
re.lastIndex; // 20

re.exec(s); // ['JScript']
re.lastIndex; // 29

re.exec(s); // ['ECMAScript']
re.lastIndex; // 44

re.exec(s); // null，直到结束仍没有匹配到

// ---------------------- 几个常用的正则
// 手机号，身份证号，姓名，邮箱，账号，密码，IP，URL，域名
// https://blog.csdn.net/dongjing0813/article/details/80461326

