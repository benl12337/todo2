(()=>{"use strict";function e(e){return{name:e,index:0,description:"",dueDate:new Date}}function t(e){return{name:e,tasks:[]}}const n=document.querySelector(".div2 .tasks"),s=document.querySelector(".div3"),d=document.querySelector(".detailsTitle"),a=document.querySelector(".taskInput input"),c=document.querySelector("#closeBtn"),l=document.querySelector("#deleteBtn"),o=document.querySelector("#delete-warning"),r=document.querySelector("#cancel-delete"),i=document.querySelector("#delete-task"),u=document.querySelector(".delete-warning"),m=document.querySelector(".additionalInputs");let k=new t("main"),p=null,y=0;function L(e,t){n.innerHTML="";for(let a=0;a<e.tasks.length;a++){const c=document.createElement("div");c.textContent=e.tasks[a].name,c.classList.add("taskRow"),c.dataset.index=e.tasks[a].index,c.addEventListener("click",(t=>{s.classList.remove("hidden"),p=t.target.dataset.index,d.textContent=e.tasks[p].name})),t&&a==e.tasks.length-1&&c.classList.add("animate"),n.prepend(c)}a.value=""}function v(e,t){e.tasks.push(t),t.index=y++,L(k,!1)}a.addEventListener("focus",(()=>{m.classList.toggle("scaleUp")})),a.addEventListener("focusout",(()=>{m.classList.toggle("scaleUp")})),c.addEventListener("click",(()=>{s.classList.add("hidden")})),l.addEventListener("click",(()=>{u.innerHTML=`<span id="bold">${t.tasks[p].name}</span> will be permanently deleted.`,o.prepend(u),o.showModal()})),i.addEventListener("click",(()=>{o.close(),t.tasks.splice(p,1);for(let e=0;e<tasks.length;e++)t.tasks[e].index=e;L(k,!1)})),r.addEventListener("click",(()=>{o.close()})),document.addEventListener("keypress",(t=>{"Enter"==t.key&&(v(k,new e(a.value)),console.log("yay!"),L(k,!0))}));const g=new e("Clean room"),q=new e("Wash car");v(k,g),v(k,q),L(k,!1)})();