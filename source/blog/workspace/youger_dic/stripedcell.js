window.onload = colorRows;
function colorRows() {
       var myDD = document.getElementsByTagName('dd');
       for (var i=0;i<myDD.length;i++) {
               if (!(i%2) ){
                       myDD[i].className = 'rowTint';
               }
       }
}

// 2014-05-16, LiYou added
$(document).ready(function(){

                  //initData(myJsonData);
                  open_closeHandler();
                  toggleBox();
                  load_more_sentence();
                  });

function toggleBox(){

	$('.title').bind("click", function(){
	    var This=$(this);
		var list_on=This.next();
		var open_on=function(){
			list_on.toggle();
			var pos_top = This.position().top;
			$("body").animate({scrollTop: pos_top}, 500);
		}
    var className = This[0].children[0].children[0].className;
    if(className == "icon-angle-down"){

        className = "icon-angle-down";

    }else{

        className = "icon-angle-up";
    }
    This[0].children[0].children[0].className = className;
		open_on();
	});
}

function open_closeHandler() {
	var toggleFlag = false;

	$("#more-exp-button").bind("click", function() {
                               toggleFlag = !toggleFlag;
                               $(".title").each(function(){
                                                var This=$(this);
                                                var list_on=This.next();
                                                var open_on=function(){
                                                list_on.toggle(toggleFlag);
                                                }
                                                var className = "icon-angle-down";
                                                if(toggleFlag){

                                                    className = "icon-angle-up";
                                                }
                                                This[0].children[0].children[0].className = className;
                                                open_on();
                                                });
                               });
}

function load_more_sentence() {

  $( document ).ajaxComplete(function() {
    combine_more_cases(MyMoreDataJson);
  });

  $("#more-sentence-button").bind("click", function() {

    // $.ajax({
    //   url: "data.js",
    //   context: document.body
    // }).done(function(data) {
    //   //$( this ).append( data );
    // });

    //same origin policy
    // $.get( "http://dic.kingyee.com/search/searchSentences.do",
    //     { token:"kingyee",keyword:"test", start:"1", num:"3"},
    //     function(data, textStatus, jqXHR){
    //         combine_more_cases(data);
    //     });
  });
}

function initData(json_data) {
  //数组
  var j_items = json_data.data.items;
  var div_contents=$('#more-network');
  div_contents.empty();
  for(i in j_items) {
        div_contents.append("<div class='title'><a>"+j_items[i].dicName+"</a><i class=\"icon-angle-up\"></i></div><div style='display:none'>"+j_items[i].expl+"</div>");
  }
  var T = this;

  open_closeHandler();

  $("#sentence-title").hide();
  $("#sentence_contents").empty();

  //init_more_cases(MyMoreDataJson);
}

// 下载更多例句
function combine_more_cases(json_data) {
  if(json_data.data.count == 0) {
    return;
  }
  var m_cases = json_data.data.items;
  var m_page = json_data.data.nowPage;
  var isLast = 0;
  if((json_data.data.rowsPerPage*m_page) >= json_data.data.count) {
    isLast = 1;
  } else {
    isLast = 0;
  }

  var div_example_list = $("#sentence-title");
  var div_example_contents = $("#sentence-contents");
  var div_more = $("#more-sentence-button");
  if(m_cases) {

    div_example_list.show();
    div_example_contents.show();
    div_more.show();

    for(i in m_cases) {
      div_example_contents.append('<DIV><DIV style="margin:0px 0px 0px 10px"><DIV style="float:left"><img src="./sentence.png" width="10" height="10" >&nbsp;</DIV><DIV style="margin:0px 8px 0px 18px; font-size:16px;">'
                                        + m_cases[i].word
                                        +'</DIV><DIV style="margin:0px 8px 0px 18px; font-size:16px;">'
                                        + m_cases[i].expl
                                        +'</DIV></DIV><br></DIV>');
    }
    div_more.attr("page",m_page);
    if(isLast == 1) {
      div_more.hide();
    } else {
      div_more.show();
    }
  }
}

function more_cases() {
  combine_more_cases(MyMoreDataJson);
  //window.wordDetail.moreCaseList($("#div_more").attr("page")+"");
}
//
