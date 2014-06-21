---
layout: post  
title: "为Octopress添加Category"  
date: 2014-06-20 18:29:46 +0800  
comments: true    
keywords: custom octopress,octopress category
categories: octopress    
thumbnail: img/octopress_logo.png
description: "导航栏添加自定义category列表."
excerpt: "前两天参考别人在侧边栏加category列表的方法给自己的博客添加个category导航。基本步骤..."  

---

导航栏添加自定义category列表

前两天参考别人在侧边栏加category列表的方法给自己的博客添加了category导航。     
##基本步骤  

[首先](class:label label-important)[:](class: hidden)在`plugins/`路径下添加`category_list_tag.rb`文件    

{% include_code category_list_tag.rb%}      
  
[其次](class:label label-info)[：](class: hidden)jekyll的插件`category_generator.rb`默认在创建categories目录时是不存在`index.html`索引文件的，因为她无法知道你每次创建category的路径地址，所以我们只能手动在`source/blog/categories/`路径下创建`index.html`文件  

{% codeblock lang:html index.html%}---
layout: page
title: Categories
footer: false  

---

<div>
   <ul id="categories">
    ｛％ category_list ％｝<!--此处是中文输入，不要直接复制-->
   </ul>
</div>
{% endcodeblock%}  
  

[最后](class: label label-success)[：](class: hidden)在`source/_includes/custom/navigation.html`中加如下代码：  
  
{% codeblock lang:html%}
<li><a href="{{ root_url }}/blog/categories">Categories</a></li>
{% endcodeblock%}      

现在就可以为博客归一下类了
{% codeblock lang:html%}
---
layout: post  
title: "为Octopress添加Category"  
date: 2014-06-20 18:29:46 +0800  
comments: true  
categories: octopress
---
{% endcodeblock%}     

---    
  
## 
[Build Failed](class:label label-warning)关于第一次`rake generate` 遇到的
`Liquid Exception: incompatible encoding regexp match (ASCII-8BIT regexp with UTF-8 string) in index.html`问题，原因是正则字符串以`ASCII-8BIT`被编译，只需在`category_list_tag.rb`文件头部加上如下声明，当Ruby在语法分析时，你代码中每一个字符(包括正则，字符串等等)都会被设定为`UTF-8`编码：
{%codeblock lang:rb%}# encoding: utf-8{%endcodeblock%}

参考:  
[链接1](http://wangzz.github.io/blog/2014/04/28/custom-your-octopress-blog/) , [链接2](http://codemacro.com/tags/octopress/) , [链接3](http://stackoverflow.com/questions/9857443/ruby-regex-error-incompatible-encoding-regexp-match-ascii-8bit-regexp-with-utf)    

##  
#关于中文category  
  
上面的流程走完之后，于是顺手给一篇文章加了个中文名称的分类，WTF，文件路径都正确就是，索引文件也有，就是找不到。仔细观察url发现category的url没有被读取为`字符串`－`字符串`而是直接以实际的形式(即中文编码后的格式)链接过去，但实际public/blog/categories/下各个子分类都是以`字符串`－`字符串`的命名存储的，这也就是为什么找不到目录下的索引文件。知道原因，这样问题就好办了。首先我选择了最笨的办法就是找到那篇博文的[主人](http://weibo.com/foogry/profile?s=6cm7D0)直接问人家，然后就没有然后了......  
  
好吧只能靠自己了，url读取问题应该是出在正则表达式上，打开`category_list_tag.rb`文件，也找到正则这句  

{% codeblock lang:rb%}
category_url = File.join(category_dir, category.gsub(/_|\P{Word}/, '-').gsub(/-{2,}/, '-').downcase)
{%endcodeblock%}    

好吧，大致没看懂，但它确实是把category的名字完全匹配到了，这里是不是有个汉字转拼音的插件就可以解决问题呢？Google一下你就知道了。还真有[ruby-pinyin](https://github.com/janx/ruby-pinyin)，看起来好复杂。再看看还有别的筏子吗，打开`plugins/category_generator.rb`文件，看看它到底是肿么把汉字转成`字符串`－`字符串`格式的路径的，看到这句时眼前突现了日出东山的万丈光芒：  

{% codeblock start:111 %}self.write_category_index(File.join(dir, category.to_url), category)
{% endcodeblock%}  

看样子`category.to_url`应该就是干这个活儿的，那么用它把`category_list_tag.rb`中的正则替换掉应该是能行，下面是修改后的样子：

{% codeblock lang:rb category_list_tag.rb %}
#category_url = File.join(category_dir, category.gsub(/_|\P{Word}/, '-').gsub(/-{2,}/, '-').downcase)  
category_url = File.join(category_dir, category.to_url)
{% endcodeblock%}
  
新问题：codeblock没法使用`start:# ` `mark:#,#-#`