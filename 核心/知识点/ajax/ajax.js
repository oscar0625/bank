(function(){
    function ajax(arg){
        var ini = {
            type: "get", url: "", async: true, data: {}, success: function (txt) {

            }, error: function (status) {

            }, cash: false, beforeSend: function () {

            }, complete: function () {

            }
        };
        var obj=merge(ini,arg);

        var xhr=new XMLHttpRequest()||new ActiveXObject("microsoft.XMLHttp");

        var bd=/^post$/i.test(obj.type);

        obj.data=data_parse(obj.data);

        if(!bd){
            obj.url+=(obj.url.indexOf("?")==-1?"?":"")+"&"+obj.data;
            obj.url+=obj.cash?"":"&______Oscar______="+new Date().getTime();
        }

        xhr.open(obj.type,obj.url,obj.async);

        if(bd){
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        }

        obj.beforeSend();

        xhr.send(obj.data);
        xhr.onreadystatechange= function () {
            if(xhr.readyState==4){
                obj.complete();
                if(xhr.status==200){
                    obj.success(xhr.responseText,xhr)
                }else{
                    obj.error(xhr.status,xhr)
                }
            }
        }
    }
    function merge(arg1,arg2){
        var z;
        for(var key in arg1){
            if(arg2[key]!==z){
                arg1[key]=arg2[key];
            }
        }
        return arg1;
    }
    function data_parse(data){
        var str="";
        for(var key in data){
            str+="&"+key+"="+data[key];
        }
        return str
    }
    window.ajax=ajax
})();
