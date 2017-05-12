function orca_sticky_table(div, meta) {
    //header
    $(div).empty();     //清空 div
    $(div).parent().children("table").remove(); 
    $(div).addClass("sticky-header-table"); //添加样式
    var root = ($(div).orca_pager_getroot != null) ? $(div).orca_pager_getroot() : null;
    var table = "<table class='overflow-y table-bordered table-striped mb-none'>";
    var columns = meta.columns;  //获取列信息
    var nodatastring = (meta.nodatastring) ? meta.nodatastring : "没有数据了";   
    table += "<thead><tr>";
    for (var i = 0 ; i < columns.length ; i++)
    {
        var thead = columns[i].title        //获取每一列的标题
        if (root != null && root.data("config") != null && columns[i].sortable != false && columns[i].field != null) {
            var sortdirection = ""; //声明排序顺序
            
            if (root.data("config").sortdirection != null && root.data("config").sortfield == columns[i].field)
                sortdirection = "fa-sort-" + root.data("config").sortdirection;
            else if (root.data("config").sortfield == null && columns[i].defaultSort != null)
                sortdirection = "fa-sort-" + columns[i].defaultSort;
            thead = "<a href='javascript:;' onclick='orca_sticky_table_sort(this,\"" + columns[i].field + "\")'>" + thead + "<i class='fa fa-sort " + sortdirection + "'></i></a>";
        }
        var w = "";
        if (columns[i].width != null) {//若有預設欄位的寬度
            w = " style='width:" + columns[i].width + "' ";
        }

        if (columns[i].minWidth != null) {//若有預設欄位的寬度
            w = " style='min-width:" + columns[i].minWidth + "' ";
        }
        table += "<th " + w + ">" + thead + "</th>";
    }

    table += "</tr></thead></table>";
    $(div).append(table);       //表头赋值
    var data = meta.data;
   
    var tablesrc = $(div).find("table").clone();

    $(div).after(tablesrc.addClass("stickytb_src").hide());
    $(div).empty();
    $(tablesrc).clone().show().addClass("stickytb").appendTo(div);
    
    $(div).find(".stickytb > tbody").empty();
    $(div).find(".stickytb").find("thead").after("<tbody></tbody");
    var fixpage = (root != null && root.data("config") != null) ? root.data("config").pagenumber * root.data("config").pagesize : 0;
    for (var i = 0 ; i < data.length ; i++) {                               //循环行 获取表
        var $trObject = $("<tr></tr>");                                     
        for (var j = 0 ; j < columns.length ; j++)                          //循环列 获取一行
        {
            var td = "td";
            if (j < meta.stickyable_columns_count)
                td = "th";

            var css = "class='text-left'";
            if (columns[j].align == 'center')
                css = "class='text-center'";
            if (columns[j].align == 'right')
                css = "class='text-right'";

            var $tdObj = $("<" + td + " " + css + "></"+td+">");
            if (columns[j].render != null) {
                $tdObj.append(columns[j].render(data[i], i + fixpage));     //这是处理自定义返回的值

            } else  if (columns[j]['field'] != null) {
                $tdObj.append(data[i][columns[j]['field']]);                //这是返回读取的json字段的值
            }        
           
            $trObject.append($tdObj);                                       //追加到 td 或 th 中
        }        
      
        $(div).find(".stickytb > tbody").append($trObject);                 //for循环中将 tr 追加到 tbody 中
    }
    if (data.length == 0)                                                   //没有数据的情况
    {
        $(div).find(".stickytb > tbody").append("<tr><td colspan='" + columns.length + "' class='text-center'>" + nodatastring + "</td></tr>");
    }
    
    //$("#stickydiv").height(836);
    orca_sticky_table_setup($(div).find(".stickytb"), meta.stickyable_columns_count);
   
    $(div).parent().hide().fadeIn("slow");
    //debugger;
}
function orca_sticky_table_sort(e, field)
{
    var root = $(e).closest(".sticky-header-table").orca_pager_getroot();
    root.data("config").sortfield = field;
    if (root.data("config").sortdirection != "asc") {
        root.data("config").sortdirection = "asc";
       // $(e).find("i").removeClass("fa-sort-desc").addClass("fa-sort-asc");
    }
    else {
        root.data("config").sortdirection = "desc";
      //  (e).find("i").removeClass("fa-sort-asc").addClass("fa-sort-desc");
    }
    root.orca_pager_update(0);
}
function orca_sticky_table_setup(table, _stickyable_columns_count) {
    table.each(function () {
        if ($(this).find('thead').length > 0 && $(this).find('th').length > 0) {
            // Clone <thead>
            var $w = $(window),
                $t = $(this),
                $thead = $t.find('thead').clone(),
                $col = $t.find('thead, tbody').clone();

            // Add class, remove margins, reset width and wrap table
            $t
            .addClass('sticky-enabled')
            .css({
                margin: 0,
                width: '100%'
            }).wrap('<div class="sticky-wrap" />');

            if ($t.hasClass('overflow-y')) $t.removeClass('overflow-y').parent().addClass('overflow-y');

            // Create new sticky table head (basic)
            $t.after('<table class="sticky-thead" />');

            // If <tbody> contains <th>, then we create sticky column and intersect (advanced)
            if ($t.find('tbody th').length > 0) {
                $t.after('<table class="sticky-col" /><table class="sticky-intersect" />');
            }

            // Create shorthand for things
            var $stickyHead = $(this).siblings('.sticky-thead'),
                $stickyCol = $(this).siblings('.sticky-col'),
                $stickyInsct = $(this).siblings('.sticky-intersect'),
                $stickyWrap = $(this).parent('.sticky-wrap');

            $stickyHead.append($thead);
         
            $stickyCol
            .append($col)
                .find('thead th:gt('+(_stickyable_columns_count-1)+')').remove()
                .end()
                .find('tbody td').remove();
          

            //$stickyInsct.html('<thead><tr>' +
            //    '<th>' + $($t.find('thead th')[0]).html() + '</th>' +
            //    '<th>' + $($t.find('thead th')[1]).html() + '</th>' +
            //    '<th>' + $($t.find('thead th')[2]).html() + '</th>' +
            //    '</tr></thead>');
            var _html = new Array();
            _html.push('<thead><tr>');
            for (var i = 0; i < _stickyable_columns_count; i++) {
                _html.push('<th>' + $($t.find('thead th')[i]).html() + '</th>');
            }
            _html.push('</tr></thead>');
            $stickyInsct.html(_html.join());


            // Set widths
            var setWidths = function (_stickyable_columns_count) {
                $t
                .find('thead th').each(function (i) {
                    $stickyHead.find('th').eq(i).width($(this).width());
                })
                .end()
                .find('tr').each(function (i) {
                    $stickyCol.find('tr').eq(i).height($(this).height());
                });

                // Set width of sticky table head
                $stickyHead.width($t.width());

                

                // Set width of sticky table col
                //$stickyCol.find('th').add($stickyInsct.find('th')).width($t.find('thead th').width());
                for (var i = 0; i < _stickyable_columns_count; i++) {
                    $($stickyInsct.find('th')[i]).width($($t.find('thead th')[i]).width());
                    $($stickyCol.find('th')[i]).width($($t.find('thead th')[i]).width());
                    
                //    $($stickyCol.find('th')[i-1]).add($($stickyInsct.find('th')[i - 1])).width($($t.find('thead th')[i - 1]).width());
                }
             
              //  $($stickyCol.find('th')[1]).add($($stickyInsct.find('th')[1])).width($($t.find('thead th')[1]).width());
                //$($stickyInsct.find('th')[2]).width($($t.find('thead th')[2]).width());
                //  $($stickyCol.find('th')[1]).add($($stickyInsct.find('th')[1])).width($($t.find('thead th')[1]).width());
            },
                repositionStickyHead = function () {
                    // Return value of calculated allowance
                    var allowance = calcAllowance();

                    // Check if wrapper parent is overflowing along the y-axis
                    if ($t.height() > $stickyWrap.height()) {
                        // If it is overflowing (advanced layout)
                        // Position sticky header based on wrapper scrollTop()
                        if ($stickyWrap.scrollTop() > 0) {
                            // When top of wrapping parent is out of view
                            $stickyHead.add($stickyInsct).css({
                                opacity: 1,
                                top: $stickyWrap.scrollTop()
                            });
                        } else {
                            // When top of wrapping parent is in view
                            $stickyHead.add($stickyInsct).css({
                                opacity: 1,
                                top: 0
                            });
                        }
                    } else {
                        // If it is not overflowing (basic layout)
                        // Position sticky header based on viewport scrollTop
                        if ($w.scrollTop() > $t.offset().top && $w.scrollTop() < $t.offset().top + $t.outerHeight() - allowance) {
                            // When top of viewport is in the table itself
                            $stickyHead.add($stickyInsct).css({
                                opacity: 1,
                                top: $w.scrollTop() - $t.offset().top
                            });
                        } else {
                            // When top of viewport is above or below table
                            $stickyHead.add($stickyInsct).css({
                                opacity: 1,
                                top: 0
                            });
                        }
                    }
                },
                repositionStickyCol = function () {
                    if ($stickyWrap.scrollLeft() > 0) {
                        // When left of wrapping parent is out of view
                        $stickyCol.add($stickyInsct).css({
                            opacity: 1,
                            left: $stickyWrap.scrollLeft()
                        });
                    } else {
                        // When left of wrapping parent is in view
                        $stickyCol
                        .css({ opacity: 1 })
                        .add($stickyInsct).css({ left: 0 });
                    }
                },
                calcAllowance = function () {
                    var a = 0;
                    // Calculate allowance
                    $t.find('tbody tr:lt(3)').each(function () {
                        a += $(this).height();
                    });

                    // Set fail safe limit (last three row might be too tall)
                    // Set arbitrary limit at 0.25 of viewport height, or you can use an arbitrary pixel value
                    if (a > $w.height() * 0.25) {
                        a = $w.height() * 0.25;
                    }

                    // Add the height of sticky header
                    a += $stickyHead.height();
                    return a;
                };

            setWidths(_stickyable_columns_count);

            $t.parent('.sticky-wrap').scroll($.throttle(250, function () {
                repositionStickyHead();
                repositionStickyCol();
            }));

            $w
            .load(setWidths)
            .resize($.debounce(250, function () {
                
                setWidths(_stickyable_columns_count);
                repositionStickyHead();
                repositionStickyCol();
            }))
            .scroll($.throttle(250, repositionStickyHead));
        }
    });
}
