# NodeJs_Demo

NodeJs简介

Ryan Dahl项目命名为：web.js 就是一个Web服务器.
单纯开发一个Web服务器的想法，变成构建网络应用的一个基本框架.
Node发展为一个强制不共享任何资源的单线程，单进程系统。
每一个Node进程都构成这个网络应用中的一个节点，这是它名字所含意义的真谛。
Node的诞生历程

    2009年3月，Ryan Dahl在博客宣布并创建

    2009年5月，在GitHub上发布最初的版本

    2009年12月和2010年4月，两届JSConf大会安排了Node的讲座

    2010年底，Ryan Dahl加入Joyent全职负责Node的发展

    2011年7月，发布Windows版本

    2011年11月，成为GitHub上面关注度最高的项目

    2012年1月底，Ryan Dahl 将掌门人身份交给NPM的作者Issac Z.Schlueter

    2013年7月，发布稳定版V0.10.13

    随后，Node的发布计划主要集中在性能上面，V0.14后正式发布V1.0版本

选择JavaScript

    高性能（chrome的V8引擎的高性能）

    符合事件驱动（JavaScript在浏览器中有广泛的事件驱动方面的应用）

    没有历史包袱（为其导入非阻塞的I/O库没有而外阻力）

Node给JS带来的意义

    Node结构与Chrome十分相似，基于事件驱动的异步架构

    Node中JS可以访问本地文件，搭建服务器，连接数据库

    Node打破了过去JS只能在浏览器中运行的局面，前后端编程环境统一

Node特点

    异步I/O
    事件与回调函数
    单线程

    * child_progress：解决单线程中大量算量的问题
    * Master-Worker：管理各个工作进程

    跨平台：兼容Windows和*nix平台

构建异步I/O，从文件读取到网络请求。
可以从语言层面很自然的进行并行I/O 操作。每个调用之间无序等待之前I/O调用结束。

事件编程方式：轻量级，松耦合，只会关注事务点。

单线程弱点：

    无法利用多核CPU

    错误会引起整个应用退出，应用的健壮性

    大量计算占用CPU导致无法继续调用异步I/O。

浏览器中JavaScript与UI公用一个线程，JavaScript长时间执行会导致UI的渲染和响应被中断。
在Node中，长时间占用CPU到孩子后续的异步I/O发不出调用，已经完成的异步I/O的回调函数也会得不到执行。

解决：
child_progress：解决单线程中大量算量的问题
Master-Worker：管理各个工作进程 (管理子进程)

启用一个完全独立的进程，将需要计算的程序发送给进程。通过时间将结果传递回来。(消息传递的方式来传递运行结果)

采用消息传递的方式： 保持应用模型的简单和低依赖。
Node的应用场景

    I/O密集型

    面向网络且擅长并行I/O，能够有效的组织起更多的硬件资源。
    利用事件循环的处理机制，资源占用极少。

    不是很擅长CPU密集型业务，但是可以合理调度

    通过编写C/C++扩展的方式更高效的利用CPU

    与遗留系统问题和平共处

    LinkeDin， 雪球财经

    分布式应用

    阿里的数据平台，对Node的分布式应用
    分布式应用要求：对可伸缩性要求高。
    具体应用：
    中间层应用NodeFox，ITer，将数据库集群做了划分和映射，查询调用一句是针对单张表进行SQL查询，中间层分解查询SQL，并行的去多态数据库中获取数据并合并。
    NodeFox作用：实现对多台MySQL数据的查询
    ITer作用：查询多个数据库(指的是不同数据库，MySQL，Oracle等)            

Node的使用者

    前后端编程语言环境统一：雅虎开放了Cocktail框架

    Node带来的高性能的I/O用于实时应用：Voxer和腾讯

    Voxer：实时语音
    腾讯：Node应用在长连接，实时功能

    并行I/O使得使用者可以更高效地利用分布式环境：阿里巴巴和eBay

    利用Node并行I/O的能力，更高校的使用已有的数据

    并行I/O，有效利用稳定接口提升Web渲染能力：雪球财经和LinkedIn

    云计算平台提供Node支持

    游戏开发领域：网易的pomelo实时框架

    工具类应用

模块机制

Node的模块机制
模块在引用过程中的编译，加载规则
CommonJs规范为JavaScript提供了一个良好基础，JavaScript能够在任何地方运行。
CommonJS规范

规范涵盖：模块，二进制，Buffer，字符集编码，I/O流，进程环境，文件系统，套接字，单元测试，Web服务器网管接口，包管理

JavaScript规范缺陷

    没有模块系统

    标准库较少

    没有标准接口

    缺乏包管理系统

Node借鉴CommonJS的Modules规范实现了一套非常易用的模块系统
NPM对Packages规范的完好支持使得Node在应用开发过程中更加规范

CommonJS的模块规范

    模块应用

var math = require('math');

在CommonJs规范中，存在require();方法，这个方法接收模块标识，以此引入一个模块的API到当前上下文中。

    模块定义

require(): 引入外部模块。
exports对象： 导出当前的方法或者变量，而且是唯一导出的出口
module对象：表示自身模块，而exports是module的属性。

Node中，一个文件就是一个模块，将方法挂载到exports对象作为属性定义导出方式.

    模块标识

传递给require() 方法的参数，必须符合小驼峰命名的字符串，或者以 .,..开头的相对路径，或者绝对路径。 js文件可以没有后缀.js

模块的意义：
将类聚的方法和变量等限定在私有的作用域中，同时支持引入和导出的功能顺畅的连接上下游依赖。

Node模块的实现

Node中引入模块的步骤：
1：路径分析
2：文件定位
3：编译执行

模块分类

核心模块：Node提供的模块
文件模块：用户编写的模块

核心模块在Node源代码的编译过程中，编译进了二进制执行文件。
Node进程启动时，部分核心模块就直接被加载近内存中。

文件模块是在运行时动态加载，需要完成的路径分析，文件定位，编译执行的过程。

模块加载过程

    优先从缓存加载

Node对引入过的模块都是进行缓存，减少二次引入时的开销。(Node缓存是编译和执行之后的对象)

不论是核心模块还是文件模块，require()方法对同模块的二次加载都采用缓存优先的方式。 不同之处，核心模块的缓存检查优先于文件模块的缓存检查

    路径分析和文件定位

○ 模块标识符分析

    核心模块

    路径形式的文件模块

    自定义模块

模块标识符分类：

    核心模块：http，fs，path 等

    .,..开始的相对路径的文件模块

    以/开始的绝对路径文件模块

    非路径形式的文件模块(自定义模块)

核心模块
核心模块的优先级仅此于缓存加载，在Node的源码编译过程中，已经编译为二进制代码，其加载过程最快。

如果想加载和核心模块标识相同的模块，必须选择修改标识或换用路径的方式。

路径形式的文件模块
.,..开始的相对路径的文件模块。require();方法会将路径转为真实路径，并以真实路径作为索引，将编译执行后的结果存放入缓存中。

文件模块指明了确切的文件位置，在查找过程中节约大量时间，其加载速度慢于核心模块。

自定义模块
特殊的文件模块，可能是一个文件或包的形式。这类模块查找最费时，也是所有方式最慢的一种。

模块路径：Node在定位文件模块的具体文件时定制的查找策略。表现为一个路径组成的数组。

node_modules 会按照类似JavaScript的原型链查查找方式，在加载过程中，Node会租个尝试模块路径中的路径。直到找到文件为止。(文件路径越深，模块查找耗时越多)

○ 文件定位

    文件扩展名分析（.js,.node,.json次序补足扩展名）

    目录分析和包

文件扩展名分析
require(); 在分析标识符的过程中，标识符不含有文件扩展名的情况，Node会按照 .js,.node,.json 补足扩展名，以此尝试

尝试过程：需要调用fs模块同步阻塞式判断文件是否存在。
因为Node是单线程，这边会引起性能问题。

避免方法：
方法1：如果是.node 和 .json文件，标识符加上扩展名
方法2：同步配合缓存，可以大幅度缓解Node中阻塞式调用的缺陷

目录分析和包
在分析文件扩展名之后，没有找到对应的文件，但却得到一个目录。当作一个包来处理。

Node在当前目录下查找package.json(CommonJS包规范定义的包描述文件)，通过JSON.parse();解析出包描述对象，从中取出main属性指定的文件名进行定位。如果文件名缺少扩展名，将会进去扩展名分析的步骤。

如果main属性指定的文件名错误，或者更没有package.json的文件，Node会将index当作默认文件名，然后一次查找index.js， index.node ， index.json

如果在目录分析的过程中没有定位成功任何文件，则自定义模块进入下一个模块路径进行查找。如果模块路径数组都遍历完毕，依然没有查找到目标文件，则会抛出查找失败的异常。

○ 编译模块

    .js文件。通过fs模块同步读取文件后编译执行

    .node文件

    用C/C++编写的扩展文件
    通过dlopen()方法加载最后编译生成的文件

    .json文件

    通过fs模块同步读取文件后，
    用JSON.parse()解析返回结果

    其它扩展名文件。它们被当作.js文件载入

在Node中，每个文件模块都是一个对象。
每一个编译成功的模块都会将其目录作为索引缓存在Module._cache对象上.

JavaScript模块的编译
在编译过程中，Node对获取的JavaScript文件内容进行了头尾包装。

(function ( exprots, require, moduel, __filename, __dirname ) {  });

包装之后，对每个文件之间进行了作用域隔离，包装之后的代码会通过vm原生模块的runIntThisContext();方法执行 (类似eavl，只是具有明确上下文，不污染全局). 返回一个具体的function 对象。 最后，将当前模块对象的exports属性，require()方法，module[模块对象自身],以及在文件定位中得到的完整文件路径和文件目录作为参数传递给这个funciton() 执行。

在执行之后，模块中的exports 属性被返回给了调用方。exports属性上的任何方法和属性在外界都可以被调用得到。

有了exports的情况下，为何还存在module.exports.
给exports重新赋值，exports对象是通过形参的方式传入的，直接赋值会改变形参的引用，但是不能改变作用域外的值
核心模块

Node的核心模块在编译成可执行文件的过程中编译近了二进制文件。

核心模块：
C/C++编写,存放在Node项目中src目录下
JavaScript编写，存放在lib目录下

JavaScript核心模块的编译过程

    转存为C/C++代码

    编译为JavaScript核心模块

转存为C/C++代码
Node采用V8的js2c.py工具，将所有内置的JavaScript代码('src/node.js 和 lib/*.js') 转换成C++里的数组，生成node_natives.h头文件

启动Node进程时,JavaScript代码直接加在进内存中。在加载过程中，JavaScript核心模块经历标识符分析后直接定位到内存中，比普通的文件模块从磁盘从查找快很多。

编译为JavaScript核心模块
JavaScript核心模块与文件模块区别：
获取源代码的方式(核心模块是从内存中加载的)以及缓存执行结果的位置。

源文件通过process.bingding('natives'); 取出，编译成功的模块缓存到NativeModuel._cache对象上。 文件模块缓存到Module._cache

function NativeModule(id) {
    this.filename = id + '.js';
    this.id = id;
    this.exports = {};
    this.loaded = false;
}
NativeModule._source = process.binding('natives');
NativeModule._cache = {};

C/C++核心模块的编译过程
核心模块中，有些模块全部有C/C++编写，有些模块则由C/C++完成核心部分，其它部分由JavaScript实现包装或向外到处。

内建模块: 纯C/C++编写的部分
JavaScript主外实现封装的模式是Noe能够提高性能的常见方式.
Node的buffer，crypto，evals，fs，os等模块都是部分通过C/C++编写 (不直接被用户调用)

内建模块的组织形式
每一个内建模块定义之后，都通过NODE_MODULE宏将模块定义到node命名空间中。

内建模块的导出
在Node的所有模块类型中，存在依赖关系。

一般的,不推荐文件模块直接调用内建模块。如需调用，直接调用核心模块。
因为:核心模块中基本都封装了内建模块。

Node在启动时，会生成一个全局变量process，并提供Binding()方法谢祖加载内建模块。
转为C/C++数组存储，通过process.binding('natives'); 取出防止NativeModule.source中.

在加载内建模块时，先创建exports空对象，然后调用get_builtin_module() 方法取出内建模块对象，通过执行resister_func()填充exports 对象，最后将exports对象安模块名缓存，并返回给调用方完成导出。

核心模块的引入流程
1.NODE_MODULE(node_os,reg_func)
2.get_builtin_module("node_os")
3.process.binding("os")
4.NativeModule.require("os")
5.require("os")

编写核心模块

前提条件:

    GYP项目生成工具

    V8引擎C++库

    libuv库

    Node内部库

    其他库，zlib、openssl、http_parser等

C/C++扩展模块的编写
C/C++扩展模块的编译
C/C++扩展模块的加载

C/C++ 内建模块属于最底层的模块，属于核心模块，主要提供API给JavaScript核心模块和第三方JavaScript文件模块调用。

JavaScript核心模块作用：
1： 作为C/C++内建模块的封装层和桥接层，供文件模块调用
2： 纯粹的功能模块，不需要跟底层交流，但有很重要。

文件模块通常由第三方编写，包括普通JavaScript模块和C/C++扩展模块，主要调用方向为普通JavaScript模块调用扩展模块。

包与NPM

包结构
package.json：包描述文件
bin：用于存放可执行二进制文件的目录
lib：用于存放JavaScript代码的目录
doc：用于存放文档的目录
test：用于存放单元测试用例的代码

包描述文件与NPM
必需字段：name，description，version，keywords，maintainers
必需字段：contributios，bugs，licences，repositories，dependencies

dependencies: 使用当前包所依赖的包列表，NPM会通过这属性帮助自动加载依赖的包

NPM常用功能
查看帮助: npm -v

安装依赖包
最常见: npm install express
全局安装：npm install express -g
从本地安装：npm install <file>
从非官方源安装：npm install underscore --registry=http://registry.url

NPM钩子命令
package.json中的script字段：让包在安转或者卸载过程中提供钩子机制

"scripts": {
    "preinstall": "preinstall.js",
    "install": 'install.js',
    "uninstall": 'uninstall.js',
    "test": "test.js"
}

在执行npm install <package>时， preinstall指向的脚本将会被加载执行，然后install执行的脚本会被执行。在执行npm install <package>时，unstall指向的脚本也许会做一些清理工作。

NPM潜在问题
NPM平台上面包质量良莠不齐
Node代码可以运行在服务端，需要考虑安全问题
前后端共用模块

模块的侧重点
Node的模块引入过程，几乎全部都是同步。

AMD规范
AMD规范：是CommonJS模块规范的一个延伸

//通过数组引入依赖 ，回调函数通过形参传入依赖
define(['someModule1', ‘someModule2’], function (someModule1, someModule2) {

    function foo () {
        /// someing
        someModule1.test();
    }

    return {foo: foo}
});

CMD规范
CMD规范：玉伯提出，区别定义模块和依赖引入

 //CMD
define(function (requie, exports, module) {
    
    //依赖 就近书写
    var a = require('./a');
    a.test();
    
    //软依赖
    if (status) {
    
        var b = requie('./b');
        b.test();
    }
});

1.对于依赖的模块AMD是提前执行，CMD是延迟执行。RequireJS从2.0开始，也改成可以延迟执行（根据写法不同，处理方式不通过）。

2.CMD推崇依赖就近，AMD推崇依赖前置。

UMD规范
兼容多种模块规范（Universal Module Definition）
UMD判断是否支持Node.js的模块（exports）是否存在且module不为undefiend，存在则使用Node.js模块模式。
判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。

(function (root, factory) {

    if (typeof define === 'function' && define.amd) {

        // AMD.
        define(['exports'], factory);

    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {

        // CommonJS
        factory(exports, require('echarts'));

    } else if ( typeof module !== 'undefined' ** module.exports ) {

        // 普通Node模块   
        module.exports = factory();

    } else {
        
        // Browser globals
        factory({}, root);
        
    }
    
}(this, function (exports) {

    //module ...

}));

异步I/O

事件循环是异步实现的核心，与浏览器中的执行模型基本保持一致。

古老的Rhino，是较早服务器上运行JavaScript，但是执行模型并不像浏览器采用事件驱动.而是使用其它语言一样采用同步I/O作为主要模型.
为什么要异步I/O

    用户体验，消耗时间为max(M,N)

    资源分配，让单线程远离阻塞，更好利用CPU

用户体验

异步概念： 浏览器中JavaScript在单线程上执行，还与UI渲染共用一个线程。 表示JavaScript在执行的时候UI渲染和响应是处于停止状态

资源分配

单线程同步会因为阻塞I/O导致硬件资源的不到更优使用。多线程编程中的死锁，状态同步等问题。

选择： 利用单线程，原理多线程死锁，状态同步等问题，利用异步I/O，让单线程原理阻塞，更好的使用CPU。
异步I/O实现现状

操作系统内核对于I/O只有两种方式：阻塞与非阻塞。
在调用阻塞I/O时，应用程序需要等待I/O才会返回结果.

阻塞I/O特点：调用之后一定要等到系统内核层面完成所有操作后，调用才结束。

异步I/O与非阻塞I/O
操作系统对计算机进行了抽象，将所有的输入输出设备抽象为文件。内核在进行文件I/O操作时，通过文件描述符进行管理。
应用程序如果需要进行I/O调用，需要先打开文件描述符，然后再更具文件描述符去实现文件的数据读写。
阻塞I/O： 完成整个获取数据的过程。
非阻塞I/O: 不带数据直接返回，要获取数据，还需要通过文件描述符再次读取。

为了获取完整数据，应用程序需要重复调用I/O操作来确认是否完成。这种重复调用判断操作是否完成的叫做轮询;

轮询： CPU决策如何提供周边设备服务的方式。 又称为 “程控输出入” (Programmed I/O)。
轮询法： 由CPU定时发出询问，依次询问每一个周边设备是否需要其服务，有即给予服务。服务结束再询问下一个周边，重复询问。

非阻塞I/O缺点：轮询去确认是否完全完成数据获取，会让CPU处理状态判断，是对CPU资源的浪费。需要减小I/O状态判断的CPU损耗.

轮询技术

    read

    select

    poll

    epoll

    kqueue

read : 重复调用来检查I/O的状态来完成完整数据的读取。
缺点：性能最低

select : 文件描述符上的事件状态来进行判断
缺点：最多可同时检查1024个文件描述符.

poll : 链表的方式避免数组长度的限制，能避免不需要的检查
缺点：文件描述符较多，性能低下。

epoll : I/O事件通知机制。
进入轮询的时候如果没有检测到I/O事件，将会进行休眠，知道事件发生将它唤醒。
事件通知，执行回调的方式。而不是遍历查询。
特点：不会浪费CPU，执行效率较高。

kqueue : 实现方式和epoll类似，存在FreeBSD系统下。

轮询缺点：
轮询对于应用程序，仍然是一种同步，应用程序让然需要等待I/O完全返回，依旧花费很多时间来等待。等待期间CPU要么用于遍历文件描述符的状态，要么用户休眠等待事件发生。

理想的非阻塞异步I/O

应用程序发起非阻塞调用，无需通过遍历或者事件唤醒等方式轮询,可以直接处理下一个任务。
在I/O完成后通过信号或回调将数据传递给应用程序。

现实中的异步I/O

*nix平台下采用libeio配合libev实现I/O部分
windows平台采用IOCP是实现异步I/O

部分线程阻塞I/O 或者 非阻塞I/O + 轮询技术 -> 完成数据获取。
一个线程计算处理
通过线程之间的通信将I/O得到的数据进行传递。

IOCP： 调用异步方法，等待I/O完成之后的通知，执行回调，用户无序考虑轮询。(实现原理：线程池原理)

*nix将计算机抽象：磁盘文件，硬件，套接字，等几乎所有计算机资源抽象为文件。

在Node中，无论是*nix还是Windows平台，内部完成I/O任务的另有线程池。
Node的异步I/O

    事件循环

    观察者

    请求对象

    执行回调

事件循环，观察者，请求对象，I/O线程池共同构成Node异步I/O模型的基本要素。

事件循环
Node 自身的执行模型 -- 事件循环。
在进程启动时，Node会穿件一个类似于while(true)的循环，每执行一次循环体的过程 称之为： Tick(标记，打勾) .每个Tick的过程就是查看是否有事件待处理，如果有，就取出事件及其相关的回调函数。如果存在关联的回调，就执行它们。然后进入下个循环，如果不再有事件处理，就退出进程。

观察者

每个事件循环中有一个或者多个观察者，而判断是否有事件要处理的过程就是想这些观察者询问是否有要处理的事件。

浏览器类似事件观察机制： 时间可能来自用户的点击或者加载某些文件时产生,而这些产生的事件都有对应的观察者。

事件循环是一个典型的生产者/消费者模型，$watch $digest 机制。 异步I/O，网络请求则是事件的生产者，远远不断为Node提供不同类型的事件，这些事件被传递到对应的观察者那里，事件循环则从观察则那里取出事件并处理。

请求对象

请求对象： 从JavaScript 发起调用到内核执行完I/O操作的过度过程中，存在一种中间产物.

请求对象是异步I/O过程中的重要中间产物，所有的状态都保存在这对象中，包括送入线程池等待执行以及I/O操作完毕后的回调处理。

Node中的异步I/O调用，回调函数不由开发者来调用。
从发出调用后，到回调函数被执行，中间发生了什么?

fs.open() 示例：

fs.open = function ( path, flags, mode, cb ) {
    
    binding.open(pathModule._makeLong(path), stringToFlags(flags), mode, cb);    

};

Node经典调用方式：从JavaScript调用Node的核心模块，核心模块调用C++内建模块，内建模块通过libuv进行系统调用。

调用的uv_fs_open() -> FsReqWrap (请求对象，作用：JavaScript层传入的参数和当前方法都封装对象中)

回调函数被设置在FsReqWrap.oncomlete_sym 属性上

req_wrap -> object_ -> Set(oncomlete_sym, callback);

包装完之后，Windows调用：QueueUserWorkItem() 将FsReqWrap对象推入线程池中等待执行


QueueUserWrokITem(&uv_fs_thread_proc, req, WT_EXTCUTEDEFAULT);

QueueUserWorkItem()
参数1：执行的方法引用 fs_open() 的引用 uv_fs_thread_proc
参数2：uv_fs_thread_proc() 方法执行时所需参数。
参数3：执行的标志。

调用完成之后，JavaScript调用立即返回，由JavaScript层面发起的异步调用的第一阶段结束。
JavaScript线程可以继续执行当前任务的后续操作。当前的I/O操作在线程池中等待执行，不管是否阻塞I/O，都不会影响到JavaScript线程的后续执行。

执行回调

回调通知，完成完整异步I/O的第二部分。

线程池中的I/O操作调用完毕后，会将结果存储在req -> reslut 属性上。然后调用 PostQueuedCompletionStatus(); 通知IOCP，告知当前对象操作已经完成：

PostQueuedCompletionStatus( (loop)->iocp, o, o, &(req)->overlappped )

PostQueuedCompletionStatus()作用： 向IOCP提交执行状态，并将线程归还给线程池。提交状态
GetQueuedCompletionStatus() 作用： 提取

每个Tick的执行中，会调用IOCP相关的GetQueuedCompletionStatus()方法检查线程池中是否有执行完的请求，如果存在，会将请求加入到I/O观察者的队列中，然后将其当作事件处理。

I/O观察者回调函数的行为： 取出请求对象的result属性作为参数，取出oncomlplete_sym属性作为方法，然后调用执行。以此达到调用JavaScript中传入的回调函数的目的。

非I/O的异步API

定时器
定时器： setTimeout(),setInterval()
调用setTimeout()或者setInterval()创建的定时器会被插入到定时器观察者内部的一个红黑树（作用：实现关联数组）中。
每次Tick执行时，会从该红黑树中迭代取出定时器对象，检查是否超过定时时间，如果超过，就形成一个事件，它的回调函数将立即执行。

定时器问题：并非精确的(在误差范围内)。如果某一次循环占用的时间较多。那么下次循环时，也许超时很久。
例如：setTImeout()设定一个任务在10毫秒后执行，但是9毫秒后，有一个任务占用了5毫秒的CPU时间片，再次轮到定时器时，时间就已经过期4毫秒。

process.nextTick()

process.nextTick(): 操作比较轻量，高效

会将回调函数放入队列中，在下一轮Tick时取出执行，每轮循环中会将数组中的回调函数全部执行完。

setImmediate()
setImmediate()与上者类似，但优先级低于process.nextTick()
原因：事件循环对观察者的检查是有先后顺序。 process.nextTick(); 属于idle观察者，setImmediate() 属于check观察者。
在每一轮循环检查中，idle观察者I/O观察者，I/O观察者先于check观察者

会将结果保存在链表中。每轮循环中执行链表中的一个回调函数。

process.nextTick(function () {
    console.log('nextTick延迟执行');
});
setImmediate(function () {
    console.log('setImmediate延迟执行');
});
console.log('正常执行');

// 执行结果
// 正常执行
// nextTick延迟执行
// setImmediate延迟执行

事件驱动和高性能服务器

事件驱动的本质：通过主循环加事件触发的方式来运行程序。

经典模型

    同步式

    一次只能处理一个请求，并且其余请求都处于等待状态。

    每进程/每请求

    每个请求启动一个进程，这样可以处理多个请求。
    缺点：不具备扩展性。(因为系统资源有限)

    每线程/每请求 (Apache)

    为每个请求启动一个线程来处理。
    优点：线程比进程要轻量
    缺点：每个线程都占用一定内存，当大并发请求到来时，内存会很快耗光，导致服务器缓慢。

    线程(程序执行流的最小单元)

进程(一段程序的执行过程)
一个进程中包括多个线程
异步编程
函数式编程

高阶函数

高阶函数：把函数作为输入或返回。作为参数或者返回值的函数

偏函数用法：创建一个调用另外一部分——参数或变量已经预置的函数——的函数的用法。
通过指定部分参数来创建一个新的函数的形式。
异步编程的优势与难点

优势
优势：基于事件驱动的非阻塞I/O模型
效果：非阻塞I/O可以是CPU与I/O并不相互依赖等待，让资源得到更好的利用。

难点

    异常处理

    异步I/O的实现主要包含两个阶段：提交请求和处理结果。
    这两个阶段中间有事件循环的调度，两者彼此不关联。
    异步方法则通常在第一阶段提交请求后立即返回，因为异常并不发生在这个阶段。

    函数嵌套过深

    阻塞代码

    多线程编程

    异步转同步

异步编程解决方案

事件发布/订阅模式
事件监听器模式：回调函数的事件化，又称发布/订阅模式 （钩子(hook)机制）

Node中的很多对象大多具有黑盒的特点，功能点较少。

事件发布/订阅模式自身并无同步和异步调用的问题。但在Node中，emit()调用多半是伴随着时间循环而异步触发。

如果对一个时间添加了超过10个侦听器，将会得到一条警告。(原因：侦听器太多可能导致内存泄漏)。可以通过 emitter.setMaxListeners(0); 去掉这个限制。
由于事件发布会引起一些列侦听器执行，如果事件相关的侦听器过多，可能存在过多占用CPU
的情形。

    继承events模块

util.inherits(constructor, superConstructor)
继承原型对象上的方法。

var events = require('events');
var util = require('util');

function Stream () {
    events.EventEmitter.call(this);
}

util.inherits(Stream, events.EventEmitter);

    利用事件队列解决雪崩问题

事件订阅/发布模式中，通常由一个once()方法。
作用：侦听器只能执行一次，在执行之后就会将它与事件的关联解除。
解决：过滤一些重复性的事件响应。

问题：缓存中存放在内存中，访问速度十分快，用于加速数据访问，让绝大所数的请求不必重复去做一些抵消的数据读取。
雪崩问题：高访问量，大并发量的情况下缓存失效的情景，此时大量的请求同时涌入数据库中，数据库无法同时承受如此大的查询请求。

解决方案：添加一个状态锁。

var proxy = new evnets.EventEmitter();
var status = 'ready';
var select = function ( cb ) {
    proxy.once('selected', cb);
    if ( status === 'ready' ) {
        status = 'pending';
        db.select('SQL', function ( results ) {
            proxy.emit('selected', results);    
            status = 'ready';
        });
    }
}
// 利用once() 方法，将所有请求的回调都压入事件队列中。保证回只会被执行一次。

Gearman异步应用框架中，利用noce()方法产生的效果。

    多异步之间的协作方案

事件与侦听器的关系是一对多，在异步编程中，会出现事件与侦听器的关系多对一的情况。
一个业务逻辑可能依赖两个通过回调或事件传递的结果。

问题：多个异步场景中的回调函数的执行顺序，且回调之间没有任何交集。(多对一)
解决办法：通过第三方函数和第三方变量来处理异步协作 -- 哨兵变量。

var after = function ( times, cb ) {
    
    var count = 0, resluts = {};
    
    return function ( key, value) {
        
        resluts[key] = value;
        
        count++;
        
        if ( coutn === times ) {
            
            cb(resluts);
            
        }
        
    }
    
}

哨兵变量和发布/订阅模式完成多对多方案

// 哨兵变量
var after = function ( times, cb ) {
    
    var count = 0, resluts = {};
    
    return function ( key, value) {
        
        resluts[key] = value;
        
        count++;
        
        if ( coutn === times ) {
            
            cb(resluts);
            
        }
        
    }
    
}

// 哨兵变量和发布/订阅模式完成多对多方案

var events = require('evnets');

var emitter = new events.Emitter();

var done = after(times, render);

emitter.on('done', done);
emitter.on('done', other);

fs.readFile(template_path, 'utf-8', function ( err, template ) {
    
    emitter.emit('done', 'template', template);
    
});

db.query(sql, function ( err, data ) {
    
    emitter.emit('done', 'data', data);
    
});


l1on.get(function ( err, resources ) {
    
    emitter.emit('done', 'resources', resources);
    
});

    EventProxy模块

all();来订阅多个事件，当每个时间都被触发后，侦听器才会执行。
tail(); 侦听器在满足条件之后只会执行一次。

场景：从一个接口多次读取数据，此时触发的事件名或许是相同的。

利用after();方法实现时间在执行多少次后执行侦听器的单一事件组合订阅方式。

var proxy = new EventProxy();

proxy.after('data', 10, function ( datas ) {
    // TODO
});    

    EventProxy原理

每个非all事件出发时都会触发一次all事件。

EventProxy是将all当作一个事件流的拦截层，在其中注入一些业务来处理单一时间无法解决的异步问题。

    EventProxy的异常处理

exports.getCountent = function ( cb ) {
    
    var ep = new EventProxy();
    
    ep.all('tpl', 'data', function ( tpl ,data ) {
        
        // 成功回调
        cb(null, {
            template: tpl,
            data: data
        });
        
    });
    
    // 绑定错误处理函数
    ep.fail(cb);
    
    fs.readFile('template.tpl', 'utf-8', ep.done('tpl'));
    
    db.get('some sql', ep.done('data'));
    
}

// EventProxy模块提供fail()和done();实例方法来优化异常处理。

Promise/Deferred模式

使用发布订阅模式缺点：使用事件的方式，执行流程需要被预先设定。

场景：先执行异步调用，延迟传递处理的方式。

    Promises/A

Promises/A：对单个异步操作抽象定义

    Promise 操作只会处在3中状态：未完成态，完成态和失败态。

    Promise 的状态只会出现从未完成态向完成态或失败态转化，不能逆反。完成态和失败态不能互相转化。
    Promise的状态一旦转化，将不能被更改。

Promises/A要求Promise对象只需具备then()方法即可。

    接受完成态，错误态的回调方法，在操作完成或出现错误时，将会调用对应方法。

    可选择支持progress事件回调作为第三个方法。

    then()方法之接受function对象，其余对象将被忽略。

    then()方法继续返回Promise对象，实现链式调用。

    then(fulfilledHandler, errorHandler, progressHandler);

    Node的events模块来完成Promise对象的then()方法

var util = require('util');
var events = require('events');

var Promise = function () {
    
    evennts.EventEmitter.call(this);
    
}

util.inherits(Promise, EventEmitter);

Promise.prototype.then = function ( fulfilledHandler, errorHandler, progressHandler ) {
    
    // 完成态
    if ( typeof fulfilledHandler === 'function' ) {
        
        this.once('success', fulfilledHandler);
        
    }
    
    // 失败态
    if ( typeof errorHandler === 'function' ) {
        
        this.once('error', errorHandler);
        
    }
    
    
    // 执行
    if ( typeof progressHandler === 'function' ) {
        
        this.on('progress', progressHandler);
        
    }
    return this;
}

Deferred 延迟对象：触发 Promise对象中满足条件的函数，并实现这些功能。

// Deferred
var Deferred = function () {
    
    this.state = 'unfulfilled';
    this.promise = new Promise();
    
}

// 实现完成态
Deferred.prototype.resolve = function ( obj ) {
    
    this.state = 'fulfilled';
    this.promise.emit('success', obj);
    
}

// 实现失败态
Deferred.prototype.reject = function ( err ) {
    
    this.state = 'failed';
    this.promise.emit('error', err);
    
}

Deferred.prototype.progress = function ( data ) {
    
    this.promise.emit('progress', data);
    
}

Deferred主要用于内部，用于维护异步模型的状态
Promise作用于外部，通过then()方法暴露给外部以添加自定义逻辑。
Promise/Deferred -- 响应对象

高级接口：不容易变化，不再有低级接口的灵活性。
低级接口：可以构成更多更负责的场景。

Q模块是Promises/A规范的一个实现

defer.prototype.makeNodeResolver = function () {
    
    var self = this;
    
    return function ( error, value ) {
        
        if ( error ) {
            
            self.reject(error);
            
        } else if ( arguments.length > 2 ) {
            
            self.resolve(array_slice(arguments,1));
            
        } else {
            
            self.resolve(value);
            
        }
        
    }

}

项目中使用：Q模块，和when来解决异步操作问题。它们是完整的Promise提议的实现。

var fs = require('fs');
var Q = require('Q');

var readFile = function ( file , encoding ) {
    
    var deferred = Q.defer();
    fs.readFile(file, encoding, deferred.makeNodeResolver());
    
    return deferred.promise; 
    
}

readFile('foo.txt', 'utf-8').then(function ( data ) {
    
    // success
    console.log( data );
    
}, function ( err ) {
    
    // error
    console.log('error:' , err);
    
});

    Promise中多异步协议

Promise解决的是：单个异步操作中存在的问题.

所有操作成功，这个异步操作才成功，一旦其中一个异步操作失败，整个一部操作就失败。

    Promise的进阶知识

Promise缺点：需要为不同的场景封装不同的API，没有直接的原生事件那么灵活。

Promise最主要的是处理队列操作。
支持序列执行的Promise

promise()
    .then(obj.api1)
    .then(obj.api2)
    .then(obj.api3)
    .then(function ( valu4 ) {
             // Do something with value4
    }, function ( error ) {

    })
    .done();

Promise支持链式执行步骤：
1：将所有的回调都存到队列中
2：Promise完成时，租个执行回调，一旦检测返回了新的Promise对象，停止执行，然后将当前Deferred对象的promise引用改变为新的Promise对象，并将队列中的余下的回调转交给它。

流程控制库

    尾触发与Next

尾触发：手动调用才能持续执行后续调用,关键字next
应用：Connect中间件中.Connect中间件传递请求对象，响应对象和尾触发函数，通过队列形成一个处理流。

// Connect的核心实现
function createServer () {
    
    function app ( req, res ) {
        app.handle(req,res);
    }
    
    utils.merge(app, proto);
    utils.merge(app, EventEmitter.prototype);
    
    app.route = '/';
    app.stack = []; // 核心代码
    // stack属性时服务器内部维护的中间件队列
    
    for ( var i=0; i<arguments.length; ++i ) {
        app.use(arguments[i]); //  调用use()可以 将中间件放入队列中
    }
    
    return app;
    
}

中间件这种尾触发模式并不是要求每个中间方法都是异步，但如果每步骤都采用异步来完成，实际上是串行化的处理。
流式处理将一些串行的逻辑扁平化。

串行化：将对象存储到介质(如文件，内存缓冲区等)中或是以二进制方式通过网络传输。然后需要使用的时候通过：反串行化从这些连续的字节数据重新构建一个与原始对象状态相同的对象。
作用：有时候，需要将对象的状态保存下来，在需要时再会将对象恢复。
对象通过写出描述自己的状态数值来记录自己，这个过程叫对象串行化。

    async

流程控制模块async

○异步的串行执行

series(); 实现一组任务的串行执行

var fs = require('fs');
var async = require('async');

// 异步串行执行
async.series([function (cb) {
    
    fs.readFile('foo.txt', 'utf-8', cb);
    
},function ( cb ) {
    
    fs.readFile('foo2.txt', 'utf-8', cb);
    
}],function ( err, resluts ) {
    
    console.log( resluts );
    
});

// series(); 方法中传入的函数cb();并非有使用者指定。此处的回调函数有async通过高阶函数的方式注入。每个cb();执行时会将结果保存起来，然后执行下一个调用，知道结束所有调用。最终的回调函数执行时，队列里的异步调用保存的结果以数组的方式传入。
// 异常处理规则:一旦出现异常，就结束所有调用，并将异常传递给最终回调函数的第一个参数。

○异步的并行执行
并行作用：提升性能

parallel(); 以并行执行一些异步操作。

var fs = require('fs');
var async = require('async');

// 异步的并行执行
async.parallel([function ( cb ) {
    
    fs.readFile('foo.txt', 'utf-8', cb);
    
},function ( cb ) {
    
    fs.readFile('foo2.txt', 'utf-8', cb);
    
}],function ( err, reslut ) {
    
    console.log( reslut );
    
});
// 通过注入的回调函数。
// parallel(); 对于异常的判断依然是一旦某个异步调用产生了异常，就会将异常作为第一个参数传递给最终的回调函数。
    

○异步调用的依赖处理
series(); 适合无以来的异步串行。
缺点：当前一个的结果是后一个调用的输入时。
使用:waterfall();

var fs = require('fs');
var async = require('async');

async.waterfall([function ( cb ) {
    
    fs.readFile('foo.txt', 'utf-8', function ( err, content ) {
        
        cb(err, content);
        
    });
    
},function ( arg1, cb ) {
    
    fs.readFile('foo2.txt', 'utf-8', function ( err, content ) {
        
        cb(err, content + arg1);
        
    });
    
}],function ( err, resluts ) {
    
    console.log( resluts );
    
});

○自动依赖处理
auto(); 根据依赖自动分析，以最佳的顺序执行业务。
实现复杂的依赖关系，业务中或是异步，或是同步。

var deps = {
    readConfig: function ( cb ) {
        cb();
    },
    connectMongoDB: ['readConfig', function ( cb ) {
        cb();
    }],
    connectRedis: ['readConfig', function ( cb ) {
        cb();
    }],
    complieAsserts: function ( cb ) {
        cb();    
    },
    uploadAsserts: ['complieAsserts', function (cb ) {
        cb();
    }],
    startup: ['connectMongoDB', 'connectRedis', 'uploadAsserts', function ( cb ) {
        // startup
    }]
}

async.auto(deps);

    Step

Step只有一个接口Step.
Step(task1, task2, task3);
Step接受任意数量的任务，所有任务都将会串行依次执行。

var Step = require('step');
var fs = require('fs');

Step(function readFile1() {
    
    fs.readFile('foo.txt', 'utf-8', this);
    
}, function readFile2( err, content ) {
    
    fs.readFile('foo2.txt', 'utf-8', this);
    
}, function done( err, content ) {
    
    console.log( content );
    
});

// Step使用到了this关键字，它是Step内部的一个next()方法，将异步调用的结果传递给下一个任务作为参数，并调用执行

○并行任务执行
parael();方法，告知Step需要等到所有任务完时才进行下一个任务。

var Step = require('step');
var fs = require('fs');

Step(function readFile1() {
    
    fs.readFile('foo.txt', 'utf-8', this.parallel());
    fs.readFile('foo2.txt', 'utf-8', this.parallel());
    
},function done( err, content1, content2 ) {
    
    console.log( arguments );
    
});
// 异常处理：一旦有一个异常产生，这个异常会作为下一个方法的第一个参数传入。

○结果分组
this.group();
将返回的数据保存在数组中
异步并发控制

原因：并发量过大，下层服务器将会吃不消。如果对文件系统进行大量并发调用，操作系统的文件描述符数量将会被瞬间用光。

bagpipe的解决方案

    通过一个队列来控制并发量

    如果当前活跃(指调用发起但为执行回调)的异步调用量小于限定值，从队列中取出执行。

    如果活跃调用达到限定值，调用暂时存放在队列中。

    每个异步调用结束时，从队列中取出心儿异步调用执行。

bagpipe中的push();和full事件
var Bagpipe = require('bagpipe');

// 设定最大并发数为10
var bagpipe = new Bagpipe(10);

for ( var i=0; i<100; i++ ) {
    
    bagpipe.push(async, function () {
        // 异步回调执行
    });
    
}

bagpipe.on('full', function ( length ) {
    
    console.warn('底层系统处理不能及时完成，队列拥堵，目前队列长度为：'+ length);
    
});

拒绝模式
作用：大量异步调用需要分场景，需要实时方面就快速返回。
在设定并发数时，参数设置为true

// 设定最大并发数为10
var bagpipe = new Bagpipe(10, {
    refuse: true
});

超时控制
原因：异步调用耗时太久，调用产生的速度远远高于执行的速度。防止某些异步调用使用太多的时间。
实现：将执行时间太久的异步调用清理出活跃队列。通过，设定时间阀值。
效果：排队中的异步调用越快执行。

var bagpipe = new Bagpipe(10, {
    timeout: 3000
});

async的解决方案
parallelLimit(); 处理异步调用的限制
缺点：无法动态增加并行任务。

var fs = require('fs');
var async = require('async');

async.parallelLimit([function ( cb ) {
    
    fs.readFile('foo.txt', 'utf-8', cb);
    
},function ( cb ) {
    
    fs.readFile('foo2.txt', 'utf-8', cb);
    
}], 1, function ( err, resluts ) { // 用于限制并发数量的参数，任务只能同时并发一定数量，而不是无限制并发
    
    console.log( resluts );
    
});

queue(); 处理异步调用限制，能够的动态增加任务。
一般用于：遍历文件目录等操作

var q = async.queue(function ( file, cb ) {
    fs.readFile('foo.txt', 'utf-8', cb);
}, 2);

q.drain = function () {
    
    // 完成对了中的所有任务
    
}

fs.readdirSync('.').forEach(function ( file ) {
    
    q.push(file, function ( err, data ) {
        
        // TODO
        
    });
    
});

内存控制
V8的垃圾回收机制与内存限制

JavaScript的垃圾回收机制是自动进行内存管理。

V8的内存限制

Node中通过JavaScript使用内存时只能使用部分内存(64位系统下约1.4GB,32位系统下约为0.7GB)
限制了无法操作大内存对象。

Node中使用的JavaScript对象基本上都是通过V8自身的方式来进行分配和管理。

V8为何限制了内存使用量，需要回归到V8在内存使用上的策略。

V8的对象分配

在V8中，所有的JavaScript对象都是通过堆来进行分配的。

查看内存信息：

var usage = process.memoryUsage();

console.log( usage );
// { rss: 17170432, heapTotal: 8384512, heapUsed: 3787248 }
// rss  headTotal 已经申请到堆内存，   heapUsed 当前使用量 // 单位：bytes

当代码中声明变量并赋值时，所使用对象的内存就分配在堆中。如果已经申请的堆空想内存不够分配新的对象，将继续申请堆内存，直到堆的代销超过V8的限制为止。

V8限制堆大小原因：

    V8最初为浏览器而设计，不太可能使用到大量内存的场景。

    V8垃圾回收机制的限制。

    1.5GB的垃圾回收堆内存为例，V8做一次小的垃圾回收需要50毫秒以上，做一次非增量式的垃圾回收甚至要1秒以上。这是垃圾回收中引起JavaScript线程暂停执行的时间，在这样的时间花销下，应用的性能和响应能力都会直线下降。考虑直接限制堆内存。

    Node可以在启动调节内存限制大小

node --max-old-spce-size=1700 test.js // 单位MB
node --max-new-spce-size=1024 test.js // 单位 KB
//  一旦生效就不能再动态改变。

V8的垃圾回收机制

1：V8主要的垃圾回收算法
V8垃圾回收策略主要基于分代式垃圾回收机制。
实际应用中,对象的生存周期长短不一，不同的算法只能针对特定情况具有最好的效果。

    V8的内存分代

在V8中，主要讲内存分为新生代和老生代。
新生代：对象为存活时间较短对象。 --max-new-space-size命令行参数设置 新生代内存空间大小（最大值：64位操作系统32MB,32位操作系统16MB）
老生代：对象为存活较长或常驻内存的对象。--max-old-spce-size命令行参数设置 老生代内存空间大小。(64位操作系统下：1400MB,32位系统700MB)

使用缺陷：在启动Node时就指定，无法根据V8内存使用情况自动扩充。

默认情况下，V8堆内存最大值：64位操作系统：1464MB，32位操作系统732MB。(4 * reserved_semispce_size + max_old_generation_size_)

○ Scavenge算法
新生代中的对象主要通过Scavenge算法进行垃圾回收。
Scavenge采用了：Cheney算法。

Cheney算法：复制的方式实现的垃圾回收算法。
将堆内存一分为二，每一部分空间成为semispce。这两个semispce空间中，只有一个处于试用，另一个处于闲置状态。处于使用状态的semispce空间称成为From空间。处于限制状态的空间成为To空间。

分配原则：分配对象时，显示在Form空间中进行分配，当开始进行垃圾回收时，会先检查From空间中的存活对象，这些存活对象将被复制到To空间中，而非存活对象占用的空间将被释放。完成赋值后，Form空间和To空间的角色发生对换。

垃圾回收的过程中，就是通过将存活对象在两个semispce空间之间进行复制。

Scavenge缺点：只能使用堆内存中的一半内存。
优点：时间效率高 (牺牲空间换取时间)
合适于新生代对象中，因为：新生代中的对象的生命周期比较短。

当一个对象进过多次赋值依然存活时，它将会被认为是生命周期较长的对象。会被转移到老生代中。采用新的算法进行管理。

From空间中的存活对象在复制到TO空间之前需要进行检查。在一定条件下，需要将存活周期长的对象移动到老生代中，也就是完成对象晋升。

晋升条件：

    经历一次Scavenge回收

    在默认情况下，V8的对象分配主要集中在From空间中，对象从From空间中复制到To空间时，会检查它的内存地址来判断这个对象是否已经经历过一次Scavenge回收。如果经历过了，就将该对象从From空间复制到老生代空间中，如果没有，则复制到TO空间中。

    To空间的内存占用比。

    当要从From空间复制一个对象到To空间时，如果To空间已经使用超过25%，则这个对象直接晋升到老生代空间中。(25%限制值的原因，当这个次Scavenge回收完成后，To空间将会变成From空间，接下来的内存分配将在这个空间中进行。)

○ Mark-Sweep & Mark-Compact

存活对象占用较大比重，采用Scavenge方式产生问题：
1：存活对象较多，复制存活对象的效率将会很低
2： 浪费一般空间的问题。

Mark-Sweep标记清除：标记和清除，两个阶段。
Mark-Sweep在标记阶段遍历堆中所有对象，并标记着活着的对象。在随后的清除阶段只清除没有被标记的对象。
产生问题：进行一次标记清除回收后，内存会出现不连续的状态。
原因：内存碎片会对后续的内存分配造成问题，很可能出现需要分配一个大对象的情况，所有的碎片空间无法完成此次分配。就会提前出发垃圾回收。

Mark-Compact 标记整理
解决：Mark-Sweep内存碎片问题。
对象标记死亡后，在整理的过程中，将或者对象往一端移动，移动完成后，直接清理边界的内存。
缺点：速度慢。

V8主要使用Mark-Sweep,在空间不足以对从新生代中晋升过来的对象进行分配时才使用Mark-Compact

○ Incremental Marking （增量标记）
全停顿：将应用逻辑展亭下来，待执行完来回收后再回复执行应用逻辑。

为了避免出现JavaScript应用逻辑与垃圾回收器看到的不一致的情况。三种垃圾回收机制都采用全停顿。

解决办法：增量标记
垃圾回收与应用逻辑交替执行直到标记阶段完成。
除了增量标记，V8还引入延迟清理，增量式清理。
让清理与整理动过也变成增量式。

V8对内存限制的设置对于Chrome浏览器这种每个选项卡页面使用一个V8实例而言，内存的使用时绰绰有余。
Node编写服务端来说，V8垃圾回收特点和JavaScript在单线程上的执行情况，垃圾回收时影响性能的因素之一。
高新能的执行效率，需要主要让垃圾回收尽量少的进行，尤其是全堆垃圾回收。

○ 查看垃圾回收日志

node --tarce_gc -e "var a = []; for (var i=0; i<1000000; i++) a.psuh(new Array(100))" > gc.log
// 垃圾回收日志信息

node --prof test.js
// 垃圾回收时所占用的时间

高效使用内存

作用域

在JavaScript中能形成作用域的有函数，width以及全局作用域。

var foo = function () {
    var local = {};
}

内存回收过程
foo(); 函数在每次被调用时会创建对应的作用域，函数执行结束后，该作用域将会销毁。
同时作用域中声明的局部变量分配在该作用域上，随着作用域的销毁而销毁。只被局部变量引用的对象存活周期较短。
由于对象非常小，将会分配在新生代的From空间中，在作用域释放后，局部变量的elocal失效，其引用的对象将会在下次垃圾回收时被释放。

    标识符查找

    与作用域相关的即是标识符查找。

    作用域链

    变量的主动释放。

    如果变量是全局变量，（不通过var声明或定义在global变量上），由于全局作用域需要直到进程退出才能释放，导致引用的对象常驻内存（常驻在老生代中）。如果需要释放常驻内存的对象，可以通过delete操作符删除引用关系。或者将变量重新赋值，让旧的对象脱离引用关系。
    在非全局作用域中，想主动释放变量引用的对象，也可以通过delete和重新赋值。但是V8中通过delete删除对象的属性有可能干扰V8的优化，通过赋值方式解除引用更好。

闭包

作用域链上的对象访问只能向上，外部无法向内部访问。
闭包：实现外部作用域访问内部作用域的中的变量的方法。
高阶函数特性：函数可以作为参数或者返回值。

闭包问题：
一旦有变量应用这个中间函数，这个中间函数将不会释放，同时也会使原始的作用域不会得到释放，作用域中产生的内存占用也不会得到释放。

