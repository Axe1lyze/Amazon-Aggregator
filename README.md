Amazonの購入履歴を開いてURLバーに次の行をコピペして実行

```
javascript:(()=>{var e=prompt("year",new Date().getFullYear());function t(t){var r;open("https://x.com/intent/post?text="+encodeURI("私はAmazonで"+e+"年に"+t.toLocaleString()+"円使いました！")+"&url="+encodeURI("https://github.com/Axe1lyze/Amazon-Aggregator/blob/main/README.md"))}var r=document.createElement("script");r.src="https://code.jquery.com/jquery-3.7.1.min.js",r.onload=()=>{function r(e,n){$.get(e,a=>{var o=document.createElement("iframe");o.name="ifr_"+new Date().getTime(),o.style="display: none;",o.callback=()=>{var a=o.contentDocument,i=Array.from(a.querySelectorAll(".order-card div.a-column:nth-child(2) div:nth-child(2)")).map(e=>Number(e.innerText.replace(/[^0-9.]/gi,""))).reduce((e,t)=>e+t,0);console.log([e,i]);var c=a.querySelector("ul.a-pagination li.a-last a");if(c){r(new URL(c.href,e.origin).toString(),n+i);return}t(n)},o.onload=()=>{var e=o.contentDocument;e.write(a),e.write('<script>window.parent.document.querySelector("iframe[name='+o.name+']").callback();</script>')},document.body.appendChild(o),open("",o.name)})}$(()=>{r("https://www.amazon.co.jp/your-orders/orders?timeFilter=year-"+e,0)})},document.body.appendChild(r)})();
```

[Amazon購入履歴](https://www.amazon.co.jp/gp/css/order-history)
