// 2024 Axe1lyze created.
// open https://www.amazon.co.jp/gp/css/order-history and run this code.

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
        var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
        function crawl(url, total) {
            $.ajax({
                url: url,
                headers: { 'User-Agent': userAgent },
                success: (resp)=>{
                    var ifr = document.createElement("iframe");
                    ifr.name = 'ifr_'+new Date().getTime();
                    ifr.style = 'display: none;';
                    ifr.callback = ()=>{
                        var doc = ifr.contentDocument;
                        Object.defineProperty(ifr.window.navigator, 'userAgent', userAgent);
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
                }
            });
        }
        
        $(()=>{
            crawl('https://www.amazon.co.jp/your-orders/orders?timeFilter=year-'+year, 0);
        });
    };
    document.body.appendChild(script);
})();
