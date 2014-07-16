---
layout: post  
title: "自定义UINavigationBar出现的问题"  
date: 2014-07-09 16:51:15 +0800  
keywords: UINavigationBar, CocoaPods  
comments: true  
categories: iOS  
thumbnail: img/pencil.jpg  
description: 自定义UINavigationBar出现的问题  
excerpt: 今天就遇到因为不同的适配方法带来的UI问题。主项目通过继承导航控制器…… 

---  

多人协作做一个项目，由于不同的工程文件配置，自定义化的控件，不同的设计模式等等在合并代码的时候不可避免会出现各种各样的冲突。  

##  

近期就因为一个比较急项目和同事共同做一个项目，首先遇到的问题就是svn中工程文件冲突，后来借鉴[花瓣客户端的开发模式](http://limboy.me/tech/2014/03/23/huaban-app-redesign.html)，每个人负责一个或多个模块，分别自建各自的工程，最后利用[CocoaPods](http://cocoapods.org)串联在一起。主项目中Pods项目最终会编译成.a的库文件，而Pods中的资源文件被复制到目标目录，所以问题到此并没有结束。

像Pods中调用`+nibWithNibName:bundle:`方法就会因为找不到nib文件崩溃（iOS6上），直接迁移的`Images.xcassets`资源文件pods库就找不到相应的图片([issues#1549](https://github.com/CocoaPods/CocoaPods/issues/1549))。因为要兼容6和7，而适配6和7的方法又有很多种，如果主项目和子项目用的方法不一致也可能会导致UI错乱。    
  
##  

今天就遇到因为不同的适配方法带来的UI问题。主项目通过继承导航控制器（UINavigationController），自定义背景和`tintColor`实现基础控制器，通过设置`translucent`属性为NO实现根视图坐标和iOS6一致。而我在子项目利用[Auto Layout实现坐标的适配](http://www.bignerdranch.com/blog/designing-interfaces-ios-6-ios-7/)。最终就出现了子项目中所有的UI布局都和预期不一致。关于`translucent`属性，假如设置为透明，导航控制器的rootViewController的视图布局起始坐标在UINavigationBar之下，反之，则从屏幕左上角起始。
