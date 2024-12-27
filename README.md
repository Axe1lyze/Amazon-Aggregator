PC用のスクリプトです。
スマホで使う場合はAmazon購入履歴をPCモードで表示してください。

ブラウザでAmazonの購入履歴を開、URLバーに次の行をコピペして実行

```
javascript:(()=>{var e=document.createElement('div');e.style="z-index: 1000; position:fixed; top:0px; width:100%; height:100%; padding:16px; margin:0px; background-color:white; text-align:center;",document.body.appendChild(e);var t=prompt("year",new Date().getFullYear());function r(r){var n;open("https://x.com/intent/post?text="+encodeURI("私はAmazonで"+t+"年に"+r.toLocaleString()+"円使いました！")+"&url="+encodeURI("https://github.com/Axe1lyze/Amazon-Aggregator/blob/main/README.md")),e.innerHTML+="<br /> 合計: "+r.toLocaleString()+"円"}var n=document.createElement("script");n.onload=()=>{function n(t,a,o){$.get(t,i=>{var c=document.createElement("iframe");c.name="ifr_"+new Date().getTime(),c.style="display: none;",c.callback=()=>{var i=c.contentDocument,l=Array.from(i.querySelectorAll(".order-card div.a-column:nth-child(2) div:nth-child(2)")).map(e=>Number(e.innerText.replace(/[^0-9.]/gi,""))).reduce((e,t)=>e+t,0);e.innerHTML+="<br />ページ"+o+": "+l.toLocaleString()+"円";var d=i.querySelector("ul.a-pagination li.a-last a");if(d){n(new URL(d.href,t).toString(),a+l,o+1);return}r(a)},c.onload=()=>{var e=c.contentDocument;e.write(i),e.write('<script>window.parent.document.querySelector("iframe[name='+c.name+']").callback();</script>')},document.body.appendChild(c),open("",c.name)})}$(()=>{n("https://www.amazon.co.jp/your-orders/orders?timeFilter=year-"+t,0,1)})},n.src="https://code.jquery.com/jquery-3.7.1.min.js",document.body.appendChild(n)})();
```

[Amazon購入履歴](https://www.amazon.co.jp/gp/css/order-history)
