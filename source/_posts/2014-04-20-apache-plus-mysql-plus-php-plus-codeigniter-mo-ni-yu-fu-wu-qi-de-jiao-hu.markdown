---
layout: post  
title: "模拟与服务器的交互"  
date: 2014-04-20 02:20  
comments: true  
thumbnail: /img/avatar.jpg  
description: "最近接手一个项目，看demo算不上复杂，基本功能就是从服务器获取数据然后展示出来......"
categories: 
---  
    
#利用Apache/MySQL/PHP/codeigniter搭建虚拟环境

##为什么

最近接手一个项目，看demo算不上复杂，基本功能就是从服务器获取数据然后展示出来。以前做过类似的app，当时由于初次做这类前端和后端一块开发的项目，后端的进度直接影响了前端开发，导致留给我们这边开发和测试的时间都很紧，bug也肯定是层出不穷，最后勉强上线。

##怎么做

这次为了避免上次出现的窘况，决定前端后端一块搞。这里的意思并不是自己开发一个后台，首先对于菜鸟来说不现实，其次这时间也不允我这么搞。这里只是搭建个能返回测试数据的服务器。首先和后端的定好数据格式以及所需的接口，然后就是解决怎么模拟与服务器的交互问题。一通google，大致有两种方案：

1. 利用测试框架写测试用例
2. 搭建自己到服务器，返回需要的json或者xml

最终选择Apache＋PHP＋MySQL。本以为可以傻瓜式直接装[MAMP](http://www.mamp.info/en/)，结果安装到最后一步总是失败，试了各种方法[🔗][issue],[🔗][resolve]也没有解决问题，无意间看到这片[博文][blog],简略记录一下。

本文教程适用于第一次在Mac OS X Mavericks上安装Apache, PHP, 和 MySQL，或者从已经存在的版本更新到Mavericks。

因为Mac OS X 运行在 UNIX上，所以安装这些就相对容易很多，除此之外，系统缺省又包含了 Apache 和 PHP ，只需安装MySQL，然后简单使他们都处于开启状态。

首先在终端中切换到`root`，避免因为权限问题使以下命令不能正常运行

{% codeblock %}
sudo su -
{% endcodeblock %}

##### 启动Apache

{% codeblock %}
apachectl start
{% endcodeblock %}
打开<http://localhost>测试 It works!

##### 打开PHP

[issue]: http://forum.mamp.info/viewtopic.php?f=2&t=86116&p=104773&hilit=mavericks#p104773

[resolve]:http://www.gladdy.co.uk/blog/2013/06/16/mamp-pro-under-os-x-mavericks/

[blog]: http://jason.pureconcepts.net/2012/10/install-apache-php-mysql-mac-os-x/
