window.module=(function(){
    var modules={};
    function regist(name,obj){
        var o;
        if(typeof obj=="function"){
            var o=obj();
        }else{
            var o=obj;
        }
        modules[name]=o;
        return true;
    }
    function get(name){
        return modules[name];
    }
    return {
        regist:regist,
        get:get
    }
})();
module.regist('clock',function(){
    function generat(dom){        
        var d=[];
        var container=document.createElement('div');
        container.classList.add('container');
        for(var i=0;i<7;i++){
            var tmp=document.createElement('div');
            tmp.classList.add("bar","b"+(i+1));
            d.push(tmp);
            var l=document.createElement('div');
            l.classList.add("l");
            tmp.appendChild(l);
            var m=document.createElement('div');
            m.classList.add("m");
            tmp.appendChild(m);
            var r=document.createElement('div');
            r.classList.add("r");
            tmp.appendChild(r);
            container.appendChild(tmp);
        }
        dom.appendChild(container);
        return d;
    }
    var decode=[
        [1,1,1,0,1,1,1],
        [0,0,1,0,0,1,0],
        [1,0,1,1,1,0,1],
        [1,0,1,1,0,1,1],
        [0,1,1,1,0,1,0],
        [1,1,0,1,0,1,1],
        [1,1,0,1,1,1,1],
        [1,0,1,0,0,1,0],
        [1,1,1,1,1,1,1],
        [1,1,1,1,0,1,1]
    ];
    function init(dom,options){
        var handle={};
        handle.d=generat(dom);
        handle.set=function(num){
            if(num>9||num<0){
                throw new Error("num must between [0,9]");
            }
            var n=decode[num];
            for(var i=0;i<n.length;i++){
                if(n[i]){
                    handle.d[i].classList.add('active');
                }else{
                    handle.d[i].classList.remove('active');
                }
            }
        }
        return handle;
    }
    return {
        init:init
    }
});

(function(){
    function init(){
        var list=document.querySelectorAll('.clock .clock_num');
        var handles=[];
        for(var i=0;i<list.length;i++){
            handles.push(module.get('clock').init(list[i]));
        }

        function tick(){
            function f(){
                var d=new Date();
                var h=d.getHours();
                var m=d.getMinutes();
                var s=d.getSeconds();
                handles[0].set(~~(h/10));
                handles[1].set((h%10));
                handles[2].set(~~(m/10));
                handles[3].set((m%10));
                handles[4].set(~~(s/10));
                handles[5].set((s%10));
                window.requestAnimationFrame(f);    
            }
            window.requestAnimationFrame(f);
        }
        tick();
    }
    window.onload=init;
})()
