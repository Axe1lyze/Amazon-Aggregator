// 2024 Axe1lyze created.
// open https://www.amazon.co.jp/gp/css/order-history and run this code.
//
// minified bookmarklet
// javascript:(()=>{var e=prompt("year",new Date().getFullYear());function t(t){var r;open("https://x.com/intent/post?text="+encodeURI("私はAmazonで"+e+"年に"+t.toLocaleString()+"円使いました！")+"&url="+encodeURI("https://github.com/Axe1lyze/Amazon-Aggregator/blob/main/README.md"))}var r=document.createElement("script");r.src="https://code.jquery.com/jquery-3.7.1.min.js",r.onload=()=>{function r(e,n){$.get(e,a=>{var o=document.createElement("iframe");o.name="ifr_"+new Date().getTime(),o.style="display: none;",o.callback=()=>{var a=o.contentDocument,i=Array.from(a.querySelectorAll(".order-card div.a-column:nth-child(2) div:nth-child(2)")).map(e=>Number(e.innerText.replace(/[^0-9.]/gi,""))).reduce((e,t)=>e+t,0);console.log([e,i]);var c=a.querySelector("ul.a-pagination li.a-last a");if(c){r(new URL(c.href,e.origin).toString(),n+i);return}t(n)},o.onload=()=>{var e=o.contentDocument;e.write(a),e.write('<script>window.parent.document.querySelector("iframe[name='+o.name+']").callback();</script>')},document.body.appendChild(o),open("",o.name)})}$(()=>{r("https://www.amazon.co.jp/your-orders/orders?timeFilter=year-"+e,0)})},document.body.appendChild(r)})();

(()=>{
    var year = prompt('year', new Date().getFullYear());
    
    function completed(total) {
        var text = '私はAmazonで'+year+'年に'+total.toLocaleString()+'円使いました！';
        var url = 'https://github.com/Axe1lyze/Amazon-Aggregator/blob/main/README.md';
        var hashtags = 'Amazon';
        open('https://x.com/intent/post?text='+encodeURI(text)+'&url='+encodeURI(url))+'&hashtags='+hashtags;
    }
    
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    script.onload = ()=>{
        
        function crawl(url, total) {
            $.get(url, (resp)=>{
                var ifr = document.createElement("iframe");
                ifr.name = 'ifr_'+new Date().getTime();
                ifr.style = 'display: none;';
                ifr.callback = ()=>{
                    var doc = ifr.contentDocument;
                    var pageTotal = Array.from(doc.querySelectorAll('.order-card div.a-column:nth-child(2) div:nth-child(2)'))
                        .map(i=>Number(i.innerText.replace(/[^0-9.]/gi,'')))
                        .reduce((a,b)=>a+b,0)

                    console.log([url, pageTotal]);

                    var nextPage = doc.querySelector('ul.a-pagination li.a-last a');
                    if (nextPage) {
                        crawl(new URL(nextPage.href, url.origin).toString(), total+pageTotal);
                        return;
                    }
                    completed(total);
                };
                ifr.onload = ()=>{
                    var doc = ifr.contentDocument;
                    doc.write(resp);
                    doc.write('<script>window.parent.document.querySelector("iframe[name='+ifr.name+']").callback();</script>');
                };
                document.body.appendChild(ifr);
                open("", ifr.name);
            });
        }
        
        $(()=>{
            crawl('https://www.amazon.co.jp/your-orders/orders?timeFilter=year-'+year, 0);
        });
    };
    document.body.appendChild(script);
})();
