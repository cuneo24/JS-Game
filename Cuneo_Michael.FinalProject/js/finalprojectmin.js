window.onload=function(){var e=document.getElementById("player"),t=document.getElementById("screenContainer"),n=[],i=t.offsetLeft+800,o=t.offsetTop+519,s=t.offsetLeft,a=t.offsetTop-81,l=["images/playershipdef.png","images/playershipshotgun.png","images/playershipmachinegun.png","images/playershiplaser.png","images/playershippulsegun.png","images/playershiprailgun.png","images/playershiptrackinggun.png"],r=["images/playershipdeffire.png","images/playershipshotgunfire.png","images/playershipmachinegunfire.png","images/playershiplaserfire.png","images/playershippulsegunfire.png","images/playershiprailgunfire.png","images/playershiptrackinggunfire.png"],u=["audio/laserdef.wav","audio/lasershotgun.wav","audio/lasermachinegun.wav","audio/laserlaser.wav","audio/laserpulse.wav","audio/laserrailgun.wav","audio/lasertrackinggun.wav"],d=[36,36,27,-76,36,-80,36],c=[22,22,22,22,18,22,22],p=[120,250,40,150,210,500,350],m=[1,8,1,1,1,1,4],f=[40,35,20,65,10,300,65],h=[20,25,10,35,5,90,35],g=20,y=300,b=(e.clientHeight,e.clientWidth),v=0;healthActual=document.getElementById("healthActual"),healthNum=document.getElementById("healthNumber"),shieldActual=document.getElementById("shieldActual"),shieldNum=document.getElementById("shieldNumber");var w=0,T=["red","yellow","green","orange","blue","purple","pink","white"],A=document.getElementById("screenContainerOverlay"),M=document.getElementById("screenContainerOverlay2"),x=document.getElementById("screenContainerOverlayNebula"),C=document.getElementById("screenContainerOverlayNebula2");$("#screenContainerOverlayNebula").hide(),$("#screenContainerOverlayNebula2").hide();var I=document.getElementById("score"),E=0,L=0,B=document.getElementById("highscorenum"),k=document.getElementById("highScoreBar"),N=document.getElementById("scoreContainer"),O=document.getElementsByClassName("statusselect"),H=0,S=document.getElementsByClassName("ammo"),P=[60,400,75,90,30,30],j=["images/shotgunpowerup.png","images/machinegunpowerup.png","images/laserpowerup.png","images/pulsegunpowerup.png","images/railgunpowerup.png","images/trackinggunpowerup.png"],W=0,J=0,q=0,D=0,R=0,U=0,V=new Audio("audio/LiquidVortex.mp3"),z=[900,825,750,675,600,525,450,400,350,300],F=[1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9],G=[50,60,70,80,90,95,100,110,115,120],K=[1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25],Q=-1,X=document.getElementById("lvlnum");document.getElementById("dummyremover");function Y(){V.play(),V.volume=.3,setTimeout(Y,432e3)}function Z(){0==w&&(Q++,X.innerHTML=Q+1,Q<9&&setTimeout(Z,45e3))}function _(){n[37]&&g>0&&(g-=8),n[38]&&y>0&&(y-=8),n[39]&&g<750&&(g+=8),n[40]&&y<570&&(y+=8),e.style.left=g+"px",e.style.top=y+"px",Y(),setTimeout(_,10)}function ee(){-1600==--W&&(W=0),t.style.backgroundPosition=W+"px 0px",setTimeout(ee,300)}function te(){-1600==(J-=20)&&(J=0),A.style.backgroundPosition=J+"px 0px",setTimeout(te,10),0==w&&(E+=K[Q],I.innerHTML=parseInt(E))}function ne(){-1600==(D-=5)&&(D=0),x.style.backgroundPosition=D+"px 0px",setTimeout(ne,10)}function ie(){-1600==(q-=60)&&(q=0),M.style.backgroundPosition=q+"px 0px",setTimeout(ie,10)}function oe(){-1600==(R-=15)&&(R=0),C.style.backgroundPosition=R+"px 0px",setTimeout(oe,10)}function se(){var e=Math.floor(6e4*Math.random())+2e4,t=Math.floor(8e4*Math.random())+2e4;0==U&&($("#screenContainerOverlayNebula").fadeIn(e),$("#screenContainerOverlayNebula2").fadeIn(e),$("#screenContainerOverlay").fadeOut(e),$("#screenContainerOverlay2").fadeOut(e),U++),1==U&&($("#screenContainerOverlayNebula").fadeOut(e),$("#screenContainerOverlayNebula2").fadeOut(e),$("#screenContainerOverlay").fadeIn(e),$("#screenContainerOverlay2").fadeIn(e),U--),setTimeout(se,t)}function ae(e,n,o,s,a,l){if(0==a)n+=15;else if(1==a||2==a)n+=25;else if(3==a)n+=120;else if(4==a)n+=12,e.style.height=e.clientHeight+2+"px",o-=1;else if(5==a)n+=120;else if(6==a){var r=document.getElementsByClassName("enemy")[l];void 0===r?(n+=3,l=re()):(n<r.offsetLeft&&(n+=3),n>r.offsetLeft&&(n-=3),o<r.offsetTop&&(o+=3),o>r.offsetTop&&(o-=3))}o+=s,e.style.left=n+"px",e.style.top=o+"px";document.getElementById("test");var u=0;buly=e.offsetTop,bulx=e.offsetLeft,bulheight=e.clientHeight,bulwidth=e.clientWidth,function(){for(var n=document.getElementsByClassName("enemy"),i=0;i<n.length;i++){var o=n[i].offsetTop,s=n[i].offsetLeft,l=n[i].clientHeight,r=n[i].clientWidth;if(buly+bulheight>=o&&buly<=o+l&&bulx>=s-bulwidth&&bulx<=s+r){new Audio("audio/laserhit.wav").play(),E+=h[v],parseInt(n[i].getAttribute("health"))>0&&n[i].setAttribute("src","images/scoutdamage.png"),n[i].setAttribute("health",n[i].getAttribute("health")-f[v]);var d=n[i];3!=a&&4!=a&&5!=a?(parseInt(n[i].getAttribute("health"))>0&&setTimeout(function(){d.setAttribute("src","images/scout.png")},30),t.removeChild(e),u++):parseInt(n[i].getAttribute("health"))>0&&d.setAttribute("src","images/scout.png")}}}(),n<=i&&0==u?setTimeout(function(){ae(e,n,o,s,a,l)},10):0==u&&t.removeChild(e)}function le(){if(n[32]&&0==w){laserSound=new Audio(u[v]),laserSound.play(),e.src=r[v];var i=[],o=[],s=[],a=v,f=[],h=0;0!=v&&(S[v].innerHTML=Number(S[v].innerHTML)-1);for(var g=0;g<m[v];g++)6==v&&(h=re()),i[g]=e.offsetLeft+d[v],o[g]=e.offsetTop+c[v],s[g]=(y=void 0,y=document.createElement("div"),0==v?y.setAttribute("class","bulletDef"):1==v?y.setAttribute("class","bulletShotgun"):2==v?y.setAttribute("class","bulletMachinegun"):3==v?y.setAttribute("class","bulletLaser"):4==v?y.setAttribute("class","bulletPulsegun"):5==v?y.setAttribute("class","bulletRailgun"):6==v&&y.setAttribute("class","bulletTrackinggun"),t.appendChild(y),y),s[g].style.top=o[g]+"px",f[g]=1==v?Math.floor(-4*Math.random()+8*Math.random())/2:2==v?Math.floor(-2*Math.random()+4*Math.random())/2:6==v?Math.floor(-6*Math.random()+4*Math.random())/3:0,ae(s[g],i[g],o[g],f[g],a,h),setTimeout(function(){e.src=l[v]},60);setTimeout(le,p[v])}else setTimeout(le,30);var y}function re(){var e=document.getElementsByClassName("enemy");return Math.floor(Math.random()*e.length)}function ue(e,t,n,i,o,s,a){this.spawnenemyx=e,this.spawnenemyy=t,this.health=n,this.damage=i,this.speed=o,this.trajectory=s,this.points=a}function de(e){var n=e.offsetLeft-e.getAttribute("speed")*F[Q],i=e.offsetTop-e.getAttribute("trajectory");e.style.left=n+"px",e.style.top=i+"px",e.getAttribute("health")>0?e.offsetLeft>=s-50&&e.offsetTop>=a-30&&e.offsetTop<=o?setTimeout(function(){de(e)},15):t.removeChild(e):e.getAttribute("health")<=0&&(!function(e){var n=new Audio("audio/shipexplosion.wav");n.volume=.4,n.play();var i=document.createElement("div");i.setAttribute("class","explosion"),i.style.backgroundColor=T[Math.floor(Math.random()*T.length)],t.appendChild(i),$(i).fadeOut(400),setTimeout(function(){t.removeChild(i)},400),e.setAttribute("src","images/shipexplosion.png"),e.style.width="50px",e.style.height="50px",e.style.top=e.offsetTop-10+"px"}(e),setTimeout(function(){t.removeChild(e)},15),E+=parseInt(e.getAttribute("points")*K[Q]))}function ce(n){y>=n.offsetTop-n.clientHeight&&y<=n.offsetTop+n.clientHeight&&g>=n.offsetLeft-b&&g<=n.offsetLeft+n.clientWidth&&(0!=n.offsetTop&&0!=n.offsetLeft&&(new Audio("audio/shipexplosion.wav").play(),t.removeChild(e),t.removeChild(n),healthActual.style.width="0px",shieldActual.style.width="0px",healthNum.innerHTML="0",shieldNum.innerHTML="0",w++,$("#gameover").show(),V.muted=!0,function(){if(E>Te){var e=JSON.stringify(E);window.localStorage.setItem("highscore",e),B.innerHTML=parseInt(E),k.style.color="yellow"}}()));0==w&&setTimeout(function(){ce(n)},30)}function pe(){var e,n,s=((e=document.createElement("img")).setAttribute("src","images/scout.png"),e.setAttribute("class","enemy"),t.appendChild(e),e),a=((n=[])[0]=i+50,n[1]=Math.floor(Math.random()*o),n),l=new ue(a[0],a[1],G[Q],0,3,Math.floor(3*Math.random()-1),100);!function(e,t){e.setAttribute("health",t.health),e.setAttribute("damage",t.damage),e.setAttribute("speed",t.speed),e.setAttribute("trajectory",t.trajectory),e.setAttribute("points",t.points)}(s,l),s.style.left=l.spawnenemyx+"px",s.style.top=l.spawnenemyy+"px",de(s),ce(s),setTimeout(pe,z[Q])}function me(){var n=Math.floor(6*Math.random()),i=function(e){return powerup=document.createElement("img"),powerup.setAttribute("src",j[e]),powerup.setAttribute("class","powerUp"),t.appendChild(powerup),powerup}(n);i.style.top=Math.floor(Math.random()*o),i.style.left="830px",i.style.display="block";!function t(n,i,o,s,a,r){var u=0;n.offsetLeft>400&&(o-=1);n.style.left=o+"px";if(y>=i-s&&y<=i+s&&g>=o-b&&g<=o+a){e.src=l[r+1];var d=new Audio("audio/powerupget.wav");d.play(),v=r+1,document.getElementById("selected").setAttribute("id",""),O[H=v].setAttribute("id","selected"),S[v].innerHTML=Number(S[v].innerHTML)+P[r],n.style.display="none",n.style.left="830px",n.style.display="block",u++}1!=u&&setTimeout(function(){t(n,i,o,s,a,r)},10)}(i,i.offsetTop,i.offsetLeft,30,30,n),0==w&&setTimeout(me,3e4)}function fe(){for(;0==Number(S[H].innerHTML);)if(O[H].setAttribute("id",""),++H>6&&(H=0),0!=S[H].innerHTML){O[H].setAttribute("id","selected"),v=H,e.src=l[v];break}setTimeout(fe,30)}window.addEventListener("keydown",function(e){n[e.keyCode||e.which]=!0}),window.addEventListener("keyup",function(e){n[e.keyCode||e.which]=!1}),window.onkeydown=function(){if(n[17]){var t=new Audio("audio/statusswitch.wav");for(t.volume=.2,t.play(),O[H].setAttribute("id",""),++H>6&&(H=0);0==S[H].innerHTML;)if(++H>6&&(H=0),0!=S[H].innerHTML){O[H].setAttribute("id","selected");break}O[H].setAttribute("id","selected"),v=H,e.src=l[v]}};var he=0;function ge(){E>Te&&(N.style.color="yellow",L++),0==L&&setTimeout(ge,30)}document.getElementById("creditbutton").onclick=function(){0==he?($("#credit").show(),he++):1==he&&($("#credit").hide(),he--)};var ye,be=document.getElementById("startbutton"),ve=document.getElementById("instructions"),we=document.getElementById("gameover"),Te=(null!=(ye=JSON.parse(window.localStorage.getItem("highscore")))&&(B.innerHTML=parseInt(ye)),ye);be.onclick=function(){be.style.display="none",ve.style.display="block",ve.onclick=function(){ve.style.display="none",ge(),se(),Z(),_(),le(),setTimeout(function(){me()},3e4),fe(),ee(),te(),ie(),ne(),oe(),pe()}},we.onclick=function(){document.location.reload(!0)}};