import{u as N,t as j,g as q}from"./api.BqjmK3op.js";const c=document.getElementById("setting-score"),x=document.getElementById("score-threshold-val"),v=document.getElementById("auto-apply-settings-form"),u=document.getElementById("auto-apply-logs-body"),s=document.getElementById("btn-trigger-test-apply"),a=document.getElementById("app-conversation-modal"),f=document.getElementById("close-conversation-modal"),h=document.getElementById("btn-close-conv-modal"),E=document.getElementById("detail-company-logo"),L=document.getElementById("detail-company-name"),w=document.getElementById("detail-source-badge"),B=document.getElementById("detail-match-score"),C=document.getElementById("detail-job-title"),A=document.getElementById("detail-applied-time"),i=document.getElementById("detail-screening-qa-list"),d=document.getElementById("detail-recruiter-message"),p=document.getElementById("detail-cover-letter"),I=document.getElementById("detail-ref-id"),k=document.getElementById("detail-ats-type"),l=document.getElementById("btn-copy-recruiter-msg"),r=document.getElementById("btn-copy-cover-letter");let g=[];c&&x&&c.addEventListener("input",()=>{x.textContent=`${c.value}%`});const T=document.querySelectorAll(".tab-btn");T.forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-tab");T.forEach(n=>{n.classList.remove("border-blue-600","text-blue-600"),n.classList.add("border-transparent","text-slate-500")}),t.classList.add("border-blue-600","text-blue-600"),t.classList.remove("border-transparent","text-slate-500"),["screening","message","cover","receipt"].forEach(n=>{const o=document.getElementById(`tab-panel-${n}`);o&&(n===e?o.classList.remove("hidden"):o.classList.add("hidden"))})})});function y(){a&&a.classList.add("hidden")}f&&f.addEventListener("click",y);h&&h.addEventListener("click",y);a&&a.addEventListener("click",t=>{t.target===a&&y()});l&&d&&l.addEventListener("click",()=>{navigator.clipboard.writeText(d.value).then(()=>{l.textContent="Copied!",setTimeout(()=>{l.textContent="Copy Message"},2e3)})});r&&p&&r.addEventListener("click",()=>{navigator.clipboard.writeText(p.value).then(()=>{r.textContent="Copied!",setTimeout(()=>{r.textContent="Copy Cover Letter"},2e3)})});function M(t){const e=g[t];if(!e)return;E&&(E.src=e.companyLogo||"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80"),L&&(L.textContent=e.companyName),C&&(C.textContent=e.jobTitle),B&&(B.textContent=`${e.matchScore}% Match`),w&&(w.textContent=e.directApplySource||"Direct ATS"),A&&(A.textContent=`Applied on ${new Date(e.appliedAt||Date.now()).toLocaleDateString()} at ${new Date(e.appliedAt||Date.now()).toLocaleTimeString()}`),I&&(I.textContent=e.id),k&&(k.textContent=e.directApplySource||"Direct Company Portal");const n=e.submissionMessage||`Hello ${e.companyName} Hiring Team,

I have submitted my application for the ${e.jobTitle} opening directly to your career portal. Given my verified technical experience, I am excited about the opportunity to contribute to your engineering milestones.

Best regards,
Alex Johnson`;d&&(d.value=n);const o=e.coverLetter||`Dear Hiring Manager at ${e.companyName},

I am writing to express my enthusiasm for the ${e.jobTitle} position. Given my background building scalable systems with high reliability, I am eager to apply my experience toward solving your team's core technical challenges.

Thank you for reviewing my direct application.

Sincerely,
Alex Johnson`;if(p&&(p.value=o),i){i.innerHTML="";const b=Object.entries(e.screeningAnswers||{});b.length===0?i.innerHTML=`
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs text-center">
            Standard direct application fields (Name, Email, Resume, Experience Level, LinkedIn) were automatically formatted and submitted.
          </div>
        `:b.forEach(([$,D],H)=>{const m=document.createElement("div");m.className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2",m.innerHTML=`
            <div class="flex items-start gap-2">
              <span class="text-xs font-black text-slate-400">Q${H+1}:</span>
              <p class="text-xs font-extrabold text-slate-900">${$}</p>
            </div>
            <div class="pl-5 border-l-2 border-blue-500 space-y-0.5">
              <span class="text-[10px] font-black uppercase tracking-wider text-blue-600 block">Bot Submitted Answer</span>
              <p class="text-xs text-slate-700 font-medium leading-relaxed">${D}</p>
            </div>
          `,i.appendChild(m)})}a&&a.classList.remove("hidden")}async function S(){try{g=(await q()).logs||[],R(g)}catch(t){console.error(t)}}function R(t){u&&(u.innerHTML="",t.forEach((e,n)=>{const o=document.createElement("tr");o.className="hover:bg-slate-50 transition-colors",o.innerHTML=`
        <td class="py-3.5 px-3">
          <div class="font-bold text-slate-900">${e.jobTitle}</div>
          <div class="text-[11px] text-slate-400">${e.companyName} • <span class="text-slate-500 font-medium">${e.directApplySource||"Direct ATS"}</span></div>
        </td>
        <td class="py-3.5 px-3 font-bold text-emerald-600">${e.matchScore}%</td>
        <td class="py-3.5 px-3 text-[11px] text-slate-500">${new Date(e.appliedAt||Date.now()).toLocaleDateString()}</td>
        <td class="py-3.5 px-3">
          <span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            ${e.status}
          </span>
        </td>
        <td class="py-3.5 px-3 text-right">
          <button 
            type="button" 
            class="px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-[11px] border border-blue-200 hover:border-blue-300 transition-all cursor-pointer inline-flex items-center gap-1.5"
            data-log-idx="${n}"
          >
            <span>View Bot Messages</span>
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </td>
      `,u.appendChild(o)}),document.querySelectorAll("[data-log-idx]").forEach(e=>{e.addEventListener("click",()=>{const n=parseInt(e.getAttribute("data-log-idx")||"0",10);M(n)})}))}v&&v.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("setting-enabled")?.checked,n=Number(c?.value)||80,o=Number(document.getElementById("setting-daily-limit")?.value)||20;await N({enabled:e,minMatchScore:n,dailyLimit:o}),alert("Auto-Apply preferences saved successfully!")});s&&s.addEventListener("click",async()=>{s.setAttribute("disabled","true"),s.innerHTML='<span class="inline-flex items-center gap-2"><svg class="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg><span>Evaluating Job & Submitting Directly...</span></span>';try{const t=await j();await S(),M(0)}catch(t){alert(t.message||"Auto-Apply triggered successfully.")}finally{s.removeAttribute("disabled"),s.innerHTML='<span>Run Test Auto-Apply</span> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'}});S();
