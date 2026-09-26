import{s as ye}from"./api.CZoghtsc.js";import{a as Me}from"./auth-client.D3LPu-IL.js";function L(){const e=localStorage.getItem("ch_token"),o=localStorage.getItem("ch_user");let t=null;if(o)try{t=JSON.parse(o)}catch{}const a=!!(e||t),s=!!(t?.isSubscribed||t?.plan&&t?.plan!=="free");return{isLoggedIn:a,isSubscribed:s,user:t}}function we(){const{isLoggedIn:e,isSubscribed:o}=L();if(o){document.getElementById("ssr-paywall-card")?.remove(),document.getElementById("ssr-blurred-teasers")?.remove(),document.getElementById("client-paywall-card")?.remove(),document.getElementById("client-blurred-teasers")?.remove();return}const t=[document.getElementById("ssr-paywall-card"),document.getElementById("client-paywall-card")].filter(Boolean);for(const a of t){const s=a.querySelector(".paywall-badge-text"),n=a.querySelector(".paywall-title-text"),r=a.querySelector(".paywall-desc-text"),l=a.querySelector(".paywall-actions")||a.querySelector("#ssr-paywall-actions"),c=E>0?E.toLocaleString():"45,000";e?(s&&(s.textContent=`Free Plan • Previewing 5 of ${c}+ Direct Roles`),n&&(n.textContent=`Upgrade to Unlock All ${c}+ Direct ATS Jobs`),r&&(r.textContent="You are signed in on the Free Plan. Upgrade from just $5.99/wk for unlimited direct application links and real-time salary benchmarks."),l&&(l.innerHTML=`
            <button
              type="button"
              data-trigger-checkout
              data-tier="weekly"
              class="btn-trigger-checkout-dynamic w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>Unlock Weekly Pass ($5.99/wk)</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>

            <button
              type="button"
              data-trigger-checkout
              data-tier="monthly"
              class="btn-trigger-checkout-dynamic w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
            >
              <span>Monthly Pro ($19.99/mo)</span>
            </button>

            <a
              href="/pricing"
              class="text-xs text-blue-300 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              All plans →
            </a>
          `)):(s&&(s.textContent=`Free Preview • 5 of ${c}+ Direct Roles`),n&&(n.textContent=`Unlock ${c}+ Direct ATS Jobs & Apply Instantly`),r&&(r.textContent="You've reached the free preview limit. Apply directly on company career portals before roles get flooded by crowded 200+ LinkedIn queues."),l&&(l.innerHTML=`
            <button
              type="button"
              data-trigger-checkout
              data-tier="weekly"
              class="btn-trigger-checkout-dynamic w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>Unlock with Weekly Pass ($5.99/wk)</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>

            <a
              href="/login?tab=signup&next=/job-search/all"
              class="paywall-guest-link w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all flex items-center justify-center gap-1.5 text-center"
            >
              <span>Create Free Account</span>
            </a>

            <a
              href="/pricing"
              class="text-xs text-blue-300 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              All plans →
            </a>
          `)),a.querySelectorAll(".btn-trigger-checkout-dynamic").forEach(m=>{m.addEventListener("click",k=>{k.preventDefault();const i=m,u=i.getAttribute("data-tier")||"weekly";window.triggerCheckout?window.triggerCheckout(u,i):window.location.href="/pricing"})})}}const N=document.getElementById("auth-gate-modal"),he=document.getElementById("auth-gate-reason"),Te=document.getElementById("btn-close-auth-gate");function O(e){const{isLoggedIn:o}=L(),t=document.getElementById("auth-gate-guest-actions"),a=document.getElementById("auth-gate-user-actions");o?(t?.classList.add("hidden"),a?.classList.remove("hidden")):(t?.classList.remove("hidden"),a?.classList.add("hidden")),he&&e&&(he.textContent=e),N&&N.classList.remove("hidden")}function ke(){N&&N.classList.add("hidden")}Te?.addEventListener("click",ke);N?.addEventListener("click",e=>{e.target===N&&ke()});const Ee=[{label:"Engineering",value:"engineering"},{label:"Software",value:"software"},{label:"Technology",value:"technology"},{label:"Data & Analytics",value:"data-and-analytics"},{label:"Art & Design",value:"art-and-design"},{label:"Creative & Media",value:"creative-and-media"},{label:"Management & Leadership",value:"management-and-leadership"},{label:"Consulting",value:"consulting"},{label:"Administrative",value:"administrative"},{label:"Legal",value:"legal"},{label:"Finance & Accounting",value:"finance-and-accounting"},{label:"Human Resources",value:"human-resources"},{label:"Manufacturing",value:"manufacturing"},{label:"Environmental & Sustainability",value:"environmental-and-sustainability"},{label:"Security & Safety",value:"security-and-safety"},{label:"Science & Research",value:"science-and-research"},{label:"Food & Beverage",value:"food-and-beverage"},{label:"Hospitality",value:"hospitality"},{label:"Sales",value:"sales"},{label:"Marketing",value:"marketing"},{label:"Government & Public Sector",value:"government-and-public-sector"},{label:"Healthcare",value:"healthcare"},{label:"Agriculture",value:"agriculture"},{label:"Education",value:"education"},{label:"Customer Service & Support",value:"customer-service-and-support"},{label:"Social Services",value:"social-services"},{label:"Construction",value:"construction"},{label:"Trades",value:"trades"},{label:"Transportation",value:"transportation"},{label:"Logistics",value:"logistics"},{label:"Retail",value:"retail"},{label:"Energy",value:"energy"},{label:"Sports & Recreation",value:"sports-and-recreation"}];let g=new Set,v=new Set,f="",x="",S="",P="",F=!1,$=!1,Se="RELEVANCE",y=1,E=0,H=[];const De=document.getElementById("search-form"),W=document.getElementById("search-input"),re=document.getElementById("exact-search-toggle"),p=document.getElementById("jobs-container"),j=document.getElementById("jobs-skeleton"),Y=document.getElementById("jobs-count-number"),le=document.getElementById("active-filter-chips"),Pe=document.getElementById("btn-reset-filters"),be=document.getElementById("sort-select"),A=document.getElementById("filter-remote"),M=document.getElementById("filter-salary"),T=document.getElementById("filter-date"),G=document.getElementById("btn-toggle-saved"),fe=document.getElementById("saved-count-badge"),h=document.getElementById("btn-prev-page"),d=document.getElementById("btn-next-page"),I=document.getElementById("page-indicator"),Le=document.getElementById("category-select-box"),ne=document.getElementById("category-selected-pills"),X=document.getElementById("category-search-input"),ie=document.getElementById("category-dropdown-menu"),Ie=document.getElementById("country-select-box"),oe=document.getElementById("country-selected-pills"),Z=document.getElementById("country-search-input"),ce=document.getElementById("country-dropdown-menu");let se=null;function V(e,o=!0,t="/account#saved",a="View in Account"){const s=document.getElementById("save-toast"),n=document.getElementById("toast-message"),r=document.getElementById("toast-icon"),l=document.getElementById("toast-link");!s||!n||!r||(n.textContent=e,r.textContent=o?"✓":"✕",r.className=o?"text-base font-bold text-emerald-400":"text-base font-bold text-rose-400",l&&(t?(l.href=t,l.textContent=a,l.classList.remove("hidden")):l.classList.add("hidden")),s.classList.remove("translate-y-20","opacity-0","pointer-events-none"),s.classList.add("translate-y-0","opacity-100"),se&&clearTimeout(se),se=setTimeout(()=>{s.classList.add("translate-y-20","opacity-0","pointer-events-none"),s.classList.remove("translate-y-0","opacity-100")},3200))}function _(){try{return JSON.parse(localStorage.getItem("ch_saved_job_ids")||"[]")}catch{return[]}}function de(){try{return JSON.parse(localStorage.getItem("ch_saved_jobs_cache")||"{}")}catch{return{}}}function K(){const e=_();fe&&(fe.textContent=String(e.length)),G&&($?G.className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-400 bg-blue-50 text-blue-700 text-xs font-bold shadow-xs transition-all cursor-pointer ring-2 ring-blue-200":G.className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer")}function ue(){const e=_();document.querySelectorAll(".btn-save-job").forEach(o=>{const t=o,a=t.dataset.jobId,s=t.querySelector("svg");!a||!s||(e.includes(a)?(t.classList.remove("text-slate-400"),t.classList.add("text-blue-600","bg-blue-50"),s.setAttribute("fill","currentColor"),t.title="Saved to your bookmarks (click to remove)"):(t.classList.remove("text-blue-600","bg-blue-50"),t.classList.add("text-slate-400"),s.setAttribute("fill","none"),t.title="Save this job"))}),K()}function $e(){const e=new URLSearchParams(window.location.search);P=e.get("title")||e.get("query")||e.get("q")||"",W&&(W.value=P),F=e.get("exact")==="true",re&&(re.checked=F),g.clear();const o=e.get("categories")||e.get("category");o&&o.split(",").map(s=>s.trim().toLowerCase()).filter(Boolean).forEach(s=>g.add(s));const t=window.location.pathname.split("/").filter(Boolean);t[0]==="job-search"&&t[1]&&t[1]!=="all"&&g.add(t[1].toLowerCase()),v.clear();const a=e.get("countries")||e.get("country");a&&a.split(",").map(s=>s.trim()).filter(Boolean).forEach(s=>v.add(s)),f=e.get("remote")||e.get("workplace")||"",e.get("isRemoteOnly")==="true"&&(f="remote-only"),A&&(A.value=f),x=e.get("salary")||"",e.get("hasCompensation")==="true"&&(x="with-salary"),M&&(M.value=x),S=e.get("daysAgo")||e.get("date")||"",T&&(T.value=S),y=parseInt(e.get("page")||"1",10)}function Ce(){const e=new URLSearchParams;P&&e.set("title",P),g.size>0&&e.set("categories",Array.from(g).join(",")),v.size>0&&e.set("countries",Array.from(v).join(",")),f==="remote-only"?e.set("isRemoteOnly","true"):f&&e.set("remote",f),x==="with-salary"?e.set("hasCompensation","true"):x&&e.set("salaryMinimum",x),S&&e.set("daysAgo",S),y>1&&e.set("page",String(y)),F&&e.set("exact","true");const o=e.toString(),t=window.location.pathname,a=t.startsWith("/job-search")?t:"/job-search/all",s=o?`${a}?${o}`:a;window.location.pathname+window.location.search!==s&&window.history.pushState({page:y},"",s)}function q(){ne&&(ne.innerHTML="",g.forEach(e=>{const o=Ee.find(a=>a.value===e)||{label:e},t=document.createElement("span");t.className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold select-none",t.innerHTML=`
        <span>${o.label}</span>
        <button type="button" class="remove-cat-btn text-slate-400 hover:text-rose-600 font-bold ml-0.5" data-cat="${e}" aria-label="Remove ${o.label}">✕</button>
      `,ne.appendChild(t)}),document.querySelectorAll(".category-checkbox").forEach(e=>{const o=e;o.checked=g.has(o.value)}),X&&(X.placeholder=g.size>0?"":"Category..."))}function R(){oe&&(oe.innerHTML="",v.forEach(e=>{const o=document.createElement("span");o.className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold select-none",o.innerHTML=`
        <span>${e}</span>
        <button type="button" class="remove-country-btn text-slate-400 hover:text-rose-600 font-bold ml-0.5" data-country="${e}" aria-label="Remove ${e}">✕</button>
      `,oe.appendChild(o)}),document.querySelectorAll(".country-checkbox").forEach(e=>{const o=e;o.checked=v.has(o.value)}),Z&&(Z.placeholder=v.size>0?"":"Country..."))}function z(){if(le){if(le.innerHTML="",g.forEach(e=>{const o=Ee.find(t=>t.value===e)?.label||e;U(o,()=>{g.delete(e),q(),b()})}),v.forEach(e=>{U(e,()=>{v.delete(e),R(),b()})}),f&&U(f==="remote-only"?"Remote Only":f,()=>{f="",A&&(A.value=""),b()}),x){const e=x==="with-salary"?"With Salary":`$${parseInt(x).toLocaleString()}+`;U(e,()=>{x="",M&&(M.value=""),b()})}S&&U(`Past ${S} days`,()=>{S="",T&&(T.value=""),b()}),$&&U(`Saved Jobs (${_().length})`,()=>{ee(!1)})}}function U(e,o){const t=document.createElement("span");t.className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold",t.innerHTML=`<span>${e}</span><button type="button" class="text-blue-500 hover:text-blue-800 font-bold ml-0.5">✕</button>`,t.querySelector("button")?.addEventListener("click",o),le.appendChild(t)}function pe(e){if(!e)return{relative:"Recently",fullDate:"Recently",isRecent:!1};const o=new Date(e);if(isNaN(o.getTime()))return{relative:"Recently",fullDate:"Recently",isRecent:!1};const t=Date.now()-o.getTime(),a=Math.floor(t/6e4),s=Math.floor(a/60),n=Math.floor(s/24);let r="";a<60?r=`${Math.max(1,a)}m ago`:s<24?r=`${s}h ago`:n===1?r="Yesterday":n<30?r=`${n}d ago`:n<365?r=`${Math.floor(n/30)}mo ago`:r=`${Math.floor(n/365)}y ago`;const l=o.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});return{relative:r,fullDate:l,isRecent:n<=3}}function Be(e){if(!p)return;p.innerHTML="";const{isLoggedIn:o,isSubscribed:t}=L(),a=t?e:e.slice(0,10);if(a.length===0){p.innerHTML=`
        <div class="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h4 class="text-base font-bold text-slate-900">No jobs match your selected filters</h4>
          <p class="text-xs text-slate-500 max-w-sm mx-auto">Try clearing one or more filters or searching with a broader title keyword.</p>
          <button type="button" id="btn-empty-clear" class="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer">
            Reset Filters
          </button>
        </div>
      `,document.getElementById("btn-empty-clear")?.addEventListener("click",ge);return}const s=_();if(a.forEach(n=>{const r=n.company?.name||"Direct ATS Employer",l=n.company?.logo||"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&q=80",c=Array.isArray(n.locations)?n.locations.join(" • "):n.locations||"Worldwide",m=n.salaryBadge||(n.salary?.max?`${n.salary.currency||"$"}${n.salary.min?n.salary.min.toLocaleString()+" - ":""}${n.salary.max.toLocaleString()} (${n.salary.currency||"USD"})`:n.salary?.min?`${n.salary.currency||"$"}${n.salary.min.toLocaleString()}+`:""),k=s.includes(n.id),i=pe(n.published),u={id:n.id,title:n.title,company:{name:r,logo:l,slug:n.company?.slug},locations:Array.isArray(n.locations)?n.locations:[c],workArrangement:n.workArrangement,salaryBadge:m,salary:n.salary,applicationUrl:n.applicationUrl||"#",descriptionExcerpt:n.descriptionExcerpt,published:n.published,skills:n.skills},w=document.createElement("div");w.className="job-card bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 space-y-4",w.dataset.jobId=n.id,w.innerHTML=`
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-3.5 min-w-0">
            <img
              src="${l}"
              alt="${r}"
              class="w-12 h-12 rounded-lg object-cover border border-slate-100 bg-slate-50 shrink-0"
              onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&q=80'"
            />
            <div class="min-w-0">
              <h3 class="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer truncate job-title-btn" data-job-id="${n.id}">
                ${n.title}
              </h3>
              <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                <span class="font-semibold text-slate-700">${r}</span>
                <span>•</span>
                <span>${c}</span>
                ${n.workArrangement?`<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-[11px]">${n.workArrangement}</span>`:""}
                <span class="text-slate-400">• Posted: <strong class="text-slate-600 font-semibold">${i.fullDate}</strong> (${i.relative})</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn-save-job p-2 rounded-lg ${k?"text-blue-600 bg-blue-50":"text-slate-400"} hover:text-blue-600 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
            data-job-id="${n.id}"
            data-job-json="${encodeURIComponent(JSON.stringify(u))}"
            aria-label="Save job"
            title="${k?"Saved to your bookmarks (click to remove)":"Save this job"}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${k?"currentColor":"none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="save-icon">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
            </svg>
          </button>
        </div>

        ${m?`
          <div class="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md w-fit border border-emerald-200/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>${m}</span>
          </div>
        `:""}

        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
          ${n.descriptionExcerpt||""}
        </p>

        ${n.skills&&n.skills.length>0?`
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${n.skills.slice(0,5).map(C=>`
              <span class="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium">${C}</span>
            `).join("")}
            ${n.skills.length>5?`<span class="px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[11px]">+${n.skills.length-5}</span>`:""}
          </div>
        `:""}

        <div class="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
          <div class="flex items-center gap-2">
            <a
              href="${n.applicationUrl&&n.applicationUrl.startsWith("http")?n.applicationUrl:"#"}"
              ${n.applicationUrl&&n.applicationUrl.startsWith("http")?'target="_blank" rel="noopener noreferrer"':""}
              class="btn-apply-direct inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
              data-job-id="${n.id}"
              data-url="${n.applicationUrl||"#"}"
              data-job-json="${encodeURIComponent(JSON.stringify(u))}"
            >
              <span>Apply Directly</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>

            <button
              type="button"
              class="btn-more-jobs inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors"
              data-company-slug="${n.company?.slug}"
              data-company-name="${r}"
              data-job-id="${n.id}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              <span>More</span>
            </button>
          </div>

          <button
            type="button"
            class="btn-report-job text-[11px] font-medium text-slate-400 hover:text-slate-600 transition-colors"
            data-job-id="${n.id}"
            data-title="${n.title}"
            data-company="${r}"
          >
            Report
          </button>
        </div>
      `,p.appendChild(w)}),!t){const n=document.createElement("div"),r=E>0?E.toLocaleString():"45,000";n.id="client-paywall-card",n.className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/90 text-white p-6 sm:p-8 shadow-2xl mt-6";const l=o?'<button type="button" data-trigger-checkout data-tier="monthly" class="btn-trigger-checkout-dynamic w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"><span>Monthly Pro ($19.99/mo)</span></button>':'<a href="/login?tab=signup&next=/job-search/all" class="paywall-guest-link w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all flex items-center justify-center gap-1.5 text-center"><span>Create Free Account</span></a>';n.innerHTML=`
        <div class="absolute -top-20 -right-20 w-52 h-52 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-20 -left-20 w-52 h-52 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-4 text-center max-w-xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Free Preview • 5 of ${r}+ Direct Roles</span>
          </div>

          <h3 class="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            Unlock ${r}+ Direct ATS Jobs & Apply Instantly
          </h3>

          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            You've reached the free preview limit. Apply directly on company career portals before roles get flooded by crowded 200+ LinkedIn queues.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-left text-slate-300 max-w-lg mx-auto py-1">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              <span>Direct Greenhouse, Lever & Ashby links</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              <span>Complete 33 category & salary filters</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              <span>Unlimited saved jobs & bookmarks</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              <span>Daily early-bird alerts for new roles</span>
            </div>
          </div>

          <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              data-trigger-checkout
              data-tier="weekly"
              class="btn-trigger-checkout-dynamic w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>Unlock with Weekly Pass ($5.99/wk)</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>

            ${l}

            <a
              href="/pricing"
              class="text-xs text-blue-300 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              All plans →
            </a>
          </div>
        </div>
      `,p.appendChild(n);const c=document.createElement("div");c.id="client-blurred-teasers",c.className="space-y-4 mt-4 relative cursor-pointer",c.innerHTML=`
        <div class="relative overflow-hidden rounded-xl border border-slate-200 bg-white/80 p-5 space-y-3 select-none filter blur-[2px] opacity-60 hover:opacity-75 transition-opacity">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-lg bg-slate-200 shrink-0"></div>
            <div class="space-y-1.5 flex-1">
              <div class="h-4 bg-slate-800 rounded w-1/3"></div>
              <div class="h-3 bg-slate-400 rounded w-1/4"></div>
            </div>
          </div>
          <div class="h-3 bg-slate-300 rounded w-full"></div>
          <div class="h-3 bg-slate-200 rounded w-2/3"></div>
          <div class="pt-2 flex gap-2">
            <div class="h-8 bg-slate-900 rounded-full w-24"></div>
            <div class="h-8 bg-slate-100 rounded-full w-20"></div>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-xl border border-slate-200 bg-white/80 p-5 space-y-3 select-none filter blur-[3.5px] opacity-40 hover:opacity-60 transition-opacity">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-lg bg-slate-200 shrink-0"></div>
            <div class="space-y-1.5 flex-1">
              <div class="h-4 bg-slate-800 rounded w-2/5"></div>
              <div class="h-3 bg-slate-400 rounded w-1/3"></div>
            </div>
          </div>
          <div class="h-3 bg-slate-300 rounded w-5/6"></div>
          <div class="h-3 bg-slate-200 rounded w-1/2"></div>
          <div class="pt-2 flex gap-2">
            <div class="h-8 bg-slate-900 rounded-full w-24"></div>
          </div>
        </div>
      `,c.addEventListener("click",()=>{O("Sign in or create a free account to unlock hidden direct ATS roles.")}),p.appendChild(c),n.querySelectorAll(".btn-trigger-checkout-dynamic").forEach(m=>{m.addEventListener("click",k=>{k.preventDefault();const i=m,u=i.getAttribute("data-tier")||"weekly";window.triggerCheckout?window.triggerCheckout(u,i):window.location.href="/pricing"})})}Ae()}function Q(){if(!p)return;const e=_(),o=de(),t=e.map(a=>o[a]).filter(Boolean);if(E=t.length,Y&&(Y.textContent=String(E)),t.length===0){p.innerHTML=`
        <div class="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
            </svg>
          </div>
          <h4 class="text-base font-bold text-slate-900">No saved jobs yet</h4>
          <p class="text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any job card to save it here for quick access.
          </p>
          <button type="button" id="btn-browse-all-from-saved" class="mt-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-sm">
            Browse All Jobs
          </button>
        </div>
      `,document.getElementById("btn-browse-all-from-saved")?.addEventListener("click",()=>{ee(!1)}),h&&(h.disabled=!0),d&&(d.disabled=!0),I&&(I.textContent="Saved Jobs");return}Be(t),h&&(h.disabled=!0),d&&(d.disabled=!0),I&&(I.textContent=`${t.length} Bookmarked`)}function ee(e){$=typeof e=="boolean"?e:!$,K(),Ce(),z(),$?Q():D(1)}async function D(e=1,o=!1){if($){Q();return}if(y=e,o){const r=document.getElementById("jobs-count-display")||p;if(r){const l=r.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:Math.max(0,l),behavior:"smooth"})}}p&&(p.style.opacity="0.45",p.style.pointerEvents="none",p.style.transition="opacity 0.15s ease"),h&&(h.disabled=!0),d&&(d.disabled=!0),e===1&&H.length===0&&j&&j.classList.remove("hidden");const t={};g.size>0&&(t.categories=Array.from(g)),v.size>0&&(t.countries=Array.from(v)),f==="remote-only"?t.isRemoteOnly=!0:f&&(t.workArrangements=[f]),x==="with-salary"?t.hasCompensation=!0:x&&(t.salaryMinimum=Number(x)),S&&(t.daysAgo=S);const{isLoggedIn:a,isSubscribed:s}=L(),n=s?15:5;try{const r=await ye({page:s?e:1,pageSize:n,query:P,queryMode:F?"EXACT":"FLEXIBLE",sort:Se,filters:t},s,a);j&&j.classList.add("hidden"),E=r.totalJobs||0,H=r.items||[],Y&&(Y.textContent=E.toLocaleString());const l=s?H:H.slice(0,5);if(Be(l),p&&(p.style.opacity="1",p.style.pointerEvents="auto"),!s)I&&(I.innerHTML='Page 1 of 1 <span class="text-blue-600 font-bold ml-1">(Free Preview: 5 Jobs)</span>'),h&&(h.disabled=!0),d&&(d.disabled=!1,d.innerHTML="Next →",d.title=a?"Upgrade to Pro to unlock page 2":"Log in or sign up to unlock page 2");else{const c=Math.max(1,Math.ceil(E/15));I&&(I.textContent=`Page ${e} of ${c}`),h&&(h.disabled=e<=1),d&&(d.disabled=e*15>=E||e>=c,d.innerHTML="Next →",d.title="")}Ce(),z()}catch(r){j&&j.classList.add("hidden"),p&&(p.style.opacity="1",p.style.pointerEvents="auto"),h&&(h.disabled=y<=1),d&&(d.disabled=y*15>=E),console.error("Failed to search jobs:",r)}}function b(){if($){ee(!1);return}y=1,D(1,!1)}function ge(){g.clear(),v.clear(),f="",x="",S="",P="",$=!1,W&&(W.value=""),A&&(A.value=""),M&&(M.value=""),T&&(T.value=""),q(),R(),z(),K(),y=1,D(1,!0)}function xe(e){if(e.dataset.jobJson)try{const r=e.dataset.jobJson;return JSON.parse(r.startsWith("%")?decodeURIComponent(r):r)}catch{}const o=e.closest(".job-card"),t=e.dataset.jobId||o?.dataset.jobId||"",a=o?.querySelector(".job-title-btn")?.textContent?.trim()||"Verified Direct ATS Job",s=o?.querySelector(".font-semibold.text-slate-700")?.textContent?.trim()||"Direct ATS Employer",n=o?.querySelector(".btn-apply-direct")?.href||"#";return{id:t,title:a,company:{name:s},locations:["Worldwide"],workArrangement:"Verified Direct",salaryBadge:"Competitive Salary",applicationUrl:n}}function Ae(){document.querySelectorAll(".job-title-btn, .btn-more-jobs").forEach(e=>{e.addEventListener("click",o=>{const t=o.currentTarget,a=t.dataset.jobId,s=t.dataset.companySlug,n=t.dataset.companyName;je(s||"",n||"Direct ATS Employer",a)})}),document.querySelectorAll(".btn-save-job").forEach(e=>{e.addEventListener("click",o=>{o.stopPropagation();const{isLoggedIn:t}=L();if(!t){O("Sign in or create a free account to bookmark jobs to your personal tracker.");return}const a=o.currentTarget,s=a.dataset.jobId;if(!s)return;let n=_();const r=de();if(n.includes(s))n=n.filter(l=>l!==s),delete r[s],localStorage.setItem("ch_saved_job_ids",JSON.stringify(n)),localStorage.setItem("ch_saved_jobs_cache",JSON.stringify(r)),V("Job removed from bookmarks",!1),ue(),$&&Q();else{n.push(s);const l=xe(a);r[s]=l,localStorage.setItem("ch_saved_job_ids",JSON.stringify(n)),localStorage.setItem("ch_saved_jobs_cache",JSON.stringify(r)),V("Job saved to your bookmarks!",!0,"/account#saved","View in Account"),ue()}})}),document.querySelectorAll(".btn-apply-direct").forEach(e=>{e.addEventListener("click",o=>{const t=o.currentTarget,{isLoggedIn:a}=L(),s=t.getAttribute("href")||t.dataset.url;if(!a&&(!s||s==="#"||!s.startsWith("http"))){o.preventDefault(),O("Sign in or create a free account to access direct ATS application links.");return}if(!s||s==="#"||!s.startsWith("http")){o.preventDefault(),V("Direct application link is currently undergoing live verification.",!1);return}const n=t.dataset.jobId;if(!n)return;const r=xe(t),l=de();l[n]=r,localStorage.setItem("ch_saved_jobs_cache",JSON.stringify(l));let c=JSON.parse(localStorage.getItem("ch_applied_job_ids")||"[]");c.includes(n)||(c.unshift(n),localStorage.setItem("ch_applied_job_ids",JSON.stringify(c))),V("Application tracked to your account!",!0,"/account#applications","View Applications")})}),document.querySelectorAll(".btn-report-job").forEach(e=>{e.addEventListener("click",o=>{o.currentTarget;const t=document.getElementById("report-modal");t&&t.classList.remove("hidden")})})}async function je(e,o,t){const a=document.getElementById("company-drawer"),s=document.getElementById("drawer-company-name"),n=document.getElementById("drawer-jobs-list");if(!(!a||!n)){s&&(s.textContent=`${o} Openings`),n.innerHTML=`
      <div class="py-12 px-4 text-center space-y-3">
        <div class="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-xs text-slate-500 font-medium">Fetching active openings from ${o}...</p>
      </div>
    `,a.classList.remove("hidden");try{const l=(await ye({filters:{companySlug:e||void 0,company:o},query:e?void 0:o,pageSize:25})).items||[],{isLoggedIn:c,isSubscribed:m}=L(),k=m?l:l.slice(0,5);if(s&&(s.textContent=`${o} (${l.length} Active ${l.length===1?"Opening":"Openings"})`),l.length===0){n.innerHTML=`
          <div class="py-12 px-6 text-center space-y-2">
            <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p class="text-sm font-semibold text-slate-700">No other open roles found</p>
            <p class="text-xs text-slate-500">Currently no other verified direct ATS jobs listed for ${o}.</p>
          </div>
        `;return}if(n.innerHTML=k.map(i=>{const u=pe(i.published),w=Array.isArray(i.locations)?i.locations.join(" • "):i.locations||"Worldwide",C=t&&i.id===t;return`
        <div class="p-4 rounded-xl border ${C?"border-blue-300 bg-blue-50/30 ring-1 ring-blue-200":"border-slate-200 bg-white"} space-y-2.5 shadow-2xs hover:border-slate-300 transition-all">
          <div class="flex items-start justify-between gap-3">
            <h4 class="font-bold text-sm text-slate-900 leading-snug">${i.title}</h4>
            ${i.workArrangement?`<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold shrink-0">${i.workArrangement}</span>`:""}
          </div>

          <!-- Prominent Job Release / Posting Date Badge -->
          <div class="flex flex-wrap items-center gap-2 pt-0.5">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/90 border border-blue-200/80 text-blue-900 text-[11px] font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 shrink-0">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                <line x1="16" x2="16" y1="2" y2="6"></line>
                <line x1="8" x2="8" y1="2" y2="6"></line>
                <line x1="3" x2="21" y1="10" y2="10"></line>
              </svg>
              <span>Posted: <strong class="font-bold text-blue-950">${u.fullDate}</strong> (${u.relative})</span>
            </div>

            ${u.isRecent?`
              <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase tracking-wide">
                New
              </span>
            `:""}

            ${C?`
              <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold">
                Viewing
              </span>
            `:""}
          </div>

          <div class="text-xs text-slate-500 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 shrink-0">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>${w}</span>
          </div>

          ${i.descriptionExcerpt?`<p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">${i.descriptionExcerpt}</p>`:""}

          <div class="pt-2 flex items-center justify-between border-t border-slate-100/80">
            <span class="text-xs font-bold text-emerald-600">${i.salary?.max?`${i.salary.currency||"$"}${i.salary.max.toLocaleString()}`:"Direct ATS"}</span>
            <a 
              href="${i.applicationUrl||"#"}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              <span>Apply Directly</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
        `}).join(""),!m&&l.length>5){const i=l.length-5;n.innerHTML+=`
          <div class="p-4 rounded-xl border border-blue-200 bg-blue-50/70 text-center space-y-2 mt-2">
            <div class="inline-flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase tracking-wide">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>+${i} More Openings Locked</span>
            </div>
            <p class="text-xs text-slate-600">Free plan and guests can preview up to 5 verified ATS jobs per company. Upgrade to Jobs Nation Pro for full access to all ${l.length} openings at ${o}.</p>
            <div class="pt-1 flex flex-wrap items-center justify-center gap-2">
              ${c?"":`
                <a href="/login?tab=signup&next=/job-search/all" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors">
                  <span>Sign Up Free</span>
                </a>
              `}
              <button type="button" data-trigger-checkout data-tier="weekly" class="btn-drawer-upgrade-pro inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer">
                <span>Unlock All ${o} Openings ($5.99/wk)</span>
              </button>
              <a href="/pricing" class="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors">
                <span>All Plans</span>
              </a>
            </div>
          </div>
        `,n.querySelector(".btn-drawer-upgrade-pro")?.addEventListener("click",u=>{u.preventDefault();const w=u.currentTarget,C=w.getAttribute("data-tier")||"weekly";window.triggerCheckout?window.triggerCheckout(C,w):window.location.href="/pricing"})}}catch(r){console.warn("Company drawer fetch failed, checking local jobs cache:",r);const l=H.filter(c=>e&&c.company?.slug===e||(c.company?.name||"").toLowerCase().includes(o.toLowerCase()));if(l.length>0){const{isLoggedIn:c,isSubscribed:m}=L(),k=m?l:l.slice(0,5);if(s&&(s.textContent=`${o} (${l.length} Verified ${l.length===1?"Opening":"Openings"})`),n.innerHTML=k.map(i=>{const u=pe(i.published),w=Array.isArray(i.locations)?i.locations.join(" • "):i.locations||"Worldwide";return`
            <div class="p-4 rounded-xl border ${t&&i.id===t?"border-blue-300 bg-blue-50/30 ring-1 ring-blue-200":"border-slate-200 bg-white"} space-y-2.5 shadow-2xs hover:border-slate-300 transition-all">
              <div class="flex items-start justify-between gap-3">
                <h4 class="font-bold text-sm text-slate-900 leading-snug">${i.title}</h4>
                ${i.workArrangement?`<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold shrink-0">${i.workArrangement}</span>`:""}
              </div>
              <div class="flex flex-wrap items-center gap-2 pt-0.5">
                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/90 border border-blue-200/80 text-blue-900 text-[11px] font-semibold">
                  <span>Posted: <strong class="font-bold text-blue-950">${u.fullDate}</strong> (${u.relative})</span>
                </div>
              </div>
              <div class="text-xs text-slate-500">${w}</div>
              <div class="pt-2 flex items-center justify-between border-t border-slate-100">
                <span class="text-xs font-bold text-emerald-600">${i.salary?.max?`${i.salary.currency||"$"}${i.salary.max.toLocaleString()}`:"Direct ATS"}</span>
                <a href="${i.applicationUrl&&i.applicationUrl.startsWith("http")?i.applicationUrl:"#"}" ${i.applicationUrl&&i.applicationUrl.startsWith("http")?'target="_blank" rel="noopener noreferrer"':""} class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors">Apply Directly</a>
              </div>
            </div>
          `}).join(""),!m&&l.length>5){const i=l.length-5;n.innerHTML+=`
            <div class="p-4 rounded-xl border border-blue-200 bg-blue-50/70 text-center space-y-2 mt-2">
              <div class="inline-flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase tracking-wide">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>+${i} More Openings Locked</span>
              </div>
              <p class="text-xs text-slate-600">Free plan and guests can preview up to 5 verified ATS jobs per company. Upgrade to Jobs Nation Pro for full access to all open positions.</p>
              <div class="pt-1 flex flex-wrap items-center justify-center gap-2">
                ${c?"":`
                  <a href="/login?tab=signup&next=/job-search/all" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors">
                    <span>Sign Up Free</span>
                  </a>
                `}
                <button type="button" data-trigger-checkout data-tier="weekly" class="btn-drawer-fallback-upgrade inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer">
                  <span>Unlock All Openings ($5.99/wk)</span>
                </button>
                <a href="/pricing" class="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors">
                  <span>All Plans</span>
                </a>
              </div>
            </div>
          `,n.querySelector(".btn-drawer-fallback-upgrade")?.addEventListener("click",u=>{u.preventDefault();const w=u.currentTarget,C=w.getAttribute("data-tier")||"weekly";window.triggerCheckout?window.triggerCheckout(C,w):window.location.href="/pricing"})}}else n.innerHTML='<div class="p-8 text-center text-xs text-rose-500 font-medium">Failed to load company openings. Please check your connection and try again.</div>'}}}G?.addEventListener("click",()=>{const{isLoggedIn:e}=L();if(!e){O("Sign in or create a free account to access saved job tracking.");return}ee()});$e();q();R();z();Ae();ue();K();const ve=L();ve.isSubscribed?(document.getElementById("ssr-paywall-card")?.remove(),document.getElementById("ssr-blurred-teasers")?.remove(),D(y,!1)):(I&&(I.innerHTML='Page 1 of 1 <span class="text-blue-600 font-bold ml-1">(Free Preview: 5 Jobs)</span>'),h&&(h.disabled=!0),d&&(d.disabled=!1,d.innerHTML="Next →",d.title=ve.isLoggedIn?"Upgrade to Pro to unlock page 2":"Log in or sign up to unlock page 2"),we());Me.getSession().then(e=>{if(e?.data?.user){const o=e.data.user;let t={};try{t=JSON.parse(localStorage.getItem("ch_user")||"{}")}catch{}const a={...t,id:o.id,name:o.name||t.name,email:o.email||t.email,emailVerified:o.emailVerified??t.emailVerified??!1,plan:o.plan||t.plan||"free",isSubscribed:o.isSubscribed??t.isSubscribed??!1};localStorage.setItem("ch_user",JSON.stringify(a)),localStorage.setItem("ch_token",o.id),localStorage.setItem("ch_authenticated","1"),a.isSubscribed?(document.getElementById("ssr-paywall-card")?.remove(),document.getElementById("ssr-blurred-teasers")?.remove(),D(y,!1)):(we(),d&&(d.title="Upgrade to Pro to unlock page 2"))}}).catch(()=>{});$&&Q();De?.addEventListener("submit",e=>{e.preventDefault(),P=W?.value.trim()||"",F=re?.checked||!1,b()});be?.addEventListener("change",()=>{Se=be.value,b()});A?.addEventListener("change",()=>{f=A.value,b()});M?.addEventListener("change",()=>{x=M.value,b()});T?.addEventListener("change",()=>{S=T.value,b()});Pe?.addEventListener("click",ge);h?.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),y>1&&D(y-1,!0)});d?.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation();const{isLoggedIn:o,isSubscribed:t}=L();if(!o){O("Sign in or create a free account to unlock Page 2 and all 100,000+ jobs.");return}if(!t){window.triggerCheckout?window.triggerCheckout("weekly",d):window.location.href="/pricing";return}D(y+1,!0)});Le?.addEventListener("click",e=>{const o=e.target;if(o.classList.contains("remove-cat-btn")){const t=o.dataset.cat;t&&(g.delete(t),q(),b());return}ie?.classList.toggle("hidden")});document.querySelectorAll(".category-checkbox").forEach(e=>{e.addEventListener("change",o=>{const t=o.target;t.checked?g.add(t.value):g.delete(t.value),q(),b()})});X?.addEventListener("input",()=>{const e=X.value.toLowerCase().trim();document.querySelectorAll(".category-option").forEach(o=>{const t=o;(t.dataset.label?.toLowerCase()||"").includes(e)?t.classList.remove("hidden"):t.classList.add("hidden")})});Ie?.addEventListener("click",e=>{const o=e.target;if(o.classList.contains("remove-country-btn")){const t=o.dataset.country;t&&(v.delete(t),R(),b());return}ce?.classList.toggle("hidden")});document.querySelectorAll(".country-checkbox").forEach(e=>{e.addEventListener("change",o=>{const t=o.target;t.checked?v.add(t.value):v.delete(t.value),R(),b()})});Z?.addEventListener("input",()=>{const e=Z.value.toLowerCase().trim();document.querySelectorAll(".country-option").forEach(o=>{const t=o;(t.dataset.label?.toLowerCase()||"").includes(e)?t.classList.remove("hidden"):t.classList.add("hidden")})});document.addEventListener("click",e=>{const o=e.target;!Le?.contains(o)&&!ie?.contains(o)&&ie?.classList.add("hidden"),!Ie?.contains(o)&&!ce?.contains(o)&&ce?.classList.add("hidden")});document.getElementById("btn-close-company-drawer")?.addEventListener("click",()=>{document.getElementById("company-drawer")?.classList.add("hidden")});document.getElementById("company-drawer-backdrop")?.addEventListener("click",()=>{document.getElementById("company-drawer")?.classList.add("hidden")});document.getElementById("btn-close-report")?.addEventListener("click",()=>{document.getElementById("report-modal")?.classList.add("hidden")});document.getElementById("btn-cancel-report")?.addEventListener("click",()=>{document.getElementById("report-modal")?.classList.add("hidden")});document.getElementById("btn-submit-report")?.addEventListener("click",()=>{alert("Report received! Our team will verify the direct application URL within 4 hours."),document.getElementById("report-modal")?.classList.add("hidden")});const me=document.getElementById("mobile-filter-drawer"),B=document.getElementById("filters-container"),J=document.getElementById("desktop-filters-sidebar"),ae=document.getElementById("mobile-drawer-content");function Ue(){B&&ae&&B.parentElement!==ae&&ae.appendChild(B),me?.classList.remove("hidden"),document.body.style.overflow="hidden"}function te(){me?.classList.add("hidden"),document.body.style.overflow="",window.innerWidth>=1024&&B&&J&&B.parentElement!==J&&J.appendChild(B)}document.getElementById("btn-mobile-filters")?.addEventListener("click",Ue);document.getElementById("btn-close-mobile-drawer")?.addEventListener("click",te);document.getElementById("mobile-drawer-backdrop")?.addEventListener("click",te);document.getElementById("btn-mobile-apply")?.addEventListener("click",()=>{te(),b()});document.getElementById("btn-mobile-clear-all")?.addEventListener("click",()=>{ge(),te()});window.addEventListener("resize",()=>{window.innerWidth>=1024&&(B&&J&&B.parentElement!==J&&J.appendChild(B),me?.classList.add("hidden"),document.body.style.overflow="")});window.addEventListener("popstate",()=>{$e(),q(),R(),z(),D(y,!1)});
