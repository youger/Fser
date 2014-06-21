---
layout: post  
title: "iOS应用崩溃日志揭秘"  
date: 2013-11-11 10:49
comments: true  
thumbnail: /img/avatar.jpg
keywords: iOS, crashlytics    
description: "最近收到用户反馈说新版本词典存在闪退问题，和PM各种测试也没发现闪退......"  
categories:  

---
最近收到用户反馈说新版本词典存在闪退问题，和PM各种测试也没发现闪退，苹果后台也确实收集到一些crash的报告，借此机会打算手动去分析下已有的崩溃日志报告，打开这些`.crash`文
件，满篇天书，Google了一下还是找到有不少关于分析崩溃报告的教程，参考RW[iOS应用崩溃日志揭秘](http://www.raywenderlich.com/zh-hans/30818/ios应用崩溃日志揭秘)，
教程。
后来通过这篇[博文](http://blog.devtang.com/blog/2013/07/24/use-crashlytics/)了解到[crashlytics](http://try.crashlytics.com),在线收集用
户的crash log的工具。
