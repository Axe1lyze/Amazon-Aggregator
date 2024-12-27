// 2024 Axe1lyze created.
// open https://www.amazon.co.jp/gp/css/order-history and run this code.

(()=>{
    var div = document.createElement("div");
    div.style = 'z-index: 1000; position:fixed; top:0px; width:100%; height:100%; padding:16px; margin:0px; background-color:white; text-align:center;';
    document.body.appendChild(div);
    var year = prompt('year', new Date().getFullYear());
    
    function completed(total) {
        var text = '私はAmazonで'+year+'年に'+total.toLocaleString()+'円使いました！';
        var url = 'https://github.com/Axe1lyze/Amazon-Aggregator/blob/main/README.md';
        var hashtags = 'Amazon';
        open('https://x.com/intent/post?text='+encodeURI(text)+'&url='+encodeURI(url))+'&hashtags='+hashtags;
        div.innerHTML += '<br /> 合計: '+ total.toLocaleString() + '円';
    }
    
    var script = document.createElement('script');
    script.onload = ()=>{
        function crawl(url, total, page) {
            $.get(url, resp=>{
                var ifr = document.createElement("iframe");
                ifr.name = 'ifr_' + new Date().getTime();
                ifr.style = 'display: none;';
                ifr.callback = ()=>{
                    var doc = ifr.contentDocument;
                    var pageTotal = Array.from(doc.querySelectorAll('.order-card div.a-column:nth-child(2) div:nth-child(2)'))
                        .map(i=>Number(i.innerText.replace(/[^0-9.]/gi,'')))
                        .reduce((a, b)=>a+b, 0)
                    div.innerHTML += '<br />ページ'+page+': '+pageTotal.toLocaleString()+'円';
                    var nextPage = doc.querySelector('ul.a-pagination li.a-last a');
                    if (nextPage) {
                        crawl(new URL(nextPage.href, url).toString(), total+pageTotal, page+1);
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
                open('', ifr.name);
            });
        }
        
        $(()=>{ crawl('https://www.amazon.co.jp/your-orders/orders?timeFilter=year-'+year, 0, 1); });
    };
    script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    document.body.appendChild(script);
})();
