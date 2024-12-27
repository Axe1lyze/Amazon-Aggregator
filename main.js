// 2024 Axe1lyze created.
// open https://www.amazon.co.jp/gp/css/order-history and run this code.

(()=>{
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    script.onload = ()=>{

        function completed(total) { alert(total+' JPY'); }

        function crawl(url, total) {
            $.get(url, (resp)=>{
                var ifr = document.createElement("iframe");
                ifr.name = 'ifr_'+new Date().getTime();
                ifr.callback = ()=>{
                    var doc = ifr.contentDocument;
                    var pageTotal = Array.from(doc.querySelectorAll('.order-card div.a-column:nth-child(2) div:nth-child(2)'))
                        .map(i=>Number(i.innerText.replace(/[^0-9.]/gi,"")))
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
            var year = prompt('year', new Date().getFullYear());
            crawl('https://www.amazon.co.jp/your-orders/orders?timeFilter=year-'+year, 0);
        });
    };
    document.body.appendChild(script);
})();
