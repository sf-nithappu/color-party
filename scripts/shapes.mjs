// Shape helpers that return SVG path strings in the 440x320 picture frame. Used by src/*.mjs picture generators.
export const f=(n)=>+n.toFixed(1);
export const Rc=(x,y,w,h)=>`M${x} ${y}h${w}v${h}h${-w}z`;
export const El=(cx,cy,rx,ry)=>`M${f(cx-rx)} ${cy}a${rx} ${ry} 0 1 0 ${2*rx} 0a${rx} ${ry} 0 1 0 ${-2*rx} 0z`;
export const Ci=(cx,cy,r)=>El(cx,cy,r,r);
export const Pg=(pts)=>'M'+pts.map(p=>p.join(' ')).join('L')+'z';
export const Star=(cx,cy,r)=>Pg(Array.from({length:10},(_,i)=>{const a=(i/10)*Math.PI*2-Math.PI/2,rr=i%2?r*.45:r;return [f(cx+Math.cos(a)*rr),f(cy+Math.sin(a)*rr)]}));
export const L=(a,b,c,d)=>`M${a} ${b}L${c} ${d}`;
export const rays=(cx,cy,r,n)=>Array.from({length:n},(_,i)=>{const a=i/n*Math.PI*2;return L(f(cx+Math.cos(a)*(r+7)),f(cy+Math.sin(a)*(r+7)),f(cx+Math.cos(a)*(r+21)),f(cy+Math.sin(a)*(r+21)))}).join('');

export const FW = 440, FH = 320;
export const Bg = () => Rc(0, 0, FW, FH);
export const Ground = () => El(220, 345, 330, 85);
// Rounded rectangle
export const Rr = (x, y, w, h, r) => `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}z`;
