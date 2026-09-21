import{a as C}from"./auth-client.BA7uMfan.js";const g=document.getElementById("auth-loading"),b=document.getElementById("dashboard");async function j(){try{const{data:t}=await C.getSession();if(t?.user){localStorage.setItem("ch_user",JSON.stringify({id:t.user.id,name:t.user.name,email:t.user.email,plan:t.user.plan||"free",isSubscribed:t.user.isSubscribed||!1,onboardingCompleted:t.user.onboardingCompleted||!1,createdAt:t.user.createdAt})),localStorage.setItem("ch_authenticated","1"),g&&g.classList.add("hidden"),b&&b.classList.remove("hidden"),w(t.user);return}}catch{}const e=localStorage.getItem("ch_user"),s=localStorage.getItem("ch_authenticated");if(e&&s){const t=JSON.parse(e);g&&g.classList.add("hidden"),b&&b.classList.remove("hidden"),w(t);return}window.location.href="/login?next=/account"}j();function w(e){const s=(e.name||"U").split(" ").map(D=>D[0]).join("").slice(0,2).toUpperCase(),t=document.getElementById("user-initials"),o=document.getElementById("user-greeting"),d=document.getElementById("user-email-display"),l=document.getElementById("user-plan-badge"),a=document.getElementById("stat-plan");t&&(t.textContent=s),o&&(o.textContent=`Welcome back, ${e.name?.split(" ")[0]||"there"} 👋`),d&&(d.textContent=e.email);const n=e.isSubscribed||e.plan!=="free",i=n?e.plan==="pro_monthly"?"Pro Monthly":e.plan==="yearly"||e.plan==="lifetime"?"1-Year Pass":"Pro":"Free Plan";l&&(l.textContent=n?`⭐ ${i}`:"🆓 Free Plan",n&&l.classList.add("bg-amber-500/30","border-amber-400/50")),a&&(a.textContent=n?i:"Free");const m=document.getElementById("profile-avatar"),c=document.getElementById("profile-name"),p=document.getElementById("profile-email"),r=document.getElementById("profile-plan"),f=document.getElementById("profile-created");m&&(m.textContent=s),c&&(c.textContent=e.name),p&&(p.textContent=e.email),r&&(r.textContent=i),f&&e.createdAt&&(f.textContent=new Date(e.createdAt).toLocaleDateString("en-US",{month:"long",year:"numeric"}));const y=document.getElementById("sub-plan-name"),x=document.getElementById("sub-plan-desc"),v=document.getElementById("upgrade-section"),E=document.getElementById("billing-section"),I=document.getElementById("sub-pro-feature");y&&(y.textContent=n?i:"Free"),x&&(x.textContent=n?"Full access — unlimited job search, AI cover letters, and application tracking":"Limited access — upgrade for full job board & AI apply"),n&&(v&&v.classList.add("hidden"),E&&E.classList.remove("hidden"),I&&I.classList.remove("hidden"));const L=localStorage.getItem("ch_resume_text"),S=document.getElementById("profile-resume-text");L&&S&&(S.value=L),_()}async function _(){try{const t=(await(await fetch("http://localhost:4000/api/auto-apply/logs")).json()).logs||[],o=new Date().toDateString(),d=t.filter(r=>new Date(r.appliedAt||"").toDateString()===o),l=t.length?Math.round(t.reduce((r,f)=>r+(f.matchScore||0),0)/t.length):0,a=document.getElementById("stat-applied"),n=document.getElementById("stat-today"),i=document.getElementById("stat-avg-match");a&&(a.textContent=String(t.length)),n&&(n.textContent=String(d.length)),i&&(i.textContent=l?`${l}%`:"–");const m=document.getElementById("apps-loading"),c=document.getElementById("apps-list"),p=document.getElementById("apps-empty");if(m&&m.classList.add("hidden"),t.length===0){p&&p.classList.remove("hidden");return}c&&(c.classList.remove("hidden"),P(t,c))}catch{const s=document.getElementById("apps-loading"),t=document.getElementById("apps-empty");s&&s.classList.add("hidden"),t&&t.classList.remove("hidden")}}function P(e,s){const t=document.getElementById("filter-status");function o(){const d=t?.value||"all",l=d==="all"?e:e.filter(a=>a.status===d);s.innerHTML=l.length===0?'<div class="text-center py-12 text-slate-400 text-sm">No applications match this filter.</div>':l.map(a=>{const n=`status-${a.status}`,i=a.appliedAt?new Date(a.appliedAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}):"Pending";return`
              <article class="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-all">
                <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                  <img
                    src="${a.companyLogo}"
                    alt="${a.companyName}"
                    class="w-12 h-12 rounded-xl object-cover border border-slate-100 bg-slate-50 shrink-0"
                    onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=64&q=80'"
                  />
                  <div class="flex-1 min-w-0">
                    <div class="flex flex-wrap items-center gap-2 mb-1">
                      <span class="text-[11px] font-bold ${n} px-2 py-0.5 rounded-full border">${a.status}</span>
                      ${a.matchScore?`<span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">${a.matchScore}% match</span>`:""}
                    </div>
                    <h3 class="font-extrabold text-slate-900 truncate">${a.jobTitle}</h3>
                    <p class="text-sm text-slate-500">${a.companyName} · Applied ${i}</p>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      class="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors btn-view-app"
                      data-app-id="${a.id}"
                      data-job-title="${a.jobTitle}"
                      data-company="${a.companyName}"
                      data-answers='${JSON.stringify(a.screeningAnswers||{})}'
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            `}).join(""),s.querySelectorAll(".btn-view-app").forEach(a=>{a.addEventListener("click",()=>{const n=a;N({id:n.dataset.appId||"",jobTitle:n.dataset.jobTitle||"",company:n.dataset.company||"",answers:JSON.parse(n.dataset.answers||"{}")})})})}o(),t&&t.addEventListener("change",o)}let u=null;function k(){const e=document.createElement("div");return e.id="app-detail-modal",e.className="fixed inset-0 z-50 hidden bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4",e.innerHTML=`
      <div class="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        <div class="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 class="font-extrabold text-slate-900 text-lg" id="modal-app-title">Application Details</h3>
          <button type="button" id="close-app-modal" class="text-slate-400 hover:text-slate-700 text-xl font-bold p-1">✕</button>
        </div>
        <div class="p-6 overflow-y-auto flex-1 space-y-4" id="modal-app-body"></div>
      </div>
    `,document.body.appendChild(e),e.querySelector("#close-app-modal")?.addEventListener("click",()=>e.classList.add("hidden")),e.addEventListener("click",s=>{s.target===e&&e.classList.add("hidden")}),e}function N({id:e,jobTitle:s,company:t,answers:o}){u||(u=k());const d=u.querySelector("#modal-app-title"),l=u.querySelector("#modal-app-body");if(d&&(d.textContent=`${s} at ${t}`),l){const a=Object.entries(o).length?Object.entries(o).map(([n,i])=>`
            <div class="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p class="text-xs font-bold text-slate-600 mb-1">${n}</p>
              <p class="text-sm text-slate-800">${i}</p>
            </div>
          `).join(""):'<p class="text-sm text-slate-400">No screening answers recorded.</p>';l.innerHTML=`
        <p class="text-xs text-slate-500">Application ID: <span class="font-mono text-slate-700">${e}</span></p>
        <h4 class="text-sm font-extrabold text-slate-800">AI-Prepared Screening Answers</h4>
        ${a}
      `}u.classList.remove("hidden")}document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.tab||"";document.querySelectorAll(".tab-btn").forEach(o=>{o.classList.remove("active","border-blue-600","text-blue-600"),o.classList.add("border-transparent","text-slate-600")}),e.classList.add("active","border-blue-600","text-blue-600"),e.classList.remove("border-transparent","text-slate-600"),document.querySelectorAll(".tab-panel").forEach(o=>o.classList.add("hidden"));const t=document.getElementById(`tab-${s}`);t&&t.classList.remove("hidden")})});const B=document.getElementById("btn-save-resume"),A=document.getElementById("profile-resume-text"),h=document.getElementById("resume-saved-msg");B&&B.addEventListener("click",()=>{A?.value&&(localStorage.setItem("ch_resume_text",A.value),h&&(h.classList.remove("hidden"),setTimeout(()=>h.classList.add("hidden"),3e3)))});const $=document.getElementById("btn-logout");$&&$.addEventListener("click",async()=>{try{await C.signOut()}catch{}localStorage.removeItem("ch_token"),localStorage.removeItem("ch_user"),localStorage.removeItem("ch_authenticated"),window.location.href="/login"});
