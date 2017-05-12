(function () {
    "use strict";
    // default configuration
    $.fn.orca_pager_config = {
        elements: {
            header: null,
            //data: null,
            footer: null
        },
        pagenumber: 0,
        pagesize: 10,
        pagestyle: "list",
        onupdate: function (data) { }
    };

    $.fn.orca_pager_init = function (config) {  //页面初始化方法
        $(this).addClass("orcapagertop");
        // merge current config and default config
        var curconfig = {};

        for (var i in $.fn.orca_pager_config) {
            curconfig[i] = $.fn.orca_pager_config[i];
        }
        for (var i in config) {
            curconfig[i] = config[i];
        }
       
        // save config into header element. 
        $(this).data("config", curconfig);  //向所选元素中添加数据


        //$(curconfig.elements.header).data("pager-top", $(this));
        //$(curconfig.elements.footer).data("pager-top", $(this));

        // update data content
        $(this).orca_pager_update(curconfig.pagenumber);
       // $.orcatable = $(this);
        return $(this);
    };

    $.fn.orca_pager_getroot = function (e) {
        if (e == null || e == undefined) e = this;
        return $($(e).closest(".orcapagertop")[0]);
    }
  
    $.fn.orca_pager_update = function (pn, ps) {
        if (ps != null) {
            $(this).orca_pager_getroot().data("config").pagesize = ps;      //如果为页数传递参数则赋值
        }
        else {
            ps = $(this).orca_pager_getroot().data("config").pagesize;      //否则将默认值传给ps
        }
        var config = $(this).orca_pager_getroot().data("config");   //获取列表参数
        config.pagenumber = pn;                                     //页数赋值
        var _mergedPostData = {
            pagenumber: pn,
            pagesize: config.pagesize
        };
        var _postdata = config.postdata();
        for (var key in _postdata) {
            _mergedPostData[key] = _postdata[key];      
        }
        if (config.sortfield != null)                                   
        {
            _mergedPostData['sortfield'] = config.sortfield;            //赋值排序字段
            _mergedPostData['sortdirection'] = config.sortdirection;    //赋值排序顺序
        }
       
        var pageOption = "";                                            //页数选项
        if (config.pagestyle == "grid") {
            pageOption += "<option value='12'>12</option>";
            pageOption += "<option value='24'>24</option>";
            pageOption += "<option value='36'>36</option>";
            pageOption += "<option value='48'>48</option>";
        } else if (config.pagestyle == "list_l") {            
            pageOption += "<option value='50'>50</option>";
            pageOption += "<option value='100'>100</option>";
            pageOption += "<option value='200'>200</option>";
        }
        else {
            pageOption += "<option value='10'>10</option>";
            pageOption += "<option value='20'>20</option>";
            pageOption += "<option value='50'>50</option>";
            pageOption += "<option value='100'>100</option>";
        }

        var ph = "<div class='row datatables-header form-inline'>";
        ph+="<div class='col-sm-4 col-md-6 mt-md'>";
        ph+="<label>";
        ph += "总计" + "<span style='color:red' class='page-count'></span>" + "条";
        ph+="</label>";
        ph+="</div>";
        ph+="<div class='col-sm-8 col-md-6 table-showing-per-page' >";
        ph+="<label>";
        ph += "第" + "<span style='color:red' class='page-current'></span>/ <span class='page-total'></span>" + "页";
        ph += "，每页显示<select class='datatables-pagesize' aria-controls='datatable-tabletools'onchange='$(this).orca_pager_update(0,$(this).val())'>";

        ph += pageOption;                       //页数选择项

        ph+="</select>";
        ph += "条";  
        ph+="</label>";
        ph+="</div>";
        ph+="</div>";
        config.elements.header.html(ph);        //表格头部嵌入html
        if (ps != null)
        {
            config.elements.header.find(".datatables-pagesize").val(ps);  //这里给每页显示多少条赋值
        }
        var pf = "<div class='col-sm-6 col-md-6 pull-right'>";
        pf+="<div class='paging_bs_normal'>";
        pf+="<ul class='pagination' style='cursor:pointer'>";
        pf+="</ul>";
        pf+="</div>";
        pf+="</div>";

        config.elements.footer.html(pf);   //表格尾部嵌入html
        config.elements.footer.addClass("orcapagerfooter");     //表格尾部添加样式
        $.ajax({
            //elem: $(this),
            config: config,
            url: config.url,            //从config中获取url
            data: _mergedPostData,      //请求参数就是 合并好的请求参数
            type: "get",
            dataType: 'json',
            cache: false,
            success: function (msg) {
                
                //this.elem.data("config").total = msg.total;
                //this.elem.data("config").totalpages = Math.ceil(this.elem.data("config").total / this.elem.data("config").pagesize);
                var pagesize = config.pagesize;
                var total = msg.total;
                var pagetotal = Math.ceil(total / pagesize)
                $(config.elements.header).find(".page-count").text(total);                        //总记录数赋值
                $(config.elements.header).find(".page-current").text((total == 0 ? 0 : pn + 1));  //当前页赋值
                $(config.elements.header).find(".page-total").text(pagetotal);                    //总页数赋值
               
                var pagi = $(config.elements.footer).find(".pagination");       //在表格中找 尾部 ul
                $(pagi).empty();    //先清空在赋值
                $(pagi).append("<li><a onclick='$(this).orca_pager_update(0)'><span class='fa fa-angle-double-left'></span></a></li>");  //首页按钮
                $(pagi).append("<li><a onclick='$(this).orca_pager_update(" + (config.pagenumber - 1) + ")'><span class='fa fa-angle-left'></span></a></li>");  //上一页按钮
                
                var pagefirst = 0;      
                var pagelast = 0;
                if (config.pagenumber <= 2)//最前段
                {
                    pagefirst = 0;
                    pagelast = 4;
                }
                else if (config.pagenumber + 3 >= pagetotal)//中間段
                {
                    pagefirst = pagetotal-5;
                    pagelast = pagetotal - 1;
                    if (pagefirst < 0)
                        pagefirst = 0;
                }
                else//最末段
                {
                    pagefirst = config.pagenumber - 2;
                    pagelast = config.pagenumber + 2;
                }
            
           
                for (var i = pagefirst ; i <= pagelast ; i++)
                {
                    if (i == pagetotal) break;
                    var classactive = "";
                    if (i == config.pagenumber)
                        classactive = "class='active'";
                    $(pagi).append("<li " + classactive + "><a onclick='$(this).orca_pager_update(" + i + ")'>" + (i + 1) + "</a></li>");   //显示当前第几页

                }

                $(pagi).append("<li><a onclick='$(this).orca_pager_update(" + (config.pagenumber + 1) + ")'><span class='fa fa-angle-right'></span></a></li>");   //下一页
                $(pagi).append("<li><a onclick='$(this).orca_pager_update(" + (pagetotal - 1) + ")'><span class='fa fa-angle-double-right'></span></a></li>");    //最后一页
              
                if (config.pagenumber == 0)     //当前页数等于0
                {
                  
                    $(pagi).children().slice(0, 2).addClass("disabled");            //slice() 把匹配元素集合所见为指定的指数范围的子集，这里获取前两个li 添加 disable 样式                             
                    $(pagi).children().slice(0, 2).find("a").prop('onclick', null).off('click');  //将 li 元素内的 a 标签的 onclick 事件复制为空并取消其 click 事件
                }
                
                if (config.pagenumber + 1 == pagetotal || pagetotal == 0) { //如果总页数等于0
                   
                    $(pagi).children().slice(-1).addClass("disabled");  //传为负值则获取集合从结尾开始的一个位置
                    $(pagi).children().slice(-2).addClass("disabled");
                    $(pagi).children().slice(-1).find("a").prop('onclick', null).off('click');
                    $(pagi).children().slice(-2).find("a").prop('onclick', null).off('click');  //取消这些个事件
                }
                // call back to update data display
                config.onupdate(msg.data, pn, ps);  //对config执行更新
            }
        });
    };

    $.fn.orca_pager_setpagestyle = function (style) {       //这里可以设置风格
        if(style=="grid")
        {
            $(this).orca_pager_getroot().data("config").pagesize = 12;
            $(this).orca_pager_getroot().data("config").pagestyle = "grid";
        }
        else if (style == "list_l") {
            $(this).orca_pager_getroot().data("config").pagesize = 50;
            $(this).orca_pager_getroot().data("config").pagestyle = "list_l";
        }
        else {
            $(this).orca_pager_getroot().data("config").pagesize = 10;
            $(this).orca_pager_getroot().data("config").pagestyle = "list";
        }
    }
    //$.fn.gopage = function (number)
    //{
    //    $("#sticky-page-header1").orca_pager_update(number, $(this).data("config").pagesize);
    //}
})();
//function gopage (e,number)
//{
//    var root = $($(e).closest(".orcapagerfooter")[0]).data("pager-top");
//    root.orca_pager_update(number, root.data("config").pagesize);
//}