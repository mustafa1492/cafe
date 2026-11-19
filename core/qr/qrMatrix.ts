// Bağımlılıksız QR kod üretici (bayt kipi, hata düzeltme M, sürüm 1–10). Kaynak: mustafa1492/web araclar/kaynak/qr.js (19 Kas kopyası).
// Dönüş: boolean[][] (true = koyu). Ürünlerden bağımsızdır.
/* eslint-disable */
// @ts-nocheck
export function qrMatrix(text){
  const data=[...new TextEncoder().encode(text)];
  const EC=[0,10,16,26,18,24,16,18,22,22,26],NB=[0,1,1,1,2,2,4,4,4,5,5];
  const AL=[0,[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50]];
  const rawMods=v=>{let r=(16*v+128)*v+64;if(v>=2){const n=Math.floor(v/7)+2;r-=(25*n-10)*n-55;if(v>=7)r-=36}return r};
  let ver=0;for(let v=1;v<=10;v++){const cap=Math.floor(rawMods(v)/8)-EC[v]*NB[v];const need=4+(v<10?8:16)+data.length*8;if(need<=cap*8){ver=v;break}}
  if(!ver)throw new Error("Metin QR için çok uzun");
  const size=ver*4+17,total=Math.floor(rawMods(ver)/8),dataCap=total-EC[ver]*NB[ver];
  // bit akışı
  const bits=[];const put=(v,n)=>{for(let i=n-1;i>=0;i--)bits.push((v>>>i)&1)};
  put(4,4);put(data.length,ver<10?8:16);data.forEach(b=>put(b,8));
  put(0,Math.min(4,dataCap*8-bits.length));while(bits.length%8)bits.push(0);
  for(let p=0xEC;bits.length<dataCap*8;p^=0xEC^0x11)put(p,8);
  const dw=[];for(let i=0;i<bits.length;i+=8)dw.push(parseInt(bits.slice(i,i+8).join(""),2));
  // Reed-Solomon
  const mul=(x,y)=>{let z=0;for(let i=7;i>=0;i--){z=(z<<1)^((z>>>7)*0x11D);z^=((y>>>i)&1)*x}return z&255};
  const div=d=>{const r=[];for(let i=0;i<d-1;i++)r.push(0);r.push(1);let root=1;for(let i=0;i<d;i++){for(let j=0;j<r.length;j++){r[j]=mul(r[j],root);if(j+1<r.length)r[j]^=r[j+1]}root=mul(root,2)}return r};
  const rem=(dat,dv)=>{const r=dv.map(()=>0);for(const b of dat){const f=b^r.shift();r.push(0);dv.forEach((c,i)=>r[i]^=mul(c,f))}return r};
  const nb=NB[ver],ecl=EC[ver],shortLen=Math.floor(total/nb),nShort=nb-total%nb,dv=div(ecl);
  const blocks=[];for(let i=0,k=0;i<nb;i++){const dl=shortLen-ecl+(i<nShort?0:1);const d=dw.slice(k,k+dl);k+=dl;const e=rem(d,dv);if(i<nShort)d.push(0);blocks.push(d.concat(e))}
  const cw=[];for(let i=0;i<blocks[0].length;i++)blocks.forEach((b,j)=>{if(i!==shortLen-ecl||j>=nShort)cw.push(b[i])});
  // matris
  const M=[...Array(size)].map(()=>Array(size).fill(false)),F=[...Array(size)].map(()=>Array(size).fill(false));
  const set=(x,y,d)=>{M[y][x]=d;F[y][x]=true};
  for(let i=0;i<size;i++){set(6,i,i%2===0);set(i,6,i%2===0)}
  const finder=(x,y)=>{for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const d=Math.max(Math.abs(dx),Math.abs(dy)),xx=x+dx,yy=y+dy;if(xx>=0&&xx<size&&yy>=0&&yy<size)set(xx,yy,d!==2&&d!==4)}};
  finder(3,3);finder(size-4,3);finder(3,size-4);
  const al=AL[ver];al.forEach((a,i)=>al.forEach((b,j)=>{if((i===0&&j===0)||(i===0&&j===al.length-1)||(i===al.length-1&&j===0))return;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)set(a+dx,b+dy,Math.max(Math.abs(dx),Math.abs(dy))!==1)}));
  const fmt=mask=>{const d=(0<<3)|mask;let r=d;for(let i=0;i<10;i++)r=(r<<1)^((r>>>9)*0x537);const b=((d<<10)|r)^0x5412;
    for(let i=0;i<=5;i++)set(8,i,(b>>>i)&1);set(8,7,(b>>>6)&1);set(8,8,(b>>>7)&1);set(7,8,(b>>>8)&1);for(let i=9;i<15;i++)set(14-i,8,(b>>>i)&1);
    for(let i=0;i<8;i++)set(size-1-i,8,(b>>>i)&1);for(let i=8;i<15;i++)set(8,size-15+i,(b>>>i)&1);set(8,size-8,true)};
  fmt(0);
  if(ver>=7){let r=ver;for(let i=0;i<12;i++)r=(r<<1)^((r>>>11)*0x1F25);const b=(ver<<12)|r;for(let i=0;i<18;i++){const bt=(b>>>i)&1,a=size-11+i%3,c=Math.floor(i/3);set(a,c,bt);set(c,a,bt)}}
  // veri yerleştir
  let i=0;for(let right=size-1;right>=1;right-=2){if(right===6)right=5;for(let vert=0;vert<size;vert++)for(let j=0;j<2;j++){const x=right-j,up=((right+1)&2)===0,y=up?size-1-vert:vert;if(!F[y][x]&&i<cw.length*8){M[y][x]=((cw[i>>>3]>>>(7-(i&7)))&1)===1;i++}}}
  // maske seç
  const MF=[(x,y)=>(x+y)%2===0,(x,y)=>y%2===0,(x,y)=>x%3===0,(x,y)=>(x+y)%3===0,(x,y)=>(Math.floor(x/3)+Math.floor(y/2))%2===0,(x,y)=>x*y%2+x*y%3===0,(x,y)=>(x*y%2+x*y%3)%2===0,(x,y)=>((x+y)%2+x*y%3)%2===0];
  const apply=m=>{for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(!F[y][x]&&MF[m](x,y))M[y][x]=!M[y][x]};
  const penalty=()=>{let p=0;const line=g=>{for(let a=0;a<size;a++){let run=1;for(let b=1;b<=size;b++){if(b<size&&g(a,b)===g(a,b-1))run++;else{if(run>=5)p+=run-2;run=1}}}};
    line((a,b)=>M[a][b]);line((a,b)=>M[b][a]);
    for(let y=0;y<size-1;y++)for(let x=0;x<size-1;x++){const c=M[y][x];if(c===M[y][x+1]&&c===M[y+1][x]&&c===M[y+1][x+1])p+=3}
    const pat=[1,0,1,1,1,0,1,0,0,0,0],pat2=[0,0,0,0,1,0,1,1,1,0,1];for(let y=0;y<size;y++)for(let x=0;x<=size-11;x++){let h1=1,h2=1,v1=1,v2=1;for(let k=0;k<11;k++){const h=M[y][x+k]?1:0,v=M[x+k][y]?1:0;if(h!==pat[k])h1=0;if(h!==pat2[k])h2=0;if(v!==pat[k])v1=0;if(v!==pat2[k])v2=0}p+=40*(h1+h2+v1+v2)}
    let dark=0;M.forEach(r=>r.forEach(c=>dark+=c));p+=Math.floor(Math.abs(dark*20-size*size*10)/(size*size))*10;return p};
  let best=0,bp=Infinity;for(let m=0;m<8;m++){apply(m);fmt(m);const p=penalty();if(p<bp){bp=p;best=m}apply(m)}
  apply(best);fmt(best);return M}
