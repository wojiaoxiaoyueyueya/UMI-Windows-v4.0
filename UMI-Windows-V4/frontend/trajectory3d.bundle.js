(()=>{var wi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ad=0,uc=1,wd=2;var js=1,Po=2,Fr=3,Ci=0,Wt=1,an=2,Bn=0,qs=1,dc=2,pc=3,fc=4,Rd=5;var Br=100,Cd=101,Pd=102,Id=103,Ld=104,Nd=200,Dd=201,Ud=202,Od=203,Fd=204,Bd=205,zd=206,Gd=207,kd=208,Vd=209,Hd=210,Wd=211,Xd=212,jd=213,qd=214,mc=0,gc=1,_c=2,Io=3,vc=4,yc=5,xc=6,Mc=7,Yd=0,Kd=1,Zd=2,bn=0,Sc=1,bc=2,Tc=3,Ec=4,Ac=5,wc=6,Rc=7,Kl="attached",Jd="detached",Cc=300,zr=301,qi=302,Lo=303,No=304,Ys=306,Mi=1e3,Ln=1001,xr=1002,Ft=1003,Do=1004;var Yi=1005;var vt=1006,Gr=1007;var zn=1008;var Jt=1009,Pc=1010,Ic=1011,kr=1012,Uo=1013,di=1014,$t=1015,Gn=1016,Oo=1017,Fo=1018,Vr=1020,Lc=35902,Nc=35899,$d=1021,Qd=1022,on=1023,Pi=1026,Ki=1027,Bo=1028,zo=1029,Zi=1030,Dc=1031;var Uc=1033,Go=33776,ko=33777,Vo=33778,Ho=33779,Oc=35840,Fc=35841,Bc=35842,zc=35843,Gc=36196,kc=37492,Vc=37496,Hc=37488,Wc=37489,Wo=37490,Xc=37491,jc=37808,qc=37809,Yc=37810,Kc=37811,Zc=37812,Jc=37813,$c=37814,Qc=37815,eh=37816,th=37817,nh=37818,ih=37819,rh=37820,sh=37821,ah=36492,oh=36494,lh=36495,ch=36283,hh=36284,Xo=36285,uh=36286;var ki=2300,Vi=2301,za=2302,Zl=2303,Jl=2400,$l=2401,Ql=2402;var dh=0,Ks=1,Hr=2;var ph=0,ep=1,Ji="",lt="srgb",Bt="srgb-linear",us="linear",qe="srgb";var zi=7680;var tp=512,np=513,ip=514,jo=515,rp=516,sp=517,qo=518,ap=519,Ga=35044;var fh="300 es",ii=2e3,Mr=2001;function yf(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Sr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function op(){let r=Sr("canvas");return r.style.display="block",r}var Uu={},br=null;function ds(...r){let e="THREE."+r.shift();br?br("log",e,...r):console.log(e,...r)}function lp(r){let e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ge(...r){let e="THREE."+(r=lp(r)).shift();if(br)br("warn",e,...r);else{let t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function we(...r){let e="THREE."+(r=lp(r)).shift();if(br)br("error",e,...r);else{let t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function Gi(...r){let e=r.join(" ");e in Uu||(Uu[e]=!0,ge(...r))}function cp(r,e,t){return new Promise(function(n,i){setTimeout(function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var hp={[mc]:1,[_c]:6,[vc]:7,[Io]:5,[gc]:0,[xc]:2,[Mc]:4,[yc]:3},yn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ou=1234567,vr=Math.PI/180,Hi=180/Math.PI;function sn(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Pt[255&r]+Pt[r>>8&255]+Pt[r>>16&255]+Pt[r>>24&255]+"-"+Pt[255&e]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[63&t|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[255&n]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]).toLowerCase()}function Oe(r,e,t){return Math.max(e,Math.min(t,r))}function ec(r,e){return(r%e+e)%e}function ls(r,e,t){return(1-t)*r+t*e}function vn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ke(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Qt={DEG2RAD:vr,RAD2DEG:Hi,generateUUID:sn,clamp:Oe,euclideanModulo:ec,mapLinear:function(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)},inverseLerp:function(r,e,t){return r!==e?(t-r)/(e-r):0},lerp:ls,damp:function(r,e,t,n){return ls(r,e,1-Math.exp(-t*n))},pingpong:function(r,e=1){return e-Math.abs(ec(r,2*e)-e)},smoothstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*(3-2*r)},smootherstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*r*(r*(6*r-15)+10)},randInt:function(r,e){return r+Math.floor(Math.random()*(e-r+1))},randFloat:function(r,e){return r+Math.random()*(e-r)},randFloatSpread:function(r){return r*(.5-Math.random())},seededRandom:function(r){r!==void 0&&(Ou=r);let e=Ou+=1831565813;return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(r){return r*vr},radToDeg:function(r){return r*Hi},isPowerOfTwo:function(r){return!(r&r-1)&&r!==0},ceilPowerOfTwo:function(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))},floorPowerOfTwo:function(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))},setQuaternionFromProperEuler:function(r,e,t,n,i){let s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),p=a((e-n)/2),d=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*h,c*u,c*p,o*l);break;case"YZY":r.set(c*p,o*h,c*u,o*l);break;case"ZXZ":r.set(c*u,c*p,o*h,o*l);break;case"XZX":r.set(o*h,c*m,c*d,o*l);break;case"YXY":r.set(c*d,o*h,c*m,o*l);break;case"ZYZ":r.set(c*m,c*d,o*h,o*l);break;default:ge("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}},normalize:Ke,denormalize:vn},$=class r{static{r.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Oe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ct=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],p=s[a+0],d=s[a+1],m=s[a+2],f=s[a+3];if(u!==f||c!==p||l!==d||h!==m){let v=c*p+l*d+h*m+u*f;v<0&&(p=-p,d=-d,m=-m,f=-f,v=-v);let g=1-o;if(v<.9995){let _=Math.acos(v),y=Math.sin(_);g=Math.sin(g*_)/y,c=c*g+p*(o=Math.sin(o*_)/y),l=l*g+d*o,h=h*g+m*o,u=u*g+f*o}else{c=c*g+p*o,l=l*g+d*o,h=h*g+m*o,u=u*g+f*o;let _=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=_,l*=_,h*=_,u*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],p=s[a+1],d=s[a+2],m=s[a+3];return e[t]=o*m+h*u+c*d-l*p,e[t+1]=c*m+h*p+l*u-o*d,e[t+2]=l*m+h*d+o*p-c*u,e[t+3]=h*m-o*u-c*p-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),p=c(n/2),d=c(i/2),m=c(s/2);switch(a){case"XYZ":this._x=p*h*u+l*d*m,this._y=l*d*u-p*h*m,this._z=l*h*m+p*d*u,this._w=l*h*u-p*d*m;break;case"YXZ":this._x=p*h*u+l*d*m,this._y=l*d*u-p*h*m,this._z=l*h*m-p*d*u,this._w=l*h*u+p*d*m;break;case"ZXY":this._x=p*h*u-l*d*m,this._y=l*d*u+p*h*m,this._z=l*h*m+p*d*u,this._w=l*h*u-p*d*m;break;case"ZYX":this._x=p*h*u-l*d*m,this._y=l*d*u+p*h*m,this._z=l*h*m-p*d*u,this._w=l*h*u+p*d*m;break;case"YZX":this._x=p*h*u+l*d*m,this._y=l*d*u+p*h*m,this._z=l*h*m-p*d*u,this._w=l*h*u-p*d*m;break;case"XZY":this._x=p*h*u-l*d*m,this._y=l*d*u-p*h*m,this._z=l*h*m+p*d*u,this._w=l*h*u+p*d*m;break;default:ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],p=n+o+u;if(p>0){let d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(h-c)*d,this._y=(s-l)*d,this._z=(a-i)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-c)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(s+l)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(s-l)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-i)/d,this._x=(s+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Oe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},T=class r{static{r.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vl.copy(this).projectOnVector(e),this.sub(vl)}reflect(e){return this.sub(vl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Oe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},vl=new T,Fu=new ct,Ne=class r{static{r.prototype.isMatrix3=!0}constructor(e,t,n,i,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],p=n[2],d=n[5],m=n[8],f=i[0],v=i[3],g=i[6],_=i[1],y=i[4],S=i[7],E=i[2],M=i[5],P=i[8];return s[0]=a*f+o*_+c*E,s[3]=a*v+o*y+c*M,s[6]=a*g+o*S+c*P,s[1]=l*f+h*_+u*E,s[4]=l*v+h*y+u*M,s[7]=l*g+h*S+u*P,s[2]=p*f+d*_+m*E,s[5]=p*v+d*y+m*M,s[8]=p*g+d*S+m*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,p=o*c-h*s,d=l*s-a*c,m=t*u+n*p+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let f=1/m;return e[0]=u*f,e[1]=(i*l-h*n)*f,e[2]=(o*n-i*a)*f,e[3]=p*f,e[4]=(h*t-i*c)*f,e[5]=(i*s-o*t)*f,e[6]=d*f,e[7]=(n*c-l*t)*f,e[8]=(a*t-n*s)*f,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Gi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(yl.makeScale(e,t)),this}rotate(e){return Gi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(yl.makeRotation(-e)),this}translate(e,t){return Gi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(yl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},yl=new Ne,Bu=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zu=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xf(){let r={enabled:!0,workingColorSpace:Bt,spaces:{},convert:function(i,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===qe&&(i.r=ni(i.r),i.g=ni(i.g),i.b=ni(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===qe&&(i.r=yr(i.r),i.g=yr(i.g),i.b=yr(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?us:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Gi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Gi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Bt]:{primaries:e,whitePoint:n,transfer:us,toXYZ:Bu,fromXYZ:zu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:lt},outputColorSpaceConfig:{drawingBufferColorSpace:lt}},[lt]:{primaries:e,whitePoint:n,transfer:qe,toXYZ:Bu,fromXYZ:zu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:lt}}}),r}var ze=xf();function ni(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function yr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var sr,ka=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{sr===void 0&&(sr=Sr("canvas")),sr.width=e.width,sr.height=e.height;let i=sr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=sr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Sr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*ni(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*ni(t[n]/255)):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}return ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Mf=0,Tr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=sn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(xl(i[a].image)):s.push(xl(i[a]))}else s=xl(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function xl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ka.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ge("Texture: Unable to serialize Texture."),{})}var Sf=0,Ml=new T,Et=class r extends yn{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,c=1009,l=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=sn(),this.name="",this.source=new Tr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new $(0,0),this.repeat=new $(1,1),this.center=new $(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ml).x}get height(){return this.source.getSize(Ml).y}get depth(){return this.source.getSize(Ml).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n:ge(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mi:e.x=e.x-Math.floor(e.x);break;case Ln:e.x=e.x<0?0:1;break;case xr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Mi:e.y=e.y-Math.floor(e.y);break;case Ln:e.y=e.y<0?0:1;break;case xr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Et.DEFAULT_IMAGE=null,Et.DEFAULT_MAPPING=Cc,Et.DEFAULT_ANISOTROPY=1;var Ze=class r{static{r.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,c=e.elements,l=c[0],h=c[4],u=c[8],p=c[1],d=c[5],m=c[9],f=c[2],v=c[6],g=c[10];if(Math.abs(h-p)<.01&&Math.abs(u-f)<.01&&Math.abs(m-v)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+f)<.1&&Math.abs(m+v)<.1&&Math.abs(l+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,S=(d+1)/2,E=(g+1)/2,M=(h+p)/4,P=(u+f)/4,O=(m+v)/4;return y>S&&y>E?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=M/n,s=P/n):S>E?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=M/i,s=O/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=P/s,i=O/s),this.set(n,i,s,t),this}let _=Math.sqrt((v-m)*(v-m)+(u-f)*(u-f)+(p-h)*(p-h));return Math.abs(_)<.001&&(_=1),this.x=(v-m)/_,this.y=(u-f)/_,this.z=(p-h)/_,this.w=Math.acos((l+d+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this.w=Oe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this.w=Oe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Va=class extends yn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},s=new Et(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Tr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yt=class extends Va{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ps=class extends Et{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ha=class extends Et{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ee=class r{static{r.prototype.isMatrix4=!0}constructor(e,t,n,i,s,a,o,c,l,h,u,p,d,m,f,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,p,d,m,f,v)}set(e,t,n,i,s,a,o,c,l,h,u,p,d,m,f,v){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=p,g[3]=d,g[7]=m,g[11]=f,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/ar.setFromMatrixColumn(e,0).length(),s=1/ar.setFromMatrixColumn(e,1).length(),a=1/ar.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let p=a*h,d=a*u,m=o*h,f=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=d+m*l,t[5]=p-f*l,t[9]=-o*c,t[2]=f-p*l,t[6]=m+d*l,t[10]=a*c}else if(e.order==="YXZ"){let p=c*h,d=c*u,m=l*h,f=l*u;t[0]=p+f*o,t[4]=m*o-d,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=d*o-m,t[6]=f+p*o,t[10]=a*c}else if(e.order==="ZXY"){let p=c*h,d=c*u,m=l*h,f=l*u;t[0]=p-f*o,t[4]=-a*u,t[8]=m+d*o,t[1]=d+m*o,t[5]=a*h,t[9]=f-p*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let p=a*h,d=a*u,m=o*h,f=o*u;t[0]=c*h,t[4]=m*l-d,t[8]=p*l+f,t[1]=c*u,t[5]=f*l+p,t[9]=d*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let p=a*c,d=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=f-p*u,t[8]=m*u+d,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=d*u+m,t[10]=p-f*u}else if(e.order==="XZY"){let p=a*c,d=a*l,m=o*c,f=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=p*u+f,t[5]=a*h,t[9]=d*u-m,t[2]=m*u-d,t[6]=o*h,t[10]=f*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bf,e,Tf)}lookAt(e,t,n){let i=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),mi.crossVectors(n,jt),mi.lengthSq()===0&&(Math.abs(n.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),mi.crossVectors(n,jt)),mi.normalize(),la.crossVectors(jt,mi),i[0]=mi.x,i[4]=la.x,i[8]=jt.x,i[1]=mi.y,i[5]=la.y,i[9]=jt.y,i[2]=mi.z,i[6]=la.z,i[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],p=n[9],d=n[13],m=n[2],f=n[6],v=n[10],g=n[14],_=n[3],y=n[7],S=n[11],E=n[15],M=i[0],P=i[4],O=i[8],L=i[12],D=i[1],k=i[5],F=i[9],K=i[13],H=i[2],V=i[6],q=i[10],W=i[14],ne=i[3],de=i[7],Ae=i[11],ve=i[15];return s[0]=a*M+o*D+c*H+l*ne,s[4]=a*P+o*k+c*V+l*de,s[8]=a*O+o*F+c*q+l*Ae,s[12]=a*L+o*K+c*W+l*ve,s[1]=h*M+u*D+p*H+d*ne,s[5]=h*P+u*k+p*V+d*de,s[9]=h*O+u*F+p*q+d*Ae,s[13]=h*L+u*K+p*W+d*ve,s[2]=m*M+f*D+v*H+g*ne,s[6]=m*P+f*k+v*V+g*de,s[10]=m*O+f*F+v*q+g*Ae,s[14]=m*L+f*K+v*W+g*ve,s[3]=_*M+y*D+S*H+E*ne,s[7]=_*P+y*k+S*V+E*de,s[11]=_*O+y*F+S*q+E*Ae,s[15]=_*L+y*K+S*W+E*ve,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],p=e[10],d=e[14],m=e[3],f=e[7],v=e[11],g=e[15],_=c*d-l*p,y=o*d-l*u,S=o*p-c*u,E=a*d-l*h,M=a*p-c*h,P=a*u-o*h;return t*(f*_-v*y+g*S)-n*(m*_-v*E+g*M)+i*(m*y-f*E+g*P)-s*(m*S-f*M+v*P)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(s*h-o*c)+i*(s*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],p=e[10],d=e[11],m=e[12],f=e[13],v=e[14],g=e[15],_=t*o-n*a,y=t*c-i*a,S=t*l-s*a,E=n*c-i*o,M=n*l-s*o,P=i*l-s*c,O=h*f-u*m,L=h*v-p*m,D=h*g-d*m,k=u*v-p*f,F=u*g-d*f,K=p*g-d*v,H=_*K-y*F+S*k+E*D-M*L+P*O;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/H;return e[0]=(o*K-c*F+l*k)*V,e[1]=(i*F-n*K-s*k)*V,e[2]=(f*P-v*M+g*E)*V,e[3]=(p*M-u*P-d*E)*V,e[4]=(c*D-a*K-l*L)*V,e[5]=(t*K-i*D+s*L)*V,e[6]=(v*S-m*P-g*y)*V,e[7]=(h*P-p*S+d*y)*V,e[8]=(a*F-o*D+l*O)*V,e[9]=(n*D-t*F-s*O)*V,e[10]=(m*M-f*S+g*_)*V,e[11]=(u*S-h*M-d*_)*V,e[12]=(o*L-a*k-c*O)*V,e[13]=(t*k-n*L+i*O)*V,e[14]=(f*y-m*E-v*_)*V,e[15]=(h*E-u*y+p*_)*V,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,p=s*l,d=s*h,m=s*u,f=a*h,v=a*u,g=o*u,_=c*l,y=c*h,S=c*u,E=n.x,M=n.y,P=n.z;return i[0]=(1-(f+g))*E,i[1]=(d+S)*E,i[2]=(m-y)*E,i[3]=0,i[4]=(d-S)*M,i[5]=(1-(p+g))*M,i[6]=(v+_)*M,i[7]=0,i[8]=(m+y)*P,i[9]=(v-_)*P,i[10]=(1-(p+f))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=ar.set(i[0],i[1],i[2]).length(),o=ar.set(i[4],i[5],i[6]).length(),c=ar.set(i[8],i[9],i[10]).length();s<0&&(a=-a),mn.copy(this);let l=1/a,h=1/o,u=1/c;return mn.elements[0]*=l,mn.elements[1]*=l,mn.elements[2]*=l,mn.elements[4]*=h,mn.elements[5]*=h,mn.elements[6]*=h,mn.elements[8]*=u,mn.elements[9]*=u,mn.elements[10]*=u,t.setFromRotationMatrix(mn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-i),p=(t+e)/(t-e),d=(n+i)/(n-i),m,f;if(c)m=s/(a-s),f=a*s/(a-s);else if(o===ii)m=-(a+s)/(a-s),f=-2*a*s/(a-s);else{if(o!==Mr)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),f=-a*s/(a-s)}return l[0]=h,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),p=-(t+e)/(t-e),d=-(n+i)/(n-i),m,f;if(c)m=1/(a-s),f=a/(a-s);else if(o===ii)m=-2/(a-s),f=-(a+s)/(a-s);else{if(o!==Mr)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),f=-s/(a-s)}return l[0]=h,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=f,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ar=new T,mn=new Ee,bf=new T(0,0,0),Tf=new T(1,1,1),mi=new T,la=new T,jt=new T,Gu=new Ee,ku=new ct,xn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],p=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(Oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Oe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Oe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Oe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Oe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Gu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ku.setFromEuler(this),this.setFromQuaternion(ku,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};xn.DEFAULT_ORDER="XYZ";var fs=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Ef=0,Vu=new T,or=new ct,qn=new Ee,ca=new T,Qr=new T,Af=new T,wf=new ct,Hu=new T(1,0,0),Wu=new T(0,1,0),Xu=new T(0,0,1),ju={type:"added"},Rf={type:"removed"},lr={type:"childadded",child:null},Sl={type:"childremoved",child:null},tt=class r extends yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new T,t=new xn,n=new ct,i=new T(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ee},normalMatrix:{value:new Ne}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return or.setFromAxisAngle(e,t),this.quaternion.multiply(or),this}rotateOnWorldAxis(e,t){return or.setFromAxisAngle(e,t),this.quaternion.premultiply(or),this}rotateX(e){return this.rotateOnAxis(Hu,e)}rotateY(e){return this.rotateOnAxis(Wu,e)}rotateZ(e){return this.rotateOnAxis(Xu,e)}translateOnAxis(e,t){return Vu.copy(e).applyQuaternion(this.quaternion),this.position.add(Vu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hu,e)}translateY(e){return this.translateOnAxis(Wu,e)}translateZ(e){return this.translateOnAxis(Xu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ca.copy(e):ca.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Qr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Qr,ca,this.up):qn.lookAt(ca,Qr,this.up),this.quaternion.setFromRotationMatrix(qn),i&&(qn.extractRotation(i.matrixWorld),or.setFromRotationMatrix(qn),this.quaternion.premultiply(or.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(we("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ju),lr.child=e,this.dispatchEvent(lr),lr.child=null):we("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rf),Sl.child=e,this.dispatchEvent(Sl),Sl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ju),lr.child=e,this.dispatchEvent(lr),lr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qr,e,Af),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qr,wf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),p=a(e.skeletons),d=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};tt.DEFAULT_UP=new T(0,1,0),tt.DEFAULT_MATRIX_AUTO_UPDATE=!0,tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Lt=class extends tt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Cf={type:"move"},Er=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let f of e.hand.values()){let v=t.getJointPose(f,n),g=this._getHandJoint(l,f);v!==null&&(g.matrix.fromArray(v.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=v.radius),g.visible=v!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],p=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&p>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Cf)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Lt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},up={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},ha={h:0,s:0,l:0};function bl(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var _e=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,ze.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=ze.workingColorSpace){if(e=ec(e,1),t=Oe(t,0,1),n=Oe(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=bl(a,s,e+1/3),this.g=bl(a,s,e),this.b=bl(a,s,e-1/3)}return ze.colorSpaceToWorking(this,i),this}setStyle(e,t=lt){function n(s){s!==void 0&&parseFloat(s)<1&&ge("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ge("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=lt){let n=up[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=yr(e.r),this.g=yr(e.g),this.b=yr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=lt){return ze.workingToColorSpace(It.copy(this),e),65536*Math.round(Oe(255*It.r,0,255))+256*Math.round(Oe(255*It.g,0,255))+Math.round(Oe(255*It.b,0,255))}getHexString(e=lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ze.workingColorSpace){ze.workingToColorSpace(It.copy(this),t);let n=It.r,i=It.g,s=It.b,a=Math.max(n,i,s),o=Math.min(n,i,s),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ze.workingColorSpace){return ze.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=lt){ze.workingToColorSpace(It.copy(this),e);let t=It.r,n=It.g,i=It.b;return e!==lt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(ha);let n=ls(gi.h,ha.h,t),i=ls(gi.s,ha.s,t),s=ls(gi.l,ha.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},It=new _e;_e.NAMES=up;var ms=class r{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new _e(e),this.near=t,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},gs=class extends tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},gn=new T,Yn=new T,Tl=new T,Kn=new T,cr=new T,hr=new T,qu=new T,El=new T,Al=new T,wl=new T,Rl=new Ze,Cl=new Ze,Pl=new Ze,Qn=class r{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),gn.subVectors(e,t),i.cross(gn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){gn.subVectors(i,t),Yn.subVectors(n,t),Tl.subVectors(e,t);let a=gn.dot(gn),o=gn.dot(Yn),c=gn.dot(Tl),l=Yn.dot(Yn),h=Yn.dot(Tl),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;let p=1/u,d=(l*c-o*h)*p,m=(a*h-o*c)*p;return s.set(1-d-m,m,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Kn)!==null&&Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,Kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Kn.x),c.addScaledVector(a,Kn.y),c.addScaledVector(o,Kn.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return Rl.setScalar(0),Cl.setScalar(0),Pl.setScalar(0),Rl.fromBufferAttribute(e,t),Cl.fromBufferAttribute(e,n),Pl.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Rl,s.x),a.addScaledVector(Cl,s.y),a.addScaledVector(Pl,s.z),a}static isFrontFacing(e,t,n,i){return gn.subVectors(n,t),Yn.subVectors(e,t),gn.cross(Yn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),.5*gn.cross(Yn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;cr.subVectors(i,n),hr.subVectors(s,n),El.subVectors(e,n);let c=cr.dot(El),l=hr.dot(El);if(c<=0&&l<=0)return t.copy(n);Al.subVectors(e,i);let h=cr.dot(Al),u=hr.dot(Al);if(h>=0&&u<=h)return t.copy(i);let p=c*u-h*l;if(p<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(cr,a);wl.subVectors(e,s);let d=cr.dot(wl),m=hr.dot(wl);if(m>=0&&d<=m)return t.copy(s);let f=d*l-c*m;if(f<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(hr,o);let v=h*m-d*u;if(v<=0&&u-h>=0&&d-m>=0)return qu.subVectors(s,i),o=(u-h)/(u-h+(d-m)),t.copy(i).addScaledVector(qu,o);let g=1/(v+f+p);return a=f*g,o=p*g,t.copy(n).addScaledVector(cr,a).addScaledVector(hr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},At=class{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,_n):_n.fromBufferAttribute(s,a),_n.applyMatrix4(e.matrixWorld),this.expandByPoint(_n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ua.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ua.copy(n.boundingBox)),ua.applyMatrix4(e.matrixWorld),this.union(ua)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_n),_n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(es),da.subVectors(this.max,es),ur.subVectors(e.a,es),dr.subVectors(e.b,es),pr.subVectors(e.c,es),_i.subVectors(dr,ur),vi.subVectors(pr,dr),Ui.subVectors(ur,pr);let t=[0,-_i.z,_i.y,0,-vi.z,vi.y,0,-Ui.z,Ui.y,_i.z,0,-_i.x,vi.z,0,-vi.x,Ui.z,0,-Ui.x,-_i.y,_i.x,0,-vi.y,vi.x,0,-Ui.y,Ui.x,0];return!!Il(t,ur,dr,pr,da)&&(t=[1,0,0,0,1,0,0,0,1],!!Il(t,ur,dr,pr,da)&&(pa.crossVectors(_i,vi),t=[pa.x,pa.y,pa.z],Il(t,ur,dr,pr,da)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(_n).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Zn=[new T,new T,new T,new T,new T,new T,new T,new T],_n=new T,ua=new At,ur=new T,dr=new T,pr=new T,_i=new T,vi=new T,Ui=new T,es=new T,da=new T,pa=new T,Oi=new T;function Il(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Oi.fromArray(r,s);let o=i.x*Math.abs(Oi.x)+i.y*Math.abs(Oi.y)+i.z*Math.abs(Oi.z),c=e.dot(Oi),l=t.dot(Oi),h=n.dot(Oi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var L_=Pf();function Pf(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[256|c]=32768,i[c]=24,i[256|c]=24):l<-14?(n[c]=1024>>-l-14,n[256|c]=1024>>-l-14|32768,i[c]=-l-1,i[256|c]=-l-1):l<=15?(n[c]=l+15<<10,n[256|c]=l+15<<10|32768,i[c]=13,i[256|c]=13):l<128?(n[c]=31744,n[256|c]=64512,i[c]=24,i[256|c]=24):(n[c]=31744,n[256|c]=64512,i[c]=13,i[256|c]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(8388608&l);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}var mt=new T,fa=new $,If=0,_t=class extends yn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:If++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ga,this.updateRanges=[],this.gpuType=$t,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fa.fromBufferAttribute(this,t),fa.applyMatrix3(e),this.setXY(t,fa.x,fa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ke(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array),s=Ke(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ga&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var _s=class extends _t{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var vs=class extends _t{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var be=class extends _t{constructor(e,t,n){super(new Float32Array(e),t,n)}},Lf=new At,ts=new T,Ll=new T,zt=class{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Lf.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ts.subVectors(e,this.center);let t=ts.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(ts,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ll.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ts.copy(e.center).add(Ll)),this.expandByPoint(ts.copy(e.center).sub(Ll))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Nf=0,nn=new Ee,Nl=new tt,fr=new T,qt=new At,ns=new At,Tt=new T,ke=class r extends yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=sn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new((function(t){for(let n=t.length-1;n>=0;--n)if(t[n]>=65535)return!0;return!1})(e)?vs:_s)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ne().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,n){return nn.makeTranslation(e,t,n),this.applyMatrix4(nn),this}scale(e,t,n){return nn.makeScale(e,t,n),this.applyMatrix4(nn),this}lookAt(e){return Nl.lookAt(e),Nl.updateMatrix(),this.applyMatrix4(Nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fr).negate(),this.translate(fr.x,fr.y,fr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new be(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new At);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return we("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];qt.setFromBufferAttribute(s),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&we('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return we("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new T,1/0);if(e){let n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];ns.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(qt.min,ns.min),qt.expandByPoint(Tt),Tt.addVectors(qt.max,ns.max),qt.expandByPoint(Tt)):(qt.expandByPoint(ns.min),qt.expandByPoint(ns.max))}qt.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Tt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Tt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Tt.fromBufferAttribute(o,l),c&&(fr.fromBufferAttribute(e,l),Tt.add(fr)),i=Math.max(i,n.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&we('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void we("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv,a=this.getAttribute("tangent");a!==void 0&&a.count===n.count||(a=new _t(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let O=0;O<n.count;O++)o[O]=new T,c[O]=new T;let l=new T,h=new T,u=new T,p=new $,d=new $,m=new $,f=new T,v=new T;function g(O,L,D){l.fromBufferAttribute(n,O),h.fromBufferAttribute(n,L),u.fromBufferAttribute(n,D),p.fromBufferAttribute(s,O),d.fromBufferAttribute(s,L),m.fromBufferAttribute(s,D),h.sub(l),u.sub(l),d.sub(p),m.sub(p);let k=1/(d.x*m.y-m.x*d.y);isFinite(k)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(k),v.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(k),o[O].add(f),o[L].add(f),o[D].add(f),c[O].add(v),c[L].add(v),c[D].add(v))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let O=0,L=_.length;O<L;++O){let D=_[O],k=D.start;for(let F=k,K=k+D.count;F<K;F+=3)g(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let y=new T,S=new T,E=new T,M=new T;function P(O){E.fromBufferAttribute(i,O),M.copy(E);let L=o[O];y.copy(L),y.sub(E.multiplyScalar(E.dot(L))).normalize(),S.crossVectors(M,L);let D=S.dot(c[O])<0?-1:1;a.setXYZW(O,y.x,y.y,y.z,D)}for(let O=0,L=_.length;O<L;++O){let D=_[O],k=D.start;for(let F=k,K=k+D.count;F<K;F+=3)P(e.getX(F+0)),P(e.getX(F+1)),P(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new _t(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let p=0,d=n.count;p<d;p++)n.setXYZ(p,0,0,0);let i=new T,s=new T,a=new T,o=new T,c=new T,l=new T,h=new T,u=new T;if(e)for(let p=0,d=e.count;p<d;p+=3){let m=e.getX(p+0),f=e.getX(p+1),v=e.getX(p+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,f),a.fromBufferAttribute(t,v),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,f),l.fromBufferAttribute(n,v),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(f,c.x,c.y,c.z),n.setXYZ(v,l.x,l.y,l.z)}else for(let p=0,d=t.count;p<d;p+=3)i.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,p=new l.constructor(c.length*h),d=0,m=0;for(let f=0,v=c.length;f<v;f++){d=o.isInterleavedBufferAttribute?c[f]*o.data.stride+o.offset:c[f]*h;for(let g=0;g<h;g++)p[m++]=l[d++]}return new _t(p,h,u)}if(this.index===null)return ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let c=e(i[o],n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){let p=e(l[h],n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,p=l.length;u<p;u++){let d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let p=0,d=u.length;p<d;p++)h.push(u[p].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ar=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ga,this.updateRanges=[],this.version=0,this.uuid=sn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ot=new T,wr=class r{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ke(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=vn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=vn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=vn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=vn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array),s=Ke(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){ds("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new _t(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new r(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ds("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Df=0,Vt=class extends yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=sn(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _e(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zi,this.stencilZFail=zi,this.stencilZPass=zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){ge(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:ge(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==zi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==zi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new _e().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new $().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var N_=new T,D_=new T,U_=new T,O_=new $,F_=new $,B_=new Ee,z_=new T,G_=new T,k_=new T,V_=new $,H_=new $,W_=new $;var X_=new T,j_=new T;var Jn=new T,Dl=new T,ma=new T,yi=new T,Ul=new T,ga=new T,Ol=new T,ri=class{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jn.copy(this.origin).addScaledVector(this.direction,t),Jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Dl.copy(e).add(t).multiplyScalar(.5),ma.copy(t).sub(e).normalize(),yi.copy(this.origin).sub(Dl);let s=.5*e.distanceTo(t),a=-this.direction.dot(ma),o=yi.dot(this.direction),c=-yi.dot(ma),l=yi.lengthSq(),h=Math.abs(1-a*a),u,p,d,m;if(h>0)if(u=a*c-o,p=a*o-c,m=s*h,u>=0)if(p>=-m)if(p<=m){let f=1/h;u*=f,p*=f,d=u*(u+a*p+2*o)+p*(a*u+p+2*c)+l}else p=s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*c)+l;else p=-s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*c)+l;else p<=-m?(u=Math.max(0,-(-a*s+o)),p=u>0?-s:Math.min(Math.max(-s,-c),s),d=-u*u+p*(p+2*c)+l):p<=m?(u=0,p=Math.min(Math.max(-s,-c),s),d=p*(p+2*c)+l):(u=Math.max(0,-(a*s+o)),p=u>0?s:Math.min(Math.max(-s,-c),s),d=-u*u+p*(p+2*c)+l);else p=a>0?-s:s,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Dl).addScaledVector(ma,p),d}intersectSphere(e,t){Jn.subVectors(e.center,this.origin);let n=Jn.dot(this.direction),i=Jn.dot(Jn)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,i=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,i=(e.min.x-p.x)*l),h>=0?(s=(e.min.y-p.y)*h,a=(e.max.y-p.y)*h):(s=(e.max.y-p.y)*h,a=(e.min.y-p.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-p.z)*u,c=(e.max.z-p.z)*u):(o=(e.max.z-p.z)*u,c=(e.min.z-p.z)*u),n>c||o>i?null:((o>n||n!=n)&&(n=o),(c<i||i!=i)&&(i=c),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,Jn)!==null}intersectTriangle(e,t,n,i,s){Ul.subVectors(t,e),ga.subVectors(n,e),Ol.crossVectors(Ul,ga);let a,o=this.direction.dot(Ol);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}yi.subVectors(this.origin,e);let c=a*this.direction.dot(ga.crossVectors(yi,ga));if(c<0)return null;let l=a*this.direction.dot(Ul.cross(yi));if(l<0||c+l>o)return null;let h=-a*yi.dot(Ol);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Mn=class extends Vt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Yu=new Ee,Fi=new ri,_a=new zt,Ku=new T,va=new T,ya=new T,xa=new T,Fl=new T,Ma=new T,Zu=new T,Sa=new T,ht=class extends tt{constructor(e=new ke,t=new Mn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){Ma.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=o[c],u=s[c];h!==0&&(Fl.fromBufferAttribute(u,e),a?Ma.addScaledVector(Fl,h):Ma.addScaledVector(Fl.sub(t),h))}t.add(Ma)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),_a.copy(n.boundingSphere),_a.applyMatrix4(s),Fi.copy(e.ray).recast(e.near),_a.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(_a,Ku)===null||Fi.origin.distanceToSquared(Ku)>(e.far-e.near)**2))return;Yu.copy(s).invert(),Fi.copy(e.ray).applyMatrix4(Yu),n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Fi)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,p=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,f=p.length;m<f;m++){let v=p[m],g=a[v.materialIndex];for(let _=Math.max(v.start,d.start),y=Math.min(o.count,Math.min(v.start+v.count,d.start+d.count));_<y;_+=3)i=ba(this,g,e,n,l,h,u,o.getX(_),o.getX(_+1),o.getX(_+2)),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=v.materialIndex,t.push(i))}else for(let m=Math.max(0,d.start),f=Math.min(o.count,d.start+d.count);m<f;m+=3)i=ba(this,a,e,n,l,h,u,o.getX(m),o.getX(m+1),o.getX(m+2)),i&&(i.faceIndex=Math.floor(m/3),t.push(i));else if(c!==void 0)if(Array.isArray(a))for(let m=0,f=p.length;m<f;m++){let v=p[m],g=a[v.materialIndex];for(let _=Math.max(v.start,d.start),y=Math.min(c.count,Math.min(v.start+v.count,d.start+d.count));_<y;_+=3)i=ba(this,g,e,n,l,h,u,_,_+1,_+2),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=v.materialIndex,t.push(i))}else for(let m=Math.max(0,d.start),f=Math.min(c.count,d.start+d.count);m<f;m+=3)i=ba(this,a,e,n,l,h,u,m,m+1,m+2),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}};function ba(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,va),r.getVertexPosition(c,ya),r.getVertexPosition(l,xa);let h=(function(u,p,d,m,f,v,g,_){let y;if(y=p.side===1?m.intersectTriangle(g,v,f,!0,_):m.intersectTriangle(f,v,g,p.side===0,_),y===null)return null;Sa.copy(_),Sa.applyMatrix4(u.matrixWorld);let S=d.ray.origin.distanceTo(Sa);return S<d.near||S>d.far?null:{distance:S,point:Sa.clone(),object:u}})(r,e,t,n,va,ya,xa,Zu);if(h){let u=new T;Qn.getBarycoord(Zu,va,ya,xa,u),i&&(h.uv=Qn.getInterpolatedAttribute(i,o,c,l,u,new $)),s&&(h.uv1=Qn.getInterpolatedAttribute(s,o,c,l,u,new $)),a&&(h.normal=Qn.getInterpolatedAttribute(a,o,c,l,u,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let p={a:o,b:c,c:l,normal:new T,materialIndex:0};Qn.getNormal(va,ya,xa,p.normal),h.face=p,h.barycoord=u}return h}var is=new Ze,Ju=new Ze,$u=new Ze,Uf=new Ze,Qu=new Ee,Ta=new T,Bl=new zt,ed=new Ee,zl=new ri,ys=class extends ht{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Kl,this.bindMatrix=new Ee,this.bindMatrixInverse=new Ee,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new At),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ta),this.boundingBox.expandByPoint(Ta)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new zt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ta),this.boundingSphere.expandByPoint(Ta)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bl.copy(this.boundingSphere),Bl.applyMatrix4(i),e.ray.intersectsSphere(Bl)!==!1&&(ed.copy(i).invert(),zl.copy(e.ray).applyMatrix4(ed),this.boundingBox!==null&&zl.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,zl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ze,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Kl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Jd?this.bindMatrixInverse.copy(this.bindMatrix).invert():ge("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Ju.fromBufferAttribute(i.attributes.skinIndex,e),$u.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(is.copy(t),t.set(0,0,0,0)):(is.set(...t,1),t.set(0,0,0)),is.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){let a=$u.getComponent(s);if(a!==0){let o=Ju.getComponent(s);Qu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Uf.copy(is).applyMatrix4(Qu),a)}}return t.isVector4&&(t.w=is.w),t.applyMatrix4(this.bindMatrixInverse)}},Rr=class extends tt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Cr=class extends Et{constructor(e=null,t=1,n=1,i,s,a,o,c,l=1003,h=1003,u,p){super(null,a,o,c,l,h,i,s,u,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},td=new Ee,Of=new Ee,xs=class r{constructor(e=[],t=[]){this.uuid=sn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){ge("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ee)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ee;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:Of;td.multiplyMatrices(o,t[s]),td.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Cr(t,e,e,on,$t);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(ge("Skeleton: No bone found with UUID:",s),a=new Rr),this.bones.push(a),this.boneInverses.push(new Ee().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Si=class extends _t{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},mr=new Ee,nd=new Ee,Ea=[],id=new At,Ff=new Ee,rs=new ht,ss=new zt,Ms=class extends ht{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Si(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Ff)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new At),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),id.copy(e.boundingBox).applyMatrix4(mr),this.boundingBox.union(id)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new zt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),ss.copy(e.boundingSphere).applyMatrix4(mr),this.boundingSphere.union(ss)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(rs.geometry=this.geometry,rs.material=this.material,rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ss.copy(this.boundingSphere),ss.applyMatrix4(n),e.ray.intersectsSphere(ss)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,mr),nd.multiplyMatrices(n,mr),rs.matrixWorld=nd,rs.raycast(e,Ea);for(let a=0,o=Ea.length;a<o;a++){let c=Ea[a];c.instanceId=s,c.object=this,t.push(c)}Ea.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Si(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,16*e),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Cr(new Float32Array(i*this.count),i,this.count,Bo,$t));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;return s[c]=o,s.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Gl=new T,Bf=new T,zf=new Ne,rn=class{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Gl.subVectors(n,t).cross(Bf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Gl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||zf.getNormalMatrix(e),i=this.coplanarPoint(Gl).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bi=new zt,Gf=new $(.5,.5),Aa=new T,si=class{constructor(e=new rn,t=new rn,n=new rn,i=new rn,s=new rn,a=new rn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],p=s[6],d=s[7],m=s[8],f=s[9],v=s[10],g=s[11],_=s[12],y=s[13],S=s[14],E=s[15];if(i[0].setComponents(l-a,d-h,g-m,E-_).normalize(),i[1].setComponents(l+a,d+h,g+m,E+_).normalize(),i[2].setComponents(l+o,d+u,g+f,E+y).normalize(),i[3].setComponents(l-o,d-u,g-f,E-y).normalize(),n)i[4].setComponents(c,p,v,S).normalize(),i[5].setComponents(l-c,d-p,g-v,E-S).normalize();else if(i[4].setComponents(l-c,d-p,g-v,E-S).normalize(),t===ii)i[5].setComponents(l+c,d+p,g+v,E+S).normalize();else{if(t!==Mr)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);i[5].setComponents(c,p,v,S).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){Bi.center.set(0,0,0);let t=Gf.distanceTo(e.center);return Bi.radius=.7071067811865476+t,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Aa.x=i.normal.x>0?e.max.x:e.min.x,Aa.y=i.normal.y>0?e.max.y:e.min.y,Aa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Aa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},rd=new Ee,Wa=class r{constructor(){this.coordinateSystem=ii,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let s=t[i];rd.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[i]===void 0&&(n[i]=new si),n[i].setFromProjectionMatrix(rd,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new si),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new r().copy(this)}};var tc=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},q_=new Ee,Y_=new _e(1,1,1),K_=new si,Z_=new Wa,J_=new At,$_=new zt,Q_=new T,e0=new T,t0=new T,n0=new tc,i0=new ht;var Sn=class extends Vt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new _e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Xa=new T,ja=new T,sd=new Ee,as=new ri,wa=new zt,kl=new T,ad=new T,ai=class extends tt{constructor(e=new ke,t=new Sn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Xa.fromBufferAttribute(t,i-1),ja.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Xa.distanceTo(ja);e.setAttribute("lineDistance",new be(n,1))}else ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(i),wa.radius+=s,e.ray.intersectsSphere(wa)===!1)return;sd.copy(i).invert(),as.copy(e.ray).applyMatrix4(sd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let m=p,f=d-1;m<f;m+=l){let v=h.getX(m),g=h.getX(m+1),_=Ra(this,e,as,c,v,g,m);_&&t.push(_)}if(this.isLineLoop){let m=h.getX(d-1),f=h.getX(p),v=Ra(this,e,as,c,m,f,d-1);v&&t.push(v)}}else{let p=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let m=p,f=d-1;m<f;m+=l){let v=Ra(this,e,as,c,m,m+1,m);v&&t.push(v)}if(this.isLineLoop){let m=Ra(this,e,as,c,d-1,p,d-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function Ra(r,e,t,n,i,s,a){let o=r.geometry.attributes.position;if(Xa.fromBufferAttribute(o,i),ja.fromBufferAttribute(o,s),t.distanceSqToSegment(Xa,ja,kl,ad)>n)return;kl.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(kl);return c<e.near||c>e.far?void 0:{distance:c,point:ad.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}var od=new T,ld=new T,oi=class extends ai{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)od.fromBufferAttribute(t,i),ld.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+od.distanceTo(ld);e.setAttribute("lineDistance",new be(n,1))}else ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ss=class extends ai{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},bi=class extends Vt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},cd=new Ee,nc=new ri,Ca=new zt,Pa=new T,Wi=class extends tt{constructor(e=new ke,t=new bi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ca.copy(n.boundingSphere),Ca.applyMatrix4(i),Ca.radius+=s,e.ray.intersectsSphere(Ca)===!1)return;cd.copy(i).invert(),nc.copy(e.ray).applyMatrix4(cd);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null)for(let u=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);u<p;u++){let d=l.getX(u);Pa.fromBufferAttribute(h,d),hd(Pa,d,c,i,e,t,this)}else for(let u=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);u<p;u++)Pa.fromBufferAttribute(h,u),hd(Pa,u,c,i,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function hd(r,e,t,n,i,s,a){let o=nc.distanceSqToPoint(r);if(o<t){let c=new T;nc.closestPointToPoint(r,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var bs=class extends Et{constructor(e=[],t=301,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var li=class extends Et{constructor(e,t,n=1014,i,s,a,o=1003,c=1003,l,h=1026,u=1){if(h!==Pi&&h!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:u},i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Tr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},qa=class extends li{constructor(e,t=1014,n=301,i,s,a=1003,o=1003,c,l=1026){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,s,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ts=class extends Et{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Nn=class r extends ke{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],h=[],u=[],p=0,d=0;function m(f,v,g,_,y,S,E,M,P,O,L){let D=S/P,k=E/O,F=S/2,K=E/2,H=M/2,V=P+1,q=O+1,W=0,ne=0,de=new T;for(let Ae=0;Ae<q;Ae++){let ve=Ae*k-K;for(let ye=0;ye<V;ye++){let te=ye*D-F;de[f]=te*_,de[v]=ve*y,de[g]=H,l.push(de.x,de.y,de.z),de[f]=0,de[v]=0,de[g]=M>0?1:-1,h.push(de.x,de.y,de.z),u.push(ye/P),u.push(1-Ae/O),W+=1}}for(let Ae=0;Ae<O;Ae++)for(let ve=0;ve<P;ve++){let ye=p+ve+V*Ae,te=p+ve+V*(Ae+1),ce=p+(ve+1)+V*(Ae+1),oe=p+(ve+1)+V*Ae;c.push(ye,te,oe),c.push(te,ce,oe),ne+=6}o.addGroup(d,ne,L),d+=ne,p+=W}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new be(l,3)),this.setAttribute("normal",new be(h,3)),this.setAttribute("uv",new be(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Ya=class r extends ke{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,p=t,d=2*u+p,m=2*n+s,f=i+1,v=new T,g=new T;for(let _=0;_<=m;_++){let y=0,S=0,E=0,M=0;if(_<=n){let L=_/n,D=L*Math.PI/2;S=-h-e*Math.cos(D),E=e*Math.sin(D),M=-e*Math.cos(D),y=L*u}else if(_<=n+s){let L=(_-n)/s;S=L*t-h,E=e,M=0,y=u+L*p}else{let L=(_-n-s)/n,D=L*Math.PI/2;S=h+e*Math.sin(D),E=e*Math.cos(D),M=e*Math.sin(D),y=u+p+L*u}let P=Math.max(0,Math.min(1,y/d)),O=0;_===0?O=.5/i:_===m&&(O=-.5/i);for(let L=0;L<=i;L++){let D=L/i,k=D*Math.PI*2,F=Math.sin(k),K=Math.cos(k);g.x=-E*K,g.y=S,g.z=E*F,o.push(g.x,g.y,g.z),v.set(-E*K,M,E*F),v.normalize(),c.push(v.x,v.y,v.z),l.push(D+O,P)}if(_>0){let L=(_-1)*f;for(let D=0;D<i;D++){let k=L+D,F=L+D+1,K=_*f+D,H=_*f+D+1;a.push(k,F,K),a.push(F,H,K)}}}this.setIndex(a),this.setAttribute("position",new be(o,3)),this.setAttribute("normal",new be(c,3)),this.setAttribute("uv",new be(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Ka=class r extends ke{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],c=[],l=new T,h=new $;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,p=3;u<=t;u++,p+=3){let d=n+u/t*i;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[p]/e+1)/2,h.y=(a[p+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new be(a,3)),this.setAttribute("normal",new be(o,3)),this.setAttribute("uv",new be(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Es=class r extends ke{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],p=[],d=[],m=0,f=[],v=n/2,g=0;function _(y){let S=m,E=new $,M=new T,P=0,O=y===!0?e:t,L=y===!0?1:-1;for(let k=1;k<=i;k++)u.push(0,v*L,0),p.push(0,L,0),d.push(.5,.5),m++;let D=m;for(let k=0;k<=i;k++){let F=k/i*c+o,K=Math.cos(F),H=Math.sin(F);M.x=O*H,M.y=v*L,M.z=O*K,u.push(M.x,M.y,M.z),p.push(0,L,0),E.x=.5*K+.5,E.y=.5*H*L+.5,d.push(E.x,E.y),m++}for(let k=0;k<i;k++){let F=S+k,K=D+k;y===!0?h.push(K,K+1,F):h.push(K+1,K,F),P+=3}l.addGroup(g,P,y===!0?1:2),g+=P}(function(){let y=new T,S=new T,E=0,M=(t-e)/n;for(let P=0;P<=s;P++){let O=[],L=P/s,D=L*(t-e)+e;for(let k=0;k<=i;k++){let F=k/i,K=F*c+o,H=Math.sin(K),V=Math.cos(K);S.x=D*H,S.y=-L*n+v,S.z=D*V,u.push(S.x,S.y,S.z),y.set(H,M,V).normalize(),p.push(y.x,y.y,y.z),d.push(F,1-L),O.push(m++)}f.push(O)}for(let P=0;P<i;P++)for(let O=0;O<s;O++){let L=f[O][P],D=f[O+1][P],k=f[O+1][P+1],F=f[O][P+1];(e>0||O!==0)&&(h.push(L,D,F),E+=3),(t>0||O!==s-1)&&(h.push(D,k,F),E+=3)}l.addGroup(g,E,0),g+=E})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new be(u,3)),this.setAttribute("normal",new be(p,3)),this.setAttribute("uv",new be(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Za=class r extends Es{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ti=class r extends ke{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(d,m,f,v){let g=v+1,_=[];for(let y=0;y<=g;y++){_[y]=[];let S=d.clone().lerp(f,y/g),E=m.clone().lerp(f,y/g),M=g-y;for(let P=0;P<=M;P++)_[y][P]=P===0&&y===g?S:S.clone().lerp(E,P/M)}for(let y=0;y<g;y++)for(let S=0;S<2*(g-y)-1;S++){let E=Math.floor(S/2);S%2==0?(c(_[y][E+1]),c(_[y+1][E]),c(_[y][E])):(c(_[y][E+1]),c(_[y+1][E+1]),c(_[y+1][E]))}}function c(d){s.push(d.x,d.y,d.z)}function l(d,m){let f=3*d;m.x=e[f+0],m.y=e[f+1],m.z=e[f+2]}function h(d,m,f,v){v<0&&d.x===1&&(a[m]=d.x-1),f.x===0&&f.z===0&&(a[m]=v/2/Math.PI+.5)}function u(d){return Math.atan2(d.z,-d.x)}function p(d){return Math.atan2(-d.y,Math.sqrt(d.x*d.x+d.z*d.z))}(function(d){let m=new T,f=new T,v=new T;for(let g=0;g<t.length;g+=3)l(t[g+0],m),l(t[g+1],f),l(t[g+2],v),o(m,f,v,d)})(i),(function(d){let m=new T;for(let f=0;f<s.length;f+=3)m.x=s[f+0],m.y=s[f+1],m.z=s[f+2],m.normalize().multiplyScalar(d),s[f+0]=m.x,s[f+1]=m.y,s[f+2]=m.z})(n),(function(){let d=new T;for(let m=0;m<s.length;m+=3){d.x=s[m+0],d.y=s[m+1],d.z=s[m+2];let f=u(d)/2/Math.PI+.5,v=p(d)/Math.PI+.5;a.push(f,1-v)}(function(){let m=new T,f=new T,v=new T,g=new T,_=new $,y=new $,S=new $;for(let E=0,M=0;E<s.length;E+=9,M+=6){m.set(s[E+0],s[E+1],s[E+2]),f.set(s[E+3],s[E+4],s[E+5]),v.set(s[E+6],s[E+7],s[E+8]),_.set(a[M+0],a[M+1]),y.set(a[M+2],a[M+3]),S.set(a[M+4],a[M+5]),g.copy(m).add(f).add(v).divideScalar(3);let P=u(g);h(_,M+0,m,P),h(y,M+2,f,P),h(S,M+4,v,P)}})(),(function(){for(let m=0;m<a.length;m+=6){let f=a[m+0],v=a[m+2],g=a[m+4],_=Math.max(f,v,g),y=Math.min(f,v,g);_>.9&&y<.1&&(f<.2&&(a[m+0]+=1),v<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new be(s,3)),this.setAttribute("normal",new be(s.slice(),3)),this.setAttribute("uv",new be(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.detail)}},Ja=class r extends Ti{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Ia=new T,La=new T,Vl=new T,Na=new Qn,$a=class extends ke{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(vr*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),p={},d=[];for(let m=0;m<c;m+=3){a?(l[0]=a.getX(m),l[1]=a.getX(m+1),l[2]=a.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);let{a:f,b:v,c:g}=Na;if(f.fromBufferAttribute(o,l[0]),v.fromBufferAttribute(o,l[1]),g.fromBufferAttribute(o,l[2]),Na.getNormal(Vl),u[0]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,u[1]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let _=0;_<3;_++){let y=(_+1)%3,S=u[_],E=u[y],M=Na[h[_]],P=Na[h[y]],O=`${S}_${E}`,L=`${E}_${S}`;L in p&&p[L]?(Vl.dot(p[L].normal)<=s&&(d.push(M.x,M.y,M.z),d.push(P.x,P.y,P.z)),p[L]=null):O in p||(p[O]={index0:l[_],index1:l[y],normal:Vl.clone()})}}for(let m in p)if(p[m]){let{index0:f,index1:v}=p[m];Ia.fromBufferAttribute(o,f),La.fromBufferAttribute(o,v),d.push(Ia.x,Ia.y,Ia.z),d.push(La.x,La.y,La.z)}this.setAttribute("position",new be(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Kt=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ge("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,c=0,l=s-1;for(;c<=l;)if(i=Math.floor(c+(l-c)/2),o=n[i]-a,o<0)c=i+1;else{if(!(o>0)){l=i;break}l=i-1}if(i=l,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new $:new T);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new T,i=[],s=[],a=[],o=new T,c=new Ee;for(let d=0;d<=e;d++){let m=d/e;i[d]=this.getTangentAt(m,new T)}s[0]=new T,a[0]=new T;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),p=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),p<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Oe(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(o,m))}a[d].crossVectors(i[d],s[d])}if(t===!0){let d=Math.acos(Oe(s[0].dot(s[e]),-1,1));d/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(i[m],d*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Pr=class extends Kt{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new $){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=c-this.aX,d=l-this.aY;c=p*h-d*u+this.aX,l=p*u+d*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Qa=class extends Pr{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function mh(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let p=(a-s)/l-(o-s)/(l+h)+(o-a)/h,d=(o-a)/h-(c-a)/(h+u)+(c-o)/u;p*=h,d*=h,i(a,o,p,d)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}var ud=new T,dd=new T,Hl=new mh,Wl=new mh,Xl=new mh,eo=class extends Kt{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,c,l=Math.floor(a),h=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1),this.closed||l>0?o=i[(l-1)%s]:(dd.subVectors(i[0],i[1]).add(i[0]),o=dd);let u=i[l%s],p=i[(l+1)%s];if(this.closed||l+2<s?c=i[(l+2)%s]:(ud.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=ud),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(u),d),f=Math.pow(u.distanceToSquared(p),d),v=Math.pow(p.distanceToSquared(c),d);f<1e-4&&(f=1),m<1e-4&&(m=f),v<1e-4&&(v=f),Hl.initNonuniformCatmullRom(o.x,u.x,p.x,c.x,m,f,v),Wl.initNonuniformCatmullRom(o.y,u.y,p.y,c.y,m,f,v),Xl.initNonuniformCatmullRom(o.z,u.z,p.z,c.z,m,f,v)}else this.curveType==="catmullrom"&&(Hl.initCatmullRom(o.x,u.x,p.x,c.x,this.tension),Wl.initCatmullRom(o.y,u.y,p.y,c.y,this.tension),Xl.initCatmullRom(o.z,u.z,p.z,c.z,this.tension));return n.set(Hl.calc(h),Wl.calc(h),Xl.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function pd(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function cs(r,e,t,n){return(function(i,s){let a=1-i;return a*a*s})(r,e)+(function(i,s){return 2*(1-i)*i*s})(r,t)+(function(i,s){return i*i*s})(r,n)}function hs(r,e,t,n,i){return(function(s,a){let o=1-s;return o*o*o*a})(r,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(r,t)+(function(s,a){return 3*(1-s)*s*s*a})(r,n)+(function(s,a){return s*s*s*a})(r,i)}var As=class extends Kt{constructor(e=new $,t=new $,n=new $,i=new $){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new $){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(hs(e,i.x,s.x,a.x,o.x),hs(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},to=class extends Kt{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(hs(e,i.x,s.x,a.x,o.x),hs(e,i.y,s.y,a.y,o.y),hs(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ws=class extends Kt{constructor(e=new $,t=new $){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new $){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new $){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},no=class extends Kt{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Rs=class extends Kt{constructor(e=new $,t=new $,n=new $){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new $){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(cs(e,i.x,s.x,a.x),cs(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Cs=class extends Kt{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(cs(e,i.x,s.x,a.x),cs(e,i.y,s.y,a.y),cs(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ps=class extends Kt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new $){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(pd(o,c.x,l.x,h.x,u.x),pd(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new $().fromArray(i))}return this}},io=Object.freeze({__proto__:null,ArcCurve:Qa,CatmullRomCurve3:eo,CubicBezierCurve:As,CubicBezierCurve3:to,EllipseCurve:Pr,LineCurve:ws,LineCurve3:no,QuadraticBezierCurve:Rs,QuadraticBezierCurve3:Cs,SplineCurve:Ps}),ro=class extends Kt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new io[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new io[i.type]().fromJSON(i))}return this}},Is=class extends ro{constructor(e){super(),this.type="Path",this.currentPoint=new $,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ws(this.currentPoint.clone(),new $(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new Rs(this.currentPoint.clone(),new $(e,t),new $(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new As(this.currentPoint.clone(),new $(e,t),new $(n,i),new $(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ps(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){let l=new Pr(e,t,n,i,s,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ls=class extends Is{constructor(e){super(e),this.uuid=sn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Is().fromJSON(i))}return this}};function kf(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=fd(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,c,l;if(n&&(s=(function(h,u,p,d){let m=[];for(let f=0,v=u.length;f<v;f++){let g=fd(h,u[f]*d,f<v-1?u[f+1]*d:h.length,d,!1);g===g.next&&(g.steiner=!0),m.push(Kf(g))}m.sort(jf);for(let f=0;f<m.length;f++)p=qf(m[f],p);return p})(r,e,s,t)),r.length>80*t){o=r[0],c=r[1];let h=o,u=c;for(let p=t;p<i;p+=t){let d=r[p],m=r[p+1];d<o&&(o=d),m<c&&(c=m),d>h&&(h=d),m>u&&(u=m)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return Ns(s,a,t,o,c,l,0),a}function fd(r,e,t,n,i){let s;if(i===(function(a,o,c,l){let h=0;for(let u=o,p=c-l;u<c;u+=l)h+=(a[p]-a[u])*(a[u+1]+a[p+1]),p=u;return h})(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=md(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=md(a/n|0,r[a],r[a+1],s);return s&&Ir(s,s.next)&&(Us(s),s=s.next),s}function Xi(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!Ir(n,n.next)&&st(n.prev,n,n.next)!==0)n=n.next;else{if(Us(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Ns(r,e,t,n,i,s,a){if(!r)return;!a&&s&&(function(c,l,h,u){let p=c;do p.z===0&&(p.z=ic(p.x,p.y,l,h,u)),p.prevZ=p.prev,p.nextZ=p.next,p=p.next;while(p!==c);p.prevZ.nextZ=null,p.prevZ=null,(function(d){let m,f=1;do{let v,g=d;d=null;let _=null;for(m=0;g;){m++;let y=g,S=0;for(let M=0;M<f&&(S++,y=y.nextZ,y);M++);let E=f;for(;S>0||E>0&&y;)S!==0&&(E===0||!y||g.z<=y.z)?(v=g,g=g.nextZ,S--):(v=y,y=y.nextZ,E--),_?_.nextZ=v:d=v,v.prevZ=_,_=v;g=y}_.nextZ=null,f*=2}while(m>1)})(p)})(r,n,i,s);let o=r;for(;r.prev!==r.next;){let c=r.prev,l=r.next;if(s?Hf(r,n,i,s):Vf(r))e.push(c.i,r.i,l.i),Us(r),r=l.next,o=l.next;else if((r=l)===o){a?a===1?Ns(r=Wf(Xi(r),e),e,t,n,i,s,2):a===2&&Xf(r,e,t,n,i,s):Ns(Xi(r),e,t,n,i,s,1);break}}}function Vf(r){let e=r.prev,t=r,n=r.next;if(st(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(i,s,a),u=Math.min(o,c,l),p=Math.max(i,s,a),d=Math.max(o,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=p&&m.y>=u&&m.y<=d&&os(i,o,s,c,a,l,m.x,m.y)&&st(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Hf(r,e,t,n){let i=r.prev,s=r,a=r.next;if(st(i,s,a)>=0)return!1;let o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,p=a.y,d=Math.min(o,c,l),m=Math.min(h,u,p),f=Math.max(o,c,l),v=Math.max(h,u,p),g=ic(d,m,e,t,n),_=ic(f,v,e,t,n),y=r.prevZ,S=r.nextZ;for(;y&&y.z>=g&&S&&S.z<=_;){if(y.x>=d&&y.x<=f&&y.y>=m&&y.y<=v&&y!==i&&y!==a&&os(o,h,c,u,l,p,y.x,y.y)&&st(y.prev,y,y.next)>=0||(y=y.prevZ,S.x>=d&&S.x<=f&&S.y>=m&&S.y<=v&&S!==i&&S!==a&&os(o,h,c,u,l,p,S.x,S.y)&&st(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;y&&y.z>=g;){if(y.x>=d&&y.x<=f&&y.y>=m&&y.y<=v&&y!==i&&y!==a&&os(o,h,c,u,l,p,y.x,y.y)&&st(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;S&&S.z<=_;){if(S.x>=d&&S.x<=f&&S.y>=m&&S.y<=v&&S!==i&&S!==a&&os(o,h,c,u,l,p,S.x,S.y)&&st(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Wf(r,e){let t=r;do{let n=t.prev,i=t.next.next;!Ir(n,i)&&pp(n,t,t.next,i)&&Ds(n,i)&&Ds(i,n)&&(e.push(n.i,t.i,i.i),Us(t),Us(t.next),t=r=i),t=t.next}while(t!==r);return Xi(t)}function Xf(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Zf(a,o)){let c=fp(a,o);return a=Xi(a,a.next),c=Xi(c,c.next),Ns(a,e,t,n,i,s,0),void Ns(c,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function jf(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function qf(r,e){let t=(function(i,s){let a=s,o=i.x,c=i.y,l,h=-1/0;if(Ir(i,a))return a;do{if(Ir(i,a.next))return a.next;if(c<=a.y&&c>=a.next.y&&a.next.y!==a.y){let f=a.x+(c-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(f<=o&&f>h&&(h=f,l=a.x<a.next.x?a:a.next,f===o))return l}a=a.next}while(a!==s);if(!l)return null;let u=l,p=l.x,d=l.y,m=1/0;a=l;do{if(o>=a.x&&a.x>=p&&o!==a.x&&dp(c<d?o:h,c,p,d,c<d?h:o,c,a.x,a.y)){let f=Math.abs(c-a.y)/(o-a.x);Ds(a,i)&&(f<m||f===m&&(a.x>l.x||a.x===l.x&&Yf(l,a)))&&(l=a,m=f)}a=a.next}while(a!==u);return l})(r,e);if(!t)return e;let n=fp(t,r);return Xi(n,n.next),Xi(t,t.next)}function Yf(r,e){return st(r.prev,r,e.prev)<0&&st(e.next,r,r.next)<0}function ic(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Kf(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function dp(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function os(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&dp(r,e,t,n,i,s,a,o)}function Zf(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&pp(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1})(r,e)&&(Ds(r,e)&&Ds(e,r)&&(function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s})(r,e)&&(st(r.prev,r,e.prev)||st(r,e.prev,e))||Ir(r,e)&&st(r.prev,r,r.next)>0&&st(e.prev,e,e.next)>0)}function st(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Ir(r,e){return r.x===e.x&&r.y===e.y}function pp(r,e,t,n){let i=Ua(st(r,e,t)),s=Ua(st(r,e,n)),a=Ua(st(t,n,r)),o=Ua(st(t,n,e));return i!==s&&a!==o||!(i!==0||!Da(r,t,e))||!(s!==0||!Da(r,n,e))||!(a!==0||!Da(t,r,n))||!(o!==0||!Da(t,e,n))}function Da(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Ua(r){return r>0?1:r<0?-1:0}function Ds(r,e){return st(r.prev,r,r.next)<0?st(r,e,r.next)>=0&&st(r,r.prev,e)>=0:st(r,e,r.prev)<0||st(r,r.next,e)<0}function fp(r,e){let t=rc(r.i,r.x,r.y),n=rc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function md(r,e,t,n){let i=rc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Us(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function rc(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var sc=class{static triangulate(e,t,n=2){return kf(e,t,n)}},Pn=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];gd(e),_d(n,e);let a=e.length;t.forEach(gd);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,_d(n,t[c]);let o=sc.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}};function gd(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function _d(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var so=class r extends ke{constructor(e=new Ls([new $(.5,.5),new $(-.5,.5),new $(-.5,-.5),new $(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++)a(e[o]);function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,p=t.bevelEnabled===void 0||t.bevelEnabled,d=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:d-.1,f=t.bevelOffset!==void 0?t.bevelOffset:0,v=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:Jf,y,S,E,M,P,O=!1;if(g){y=g.getSpacedPoints(h),O=!0,p=!1;let R=!!g.isCatmullRomCurve3&&g.closed;S=g.computeFrenetFrames(h,R),E=new T,M=new T,P=new T}p||(v=0,d=0,m=0,f=0);let L=o.extractPoints(l),D=L.shape,k=L.holes;if(!Pn.isClockWise(D)){D=D.reverse();for(let R=0,U=k.length;R<U;R++){let x=k[R];Pn.isClockWise(x)&&(k[R]=x.reverse())}}function F(R){let U=10000000000000001e-36,x=R[0];for(let N=1;N<=R.length;N++){let I=N%R.length,w=R[I],G=w.x-x.x,X=w.y-x.y,Y=G*G+X*X,re=Math.max(Math.abs(w.x),Math.abs(w.y),Math.abs(x.x),Math.abs(x.y));Y<=U*re*re?(R.splice(I,1),N--):x=w}}F(D),k.forEach(F);let K=k.length,H=D;for(let R=0;R<K;R++){let U=k[R];D=D.concat(U)}function V(R,U,x){return U||we("ExtrudeGeometry: vec does not exist"),R.clone().addScaledVector(U,x)}let q=D.length;function W(R,U,x){let N,I,w,G=R.x-U.x,X=R.y-U.y,Y=x.x-R.x,re=x.y-R.y,xe=G*G+X*X,Me=G*re-X*Y;if(Math.abs(Me)>Number.EPSILON){let he=Math.sqrt(xe),Ce=Math.sqrt(Y*Y+re*re),ee=U.x-X/he,se=U.y+G/he,ie=((x.x-re/Ce-ee)*re-(x.y+Y/Ce-se)*Y)/(G*re-X*Y);N=ee+G*ie-R.x,I=se+X*ie-R.y;let pe=N*N+I*I;if(pe<=2)return new $(N,I);w=Math.sqrt(pe/2)}else{let he=!1;G>Number.EPSILON?Y>Number.EPSILON&&(he=!0):G<-Number.EPSILON?Y<-Number.EPSILON&&(he=!0):Math.sign(X)===Math.sign(re)&&(he=!0),he?(N=-X,I=G,w=Math.sqrt(xe)):(N=G,I=X,w=Math.sqrt(xe/2))}return new $(N/w,I/w)}let ne=[];for(let R=0,U=H.length,x=U-1,N=R+1;R<U;R++,x++,N++)x===U&&(x=0),N===U&&(N=0),ne[R]=W(H[R],H[x],H[N]);let de=[],Ae,ve,ye=ne.concat();for(let R=0,U=K;R<U;R++){let x=k[R];Ae=[];for(let N=0,I=x.length,w=I-1,G=N+1;N<I;N++,w++,G++)w===I&&(w=0),G===I&&(G=0),Ae[N]=W(x[N],x[w],x[G]);de.push(Ae),ye=ye.concat(Ae)}if(v===0)ve=Pn.triangulateShape(H,k);else{let R=[],U=[];for(let x=0;x<v;x++){let N=x/v,I=d*Math.cos(N*Math.PI/2),w=m*Math.sin(N*Math.PI/2)+f;for(let G=0,X=H.length;G<X;G++){let Y=V(H[G],ne[G],w);fe(Y.x,Y.y,-I),N===0&&R.push(Y)}for(let G=0,X=K;G<X;G++){let Y=k[G];Ae=de[G];let re=[];for(let xe=0,Me=Y.length;xe<Me;xe++){let he=V(Y[xe],Ae[xe],w);fe(he.x,he.y,-I),N===0&&re.push(he)}N===0&&U.push(re)}}ve=Pn.triangulateShape(R,U)}let te=ve.length,ce=m+f;for(let R=0;R<q;R++){let U=p?V(D[R],ye[R],ce):D[R];O?(M.copy(S.normals[0]).multiplyScalar(U.x),E.copy(S.binormals[0]).multiplyScalar(U.y),P.copy(y[0]).add(M).add(E),fe(P.x,P.y,P.z)):fe(U.x,U.y,0)}for(let R=1;R<=h;R++)for(let U=0;U<q;U++){let x=p?V(D[U],ye[U],ce):D[U];O?(M.copy(S.normals[R]).multiplyScalar(x.x),E.copy(S.binormals[R]).multiplyScalar(x.y),P.copy(y[R]).add(M).add(E),fe(P.x,P.y,P.z)):fe(x.x,x.y,u/h*R)}for(let R=v-1;R>=0;R--){let U=R/v,x=d*Math.cos(U*Math.PI/2),N=m*Math.sin(U*Math.PI/2)+f;for(let I=0,w=H.length;I<w;I++){let G=V(H[I],ne[I],N);fe(G.x,G.y,u+x)}for(let I=0,w=k.length;I<w;I++){let G=k[I];Ae=de[I];for(let X=0,Y=G.length;X<Y;X++){let re=V(G[X],Ae[X],N);O?fe(re.x,re.y+y[h-1].y,y[h-1].x+x):fe(re.x,re.y,u+x)}}}function oe(R,U){let x=R.length;for(;--x>=0;){let N=x,I=x-1;I<0&&(I=R.length-1);for(let w=0,G=h+2*v;w<G;w++){let X=q*w,Y=q*(w+1);Q(U+N+X,U+I+X,U+I+Y,U+N+Y)}}}function fe(R,U,x){c.push(R),c.push(U),c.push(x)}function Ue(R,U,x){C(R),C(U),C(x);let N=i.length/3,I=_.generateTopUV(n,i,N-3,N-2,N-1);b(I[0]),b(I[1]),b(I[2])}function Q(R,U,x,N){C(R),C(U),C(N),C(U),C(x),C(N);let I=i.length/3,w=_.generateSideWallUV(n,i,I-6,I-3,I-2,I-1);b(w[0]),b(w[1]),b(w[3]),b(w[1]),b(w[2]),b(w[3])}function C(R){i.push(c[3*R+0]),i.push(c[3*R+1]),i.push(c[3*R+2])}function b(R){s.push(R.x),s.push(R.y)}(function(){let R=i.length/3;if(p){let U=0,x=q*U;for(let N=0;N<te;N++){let I=ve[N];Ue(I[2]+x,I[1]+x,I[0]+x)}U=h+2*v,x=q*U;for(let N=0;N<te;N++){let I=ve[N];Ue(I[0]+x,I[1]+x,I[2]+x)}}else{for(let U=0;U<te;U++){let x=ve[U];Ue(x[2],x[1],x[0])}for(let U=0;U<te;U++){let x=ve[U];Ue(x[0]+q*h,x[1]+q*h,x[2]+q*h)}}n.addGroup(R,i.length/3-R,0)})(),(function(){let R=i.length/3,U=0;oe(H,U),U+=H.length;for(let x=0,N=k.length;x<N;x++){let I=k[x];oe(I,U),U+=I.length}n.addGroup(R,i.length/3-R,1)})()}this.setAttribute("position",new be(i,3)),this.setAttribute("uv",new be(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new io[i.type]().fromJSON(i)),new r(n,e.options)}},Jf={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],c=e[3*n+1],l=e[3*i],h=e[3*i+1];return[new $(s,a),new $(o,c),new $(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],c=e[3*t+2],l=e[3*n],h=e[3*n+1],u=e[3*n+2],p=e[3*i],d=e[3*i+1],m=e[3*i+2],f=e[3*s],v=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-l)?[new $(a,1-c),new $(l,1-u),new $(p,1-m),new $(f,1-g)]:[new $(o,1-c),new $(h,1-u),new $(d,1-m),new $(v,1-g)]}},ao=class r extends Ti{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},oo=class r extends ke{constructor(e=[new $(0,-.5),new $(.5,0),new $(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Oe(i,0,2*Math.PI);let s=[],a=[],o=[],c=[],l=[],h=1/t,u=new T,p=new $,d=new T,m=new T,f=new T,v=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,d.x=1*g,d.y=-v,d.z=0*g,f.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:c.push(f.x,f.y,f.z);break;default:v=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,d.x=1*g,d.y=-v,d.z=0*g,m.copy(d),d.x+=f.x,d.y+=f.y,d.z+=f.z,d.normalize(),c.push(d.x,d.y,d.z),f.copy(m)}for(let _=0;_<=t;_++){let y=n+_*h*i,S=Math.sin(y),E=Math.cos(y);for(let M=0;M<=e.length-1;M++){u.x=e[M].x*S,u.y=e[M].y,u.z=e[M].x*E,a.push(u.x,u.y,u.z),p.x=_/t,p.y=M/(e.length-1),o.push(p.x,p.y);let P=c[3*M+0]*S,O=c[3*M+1],L=c[3*M+0]*E;l.push(P,O,L)}}for(let _=0;_<t;_++)for(let y=0;y<e.length-1;y++){let S=y+_*e.length,E=S,M=S+e.length,P=S+e.length+1,O=S+1;s.push(E,M,O),s.push(P,O,M)}this.setIndex(s),this.setAttribute("position",new be(a,3)),this.setAttribute("uv",new be(o,2)),this.setAttribute("normal",new be(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},lo=class r extends Ti{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Lr=class r extends ke{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,p=t/c,d=[],m=[],f=[],v=[];for(let g=0;g<h;g++){let _=g*p-a;for(let y=0;y<l;y++){let S=y*u-s;m.push(S,-_,0),f.push(0,0,1),v.push(y/o),v.push(1-g/c)}}for(let g=0;g<c;g++)for(let _=0;_<o;_++){let y=_+l*g,S=_+l*(g+1),E=_+1+l*(g+1),M=_+1+l*g;d.push(y,S,M),d.push(S,E,M)}this.setIndex(d),this.setAttribute("position",new be(m,3)),this.setAttribute("normal",new be(f,3)),this.setAttribute("uv",new be(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},co=class r extends ke{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],c=[],l=[],h=[],u=e,p=(t-e)/(i=Math.max(1,i)),d=new T,m=new $;for(let f=0;f<=i;f++){for(let v=0;v<=n;v++){let g=s+v/n*a;d.x=u*Math.cos(g),d.y=u*Math.sin(g),c.push(d.x,d.y,d.z),l.push(0,0,1),m.x=(d.x/t+1)/2,m.y=(d.y/t+1)/2,h.push(m.x,m.y)}u+=p}for(let f=0;f<i;f++){let v=f*(n+1);for(let g=0;g<n;g++){let _=g+v,y=_,S=_+n+1,E=_+n+2,M=_+1;o.push(y,S,M),o.push(S,E,M)}}this.setIndex(o),this.setAttribute("position",new be(c,3)),this.setAttribute("normal",new be(l,3)),this.setAttribute("uv",new be(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},ho=class r extends ke{constructor(e=new Ls([new $(0,.5),new $(-.5,-.5),new $(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;function l(h){let u=i.length/3,p=h.extractPoints(t),d=p.shape,m=p.holes;Pn.isClockWise(d)===!1&&(d=d.reverse());for(let v=0,g=m.length;v<g;v++){let _=m[v];Pn.isClockWise(_)===!0&&(m[v]=_.reverse())}let f=Pn.triangulateShape(d,m);for(let v=0,g=m.length;v<g;v++){let _=m[v];d=d.concat(_)}for(let v=0,g=d.length;v<g;v++){let _=d[v];i.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let v=0,g=f.length;v<g;v++){let _=f[v],y=_[0]+u,S=_[1]+u,E=_[2]+u;n.push(y,S,E),c+=3}}this.setIndex(n),this.setAttribute("position",new be(i,3)),this.setAttribute("normal",new be(s,3)),this.setAttribute("uv",new be(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},uo=class r extends ke{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new T,p=new T,d=[],m=[],f=[],v=[];for(let g=0;g<=n;g++){let _=[],y=g/n,S=a+y*o,E=e*Math.cos(S),M=Math.sqrt(e*e-E*E),P=0;g===0&&a===0?P=.5/t:g===n&&c===Math.PI&&(P=-.5/t);for(let O=0;O<=t;O++){let L=O/t,D=i+L*s;u.x=-M*Math.cos(D),u.y=E,u.z=M*Math.sin(D),m.push(u.x,u.y,u.z),p.copy(u).normalize(),f.push(p.x,p.y,p.z),v.push(L+P,1-y),_.push(l++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let y=h[g][_+1],S=h[g][_],E=h[g+1][_],M=h[g+1][_+1];(g!==0||a>0)&&d.push(y,S,M),(g!==n-1||c<Math.PI)&&d.push(S,E,M)}this.setIndex(d),this.setAttribute("position",new be(m,3)),this.setAttribute("normal",new be(f,3)),this.setAttribute("uv",new be(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},po=class r extends Ti{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},fo=class r extends ke{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI,a=0,o=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);let c=[],l=[],h=[],u=[],p=new T,d=new T,m=new T;for(let f=0;f<=n;f++){let v=a+f/n*o;for(let g=0;g<=i;g++){let _=g/i*s;d.x=(e+t*Math.cos(v))*Math.cos(_),d.y=(e+t*Math.cos(v))*Math.sin(_),d.z=t*Math.sin(v),l.push(d.x,d.y,d.z),p.x=e*Math.cos(_),p.y=e*Math.sin(_),m.subVectors(d,p).normalize(),h.push(m.x,m.y,m.z),u.push(g/i),u.push(f/n)}}for(let f=1;f<=n;f++)for(let v=1;v<=i;v++){let g=(i+1)*f+v-1,_=(i+1)*(f-1)+v-1,y=(i+1)*(f-1)+v,S=(i+1)*f+v;c.push(g,_,S),c.push(_,y,S)}this.setIndex(c),this.setAttribute("position",new be(l,3)),this.setAttribute("normal",new be(h,3)),this.setAttribute("uv",new be(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},mo=class r extends ke{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],c=[],l=[],h=[],u=new T,p=new T,d=new T,m=new T,f=new T,v=new T,g=new T;for(let y=0;y<=n;++y){let S=y/n*s*Math.PI*2;_(S,s,a,e,d),_(S+.01,s,a,e,m),v.subVectors(m,d),g.addVectors(m,d),f.crossVectors(v,g),g.crossVectors(f,v),f.normalize(),g.normalize();for(let E=0;E<=i;++E){let M=E/i*Math.PI*2,P=-t*Math.cos(M),O=t*Math.sin(M);u.x=d.x+(P*g.x+O*f.x),u.y=d.y+(P*g.y+O*f.y),u.z=d.z+(P*g.z+O*f.z),c.push(u.x,u.y,u.z),p.subVectors(u,d).normalize(),l.push(p.x,p.y,p.z),h.push(y/n),h.push(E/i)}}for(let y=1;y<=n;y++)for(let S=1;S<=i;S++){let E=(i+1)*(y-1)+(S-1),M=(i+1)*y+(S-1),P=(i+1)*y+S,O=(i+1)*(y-1)+S;o.push(E,M,O),o.push(M,P,O)}function _(y,S,E,M,P){let O=Math.cos(y),L=Math.sin(y),D=E/S*y,k=Math.cos(D);P.x=M*(2+k)*.5*O,P.y=M*(2+k)*L*.5,P.z=M*Math.sin(D)*.5}this.setIndex(o),this.setAttribute("position",new be(c,3)),this.setAttribute("normal",new be(l,3)),this.setAttribute("uv",new be(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},go=class r extends ke{constructor(e=new Cs(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new T,c=new T,l=new $,h=new T,u=[],p=[],d=[],m=[];function f(v){h=e.getPointAt(v/t,h);let g=a.normals[v],_=a.binormals[v];for(let y=0;y<=i;y++){let S=y/i*Math.PI*2,E=Math.sin(S),M=-Math.cos(S);c.x=M*g.x+E*_.x,c.y=M*g.y+E*_.y,c.z=M*g.z+E*_.z,c.normalize(),p.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}(function(){for(let v=0;v<t;v++)f(v);f(s===!1?t:0),(function(){for(let v=0;v<=t;v++)for(let g=0;g<=i;g++)l.x=v/t,l.y=g/i,d.push(l.x,l.y)})(),(function(){for(let v=1;v<=t;v++)for(let g=1;g<=i;g++){let _=(i+1)*(v-1)+(g-1),y=(i+1)*v+(g-1),S=(i+1)*v+g,E=(i+1)*(v-1)+g;m.push(_,y,E),m.push(y,S,E)}})()})(),this.setIndex(m),this.setAttribute("position",new be(u,3)),this.setAttribute("normal",new be(p,3)),this.setAttribute("uv",new be(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new io[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},_o=class extends ke{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new T,s=new T;if(e.index!==null){let a=e.attributes.position,o=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],p=u.start;for(let d=p,m=p+u.count;d<m;d+=3)for(let f=0;f<3;f++){let v=o.getX(d+f),g=o.getX(d+(f+1)%3);i.fromBufferAttribute(a,v),s.fromBufferAttribute(a,g),vd(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let h=3*o+l,u=3*o+(l+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),vd(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new be(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function vd(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}var r0=Object.freeze({__proto__:null,BoxGeometry:Nn,CapsuleGeometry:Ya,CircleGeometry:Ka,ConeGeometry:Za,CylinderGeometry:Es,DodecahedronGeometry:Ja,EdgesGeometry:$a,ExtrudeGeometry:so,IcosahedronGeometry:ao,LatheGeometry:oo,OctahedronGeometry:lo,PlaneGeometry:Lr,PolyhedronGeometry:Ti,RingGeometry:co,ShapeGeometry:ho,SphereGeometry:uo,TetrahedronGeometry:po,TorusGeometry:fo,TorusKnotGeometry:mo,TubeGeometry:go,WireframeGeometry:_o});function $i(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];if(yd(i))i.isRenderTargetTexture?(ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(yd(i[0])){let s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Nt(r){let e={};for(let t=0;t<r.length;t++){let n=$i(r[t]);for(let i in n)e[i]=n[i]}return e}function yd(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function gh(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ze.workingColorSpace}var mp={clone:$i,merge:Nt},Zt=class extends Vt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new _e().setHex(i.value);break;case"v2":this.uniforms[n].value=new $().fromArray(i.value);break;case"v3":this.uniforms[n].value=new T().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Ze().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Ne().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Ee().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},vo=class extends Zt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Dn=class extends Vt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new _e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new $(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ht=class extends Dn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new $(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Oe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new _e(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new _e(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new _e(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var yo=class extends Vt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},xo=class extends Vt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Oa(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}function $f(r){let e=r.length,t=new Array(e);for(let n=0;n!==e;++n)t[n]=n;return t.sort(function(n,i){return r[n]-r[i]}),t}function xd(r,e,t){let n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let c=0;c!==e;++c)i[a++]=r[o+c]}return i}function Qf(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}var Un=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Mo=class extends Un{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Jl,endingEnd:Jl}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case $l:s=e,o=2*t-n;break;case Ql:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case $l:a=e,c=2*n-t;break;case Ql:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=.5*(n-t),h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,p=this._weightPrev,d=this._weightNext,m=(n-t)/(i-t),f=m*m,v=f*m,g=-p*v+2*p*f-p*m,_=(1+p)*v+(-1.5-2*p)*f+(-.5+p)*m+1,y=(-1-d)*v+(1.5+d)*f+.5*m,S=d*v-d*f;for(let E=0;E!==o;++E)s[E]=g*a[h+E]+_*a[l+E]+y*a[c+E]+S*a[u+E];return s}},So=class extends Un{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let p=0;p!==o;++p)s[p]=a[l+p]*u+a[c+p]*h;return s}},bo=class extends Un{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},To=class extends Un{interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(n-t)/(i-t),f=1-m;for(let v=0;v!==o;++v)s[v]=a[l+v]*f+a[c+v]*m;return s}let p=2*o,d=e-1;for(let m=0;m!==o;++m){let f=a[l+m],v=a[c+m],g=d*p+2*m,_=u[g],y=u[g+1],S=e*p+2*m,E=h[S],M=h[S+1],P,O,L,D,k,F=(n-t)/(i-t);for(let K=0;K<8;K++){P=F*F,O=P*F,L=1-F,D=L*L,k=D*L;let H=k*t+3*D*F*_+3*L*P*E+O*i-n;if(Math.abs(H)<1e-10)break;let V=3*D*(_-t)+6*L*F*(E-_)+3*P*(i-E);if(Math.abs(V)<1e-10)break;F-=H/V,F=Math.max(0,Math.min(1,F))}s[m]=k*f+3*D*F*y+3*L*P*M+O*v}return s}},kt=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Oa(t,this.TimeBufferType),this.values=Oa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Oa(e.times,Array),values:Oa(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new bo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new So(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new To(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ki:t=this.InterpolantFactoryMethodDiscrete;break;case Vi:t=this.InterpolantFactoryMethodLinear;break;case za:t=this.InterpolantFactoryMethodSmooth;break;case Zl:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return ge("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ki;case this.InterpolantFactoryMethodLinear:return Vi;case this.InterpolantFactoryMethodSmooth:return za;case this.InterpolantFactoryMethodBezier:return Zl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(we("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(we("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){we("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){we("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&yf(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){we("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===za,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o];if(l!==e[o+1]&&(o!==1||l!==e[0]))if(i)c=!0;else{let h=o*n,u=h-n,p=h+n;for(let d=0;d!==n;++d){let m=t[h+d];if(m!==t[u+d]||m!==t[p+d]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let p=0;p!==n;++p)t[u+p]=t[h+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};kt.prototype.ValueTypeName="",kt.prototype.TimeBufferType=Float32Array,kt.prototype.ValueBufferType=Float32Array,kt.prototype.DefaultInterpolation=Vi;var ei=class extends kt{constructor(e,t,n){super(e,t,n)}};ei.prototype.ValueTypeName="bool",ei.prototype.ValueBufferType=Array,ei.prototype.DefaultInterpolation=ki,ei.prototype.InterpolantFactoryMethodLinear=void 0,ei.prototype.InterpolantFactoryMethodSmooth=void 0;var Os=class extends kt{constructor(e,t,n,i){super(e,t,n,i)}};Os.prototype.ValueTypeName="color";var ci=class extends kt{constructor(e,t,n,i){super(e,t,n,i)}};ci.prototype.ValueTypeName="number";var Eo=class extends Un{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)ct.slerpFlat(s,0,a,l-o,a,l,c);return s}},On=class extends kt{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Eo(this.times,this.values,this.getValueSize(),e)}};On.prototype.ValueTypeName="quaternion",On.prototype.InterpolantFactoryMethodSmooth=void 0;var ti=class extends kt{constructor(e,t,n){super(e,t,n)}};ti.prototype.ValueTypeName="string",ti.prototype.ValueBufferType=Array,ti.prototype.DefaultInterpolation=ki,ti.prototype.InterpolantFactoryMethodLinear=void 0,ti.prototype.InterpolantFactoryMethodSmooth=void 0;var hi=class extends kt{constructor(e,t,n,i){super(e,t,n,i)}};hi.prototype.ValueTypeName="vector";var Nr=class{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=sn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(em(n[a]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(kt.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);let h=$f(c);c=xd(c,1,h),l=xd(l,1,h),i||c[0]!==0||(c.push(s),l.push(l[0])),a.push(new ci(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(s);if(h&&h.length>1){let u=h[1],p=i[u];p||(i[u]=p=[]),p.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=0;for(let t=0,n=this.tracks.length;t!==n;++t){let i=this.tracks[t];e=Math.max(e,i.times[i.times.length-1])}return this.duration=e,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function em(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=(function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ci;case"vector":case"vector2":case"vector3":case"vector4":return hi;case"color":return Os;case"quaternion":return On;case"bool":case"boolean":return ei;case"string":return ti}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)})(r.type);if(r.times===void 0){let t=[],n=[];Qf(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}var In={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(Md(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!Md(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function Md(r){try{let e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Ao=class{constructor(e,t,n){let i=this,s,a=!1,o=0,c=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){c++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,c),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,c),o===c&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,p=l.length;u<p;u+=2){let d=l[u],m=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},gp=new Ao,Fn=class{constructor(e){this.manager=e!==void 0?e:gp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Fn.DEFAULT_MATERIAL_NAME="__DEFAULT";var $n={},ac=class extends Error{constructor(e,t){super(e),this.response=t}},Dr=class extends Fn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=In.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),void setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);if($n[e]!==void 0)return void $n[e].push({onLoad:t,onProgress:n,onError:i});$n[e]=[],$n[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&ge("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=$n[e],u=l.body.getReader(),p=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=p?parseInt(p):0,m=d!==0,f=0,v=new ReadableStream({start(g){(function _(){u.read().then(({done:y,value:S})=>{if(y)g.close();else{f+=S.byteLength;let E=new ProgressEvent("progress",{lengthComputable:m,loaded:f,total:d});for(let M=0,P=h.length;M<P;M++){let O=h[M];O.onProgress&&O.onProgress(E)}g.enqueue(S),_()}},y=>{g.error(y)})})()}});return new Response(v)}throw new ac(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(u);return l.arrayBuffer().then(d=>p.decode(d))}}}).then(l=>{In.add(`file:${e}`,l);let h=$n[e];delete $n[e];for(let u=0,p=h.length;u<p;u++){let d=h[u];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=$n[e];if(h===void 0)throw this.manager.itemError(e),l;delete $n[e];for(let u=0,p=h.length;u<p;u++){let d=h[u];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var gr=new WeakMap,wo=class extends Fn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=In.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=gr.get(a);u===void 0&&(u=[],gr.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=Sr("img");function c(){h(),t&&t(this);let u=gr.get(this)||[];for(let p=0;p<u.length;p++){let d=u[p];d.onLoad&&d.onLoad(this)}gr.delete(this),s.manager.itemEnd(e)}function l(u){h(),i&&i(u),In.remove(`image:${e}`);let p=gr.get(this)||[];for(let d=0;d<p.length;d++){let m=p[d];m.onError&&m.onError(u)}gr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),In.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Fs=class extends Fn{constructor(e){super(e)}load(e,t,n,i){let s=new Et,a=new wo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},ji=class extends tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new _e(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Bs=class extends ji{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new _e(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},jl=new Ee,Sd=new T,bd=new T,zs=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $(512,512),this.mapType=Jt,this.map=null,this.mapPass=null,this.matrix=new Ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new si,this._frameExtents=new $(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Sd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sd),bd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bd),t.updateMatrixWorld(),jl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Mr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(jl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fa=new T,Ba=new ct,Cn=new T,Ur=class extends tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Fa,Ba,Cn),Cn.x===1&&Cn.y===1&&Cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fa,Ba,Cn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Fa,Ba,Cn),Cn.x===1&&Cn.y===1&&Cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fa,Ba,Cn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},xi=new T,Td=new $,Ed=new $,gt=class extends Ur{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Hi*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*vr*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Hi*Math.atan(Math.tan(.5*vr*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xi.x,xi.y).multiplyScalar(-e/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xi.x,xi.y).multiplyScalar(-e/xi.z)}getViewSize(e,t){return this.getViewBounds(e,Td,Ed),t.subVectors(Ed,Td)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*vr*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},oc=class extends zs{constructor(){super(new gt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=2*Hi*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;n===t.fov&&i===t.aspect&&s===t.far||(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Gs=class extends ji{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(tt.DEFAULT_UP),this.updateMatrix(),this.target=new tt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new oc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},lc=class extends zs{constructor(){super(new gt(90,1,.5,500)),this.isPointLightShadow=!0}},ks=class extends ji{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new lc}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ei=class extends Ur{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},cc=class extends zs{constructor(){super(new Ei(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ai=class extends ji{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tt.DEFAULT_UP),this.updateMatrix(),this.target=new tt,this.shadow=new cc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ui=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var ql=new WeakMap,Vs=class extends Fn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&ge("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&ge("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=In.get(`image-bitmap:${e}`);if(a!==void 0)return s.manager.itemStart(e),a.then?void a.then(l=>{ql.has(a)===!0?(i&&i(ql.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(l),s.manager.itemEnd(e))}):void setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){In.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){i&&i(l),ql.set(c,l),In.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});In.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var s0=new Ee,a0=new Ee,o0=new Ee;var _r=-90,Ro=class extends tt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new gt(_r,1,e,t);i.layers=this.layers,this.add(i);let s=new gt(_r,1,e,t);s.layers=this.layers,this.add(s);let a=new gt(_r,1,e,t);a.layers=this.layers,this.add(a);let o=new gt(_r,1,e,t);o.layers=this.layers,this.add(o);let c=new gt(_r,1,e,t);c.layers=this.layers,this.add(c);let l=new gt(_r,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===ii)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else{if(e!==Mr)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let v=!1;v=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,i),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=f,e.setRenderTarget(n,5,i),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,p,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Co=class extends gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var l0=new T,c0=new ct,h0=new T,u0=new T,d0=new T;var p0=new T,f0=new ct,m0=new T,g0=new T;var _h="\\[\\]\\.:\\/",tm=new RegExp("["+_h+"]","g"),Yl="[^"+_h+"]",nm="[^"+_h.replace("\\.","")+"]",im=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Yl)+/(WCOD+)?/.source.replace("WCOD",nm)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Yl)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Yl)+"$"),rm=["material","materials","bones","map"],$e=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(tm,"")}static parseTrackName(e){let t=im.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);rm.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void ge("PropertyBinding: No target node found for track: "+this.path+".");if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material)return void we("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void we("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void we("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void we("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void we("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void we("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(l!==void 0){if(e[l]===void 0)return void we("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let a=e[i];if(a===void 0)return void we("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+i+" but it wasn't found.",e);let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void we("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void we("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};$e.Composite=class{constructor(r,e,t){let n=t||$e.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},$e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},$e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},$e.prototype.GetterByBindingType=[$e.prototype._getValue_direct,$e.prototype._getValue_array,$e.prototype._getValue_arrayElement,$e.prototype._getValue_toArray],$e.prototype.SetterByBindingTypeAndVersioning=[[$e.prototype._setValue_direct,$e.prototype._setValue_direct_setNeedsUpdate,$e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_array,$e.prototype._setValue_array_setNeedsUpdate,$e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_arrayElement,$e.prototype._setValue_arrayElement_setNeedsUpdate,$e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_fromArray,$e.prototype._setValue_fromArray_setNeedsUpdate,$e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var _0=new Float32Array(1);var v0=new Ee;var Or=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Oe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Oe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var hc=class r{static{r.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}},y0=new $;var x0=new T,M0=new T,S0=new T,b0=new T,T0=new T,E0=new T,A0=new T;var w0=new T;var R0=new T,C0=new Ee,P0=new Ee;var I0=new T,L0=new _e,N0=new _e;var Hs=class extends oi{constructor(e=10,t=10,n=4473924,i=8947848){n=new _e(n),i=new _e(i);let s=t/2,a=e/t,o=e/2,c=[],l=[];for(let u=0,p=0,d=-o;u<=t;u++,d+=a){c.push(-o,0,d,o,0,d),c.push(d,0,-o,d,0,o);let m=u===s?n:i;m.toArray(l,p),p+=3,m.toArray(l,p),p+=3,m.toArray(l,p),p+=3,m.toArray(l,p),p+=3}let h=new ke;h.setAttribute("position",new be(c,3)),h.setAttribute("color",new be(l,3)),super(h,new Sn({vertexColors:!0,toneMapped:!1})),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var D0=new T,U0=new T,O0=new T;var F0=new T,B0=new Ur;var z0=new At;var G0=new T;var Ws=class extends oi{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=new ke;n.setAttribute("position",new be(t,3)),n.setAttribute("color",new be([1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],3)),super(n,new Sn({vertexColors:!0,toneMapped:!1})),this.type="AxesHelper"}setColors(e,t,n){let i=new _e,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}};var Xs=class extends yn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){e!==void 0?(this.domElement!==null&&this.disconnect(),this.domElement=e):ge("Controls: connect() now requires an element.")}disconnect(){}dispose(){}update(){}};function vh(r,e,t,n){let i=(function(s){switch(s){case Jt:case Pc:return{byteLength:1,components:1};case kr:case Ic:case Gn:return{byteLength:2,components:1};case Oo:case Fo:return{byteLength:2,components:4};case di:case Uo:case $t:return{byteLength:4,components:1};case Lc:case Nc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)})(n);switch(t){case 1021:return r*e;case Bo:case zo:return r*e/i.components*i.byteLength;case 1030:case 1031:return r*e*2/i.components*i.byteLength;case 1022:return r*e*3/i.components*i.byteLength;case on:case 1033:return r*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37490:case 37491:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}})),typeof window<"u"&&(window.__THREE__?ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function zp(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function lm(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,(function(s,a){let o=s.array,c=s.usage,l=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,c),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)u=r.HALF_FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:l}})(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let c=a.array,l=a.updateRanges;if(r.bindBuffer(o,s),l.length===0)r.bufferSubData(o,0,c);else{l.sort((u,p)=>u.start-p.start);let h=0;for(let u=1;u<l.length;u++){let p=l[h],d=l[u];d.start<=p.start+p.count+1?p.count=Math.max(p.count,d.start+d.count-p.start):(++h,l[h]=d)}l.length=h+1;for(let u=0,p=l.length;u<p;u++){let d=l[u];r.bufferSubData(o,d.start*c.BYTES_PER_ELEMENT,c,d.start,d.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}var Fe={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},le={common:{diffuse:{value:new _e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new $(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new T},probesMax:{value:new T},probesResolution:{value:new T}},points:{diffuse:{value:new _e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new _e(16777215)},opacity:{value:1},center:{value:new $(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},Vn={basic:{uniforms:Nt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Nt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new _e(0)},envMapIntensity:{value:1}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Nt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new _e(0)},specular:{value:new _e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Nt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new _e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Nt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new _e(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Nt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Nt([le.points,le.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Nt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Nt([le.common,le.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Nt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Nt([le.sprite,le.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distance:{uniforms:Nt([le.common,le.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distance_vert,fragmentShader:Fe.distance_frag},shadow:{uniforms:Nt([le.lights,le.fog,{color:{value:new _e(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};Vn.physical={uniforms:Nt([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new $(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new _e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new $},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new _e(0)},specularColor:{value:new _e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new $},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};var Yo={r:0,b:0,g:0},cm=new Ee,Gp=new Ne;function hm(r,e,t,n,i,s){let a=new _e(0),o,c,l=i===!0?0:1,h=null,u=0,p=null;function d(f){let v=f.isScene===!0?f.background:null;if(v&&v.isTexture){let g=f.backgroundBlurriness>0;v=e.get(v,g)}return v}function m(f,v){f.getRGB(Yo,gh(r)),t.buffers.color.setClear(Yo.r,Yo.g,Yo.b,v,s)}return{getClearColor:function(){return a},setClearColor:function(f,v=1){a.set(f),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,m(a,l)},render:function(f){let v=!1,g=d(f);g===null?m(a,l):g&&g.isColor&&(m(g,1),v=!0);let _=r.xr.getEnvironmentBlendMode();_==="additive"?t.buffers.color.setClear(0,0,0,1,s):_==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(f,v){let g=d(v);g&&(g.isCubeTexture||g.mapping===Ys)?(c===void 0&&(c=new ht(new Nn(1,1,1),new Zt({name:"BackgroundCubeMaterial",uniforms:$i(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,y,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=g,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(cm.makeRotationFromEuler(v.backgroundRotation)).transpose(),g.isCubeTexture&&g.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Gp),c.material.toneMapped=ze.getTransfer(g.colorSpace)!==qe,h===g&&u===g.version&&p===r.toneMapping||(c.material.needsUpdate=!0,h=g,u=g.version,p=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null)):g&&g.isTexture&&(o===void 0&&(o=new ht(new Lr(2,2),new Zt({name:"BackgroundMaterial",uniforms:$i(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=g,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=ze.getTransfer(g.colorSpace)!==qe,g.matrixAutoUpdate===!0&&g.updateMatrix(),o.material.uniforms.uvTransform.value.copy(g.matrix),h===g&&u===g.version&&p===r.toneMapping||(o.material.needsUpdate=!0,h=g,u=g.version,p=r.toneMapping),o.layers.enableAll(),f.unshift(o,o.geometry,o.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}}}function um(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=l(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function c(g){return r.deleteVertexArray(g)}function l(g){let _=[],y=[],S=[];for(let E=0;E<t;E++)_[E]=0,y[E]=0,S[E]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:y,attributeDivisors:S,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,y=g.length;_<y;_++)g[_]=0}function u(g){p(g,0)}function p(g,_){let y=s.newAttributes,S=s.enabledAttributes,E=s.attributeDivisors;y[g]=1,S[g]===0&&(r.enableVertexAttribArray(g),S[g]=1),E[g]!==_&&(r.vertexAttribDivisor(g,_),E[g]=_)}function d(){let g=s.newAttributes,_=s.enabledAttributes;for(let y=0,S=_.length;y<S;y++)_[y]!==g[y]&&(r.disableVertexAttribArray(y),_[y]=0)}function m(g,_,y,S,E,M,P){P===!0?r.vertexAttribIPointer(g,_,y,E,M):r.vertexAttribPointer(g,_,y,S,E,M)}function f(){v(),a=!0,s!==i&&(s=i,o(s.object))}function v(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,_,y,S,E){let M=!1,P=(function(O,L,D,k){let F=k.wireframe===!0,K=n[L.id];K===void 0&&(K={},n[L.id]=K);let H=O.isInstancedMesh===!0?O.id:0,V=K[H];V===void 0&&(V={},K[H]=V);let q=V[D.id];q===void 0&&(q={},V[D.id]=q);let W=q[F];return W===void 0&&(W=l(r.createVertexArray()),q[F]=W),W})(g,S,y,_);s!==P&&(s=P,o(s.object)),M=(function(O,L,D,k){let F=s.attributes,K=L.attributes,H=0,V=D.getAttributes();for(let q in V)if(V[q].location>=0){let W=F[q],ne=K[q];if(ne===void 0&&(q==="instanceMatrix"&&O.instanceMatrix&&(ne=O.instanceMatrix),q==="instanceColor"&&O.instanceColor&&(ne=O.instanceColor)),W===void 0||W.attribute!==ne||ne&&W.data!==ne.data)return!0;H++}return s.attributesNum!==H||s.index!==k})(g,S,y,E),M&&(function(O,L,D,k){let F={},K=L.attributes,H=0,V=D.getAttributes();for(let q in V)if(V[q].location>=0){let W=K[q];W===void 0&&(q==="instanceMatrix"&&O.instanceMatrix&&(W=O.instanceMatrix),q==="instanceColor"&&O.instanceColor&&(W=O.instanceColor));let ne={};ne.attribute=W,W&&W.data&&(ne.data=W.data),F[q]=ne,H++}s.attributes=F,s.attributesNum=H,s.index=k})(g,S,y,E),E!==null&&e.update(E,r.ELEMENT_ARRAY_BUFFER),(M||a)&&(a=!1,(function(O,L,D,k){h();let F=k.attributes,K=D.getAttributes(),H=L.defaultAttributeValues;for(let V in K){let q=K[V];if(q.location>=0){let W=F[V];if(W===void 0&&(V==="instanceMatrix"&&O.instanceMatrix&&(W=O.instanceMatrix),V==="instanceColor"&&O.instanceColor&&(W=O.instanceColor)),W!==void 0){let ne=W.normalized,de=W.itemSize,Ae=e.get(W);if(Ae===void 0)continue;let ve=Ae.buffer,ye=Ae.type,te=Ae.bytesPerElement,ce=ye===r.INT||ye===r.UNSIGNED_INT||W.gpuType===Uo;if(W.isInterleavedBufferAttribute){let oe=W.data,fe=oe.stride,Ue=W.offset;if(oe.isInstancedInterleavedBuffer){for(let Q=0;Q<q.locationSize;Q++)p(q.location+Q,oe.meshPerAttribute);O.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Q=0;Q<q.locationSize;Q++)u(q.location+Q);r.bindBuffer(r.ARRAY_BUFFER,ve);for(let Q=0;Q<q.locationSize;Q++)m(q.location+Q,de/q.locationSize,ye,ne,fe*te,(Ue+de/q.locationSize*Q)*te,ce)}else{if(W.isInstancedBufferAttribute){for(let oe=0;oe<q.locationSize;oe++)p(q.location+oe,W.meshPerAttribute);O.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let oe=0;oe<q.locationSize;oe++)u(q.location+oe);r.bindBuffer(r.ARRAY_BUFFER,ve);for(let oe=0;oe<q.locationSize;oe++)m(q.location+oe,de/q.locationSize,ye,ne,de*te,de/q.locationSize*oe*te,ce)}}else if(H!==void 0){let ne=H[V];if(ne!==void 0)switch(ne.length){case 2:r.vertexAttrib2fv(q.location,ne);break;case 3:r.vertexAttrib3fv(q.location,ne);break;case 4:r.vertexAttrib4fv(q.location,ne);break;default:r.vertexAttrib1fv(q.location,ne)}}}}d()})(g,_,y,S),E!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(E).buffer))},reset:f,resetDefaultState:v,dispose:function(){f();for(let g in n){let _=n[g];for(let y in _){let S=_[y];for(let E in S){let M=S[E];for(let P in M)c(M[P].object),delete M[P];delete S[E]}}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let y in _){let S=_[y];for(let E in S){let M=S[E];for(let P in M)c(M[P].object),delete M[P];delete S[E]}}delete n[g.id]},releaseStatesOfObject:function(g){for(let _ in n){let y=n[_],S=g.isInstancedMesh===!0?g.id:0,E=y[S];if(E!==void 0){for(let M in E){let P=E[M];for(let O in P)c(P[O].object),delete P[O];delete E[M]}delete y[S],Object.keys(y).length===0&&delete n[_]}}},releaseStatesOfProgram:function(g){for(let _ in n){let y=n[_];for(let S in y){let E=y[S];if(E[g.id]===void 0)continue;let M=E[g.id];for(let P in M)c(M[P].object),delete M[P];delete E[g.id]}}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:d}}function dm(r,e,t){let n;this.setMode=function(i){n=i},this.render=function(i,s){r.drawArrays(n,i,s),t.update(s,n,1)},this.renderInstances=function(i,s,a){a!==0&&(r.drawArraysInstanced(n,i,s,a),t.update(s,n,a))},this.renderMultiDraw=function(i,s,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,i,0,s,0,a);let o=0;for(let c=0;c<a;c++)o+=s[c];t.update(o,n,1)}}function pm(r,e,t,n){let i;function s(h){if(h==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(ge("WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");return t.reversedDepthBuffer===!0&&l===!1&&ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let h=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(h){return h===on||n.convert(h)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){let u=h===Gn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==Jt&&n.convert(h)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&h!==$t&&!u)},precision:a,logarithmicDepthBuffer:c,reversedDepthBuffer:l,maxTextures:r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:r.getParameter(r.MAX_SAMPLES),samples:r.getParameter(r.SAMPLES)}}function fm(r){let e=this,t=null,n=0,i=!1,s=!1,a=new rn,o=new Ne,c={value:null,needsUpdate:!1};function l(h,u,p,d){let m=h!==null?h.length:0,f=null;if(m!==0){if(f=c.value,d!==!0||f===null){let v=p+4*m,g=u.matrixWorldInverse;o.getNormalMatrix(g),(f===null||f.length<v)&&(f=new Float32Array(v));for(let _=0,y=p;_!==m;++_,y+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(f,y),f[y+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,f}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let p=h.length!==0||u||n!==0||i;return i=u,n=h.length,p},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=l(h,u,0)},this.setState=function(h,u,p){let d=h.clippingPlanes,m=h.clipIntersection,f=h.clipShadows,v=r.get(h);if(!i||d===null||d.length===0||s&&!f)s?l(null):(function(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,_=4*g,y=v.clippingState||null;c.value=y,y=l(d,u,_,p);for(let S=0;S!==_;++S)y[S]=t[S];v.clippingState=y,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}Gp.set(-1,0,0,0,1,0,0,0,1);var _p=[.125,.215,.35,.446,.526,.582],Zs=20,Js=new Ei,vp=new _e,yh=null,xh=0,Mh=0,Sh=!1,mm=new T,Zo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=mm}=s;yh=this._renderer.getRenderTarget(),xh=this._renderer.getActiveCubeFace(),Mh=this._renderer.getActiveMipmapLevel(),Sh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(yh,xh,Mh),this._renderer.xr.enabled=Sh,e.scissorTest=!1,Wr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zr||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yh=this._renderer.getRenderTarget(),xh=this._renderer.getActiveCubeFace(),Mh=this._renderer.getActiveMipmapLevel(),Sh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:vt,minFilter:vt,generateMipmaps:!1,type:Gn,format:on,colorSpace:Bt,depthBuffer:!1},i=yp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yp(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=(function(a){let o=[],c=[],l=[],h=a,u=a-4+1+_p.length;for(let p=0;p<u;p++){let d=Math.pow(2,h);o.push(d);let m=1/d;p>a-4?m=_p[p-a+4-1]:p===0&&(m=0),c.push(m);let f=1/(d-2),v=-f,g=1+f,_=[v,v,g,v,g,g,v,v,g,g,v,g],y=6,S=6,E=3,M=2,P=1,O=new Float32Array(E*S*y),L=new Float32Array(M*S*y),D=new Float32Array(P*S*y);for(let F=0;F<y;F++){let K=F%3*2/3-1,H=F>2?0:-1,V=[K,H,0,K+2/3,H,0,K+2/3,H+1,0,K,H,0,K+2/3,H+1,0,K,H+1,0];O.set(V,E*S*F),L.set(_,M*S*F);let q=[F,F,F,F,F,F];D.set(q,P*S*F)}let k=new ke;k.setAttribute("position",new _t(O,E)),k.setAttribute("uv",new _t(L,M)),k.setAttribute("faceIndex",new _t(D,P)),l.push(new ht(k,null)),h>4&&h--}return{lodMeshes:l,sizeLods:o,sigmas:c}})(s)),this._blurMaterial=(function(a,o,c){let l=new Float32Array(Zs),h=new T(0,1,0);return new Zt({name:"SphericalGaussianBlur",defines:{n:Zs,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})})(s,e,t),this._ggxMaterial=(function(a,o,c){return new Zt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/c,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Jo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})})(s,e,t)}return i}_compileMaterial(e){let t=new ht(new ke,e);this._renderer.compile(t,Js)}_sceneToCubeUV(e,t,n,i,s){let a=new gt(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,u=l.toneMapping;l.getClearColor(vp),l.toneMapping=bn,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ht(new Nn,new Mn({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1})));let p=this._backgroundBox,d=p.material,m=!1,f=e.background;f?f.isColor&&(d.color.copy(f),e.background=null,m=!0):(d.color.copy(vp),m=!0);for(let v=0;v<6;v++){let g=v%3;g===0?(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+c[v],s.y,s.z)):g===1?(a.up.set(0,0,o[v]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+c[v],s.z)):(a.up.set(0,o[v],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+c[v]));let _=this._cubeSize;Wr(i,g*_,v>2?_:0,_,_),l.setRenderTarget(i),m&&l.render(p,a),l.render(e,a)}l.toneMapping=u,l.autoClear=h,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===zr||e.mapping===qi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xp());let s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s,s.uniforms.envMap.value=e;let o=this._cubeSize;Wr(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Js)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h)*(0+1.25*l),{_lodMax:p}=this,d=this._sizeLods[n],m=3*d*(n>p-4?n-p+4:0),f=4*(this._cubeSize-d);c.envMap.value=e.texture,c.roughness.value=u,c.mipInt.value=p-t,Wr(s,m,f,3*d,2*d),i.setRenderTarget(s),i.render(o,Js),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=p-n,Wr(e,m,f,3*d,2*d),i.setRenderTarget(e),i.render(o,Js)}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&we("blur direction must be either latitudinal or longitudinal!");let h=this._lodMeshes[i];h.material=l;let u=l.uniforms,p=this._sizeLods[n]-1,d=isFinite(s)?Math.PI/(2*p):2*Math.PI/39,m=s/d,f=isFinite(s)?1+Math.floor(3*m):Zs;f>Zs&&ge(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to 20`);let v=[],g=0;for(let S=0;S<Zs;++S){let E=S/m,M=Math.exp(-E*E/2);v.push(M),S===0?g+=M:S<f&&(g+=2*M)}for(let S=0;S<v.length;S++)v[S]=v[S]/g;u.envMap.value=e.texture,u.samples.value=f,u.weights.value=v,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=d,u.mipInt.value=_-n;let y=this._sizeLods[i];Wr(t,3*y*(i>_-4?i-_+4:0),4*(this._cubeSize-y),3*y,2*y),c.setRenderTarget(t),c.render(h,Js)}};function yp(r,e,t){let n=new Yt(r,e,t);return n.texture.mapping=Ys,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wr(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function xp(){return new Zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Mp(){return new Zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Jo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var $o=class extends Yt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new bs(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Nn(5,5,5),s=new Zt({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:Bn});s.uniforms.tEquirect.value=t;let a=new ht(i,s),o=t.minFilter;return t.minFilter===zn&&(t.minFilter=vt),new Ro(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}};function gm(r){let e=new WeakMap,t=new WeakMap,n=null;function i(o,c){return c===Lo?o.mapping=zr:c===No&&(o.mapping=qi),o}function s(o){let c=o.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(o){let c=o.target;c.removeEventListener("dispose",a);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}return{get:function(o,c=!1){return o==null?null:c?(function(l){if(l&&l.isTexture){let h=l.mapping,u=h===Lo||h===No,p=h===zr||h===qi;if(u||p){let d=t.get(l),m=d!==void 0?d.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return n===null&&(n=new Zo(r)),d=u?n.fromEquirectangular(l,d):n.fromCubemap(l,d),d.texture.pmremVersion=l.pmremVersion,t.set(l,d),d.texture;if(d!==void 0)return d.texture;{let f=l.image;return u&&f&&f.height>0||p&&f&&(function(v){let g=0,_=6;for(let y=0;y<_;y++)v[y]!==void 0&&g++;return g===_})(f)?(n===null&&(n=new Zo(r)),d=u?n.fromEquirectangular(l):n.fromCubemap(l),d.texture.pmremVersion=l.pmremVersion,t.set(l,d),l.addEventListener("dispose",a),d.texture):null}}}return l})(o):(function(l){if(l&&l.isTexture){let h=l.mapping;if(h===Lo||h===No){if(e.has(l))return i(e.get(l).texture,l.mapping);{let u=l.image;if(u&&u.height>0){let p=new $o(u.height);return p.fromEquirectangularTexture(r,l),e.set(l,p),l.addEventListener("dispose",s),i(p.texture,l.mapping)}return null}}}return l})(o)},dispose:function(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function _m(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Gi("WebGLRenderer: "+n+" extension not supported."),i}}}function vm(r,e,t,n){let i={},s=new WeakMap;function a(c){let l=c.target;l.index!==null&&e.remove(l.index);for(let u in l.attributes)e.remove(l.attributes[u]);l.removeEventListener("dispose",a),delete i[l.id];let h=s.get(l);h&&(e.remove(h),s.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function o(c){let l=[],h=c.index,u=c.attributes.position,p=0;if(u===void 0)return;if(h!==null){let f=h.array;p=h.version;for(let v=0,g=f.length;v<g;v+=3){let _=f[v+0],y=f[v+1],S=f[v+2];l.push(_,y,y,S,S,_)}}else{let f=u.array;p=u.version;for(let v=0,g=f.length/3-1;v<g;v+=3){let _=v+0,y=v+1,S=v+2;l.push(_,y,y,S,S,_)}}let d=new(u.count>=65535?vs:_s)(l,1);d.version=p;let m=s.get(c);m&&e.remove(m),s.set(c,d)}return{get:function(c,l){return i[l.id]===!0||(l.addEventListener("dispose",a),i[l.id]=!0,t.memory.geometries++),l},update:function(c){let l=c.attributes;for(let h in l)e.update(l[h],r.ARRAY_BUFFER)},getWireframeAttribute:function(c){let l=s.get(c);if(l){let h=c.index;h!==null&&l.version<h.version&&o(c)}else o(c);return s.get(c)}}}function ym(r,e,t){let n,i,s;this.setMode=function(a){n=a},this.setIndex=function(a){i=a.type,s=a.bytesPerElement},this.render=function(a,o){r.drawElements(n,o,i,a*s),t.update(o,n,1)},this.renderInstances=function(a,o,c){c!==0&&(r.drawElementsInstanced(n,o,i,a*s,c),t.update(o,n,c))},this.renderMultiDraw=function(a,o,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,o,0,i,a,0,c);let l=0;for(let h=0;h<c;h++)l+=o[h];t.update(l,n,1)}}function xm(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:we("WebGLInfo: Unknown draw mode:",n)}}}}function Mm(r,e,t){let n=new WeakMap,i=new Ze;return{update:function(s,a,o){let c=s.morphTargetInfluences,l=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=l!==void 0?l.length:0,u=n.get(a);if(u===void 0||u.count!==h){let O=function(){M.dispose(),n.delete(a),a.removeEventListener("dispose",O)};u!==void 0&&u.texture.dispose();let p=a.morphAttributes.position!==void 0,d=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;p===!0&&(_=1),d===!0&&(_=2),m===!0&&(_=3);let y=a.attributes.position.count*_,S=1;y>e.maxTextureSize&&(S=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let E=new Float32Array(y*S*4*h),M=new ps(E,y,S,h);M.type=$t,M.needsUpdate=!0;let P=4*_;for(let L=0;L<h;L++){let D=f[L],k=v[L],F=g[L],K=y*S*4*L;for(let H=0;H<D.count;H++){let V=H*P;p===!0&&(i.fromBufferAttribute(D,H),E[K+V+0]=i.x,E[K+V+1]=i.y,E[K+V+2]=i.z,E[K+V+3]=0),d===!0&&(i.fromBufferAttribute(k,H),E[K+V+4]=i.x,E[K+V+5]=i.y,E[K+V+6]=i.z,E[K+V+7]=0),m===!0&&(i.fromBufferAttribute(F,H),E[K+V+8]=i.x,E[K+V+9]=i.y,E[K+V+10]=i.z,E[K+V+11]=F.itemSize===4?i.w:1)}}u={count:h,texture:M,size:new $(y,S)},n.set(a,u),a.addEventListener("dispose",O)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];let d=a.morphTargetsRelative?1:1-p;o.getUniforms().setValue(r,"morphTargetBaseInfluence",d),o.getUniforms().setValue(r,"morphTargetInfluences",c)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function Sm(r,e,t,n,i){let s=new WeakMap;function a(o){let c=o.target;c.removeEventListener("dispose",a),n.releaseStatesOfObject(c),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:function(o){let c=i.render.frame,l=o.geometry,h=e.get(o,l);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),s.get(o)!==c&&(t.update(o.instanceMatrix,r.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,r.ARRAY_BUFFER),s.set(o,c))),o.isSkinnedMesh){let u=o.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return h},dispose:function(){s=new WeakMap}}}var bm={[Sc]:"LINEAR_TONE_MAPPING",[bc]:"REINHARD_TONE_MAPPING",[Tc]:"CINEON_TONE_MAPPING",[Ec]:"ACES_FILMIC_TONE_MAPPING",[wc]:"AGX_TONE_MAPPING",[Rc]:"NEUTRAL_TONE_MAPPING",[Ac]:"CUSTOM_TONE_MAPPING"};function Tm(r,e,t,n,i,s){let a=new Yt(e,t,{type:r,depthBuffer:i,stencilBuffer:s,samples:n?4:0,depthTexture:i?new li(e,t):void 0}),o=new Yt(e,t,{type:Gn,depthBuffer:!1,stencilBuffer:!1}),c=new ke;c.setAttribute("position",new be([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new be([0,2,0,0,2,0],2));let l=new vo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new ht(c,l),u=new Ei(-1,1,1,-1,0,1),p,d=null,m=null,f=!1,v=null,g=[],_=!1;this.setSize=function(y,S){a.setSize(y,S),o.setSize(y,S);for(let E=0;E<g.length;E++){let M=g[E];M.setSize&&M.setSize(y,S)}},this.setEffects=function(y){g=y,_=g.length>0&&g[0].isRenderPass===!0;let S=a.width,E=a.height;for(let M=0;M<g.length;M++){let P=g[M];P.setSize&&P.setSize(S,E)}},this.begin=function(y,S){if(f||y.toneMapping===bn&&g.length===0)return!1;if(v=S,S!==null){let E=S.width,M=S.height;a.width===E&&a.height===M||this.setSize(E,M)}return _===!1&&y.setRenderTarget(a),p=y.toneMapping,y.toneMapping=bn,!0},this.hasRenderPass=function(){return _},this.end=function(y,S){y.toneMapping=p,f=!0;let E=a,M=o;for(let P=0;P<g.length;P++){let O=g[P];if(O.enabled!==!1&&(O.render(y,M,E,S),O.needsSwap!==!1)){let L=E;E=M,M=L}}if(d!==y.outputColorSpace||m!==y.toneMapping){d=y.outputColorSpace,m=y.toneMapping,l.defines={},ze.getTransfer(d)===qe&&(l.defines.SRGB_TRANSFER="");let P=bm[m];P&&(l.defines[P]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,y.setRenderTarget(v),y.render(h,u),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}var kp=new Et,Eh=new li(1,1),Vp=new ps,Hp=new Ha,Wp=new bs,Sp=[],bp=[],Tp=new Float32Array(16),Ep=new Float32Array(9),Ap=new Float32Array(4);function jr(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=Sp[i];if(s===void 0&&(s=new Float32Array(i),Sp[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Mt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function St(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function el(r,e){let t=bp[e];t===void 0&&(t=new Int32Array(e),bp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Em(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Am(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2fv(this.addr,e),St(t,e)}}function wm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;r.uniform3fv(this.addr,e),St(t,e)}}function Rm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4fv(this.addr,e),St(t,e)}}function Cm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;Ap.set(n),r.uniformMatrix2fv(this.addr,!1,Ap),St(t,n)}}function Pm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;Ep.set(n),r.uniformMatrix3fv(this.addr,!1,Ep),St(t,n)}}function Im(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;Tp.set(n),r.uniformMatrix4fv(this.addr,!1,Tp),St(t,n)}}function Lm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Nm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2iv(this.addr,e),St(t,e)}}function Dm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;r.uniform3iv(this.addr,e),St(t,e)}}function Um(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4iv(this.addr,e),St(t,e)}}function Om(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Fm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2uiv(this.addr,e),St(t,e)}}function Bm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;r.uniform3uiv(this.addr,e),St(t,e)}}function zm(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4uiv(this.addr,e),St(t,e)}}function Gm(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(Eh.compareFunction=t.isReversedDepthBuffer()?qo:jo,s=Eh):s=kp,t.setTexture2D(e||s,i)}function km(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Hp,i)}function Vm(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Wp,i)}function Hm(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Vp,i)}function Wm(r,e){r.uniform1fv(this.addr,e)}function Xm(r,e){let t=jr(e,this.size,2);r.uniform2fv(this.addr,t)}function jm(r,e){let t=jr(e,this.size,3);r.uniform3fv(this.addr,t)}function qm(r,e){let t=jr(e,this.size,4);r.uniform4fv(this.addr,t)}function Ym(r,e){let t=jr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Km(r,e){let t=jr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Zm(r,e){let t=jr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Jm(r,e){r.uniform1iv(this.addr,e)}function $m(r,e){r.uniform2iv(this.addr,e)}function Qm(r,e){r.uniform3iv(this.addr,e)}function eg(r,e){r.uniform4iv(this.addr,e)}function tg(r,e){r.uniform1uiv(this.addr,e)}function ng(r,e){r.uniform2uiv(this.addr,e)}function ig(r,e){r.uniform3uiv(this.addr,e)}function rg(r,e){r.uniform4uiv(this.addr,e)}function sg(r,e,t){let n=this.cache,i=e.length,s=el(t,i),a;Mt(n,s)||(r.uniform1iv(this.addr,s),St(n,s)),a=this.type===r.SAMPLER_2D_SHADOW?Eh:kp;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function ag(r,e,t){let n=this.cache,i=e.length,s=el(t,i);Mt(n,s)||(r.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Hp,s[a])}function og(r,e,t){let n=this.cache,i=e.length,s=el(t,i);Mt(n,s)||(r.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Wp,s[a])}function lg(r,e,t){let n=this.cache,i=e.length,s=el(t,i);Mt(n,s)||(r.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Vp,s[a])}var Ah=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(i){switch(i){case 5126:return Em;case 35664:return Am;case 35665:return wm;case 35666:return Rm;case 35674:return Cm;case 35675:return Pm;case 35676:return Im;case 5124:case 35670:return Lm;case 35667:case 35671:return Nm;case 35668:case 35672:return Dm;case 35669:case 35673:return Um;case 5125:return Om;case 36294:return Fm;case 36295:return Bm;case 36296:return zm;case 35678:case 36198:case 36298:case 36306:case 35682:return Gm;case 35679:case 36299:case 36307:return km;case 35680:case 36300:case 36308:case 36293:return Vm;case 36289:case 36303:case 36311:case 36292:return Hm}})(t.type)}},wh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(i){switch(i){case 5126:return Wm;case 35664:return Xm;case 35665:return jm;case 35666:return qm;case 35674:return Ym;case 35675:return Km;case 35676:return Zm;case 5124:case 35670:return Jm;case 35667:case 35671:return $m;case 35668:case 35672:return Qm;case 35669:case 35673:return eg;case 5125:return tg;case 36294:return ng;case 36295:return ig;case 36296:return rg;case 35678:case 36198:case 36298:case 36306:case 35682:return sg;case 35679:case 36299:case 36307:return ag;case 35680:case 36300:case 36308:case 36293:return og;case 36289:case 36303:case 36311:case 36292:return lg}})(t.type)}},Rh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},bh=/(\w+)(\])?(\[|\.)?/g;function wp(r,e){r.seq.push(e),r.map[e.id]=e}function cg(r,e,t){let n=r.name,i=n.length;for(bh.lastIndex=0;;){let s=bh.exec(n),a=bh.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o|=0),l===void 0||l==="["&&a+2===i){wp(t,l===void 0?new Ah(o,r,e):new wh(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new Rh(o),wp(t,h)),t=h}}}var Xr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a);cg(o,e.getUniformLocation(t,o.name),this)}let i=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Rp(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var hg=0,Cp=new Ne;function Pp(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=(r.getShaderInfoLog(e)||"").trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+(function(o,c){let l=o.split(`
`),h=[],u=Math.max(c-6,0),p=Math.min(c+6,l.length);for(let d=u;d<p;d++){let m=d+1;h.push(`${m===c?">":" "} ${m}: ${l[d]}`)}return h.join(`
`)})(r.getShaderSource(e),a)}return i}function ug(r,e){let t=(function(n){ze._getMatrix(Cp,ze.workingColorSpace,n);let i=`mat3( ${Cp.elements.map(s=>s.toFixed(4))} )`;switch(ze.getTransfer(n)){case us:return[i,"LinearTransferOETF"];case qe:return[i,"sRGBTransferOETF"];default:return ge("WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var dg={[Sc]:"Linear",[bc]:"Reinhard",[Tc]:"Cineon",[Ec]:"ACESFilmic",[wc]:"AgX",[Rc]:"Neutral",[Ac]:"Custom"};function pg(r,e){let t=dg[e];return t===void 0?(ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ko=new T;function fg(){return ze.getLuminanceCoefficients(Ko),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${Ko.x.toFixed(4)}, ${Ko.y.toFixed(4)}, ${Ko.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $s(r){return r!==""}function Ip(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Lp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var mg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ch(r){return r.replace(mg,_g)}var gg=new Map;function _g(r,e){let t=Fe[e];if(t===void 0){let n=gg.get(e);if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");t=Fe[n],ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Ch(t)}var vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Np(r){return r.replace(vg,yg)}function yg(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Dp(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var xg={[js]:"SHADOWMAP_TYPE_PCF",[Fr]:"SHADOWMAP_TYPE_VSM"},Mg={[zr]:"ENVMAP_TYPE_CUBE",[qi]:"ENVMAP_TYPE_CUBE",[Ys]:"ENVMAP_TYPE_CUBE_UV"},Sg={[qi]:"ENVMAP_MODE_REFRACTION"},bg={[Yd]:"ENVMAP_BLENDING_MULTIPLY",[Kd]:"ENVMAP_BLENDING_MIX",[Zd]:"ENVMAP_BLENDING_ADD"};function Tg(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=(function(k){return xg[k.shadowMapType]||"SHADOWMAP_TYPE_BASIC"})(t),l=(function(k){return k.envMap===!1?"ENVMAP_TYPE_CUBE":Mg[k.envMapMode]||"ENVMAP_TYPE_CUBE"})(t),h=(function(k){return k.envMap===!1?"ENVMAP_MODE_REFLECTION":Sg[k.envMapMode]||"ENVMAP_MODE_REFLECTION"})(t),u=(function(k){return k.envMap===!1?"ENVMAP_BLENDING_NONE":bg[k.combine]||"ENVMAP_BLENDING_NONE"})(t),p=(function(k){let F=k.envMapCubeUVHeight;if(F===null)return null;let K=Math.log2(F)-2,H=1/F;return{texelWidth:1/(3*Math.max(Math.pow(2,K),112)),texelHeight:H,maxMip:K}})(t),d=(function(k){return[k.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",k.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($s).join(`
`)})(t),m=(function(k){let F=[];for(let K in k){let H=k[K];H!==!1&&F.push("#define "+K+" "+H)}return F.join(`
`)})(s),f=i.createProgram(),v,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter($s).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter($s).join(`
`),g.length>0&&(g+=`
`)):(v=[Dp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),g=[Dp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bn?"#define TONE_MAPPING":"",t.toneMapping!==bn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==bn?pg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,ug("linearToOutputTexel",t.outputColorSpace),fg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($s).join(`
`)),a=Ch(a),a=Ip(a,t),a=Lp(a,t),o=Ch(o),o=Ip(o,t),o=Lp(o,t),a=Np(a),o=Np(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,v=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===fh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let y=_+v+a,S=_+g+o,E=Rp(i,i.VERTEX_SHADER,y),M=Rp(i,i.FRAGMENT_SHADER,S);function P(k){if(r.debug.checkShaderErrors){let F=i.getProgramInfoLog(f)||"",K=i.getShaderInfoLog(E)||"",H=i.getShaderInfoLog(M)||"",V=F.trim(),q=K.trim(),W=H.trim(),ne=!0,de=!0;if(i.getProgramParameter(f,i.LINK_STATUS)===!1)if(ne=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,f,E,M);else{let Ae=Pp(i,E,"vertex"),ve=Pp(i,M,"fragment");we("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(f,i.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+V+`
`+Ae+`
`+ve)}else V!==""?ge("WebGLProgram: Program Info Log:",V):q!==""&&W!==""||(de=!1);de&&(k.diagnostics={runnable:ne,programLog:V,vertexShader:{log:q,prefix:v},fragmentShader:{log:W,prefix:g}})}i.deleteShader(E),i.deleteShader(M),O=new Xr(i,f),L=(function(F,K){let H={},V=F.getProgramParameter(K,F.ACTIVE_ATTRIBUTES);for(let q=0;q<V;q++){let W=F.getActiveAttrib(K,q),ne=W.name,de=1;W.type===F.FLOAT_MAT2&&(de=2),W.type===F.FLOAT_MAT3&&(de=3),W.type===F.FLOAT_MAT4&&(de=4),H[ne]={type:W.type,location:F.getAttribLocation(K,ne),locationSize:de}}return H})(i,f)}let O,L;i.attachShader(f,E),i.attachShader(f,M),t.index0AttributeName!==void 0?i.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(f,0,"position"),i.linkProgram(f),this.getUniforms=function(){return O===void 0&&P(this),O},this.getAttributes=function(){return L===void 0&&P(this),L};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(f,37297)),D},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hg++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=E,this.fragmentShader=M,this}var Eg=0,Ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ih(e),t.set(e,n)),n}},Ih=class{constructor(e){this.id=Eg++,this.code=e,this.usedTimes=0}};function Ag(r,e,t,n,i,s){let a=new fs,o=new Ph,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,p=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,g,_,y,S){let E=_.fog,M=y.geometry,P=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?_.environment:null,O=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,L=e.get(f.envMap||P,O),D=L&&L.mapping===Ys?L.image.height:null,k=d[f.type];f.precision!==null&&(p=n.getMaxPrecision(f.precision),p!==f.precision&&ge("WebGLProgram.getParameters:",f.precision,"not supported, using",p,"instead."));let F=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,K=F!==void 0?F.length:0,H,V,q,W,ne=0;if(M.morphAttributes.position!==void 0&&(ne=1),M.morphAttributes.normal!==void 0&&(ne=2),M.morphAttributes.color!==void 0&&(ne=3),k){let un=Vn[k];H=un.vertexShader,V=un.fragmentShader}else{H=f.vertexShader,V=f.fragmentShader;let un=o.getVertexShaderStage(f),Li=o.getFragmentShaderStage(f);o.update(f,un,Li),q=un.id,W=Li.id}let de=r.getRenderTarget(),Ae=r.state.buffers.depth.getReversed(),ve=y.isInstancedMesh===!0,ye=y.isBatchedMesh===!0,te=!!f.map,ce=!!f.matcap,oe=!!L,fe=!!f.aoMap,Ue=!!f.lightMap,Q=!!f.bumpMap&&f.wireframe===!1,C=!!f.normalMap,b=!!f.displacementMap,R=!!f.emissiveMap,U=!!f.metalnessMap,x=!!f.roughnessMap,N=f.anisotropy>0,I=f.clearcoat>0,w=f.dispersion>0,G=f.iridescence>0,X=f.sheen>0,Y=f.transmission>0,re=N&&!!f.anisotropyMap,xe=I&&!!f.clearcoatMap,Me=I&&!!f.clearcoatNormalMap,he=I&&!!f.clearcoatRoughnessMap,Ce=G&&!!f.iridescenceMap,ee=G&&!!f.iridescenceThicknessMap,se=X&&!!f.sheenColorMap,ie=X&&!!f.sheenRoughnessMap,pe=!!f.specularMap,Qe=!!f.specularColorMap,je=!!f.specularIntensityMap,ot=Y&&!!f.transmissionMap,Ut=Y&&!!f.thicknessMap,Te=!!f.gradientMap,Ye=!!f.alphaMap,Be=f.alphaTest>0,Rt=!!f.alphaHash,et=!!f.extensions,yt=bn;f.toneMapped&&(de!==null&&de.isXRRenderTarget!==!0||(yt=r.toneMapping));let at={shaderID:k,shaderType:f.type,shaderName:f.name,vertexShader:H,fragmentShader:V,defines:f.defines,customVertexShaderID:q,customFragmentShaderID:W,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:p,batching:ye,batchingColor:ye&&y._colorsTexture!==null,instancing:ve,instancingColor:ve&&y.instanceColor!==null,instancingMorph:ve&&y.morphTexture!==null,outputColorSpace:de===null?r.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:ze.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:te,matcap:ce,envMap:oe,envMapMode:oe&&L.mapping,envMapCubeUVHeight:D,aoMap:fe,lightMap:Ue,bumpMap:Q,normalMap:C,displacementMap:b,emissiveMap:R,normalMapObjectSpace:C&&f.normalMapType===ep,normalMapTangentSpace:C&&f.normalMapType===ph,packedNormalMap:C&&f.normalMapType===ph&&(en=f.normalMap.format,en===Zi||en===Wo||en===Xo),metalnessMap:U,roughnessMap:x,anisotropy:N,anisotropyMap:re,clearcoat:I,clearcoatMap:xe,clearcoatNormalMap:Me,clearcoatRoughnessMap:he,dispersion:w,iridescence:G,iridescenceMap:Ce,iridescenceThicknessMap:ee,sheen:X,sheenColorMap:se,sheenRoughnessMap:ie,specularMap:pe,specularColorMap:Qe,specularIntensityMap:je,transmission:Y,transmissionMap:ot,thicknessMap:Ut,gradientMap:Te,opaque:f.transparent===!1&&f.blending===qs&&f.alphaToCoverage===!1,alphaMap:Ye,alphaTest:Be,alphaHash:Rt,combine:f.combine,mapUv:te&&m(f.map.channel),aoMapUv:fe&&m(f.aoMap.channel),lightMapUv:Ue&&m(f.lightMap.channel),bumpMapUv:Q&&m(f.bumpMap.channel),normalMapUv:C&&m(f.normalMap.channel),displacementMapUv:b&&m(f.displacementMap.channel),emissiveMapUv:R&&m(f.emissiveMap.channel),metalnessMapUv:U&&m(f.metalnessMap.channel),roughnessMapUv:x&&m(f.roughnessMap.channel),anisotropyMapUv:re&&m(f.anisotropyMap.channel),clearcoatMapUv:xe&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:Me&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&m(f.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:se&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:ie&&m(f.sheenRoughnessMap.channel),specularMapUv:pe&&m(f.specularMap.channel),specularColorMapUv:Qe&&m(f.specularColorMap.channel),specularIntensityMapUv:je&&m(f.specularIntensityMap.channel),transmissionMapUv:ot&&m(f.transmissionMap.channel),thicknessMapUv:Ut&&m(f.thicknessMap.channel),alphaMapUv:Ye&&m(f.alphaMap.channel),vertexTangents:!!M.attributes.tangent&&(C||N),vertexNormals:!!M.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!M.attributes.color&&M.attributes.color.itemSize===4,pointsUvs:y.isPoints===!0&&!!M.attributes.uv&&(te||Ye),fog:!!E,useFog:f.fog===!0,fogExp2:!!E&&E.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||M.attributes.normal===void 0&&C===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ae,skinning:y.isSkinnedMesh===!0,hasPositionAttribute:M.attributes.position!==void 0,morphTargets:M.morphAttributes.position!==void 0,morphNormals:M.morphAttributes.normal!==void 0,morphColors:M.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:ne,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:S.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:f.dithering,shadowMapEnabled:r.shadowMap.enabled&&g.length>0,shadowMapType:r.shadowMap.type,toneMapping:yt,decodeVideoTexture:te&&f.map.isVideoTexture===!0&&ze.getTransfer(f.map.colorSpace)===qe,decodeVideoTextureEmissive:R&&f.emissiveMap.isVideoTexture===!0&&ze.getTransfer(f.emissiveMap.colorSpace)===qe,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===an,flipSided:f.side===Wt,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:et&&f.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(et&&f.extensions.multiDraw===!0||ye)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};var en;return at.vertexUv1s=c.has(1),at.vertexUv2s=c.has(2),at.vertexUv3s=c.has(3),c.clear(),at},getProgramCacheKey:function(f){let v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(let g in f.defines)v.push(g),v.push(f.defines[g]);return f.isRawShaderMaterial===!1&&((function(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)})(v,f),(function(g,_){a.disableAll(),_.instancing&&a.enable(0),_.instancingColor&&a.enable(1),_.instancingMorph&&a.enable(2),_.matcap&&a.enable(3),_.envMap&&a.enable(4),_.normalMapObjectSpace&&a.enable(5),_.normalMapTangentSpace&&a.enable(6),_.clearcoat&&a.enable(7),_.iridescence&&a.enable(8),_.alphaTest&&a.enable(9),_.vertexColors&&a.enable(10),_.vertexAlphas&&a.enable(11),_.vertexUv1s&&a.enable(12),_.vertexUv2s&&a.enable(13),_.vertexUv3s&&a.enable(14),_.vertexTangents&&a.enable(15),_.anisotropy&&a.enable(16),_.alphaHash&&a.enable(17),_.batching&&a.enable(18),_.dispersion&&a.enable(19),_.batchingColor&&a.enable(20),_.gradientMap&&a.enable(21),_.packedNormalMap&&a.enable(22),_.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),_.numLightProbeGrids>0&&a.enable(22),_.hasPositionAttribute&&a.enable(23),g.push(a.mask)})(v,f),v.push(r.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){let v=d[f.type],g;if(v){let _=Vn[v];g=mp.clone(_.uniforms)}else g=f.uniforms;return g},acquireProgram:function(f,v){let g=h.get(v);return g!==void 0?++g.usedTimes:(g=new Tg(r,v,f,i),l.push(g),h.set(v,g)),g},releaseProgram:function(f){if(--f.usedTimes===0){let v=l.indexOf(f);l[v]=l[l.length-1],l.pop(),h.delete(f.cacheKey),f.destroy()}},releaseShaderCache:function(f){o.remove(f)},programs:l,dispose:function(){o.dispose()}}}function wg(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function Rg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Up(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Op(){let r=[],e=0,t=[],n=[],i=[];function s(o){let c=0;return o.isInstancedMesh&&(c+=2),o.isSkinnedMesh&&(c+=1),c}function a(o,c,l,h,u,p){let d=r[e];return d===void 0?(d={id:o.id,object:o,geometry:c,material:l,materialVariant:s(o),groupOrder:h,renderOrder:o.renderOrder,z:u,group:p},r[e]=d):(d.id=o.id,d.object=o,d.geometry=c,d.material=l,d.materialVariant=s(o),d.groupOrder=h,d.renderOrder=o.renderOrder,d.z=u,d.group=p),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(o,c,l,h,u,p){let d=a(o,c,l,h,u,p);l.transmission>0?n.push(d):l.transparent===!0?i.push(d):t.push(d)},unshift:function(o,c,l,h,u,p){let d=a(o,c,l,h,u,p);l.transmission>0?n.unshift(d):l.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let o=e,c=r.length;o<c;o++){let l=r[o];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(o,c,l){t.length>1&&t.sort(o||Rg),n.length>1&&n.sort(c||Up),i.length>1&&i.sort(c||Up),l&&(t.reverse(),n.reverse(),i.reverse())}}}function Cg(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new Op,r.set(e,[i])):t>=n.length?(i=new Op,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function Pg(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new _e};break;case"SpotLight":t={position:new T,direction:new T,color:new _e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new _e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new _e,groundColor:new _e};break;case"RectAreaLight":t={color:new _e,position:new T,halfWidth:new T,halfHeight:new T}}return r[e.id]=t,t}}}var Ig=0;function Lg(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Ng(r){let e=new Pg,t=(function(){let o={};return{get:function(c){if(o[c.id]!==void 0)return o[c.id];let l;switch(c.type){case"DirectionalLight":case"SpotLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $};break;case"PointLight":l={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $,shadowCameraNear:1,shadowCameraFar:1e3}}return o[c.id]=l,l}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new T);let i=new T,s=new Ee,a=new Ee;return{setup:function(o){let c=0,l=0,h=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let u=0,p=0,d=0,m=0,f=0,v=0,g=0,_=0,y=0,S=0,E=0;o.sort(Lg);for(let P=0,O=o.length;P<O;P++){let L=o[P],D=L.color,k=L.intensity,F=L.distance,K=null;if(L.shadow&&L.shadow.map&&(K=L.shadow.map.texture.format===Zi?L.shadow.map.texture:L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)c+=D.r*k,l+=D.g*k,h+=D.b*k;else if(L.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(L.sh.coefficients[H],k);E++}else if(L.isDirectionalLight){let H=e.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let V=L.shadow,q=t.get(L);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,n.directionalShadow[u]=q,n.directionalShadowMap[u]=K,n.directionalShadowMatrix[u]=L.shadow.matrix,v++}n.directional[u]=H,u++}else if(L.isSpotLight){let H=e.get(L);H.position.setFromMatrixPosition(L.matrixWorld),H.color.copy(D).multiplyScalar(k),H.distance=F,H.coneCos=Math.cos(L.angle),H.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),H.decay=L.decay,n.spot[d]=H;let V=L.shadow;if(L.map&&(n.spotLightMap[y]=L.map,y++,V.updateMatrices(L),L.castShadow&&S++),n.spotLightMatrix[d]=V.matrix,L.castShadow){let q=t.get(L);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,n.spotShadow[d]=q,n.spotShadowMap[d]=K,_++}d++}else if(L.isRectAreaLight){let H=e.get(L);H.color.copy(D).multiplyScalar(k),H.halfWidth.set(.5*L.width,0,0),H.halfHeight.set(0,.5*L.height,0),n.rectArea[m]=H,m++}else if(L.isPointLight){let H=e.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),H.distance=L.distance,H.decay=L.decay,L.castShadow){let V=L.shadow,q=t.get(L);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,q.shadowCameraNear=V.camera.near,q.shadowCameraFar=V.camera.far,n.pointShadow[p]=q,n.pointShadowMap[p]=K,n.pointShadowMatrix[p]=L.shadow.matrix,g++}n.point[p]=H,p++}else if(L.isHemisphereLight){let H=e.get(L);H.skyColor.copy(L.color).multiplyScalar(k),H.groundColor.copy(L.groundColor).multiplyScalar(k),n.hemi[f]=H,f++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=l,n.ambient[2]=h;let M=n.hash;M.directionalLength===u&&M.pointLength===p&&M.spotLength===d&&M.rectAreaLength===m&&M.hemiLength===f&&M.numDirectionalShadows===v&&M.numPointShadows===g&&M.numSpotShadows===_&&M.numSpotMaps===y&&M.numLightProbes===E||(n.directional.length=u,n.spot.length=d,n.rectArea.length=m,n.point.length=p,n.hemi.length=f,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=_+y-S,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=E,M.directionalLength=u,M.pointLength=p,M.spotLength=d,M.rectAreaLength=m,M.hemiLength=f,M.numDirectionalShadows=v,M.numPointShadows=g,M.numSpotShadows=_,M.numSpotMaps=y,M.numLightProbes=E,n.version=Ig++)},setupView:function(o,c){let l=0,h=0,u=0,p=0,d=0,m=c.matrixWorldInverse;for(let f=0,v=o.length;f<v;f++){let g=o[f];if(g.isDirectionalLight){let _=n.directional[l];_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),l++}else if(g.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),u++}else if(g.isRectAreaLight){let _=n.rectArea[p];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(m),a.identity(),s.copy(g.matrixWorld),s.premultiply(m),a.extractRotation(s),_.halfWidth.set(.5*g.width,0,0),_.halfHeight.set(0,.5*g.height,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),p++}else if(g.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(m),h++}else if(g.isHemisphereLight){let _=n.hemi[d];_.direction.setFromMatrixPosition(g.matrixWorld),_.direction.transformDirection(m),d++}}},state:n}}function Fp(r){let e=new Ng(r),t=[],n=[],i=[],s={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:function(a){s.camera=a,t.length=0,n.length=0,i.length=0},state:s,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)},pushLightProbeGrid:function(a){i.push(a)}}}function Dg(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new Fp(r),e.set(t,[s])):n>=i.length?(s=new Fp(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}var Ug=[new T(1,0,0),new T(-1,0,0),new T(0,1,0),new T(0,-1,0),new T(0,0,1),new T(0,0,-1)],Og=[new T(0,-1,0),new T(0,-1,0),new T(0,0,1),new T(0,0,-1),new T(0,-1,0),new T(0,-1,0)],Bp=new Ee,Qs=new T,Th=new T;function Fg(r,e,t){let n=new si,i=new $,s=new $,a=new Ze,o=new yo,c=new xo,l={},h=t.maxTextureSize,u={[Ci]:Wt,[Wt]:Ci,[an]:an},p=new Zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`}),d=p.clone();d.defines.HORIZONTAL_PASS=1;let m=new ke;m.setAttribute("position",new _t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let f=new ht(m,p),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=js;let g=this.type;function _(M,P){let O=e.update(f);p.defines.VSM_SAMPLES!==M.blurSamples&&(p.defines.VSM_SAMPLES=M.blurSamples,d.defines.VSM_SAMPLES=M.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Yt(i.x,i.y,{format:Zi,type:Gn})),p.uniforms.shadow_pass.value=M.map.depthTexture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,r.setRenderTarget(M.mapPass),r.clear(),r.renderBufferDirect(P,null,O,p,f,null),d.uniforms.shadow_pass.value=M.mapPass.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,r.setRenderTarget(M.map),r.clear(),r.renderBufferDirect(P,null,O,d,f,null)}function y(M,P,O,L){let D=null,k=O.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(k!==void 0)D=k;else if(D=O.isPointLight===!0?c:o,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let F=D.uuid,K=P.uuid,H=l[F];H===void 0&&(H={},l[F]=H);let V=H[K];V===void 0&&(V=D.clone(),H[K]=V,P.addEventListener("dispose",E)),D=V}return D.visible=P.visible,D.wireframe=P.wireframe,D.side=L===Fr?P.shadowSide!==null?P.shadowSide:P.side:P.shadowSide!==null?P.shadowSide:u[P.side],D.alphaMap=P.alphaMap,D.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,D.map=P.map,D.clipShadows=P.clipShadows,D.clippingPlanes=P.clippingPlanes,D.clipIntersection=P.clipIntersection,D.displacementMap=P.displacementMap,D.displacementScale=P.displacementScale,D.displacementBias=P.displacementBias,D.wireframeLinewidth=P.wireframeLinewidth,D.linewidth=P.linewidth,O.isPointLight===!0&&D.isMeshDistanceMaterial===!0&&(r.properties.get(D).light=O),D}function S(M,P,O,L,D){if(M.visible===!1)return;if(M.layers.test(P.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&D===Fr)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,M.matrixWorld);let F=e.update(M),K=M.material;if(Array.isArray(K)){let H=F.groups;for(let V=0,q=H.length;V<q;V++){let W=H[V],ne=K[W.materialIndex];if(ne&&ne.visible){let de=y(M,ne,L,D);M.onBeforeShadow(r,M,P,O,F,de,W),r.renderBufferDirect(O,null,F,de,M,W),M.onAfterShadow(r,M,P,O,F,de,W)}}}else if(K.visible){let H=y(M,K,L,D);M.onBeforeShadow(r,M,P,O,F,H,null),r.renderBufferDirect(O,null,F,H,M,null),M.onAfterShadow(r,M,P,O,F,H,null)}}let k=M.children;for(let F=0,K=k.length;F<K;F++)S(k[F],P,O,L,D)}function E(M){M.target.removeEventListener("dispose",E);for(let P in l){let O=l[P],L=M.target.uuid;L in O&&(O[L].dispose(),delete O[L])}}this.render=function(M,P,O){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||M.length===0)return;this.type===Po&&(ge("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=js);let L=r.getRenderTarget(),D=r.getActiveCubeFace(),k=r.getActiveMipmapLevel(),F=r.state;F.setBlending(Bn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let K=g!==this.type;K&&P.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(V=>V.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,V=M.length;H<V;H++){let q=M[H],W=q.shadow;if(W===void 0){ge("WebGLShadowMap:",q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);let ne=W.getFrameExtents();i.multiply(ne),s.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ne.x),i.x=s.x*ne.x,W.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ne.y),i.y=s.y*ne.y,W.mapSize.y=s.y));let de=r.state.buffers.depth.getReversed();if(W.camera._reversedDepth=de,W.map===null||K===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Fr){if(q.isPointLight){ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Yt(i.x,i.y,{format:Zi,type:Gn,minFilter:vt,magFilter:vt,generateMipmaps:!1}),W.map.texture.name=q.name+".shadowMap",W.map.depthTexture=new li(i.x,i.y,$t),W.map.depthTexture.name=q.name+".shadowMapDepth",W.map.depthTexture.format=Pi,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ft,W.map.depthTexture.magFilter=Ft}else q.isPointLight?(W.map=new $o(i.x),W.map.depthTexture=new qa(i.x,di)):(W.map=new Yt(i.x,i.y),W.map.depthTexture=new li(i.x,i.y,di)),W.map.depthTexture.name=q.name+".shadowMap",W.map.depthTexture.format=Pi,this.type===js?(W.map.depthTexture.compareFunction=de?qo:jo,W.map.depthTexture.minFilter=vt,W.map.depthTexture.magFilter=vt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ft,W.map.depthTexture.magFilter=Ft);W.camera.updateProjectionMatrix()}let Ae=W.map.isWebGLCubeRenderTarget?6:1;for(let ve=0;ve<Ae;ve++){if(W.map.isWebGLCubeRenderTarget)r.setRenderTarget(W.map,ve),r.clear();else{ve===0&&(r.setRenderTarget(W.map),r.clear());let ye=W.getViewport(ve);a.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),F.viewport(a)}if(q.isPointLight){let ye=W.camera,te=W.matrix,ce=q.distance||ye.far;ce!==ye.far&&(ye.far=ce,ye.updateProjectionMatrix()),Qs.setFromMatrixPosition(q.matrixWorld),ye.position.copy(Qs),Th.copy(ye.position),Th.add(Ug[ve]),ye.up.copy(Og[ve]),ye.lookAt(Th),ye.updateMatrixWorld(),te.makeTranslation(-Qs.x,-Qs.y,-Qs.z),Bp.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Bp,ye.coordinateSystem,ye.reversedDepth)}else W.updateMatrices(q);n=W.getFrustum(),S(P,O,W.camera,q,this.type)}W.isPointLightShadow!==!0&&this.type===Fr&&_(W,O),W.needsUpdate=!1}g=this.type,v.needsUpdate=!1,r.setRenderTarget(L,D,k)}}function Bg(r,e){let t=new function(){let x=!1,N=new Ze,I=null,w=new Ze(0,0,0,0);return{setMask:function(G){I===G||x||(r.colorMask(G,G,G,G),I=G)},setLocked:function(G){x=G},setClear:function(G,X,Y,re,xe){xe===!0&&(G*=re,X*=re,Y*=re),N.set(G,X,Y,re),w.equals(N)===!1&&(r.clearColor(G,X,Y,re),w.copy(N))},reset:function(){x=!1,I=null,w.set(-1,0,0,0)}}},n=new function(){let x=!1,N=!1,I=null,w=null,G=null;return{setReversed:function(X){if(N!==X){let Y=e.get("EXT_clip_control");X?Y.clipControlEXT(Y.LOWER_LEFT_EXT,Y.ZERO_TO_ONE_EXT):Y.clipControlEXT(Y.LOWER_LEFT_EXT,Y.NEGATIVE_ONE_TO_ONE_EXT),N=X;let re=G;G=null,this.setClear(re)}},getReversed:function(){return N},setTest:function(X){X?oe(r.DEPTH_TEST):fe(r.DEPTH_TEST)},setMask:function(X){I===X||x||(r.depthMask(X),I=X)},setFunc:function(X){if(N&&(X=hp[X]),w!==X){switch(X){case mc:r.depthFunc(r.NEVER);break;case gc:r.depthFunc(r.ALWAYS);break;case _c:r.depthFunc(r.LESS);break;case Io:r.depthFunc(r.LEQUAL);break;case vc:r.depthFunc(r.EQUAL);break;case yc:r.depthFunc(r.GEQUAL);break;case xc:r.depthFunc(r.GREATER);break;case Mc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}w=X}},setLocked:function(X){x=X},setClear:function(X){G!==X&&(G=X,N&&(X=1-X),r.clearDepth(X))},reset:function(){x=!1,I=null,w=null,G=null,N=!1}}},i=new function(){let x=!1,N=null,I=null,w=null,G=null,X=null,Y=null,re=null,xe=null;return{setTest:function(Me){x||(Me?oe(r.STENCIL_TEST):fe(r.STENCIL_TEST))},setMask:function(Me){N===Me||x||(r.stencilMask(Me),N=Me)},setFunc:function(Me,he,Ce){I===Me&&w===he&&G===Ce||(r.stencilFunc(Me,he,Ce),I=Me,w=he,G=Ce)},setOp:function(Me,he,Ce){X===Me&&Y===he&&re===Ce||(r.stencilOp(Me,he,Ce),X=Me,Y=he,re=Ce)},setLocked:function(Me){x=Me},setClear:function(Me){xe!==Me&&(r.clearStencil(Me),xe=Me)},reset:function(){x=!1,N=null,I=null,w=null,G=null,X=null,Y=null,re=null,xe=null}}},s=new WeakMap,a=new WeakMap,o={},c={},l={},h=new WeakMap,u=[],p=null,d=!1,m=null,f=null,v=null,g=null,_=null,y=null,S=null,E=new _e(0,0,0),M=0,P=!1,O=null,L=null,D=null,k=null,F=null,K=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,V=0,q=r.getParameter(r.VERSION);q.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(q)[1]),H=V>=1):q.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),H=V>=2);let W=null,ne={},de=r.getParameter(r.SCISSOR_BOX),Ae=r.getParameter(r.VIEWPORT),ve=new Ze().fromArray(de),ye=new Ze().fromArray(Ae);function te(x,N,I,w){let G=new Uint8Array(4),X=r.createTexture();r.bindTexture(x,X),r.texParameteri(x,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(x,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Y=0;Y<I;Y++)x===r.TEXTURE_3D||x===r.TEXTURE_2D_ARRAY?r.texImage3D(N,0,r.RGBA,1,1,w,0,r.RGBA,r.UNSIGNED_BYTE,G):r.texImage2D(N+Y,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,G);return X}let ce={};function oe(x){o[x]!==!0&&(r.enable(x),o[x]=!0)}function fe(x){o[x]!==!1&&(r.disable(x),o[x]=!1)}ce[r.TEXTURE_2D]=te(r.TEXTURE_2D,r.TEXTURE_2D,1),ce[r.TEXTURE_CUBE_MAP]=te(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[r.TEXTURE_2D_ARRAY]=te(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ce[r.TEXTURE_3D]=te(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),oe(r.DEPTH_TEST),n.setFunc(Io),b(!1),R(uc),oe(r.CULL_FACE),C(Bn);let Ue={[Br]:r.FUNC_ADD,[Cd]:r.FUNC_SUBTRACT,[Pd]:r.FUNC_REVERSE_SUBTRACT};Ue[Id]=r.MIN,Ue[Ld]=r.MAX;let Q={[Nd]:r.ZERO,[Dd]:r.ONE,[Ud]:r.SRC_COLOR,[Fd]:r.SRC_ALPHA,[Hd]:r.SRC_ALPHA_SATURATE,[kd]:r.DST_COLOR,[zd]:r.DST_ALPHA,[Od]:r.ONE_MINUS_SRC_COLOR,[Bd]:r.ONE_MINUS_SRC_ALPHA,[Vd]:r.ONE_MINUS_DST_COLOR,[Gd]:r.ONE_MINUS_DST_ALPHA,[Wd]:r.CONSTANT_COLOR,[Xd]:r.ONE_MINUS_CONSTANT_COLOR,[jd]:r.CONSTANT_ALPHA,[qd]:r.ONE_MINUS_CONSTANT_ALPHA};function C(x,N,I,w,G,X,Y,re,xe,Me){if(x!==Bn){if(d===!1&&(oe(r.BLEND),d=!0),x===Rd)G=G||N,X=X||I,Y=Y||w,N===f&&G===_||(r.blendEquationSeparate(Ue[N],Ue[G]),f=N,_=G),I===v&&w===g&&X===y&&Y===S||(r.blendFuncSeparate(Q[I],Q[w],Q[X],Q[Y]),v=I,g=w,y=X,S=Y),re.equals(E)!==!1&&xe===M||(r.blendColor(re.r,re.g,re.b,xe),E.copy(re),M=xe),m=x,P=!1;else if(x!==m||Me!==P){if(f===Br&&_===Br||(r.blendEquation(r.FUNC_ADD),f=Br,_=Br),Me)switch(x){case qs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case dc:r.blendFunc(r.ONE,r.ONE);break;case pc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case fc:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:we("WebGLState: Invalid blending: ",x)}else switch(x){case qs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case dc:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case pc:we("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fc:we("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:we("WebGLState: Invalid blending: ",x)}v=null,g=null,y=null,S=null,E.set(0,0,0),M=0,m=x,P=Me}}else d===!0&&(fe(r.BLEND),d=!1)}function b(x){O!==x&&(x?r.frontFace(r.CW):r.frontFace(r.CCW),O=x)}function R(x){x!==Ad?(oe(r.CULL_FACE),x!==L&&(x===uc?r.cullFace(r.BACK):x===wd?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):fe(r.CULL_FACE),L=x}function U(x,N,I){x?(oe(r.POLYGON_OFFSET_FILL),k===N&&F===I||(k=N,F=I,n.getReversed()&&(N=-N),r.polygonOffset(N,I))):fe(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:oe,disable:fe,bindFramebuffer:function(x,N){return l[x]!==N&&(r.bindFramebuffer(x,N),l[x]=N,x===r.DRAW_FRAMEBUFFER&&(l[r.FRAMEBUFFER]=N),x===r.FRAMEBUFFER&&(l[r.DRAW_FRAMEBUFFER]=N),!0)},drawBuffers:function(x,N){let I=u,w=!1;if(x){I=h.get(N),I===void 0&&(I=[],h.set(N,I));let G=x.textures;if(I.length!==G.length||I[0]!==r.COLOR_ATTACHMENT0){for(let X=0,Y=G.length;X<Y;X++)I[X]=r.COLOR_ATTACHMENT0+X;I.length=G.length,w=!0}}else I[0]!==r.BACK&&(I[0]=r.BACK,w=!0);w&&r.drawBuffers(I)},useProgram:function(x){return p!==x&&(r.useProgram(x),p=x,!0)},setBlending:C,setMaterial:function(x,N){x.side===an?fe(r.CULL_FACE):oe(r.CULL_FACE);let I=x.side===Wt;N&&(I=!I),b(I),x.blending===qs&&x.transparent===!1?C(Bn):C(x.blending,x.blendEquation,x.blendSrc,x.blendDst,x.blendEquationAlpha,x.blendSrcAlpha,x.blendDstAlpha,x.blendColor,x.blendAlpha,x.premultipliedAlpha),n.setFunc(x.depthFunc),n.setTest(x.depthTest),n.setMask(x.depthWrite),t.setMask(x.colorWrite);let w=x.stencilWrite;i.setTest(w),w&&(i.setMask(x.stencilWriteMask),i.setFunc(x.stencilFunc,x.stencilRef,x.stencilFuncMask),i.setOp(x.stencilFail,x.stencilZFail,x.stencilZPass)),U(x.polygonOffset,x.polygonOffsetFactor,x.polygonOffsetUnits),x.alphaToCoverage===!0?oe(r.SAMPLE_ALPHA_TO_COVERAGE):fe(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:b,setCullFace:R,setLineWidth:function(x){x!==D&&(H&&r.lineWidth(x),D=x)},setPolygonOffset:U,setScissorTest:function(x){x?oe(r.SCISSOR_TEST):fe(r.SCISSOR_TEST)},activeTexture:function(x){x===void 0&&(x=r.TEXTURE0+K-1),W!==x&&(r.activeTexture(x),W=x)},bindTexture:function(x,N,I){I===void 0&&(I=W===null?r.TEXTURE0+K-1:W);let w=ne[I];w===void 0&&(w={type:void 0,texture:void 0},ne[I]=w),w.type===x&&w.texture===N||(W!==I&&(r.activeTexture(I),W=I),r.bindTexture(x,N||ce[x]),w.type=x,w.texture=N)},unbindTexture:function(){let x=ne[W];x!==void 0&&x.type!==void 0&&(r.bindTexture(x.type,null),x.type=void 0,x.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(x){we("WebGLState:",x)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(x){we("WebGLState:",x)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(x){we("WebGLState:",x)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(x){we("WebGLState:",x)}},pixelStorei:function(x,N){c[x]!==N&&(r.pixelStorei(x,N),c[x]=N)},getParameter:function(x){return c[x]!==void 0?c[x]:r.getParameter(x)},updateUBOMapping:function(x,N){let I=a.get(N);I===void 0&&(I=new WeakMap,a.set(N,I));let w=I.get(x);w===void 0&&(w=r.getUniformBlockIndex(N,x.name),I.set(x,w))},uniformBlockBinding:function(x,N){let I=a.get(N).get(x);s.get(N)!==I&&(r.uniformBlockBinding(N,I,x.__bindingPointIndex),s.set(N,I))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(x){we("WebGLState:",x)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(x){we("WebGLState:",x)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(x){we("WebGLState:",x)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(x){we("WebGLState:",x)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(x){we("WebGLState:",x)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(x){we("WebGLState:",x)}},scissor:function(x){ve.equals(x)===!1&&(r.scissor(x.x,x.y,x.z,x.w),ve.copy(x))},viewport:function(x){ye.equals(x)===!1&&(r.viewport(x.x,x.y,x.z,x.w),ye.copy(x))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),o={},c={},W=null,ne={},l={},h=new WeakMap,u=[],p=null,d=!1,m=null,f=null,v=null,g=null,_=null,y=null,S=null,E=new _e(0,0,0),M=0,P=!1,O=null,L=null,D=null,k=null,F=null,ve.set(0,0,r.canvas.width,r.canvas.height),ye.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function zg(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),l=new $,h=new WeakMap,u=new Set,p,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(C,b){return m?new OffscreenCanvas(C,b):Sr("canvas")}function v(C,b,R){let U=1,x=Q(C);if((x.width>R||x.height>R)&&(U=R/Math.max(x.width,x.height)),U<1){if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let N=Math.floor(U*x.width),I=Math.floor(U*x.height);p===void 0&&(p=f(N,I));let w=b?f(N,I):p;return w.width=N,w.height=I,w.getContext("2d").drawImage(C,0,0,N,I),ge("WebGLRenderer: Texture has been resized from ("+x.width+"x"+x.height+") to ("+N+"x"+I+")."),w}return"data"in C&&ge("WebGLRenderer: Image in DataTexture is too big ("+x.width+"x"+x.height+")."),C}return C}function g(C){return C.generateMipmaps}function _(C){r.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function S(C,b,R,U,x,N=!1){if(C!==null){if(r[C]!==void 0)return r[C];ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let I;U&&(I=e.get("EXT_texture_norm16"),I||ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let w=b;if(b===r.RED&&(R===r.FLOAT&&(w=r.R32F),R===r.HALF_FLOAT&&(w=r.R16F),R===r.UNSIGNED_BYTE&&(w=r.R8),R===r.UNSIGNED_SHORT&&I&&(w=I.R16_EXT),R===r.SHORT&&I&&(w=I.R16_SNORM_EXT)),b===r.RED_INTEGER&&(R===r.UNSIGNED_BYTE&&(w=r.R8UI),R===r.UNSIGNED_SHORT&&(w=r.R16UI),R===r.UNSIGNED_INT&&(w=r.R32UI),R===r.BYTE&&(w=r.R8I),R===r.SHORT&&(w=r.R16I),R===r.INT&&(w=r.R32I)),b===r.RG&&(R===r.FLOAT&&(w=r.RG32F),R===r.HALF_FLOAT&&(w=r.RG16F),R===r.UNSIGNED_BYTE&&(w=r.RG8),R===r.UNSIGNED_SHORT&&I&&(w=I.RG16_EXT),R===r.SHORT&&I&&(w=I.RG16_SNORM_EXT)),b===r.RG_INTEGER&&(R===r.UNSIGNED_BYTE&&(w=r.RG8UI),R===r.UNSIGNED_SHORT&&(w=r.RG16UI),R===r.UNSIGNED_INT&&(w=r.RG32UI),R===r.BYTE&&(w=r.RG8I),R===r.SHORT&&(w=r.RG16I),R===r.INT&&(w=r.RG32I)),b===r.RGB_INTEGER&&(R===r.UNSIGNED_BYTE&&(w=r.RGB8UI),R===r.UNSIGNED_SHORT&&(w=r.RGB16UI),R===r.UNSIGNED_INT&&(w=r.RGB32UI),R===r.BYTE&&(w=r.RGB8I),R===r.SHORT&&(w=r.RGB16I),R===r.INT&&(w=r.RGB32I)),b===r.RGBA_INTEGER&&(R===r.UNSIGNED_BYTE&&(w=r.RGBA8UI),R===r.UNSIGNED_SHORT&&(w=r.RGBA16UI),R===r.UNSIGNED_INT&&(w=r.RGBA32UI),R===r.BYTE&&(w=r.RGBA8I),R===r.SHORT&&(w=r.RGBA16I),R===r.INT&&(w=r.RGBA32I)),b===r.RGB&&(R===r.UNSIGNED_SHORT&&I&&(w=I.RGB16_EXT),R===r.SHORT&&I&&(w=I.RGB16_SNORM_EXT),R===r.UNSIGNED_INT_5_9_9_9_REV&&(w=r.RGB9_E5),R===r.UNSIGNED_INT_10F_11F_11F_REV&&(w=r.R11F_G11F_B10F)),b===r.RGBA){let G=N?us:ze.getTransfer(x);R===r.FLOAT&&(w=r.RGBA32F),R===r.HALF_FLOAT&&(w=r.RGBA16F),R===r.UNSIGNED_BYTE&&(w=G===qe?r.SRGB8_ALPHA8:r.RGBA8),R===r.UNSIGNED_SHORT&&I&&(w=I.RGBA16_EXT),R===r.SHORT&&I&&(w=I.RGBA16_SNORM_EXT),R===r.UNSIGNED_SHORT_4_4_4_4&&(w=r.RGBA4),R===r.UNSIGNED_SHORT_5_5_5_1&&(w=r.RGB5_A1)}return w!==r.R16F&&w!==r.R32F&&w!==r.RG16F&&w!==r.RG32F&&w!==r.RGBA16F&&w!==r.RGBA32F||e.get("EXT_color_buffer_float"),w}function E(C,b){let R;return C?b===null||b===di||b===Vr?R=r.DEPTH24_STENCIL8:b===$t?R=r.DEPTH32F_STENCIL8:b===kr&&(R=r.DEPTH24_STENCIL8,ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===di||b===Vr?R=r.DEPTH_COMPONENT24:b===$t?R=r.DEPTH_COMPONENT32F:b===kr&&(R=r.DEPTH_COMPONENT16),R}function M(C,b){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ft&&C.minFilter!==vt?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function P(C){let b=C.target;b.removeEventListener("dispose",P),(function(R){let U=n.get(R);if(U.__webglInit===void 0)return;let x=R.source,N=d.get(x);if(N){let I=N[U.__cacheKey];I.usedTimes--,I.usedTimes===0&&L(R),Object.keys(N).length===0&&d.delete(x)}n.remove(R)})(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&u.delete(b)}function O(C){let b=C.target;b.removeEventListener("dispose",O),(function(R){let U=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let N=0;N<6;N++){if(Array.isArray(U.__webglFramebuffer[N]))for(let I=0;I<U.__webglFramebuffer[N].length;I++)r.deleteFramebuffer(U.__webglFramebuffer[N][I]);else r.deleteFramebuffer(U.__webglFramebuffer[N]);U.__webglDepthbuffer&&r.deleteRenderbuffer(U.__webglDepthbuffer[N])}else{if(Array.isArray(U.__webglFramebuffer))for(let N=0;N<U.__webglFramebuffer.length;N++)r.deleteFramebuffer(U.__webglFramebuffer[N]);else r.deleteFramebuffer(U.__webglFramebuffer);if(U.__webglDepthbuffer&&r.deleteRenderbuffer(U.__webglDepthbuffer),U.__webglMultisampledFramebuffer&&r.deleteFramebuffer(U.__webglMultisampledFramebuffer),U.__webglColorRenderbuffer)for(let N=0;N<U.__webglColorRenderbuffer.length;N++)U.__webglColorRenderbuffer[N]&&r.deleteRenderbuffer(U.__webglColorRenderbuffer[N]);U.__webglDepthRenderbuffer&&r.deleteRenderbuffer(U.__webglDepthRenderbuffer)}let x=R.textures;for(let N=0,I=x.length;N<I;N++){let w=n.get(x[N]);w.__webglTexture&&(r.deleteTexture(w.__webglTexture),a.memory.textures--),n.remove(x[N])}n.remove(R)})(b)}function L(C){let b=n.get(C);r.deleteTexture(b.__webglTexture);let R=C.source;delete d.get(R)[b.__cacheKey],a.memory.textures--}let D=0;function k(C,b){let R=n.get(C);if(C.isVideoTexture&&(function(U){let x=a.render.frame;h.get(U)!==x&&(h.set(U,x),U.update())})(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&R.__version!==C.version){let U=C.image;if(U===null)ge("WebGLRenderer: Texture marked for update but no image data found.");else{if(U.complete!==!1)return void ne(R,C,b);ge("WebGLRenderer: Texture marked for update but image is incomplete")}}else C.isExternalTexture&&(R.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,R.__webglTexture,r.TEXTURE0+b)}let F={[Mi]:r.REPEAT,[Ln]:r.CLAMP_TO_EDGE,[xr]:r.MIRRORED_REPEAT},K={[Ft]:r.NEAREST,[Do]:r.NEAREST_MIPMAP_NEAREST,[Yi]:r.NEAREST_MIPMAP_LINEAR,[vt]:r.LINEAR,[Gr]:r.LINEAR_MIPMAP_NEAREST,[zn]:r.LINEAR_MIPMAP_LINEAR},H={[tp]:r.NEVER,[ap]:r.ALWAYS,[np]:r.LESS,[jo]:r.LEQUAL,[ip]:r.EQUAL,[qo]:r.GEQUAL,[rp]:r.GREATER,[sp]:r.NOTEQUAL};function V(C,b){if(b.type!==$t||e.has("OES_texture_float_linear")!==!1||b.magFilter!==vt&&b.magFilter!==Gr&&b.magFilter!==Yi&&b.magFilter!==zn&&b.minFilter!==vt&&b.minFilter!==Gr&&b.minFilter!==Yi&&b.minFilter!==zn||ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,F[b.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,F[b.wrapT]),C!==r.TEXTURE_3D&&C!==r.TEXTURE_2D_ARRAY||r.texParameteri(C,r.TEXTURE_WRAP_R,F[b.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,K[b.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,K[b.minFilter]),b.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,H[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ft||b.minFilter!==Yi&&b.minFilter!==zn||b.type===$t&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let R=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,R.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function q(C,b){let R=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",P));let U=b.source,x=d.get(U);x===void 0&&(x={},d.set(U,x));let N=(function(I){let w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()})(b);if(N!==C.__cacheKey){x[N]===void 0&&(x[N]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,R=!0),x[N].usedTimes++;let I=x[C.__cacheKey];I!==void 0&&(x[C.__cacheKey].usedTimes--,I.usedTimes===0&&L(b)),C.__cacheKey=N,C.__webglTexture=x[N].texture}return R}function W(C,b,R){return Math.floor(Math.floor(C/R)/b)}function ne(C,b,R){let U=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(U=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(U=r.TEXTURE_3D);let x=q(C,b),N=b.source;t.bindTexture(U,C.__webglTexture,r.TEXTURE0+R);let I=n.get(N);if(N.version!==I.__version||x===!0){if(t.activeTexture(r.TEXTURE0+R),!(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)){let se=ze.getPrimaries(ze.workingColorSpace),ie=b.colorSpace===Ji?null:ze.getPrimaries(b.colorSpace),pe=b.colorSpace===Ji||se===ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe)}t.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment);let w=v(b.image,!1,i.maxTextureSize);w=Ue(b,w);let G=s.convert(b.format,b.colorSpace),X=s.convert(b.type),Y,re=S(b.internalFormat,G,X,b.normalized,b.colorSpace,b.isVideoTexture);V(U,b);let xe=b.mipmaps,Me=b.isVideoTexture!==!0,he=I.__version===void 0||x===!0,Ce=N.dataReady,ee=M(b,w);if(b.isDepthTexture)re=E(b.format===Ki,b.type),he&&(Me?t.texStorage2D(r.TEXTURE_2D,1,re,w.width,w.height):t.texImage2D(r.TEXTURE_2D,0,re,w.width,w.height,0,G,X,null));else if(b.isDataTexture)if(xe.length>0){Me&&he&&t.texStorage2D(r.TEXTURE_2D,ee,re,xe[0].width,xe[0].height);for(let se=0,ie=xe.length;se<ie;se++)Y=xe[se],Me?Ce&&t.texSubImage2D(r.TEXTURE_2D,se,0,0,Y.width,Y.height,G,X,Y.data):t.texImage2D(r.TEXTURE_2D,se,re,Y.width,Y.height,0,G,X,Y.data);b.generateMipmaps=!1}else Me?(he&&t.texStorage2D(r.TEXTURE_2D,ee,re,w.width,w.height),Ce&&(function(se,ie,pe,Qe){let je=se.updateRanges;if(je.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,ie.width,ie.height,pe,Qe,ie.data);else{je.sort((Be,Rt)=>Be.start-Rt.start);let ot=0;for(let Be=1;Be<je.length;Be++){let Rt=je[ot],et=je[Be],yt=Rt.start+Rt.count,at=W(et.start,ie.width,4),en=W(Rt.start,ie.width,4);et.start<=yt+1&&at===en&&W(et.start+et.count-1,ie.width,4)===at?Rt.count=Math.max(Rt.count,et.start+et.count-Rt.start):(++ot,je[ot]=et)}je.length=ot+1;let Ut=t.getParameter(r.UNPACK_ROW_LENGTH),Te=t.getParameter(r.UNPACK_SKIP_PIXELS),Ye=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,ie.width);for(let Be=0,Rt=je.length;Be<Rt;Be++){let et=je[Be],yt=Math.floor(et.start/4),at=Math.ceil(et.count/4),en=yt%ie.width,un=Math.floor(yt/ie.width),Li=at;t.pixelStorei(r.UNPACK_SKIP_PIXELS,en),t.pixelStorei(r.UNPACK_SKIP_ROWS,un),t.texSubImage2D(r.TEXTURE_2D,0,en,un,Li,1,pe,Qe,ie.data)}se.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,Ut),t.pixelStorei(r.UNPACK_SKIP_PIXELS,Te),t.pixelStorei(r.UNPACK_SKIP_ROWS,Ye)}})(b,w,G,X)):t.texImage2D(r.TEXTURE_2D,0,re,w.width,w.height,0,G,X,w.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Me&&he&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ee,re,xe[0].width,xe[0].height,w.depth);for(let se=0,ie=xe.length;se<ie;se++)if(Y=xe[se],b.format!==on)if(G!==null)if(Me){if(Ce)if(b.layerUpdates.size>0){let pe=vh(Y.width,Y.height,b.format,b.type);for(let Qe of b.layerUpdates){let je=Y.data.subarray(Qe*pe/Y.data.BYTES_PER_ELEMENT,(Qe+1)*pe/Y.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,se,0,0,Qe,Y.width,Y.height,1,G,je)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,se,0,0,0,Y.width,Y.height,w.depth,G,Y.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,se,re,Y.width,Y.height,w.depth,0,Y.data,0,0);else ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Me?Ce&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,se,0,0,0,Y.width,Y.height,w.depth,G,X,Y.data):t.texImage3D(r.TEXTURE_2D_ARRAY,se,re,Y.width,Y.height,w.depth,0,G,X,Y.data)}else{Me&&he&&t.texStorage2D(r.TEXTURE_2D,ee,re,xe[0].width,xe[0].height);for(let se=0,ie=xe.length;se<ie;se++)Y=xe[se],b.format!==on?G!==null?Me?Ce&&t.compressedTexSubImage2D(r.TEXTURE_2D,se,0,0,Y.width,Y.height,G,Y.data):t.compressedTexImage2D(r.TEXTURE_2D,se,re,Y.width,Y.height,0,Y.data):ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Me?Ce&&t.texSubImage2D(r.TEXTURE_2D,se,0,0,Y.width,Y.height,G,X,Y.data):t.texImage2D(r.TEXTURE_2D,se,re,Y.width,Y.height,0,G,X,Y.data)}else if(b.isDataArrayTexture)if(Me){if(he&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ee,re,w.width,w.height,w.depth),Ce)if(b.layerUpdates.size>0){let se=vh(w.width,w.height,b.format,b.type);for(let ie of b.layerUpdates){let pe=w.data.subarray(ie*se/w.data.BYTES_PER_ELEMENT,(ie+1)*se/w.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ie,w.width,w.height,1,G,X,pe)}b.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,w.width,w.height,w.depth,G,X,w.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,re,w.width,w.height,w.depth,0,G,X,w.data);else if(b.isData3DTexture)Me?(he&&t.texStorage3D(r.TEXTURE_3D,ee,re,w.width,w.height,w.depth),Ce&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,w.width,w.height,w.depth,G,X,w.data)):t.texImage3D(r.TEXTURE_3D,0,re,w.width,w.height,w.depth,0,G,X,w.data);else if(b.isFramebufferTexture){if(he)if(Me)t.texStorage2D(r.TEXTURE_2D,ee,re,w.width,w.height);else{let se=w.width,ie=w.height;for(let pe=0;pe<ee;pe++)t.texImage2D(r.TEXTURE_2D,pe,re,se,ie,0,G,X,null),se>>=1,ie>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in r){let se=r.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),w.parentNode!==se)return se.appendChild(w),u.add(b),se.onpaint=ie=>{let pe=ie.changedElements;for(let Qe of u)pe.includes(Qe.image)&&(Qe.needsUpdate=!0)},void se.requestPaint();if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,w);else{let pe=r.RGBA,Qe=r.RGBA,je=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,pe,Qe,je,w)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(xe.length>0){if(Me&&he){let se=Q(xe[0]);t.texStorage2D(r.TEXTURE_2D,ee,re,se.width,se.height)}for(let se=0,ie=xe.length;se<ie;se++)Y=xe[se],Me?Ce&&t.texSubImage2D(r.TEXTURE_2D,se,0,0,G,X,Y):t.texImage2D(r.TEXTURE_2D,se,re,G,X,Y);b.generateMipmaps=!1}else if(Me){if(he){let se=Q(w);t.texStorage2D(r.TEXTURE_2D,ee,re,se.width,se.height)}Ce&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,G,X,w)}else t.texImage2D(r.TEXTURE_2D,0,re,G,X,w);g(b)&&_(U),I.__version=N.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function de(C,b,R,U,x,N){let I=s.convert(R.format,R.colorSpace),w=s.convert(R.type),G=S(R.internalFormat,I,w,R.normalized,R.colorSpace),X=n.get(b),Y=n.get(R);if(Y.__renderTarget=b,!X.__hasExternalTextures){let re=Math.max(1,b.width>>N),xe=Math.max(1,b.height>>N);x===r.TEXTURE_3D||x===r.TEXTURE_2D_ARRAY?t.texImage3D(x,N,G,re,xe,b.depth,0,I,w,null):t.texImage2D(x,N,G,re,xe,0,I,w,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),fe(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,U,x,Y.__webglTexture,0,oe(b)):(x===r.TEXTURE_2D||x>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&x<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,U,x,Y.__webglTexture,N),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ae(C,b,R){if(r.bindRenderbuffer(r.RENDERBUFFER,C),b.depthBuffer){let U=b.depthTexture,x=U&&U.isDepthTexture?U.type:null,N=E(b.stencilBuffer,x),I=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;fe(b)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,oe(b),N,b.width,b.height):R?r.renderbufferStorageMultisample(r.RENDERBUFFER,oe(b),N,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,N,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,I,r.RENDERBUFFER,C)}else{let U=b.textures;for(let x=0;x<U.length;x++){let N=U[x],I=s.convert(N.format,N.colorSpace),w=s.convert(N.type),G=S(N.internalFormat,I,w,N.normalized,N.colorSpace);fe(b)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,oe(b),G,b.width,b.height):R?r.renderbufferStorageMultisample(r.RENDERBUFFER,oe(b),G,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,G,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ve(C,b,R){let U=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,C),!b.depthTexture||!b.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let x=n.get(b.depthTexture);if(x.__renderTarget=b,x.__webglTexture&&b.depthTexture.image.width===b.width&&b.depthTexture.image.height===b.height||(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),U){if(x.__webglInit===void 0&&(x.__webglInit=!0,b.depthTexture.addEventListener("dispose",P)),x.__webglTexture===void 0){x.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,x.__webglTexture),V(r.TEXTURE_CUBE_MAP,b.depthTexture);let X=s.convert(b.depthTexture.format),Y=s.convert(b.depthTexture.type),re;b.depthTexture.format===Pi?re=r.DEPTH_COMPONENT24:b.depthTexture.format===Ki&&(re=r.DEPTH24_STENCIL8);for(let xe=0;xe<6;xe++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,re,b.width,b.height,0,X,Y,null)}}else k(b.depthTexture,0);let N=x.__webglTexture,I=oe(b),w=U?r.TEXTURE_CUBE_MAP_POSITIVE_X+R:r.TEXTURE_2D,G=b.depthTexture.format===Ki?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(b.depthTexture.format===Pi)fe(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,G,w,N,0,I):r.framebufferTexture2D(r.FRAMEBUFFER,G,w,N,0);else{if(b.depthTexture.format!==Ki)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");fe(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,G,w,N,0,I):r.framebufferTexture2D(r.FRAMEBUFFER,G,w,N,0)}}function ye(C){let b=n.get(C),R=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){let U=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),U){let x=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,U.removeEventListener("dispose",x)};U.addEventListener("dispose",x),b.__depthDisposeCallback=x}b.__boundDepthTexture=U}if(C.depthTexture&&!b.__autoAllocateDepthBuffer)if(R)for(let U=0;U<6;U++)ve(b.__webglFramebuffer[U],C,U);else{let U=C.texture.mipmaps;U&&U.length>0?ve(b.__webglFramebuffer[0],C,0):ve(b.__webglFramebuffer,C,0)}else if(R){b.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[U]),b.__webglDepthbuffer[U]===void 0)b.__webglDepthbuffer[U]=r.createRenderbuffer(),Ae(b.__webglDepthbuffer[U],C,!1);else{let x=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,N=b.__webglDepthbuffer[U];r.bindRenderbuffer(r.RENDERBUFFER,N),r.framebufferRenderbuffer(r.FRAMEBUFFER,x,r.RENDERBUFFER,N)}}else{let U=C.texture.mipmaps;if(U&&U.length>0?t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),Ae(b.__webglDepthbuffer,C,!1);else{let x=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,N=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,N),r.framebufferRenderbuffer(r.FRAMEBUFFER,x,r.RENDERBUFFER,N)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let te=[],ce=[];function oe(C){return Math.min(i.maxSamples,C.samples)}function fe(C){let b=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ue(C,b){let R=C.colorSpace,U=C.format,x=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||R!==Bt&&R!==Ji&&(ze.getTransfer(R)===qe?U===on&&x===Jt||ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):we("WebGLTextures: Unsupported texture color space:",R)),b}function Q(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=function(){let C=D;return C>=i.maxTextures&&ge("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),D+=1,C},this.resetTextureUnits=function(){D=0},this.getTextureUnits=function(){return D},this.setTextureUnits=function(C){D=C},this.setTexture2D=k,this.setTexture2DArray=function(C,b){let R=n.get(C);C.isRenderTargetTexture===!1&&C.version>0&&R.__version!==C.version?ne(R,C,b):(C.isExternalTexture&&(R.__webglTexture=C.sourceTexture?C.sourceTexture:null),t.bindTexture(r.TEXTURE_2D_ARRAY,R.__webglTexture,r.TEXTURE0+b))},this.setTexture3D=function(C,b){let R=n.get(C);C.isRenderTargetTexture===!1&&C.version>0&&R.__version!==C.version?ne(R,C,b):t.bindTexture(r.TEXTURE_3D,R.__webglTexture,r.TEXTURE0+b)},this.setTextureCube=function(C,b){let R=n.get(C);C.isCubeDepthTexture!==!0&&C.version>0&&R.__version!==C.version?(function(U,x,N){if(x.image.length!==6)return;let I=q(U,x),w=x.source;t.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture,r.TEXTURE0+N);let G=n.get(w);if(w.version!==G.__version||I===!0){t.activeTexture(r.TEXTURE0+N);let X=ze.getPrimaries(ze.workingColorSpace),Y=x.colorSpace===Ji?null:ze.getPrimaries(x.colorSpace),re=x.colorSpace===Ji||X===Y?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);let xe=x.isCompressedTexture||x.image[0].isCompressedTexture,Me=x.image[0]&&x.image[0].isDataTexture,he=[];for(let Te=0;Te<6;Te++)he[Te]=xe||Me?Me?x.image[Te].image:x.image[Te]:v(x.image[Te],!0,i.maxCubemapSize),he[Te]=Ue(x,he[Te]);let Ce=he[0],ee=s.convert(x.format,x.colorSpace),se=s.convert(x.type),ie=S(x.internalFormat,ee,se,x.normalized,x.colorSpace),pe=x.isVideoTexture!==!0,Qe=G.__version===void 0||I===!0,je=w.dataReady,ot,Ut=M(x,Ce);if(V(r.TEXTURE_CUBE_MAP,x),xe){pe&&Qe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ut,ie,Ce.width,Ce.height);for(let Te=0;Te<6;Te++){ot=he[Te].mipmaps;for(let Ye=0;Ye<ot.length;Ye++){let Be=ot[Ye];x.format!==on?ee!==null?pe?je&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Ye,0,0,Be.width,Be.height,ee,Be.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Ye,ie,Be.width,Be.height,0,Be.data):ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):pe?je&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Ye,0,0,Be.width,Be.height,ee,se,Be.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Ye,ie,Be.width,Be.height,0,ee,se,Be.data)}}}else{if(ot=x.mipmaps,pe&&Qe){ot.length>0&&Ut++;let Te=Q(he[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ut,ie,Te.width,Te.height)}for(let Te=0;Te<6;Te++)if(Me){pe?je&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,he[Te].width,he[Te].height,ee,se,he[Te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,ie,he[Te].width,he[Te].height,0,ee,se,he[Te].data);for(let Ye=0;Ye<ot.length;Ye++){let Be=ot[Ye].image[Te].image;pe?je&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Ye+1,0,0,Be.width,Be.height,ee,se,Be.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Ye+1,ie,Be.width,Be.height,0,ee,se,Be.data)}}else{pe?je&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,ee,se,he[Te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,ie,ee,se,he[Te]);for(let Ye=0;Ye<ot.length;Ye++){let Be=ot[Ye];pe?je&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Ye+1,0,0,ee,se,Be.image[Te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Ye+1,ie,ee,se,Be.image[Te])}}}g(x)&&_(r.TEXTURE_CUBE_MAP),G.__version=w.version,x.onUpdate&&x.onUpdate(x)}U.__version=x.version})(R,C,b):t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+b)},this.rebindTextures=function(C,b,R){let U=n.get(C);b!==void 0&&de(U.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),R!==void 0&&ye(C)},this.setupRenderTarget=function(C){let b=C.texture,R=n.get(C),U=n.get(b);C.addEventListener("dispose",O);let x=C.textures,N=C.isWebGLCubeRenderTarget===!0,I=x.length>1;if(I||(U.__webglTexture===void 0&&(U.__webglTexture=r.createTexture()),U.__version=b.version,a.memory.textures++),N){R.__webglFramebuffer=[];for(let w=0;w<6;w++)if(b.mipmaps&&b.mipmaps.length>0){R.__webglFramebuffer[w]=[];for(let G=0;G<b.mipmaps.length;G++)R.__webglFramebuffer[w][G]=r.createFramebuffer()}else R.__webglFramebuffer[w]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){R.__webglFramebuffer=[];for(let w=0;w<b.mipmaps.length;w++)R.__webglFramebuffer[w]=r.createFramebuffer()}else R.__webglFramebuffer=r.createFramebuffer();if(I)for(let w=0,G=x.length;w<G;w++){let X=n.get(x[w]);X.__webglTexture===void 0&&(X.__webglTexture=r.createTexture(),a.memory.textures++)}if(C.samples>0&&fe(C)===!1){R.__webglMultisampledFramebuffer=r.createFramebuffer(),R.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,R.__webglMultisampledFramebuffer);for(let w=0;w<x.length;w++){let G=x[w];R.__webglColorRenderbuffer[w]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,R.__webglColorRenderbuffer[w]);let X=s.convert(G.format,G.colorSpace),Y=s.convert(G.type),re=S(G.internalFormat,X,Y,G.normalized,G.colorSpace,C.isXRRenderTarget===!0),xe=oe(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,re,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+w,r.RENDERBUFFER,R.__webglColorRenderbuffer[w])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(R.__webglDepthRenderbuffer=r.createRenderbuffer(),Ae(R.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(N){t.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture),V(r.TEXTURE_CUBE_MAP,b);for(let w=0;w<6;w++)if(b.mipmaps&&b.mipmaps.length>0)for(let G=0;G<b.mipmaps.length;G++)de(R.__webglFramebuffer[w][G],C,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+w,G);else de(R.__webglFramebuffer[w],C,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+w,0);g(b)&&_(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(I){for(let w=0,G=x.length;w<G;w++){let X=x[w],Y=n.get(X),re=r.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(re=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(re,Y.__webglTexture),V(re,X),de(R.__webglFramebuffer,C,X,r.COLOR_ATTACHMENT0+w,re,0),g(X)&&_(re)}t.unbindTexture()}else{let w=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(w=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(w,U.__webglTexture),V(w,b),b.mipmaps&&b.mipmaps.length>0)for(let G=0;G<b.mipmaps.length;G++)de(R.__webglFramebuffer[G],C,b,r.COLOR_ATTACHMENT0,w,G);else de(R.__webglFramebuffer,C,b,r.COLOR_ATTACHMENT0,w,0);g(b)&&_(w),t.unbindTexture()}C.depthBuffer&&ye(C)},this.updateRenderTargetMipmap=function(C){let b=C.textures;for(let R=0,U=b.length;R<U;R++){let x=b[R];if(g(x)){let N=y(C),I=n.get(x).__webglTexture;t.bindTexture(N,I),_(N),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(C){if(C.samples>0){if(fe(C)===!1){let b=C.textures,R=C.width,U=C.height,x=r.COLOR_BUFFER_BIT,N=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,I=n.get(C),w=b.length>1;if(w)for(let X=0;X<b.length;X++)t.bindFramebuffer(r.FRAMEBUFFER,I.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+X,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,I.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+X,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,I.__webglMultisampledFramebuffer);let G=C.texture.mipmaps;G&&G.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,I.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,I.__webglFramebuffer);for(let X=0;X<b.length;X++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(x|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(x|=r.STENCIL_BUFFER_BIT)),w){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,I.__webglColorRenderbuffer[X]);let Y=n.get(b[X]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Y,0)}r.blitFramebuffer(0,0,R,U,0,0,R,U,x,r.NEAREST),c===!0&&(te.length=0,ce.length=0,te.push(r.COLOR_ATTACHMENT0+X),C.depthBuffer&&C.resolveDepthBuffer===!1&&(te.push(N),ce.push(N),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ce)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),w)for(let X=0;X<b.length;X++){t.bindFramebuffer(r.FRAMEBUFFER,I.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+X,r.RENDERBUFFER,I.__webglColorRenderbuffer[X]);let Y=n.get(b[X]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,I.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+X,r.TEXTURE_2D,Y,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,I.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let b=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}},this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=de,this.useMultisampledRTT=fe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Gg(r,e){return{convert:function(t,n=Ji){let i,s=ze.getTransfer(n);if(t===Jt)return r.UNSIGNED_BYTE;if(t===Oo)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Fo)return r.UNSIGNED_SHORT_5_5_5_1;if(t===Lc)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Nc)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===Pc)return r.BYTE;if(t===Ic)return r.SHORT;if(t===kr)return r.UNSIGNED_SHORT;if(t===Uo)return r.INT;if(t===di)return r.UNSIGNED_INT;if(t===$t)return r.FLOAT;if(t===Gn)return r.HALF_FLOAT;if(t===$d)return r.ALPHA;if(t===Qd)return r.RGB;if(t===on)return r.RGBA;if(t===Pi)return r.DEPTH_COMPONENT;if(t===Ki)return r.DEPTH_STENCIL;if(t===Bo)return r.RED;if(t===zo)return r.RED_INTEGER;if(t===Zi)return r.RG;if(t===Dc)return r.RG_INTEGER;if(t===Uc)return r.RGBA_INTEGER;if(t===Go||t===ko||t===Vo||t===Ho)if(s===qe){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===Go)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===ko)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Vo)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Ho)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===Go)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===ko)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Vo)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Ho)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Oc||t===Fc||t===Bc||t===zc){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===Oc)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Fc)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Bc)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===zc)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Gc||t===kc||t===Vc||t===Hc||t===Wc||t===Wo||t===Xc){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===Gc||t===kc)return s===qe?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===Vc)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(t===Hc)return i.COMPRESSED_R11_EAC;if(t===Wc)return i.COMPRESSED_SIGNED_R11_EAC;if(t===Wo)return i.COMPRESSED_RG11_EAC;if(t===Xc)return i.COMPRESSED_SIGNED_RG11_EAC}if(t===jc||t===qc||t===Yc||t===Kc||t===Zc||t===Jc||t===$c||t===Qc||t===eh||t===th||t===nh||t===ih||t===rh||t===sh){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===jc)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===qc)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Yc)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Kc)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Zc)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Jc)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===$c)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Qc)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===eh)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===th)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===nh)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===ih)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===rh)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===sh)return s===qe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===ah||t===oh||t===lh){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===ah)return s===qe?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===oh)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===lh)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===ch||t===hh||t===Xo||t===uh){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===ch)return i.COMPRESSED_RED_RGTC1_EXT;if(t===hh)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Xo)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===uh)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Vr?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var Lh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ts(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Zt({vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ht(new Lr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Nh=class extends yn{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,p=null,d=null,m=null,f=typeof XRWebGLBinding<"u",v=new Lh,g={},_=t.getContextAttributes(),y=null,S=null,E=[],M=[],P=new $,O=null,L=new gt;L.viewport=new Ze;let D=new gt;D.viewport=new Ze;let k=[L,D],F=new Co,K=null,H=null;function V(te){let ce=M.indexOf(te.inputSource);if(ce===-1)return;let oe=E[ce];oe!==void 0&&(oe.update(te.inputSource,te.frame,l||a),oe.dispatchEvent({type:te.type,data:te.inputSource}))}function q(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",W);for(let te=0;te<E.length;te++){let ce=M[te];ce!==null&&(M[te]=null,E[te].disconnect(ce))}K=null,H=null,v.reset();for(let te in g)delete g[te];e.setRenderTarget(y),d=null,p=null,u=null,i=null,S=null,ye.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}function W(te){for(let ce=0;ce<te.removed.length;ce++){let oe=te.removed[ce],fe=M.indexOf(oe);fe>=0&&(M[fe]=null,E[fe].disconnect(oe))}for(let ce=0;ce<te.added.length;ce++){let oe=te.added[ce],fe=M.indexOf(oe);if(fe===-1){for(let Q=0;Q<E.length;Q++){if(Q>=M.length){M.push(oe),fe=Q;break}if(M[Q]===null){M[Q]=oe,fe=Q;break}}if(fe===-1)break}let Ue=E[fe];Ue&&Ue.connect(oe)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let ce=E[te];return ce===void 0&&(ce=new Er,E[te]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(te){let ce=E[te];return ce===void 0&&(ce=new Er,E[te]=ce),ce.getGripSpace()},this.getHand=function(te){let ce=E[te];return ce===void 0&&(ce=new Er,E[te]=ce),ce.getHandSpace()},this.setFramebufferScaleFactor=function(te){s=te,n.isPresenting===!0&&ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,n.isPresenting===!0&&ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return u===null&&f&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(te){if(i=te,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",q),i.addEventListener("inputsourceschange",W),_.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(P),f&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,oe=null,fe=null;_.depth&&(fe=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=_.stencil?Ki:Pi,oe=_.stencil?Vr:di);let Ue={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:s};u=this.getBinding(),p=u.createProjectionLayer(Ue),i.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),S=new Yt(p.textureWidth,p.textureHeight,{format:on,type:Jt,depthTexture:new li(p.textureWidth,p.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{let ce={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,ce),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new Yt(d.framebufferWidth,d.framebufferHeight,{format:on,type:Jt,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),ye.setContext(i),ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};let ne=new T,de=new T;function Ae(te,ce){ce===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(ce.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(i===null)return;let ce=te.near,oe=te.far;v.texture!==null&&(v.depthNear>0&&(ce=v.depthNear),v.depthFar>0&&(oe=v.depthFar)),F.near=D.near=L.near=ce,F.far=D.far=L.far=oe,K===F.near&&H===F.far||(i.updateRenderState({depthNear:F.near,depthFar:F.far}),K=F.near,H=F.far),F.layers.mask=6|te.layers.mask,L.layers.mask=-5&F.layers.mask,D.layers.mask=-3&F.layers.mask;let fe=te.parent,Ue=F.cameras;Ae(F,fe);for(let Q=0;Q<Ue.length;Q++)Ae(Ue[Q],fe);Ue.length===2?(function(Q,C,b){ne.setFromMatrixPosition(C.matrixWorld),de.setFromMatrixPosition(b.matrixWorld);let R=ne.distanceTo(de),U=C.projectionMatrix.elements,x=b.projectionMatrix.elements,N=U[14]/(U[10]-1),I=U[14]/(U[10]+1),w=(U[9]+1)/U[5],G=(U[9]-1)/U[5],X=(U[8]-1)/U[0],Y=(x[8]+1)/x[0],re=N*X,xe=N*Y,Me=R/(-X+Y),he=Me*-X;if(C.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(he),Q.translateZ(Me),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),U[10]===-1)Q.projectionMatrix.copy(C.projectionMatrix),Q.projectionMatrixInverse.copy(C.projectionMatrixInverse);else{let Ce=N+Me,ee=I+Me,se=re-he,ie=xe+(R-he),pe=w*I/ee*Ce,Qe=G*I/ee*Ce;Q.projectionMatrix.makePerspective(se,ie,pe,Qe,Ce,ee),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}})(F,L,D):F.projectionMatrix.copy(L.projectionMatrix),(function(Q,C,b){b===null?Q.matrix.copy(C.matrixWorld):(Q.matrix.copy(b.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(C.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(C.projectionMatrix),Q.projectionMatrixInverse.copy(C.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=2*Hi*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)})(te,F,fe)},this.getCamera=function(){return F},this.getFoveation=function(){if(p!==null||d!==null)return c},this.setFoveation=function(te){c=te,p!==null&&(p.fixedFoveation=te),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=te)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(F)},this.getCameraTexture=function(te){return g[te]};let ve=null,ye=new zp;ye.setAnimationLoop(function(te,ce){if(h=ce.getViewerPose(l||a),m=ce,h!==null){let oe=h.views;d!==null&&(e.setRenderTargetFramebuffer(S,d.framebuffer),e.setRenderTarget(S));let fe=!1;oe.length!==F.cameras.length&&(F.cameras.length=0,fe=!0);for(let Q=0;Q<oe.length;Q++){let C=oe[Q],b=null;if(d!==null)b=d.getViewport(C);else{let U=u.getViewSubImage(p,C);b=U.viewport,Q===0&&(e.setRenderTargetTextures(S,U.colorTexture,U.depthStencilTexture),e.setRenderTarget(S))}let R=k[Q];R===void 0&&(R=new gt,R.layers.enable(Q),R.viewport=new Ze,k[Q]=R),R.matrix.fromArray(C.transform.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale),R.projectionMatrix.fromArray(C.projectionMatrix),R.projectionMatrixInverse.copy(R.projectionMatrix).invert(),R.viewport.set(b.x,b.y,b.width,b.height),Q===0&&(F.matrix.copy(R.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),fe===!0&&F.cameras.push(R)}let Ue=i.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&f){u=n.getBinding();let Q=u.getDepthInformation(oe[0]);Q&&Q.isValid&&Q.texture&&v.init(Q,i.renderState)}if(Ue&&Ue.includes("camera-access")&&f){e.state.unbindTexture(),u=n.getBinding();for(let Q=0;Q<oe.length;Q++){let C=oe[Q].camera;if(C){let b=g[C];b||(b=new Ts,g[C]=b);let R=u.getCameraImage(C);b.sourceTexture=R}}}}for(let oe=0;oe<E.length;oe++){let fe=M[oe],Ue=E[oe];fe!==null&&Ue!==void 0&&Ue.update(fe,ce,l||a)}ve&&ve(te,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),m=null}),this.setAnimationLoop=function(te){ve=te},this.dispose=function(){}}},kg=new Ee,Xp=new Ne;function Vg(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===Wt&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===Wt&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,c=a.envMapRotation;o&&(i.envMap.value=o,i.envMapRotation.value.setFromMatrix4(kg.makeRotationFromEuler(c)).transpose(),o.isCubeTexture&&o.isRenderTargetTexture===!1&&i.envMapRotation.value.premultiply(Xp),i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,gh(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,c){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(i,s):s.isMeshLambertMaterial?(n(i,s),s.envMap&&(i.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(i,s),(function(l,h){h.gradientMap&&(l.gradientMap.value=h.gradientMap)})(i,s)):s.isMeshPhongMaterial?(n(i,s),(function(l,h){l.specular.value.copy(h.specular),l.shininess.value=Math.max(h.shininess,1e-4)})(i,s),s.envMap&&(i.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(i,s),(function(l,h){l.metalness.value=h.metalness,h.metalnessMap&&(l.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,l.metalnessMapTransform)),l.roughness.value=h.roughness,h.roughnessMap&&(l.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,l.roughnessMapTransform)),h.envMap&&(l.envMapIntensity.value=h.envMapIntensity)})(i,s),s.isMeshPhysicalMaterial&&(function(l,h,u){l.ior.value=h.ior,h.sheen>0&&(l.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),l.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(l.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,l.sheenColorMapTransform)),h.sheenRoughnessMap&&(l.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,l.sheenRoughnessMapTransform))),h.clearcoat>0&&(l.clearcoat.value=h.clearcoat,l.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(l.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,l.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,l.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(l.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,l.clearcoatNormalMapTransform),l.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Wt&&l.clearcoatNormalScale.value.negate())),h.dispersion>0&&(l.dispersion.value=h.dispersion),h.iridescence>0&&(l.iridescence.value=h.iridescence,l.iridescenceIOR.value=h.iridescenceIOR,l.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(l.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,l.iridescenceMapTransform)),h.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,l.iridescenceThicknessMapTransform))),h.transmission>0&&(l.transmission.value=h.transmission,l.transmissionSamplerMap.value=u.texture,l.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(l.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,l.transmissionMapTransform)),l.thickness.value=h.thickness,h.thicknessMap&&(l.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,l.thicknessMapTransform)),l.attenuationDistance.value=h.attenuationDistance,l.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(l.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(l.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,l.anisotropyMapTransform))),l.specularIntensity.value=h.specularIntensity,l.specularColor.value.copy(h.specularColor),h.specularColorMap&&(l.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,l.specularColorMapTransform)),h.specularIntensityMap&&(l.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,l.specularIntensityMapTransform))})(i,s,c)):s.isMeshMatcapMaterial?(n(i,s),(function(l,h){h.matcap&&(l.matcap.value=h.matcap)})(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),(function(l,h){let u=e.get(h).light;l.referencePosition.value.setFromMatrixPosition(u.matrixWorld),l.nearDistance.value=u.shadow.camera.near,l.farDistance.value=u.shadow.camera.far})(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?((function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform))})(i,s),s.isLineDashedMaterial&&(function(l,h){l.dashSize.value=h.dashSize,l.totalSize.value=h.dashSize+h.gapSize,l.scale.value=h.scale})(i,s)):s.isPointsMaterial?(function(l,h,u,p){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.size.value=h.size*u,l.scale.value=.5*p,h.map&&(l.map.value=h.map,t(h.map,l.uvTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s,a,o):s.isSpriteMaterial?(function(l,h){l.diffuse.value.copy(h.color),l.opacity.value=h.opacity,l.rotation.value=h.rotation,h.map&&(l.map.value=h.map,t(h.map,l.mapTransform)),h.alphaMap&&(l.alphaMap.value=h.alphaMap,t(h.alphaMap,l.alphaMapTransform)),h.alphaTest>0&&(l.alphaTest.value=h.alphaTest)})(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function Hg(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(p,d,m,f){if((function(v,g,_,y){let S=v.value,E=g+"_"+_;if(y[E]===void 0)return typeof S=="number"||typeof S=="boolean"?y[E]=S:ArrayBuffer.isView(S)?y[E]=S.slice():y[E]=S.clone(),!0;{let M=y[E];if(typeof S=="number"||typeof S=="boolean"){if(M!==S)return y[E]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(M.equals(S)===!1)return M.copy(S),!0}}return!1})(p,d,m,f)===!0){let v=p.__offset,g=p.value;if(Array.isArray(g)){let _=0;for(let y=0;y<g.length;y++){let S=g[y],E=h(S);l(S,p.__data,_),typeof S=="number"||typeof S=="boolean"||S.isMatrix3||ArrayBuffer.isView(S)||(_+=E.storage/Float32Array.BYTES_PER_ELEMENT)}}else l(g,p.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,v,p.__data)}}function l(p,d,m){typeof p=="number"||typeof p=="boolean"?d[0]=p:p.isMatrix3?(d[0]=p.elements[0],d[1]=p.elements[1],d[2]=p.elements[2],d[3]=0,d[4]=p.elements[3],d[5]=p.elements[4],d[6]=p.elements[5],d[7]=0,d[8]=p.elements[6],d[9]=p.elements[7],d[10]=p.elements[8],d[11]=0):ArrayBuffer.isView(p)?d.set(new p.constructor(p.buffer,p.byteOffset,d.length)):p.toArray(d,m)}function h(p){let d={boundary:0,storage:0};return typeof p=="number"||typeof p=="boolean"?(d.boundary=4,d.storage=4):p.isVector2?(d.boundary=8,d.storage=8):p.isVector3||p.isColor?(d.boundary=16,d.storage=12):p.isVector4?(d.boundary=16,d.storage=16):p.isMatrix3?(d.boundary=48,d.storage=48):p.isMatrix4?(d.boundary=64,d.storage=64):p.isTexture?ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(p)?(d.boundary=16,d.storage=p.byteLength):ge("WebGLRenderer: Unsupported uniform value type.",p),d}function u(p){let d=p.target;d.removeEventListener("dispose",u);let m=a.indexOf(d.__bindingPointIndex);a.splice(m,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(p,d){let m=d.program;n.uniformBlockBinding(p,m)},update:function(p,d){let m=i[p.id];m===void 0&&((function(g){let _=g.uniforms,y=0,S=16;for(let M=0,P=_.length;M<P;M++){let O=Array.isArray(_[M])?_[M]:[_[M]];for(let L=0,D=O.length;L<D;L++){let k=O[L],F=Array.isArray(k.value)?k.value:[k.value];for(let K=0,H=F.length;K<H;K++){let V=h(F[K]),q=y%S,W=q%V.boundary,ne=q+W;y+=W,ne!==0&&S-ne<V.storage&&(y+=S-ne),k.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=V.storage}}}let E=y%S;E>0&&(y+=S-E),g.__size=y,g.__cache={}})(p),m=(function(g){let _=(function(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return we("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();g.__bindingPointIndex=_;let y=r.createBuffer(),S=g.__size,E=g.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,S,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,_,y),y})(p),i[p.id]=m,p.addEventListener("dispose",u));let f=d.program;n.updateUBOMapping(p,f);let v=e.render.frame;s[p.id]!==v&&((function(g){let _=i[g.id],y=g.uniforms,S=g.__cache;r.bindBuffer(r.UNIFORM_BUFFER,_);for(let E=0,M=y.length;E<M;E++){let P=y[E];if(Array.isArray(P))for(let O=0,L=P.length;O<L;O++)c(P[O],E,O,S);else c(P,E,0,S)}r.bindBuffer(r.UNIFORM_BUFFER,null)})(p),s[p.id]=v)},dispose:function(){for(let p in i)r.deleteBuffer(i[p]);a=[],i={},s={}}}}Xp.set(-1,0,0,0,1,0,0,0,1);var Wg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),kn=null,Qo=class{constructor(e={}){let{canvas:t=op(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1,outputBufferType:d=Jt}=e,m;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let f=d,v=new Set([Uc,Dc,zo]),g=new Set([Jt,di,kr,Vr,Oo,Fo]),_=new Uint32Array(4),y=new Int32Array(4),S=new T,E=null,M=null,P=[],O=[],L=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,k=!1,F=null,K=null,H=null,V=null;this._outputColorSpace=lt;let q=0,W=0,ne=null,de=-1,Ae=null,ve=new Ze,ye=new Ze,te=null,ce=new _e(0),oe=0,fe=t.width,Ue=t.height,Q=1,C=null,b=null,R=new Ze(0,0,fe,Ue),U=new Ze(0,0,fe,Ue),x=!1,N=new si,I=!1,w=!1,G=new Ee,X=new T,Y=new Ze,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},xe=!1;function Me(){return ne===null?Q:1}let he,Ce,ee,se,ie,pe,Qe,je,ot,Ut,Te,Ye,Be,Rt,et,yt,at,en,un,Li,En,pi,ra,B=n;function vu(A,z){return t.getContext(A,z)}try{let A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",xu,!1),t.addEventListener("webglcontextrestored",Mu,!1),t.addEventListener("webglcontextcreationerror",Su,!1),B===null){let z="webgl2";if(B=vu(z,A),B===null)throw vu(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw we("WebGLRenderer: "+A.message),A}function yu(){he=new _m(B),he.init(),En=new Gg(B,he),Ce=new pm(B,he,e,En),ee=new Bg(B,he),Ce.reversedDepthBuffer&&p&&ee.buffers.depth.setReversed(!0),K=B.createFramebuffer(),H=B.createFramebuffer(),V=B.createFramebuffer(),se=new xm(B),ie=new wg,pe=new zg(B,he,ee,ie,Ce,En,se),Qe=new gm(D),je=new lm(B),pi=new um(B,je),ot=new vm(B,je,se,pi),Ut=new Sm(B,ot,je,pi,se),en=new Mm(B,Ce,pe),et=new fm(ie),Te=new Ag(D,Qe,he,Ce,pi,et),Ye=new Vg(D,ie),Be=new Cg,Rt=new Dg(he),at=new hm(D,Qe,ee,Ut,m,c),yt=new Fg(D,Ut,Ce),ra=new Hg(B,se,Ce,ee),un=new dm(B,he,se),Li=new ym(B,he,se),se.programs=Te.programs,D.capabilities=Ce,D.extensions=he,D.properties=ie,D.renderLists=Be,D.shadowMap=yt,D.state=ee,D.info=se}yu(),f!==Jt&&(L=new Tm(f,t.width,t.height,o,i,s));let dt=new Nh(D,B);function xu(A){A.preventDefault(),ds("WebGLRenderer: Context Lost."),k=!0}function Mu(){ds("WebGLRenderer: Context Restored."),k=!1;let A=se.autoReset,z=yt.enabled,j=yt.autoUpdate,J=yt.needsUpdate,Z=yt.type;yu(),se.autoReset=A,yt.enabled=z,yt.autoUpdate=j,yt.needsUpdate=J,yt.type=Z}function Su(A){we("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function bu(A){let z=A.target;z.removeEventListener("dispose",bu),(function(j){(function(J){let Z=ie.get(J).programs;Z!==void 0&&(Z.forEach(function(ae){Te.releaseProgram(ae)}),J.isShaderMaterial&&Te.releaseShaderCache(J))})(j),ie.remove(j)})(z)}function Tu(A,z,j){A.transparent===!0&&A.side===an&&A.forceSinglePass===!1?(A.side=Wt,A.needsUpdate=!0,aa(A,z,j),A.side=Ci,A.needsUpdate=!0,aa(A,z,j),A.side=an):aa(A,z,j)}this.xr=dt,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let A=he.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=he.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(A){A!==void 0&&(Q=A,this.setSize(fe,Ue,!1))},this.getSize=function(A){return A.set(fe,Ue)},this.setSize=function(A,z,j=!0){dt.isPresenting?ge("WebGLRenderer: Can't change size while VR device is presenting."):(fe=A,Ue=z,t.width=Math.floor(A*Q),t.height=Math.floor(z*Q),j===!0&&(t.style.width=A+"px",t.style.height=z+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,A,z))},this.getDrawingBufferSize=function(A){return A.set(fe*Q,Ue*Q).floor()},this.setDrawingBufferSize=function(A,z,j){fe=A,Ue=z,Q=j,t.width=Math.floor(A*j),t.height=Math.floor(z*j),this.setViewport(0,0,A,z)},this.setEffects=function(A){if(f!==Jt){if(A){for(let z=0;z<A.length;z++)if(A[z].isOutputPass===!0){ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(A||[])}else we("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(A){return A.copy(ve)},this.getViewport=function(A){return A.copy(R)},this.setViewport=function(A,z,j,J){A.isVector4?R.set(A.x,A.y,A.z,A.w):R.set(A,z,j,J),ee.viewport(ve.copy(R).multiplyScalar(Q).round())},this.getScissor=function(A){return A.copy(U)},this.setScissor=function(A,z,j,J){A.isVector4?U.set(A.x,A.y,A.z,A.w):U.set(A,z,j,J),ee.scissor(ye.copy(U).multiplyScalar(Q).round())},this.getScissorTest=function(){return x},this.setScissorTest=function(A){ee.setScissorTest(x=A)},this.setOpaqueSort=function(A){C=A},this.setTransparentSort=function(A){b=A},this.getClearColor=function(A){return A.copy(at.getClearColor())},this.setClearColor=function(){at.setClearColor(...arguments)},this.getClearAlpha=function(){return at.getClearAlpha()},this.setClearAlpha=function(){at.setClearAlpha(...arguments)},this.clear=function(A=!0,z=!0,j=!0){let J=0;if(A){let Z=!1;if(ne!==null){let ae=ne.texture.format;Z=v.has(ae)}if(Z){let ae=ne.texture.type,ue=g.has(ae),me=at.getClearColor(),Se=at.getClearAlpha(),Pe=me.r,He=me.g,We=me.b;ue?(_[0]=Pe,_[1]=He,_[2]=We,_[3]=Se,B.clearBufferuiv(B.COLOR,0,_)):(y[0]=Pe,y[1]=He,y[2]=We,y[3]=Se,B.clearBufferiv(B.COLOR,0,y))}else J|=B.COLOR_BUFFER_BIT}z&&(J|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(J|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&B.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),F=A},this.dispose=function(){t.removeEventListener("webglcontextlost",xu,!1),t.removeEventListener("webglcontextrestored",Mu,!1),t.removeEventListener("webglcontextcreationerror",Su,!1),at.dispose(),Be.dispose(),Rt.dispose(),ie.dispose(),Qe.dispose(),Ut.dispose(),pi.dispose(),ra.dispose(),Te.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",Eu),dt.removeEventListener("sessionend",Au),Ni.stop()},this.renderBufferDirect=function(A,z,j,J,Z,ae){z===null&&(z=re);let ue=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,me=(function(Ve,it,Ct,Ie,De){it.isScene!==!0&&(it=re),pe.resetTextureUnits();let dn=it.fog,dl=Ie.isMeshStandardMaterial||Ie.isMeshLambertMaterial||Ie.isMeshPhongMaterial?it.environment:null,oa=ne===null?D.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ze.workingColorSpace,$r=Ie.isMeshStandardMaterial||Ie.isMeshLambertMaterial&&!Ie.envMap||Ie.isMeshPhongMaterial&&!Ie.envMap,An=Qe.get(Ie.envMap||dl,$r),tr=Ie.vertexColors===!0&&!!Ct.attributes.color&&Ct.attributes.color.itemSize===4,jn=!!Ct.attributes.tangent&&(!!Ie.normalMap||Ie.anisotropy>0),pl=!!Ct.morphAttributes.position,nr=!!Ct.morphAttributes.normal,gf=!!Ct.morphAttributes.color,Lu=bn;Ie.toneMapped&&(ne!==null&&ne.isXRRenderTarget!==!0||(Lu=D.toneMapping));let Nu=Ct.morphAttributes.position||Ct.morphAttributes.normal||Ct.morphAttributes.color,_f=Nu!==void 0?Nu.length:0,Le=ie.get(Ie),Di=M.state.lights;if(I===!0&&(w===!0||Ve!==Ae)){let ft=Ve===Ae&&Ie.id===de;et.setState(Ie,Ve,ft)}let pn=!1;Ie.version===Le.__version?Le.needsLights&&Le.lightsStateVersion!==Di.state.version||Le.outputColorSpace!==oa||De.isBatchedMesh&&Le.batching===!1?pn=!0:De.isBatchedMesh||Le.batching!==!0?De.isBatchedMesh&&Le.batchingColor===!0&&De.colorTexture===null||De.isBatchedMesh&&Le.batchingColor===!1&&De.colorTexture!==null||De.isInstancedMesh&&Le.instancing===!1?pn=!0:De.isInstancedMesh||Le.instancing!==!0?De.isSkinnedMesh&&Le.skinning===!1?pn=!0:De.isSkinnedMesh||Le.skinning!==!0?De.isInstancedMesh&&Le.instancingColor===!0&&De.instanceColor===null||De.isInstancedMesh&&Le.instancingColor===!1&&De.instanceColor!==null||De.isInstancedMesh&&Le.instancingMorph===!0&&De.morphTexture===null||De.isInstancedMesh&&Le.instancingMorph===!1&&De.morphTexture!==null||Le.envMap!==An||Ie.fog===!0&&Le.fog!==dn?pn=!0:Le.numClippingPlanes===void 0||Le.numClippingPlanes===et.numPlanes&&Le.numIntersection===et.numIntersection?(Le.vertexAlphas!==tr||Le.vertexTangents!==jn||Le.morphTargets!==pl||Le.morphNormals!==nr||Le.morphColors!==gf||Le.toneMapping!==Lu||Le.morphTargetsCount!==_f||!!Le.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(pn=!0):pn=!0:pn=!0:pn=!0:pn=!0:(pn=!0,Le.__version=Ie.version);let fi=Le.currentProgram;pn===!0&&(fi=aa(Ie,it,De),F&&Ie.isNodeMaterial&&F.onUpdateProgram(Ie,fi,Le));let Du=!1,ir=!1,fl=!1,rt=fi.getUniforms(),tn=Le.uniforms;if(ee.useProgram(fi.program)&&(Du=!0,ir=!0,fl=!0),Ie.id!==de&&(de=Ie.id,ir=!0),Le.needsLights){let ft=(function(Rn,gl){if(Rn.length===0)return null;if(Rn.length===1)return Rn[0].texture!==null?Rn[0]:null;S.setFromMatrixPosition(gl.matrixWorld);for(let rr=0,vf=Rn.length;rr<vf;rr++){let _l=Rn[rr];if(_l.texture!==null&&_l.boundingBox.containsPoint(S))return _l}return null})(M.state.lightProbeGridArray,De);Le.lightProbeGrid!==ft&&(Le.lightProbeGrid=ft,ir=!0)}if(Du||Ae!==Ve){ee.buffers.depth.getReversed()&&Ve.reversedDepth!==!0&&(Ve._reversedDepth=!0,Ve.updateProjectionMatrix()),rt.setValue(B,"projectionMatrix",Ve.projectionMatrix),rt.setValue(B,"viewMatrix",Ve.matrixWorldInverse);let ft=rt.map.cameraPosition;ft!==void 0&&ft.setValue(B,X.setFromMatrixPosition(Ve.matrixWorld)),Ce.logarithmicDepthBuffer&&rt.setValue(B,"logDepthBufFC",2/(Math.log(Ve.far+1)/Math.LN2)),(Ie.isMeshPhongMaterial||Ie.isMeshToonMaterial||Ie.isMeshLambertMaterial||Ie.isMeshBasicMaterial||Ie.isMeshStandardMaterial||Ie.isShaderMaterial)&&rt.setValue(B,"isOrthographic",Ve.isOrthographicCamera===!0),Ae!==Ve&&(Ae=Ve,ir=!0,fl=!0)}if(Le.needsLights&&(Di.state.directionalShadowMap.length>0&&rt.setValue(B,"directionalShadowMap",Di.state.directionalShadowMap,pe),Di.state.spotShadowMap.length>0&&rt.setValue(B,"spotShadowMap",Di.state.spotShadowMap,pe),Di.state.pointShadowMap.length>0&&rt.setValue(B,"pointShadowMap",Di.state.pointShadowMap,pe)),De.isSkinnedMesh){rt.setOptional(B,De,"bindMatrix"),rt.setOptional(B,De,"bindMatrixInverse");let ft=De.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),rt.setValue(B,"boneTexture",ft.boneTexture,pe))}De.isBatchedMesh&&(rt.setOptional(B,De,"batchingTexture"),rt.setValue(B,"batchingTexture",De._matricesTexture,pe),rt.setOptional(B,De,"batchingIdTexture"),rt.setValue(B,"batchingIdTexture",De._indirectTexture,pe),rt.setOptional(B,De,"batchingColorTexture"),De._colorsTexture!==null&&rt.setValue(B,"batchingColorTexture",De._colorsTexture,pe));let ml=Ct.morphAttributes;if(ml.position===void 0&&ml.normal===void 0&&ml.color===void 0||en.update(De,Ct,fi),(ir||Le.receiveShadow!==De.receiveShadow)&&(Le.receiveShadow=De.receiveShadow,rt.setValue(B,"receiveShadow",De.receiveShadow)),(Ie.isMeshStandardMaterial||Ie.isMeshLambertMaterial||Ie.isMeshPhongMaterial)&&Ie.envMap===null&&it.environment!==null&&(tn.envMapIntensity.value=it.environmentIntensity),tn.dfgLUT!==void 0&&(tn.dfgLUT.value=(kn===null&&(kn=new Cr(Wg,16,16,Zi,Gn),kn.name="DFG_LUT",kn.minFilter=vt,kn.magFilter=vt,kn.wrapS=Ln,kn.wrapT=Ln,kn.generateMipmaps=!1,kn.needsUpdate=!0),kn)),ir){if(rt.setValue(B,"toneMappingExposure",D.toneMappingExposure),Le.needsLights&&(fn=fl,(wn=tn).ambientLightColor.needsUpdate=fn,wn.lightProbe.needsUpdate=fn,wn.directionalLights.needsUpdate=fn,wn.directionalLightShadows.needsUpdate=fn,wn.pointLights.needsUpdate=fn,wn.pointLightShadows.needsUpdate=fn,wn.spotLights.needsUpdate=fn,wn.spotLightShadows.needsUpdate=fn,wn.rectAreaLights.needsUpdate=fn,wn.hemisphereLights.needsUpdate=fn),dn&&Ie.fog===!0&&Ye.refreshFogUniforms(tn,dn),Ye.refreshMaterialUniforms(tn,Ie,Q,Ue,M.state.transmissionRenderTarget[Ve.id]),Le.needsLights&&Le.lightProbeGrid){let ft=Le.lightProbeGrid;tn.probesSH.value=ft.texture,tn.probesMin.value.copy(ft.boundingBox.min),tn.probesMax.value.copy(ft.boundingBox.max),tn.probesResolution.value.copy(ft.resolution)}Xr.upload(B,Pu(Le),tn,pe)}var wn,fn;if(Ie.isShaderMaterial&&Ie.uniformsNeedUpdate===!0&&(Xr.upload(B,Pu(Le),tn,pe),Ie.uniformsNeedUpdate=!1),Ie.isSpriteMaterial&&rt.setValue(B,"center",De.center),rt.setValue(B,"modelViewMatrix",De.modelViewMatrix),rt.setValue(B,"normalMatrix",De.normalMatrix),rt.setValue(B,"modelMatrix",De.matrixWorld),Ie.uniformsGroups!==void 0){let ft=Ie.uniformsGroups;for(let Rn=0,gl=ft.length;Rn<gl;Rn++){let rr=ft[Rn];ra.update(rr,fi),ra.bind(rr,fi)}}return fi})(A,z,j,J,Z);ee.setMaterial(J,ue);let Se=j.index,Pe=1;if(J.wireframe===!0){if(Se=ot.getWireframeAttribute(j),Se===void 0)return;Pe=2}let He=j.drawRange,We=j.attributes.position,Re=He.start*Pe,Xe=(He.start+He.count)*Pe;ae!==null&&(Re=Math.max(Re,ae.start*Pe),Xe=Math.min(Xe,(ae.start+ae.count)*Pe)),Se!==null?(Re=Math.max(Re,0),Xe=Math.min(Xe,Se.count)):We!=null&&(Re=Math.max(Re,0),Xe=Math.min(Xe,We.count));let xt=Xe-Re;if(xt<0||xt===1/0)return;let pt;pi.setup(Z,J,me,j,Se);let nt=un;if(Se!==null&&(pt=je.get(Se),nt=Li,nt.setIndex(pt)),Z.isMesh)J.wireframe===!0?(ee.setLineWidth(J.wireframeLinewidth*Me()),nt.setMode(B.LINES)):nt.setMode(B.TRIANGLES);else if(Z.isLine){let Ve=J.linewidth;Ve===void 0&&(Ve=1),ee.setLineWidth(Ve*Me()),Z.isLineSegments?nt.setMode(B.LINES):Z.isLineLoop?nt.setMode(B.LINE_LOOP):nt.setMode(B.LINE_STRIP)}else Z.isPoints?nt.setMode(B.POINTS):Z.isSprite&&nt.setMode(B.TRIANGLES);if(Z.isBatchedMesh)if(he.get("WEBGL_multi_draw"))nt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let Ve=Z._multiDrawStarts,it=Z._multiDrawCounts,Ct=Z._multiDrawCount,Ie=Se?je.get(Se).bytesPerElement:1,De=ie.get(J).currentProgram.getUniforms();for(let dn=0;dn<Ct;dn++)De.setValue(B,"_gl_DrawID",dn),nt.render(Ve[dn]/Ie,it[dn])}else if(Z.isInstancedMesh)nt.renderInstances(Re,xt,Z.count);else if(j.isInstancedBufferGeometry){let Ve=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,it=Math.min(j.instanceCount,Ve);nt.renderInstances(Re,xt,it)}else nt.render(Re,xt)},this.compile=function(A,z,j=null){j===null&&(j=A),M=Rt.get(j),M.init(z),O.push(M),j.traverseVisible(function(Z){Z.isLight&&Z.layers.test(z.layers)&&(M.pushLight(Z),Z.castShadow&&M.pushShadow(Z))}),A!==j&&A.traverseVisible(function(Z){Z.isLight&&Z.layers.test(z.layers)&&(M.pushLight(Z),Z.castShadow&&M.pushShadow(Z))}),M.setupLights();let J=new Set;return A.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let ae=Z.material;if(ae)if(Array.isArray(ae))for(let ue=0;ue<ae.length;ue++){let me=ae[ue];Tu(me,j,Z),J.add(me)}else Tu(ae,j,Z),J.add(ae)}),M=O.pop(),J},this.compileAsync=function(A,z,j=null){let J=this.compile(A,z,j);return new Promise(Z=>{function ae(){J.forEach(function(ue){ie.get(ue).currentProgram.isReady()&&J.delete(ue)}),J.size!==0?setTimeout(ae,10):Z(A)}he.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let hl=null;function Eu(){Ni.stop()}function Au(){Ni.start()}let Ni=new zp;function ul(A,z,j,J){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)j=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLightProbeGrid)M.pushLightProbeGrid(A);else if(A.isLight)M.pushLight(A),A.castShadow&&M.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||N.intersectsSprite(A)){J&&Y.setFromMatrixPosition(A.matrixWorld).applyMatrix4(G);let ae=Ut.update(A),ue=A.material;ue.visible&&E.push(A,ae,ue,j,Y.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||N.intersectsObject(A))){let ae=Ut.update(A),ue=A.material;if(J&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Y.copy(A.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),Y.copy(ae.boundingSphere.center)),Y.applyMatrix4(A.matrixWorld).applyMatrix4(G)),Array.isArray(ue)){let me=ae.groups;for(let Se=0,Pe=me.length;Se<Pe;Se++){let He=me[Se],We=ue[He.materialIndex];We&&We.visible&&E.push(A,ae,We,j,Y.z,He)}}else ue.visible&&E.push(A,ae,ue,j,Y.z,null)}}let Z=A.children;for(let ae=0,ue=Z.length;ae<ue;ae++)ul(Z[ae],z,j,J)}function wu(A,z,j,J){let{opaque:Z,transmissive:ae,transparent:ue}=A;M.setupLightsView(j),I===!0&&et.setGlobalState(D.clippingPlanes,j),J&&ee.viewport(ve.copy(J)),Z.length>0&&sa(Z,z,j),ae.length>0&&sa(ae,z,j),ue.length>0&&sa(ue,z,j),ee.buffers.depth.setTest(!0),ee.buffers.depth.setMask(!0),ee.buffers.color.setMask(!0),ee.setPolygonOffset(!1)}function Ru(A,z,j,J){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[J.id]===void 0){let We=he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[J.id]=new Yt(1,1,{generateMipmaps:!0,type:We?Gn:Jt,minFilter:zn,samples:Math.max(4,Ce.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ze.workingColorSpace})}let Z=M.state.transmissionRenderTarget[J.id],ae=J.viewport||ve;Z.setSize(ae.z*D.transmissionResolutionScale,ae.w*D.transmissionResolutionScale);let ue=D.getRenderTarget(),me=D.getActiveCubeFace(),Se=D.getActiveMipmapLevel();D.setRenderTarget(Z),D.getClearColor(ce),oe=D.getClearAlpha(),oe<1&&D.setClearColor(16777215,.5),D.clear(),xe&&at.render(j);let Pe=D.toneMapping;D.toneMapping=bn;let He=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),M.setupLightsView(J),I===!0&&et.setGlobalState(D.clippingPlanes,J),sa(A,j,J),pe.updateMultisampleRenderTarget(Z),pe.updateRenderTargetMipmap(Z),he.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Re=0,Xe=z.length;Re<Xe;Re++){let xt=z[Re],{object:pt,geometry:nt,material:Ve,group:it}=xt;if(Ve.side===an&&pt.layers.test(J.layers)){let Ct=Ve.side;Ve.side=Wt,Ve.needsUpdate=!0,Cu(pt,j,J,nt,Ve,it),Ve.side=Ct,Ve.needsUpdate=!0,We=!0}}We===!0&&(pe.updateMultisampleRenderTarget(Z),pe.updateRenderTargetMipmap(Z))}D.setRenderTarget(ue,me,Se),D.setClearColor(ce,oe),He!==void 0&&(J.viewport=He),D.toneMapping=Pe}function sa(A,z,j){let J=z.isScene===!0?z.overrideMaterial:null;for(let Z=0,ae=A.length;Z<ae;Z++){let ue=A[Z],{object:me,geometry:Se,group:Pe}=ue,He=ue.material;He.allowOverride===!0&&J!==null&&(He=J),me.layers.test(j.layers)&&Cu(me,z,j,Se,He,Pe)}}function Cu(A,z,j,J,Z,ae){A.onBeforeRender(D,z,j,J,Z,ae),A.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Z.onBeforeRender(D,z,j,J,A,ae),Z.transparent===!0&&Z.side===an&&Z.forceSinglePass===!1?(Z.side=Wt,Z.needsUpdate=!0,D.renderBufferDirect(j,z,J,Z,A,ae),Z.side=Ci,Z.needsUpdate=!0,D.renderBufferDirect(j,z,J,Z,A,ae),Z.side=an):D.renderBufferDirect(j,z,J,Z,A,ae),A.onAfterRender(D,z,j,J,Z,ae)}function aa(A,z,j){z.isScene!==!0&&(z=re);let J=ie.get(A),Z=M.state.lights,ae=M.state.shadowsArray,ue=Z.state.version,me=Te.getParameters(A,Z.state,ae,z,j,M.state.lightProbeGridArray),Se=Te.getProgramCacheKey(me),Pe=J.programs;J.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?z.environment:null,J.fog=z.fog;let He=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;J.envMap=Qe.get(A.envMap||J.environment,He),J.envMapRotation=J.environment!==null&&A.envMap===null?z.environmentRotation:A.envMapRotation,Pe===void 0&&(A.addEventListener("dispose",bu),Pe=new Map,J.programs=Pe);let We=Pe.get(Se);if(We!==void 0){if(J.currentProgram===We&&J.lightsStateVersion===ue)return Iu(A,me),We}else me.uniforms=Te.getUniforms(A),F!==null&&A.isNodeMaterial&&F.build(A,j,me),A.onBeforeCompile(me,D),We=Te.acquireProgram(me,Se),Pe.set(Se,We),J.uniforms=me.uniforms;let Re=J.uniforms;return(A.isShaderMaterial||A.isRawShaderMaterial)&&A.clipping!==!0||(Re.clippingPlanes=et.uniform),Iu(A,me),J.needsLights=(function(Xe){return Xe.isMeshLambertMaterial||Xe.isMeshToonMaterial||Xe.isMeshPhongMaterial||Xe.isMeshStandardMaterial||Xe.isShadowMaterial||Xe.isShaderMaterial&&Xe.lights===!0})(A),J.lightsStateVersion=ue,J.needsLights&&(Re.ambientLightColor.value=Z.state.ambient,Re.lightProbe.value=Z.state.probe,Re.directionalLights.value=Z.state.directional,Re.directionalLightShadows.value=Z.state.directionalShadow,Re.spotLights.value=Z.state.spot,Re.spotLightShadows.value=Z.state.spotShadow,Re.rectAreaLights.value=Z.state.rectArea,Re.ltc_1.value=Z.state.rectAreaLTC1,Re.ltc_2.value=Z.state.rectAreaLTC2,Re.pointLights.value=Z.state.point,Re.pointLightShadows.value=Z.state.pointShadow,Re.hemisphereLights.value=Z.state.hemi,Re.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Re.spotLightMatrix.value=Z.state.spotLightMatrix,Re.spotLightMap.value=Z.state.spotLightMap,Re.pointShadowMatrix.value=Z.state.pointShadowMatrix),J.lightProbeGrid=M.state.lightProbeGridArray.length>0,J.currentProgram=We,J.uniformsList=null,We}function Pu(A){if(A.uniformsList===null){let z=A.currentProgram.getUniforms();A.uniformsList=Xr.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function Iu(A,z){let j=ie.get(A);j.outputColorSpace=z.outputColorSpace,j.batching=z.batching,j.batchingColor=z.batchingColor,j.instancing=z.instancing,j.instancingColor=z.instancingColor,j.instancingMorph=z.instancingMorph,j.skinning=z.skinning,j.morphTargets=z.morphTargets,j.morphNormals=z.morphNormals,j.morphColors=z.morphColors,j.morphTargetsCount=z.morphTargetsCount,j.numClippingPlanes=z.numClippingPlanes,j.numIntersection=z.numClipIntersection,j.vertexAlphas=z.vertexAlphas,j.vertexTangents=z.vertexTangents,j.toneMapping=z.toneMapping}Ni.setAnimationLoop(function(A){hl&&hl(A)}),typeof self<"u"&&Ni.setContext(self),this.setAnimationLoop=function(A){hl=A,dt.setAnimationLoop(A),A===null?Ni.stop():Ni.start()},dt.addEventListener("sessionstart",Eu),dt.addEventListener("sessionend",Au),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0)return void we("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(k===!0)return;F!==null&&F.renderStart(A,z);let j=dt.enabled===!0&&dt.isPresenting===!0,J=L!==null&&(ne===null||j)&&L.begin(D,ne);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),dt.enabled!==!0||dt.isPresenting!==!0||L!==null&&L.isCompositing()!==!1||(dt.cameraAutoUpdate===!0&&dt.updateCamera(z),z=dt.getCamera()),A.isScene===!0&&A.onBeforeRender(D,A,z,ne),M=Rt.get(A,O.length),M.init(z),M.state.textureUnits=pe.getTextureUnits(),O.push(M),G.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),N.setFromProjectionMatrix(G,ii,z.reversedDepth),w=this.localClippingEnabled,I=et.init(this.clippingPlanes,w),E=Be.get(A,P.length),E.init(),P.push(E),dt.enabled===!0&&dt.isPresenting===!0){let ae=D.xr.getDepthSensingMesh();ae!==null&&ul(ae,z,-1/0,D.sortObjects)}ul(A,z,0,D.sortObjects),E.finish(),D.sortObjects===!0&&E.sort(C,b,z.reversedDepth),xe=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,xe&&at.addToRenderList(E,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),I===!0&&et.beginShadows();let Z=M.state.shadowsArray;if(yt.render(Z,A,z),I===!0&&et.endShadows(),(J&&L.hasRenderPass())===!1){let ae=E.opaque,ue=E.transmissive;if(M.setupLights(),z.isArrayCamera){let me=z.cameras;if(ue.length>0)for(let Se=0,Pe=me.length;Se<Pe;Se++)Ru(ae,ue,A,me[Se]);xe&&at.render(A);for(let Se=0,Pe=me.length;Se<Pe;Se++){let He=me[Se];wu(E,A,He,He.viewport)}}else ue.length>0&&Ru(ae,ue,A,z),xe&&at.render(A),wu(E,A,z)}ne!==null&&W===0&&(pe.updateMultisampleRenderTarget(ne),pe.updateRenderTargetMipmap(ne)),J&&L.end(D),A.isScene===!0&&A.onAfterRender(D,A,z),pi.resetDefaultState(),de=-1,Ae=null,O.pop(),O.length>0?(M=O[O.length-1],pe.setTextureUnits(M.state.textureUnits),I===!0&&et.setGlobalState(D.clippingPlanes,M.state.camera)):M=null,P.pop(),E=P.length>0?P[P.length-1]:null,F!==null&&F.renderEnd()},this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(A,z,j){let J=ie.get(A);J.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),ie.get(A.texture).__webglTexture=z,ie.get(A.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:j,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,z){let j=ie.get(A);j.__webglFramebuffer=z,j.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(A,z=0,j=0){ne=A,q=z,W=j;let J=null,Z=!1,ae=!1;if(A){let ue=ie.get(A);if(ue.__useDefaultFramebuffer!==void 0)return ee.bindFramebuffer(B.FRAMEBUFFER,ue.__webglFramebuffer),ve.copy(A.viewport),ye.copy(A.scissor),te=A.scissorTest,ee.viewport(ve),ee.scissor(ye),ee.setScissorTest(te),void(de=-1);if(ue.__webglFramebuffer===void 0)pe.setupRenderTarget(A);else if(ue.__hasExternalTextures)pe.rebindTextures(A,ie.get(A.texture).__webglTexture,ie.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Pe=A.depthTexture;if(ue.__boundDepthTexture!==Pe){if(Pe!==null&&ie.has(Pe)&&(A.width!==Pe.image.width||A.height!==Pe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");pe.setupDepthRenderbuffer(A)}}let me=A.texture;(me.isData3DTexture||me.isDataArrayTexture||me.isCompressedArrayTexture)&&(ae=!0);let Se=ie.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(J=Array.isArray(Se[z])?Se[z][j]:Se[z],Z=!0):J=A.samples>0&&pe.useMultisampledRTT(A)===!1?ie.get(A).__webglMultisampledFramebuffer:Array.isArray(Se)?Se[j]:Se,ve.copy(A.viewport),ye.copy(A.scissor),te=A.scissorTest}else ve.copy(R).multiplyScalar(Q).floor(),ye.copy(U).multiplyScalar(Q).floor(),te=x;if(j!==0&&(J=K),ee.bindFramebuffer(B.FRAMEBUFFER,J)&&ee.drawBuffers(A,J),ee.viewport(ve),ee.scissor(ye),ee.setScissorTest(te),Z){let ue=ie.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+z,ue.__webglTexture,j)}else if(ae){let ue=z;for(let me=0;me<A.textures.length;me++){let Se=ie.get(A.textures[me]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+me,Se.__webglTexture,j,ue)}}else if(A!==null&&j!==0){let ue=ie.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ue.__webglTexture,j)}de=-1},this.readRenderTargetPixels=function(A,z,j,J,Z,ae,ue,me=0){if(!A||!A.isWebGLRenderTarget)return void we("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=ie.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ue!==void 0&&(Se=Se[ue]),Se){ee.bindFramebuffer(B.FRAMEBUFFER,Se);try{let Pe=A.textures[me],He=Pe.format,We=Pe.type;if(A.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+me),!Ce.textureFormatReadable(He))return void we("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(We))return void we("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");z>=0&&z<=A.width-J&&j>=0&&j<=A.height-Z&&B.readPixels(z,j,J,Z,En.convert(He),En.convert(We),ae)}finally{let Pe=ne!==null?ie.get(ne).__webglFramebuffer:null;ee.bindFramebuffer(B.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(A,z,j,J,Z,ae,ue,me=0){if(!A||!A.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=ie.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ue!==void 0&&(Se=Se[ue]),Se){if(z>=0&&z<=A.width-J&&j>=0&&j<=A.height-Z){ee.bindFramebuffer(B.FRAMEBUFFER,Se);let Pe=A.textures[me],He=Pe.format,We=Pe.type;if(A.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+me),!Ce.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Re=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Re),B.bufferData(B.PIXEL_PACK_BUFFER,ae.byteLength,B.STREAM_READ),B.readPixels(z,j,J,Z,En.convert(He),En.convert(We),0);let Xe=ne!==null?ie.get(ne).__webglFramebuffer:null;ee.bindFramebuffer(B.FRAMEBUFFER,Xe);let xt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await cp(B,xt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Re),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ae),B.deleteBuffer(Re),B.deleteSync(xt),ae}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,z=null,j=0){let J=Math.pow(2,-j),Z=Math.floor(A.image.width*J),ae=Math.floor(A.image.height*J),ue=z!==null?z.x:0,me=z!==null?z.y:0;pe.setTexture2D(A,0),B.copyTexSubImage2D(B.TEXTURE_2D,j,0,0,ue,me,Z,ae),ee.unbindTexture()},this.copyTextureToTexture=function(A,z,j=null,J=null,Z=0,ae=0){let ue,me,Se,Pe,He,We,Re,Xe,xt,pt=A.isCompressedTexture?A.mipmaps[ae]:A.image;if(j!==null)ue=j.max.x-j.min.x,me=j.max.y-j.min.y,Se=j.isBox3?j.max.z-j.min.z:1,Pe=j.min.x,He=j.min.y,We=j.isBox3?j.min.z:0;else{let An=Math.pow(2,-Z);ue=Math.floor(pt.width*An),me=Math.floor(pt.height*An),Se=A.isDataArrayTexture?pt.depth:A.isData3DTexture?Math.floor(pt.depth*An):1,Pe=0,He=0,We=0}J!==null?(Re=J.x,Xe=J.y,xt=J.z):(Re=0,Xe=0,xt=0);let nt=En.convert(z.format),Ve=En.convert(z.type),it;z.isData3DTexture?(pe.setTexture3D(z,0),it=B.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(pe.setTexture2DArray(z,0),it=B.TEXTURE_2D_ARRAY):(pe.setTexture2D(z,0),it=B.TEXTURE_2D),ee.activeTexture(B.TEXTURE0),ee.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,z.flipY),ee.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),ee.pixelStorei(B.UNPACK_ALIGNMENT,z.unpackAlignment);let Ct=ee.getParameter(B.UNPACK_ROW_LENGTH),Ie=ee.getParameter(B.UNPACK_IMAGE_HEIGHT),De=ee.getParameter(B.UNPACK_SKIP_PIXELS),dn=ee.getParameter(B.UNPACK_SKIP_ROWS),dl=ee.getParameter(B.UNPACK_SKIP_IMAGES);ee.pixelStorei(B.UNPACK_ROW_LENGTH,pt.width),ee.pixelStorei(B.UNPACK_IMAGE_HEIGHT,pt.height),ee.pixelStorei(B.UNPACK_SKIP_PIXELS,Pe),ee.pixelStorei(B.UNPACK_SKIP_ROWS,He),ee.pixelStorei(B.UNPACK_SKIP_IMAGES,We);let oa=A.isDataArrayTexture||A.isData3DTexture,$r=z.isDataArrayTexture||z.isData3DTexture;if(A.isDepthTexture){let An=ie.get(A),tr=ie.get(z),jn=ie.get(An.__renderTarget),pl=ie.get(tr.__renderTarget);ee.bindFramebuffer(B.READ_FRAMEBUFFER,jn.__webglFramebuffer),ee.bindFramebuffer(B.DRAW_FRAMEBUFFER,pl.__webglFramebuffer);for(let nr=0;nr<Se;nr++)oa&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ie.get(A).__webglTexture,Z,We+nr),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ie.get(z).__webglTexture,ae,xt+nr)),B.blitFramebuffer(Pe,He,ue,me,Re,Xe,ue,me,B.DEPTH_BUFFER_BIT,B.NEAREST);ee.bindFramebuffer(B.READ_FRAMEBUFFER,null),ee.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(Z!==0||A.isRenderTargetTexture||ie.has(A)){let An=ie.get(A),tr=ie.get(z);ee.bindFramebuffer(B.READ_FRAMEBUFFER,H),ee.bindFramebuffer(B.DRAW_FRAMEBUFFER,V);for(let jn=0;jn<Se;jn++)oa?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,An.__webglTexture,Z,We+jn):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,An.__webglTexture,Z),$r?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,tr.__webglTexture,ae,xt+jn):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,tr.__webglTexture,ae),Z!==0?B.blitFramebuffer(Pe,He,ue,me,Re,Xe,ue,me,B.COLOR_BUFFER_BIT,B.NEAREST):$r?B.copyTexSubImage3D(it,ae,Re,Xe,xt+jn,Pe,He,ue,me):B.copyTexSubImage2D(it,ae,Re,Xe,Pe,He,ue,me);ee.bindFramebuffer(B.READ_FRAMEBUFFER,null),ee.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else $r?A.isDataTexture||A.isData3DTexture?B.texSubImage3D(it,ae,Re,Xe,xt,ue,me,Se,nt,Ve,pt.data):z.isCompressedArrayTexture?B.compressedTexSubImage3D(it,ae,Re,Xe,xt,ue,me,Se,nt,pt.data):B.texSubImage3D(it,ae,Re,Xe,xt,ue,me,Se,nt,Ve,pt):A.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,ae,Re,Xe,ue,me,nt,Ve,pt.data):A.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,ae,Re,Xe,pt.width,pt.height,nt,pt.data):B.texSubImage2D(B.TEXTURE_2D,ae,Re,Xe,ue,me,nt,Ve,pt);ee.pixelStorei(B.UNPACK_ROW_LENGTH,Ct),ee.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ie),ee.pixelStorei(B.UNPACK_SKIP_PIXELS,De),ee.pixelStorei(B.UNPACK_SKIP_ROWS,dn),ee.pixelStorei(B.UNPACK_SKIP_IMAGES,dl),ae===0&&z.generateMipmaps&&B.generateMipmap(it),ee.unbindTexture()},this.initRenderTarget=function(A){ie.get(A).__webglFramebuffer===void 0&&pe.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?pe.setTextureCube(A,0):A.isData3DTexture?pe.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?pe.setTexture2DArray(A,0):pe.setTexture2D(A,0),ee.unbindTexture()},this.resetState=function(){q=0,W=0,ne=null,ee.reset(),pi.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}};var jp={type:"change"},Uh={type:"start"},Yp={type:"end"},tl=new ri,qp=new rn,jg=Math.cos(70*Qt.DEG2RAD),bt=new T,Xt=2*Math.PI,Je={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Dh=1e-6,nl=class extends Xs{constructor(e,t=null){super(e,t),this.state=Je.NONE,this.target=new T,this.cursor=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:wi.ROTATE,MIDDLE:wi.DOLLY,RIGHT:wi.PAN},this.touches={ONE:Ri.ROTATE,TWO:Ri.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new T,this._lastQuaternion=new ct,this._lastTargetPosition=new T,this._quat=new ct().setFromUnitVectors(e.up,new T(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Or,this._sphericalDelta=new Or,this._scale=1,this._panOffset=new T,this._rotateStart=new $,this._rotateEnd=new $,this._rotateDelta=new $,this._panStart=new $,this._panEnd=new $,this._panDelta=new $,this._dollyStart=new $,this._dollyEnd=new $,this._dollyDelta=new $,this._dollyDirection=new T,this._mouse=new $,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Yg.bind(this),this._onPointerDown=qg.bind(this),this._onPointerUp=Kg.bind(this),this._onContextMenu=n_.bind(this),this._onMouseWheel=$g.bind(this),this._onKeyDown=Qg.bind(this),this._onTouchStart=e_.bind(this),this._onTouchMove=t_.bind(this),this._onMouseDown=Zg.bind(this),this._onMouseMove=Jg.bind(this),this._interceptControlDown=i_.bind(this),this._interceptControlUp=r_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(jp),this.update(),this.state=Je.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;bt.copy(t).sub(this.target),bt.applyQuaternion(this._quat),this._spherical.setFromVector3(bt),this.autoRotate&&this.state===Je.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Xt:n>Math.PI&&(n-=Xt),i<-Math.PI?i+=Xt:i>Math.PI&&(i-=Xt),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(bt.setFromSpherical(this._spherical),bt.applyQuaternion(this._quatInverse),t.copy(this.target).add(bt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=bt.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){let o=new T(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;let l=new T(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=bt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(tl.origin.copy(this.object.position),tl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(tl.direction))<jg?this.object.lookAt(this.target):(qp.setFromNormalAndCoplanarPoint(this.object.up,this.target),tl.intersectPlane(qp,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Dh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Dh||this._lastTargetPosition.distanceToSquared(this.target)>Dh?(this.dispatchEvent(jp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Xt/60*this.autoRotateSpeed*e:Xt/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){bt.setFromMatrixColumn(t,0),bt.multiplyScalar(-e),this._panOffset.add(bt)}_panUp(e,t){this.screenSpacePanning===!0?bt.setFromMatrixColumn(t,1):(bt.setFromMatrixColumn(t,0),bt.crossVectors(this.object.up,bt)),bt.multiplyScalar(e),this._panOffset.add(bt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;bt.copy(i).sub(this.target);let s=bt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,s=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Xt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Xt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Xt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Xt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Xt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Xt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(i,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Xt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Xt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new $,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function qg(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Yg(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function Kg(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yp),this.state=Je.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Zg(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case wi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=Je.DOLLY;break;case wi.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Je.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Je.ROTATE}break;case wi.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Je.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Je.PAN}break;default:this.state=Je.NONE}this.state!==Je.NONE&&this.dispatchEvent(Uh)}function Jg(r){switch(this.state){case Je.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case Je.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case Je.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function $g(r){this.enabled===!1||this.enableZoom===!1||this.state!==Je.NONE||(r.preventDefault(),this.dispatchEvent(Uh),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Yp))}function Qg(r){this.enabled!==!1&&this._handleKeyDown(r)}function e_(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Ri.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=Je.TOUCH_ROTATE;break;case Ri.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=Je.TOUCH_PAN;break;default:this.state=Je.NONE}break;case 2:switch(this.touches.TWO){case Ri.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=Je.TOUCH_DOLLY_PAN;break;case Ri.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=Je.TOUCH_DOLLY_ROTATE;break;default:this.state=Je.NONE}break;default:this.state=Je.NONE}this.state!==Je.NONE&&this.dispatchEvent(Uh)}function t_(r){switch(this._trackPointer(r),this.state){case Je.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case Je.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case Je.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case Je.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=Je.NONE}}function n_(r){this.enabled!==!1&&r.preventDefault()}function i_(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function r_(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Oh(r,e){if(e===dh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Hr||e===Ks){let t=r.getIndex();if(t===null){let a=[],o=r.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}let n=t.count-2,i=[];if(e===Hr)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}function Kp(r){let e=new Map,t=new Map,n=r.clone();return Zp(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let s=i,a=e.get(i),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Zp(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)Zp(r.children[n],e.children[n],t)}var il=class extends Fn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Hh(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new Qh(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new tu(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new Vh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new rl(t,Ge.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new rl(t,Ge.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new nu(t)})}load(e,t,n,i){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=ui.extractUrlBase(e);a=ui.resolveURL(l,this.path)}else a=ui.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Dr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,a={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===tf){try{a[Ge.KHR_BINARY_GLTF]=new iu(e)}catch(u){i&&i(u);return}s=JSON.parse(a[Ge.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new hu(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],p=s.extensionsRequired||[];switch(u){case Ge.KHR_MATERIALS_UNLIT:a[u]=new kh;break;case Ge.KHR_DRACO_MESH_COMPRESSION:a[u]=new ru(s,this.dracoLoader);break;case Ge.KHR_TEXTURE_TRANSFORM:a[u]=new su;break;case Ge.KHR_MESH_QUANTIZATION:a[u]=new au;break;default:p.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function s_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}function ut(r,e,t){let n=r.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var Ge={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Gh=class{constructor(e){this.parser=e,this.name=Ge.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],l,h=new _e(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Bt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ai(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ks(h),l.distance=u;break;case"spot":l=new Gs(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Hn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},kh=class{constructor(){this.name=Ge.KHR_MATERIALS_UNLIT}getMaterialType(){return Mn}extendParams(e,t,n){let i=[];e.color=new _e(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Bt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,lt))}return Promise.all(i)}},Vh=class{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=ut(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Hh=class{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return ut(this.parser,e,this.name)!==null?Ht:null}extendMaterialParams(e,t){let n=ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new $(s,s)}return Promise.all(i)}},Wh=class{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_DISPERSION}getMaterialType(e){return ut(this.parser,e,this.name)!==null?Ht:null}extendMaterialParams(e,t){let n=ut(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Xh=class{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return ut(this.parser,e,this.name)!==null?Ht:null}extendMaterialParams(e,t){let n=ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},jh=class{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_SHEEN}getMaterialType(e){return ut(this.parser,e,this.name)!==null?Ht:null}extendMaterialParams(e,t){let n=ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new _e(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],Bt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,lt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},qh=class{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return ut(this.parser,e,this.name)!==null?Ht:null}extendMaterialParams(e,t){let n=ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},Yh=class{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_VOLUME}getMaterialType(e){return ut(this.parser,e,this.name)!==null?Ht:null}extendMaterialParams(e,t){let n=ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let s=n.attenuationColor||[1,1,1];return t.attenuationColor=new _e().setRGB(s[0],s[1],s[2],Bt),Promise.all(i)}},Kh=class{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_IOR}getMaterialType(e){return ut(this.parser,e,this.name)!==null?Ht:null}extendMaterialParams(e,t){let n=ut(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Zh=class{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_SPECULAR}getMaterialType(e){return ut(this.parser,e,this.name)!==null?Ht:null}extendMaterialParams(e,t){let n=ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let s=n.specularColorFactor||[1,1,1];return t.specularColor=new _e().setRGB(s[0],s[1],s[2],Bt),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,lt)),Promise.all(i)}},Jh=class{constructor(e){this.parser=e,this.name=Ge.EXT_MATERIALS_BUMP}getMaterialType(e){return ut(this.parser,e,this.name)!==null?Ht:null}extendMaterialParams(e,t){let n=ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},$h=class{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return ut(this.parser,e,this.name)!==null?Ht:null}extendMaterialParams(e,t){let n=ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},Qh=class{constructor(e){this.parser=e,this.name=Ge.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},eu=class{constructor(e){this.parser=e,this.name=Ge.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},tu=class{constructor(e){this.parser=e,this.name=Ge.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},rl=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,p=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,p,i.mode,i.filter).then(function(d){return d.buffer}):a.ready.then(function(){let d=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(d),h,u,p,i.mode,i.filter),d})})}else return null}},nu=class{constructor(e){this.name=Ge.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==ln.TRIANGLES&&l.mode!==ln.TRIANGLE_STRIP&&l.mode!==ln.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],p=l[0].count,d=[];for(let m of u){let f=new Ee,v=new T,g=new ct,_=new T(1,1,1),y=new Ms(m.geometry,m.material,p);for(let S=0;S<p;S++)c.TRANSLATION&&v.fromBufferAttribute(c.TRANSLATION,S),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,S),c.SCALE&&_.fromBufferAttribute(c.SCALE,S),y.setMatrixAt(S,f.compose(v,g,_));for(let S in c)if(S==="_COLOR_0"){let E=c[S];y.instanceColor=new Si(E.array,E.itemSize,E.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&m.geometry.setAttribute(S,c[S]);tt.prototype.copy.call(y,m),this.parser.assignFinalMaterial(y),d.push(y)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},tf="glTF",ea=12,Jp={JSON:1313821514,BIN:5130562},iu=class{constructor(e){this.name=Ge.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ea),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==tf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-ea,s=new DataView(e,ea),a=0;for(;a<i;){let o=s.getUint32(a,!0);a+=4;let c=s.getUint32(a,!0);if(a+=4,c===Jp.JSON){let l=new Uint8Array(e,ea+a,o);this.content=n.decode(l)}else if(c===Jp.BIN){let l=ea+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ru=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ge.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=lu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=lu[h]||h.toLowerCase();if(a[h]!==void 0){let p=n.accessors[e.attributes[h]],d=qr[p.componentType];l[u]=d.name,c[u]=p.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,p){i.decodeDracoFile(h,function(d){for(let m in d.attributes){let f=d.attributes[m],v=c[m];v!==void 0&&(f.normalized=v)}u(d)},o,l,Bt,p)})})}},su=class{constructor(){this.name=Ge.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},au=class{constructor(){this.name=Ge.KHR_MESH_QUANTIZATION}},sl=class extends Un{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,p=u*u,d=p*u,m=e*l,f=m-l,v=-2*d+3*p,g=d-p,_=1-v,y=g-p+u;for(let S=0;S!==o;S++){let E=a[f+S+o],M=a[f+S+c]*h,P=a[m+S+o],O=a[m+S]*h;s[S]=_*E+y*M+v*P+g*O}return s}},a_=new ct,ou=class extends sl{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return a_.fromArray(s).normalize().toArray(s),s}},ln={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},qr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},$p={9728:Ft,9729:vt,9984:Do,9985:Gr,9986:Yi,9987:zn},Qp={33071:Ln,33648:xr,10497:Mi},Fh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},lu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ii={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},o_={CUBICSPLINE:void 0,LINEAR:Vi,STEP:ki},Bh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function l_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Dn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ci})),r.DefaultMaterial}function Qi(r,e,t){for(let n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Hn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function c_(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let p=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(p)}if(i){let p=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(p)}if(s){let p=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(p)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],p=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=p),r.morphTargetsRelative=!0,r})}function h_(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function u_(r){let e,t=r.extensions&&r.extensions[Ge.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+zh(t.attributes):e=r.indices+":"+zh(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+zh(r.targets[n]);return e}function zh(r){let e="",t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function cu(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function d_(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var p_=new Ee,hu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new s_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new Fs(this.options.manager):this.textureLoader=new Vs(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Dr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Qi(s,o,i),Hn(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())s(h,o.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ge.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,a){n.load(ui.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Fh[i.type],o=qr[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new _t(l,a,c))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],c=Fh[i.type],l=qr[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,p=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,f,v;if(d&&d!==u){let g=Math.floor(p/d),_="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count,y=t.cache.get(_);y||(f=new l(o,g*d,i.count*d/h),y=new Ar(f,d/h),t.cache.add(_,y)),v=new wr(y,c,p%d/h,m)}else o===null?f=new l(i.count*c):f=new l(o,p,i.count*c),v=new _t(f,c,m);if(i.sparse!==void 0){let g=Fh.SCALAR,_=qr[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,E=new _(a[1],y,i.sparse.count*g),M=new l(a[2],S,i.sparse.count*c);o!==null&&(v=new _t(v.array.slice(),v.itemSize,v.normalized)),v.normalized=!1;for(let P=0,O=E.length;P<O;P++){let L=E[P];if(v.setX(L,M[P*c]),c>=2&&v.setY(L,M[P*c+1]),c>=3&&v.setZ(L,M[P*c+2]),c>=4&&v.setW(L,M[P*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}v.normalized=m}return v})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,a=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let p=(s.samplers||{})[a.sampler]||{};return h.magFilter=$p[p.magFilter]||vt,h.minFilter=$p[p.minFilter]||zn,h.wrapS=Qp[p.wrapS]||Mi,h.wrapT=Qp[p.wrapT]||Mi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ft&&h.minFilter!==vt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;let p=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(p),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(p,d){let m=p;t.isImageBitmapLoader===!0&&(m=function(f){let v=new Et(f);v.needsUpdate=!0,p(v)}),t.load(ui.resolveURL(u,s.path),m,void 0,d)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),Hn(u,a),u.userData.mimeType=a.mimeType||d_(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[Ge.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Ge.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=s.associations.get(a);a=s.extensions[Ge.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new bi,Vt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Sn,Vt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Dn}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],a,o={},c=s.extensions||{},l=[];if(c[Ge.KHR_MATERIALS_UNLIT]){let u=i[Ge.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,s,t))}else{let u=s.pbrMetallicRoughness||{};if(o.color=new _e(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let p=u.baseColorFactor;o.color.setRGB(p[0],p[1],p[2],Bt),o.opacity=p[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,lt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(p){return p.getMaterialType&&p.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(p){return p.extendMaterialParams&&p.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=an);let h=s.alphaMode||Bh.OPAQUE;if(h===Bh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Bh.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==Mn&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new $(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==Mn&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==Mn){let u=s.emissiveFactor;o.emissive=new _e().setRGB(u[0],u[1],u[2],Bt)}return s.emissiveTexture!==void 0&&a!==Mn&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,lt)),Promise.all(l).then(function(){let u=new a(o);return s.name&&(u.name=s.name),Hn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Qi(i,u,s),u})}createUniqueName(e){let t=$e.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Ge.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return ef(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=u_(l),u=i[h];if(u)a.push(u.promise);else{let p;l.extensions&&l.extensions[Ge.KHR_DRACO_MESH_COMPRESSION]?p=s(l):p=ef(new ke,l,t),i[h]={primitive:l,promise:p},a.push(p)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?l_(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let d=0,m=h.length;d<m;d++){let f=h[d],v=a[d],g,_=l[d];if(v.mode===ln.TRIANGLES||v.mode===ln.TRIANGLE_STRIP||v.mode===ln.TRIANGLE_FAN||v.mode===void 0)g=s.isSkinnedMesh===!0?new ys(f,_):new ht(f,_),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),v.mode===ln.TRIANGLE_STRIP?g.geometry=Oh(g.geometry,Ks):v.mode===ln.TRIANGLE_FAN&&(g.geometry=Oh(g.geometry,Hr));else if(v.mode===ln.LINES)g=new oi(f,_);else if(v.mode===ln.LINE_STRIP)g=new ai(f,_);else if(v.mode===ln.LINE_LOOP)g=new Ss(f,_);else if(v.mode===ln.POINTS)g=new Wi(f,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+v.mode);Object.keys(g.geometry.morphAttributes).length>0&&h_(g,s),g.name=t.createUniqueName(s.name||"mesh_"+e),Hn(g,s),v.extensions&&Qi(i,g,v),t.assignFinalMaterial(g),u.push(g)}for(let d=0,m=u.length;d<m;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return s.extensions&&Qi(i,u[0],s),u[0];let p=new Lt;s.extensions&&Qi(i,p,s),t.associations.set(p,{meshes:e});for(let d=0,m=u.length;d<m;d++)p.add(u[d]);return p})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new gt(Qt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ei(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Hn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let p=new Ee;s!==null&&p.fromArray(s.array,l*16),c.push(p)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new xs(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,p=i.channels.length;u<p;u++){let d=i.channels[u],m=i.samplers[d.sampler],f=d.target,v=f.node,g=i.parameters!==void 0?i.parameters[m.input]:m.input,_=i.parameters!==void 0?i.parameters[m.output]:m.output;f.node!==void 0&&(a.push(this.getDependency("node",v)),o.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",_)),l.push(m),h.push(f))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let p=u[0],d=u[1],m=u[2],f=u[3],v=u[4],g=[];for(let y=0,S=p.length;y<S;y++){let E=p[y],M=d[y],P=m[y],O=f[y],L=v[y];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let D=n._createAnimationTracks(E,M,P,O,L);if(D)for(let k=0;k<D.length;k++)g.push(D[k])}let _=new Nr(s,void 0,g);return Hn(_,i),_})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],p=l[2];p!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(p,p_)});for(let d=0,m=u.length;d<m;d++)h.add(u[d]);if(h.userData.pivot!==void 0&&u.length>0){let d=h.userData.pivot,m=u[0];h.pivot=new T().fromArray(d),h.position.x-=d[0],h.position.y-=d[1],h.position.z-=d[2],m.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(s.isBone===!0?h=new Rr:l.length>1?h=new Lt:l.length===1?h=l[0]:h=new tt,h!==l[0])for(let u=0,p=l.length;u<p;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=a),Hn(h,s),s.extensions&&Qi(n,h,s),s.matrix!==void 0){let u=new Ee;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new Lt;n.name&&(s.name=i.createUniqueName(n.name)),Hn(s,n),n.extensions&&Qi(t,s,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++){let p=c[h];p.parent!==null?s.add(Kp(p)):s.add(p)}let l=h=>{let u=new Map;for(let[p,d]of i.associations)(p instanceof Vt||p instanceof Et)&&u.set(p,d);return h.traverse(p=>{let d=i.associations.get(p);d!=null&&u.set(p,d)}),u};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){let a=[],o=e.name?e.name:e.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}Ii[s.path]===Ii.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch(Ii[s.path]){case Ii.weights:h=ci;break;case Ii.rotation:h=On;break;case Ii.translation:case Ii.scale:h=hi;break;default:switch(n.itemSize){case 1:h=ci;break;case 2:case 3:default:h=hi;break}break}let u=i.interpolation!==void 0?o_[i.interpolation]:Vi,p=this._getArrayFromAccessor(n);for(let d=0,m=c.length;d<m;d++){let f=new h(c[d]+"."+Ii[s.path],t.array,p,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(f),a.push(f)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=cu(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof On?ou:sl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function f_(r,e,t){let n=e.attributes,i=new At;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new T(c[0],c[1],c[2]),new T(l[0],l[1],l[2])),o.normalized){let h=cu(qr[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new T,c=new T;for(let l=0,h=s.length;l<h;l++){let u=s[l];if(u.POSITION!==void 0){let p=t.json.accessors[u.POSITION],d=p.min,m=p.max;if(d!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(m[2]))),p.normalized){let f=cu(qr[p.componentType]);c.multiplyScalar(f)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;let a=new zt;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function ef(r,e,t){let n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(c){r.setAttribute(o,c)})}for(let a in n){let o=lu[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){let a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return ze.workingColorSpace!==Bt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ze.workingColorSpace}" not supported.`),Hn(r,e),f_(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?c_(r,e.targets,t):r})}var Zr={left:new _e(2450411),right:new _e(15690829)},ll={left:new T(-.11,0,0),right:new T(.11,0,0)},m_=.09,g_=53.5,__=.062,nf={negative:["NAUO7","NAUO8","NAUO9","NAUO22","NAUO23"],positive:["NAUO4","NAUO5","NAUO10","NAUO16","NAUO21"]},v_=new URLSearchParams(window.location.search).get("poseDemo")==="1",cl=!1,rf=!1,Kr=null,ta=0,hn=null,cn=null,Dt=null,Gt=null,er=null,sf=null,uu=null,al=null,Jr=600,na=!0,Yr=!1,du=3,af=0,Xn={left:of("left"),right:of("right")};function of(r){return{side:r,anchor:null,modelRoot:null,modelMeshes:[],cameraRig:null,cameraFrustum:null,visualPoints:null,jawNodes:[],trail:[],trailLine:null,lastSample:0,lastTrailTime:0,connected:!1,valid:!1,closure:0,targetPosition:ll[r].clone(),targetQuaternion:new ct,poseInitialized:!1,positionFilterInitialized:!1,lastMappedPosition:new T,filteredPosition:new T,lastPositionSample:0}}function wt(r){return document.getElementById(r)}function y_(){if(rf)return;let r=wt("trajectoryViewport");if(!r)return;cn=new gs,cn.background=new _e(16119802),cn.fog=new ms(16119802,2.8,7.5),Dt=new gt(42,1,.01,20),Dt.position.set(.88,.56,1.02),hn=new Qo({antialias:!0,powerPreference:"high-performance"}),hn.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),hn.outputColorSpace=lt,hn.shadowMap.enabled=!0,hn.shadowMap.type=Po,hn.domElement.setAttribute("aria-label","\u5DE6\u53F3\u624B\u5939\u722A\u4E09\u7EF4\u4F4D\u59FF\u8F68\u8FF9"),r.appendChild(hn.domElement),Gt=new nl(Dt,hn.domElement),Gt.enableDamping=!0,Gt.dampingFactor=.08,Gt.enableRotate=!0,Gt.enablePan=!0,Gt.enableZoom=!0,Gt.screenSpacePanning=!0,Gt.minDistance=.08,Gt.maxDistance=5,Gt.target.set(0,.03,0),cn.add(new Bs(16777215,7438486,2.1));let e=new Ai(16777215,3);e.position.set(1.8,2.4,1.4),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),cn.add(e);let t=new Ai(12572671,1.2);t.position.set(-1.8,.7,-1.2),cn.add(t),er=new Hs(3.2,32,10135477,14212839),er.position.y=-.18,er.material.opacity=.58,er.material.transparent=!0,cn.add(er);let n=new Ws(.22);n.position.set(0,-.175,0),cn.add(n),["left","right"].forEach(function(i){let s=Xn[i];s.anchor=new Lt,s.anchor.visible=!1,cn.add(s.anchor);let a=new ke().setFromPoints([ll[i].clone()]),o=new Sn({color:Zr[i],transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1});s.trailLine=new ai(a,o),s.trailLine.frustumCulled=!1,s.trailLine.renderOrder=50,s.trailLine.visible=!1,cn.add(s.trailLine)}),sf=new ResizeObserver(fu),sf.observe(r),x_(),pf(),fu(),rf=!0}function x_(){let r=wt("trajectoryTrailLength"),e=wt("trajectoryTrailLengthValue");r&&r.addEventListener("input",function(){Jr=Math.max(100,Number(this.value)||600),e&&(e.textContent=String(Jr)),E_()});let t=wt("trajectoryPositionScale"),n=wt("trajectoryPositionScaleValue");t&&t.addEventListener("input",function(){du=Qt.clamp(Number(this.value)||3,1,8),n&&(n.textContent=C_(du)),gu(),window.setTimeout(ia,40)});let i=wt("trajectoryGridToggle");i&&i.addEventListener("change",function(){er&&(er.visible=this.checked)});let s=wt("trajectoryModelToggle");s&&s.addEventListener("change",function(){na=this.checked,["left","right"].forEach(function(l){ol(Xn[l])})});let a=wt("trajectoryPointCloudToggle");a&&a.addEventListener("change",function(){Yr=this.checked,["left","right"].forEach(function(l){ol(Xn[l])}),window.setTimeout(ia,40)});let o=wt("trajectoryFitBtn");o&&o.addEventListener("click",ia);let c=wt("trajectoryResetBtn");c&&c.addEventListener("click",T_)}function pu(r,e,t,n){if(!e||r.cameraRig)return;let i=new Lt;n?(i.position.set(0,.04,-.025),i.rotation.y=Math.PI):(i.position.set(0,20.35,0),i.rotation.x=-Math.PI/2,i.scale.setScalar(1/Math.max(Math.abs(t)||1,1e-6)));let s=.035,a=.4,o=.018,c=.011,l=.2,h=.12,u=[new T(-o,-c,s),new T(o,-c,s),new T(o,c,s),new T(-o,c,s),new T(-l,-h,a),new T(l,-h,a),new T(l,h,a),new T(-l,h,a)],p=[];[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]].forEach(function(f){p.push(u[f[0]],u[f[1]])});let d=new oi(new ke().setFromPoints(p),new Sn({color:Zr[r.side],transparent:!0,opacity:.26}));d.visible=!1,i.add(d);let m=new Wi(new ke,new bi({color:Zr[r.side],size:.006,sizeAttenuation:!0,transparent:!0,opacity:.92,depthWrite:!1}));m.visible=!1,m.frustumCulled=!1,i.add(m),e.add(i),r.cameraRig=i,r.cameraFrustum=d,r.visualPoints=m}function fu(){let r=wt("trajectoryViewport");if(!hn||!Dt||!r)return;let e=Math.max(1,r.clientWidth),t=Math.max(1,r.clientHeight);hn.setSize(e,t,!1),Dt.aspect=e/t,Dt.updateProjectionMatrix()}function pf(){return al||(al=new Promise(function(r){new il().load("/assets/models/umi-gripper.glb",function(e){uu=e.scene,["left","right"].forEach(M_),r(!0)},void 0,function(e){console.error("[\u7A7A\u95F4\u4F4D\u59FF] \u5939\u722A\u6A21\u578B\u52A0\u8F7D\u5931\u8D25",e),["left","right"].forEach(b_),r(!1)})}),al)}function M_(r){let e=Xn[r];if(!e.anchor||!uu||e.modelRoot)return;let t=new Lt,n=uu.clone(!0),i=new Map;n.traverse(function(h){if(!h.isMesh)return;e.modelMeshes.push(h),h.castShadow=!0,h.receiveShadow=!0;let p=(Array.isArray(h.material)?h.material:[h.material]).map(function(d){if(!i.has(d.uuid)){let m=d.clone();m.color&&m.color.lerp(Zr[r],.16),"metalness"in m&&(m.metalness=Math.max(.25,m.metalness||0)),"roughness"in m&&(m.roughness=Math.max(.35,m.roughness||.5)),i.set(d.uuid,m)}return i.get(d.uuid)});h.material=Array.isArray(h.material)?p:p[0]}),n.updateMatrixWorld(!0);let s=new At().setFromObject(n),a=s.getCenter(new T),o=s.getSize(new T),c=Math.max(o.x,o.y,o.z,1);n.position.sub(a),t.scale.setScalar(m_/c),t.add(n),e.anchor.add(t),e.modelRoot=t;let l=n.getObjectByName("NAUO1");l?pu(e,l,t.scale.x,!1):(console.warn("[\u7A7A\u95F4\u4F4D\u59FF] \u672A\u627E\u5230\u9C7C\u773C\u76F8\u673A CAD \u8282\u70B9\uFF0C\u4F7F\u7528\u524D\u5411\u89C6\u9525\u964D\u7EA7\u663E\u793A"),pu(e,e.anchor,1,!0)),nf.negative.forEach(function(h){lf(e,n,h,1)}),nf.positive.forEach(function(h){lf(e,n,h,-1)}),S_(e,Zr[r]),mu(e,e.closure)}function lf(r,e,t,n){let i=e.getObjectByName(t);i&&r.jawNodes.push({node:i,baseX:i.position.x,direction:n})}function S_(r,e){r.jawNodes.forEach(function(t){t.node.traverse(function(n){if(!n.isMesh)return;(Array.isArray(n.material)?n.material:[n.material]).forEach(function(s){s.color&&s.color.lerp(e,.58)})})})}function b_(r){let e=Xn[r];if(!e.anchor||e.modelRoot)return;let t=new Lt,n=new Dn({color:4937059,metalness:.35,roughness:.5}),i=new Dn({color:Zr[r],metalness:.25,roughness:.45}),s=new ht(new Nn(.075,.17,.065),n);s.position.y=-.07,t.add(s),e.modelMeshes.push(s),[-1,1].forEach(function(a){let o=new ht(new Nn(.025,.105,.035),i);o.position.set(a*.075,.055,0),t.add(o),e.modelMeshes.push(o),e.jawNodes.push({node:o,baseX:o.position.x,direction:-a,fallback:!0})}),e.anchor.add(t),e.modelRoot=t,pu(e,e.anchor,1,!0),mu(e,e.closure)}function mu(r,e){let t=Qt.clamp(Number(e)||0,0,1);r.closure=Qt.clamp((t-.02)/.92,0,1),r.jawNodes.forEach(function(n){let i=n.fallback?__:g_;n.node.position.x=n.baseX+n.direction*i*r.closure})}function ia(){if(!Dt||!Gt)return;let r=new At,e=!1;["left","right"].forEach(function(h){let u=Xn[h];!u.connected||!u.valid||!u.anchor||(r.expandByPoint(u.anchor.position),u.trail.forEach(function(p){r.expandByPoint(p)}),na&&u.modelRoot&&r.expandByObject(u.modelRoot),Yr&&u.visualPoints&&u.visualPoints.visible&&r.expandByObject(u.visualPoints),e=!0)}),(!e||r.isEmpty())&&r.set(new T(-.24,-.12,-.18),new T(.24,.18,.18)),r.expandByScalar(.035);let t=r.getCenter(new T),n=r.getSize(new T),i=Qt.degToRad(Dt.fov),s=2*Math.atan(Math.tan(i/2)*Math.max(Dt.aspect,.1)),a=n.y/(2*Math.tan(i/2)),o=n.x/(2*Math.tan(s/2)),c=Math.max(a,o,.16)+n.z*.65,l=Dt.position.clone().sub(Gt.target);l.lengthSq()<1e-6&&l.set(.75,.48,1),l.normalize(),Gt.target.copy(t),Dt.position.copy(t).add(l.multiplyScalar(c*1.18)),Dt.near=Math.max(.002,c/100),Dt.far=Math.max(10,c*20),Dt.updateProjectionMatrix(),Gt.update()}function T_(){gu(),fetch("/api/hand-poses/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({side:"all"})}).catch(function(){})}function gu(){["left","right"].forEach(function(r){let e=Xn[r];e.trail=[],e.lastSample=0,e.lastTrailTime=0,e.positionFilterInitialized=!1,e.lastPositionSample=0,_u(e)})}function E_(){["left","right"].forEach(function(r){let e=Xn[r];e.trail.length>Jr&&e.trail.splice(0,e.trail.length-Jr),_u(e)})}async function cf(){if(cl){if(v_){hf(A_());return}try{let r=await fetch("/api/hand-poses",{cache:"no-store"});if(!r.ok)throw new Error("HTTP "+r.status);let e=await r.json();hf(e)}catch{ff(!1,"\u670D\u52A1\u672A\u8FDE\u63A5")}}}function A_(){let r=performance.now()/1e3;function e(t){let n=Math.sin(r*.55+t)*.35,i=n*.5;return{connected:!0,cameraConnected:!0,hasImu:!0,hasVisual:!0,valid:!0,timestampUs:Math.round(performance.now()*1e3),sampleCount:Math.round(performance.now()),position:[Math.sin(r*.7+t)*.11,-(.05+Math.sin(r*.9+t)*.035),-Math.cos(r*.7+t)*.09],quaternion:[0,0,Math.sin(i),Math.cos(i)],euler:[0,0,n*180/Math.PI],closure:(Math.sin(r*1.3+t)+1)*.5,quality:.91,visualFeatures:126,visualPointCloud:Array.from({length:72},function(s,a){let o=.1+a%18/17*.3,c=a*2.399963;return[Math.cos(c)*o*.32,Math.sin(c)*o*.2,o]}),stationary:!1,originRelocalized:!1,mode:"visual_imu"}}return{enabled:!0,cooperative:{available:!0,active:!1,mode:"dual_hand_zupt"},hands:{left:e(0),right:e(Math.PI)}}}function hf(r){let e=r&&r.hands?r.hands:{},t=e.left||{},n=e.right||{};uf("left",t),uf("right",n);let i=+!!t.connected+ +!!n.connected;ff(i>0,i>0?"\u8DDF\u8E2A\u4E2D \xB7 "+i+" \u4E2A\u5939\u722A":"\u7B49\u5F85\u8BBE\u5907");let s=r&&r.cooperative?r.cooperative:{};Tn("trajectoryCooperativeState",s.active?"\u534F\u540C\u7A33\u6001":s.available?"\u53CC\u624B\u5C31\u7EEA":"\u7B49\u5F85\u53CC\u624B");let a=wt("trajectoryFrameLabel");a&&(a.textContent=i>0?"\u5404\u624B\u76F8\u5BF9\u4E8E\u672C\u6B21\u542F\u52A8\u6216\u91CD\u7F6E\u4F4D\u7F6E":"\u7B49\u5F85\u8DDF\u8E2A\u6570\u636E");let o=wt("trajectoryEmpty");o&&o.classList.toggle("hidden",!!(t.connected||n.connected)),i>0&&af===0&&pf().then(function(){window.setTimeout(ia,60)}),af=i}function uf(r,e){let t=Xn[r],n=!!e.connected,i=n&&!!e.valid;t.connected=n,t.valid=i;let s=r==="left"?"trajectoryLeft":"trajectoryRight";Tn(s+"Mode",df(e.mode,n)),Tn(s+"Camera",n?e.cameraConnected?"\u5728\u7EBF":"\u672A\u63A5\u5165":"--"),Tn(s+"Imu",n?e.hasImu?"\u5728\u7EBF":"\u7B49\u5F85":"--"),Tn(s+"Features",n?String(Number(e.visualFeatures)||0):"--"),Tn(s+"Quality",n?Math.round((Number(e.quality)||0)*100)+"%":"--"),Tn(s+"Badge",n?(r==="left"?"\u5DE6\u624B ":"\u53F3\u624B ")+df(e.mode,!0):r==="left"?"\u5DE6\u624B\u672A\u63A5\u5165":"\u53F3\u624B\u672A\u63A5\u5165");let a=wt(s+"Status");a&&a.classList.toggle("disconnected",!n);let o=wt(s+"Badge");o&&o.classList.toggle("online",n);let c=wt(s+"Readout");if(c&&c.classList.toggle("hidden",!n),!t.anchor)return;if(!i){ol(t),t.poseInitialized=!1,t.positionFilterInitialized=!1,t.lastPositionSample=0,t.trailLine&&(t.trailLine.visible=!1);return}let l=e.position||[0,0,0],h=new T(Wn(l[0]),-Wn(l[1]),-Wn(l[2])),u=Number(e.sampleCount)||0;if(!t.positionFilterInitialized||!!e.originRelocalized||u>0&&t.lastPositionSample>0&&u<t.lastPositionSample)t.lastMappedPosition.copy(h),t.filteredPosition.copy(h),t.positionFilterInitialized=!0;else{let g=h.clone().sub(t.lastMappedPosition);if(t.lastMappedPosition.copy(h),e.stationary)g.set(0,0,0);else{let _=Math.abs(g.y),y=Math.abs(g.z);_>=y*.65&&_>5e-5?g.z=0:y>=_*1.8&&y>5e-5&&(g.y=0)}t.filteredPosition.add(g)}t.lastPositionSample=u;let d=t.filteredPosition.clone(),m=ll[r].clone().addScaledVector(d,du);t.targetPosition.copy(m);let f=e.quaternion||[0,0,0,1];t.targetQuaternion.set(Wn(f[0]),Wn(f[2]),-Wn(f[1]),Wn(f[3],1)).normalize(),t.poseInitialized||(t.anchor.position.copy(t.targetPosition),t.anchor.quaternion.copy(t.targetQuaternion),t.poseInitialized=!0),w_(t,e.visualPointCloud,!!e.cameraConnected),ol(t),mu(t,e.closure),R_(t,m,Number(e.sampleCount)||0,Number(e.timestampUs)||0,!!e.stationary);let v=new xn().setFromQuaternion(t.targetQuaternion,"XYZ");Tn(s+"Position",d.x.toFixed(3)+" / "+d.y.toFixed(3)+" / "+d.z.toFixed(3)),Tn(s+"Rotation",Qt.radToDeg(v.x).toFixed(1)+"\xB0 / "+Qt.radToDeg(v.y).toFixed(1)+"\xB0 / "+Qt.radToDeg(v.z).toFixed(1)+"\xB0"),Tn(s+"Closure","\u95ED\u5408 "+Math.round(t.closure*100)+"%")}function w_(r,e,t){if(!r.visualPoints)return;let n=[];Array.isArray(e)&&e.forEach(function(s){!Array.isArray(s)||s.length<3||n.push(Wn(s[0]),Wn(s[1]),Wn(s[2]))}),r.visualPoints.geometry.dispose();let i=new ke;i.setAttribute("position",new be(n,3)),r.visualPoints.geometry=i,r.visualPoints.userData.hasPoints=n.length>=3,r.visualPoints.userData.cameraConnected=t}function ol(r){if(!r.anchor)return;let e=r.connected&&r.valid,t=!!(r.visualPoints&&r.visualPoints.userData.hasPoints),n=!!(r.visualPoints&&r.visualPoints.userData.cameraConnected);r.anchor.visible=e&&(na||Yr),r.modelRoot&&(r.modelRoot.visible=e&&(na||Yr)),r.modelMeshes.forEach(function(i){i.visible=na}),r.cameraFrustum&&(r.cameraFrustum.visible=e&&Yr&&n),r.visualPoints&&(r.visualPoints.visible=e&&Yr&&n&&t)}function R_(r,e,t,n,i){if(t&&t===r.lastSample)return;let s=r.trail.length?r.trail[r.trail.length-1]:null;if(i&&s)return;let a=!s||s.distanceToSquared(e)>=9e-6,o=n&&n-r.lastTrailTime>=5e5;!a&&!o||(r.lastSample=t,r.lastTrailTime=n,r.trail.push(e.clone()),r.trail.length>Jr&&r.trail.splice(0,r.trail.length-Jr),_u(r))}function _u(r){if(!r.trailLine)return;let e=r.trail.length>0?r.trail:[ll[r.side].clone()];r.trailLine.geometry.dispose(),r.trailLine.geometry=new ke().setFromPoints(e),r.trailLine.visible=r.connected&&r.valid&&r.trail.length>1}function ff(r,e){Tn("trajectoryOverallState",e);let t=wt("trajectoryLiveDot");t&&t.classList.toggle("online",r)}function Tn(r,e){let t=wt(r);t&&(t.textContent=e)}function Wn(r,e){let t=Number(r);return Number.isFinite(t)?t:e===void 0?0:e}function C_(r){return(Number.isInteger(r)?r.toFixed(0):r.toFixed(1))+"\xD7"}function df(r,e){return e?r==="visual_imu_anchor"?"\u539F\u70B9\u91CD\u5B9A\u4F4D":r==="visual_imu_cooperative"?"\u53CC\u624B\u534F\u540C":r==="visual_imu"?"\u89C6\u89C9 + IMU":r==="imu"?"IMU":r==="initializing"?"\u521D\u59CB\u5316":"\u7B49\u5F85\u6570\u636E":"\u672A\u63A5\u5165"}function mf(){!cl||!hn||!cn||!Dt||(["left","right"].forEach(function(r){let e=Xn[r];!e.anchor||!e.poseInitialized||(e.anchor.position.lerp(e.targetPosition,.18),e.anchor.quaternion.slerp(e.targetQuaternion,.16))}),Gt.update(),hn.render(cn,Dt),ta=requestAnimationFrame(mf))}function P_(){y_(),cl=!0,fu(),cf(),Kr&&clearInterval(Kr),Kr=setInterval(cf,100),ta||mf()}function I_(){cl=!1,Kr&&(clearInterval(Kr),Kr=null),ta&&(cancelAnimationFrame(ta),ta=0)}window.handTrajectory3d={enter:P_,leave:I_,clear:gu,fit:ia};})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
