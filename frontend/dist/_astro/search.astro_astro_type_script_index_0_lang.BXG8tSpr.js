import{a as Qe}from"./api.BqjmK3op.js";let Pe=1,ne=0,T=3e5;const B=document.getElementById("jobs-container"),I=document.getElementById("jobs-count-text"),f=document.getElementById("skeleton-loader"),de=document.getElementById("search-form"),x=document.getElementById("search-input"),Ye=document.getElementById("exact-search-toggle"),He=document.getElementById("sort-selector"),g=document.getElementById("filter-workplace"),L=document.getElementById("filter-experience"),j=document.getElementById("filter-date"),ce=document.getElementById("btn-reset-filters"),me=document.getElementById("btn-load-more"),C=document.getElementById("btn-open-category-modal"),oe=document.getElementById("categories-modal"),Ze=document.getElementById("close-categories-modal"),et=document.getElementById("btn-apply-categories-modal"),tt=document.getElementById("btn-modal-cat-clear"),pe=document.getElementById("modal-cat-count"),S=document.getElementById("category-selected-label"),te=document.getElementById("btn-open-salary-modal"),le=document.getElementById("salary-modal"),at=document.getElementById("close-salary-modal"),nt=document.getElementById("btn-apply-salary-modal"),ot=document.getElementById("btn-reset-salary-modal"),Q=document.getElementById("salary-range-label"),ue=document.getElementById("salary-modal-range-display"),ye=document.getElementById("salary-modal-min-label"),ge=document.getElementById("salary-modal-max-label"),q=document.getElementById("slider-salary-min"),D=document.getElementById("slider-salary-max"),se=document.getElementById("all-filters-modal"),lt=document.getElementById("btn-all-filters"),st=document.getElementById("close-all-filters"),rt=document.getElementById("btn-apply-modal-filters"),N=document.getElementById("modal-range-salary-min"),J=document.getElementById("modal-range-salary-max"),fe=document.getElementById("modal-label-salary-min"),be=document.getElementById("modal-label-salary-max"),he=document.getElementById("modal-salary-range-display");function re(t){const a=new Set(t);if(document.querySelectorAll(".cat-modal-cb").forEach(e=>{e.checked=a.has(e.value)}),document.querySelectorAll(".modal-tax-cb").forEach(e=>{e.checked=a.has(e.value)}),pe&&(pe.textContent=`${t.length} categories selected`),S)if(t.length===0)S.textContent="Category: All (33)",C?.classList.remove("border-blue-600","text-blue-600","bg-blue-50/50");else if(t.length===1){const e=t[0].replace(/-/g," ").replace(/\b\w/g,n=>n.toUpperCase());S.textContent=e,C?.classList.add("border-blue-600","text-blue-600","bg-blue-50/50")}else{const e=t[0].replace(/-/g," ").replace(/\b\w/g,n=>n.toUpperCase());S.textContent=`${e} (+${t.length-1})`,C?.classList.add("border-blue-600","text-blue-600","bg-blue-50/50")}}function Oe(){const t=new Set;return document.querySelectorAll(".cat-modal-cb:checked").forEach(a=>t.add(a.value)),document.querySelectorAll(".modal-tax-cb:checked").forEach(a=>t.add(a.value)),Array.from(t)}document.querySelectorAll(".cat-modal-cb").forEach(t=>{t.addEventListener("change",()=>re(Oe()))});document.querySelectorAll(".modal-tax-cb").forEach(t=>{t.addEventListener("change",()=>re(Oe()))});C?.addEventListener("click",()=>oe?.classList.remove("hidden"));Ze?.addEventListener("click",()=>oe?.classList.add("hidden"));et?.addEventListener("click",()=>{oe?.classList.add("hidden"),c(1)});tt?.addEventListener("click",()=>re([]));function z(t,a){ne=t,T=a;const e=t===0?"$0k":`$${Math.round(t/1e3)}k`,n=a>=3e5?"$300k+":`$${Math.round(a/1e3)}k`;q&&(q.value=String(t)),D&&(D.value=String(a)),N&&(N.value=String(t)),J&&(J.value=String(a)),ye&&(ye.textContent=`${e} / yr`),ge&&(ge.textContent=`${n} / yr`),fe&&(fe.textContent=`${e} / yr`),be&&(be.textContent=`${n} / yr`);const l=t===0&&a>=3e5?"$0 - $300k+ / yr":`${e} - ${n} / yr`;ue&&(ue.textContent=l),he&&(he.textContent=l),Q&&(t===0&&a>=3e5?(Q.textContent="Salary: Any",te?.classList.remove("border-blue-600","text-blue-600","bg-blue-50/50")):(Q.textContent=`${e} - ${n}`,te?.classList.add("border-blue-600","text-blue-600","bg-blue-50/50")))}function _e(t){let a=T;t>a&&(a=t),z(t,a)}function Ve(t){let a=ne;t<a&&(a=t),z(a,t)}q?.addEventListener("input",()=>_e(Number(q.value)));D?.addEventListener("input",()=>Ve(Number(D.value)));N?.addEventListener("input",()=>_e(Number(N.value)));J?.addEventListener("input",()=>Ve(Number(J.value)));document.querySelectorAll(".btn-salary-preset").forEach(t=>{t.addEventListener("click",()=>{const a=Number(t.dataset.min||"0"),e=Number(t.dataset.max||"300000");z(a,e)})});te?.addEventListener("click",()=>le?.classList.remove("hidden"));at?.addEventListener("click",()=>le?.classList.add("hidden"));nt?.addEventListener("click",()=>{le?.classList.add("hidden"),c(1)});ot?.addEventListener("click",()=>{z(0,3e5)});lt?.addEventListener("click",()=>se?.classList.remove("hidden"));st?.addEventListener("click",()=>se?.classList.add("hidden"));rt?.addEventListener("click",()=>{se?.classList.add("hidden"),c(1)});async function c(t=1){Pe=t,f&&f.classList.remove("hidden");const a=x?x.value:"",e=Ye?.checked?"EXACT":"FLEXIBLE",n=He?.value||"RELEVANCE",l=g?.value?[g.value]:[],m=getSelectedCategories(),X=L?.value?[L.value]:[],We=j?.value||"all",Xe=ne,Ke=T>=3e5?0:T;try{const K=await Qe({page:t,pageSize:10,query:a,queryMode:e,sort:n,filters:{workArrangements:l,taxonomies:m,experienceLevels:X,salaryMinimum:Xe,salaryMaximum:Ke,datePosted:We,worldwide:!1}});f&&f.classList.add("hidden"),I&&(I.innerHTML=`Showing <span class="text-blue-600 font-extrabold">${K.totalJobs}</span> verified company jobs`),it(K.items,t>1)}catch{f&&f.classList.add("hidden"),I&&(I.textContent="Failed to load jobs.")}}function it(t,a=!1){if(B){if(a||(B.innerHTML=""),t.length===0){B.innerHTML=`
        <div class="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h4 class="font-bold text-slate-900 text-lg">No direct jobs match these exact filters</h4>
          <p class="text-xs text-slate-500 max-w-sm mx-auto">Try broadening your keywords, resetting salary filters, or enabling worldwide remote search.</p>
        </div>
      `;return}t.forEach(e=>{const n=document.createElement("article");n.className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-card-hover transition-all space-y-4";const l=e.salary?.min?`$${e.salary.min.toLocaleString()} - $${(e.salary.max||e.salary.min).toLocaleString()} / yr`:"Competitive Salary",m=ct(e.published);n.innerHTML=`
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div class="flex items-start gap-3.5">
            <img 
              src="${e.company.logo}" 
              alt="${e.company.name} logo" 
              class="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
              onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=64&q=80'"
            />
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-bold text-slate-600">${e.company.name}</span>
                <span class="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Verified</span>
                <span class="text-[10px] text-slate-400">${m}</span>
              </div>
              <h3 class="text-lg font-bold text-slate-900 tracking-tight mt-0.5 hover:text-blue-600 transition-colors cursor-pointer btn-view-job"
                data-job-id="${e.id}"
                data-job-title="${(e.title||"").replace(/"/g,"&quot;")}"
                data-company-name="${(e.company?.name||"").replace(/"/g,"&quot;")}"
                data-company-logo="${e.company?.logo||""}"
                data-job-locations="${(e.locations||[]).join(" • ")}"
                data-salary-badge="${l}"
                data-work-arrangement="${e.workArrangement||""}"
                data-posted-label="${m}"
                data-job-description="${(e.descriptionExcerpt||"").replace(/"/g,"&quot;")}"
                data-job-description-full="${(e.descriptionFull||e.descriptionExcerpt||"").replace(/"/g,"&quot;")}"
                data-job-skills="${(e.skills||[]).join(",")}"
                data-apply-url="${e.applicationUrl||""}"
                data-direct-source="${e.directApplySource||"Direct ATS"}"
              >
                ${e.title}
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">${e.locations.join(" • ")}</p>
            </div>
          </div>

          <div class="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
            <span class="text-xs font-black bg-blue-50/70 border border-blue-100 px-2.5 py-1 rounded-full text-blue-800">
              ${l}
            </span>
          </div>
        </div>

        <p 
          class="text-xs sm:text-sm text-slate-600 leading-relaxed hover:text-slate-900 transition-colors cursor-pointer btn-view-job"
          data-job-id="${e.id}"
          data-job-title="${(e.title||"").replace(/"/g,"&quot;")}"
          data-company-name="${(e.company?.name||"").replace(/"/g,"&quot;")}"
          data-company-logo="${e.company?.logo||""}"
          data-job-locations="${(e.locations||[]).join(" • ")}"
          data-salary-badge="${l}"
          data-work-arrangement="${e.workArrangement||""}"
          data-posted-label="${m}"
          data-job-description="${(e.descriptionExcerpt||"").replace(/"/g,"&quot;")}"
          data-job-description-full="${(e.descriptionFull||e.descriptionExcerpt||"").replace(/"/g,"&quot;")}"
          data-job-skills="${(e.skills||[]).join(",")}"
          data-apply-url="${e.applicationUrl||""}"
          data-direct-source="${e.directApplySource||"Direct ATS"}"
        >
          ${e.descriptionExcerpt}
        </p>

        <div class="flex flex-wrap items-center gap-1.5 pt-1">
          <span class="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
            ${e.workArrangement}
          </span>
          ${e.skills.slice(0,4).map(X=>`
            <span class="text-[11px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100">
              ${X}
            </span>
          `).join("")}
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <button 
              type="button" 
              class="text-xs font-semibold text-slate-400 hover:text-slate-600 btn-report" 
              data-job-id="${e.id}"
              data-job-title="${(e.title||"").replace(/"/g,"&quot;")}"
              data-company-name="${(e.company?.name||"").replace(/"/g,"&quot;")}"
            >
              Report Job
            </button>
            <button
              type="button"
              class="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline btn-view-job flex items-center gap-1 cursor-pointer"
              data-job-id="${e.id}"
              data-job-title="${(e.title||"").replace(/"/g,"&quot;")}"
              data-company-name="${(e.company?.name||"").replace(/"/g,"&quot;")}"
              data-company-logo="${e.company?.logo||""}"
              data-job-locations="${(e.locations||[]).join(" • ")}"
              data-salary-badge="${l}"
              data-work-arrangement="${e.workArrangement||""}"
              data-posted-label="${m}"
              data-job-description="${(e.descriptionExcerpt||"").replace(/"/g,"&quot;")}"
              data-job-description-full="${(e.descriptionFull||e.descriptionExcerpt||"").replace(/"/g,"&quot;")}"
              data-job-skills="${(e.skills||[]).join(",")}"
              data-apply-url="${e.applicationUrl||""}"
              data-direct-source="${e.directApplySource||"Direct ATS"}"
            >
              <span>View Description ▾</span>
            </button>
          </div>

          <button 
            type="button" 
            class="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all btn-apply"
            data-job-id="${e.id}"
            data-job-title="${e.title}"
            data-company-name="${e.company.name}"
            data-job-description="${(e.descriptionExcerpt||"").replace(/"/g,"&quot;")}"
            data-job-skills="${e.skills.join(",")}"
            data-apply-url="${e.applicationUrl||""}"
          >
            Apply Directly →
          </button>
        </div>
      `,B.appendChild(n)}),Ge()}}function Ge(){document.querySelectorAll(".btn-apply").forEach(t=>{t.onclick=()=>{const a=t;ie({jobId:a.dataset.jobId||"",jobTitle:a.dataset.jobTitle||"",companyName:a.dataset.companyName||"",jobDescription:a.dataset.jobDescription||"",jobSkills:(a.dataset.jobSkills||"").split(",").filter(Boolean),applyUrl:a.dataset.applyUrl||""})}}),document.querySelectorAll(".btn-report").forEach(t=>{t.onclick=()=>{const a=t;ze({id:a.dataset.jobId||"",title:a.dataset.jobTitle||"",company:a.dataset.companyName||""})}}),document.querySelectorAll(".btn-view-job").forEach(t=>{t.onclick=a=>{a.stopPropagation();const e=t;dt({id:e.dataset.jobId||"",title:e.dataset.jobTitle||"",companyName:e.dataset.companyName||"",companyLogo:e.dataset.companyLogo||"",locations:e.dataset.jobLocations||"",salaryBadge:e.dataset.salaryBadge||"",workArrangement:e.dataset.workArrangement||"",postedLabel:e.dataset.postedLabel||"",descriptionExcerpt:e.dataset.jobDescription||"",descriptionFull:e.dataset.jobDescriptionFull||e.dataset.jobDescription||"",skills:(e.dataset.jobSkills||"").split(",").filter(Boolean),applyUrl:e.dataset.applyUrl||"",directSource:e.dataset.directSource||"Direct ATS"})}})}de&&de.addEventListener("submit",t=>{t.preventDefault(),c(1)});[g,L,j,He].forEach(t=>{t&&t.addEventListener("change",()=>c(1))});ce&&ce.addEventListener("click",()=>{x&&(x.value=""),g&&(g.value=""),L&&(L.value=""),j&&(j.value="all"),syncCategoryCheckboxes([]),updateSalaryUI(0,3e5),c(1)});me&&me.addEventListener("click",()=>{c(Pe+1)});let o=null;const u=document.getElementById("job-details-modal"),xe=document.getElementById("close-job-details-modal"),ve=document.getElementById("detail-job-logo"),Ee=document.getElementById("detail-job-company"),Le=document.getElementById("detail-job-posted"),ke=document.getElementById("detail-job-title-heading"),Be=document.getElementById("detail-job-loc"),Ie=document.getElementById("detail-job-salary"),Se=document.getElementById("detail-job-work-type"),we=document.getElementById("detail-job-full-description"),w=document.getElementById("detail-job-skills-list"),$e=document.getElementById("btn-details-apply-direct"),Ce=document.getElementById("btn-details-ai-apply"),Me=document.getElementById("btn-details-report");function dt(t){o=t,ve&&(ve.src=t.companyLogo||"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=64&q=80"),Ee&&(Ee.textContent=t.companyName||"Company"),Le&&(Le.textContent=t.postedLabel||"Recently verified"),ke&&(ke.textContent=t.title||"Job Title"),Be&&(Be.textContent=`${t.locations||"Worldwide"} • ${t.workArrangement||"Remote"}`),Ie&&(Ie.textContent=t.salaryBadge||"Competitive Salary"),Se&&(Se.textContent=t.workArrangement||"Direct Hire"),we&&(we.textContent=t.descriptionFull||t.descriptionExcerpt||"Direct ATS verified posting. Check employer portal for full role requirements."),w&&(w.innerHTML="",t.skills&&t.skills.length>0?t.skills.forEach(a=>{if(!a.trim())return;const e=document.createElement("span");e.className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700",e.textContent=a.trim(),w.appendChild(e)}):w.innerHTML='<span class="text-xs text-slate-400">Direct ATS listing. Check employer portal for complete skill breakdown.</span>'),u&&u.classList.remove("hidden")}function k(){u&&u.classList.add("hidden")}xe&&xe.addEventListener("click",k);u&&u.addEventListener("click",t=>{t.target===u&&k()});$e&&$e.addEventListener("click",()=>{o?.applyUrl&&o.applyUrl!=="#"?window.open(o.applyUrl,"_blank","noopener,noreferrer"):(k(),o&&ie({jobId:o.id,jobTitle:o.title,companyName:o.companyName,jobDescription:o.descriptionExcerpt,jobSkills:o.skills,applyUrl:o.applyUrl}))});Ce&&Ce.addEventListener("click",()=>{k(),o&&ie({jobId:o.id,jobTitle:o.title,companyName:o.companyName,jobDescription:o.descriptionExcerpt,jobSkills:o.skills,applyUrl:o.applyUrl})});Me&&Me.addEventListener("click",()=>{k(),o&&ze({id:o.id,title:o.title,company:o.companyName})});let M={id:"",title:"",company:""};const y=document.getElementById("report-job-modal"),Ae=document.getElementById("close-report-modal"),Te=document.getElementById("btn-cancel-report"),p=document.getElementById("btn-submit-report"),U=document.getElementById("report-form-container"),R=document.getElementById("report-form-footer"),F=document.getElementById("report-success-state"),je=document.getElementById("btn-close-report-success"),qe=document.getElementById("report-target-title"),De=document.getElementById("report-target-company"),P=document.getElementById("report-comments"),H=document.getElementById("report-user-email");function ze(t){M=t,qe&&(qe.textContent=t.title||"Selected Job"),De&&(De.textContent=t.company||"Direct ATS Listing"),P&&(P.value="");try{const a=localStorage.getItem("ch_user");if(a&&H){const e=JSON.parse(a);e?.email&&(H.value=e.email)}}catch{}U&&U.classList.remove("hidden"),R&&R.classList.remove("hidden"),F&&F.classList.add("hidden"),y&&y.classList.remove("hidden")}function W(){y&&y.classList.add("hidden")}Ae&&Ae.addEventListener("click",W);Te&&Te.addEventListener("click",W);je&&je.addEventListener("click",W);y&&y.addEventListener("click",t=>{t.target===y&&W()});p&&p.addEventListener("click",async()=>{const t=document.querySelector('input[name="report-reason"]:checked'),a=t?t.value:"broken_link",e=P?P.value.trim():"",n=H?H.value.trim():"",l=p.innerHTML;p.setAttribute("disabled","true"),p.innerHTML='<span class="inline-flex items-center gap-2"><svg class="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg><span>Submitting...</span></span>';try{await fetch("http://localhost:4000/api/job-search/not-relevant",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jobId:M.id,jobTitle:M.title,companyName:M.company,reason:a,comment:e,email:n})})}catch{}p.removeAttribute("disabled"),p.innerHTML=l,U&&U.classList.add("hidden"),R&&R.classList.add("hidden"),F&&F.classList.remove("hidden")});let r=null;const i=document.getElementById("ai-apply-modal"),Ne=document.getElementById("close-ai-modal"),Je=document.getElementById("modal-job-title"),Ue=document.getElementById("modal-company-name"),O=document.getElementById("modal-match-bar"),_=document.getElementById("modal-match-pct"),ae=document.getElementById("modal-resume-text"),v=document.getElementById("btn-generate-cover"),b=document.getElementById("cover-letter-section"),h=document.getElementById("screening-section"),V=document.getElementById("modal-cover-letter"),Re=document.getElementById("screening-answers"),d=document.getElementById("generating-state"),s=document.getElementById("generate-error"),Fe=document.getElementById("modal-apply-link"),$=document.getElementById("btn-copy-cover");let G=null,A="";function ct(t){if(!t)return"";const a=Date.now()-new Date(t).getTime(),e=Math.floor(a/6e4);if(e<60)return`${e}m ago`;const n=Math.floor(e/60);return n<24?`${n}h ago`:`${Math.floor(n/24)}d ago`}function ie(t){r=t,A=t.applyUrl||"",G=null,Je&&(Je.textContent=t.jobTitle),Ue&&(Ue.textContent=t.companyName),O&&(O.style.width="0%"),_&&(_.textContent="–"),b&&b.classList.add("hidden"),h&&h.classList.add("hidden"),d&&d.classList.add("hidden"),s&&(s.classList.add("hidden"),s.textContent=""),i&&i.classList.remove("hidden");const a=localStorage.getItem("ch_resume_text");a&&ae&&(ae.value=a)}Ne&&i&&(Ne.addEventListener("click",()=>i.classList.add("hidden")),i.addEventListener("click",t=>{t.target===i&&i.classList.add("hidden")}));Fe&&Fe.addEventListener("click",async()=>{if(r){try{await fetch("http://localhost:4000/api/auto-apply/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jobId:r.jobId,jobTitle:r.jobTitle,companyName:r.companyName,matchScore:G?.matchScore||0,screeningAnswers:G?.screeningAnswers||{}})})}catch{}A&&A!=="#"&&window.open(A,"_blank","noopener,noreferrer"),i&&i.classList.add("hidden")}});$&&$.addEventListener("click",()=>{V?.value&&navigator.clipboard.writeText(V.value).then(()=>{$.textContent="Copied!",setTimeout(()=>{$.textContent="Copy"},2e3)})});v&&v.addEventListener("click",async()=>{const t=ae?.value?.trim()||"";if(!t){s&&(s.textContent="Please paste your resume or background text first.",s.classList.remove("hidden"));return}if(r){localStorage.setItem("ch_resume_text",t),s&&s.classList.add("hidden"),b&&b.classList.add("hidden"),h&&h.classList.add("hidden"),d&&d.classList.remove("hidden"),v.disabled=!0;try{const a=await fetch("http://localhost:4000/api/auto-apply/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jobId:r.jobId,jobTitle:r.jobTitle,companyName:r.companyName,jobDescription:r.jobDescription,jobSkills:r.jobSkills,resumeText:t})}),e=await a.json();if(d&&d.classList.add("hidden"),v.disabled=!1,!a.ok||e.error)throw new Error(e.error||"Generation failed");G=e,e.matchScore!==void 0&&(O&&(O.style.width=`${e.matchScore}%`),_&&(_.textContent=`${e.matchScore}%`)),e.coverLetter&&V&&(V.value=e.coverLetter,b&&b.classList.remove("hidden")),e.screeningAnswers&&Re&&Object.keys(e.screeningAnswers).length&&(Re.innerHTML=Object.entries(e.screeningAnswers).map(([n,l])=>`
            <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p class="font-semibold text-slate-700 mb-1">${n}</p>
              <p class="text-slate-600">${l}</p>
            </div>
          `).join(""),h&&h.classList.remove("hidden"))}catch(a){d&&d.classList.add("hidden"),v.disabled=!1,s&&(s.textContent=a.message||"Failed to generate. Please try again.",s.classList.remove("hidden"))}}});Ge();const E=new URLSearchParams(window.location.search),Y=E.get("q")||E.get("query")||E.get("role")||"",Z=E.get("category")||"",ee=E.get("workplace")||"";(Y||Z||ee)&&(Y&&x&&(x.value=Y),Z&&syncCategoryCheckboxes([Z]),ee&&g&&(g.value=ee),c(1));
