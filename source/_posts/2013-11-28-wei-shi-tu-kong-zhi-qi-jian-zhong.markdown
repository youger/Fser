---
layout: post  
title: "[译]为视图控制器减重"  
date: 2013-11-28 12:10  
comments: true  
thumbnail: /img/avatar.jpg  
keywords: iOS, refactor, reuse, 重构, 复用  
description: "在iOS项目中ViewController经常是最大的文件，而且还包含了很多不必须的代码......"  

categories: 翻译  

---  

原文地址：[链接](http://www.objc.io/issue-1/lighter-view-controllers.html)

原文作者：[Chris Eidhof](http://twitter.com/chriseidhof)

在iOS项目中ViewController经常是最大的文件，而且还包含了很多不必须的代码。不仅如此，在整个项目中ViewController还常常是代码复用最少的部分。接下来我们学习一下为ViewController减重的技巧，提高代码的可重用性，把代码放置更恰当的位置。

##分离数据源(Data Source)和其他协议(Protocols)

把UITableViewDataSource部分从你的代码中挪到它自己的类里。假如你不止一次的这样做，你将开始接触设计模式和为此创建可复用的类。

例如，在我们的[例子](https://github.com/objcio/issue-1-lighter-view-controllers)中PhotosViewController类有下面的方法：

{% codeblock lang:objc title:PotosViewController.m %}
#pragma mark Pragma

- (Photo*)photoAtIndexPath:(NSIndexPath*)indexPath {
    return photos[(NSUInteger)indexPath.row];
}

- (NSInteger)tableView:(UITableView*)tableView
 numberOfRowsInSection:(NSInteger)section {
    return photos.count;
}

- (UITableViewCell*)tableView:(UITableView*)tableView
        cellForRowAtIndexPath:(NSIndexPath*)indexPath {
    PhotoCell* cell = [tableView dequeueReusableCellWithIdentifier:PhotoCellIdentifier
                                                      forIndexPath:indexPath];
    Photo* photo = [self photoAtIndexPath:indexPath];
    cell.label.text = photo.name;
    return cell;
}
{% endcodeblock %}

这些代码中许多都和数组有关，其中一些提供ViewController管理的照片。那么让我们试一下把和数组相关的代码挪到它自己的类中。我们通过块(block)来配置cell(也可以通过委托(delegate)来设置，取决于你自己的情况和偏好)。

{% codeblock lang:objc title:ArrayDataSource.m %}
@implementation ArrayDataSource

- (id)itemAtIndexPath:(NSIndexPath*)indexPath {
    return items[(NSUInteger)indexPath.row];
}

- (NSInteger)tableView:(UITableView*)tableView
 numberOfRowsInSection:(NSInteger)section {
    return items.count;
}

- (UITableViewCell*)tableView:(UITableView*)tableView
        cellForRowAtIndexPath:(NSIndexPath*)indexPath {
    id cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier
                                              forIndexPath:indexPath];
    id item = [self itemAtIndexPath:indexPath];
    configureCellBlock(cell,item);
    return cell;
}

@end
{% endcodeblock %}

你可以创建这个对象的实例，把它作为表格视图的数据源来取代在你ViewController的那三个方法

{% codeblock lang:objc %}
void (^configureCell)(PhotoCell*, Photo*) = ^(PhotoCell* cell, Photo* photo) {
   cell.label.text = photo.name;
};
photosArrayDataSource = [[ArrayDataSource alloc] initWithItems:photos
                                                cellIdentifier:PhotoCellIdentifier
                                            configureCellBlock:configureCell];
self.tableView.dataSource = photosArrayDataSource;
{% endcodeblock %}

现在你不用在考虑筹划索引路径(index path)在数组中的位置，每次你想要在表视图中展示一个数组的内容你都可以重用这部分代码。你还可以额外实现像`tableView:commitEditingStyle:forRowAtIndexPath: `这样的方法，在你的ViewController中共用这些代码。

美妙的是你可以单独的测试这个类而不用考虑重新在写。假如数据不是数组这个方法同样适用。
