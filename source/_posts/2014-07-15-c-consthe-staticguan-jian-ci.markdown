---
layout: post  
title: "C:const和static关键词"  
date: 2014-07-15 09:41:25 +0800  
comments: true  
keywords: const, static  
thumbnail:   
lettrine:   
excerpt:       
categories: C/C++  
  
---

##简单比较：  
            
const修饰的变量值一旦设置就不能再改变。  
static变量的生命周期存在于程序的整个执行过程，变量值只在程序启动之前初始化一次。所有的static变量如果没有准确的被赋值也会被初始化，初始化的方式和时间都不确定。  
    
##  
    
const与pointers  
 
```
char * const str = "hello world";
const char * str = "hello, world";
```
  
