/**
 * Created by cnaisin06 on 2017/7/28.
 */

define(function (require,exports,module) {

    window.onload= function () {

        $(function () {
            // 全局配置
            ___E.config.menus = ['bold', 'color', 'quote'];
            // 生成编辑器
            var editor = new ___E('textarea1');
            // 自定义配置
            editor.config.uploadImgUrl = 'http://192.168.31.248:7070/AXGY_OP/commonUpload'; //form-data
//      editor.config.menus = ['bold', 'quote', 'list','img'];
            editor.config.menus = ['img'];
            // 初始化
            editor.init();
            //console.log(editor.$txt);
            var $txt = editor.$txt;
//      $txt.html('自定义设置内容');
            //标签结构
            var html =  $txt.html();
            //console.log(html);
            //点击标签切换颜色背景
            $("label").on("click","input", function () {
                $(this).parent("label").toggleClass("red")
            })
            //上传封面图
            $(".upbtn").on("click", function () {
                layer.open({
                    type: 2,
                    title: '上传活动提议封面图',
                    shadeClose: true,
                    shade: false,
                    maxmin: false, //开启最大化最小化按钮
                    area: ['100%', '100%'],
                    content: './ima_up/index.html',
                });
            })
            //提交数据
            var str3
            var str0;
            $("#sbm").on("click", function () {
                var html =  $txt.html();
                //console.log(html);
                $(".hidden_data").html(html);
                str3 = htmltoJSONString(".hidden_data");
                //console.log(str3);
                //console.log(typeof str3);
                str0 = toJSONString();
                //console.log(str0);
                //console.log(typeof  str0);
                //console.log($('input[name="mark"]').is(':checked'))
                //标题不能为空
                if($(".title_top").val() == ""){
                    layer.open({
                        skin:"demo-class",
                        title:"提示",
                        content:"提议名称不能为空"
                    })
                    return
                }
                //banner图不能为空
                else if ($(".src").val() == ""){
                    layer.open({
                        skin:"demo-class",
                        title:"提示",
                        content:"请设置活动封面图"
                    })
                    return
                }
                //标签不能为空
                else if($('input[name="mark"]').is(':checked') == false){
                    layer.open({
                        skin:"demo-class",
                        title:"提示",
                        content:"请选择活动标签"
                    })
                    return
                }
                else{
                    layer.open({
                        skin:"demo-class",
                        content: '您确认提交？',
                        btn: ['确认', '取消'],
                        shadeClose: false,
                        yes: function(){
                            layer.open({content: '确认', time: 1});
                            var datas = {
                                "common": {//公共参数
                                    "v": "1.0",
                                    "sign": "",
                                    "appversion": "1.0",
                                    "timestamp": "1425185923140",
                                    "deviceType": "3",
                                    "deviceVersion": "6.1",
                                    "deviceNo": ""
                                },
                                "params":{
                                    "userId":"Localhost_kEyUHA1xhQcD",
                                    "name":$(".title_top").val(),
                                    "coverPhoto":$(".src").val(),
                                    "tabs":str0,
                                    "content":str3
                                }
                            }
                            console.log(datas);
                            $.ajax({
                                url:"https://192.168.31.248:8443/backend/v1b09/proposal/create",
                                type:"post",
                                "contentType":"application/json; charset=utf-8",
                                data:JSON.stringify(datas),
                                success: function (data) {
                                    console.log(data);
                                    layer.open({
                                        skin:"demo-class",
                                        title:"提示",
                                        content:"提交成功"
                                    })
                                }
                            })

                        }, no: function(){
                            layer.open({content: '您选择了取消', time: 1});
                        }
                    });
                }

            })

        });

        //html结构转成list
        function htmltoJSONString(ele){
            var obj={};
            var arr =[];
            $(ele).contents().each(function (i,v) {
                if(hasPrototype(v, "src")){
                    //console.log(v);
                    //console.log(typeof v);
                    //console.log(v.width);
                    //console.log(v.height);
                    var width = String(v.width);
                    var height = String(v.height);
                    //console.log(width);
                    //console.log(height);
                    obj.type = "image" ;
                    obj.content=$(this).attr("src");
                    obj.width = width;
                    obj.high =height;

                }
                else{
                    obj.type = "text" ;
                    obj.content=$(this).text();
                    delete obj['width'];
                    delete obj['high'];
                }

                var obj1 =JSON.stringify(obj);
//        var obj2 =eval("("+obj1 +")")  //字符串转对象
//        var obj2 =JSON.parse(obj1)   //字符串转对象
//        console.log(typeof obj2);
                arr[i]=obj1 //数组里面字符串
//        arr[i] =obj2 //数组里面是对象
            })
//        console.log(arr);
            var str = arr.toString()
//        console.log(str);
//        console.log(typeof str);
            var str1 ="[";
            var str2 ="]";
            var str3 = str1.concat(str,str2)
//        console.log(str3);
//        console.log(typeof str3);
            return str3
        }

        //判断对象是否含有某个属性
        function hasPrototype(object,name){
            return !object.hasOwnProperty(name)&&(name in object);
        }

        //获取多选框选中的值转换为list
        function toJSONString(){
            var  check_val = {};
            var  arr= [];
            $('input[name="mark"]:checked').each(function (i,v) {
//            console.log(v);
                var id = v.getAttribute("data-id")
//            console.log(v.getAttribute("data-id"));
                var value = v.getAttribute("data-value")
//            console.log(v.getAttribute("data-value"));
                check_val.id = id;
                check_val.name =value;
                var  check_valstr = JSON.stringify(check_val);
                arr[i]=check_valstr;

            })
//        console.log(arr);
            var str3 = arr.toString()
//        console.log(str3);
            var str1 ="[";
            var str2 ="]";
            var str0 = str1.concat(str3,str2);
//        console.log(str0);
            return str0
        }
    }


})
