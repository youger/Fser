---
layout: post  
title: "C:const和static关键词"  
date: 2014-07-15 09:41:25 +0800  
comments: true  
keywords: const, static  
thumbnail: img/book2.jpg  
descriptions: const和static关键词  
excerpt: const修饰的变量值一旦设置就不能再改变。static变量的生命周期存在于程序的整个执行过程，变量值只在程序启动之前初始化一次。  
categories: C/C++  

---

[简单比较](class:label label-info)  

`const`修饰的变量值一旦设置就不能再改变。  
`static`变量的生命周期存在于程序的整个执行过程，变量值只在程序启动之前初始化一次。所有的static变量如果没有准确的被赋值也会被初始化，初始化的方式和时间都不确定。  

##  

[const与pointers](class:label label-info)  
指针常量，str不能再被其他指针赋值，但是str所指值可以改变。例如，声明指针常量`char * const str = "hello world";`  
```c
//试图改变指针值，错误
char * hello = "hello, universe";   //ERROR
char * const str = "hello, world";  //ERROR
str = hello;                        //ERROR
//
//指针所指的值可以被更改
char * const str = strdup( "hello, world" );  //Correct
str[ 0 ] = 'a';                               //Correct
//
```  
声明char类型常量的指针`const char * str = "hello, world";`与上述正好相反，指针可以指向其他变量，但是不能改变指针所指的值。  

##  

[static的两种含义](class:label label-info)  

- 在函数内部声明，static变量的被初始化一次，之后一直存在直至程序结束。例，与普通局部变量的区别  

``` c
#include <stdio.h>
void foo( void ){

	int x = 0;
	printf( "X - foo: %i\n", x );
	x++;
}
void bar( void ){

	static int x = 0;
	printf( "X - bar: %i\n", x );
	x++;
}
int main( void ){

	foo();
	foo();
	foo();
	bar();
	bar();
	bar();
	return 0;
}
```  
输出结果：  
{% blockquote%}  
X - foo: 0  
X - foo: 0  
X - foo: 0  
X - bar: 0  
X - bar: 1  
X - bar: 2  
{% endblockquote %}  

- 在函数外部声明，创建文件内的(file scoped)全局私有变量，也就是说外部其他文件不能获得static修饰的全局变量的值。

##  

[C++中的static](class:label label-info)  
在C++中声明的static成员变量只能通过类调用，其值为所有该类的实例所共用  
```c++
public class Test
{
    public static int test;
}
Test myTestObject=new Test();
myTestObject.test=2; //ERROR
Test.test=2;         //Correct
```  

##  

参考:  

1. [C: const and static keywords][link1],  
2. [What is the difference between a static and const variable?][link2],  
3. [Static(C++)][link3],  
  
[link1]: http://www.noxeos.com/2011/07/29/c-const-static-keywords/  

[link2]: http://stackoverflow.com/questions/2216239/what-is-the-difference-between-a-static-and-const-variable

[link3]: http://msdn.microsoft.com/en-us/library/s1sb61xd%28VS.80%29.aspx
