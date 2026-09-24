import{s as ve}from"./api.CZoghtsc.js";import"./auth-client.D3LPu-IL.js";function S(){const e=localStorage.getItem("ch_token"),a=localStorage.getItem("ch_user");let n=null;if(a)try{n=JSON.parse(a)}catch{}const o=!!(e||n),t=!!(n?.isSubscribed||n?.plan&&n?.plan!=="free");return{isLoggedIn:o,isSubscribed:t,user:n}}const P=document.getElementById("auth-gate-modal"),me=document.getElementById("auth-gate-reason"),Ce=document.getElementById("btn-close-auth-gate");function H(e){me&&e&&(me.textContent=e),P&&P.classList.remove("hidden")}function xe(){P&&P.classList.add("hidden")}Ce?.addEventListener("click",xe);P?.addEventListener("click",e=>{e.target===P&&xe()});const ye=[{label:"Engineering",value:"engineering"},{label:"Software",value:"software"},{label:"Technology",value:"technology"},{label:"Data & Analytics",value:"data-and-analytics"},{label:"Art & Design",value:"art-and-design"},{label:"Creative & Media",value:"creative-and-media"},{label:"Management & Leadership",value:"management-and-leadership"},{label:"Consulting",value:"consulting"},{label:"Administrative",value:"administrative"},{label:"Legal",value:"legal"},{label:"Finance & Accounting",value:"finance-and-accounting"},{label:"Human Resources",value:"human-resources"},{label:"Manufacturing",value:"manufacturing"},{label:"Environmental & Sustainability",value:"environmental-and-sustainability"},{label:"Security & Safety",value:"security-and-safety"},{label:"Science & Research",value:"science-and-research"},{label:"Food & Beverage",value:"food-and-beverage"},{label:"Hospitality",value:"hospitality"},{label:"Sales",value:"sales"},{label:"Marketing",value:"marketing"},{label:"Government & Public Sector",value:"government-and-public-sector"},{label:"Healthcare",value:"healthcare"},{label:"Agriculture",value:"agriculture"},{label:"Education",value:"education"},{label:"Customer Service & Support",value:"customer-service-and-support"},{label:"Social Services",value:"social-services"},{label:"Construction",value:"construction"},{label:"Trades",value:"trades"},{label:"Transportation",value:"transportation"},{label:"Logistics",value:"logistics"},{label:"Retail",value:"retail"},{label:"Energy",value:"energy"},{label:"Sports & Recreation",value:"sports-and-recreation"}];let p=new Set,h=new Set,b="",f="",x="",A="",q=!1,w=!1,we="RELEVANCE",v=1,L=0,z=[];const Be=document.getElementById("search-form"),U=document.getElementById("search-input"),oe=document.getElementById("exact-search-toggle"),u=document.getElementById("jobs-container"),D=document.getElementById("jobs-skeleton"),V=document.getElementById("jobs-count-number"),le=document.getElementById("active-filter-chips"),Ae=document.getElementById("btn-reset-filters"),be=document.getElementById("sort-select"),I=document.getElementById("filter-remote"),$=document.getElementById("filter-salary"),C=document.getElementById("filter-date"),G=document.getElementById("btn-toggle-saved"),fe=document.getElementById("saved-count-badge"),g=document.getElementById("btn-prev-page"),c=document.getElementById("btn-next-page"),y=document.getElementById("page-indicator"),ke=document.getElementById("category-select-box"),te=document.getElementById("category-selected-pills"),Y=document.getElementById("category-search-input"),re=document.getElementById("category-dropdown-menu"),Ee=document.getElementById("country-select-box"),ne=document.getElementById("country-selected-pills"),X=document.getElementById("country-search-input"),ie=document.getElementById("country-dropdown-menu");let ae=null;function W(e,a=!0,n="/account#saved",o="View in Account"){const t=document.getElementById("save-toast"),s=document.getElementById("toast-message"),l=document.getElementById("toast-icon"),r=document.getElementById("toast-link");!t||!s||!l||(s.textContent=e,l.textContent=a?"✓":"✕",l.className=a?"text-base font-bold text-emerald-400":"text-base font-bold text-rose-400",r&&(n?(r.href=n,r.textContent=o,r.classList.remove("hidden")):r.classList.add("hidden")),t.classList.remove("translate-y-20","opacity-0","pointer-events-none"),t.classList.add("translate-y-0","opacity-100"),ae&&clearTimeout(ae),ae=setTimeout(()=>{t.classList.add("translate-y-20","opacity-0","pointer-events-none"),t.classList.remove("translate-y-0","opacity-100")},3200))}function R(){try{return JSON.parse(localStorage.getItem("ch_saved_job_ids")||"[]")}catch{return[]}}function de(){try{return JSON.parse(localStorage.getItem("ch_saved_jobs_cache")||"{}")}catch{return{}}}function Z(){const e=R();fe&&(fe.textContent=String(e.length)),G&&(w?G.className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-400 bg-blue-50 text-blue-700 text-xs font-bold shadow-xs transition-all cursor-pointer ring-2 ring-blue-200":G.className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer")}function ce(){const e=R();document.querySelectorAll(".btn-save-job").forEach(a=>{const n=a,o=n.dataset.jobId,t=n.querySelector("svg");!o||!t||(e.includes(o)?(n.classList.remove("text-slate-400"),n.classList.add("text-blue-600","bg-blue-50"),t.setAttribute("fill","currentColor"),n.title="Saved to your bookmarks (click to remove)"):(n.classList.remove("text-blue-600","bg-blue-50"),n.classList.add("text-slate-400"),t.setAttribute("fill","none"),n.title="Save this job"))}),Z()}function Le(){const e=new URLSearchParams(window.location.search);A=e.get("title")||e.get("query")||e.get("q")||"",U&&(U.value=A),q=e.get("exact")==="true",oe&&(oe.checked=q),p.clear();const a=e.get("categories")||e.get("category");a&&a.split(",").map(t=>t.trim().toLowerCase()).filter(Boolean).forEach(t=>p.add(t));const n=window.location.pathname.split("/").filter(Boolean);n[0]==="job-search"&&n[1]&&n[1]!=="all"&&p.add(n[1].toLowerCase()),h.clear();const o=e.get("countries")||e.get("country");o&&o.split(",").map(t=>t.trim()).filter(Boolean).forEach(t=>h.add(t)),b=e.get("remote")||e.get("workplace")||"",e.get("isRemoteOnly")==="true"&&(b="remote-only"),I&&(I.value=b),f=e.get("salary")||"",e.get("hasCompensation")==="true"&&(f="with-salary"),$&&($.value=f),x=e.get("daysAgo")||e.get("date")||"",C&&(C.value=x),v=parseInt(e.get("page")||"1",10)}function Se(){const e=new URLSearchParams;A&&e.set("title",A),p.size>0&&e.set("categories",Array.from(p).join(",")),h.size>0&&e.set("countries",Array.from(h).join(",")),b==="remote-only"?e.set("isRemoteOnly","true"):b&&e.set("remote",b),f==="with-salary"?e.set("hasCompensation","true"):f&&e.set("salaryMinimum",f),x&&e.set("daysAgo",x),v>1&&e.set("page",String(v)),q&&e.set("exact","true");const a=e.toString(),n=window.location.pathname,o=n.startsWith("/job-search")?n:"/job-search/all",t=a?`${o}?${a}`:o;window.location.pathname+window.location.search!==t&&window.history.pushState({page:v},"",t)}function j(){te&&(te.innerHTML="",p.forEach(e=>{const a=ye.find(o=>o.value===e)||{label:e},n=document.createElement("span");n.className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold select-none",n.innerHTML=`
        <span>${a.label}</span>
        <button type="button" class="remove-cat-btn text-slate-400 hover:text-rose-600 font-bold ml-0.5" data-cat="${e}" aria-label="Remove ${a.label}">✕</button>
      `,te.appendChild(n)}),document.querySelectorAll(".category-checkbox").forEach(e=>{const a=e;a.checked=p.has(a.value)}),Y&&(Y.placeholder=p.size>0?"":"Category..."))}function _(){ne&&(ne.innerHTML="",h.forEach(e=>{const a=document.createElement("span");a.className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold select-none",a.innerHTML=`
        <span>${e}</span>
        <button type="button" class="remove-country-btn text-slate-400 hover:text-rose-600 font-bold ml-0.5" data-country="${e}" aria-label="Remove ${e}">✕</button>
      `,ne.appendChild(a)}),document.querySelectorAll(".country-checkbox").forEach(e=>{const a=e;a.checked=h.has(a.value)}),X&&(X.placeholder=h.size>0?"":"Country..."))}function O(){if(le){if(le.innerHTML="",p.forEach(e=>{const a=ye.find(n=>n.value===e)?.label||e;J(a,()=>{p.delete(e),j(),m()})}),h.forEach(e=>{J(e,()=>{h.delete(e),_(),m()})}),b&&J(b==="remote-only"?"Remote Only":b,()=>{b="",I&&(I.value=""),m()}),f){const e=f==="with-salary"?"With Salary":`$${parseInt(f).toLocaleString()}+`;J(e,()=>{f="",$&&($.value=""),m()})}x&&J(`Past ${x} days`,()=>{x="",C&&(C.value=""),m()}),w&&J(`Saved Jobs (${R().length})`,()=>{Q(!1)})}}function J(e,a){const n=document.createElement("span");n.className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold",n.innerHTML=`<span>${e}</span><button type="button" class="text-blue-500 hover:text-blue-800 font-bold ml-0.5">✕</button>`,n.querySelector("button")?.addEventListener("click",a),le.appendChild(n)}function ue(e){if(!e)return{relative:"Recently",fullDate:"Recently",isRecent:!1};const a=new Date(e);if(isNaN(a.getTime()))return{relative:"Recently",fullDate:"Recently",isRecent:!1};const n=Date.now()-a.getTime(),o=Math.floor(n/6e4),t=Math.floor(o/60),s=Math.floor(t/24);let l="";o<60?l=`${Math.max(1,o)}m ago`:t<24?l=`${t}h ago`:s===1?l="Yesterday":s<30?l=`${s}d ago`:s<365?l=`${Math.floor(s/30)}mo ago`:l=`${Math.floor(s/365)}y ago`;const r=a.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});return{relative:l,fullDate:r,isRecent:s<=3}}function Ie(e){if(!u)return;u.innerHTML="";const{isLoggedIn:a}=S(),n=a?e:e.slice(0,5);if(n.length===0){u.innerHTML=`
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
      `,document.getElementById("btn-empty-clear")?.addEventListener("click",pe);return}const o=R();if(n.forEach(t=>{const s=t.company?.name||"Direct ATS Employer",l=t.company?.logo||"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&q=80",r=Array.isArray(t.locations)?t.locations.join(" • "):t.locations||"Worldwide",i=t.salaryBadge||(t.salary?.max?`${t.salary.currency||"$"}${t.salary.min?t.salary.min.toLocaleString()+" - ":""}${t.salary.max.toLocaleString()} (${t.salary.currency||"USD"})`:t.salary?.min?`${t.salary.currency||"$"}${t.salary.min.toLocaleString()}+`:""),E=o.includes(t.id),d=ue(t.published),B={id:t.id,title:t.title,company:{name:s,logo:l,slug:t.company?.slug},locations:Array.isArray(t.locations)?t.locations:[r],workArrangement:t.workArrangement,salaryBadge:i,salary:t.salary,applicationUrl:t.applicationUrl||"#",descriptionExcerpt:t.descriptionExcerpt,published:t.published,skills:t.skills},M=document.createElement("div");M.className="job-card bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 space-y-4",M.dataset.jobId=t.id,M.innerHTML=`
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-3.5 min-w-0">
            <img
              src="${l}"
              alt="${s}"
              class="w-12 h-12 rounded-lg object-cover border border-slate-100 bg-slate-50 shrink-0"
              onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&q=80'"
            />
            <div class="min-w-0">
              <h3 class="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer truncate job-title-btn" data-job-id="${t.id}">
                ${t.title}
              </h3>
              <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                <span class="font-semibold text-slate-700">${s}</span>
                <span>•</span>
                <span>${r}</span>
                ${t.workArrangement?`<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-[11px]">${t.workArrangement}</span>`:""}
                <span class="text-slate-400">• Posted: <strong class="text-slate-600 font-semibold">${d.fullDate}</strong> (${d.relative})</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn-save-job p-2 rounded-lg ${E?"text-blue-600 bg-blue-50":"text-slate-400"} hover:text-blue-600 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
            data-job-id="${t.id}"
            data-job-json="${encodeURIComponent(JSON.stringify(B))}"
            aria-label="Save job"
            title="${E?"Saved to your bookmarks (click to remove)":"Save this job"}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${E?"currentColor":"none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="save-icon">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
            </svg>
          </button>
        </div>

        ${i?`
          <div class="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md w-fit border border-emerald-200/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>${i}</span>
          </div>
        `:""}

        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
          ${t.descriptionExcerpt||""}
        </p>

        ${t.skills&&t.skills.length>0?`
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${t.skills.slice(0,5).map(F=>`
              <span class="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium">${F}</span>
            `).join("")}
            ${t.skills.length>5?`<span class="px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[11px]">+${t.skills.length-5}</span>`:""}
          </div>
        `:""}

        <div class="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
          <div class="flex items-center gap-2">
            <a
              href="${t.applicationUrl&&t.applicationUrl.startsWith("http")?t.applicationUrl:"#"}"
              ${t.applicationUrl&&t.applicationUrl.startsWith("http")?'target="_blank" rel="noopener noreferrer"':""}
              class="btn-apply-direct inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
              data-job-id="${t.id}"
              data-url="${t.applicationUrl||"#"}"
              data-job-json="${encodeURIComponent(JSON.stringify(B))}"
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
              data-company-slug="${t.company?.slug}"
              data-company-name="${s}"
              data-job-id="${t.id}"
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
            data-job-id="${t.id}"
            data-title="${t.title}"
            data-company="${s}"
          >
            Report
          </button>
        </div>
      `,u.appendChild(M)}),!a){const t=document.createElement("div");t.id="client-paywall-card",t.className="relative overflow-hidden rounded-2xl border-2 border-blue-600/80 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-8 shadow-xl mt-6",t.innerHTML=`
        <div class="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-5 text-center max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Free Preview (First 5 of ${L.toLocaleString()||"100,000"}+ Jobs)</span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            Unlock 100,000+ Direct ATS Jobs & Apply Instantly
          </h3>

          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            You are viewing the free 5 job preview. Apply directly on company career portals before roles get flooded by crowded LinkedIn applicant queues.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-left text-slate-200 pt-1">
            <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span>Direct ATS application links (Greenhouse, Ashby, Lever)</span>
            </div>
            <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span>Complete 33 category search and salary filters</span>
            </div>
            <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span>Unlimited saved jobs and real-time candidate bookmarks</span>
            </div>
            <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span>Daily early bird alerts for newly published roles</span>
            </div>
          </div>

          <div class="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/login?tab=signup&next=/job-search/all"
              class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>Create Free Account</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>

            <a
              href="/login?next=/job-search/all"
              class="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>Sign In</span>
            </a>

            <button
              type="button"
              data-trigger-checkout
              data-tier="monthly"
              class="btn-trigger-checkout-dynamic w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>Go Pro ($29/mo)</span>
              <span class="text-[10px] font-bold bg-slate-900/20 px-1.5 py-0.5 rounded">Fast Track</span>
            </button>
          </div>
        </div>
      `,u.appendChild(t);const s=document.createElement("div");s.id="client-blurred-teasers",s.className="space-y-4 mt-4 relative cursor-pointer",s.innerHTML=`
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
      `,s.addEventListener("click",()=>{H("Sign in or create a free account to unlock hidden direct ATS roles.")}),u.appendChild(s),t.querySelector(".btn-trigger-checkout-dynamic")?.addEventListener("click",l=>{l.preventDefault(),window.triggerCheckout&&window.triggerCheckout("monthly",l.currentTarget)})}$e()}function K(){if(!u)return;const e=R(),a=de(),n=e.map(o=>a[o]).filter(Boolean);if(L=n.length,V&&(V.textContent=String(L)),n.length===0){u.innerHTML=`
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
      `,document.getElementById("btn-browse-all-from-saved")?.addEventListener("click",()=>{Q(!1)}),g&&(g.disabled=!0),c&&(c.disabled=!0),y&&(y.textContent="Saved Jobs");return}Ie(n),g&&(g.disabled=!0),c&&(c.disabled=!0),y&&(y.textContent=`${n.length} Bookmarked`)}function Q(e){w=typeof e=="boolean"?e:!w,Z(),Se(),O(),w?K():T(1)}async function T(e=1,a=!1){if(w){K();return}if(v=e,a){const l=document.getElementById("jobs-count-display")||u;if(l){const r=l.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:Math.max(0,r),behavior:"smooth"})}}u&&(u.style.opacity="0.45",u.style.pointerEvents="none",u.style.transition="opacity 0.15s ease"),g&&(g.disabled=!0),c&&(c.disabled=!0),e===1&&z.length===0&&D&&D.classList.remove("hidden");const n={};p.size>0&&(n.categories=Array.from(p)),h.size>0&&(n.countries=Array.from(h)),b==="remote-only"?n.isRemoteOnly=!0:b&&(n.workArrangements=[b]),f==="with-salary"?n.hasCompensation=!0:f&&(n.salaryMinimum=Number(f)),x&&(n.daysAgo=x);const{isLoggedIn:o,isSubscribed:t}=S(),s=o?15:5;try{const l=await ve({page:o?e:1,pageSize:s,query:A,queryMode:q?"EXACT":"FLEXIBLE",sort:we,filters:n},t,o);if(D&&D.classList.add("hidden"),L=l.totalJobs||0,z=l.items||[],V&&(V.textContent=L.toLocaleString()),Ie(z),u&&(u.style.opacity="1",u.style.pointerEvents="auto"),!o)y&&(y.innerHTML='Page 1 of 1 <span class="text-blue-600 font-bold ml-1">(Free Preview: 5 Jobs)</span>'),g&&(g.disabled=!0),c&&(c.disabled=!1,c.innerHTML="Next →",c.title="Log in or sign up to unlock page 2");else{const r=Math.max(1,Math.ceil(L/15));y&&(y.textContent=`Page ${e} of ${r}`),g&&(g.disabled=e<=1),c&&(c.disabled=e*15>=L||e>=r,c.innerHTML="Next →",c.title="")}Se(),O()}catch(l){D&&D.classList.add("hidden"),u&&(u.style.opacity="1",u.style.pointerEvents="auto"),g&&(g.disabled=v<=1),c&&(c.disabled=v*15>=L),console.error("Failed to search jobs:",l)}}function m(){if(w){Q(!1);return}v=1,T(1,!1)}function pe(){p.clear(),h.clear(),b="",f="",x="",A="",w=!1,U&&(U.value=""),I&&(I.value=""),$&&($.value=""),C&&(C.value=""),j(),_(),O(),Z(),v=1,T(1,!0)}function he(e){if(e.dataset.jobJson)try{const l=e.dataset.jobJson;return JSON.parse(l.startsWith("%")?decodeURIComponent(l):l)}catch{}const a=e.closest(".job-card"),n=e.dataset.jobId||a?.dataset.jobId||"",o=a?.querySelector(".job-title-btn")?.textContent?.trim()||"Verified Direct ATS Job",t=a?.querySelector(".font-semibold.text-slate-700")?.textContent?.trim()||"Direct ATS Employer",s=a?.querySelector(".btn-apply-direct")?.href||"#";return{id:n,title:o,company:{name:t},locations:["Worldwide"],workArrangement:"Verified Direct",salaryBadge:"Competitive Salary",applicationUrl:s}}function $e(){document.querySelectorAll(".job-title-btn, .btn-more-jobs").forEach(e=>{e.addEventListener("click",a=>{const n=a.currentTarget,o=n.dataset.jobId,t=n.dataset.companySlug,s=n.dataset.companyName;Te(t||"",s||"Direct ATS Employer",o)})}),document.querySelectorAll(".btn-save-job").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation();const{isLoggedIn:n}=S();if(!n){H("Sign in or create a free account to bookmark jobs to your personal tracker.");return}const o=a.currentTarget,t=o.dataset.jobId;if(!t)return;let s=R();const l=de();if(s.includes(t))s=s.filter(r=>r!==t),delete l[t],localStorage.setItem("ch_saved_job_ids",JSON.stringify(s)),localStorage.setItem("ch_saved_jobs_cache",JSON.stringify(l)),W("Job removed from bookmarks",!1),ce(),w&&K();else{s.push(t);const r=he(o);l[t]=r,localStorage.setItem("ch_saved_job_ids",JSON.stringify(s)),localStorage.setItem("ch_saved_jobs_cache",JSON.stringify(l)),W("Job saved to your bookmarks!",!0,"/account#saved","View in Account"),ce()}})}),document.querySelectorAll(".btn-apply-direct").forEach(e=>{e.addEventListener("click",a=>{const n=a.currentTarget,{isLoggedIn:o}=S(),t=n.getAttribute("href")||n.dataset.url;if(!o&&(!t||t==="#"||!t.startsWith("http"))){a.preventDefault(),H("Sign in or create a free account to access direct ATS application links.");return}if(!t||t==="#"||!t.startsWith("http")){a.preventDefault(),W("Direct application link is currently undergoing live verification.",!1);return}const s=n.dataset.jobId;if(!s)return;const l=he(n),r=de();r[s]=l,localStorage.setItem("ch_saved_jobs_cache",JSON.stringify(r));let i=JSON.parse(localStorage.getItem("ch_applied_job_ids")||"[]");i.includes(s)||(i.unshift(s),localStorage.setItem("ch_applied_job_ids",JSON.stringify(i))),W("Application tracked to your account!",!0,"/account#applications","View Applications")})}),document.querySelectorAll(".btn-report-job").forEach(e=>{e.addEventListener("click",a=>{a.currentTarget;const n=document.getElementById("report-modal");n&&n.classList.remove("hidden")})})}async function Te(e,a,n){const o=document.getElementById("company-drawer"),t=document.getElementById("drawer-company-name"),s=document.getElementById("drawer-jobs-list");if(!(!o||!s)){t&&(t.textContent=`${a} Openings`),s.innerHTML=`
      <div class="py-12 px-4 text-center space-y-3">
        <div class="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-xs text-slate-500 font-medium">Fetching active openings from ${a}...</p>
      </div>
    `,o.classList.remove("hidden");try{const r=(await ve({filters:{companySlug:e||void 0,company:a},query:e?void 0:a,pageSize:25})).items||[],{isLoggedIn:i}=S(),E=i?r:r.slice(0,3);if(t&&(t.textContent=`${a} (${r.length} Active ${r.length===1?"Opening":"Openings"})`),r.length===0){s.innerHTML=`
          <div class="py-12 px-6 text-center space-y-2">
            <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p class="text-sm font-semibold text-slate-700">No other open roles found</p>
            <p class="text-xs text-slate-500">Currently no other verified direct ATS jobs listed for ${a}.</p>
          </div>
        `;return}if(s.innerHTML=E.map(d=>{const B=ue(d.published),M=Array.isArray(d.locations)?d.locations.join(" • "):d.locations||"Worldwide",F=n&&d.id===n;return`
        <div class="p-4 rounded-xl border ${F?"border-blue-300 bg-blue-50/30 ring-1 ring-blue-200":"border-slate-200 bg-white"} space-y-2.5 shadow-2xs hover:border-slate-300 transition-all">
          <div class="flex items-start justify-between gap-3">
            <h4 class="font-bold text-sm text-slate-900 leading-snug">${d.title}</h4>
            ${d.workArrangement?`<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold shrink-0">${d.workArrangement}</span>`:""}
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
              <span>Posted: <strong class="font-bold text-blue-950">${B.fullDate}</strong> (${B.relative})</span>
            </div>

            ${B.isRecent?`
              <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase tracking-wide">
                New
              </span>
            `:""}

            ${F?`
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
            <span>${M}</span>
          </div>

          ${d.descriptionExcerpt?`<p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">${d.descriptionExcerpt}</p>`:""}

          <div class="pt-2 flex items-center justify-between border-t border-slate-100/80">
            <span class="text-xs font-bold text-emerald-600">${d.salary?.max?`${d.salary.currency||"$"}${d.salary.max.toLocaleString()}`:"Direct ATS"}</span>
            <a 
              href="${d.applicationUrl||"#"}" 
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
        `}).join(""),!i&&r.length>3){const d=r.length-3;s.innerHTML+=`
          <div class="p-4 rounded-xl border border-blue-200 bg-blue-50/70 text-center space-y-2 mt-2">
            <div class="inline-flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase tracking-wide">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>+${d} More Openings Locked</span>
            </div>
            <p class="text-xs text-slate-600">Create a free account or sign in to browse all verified direct ATS jobs at ${a}.</p>
            <a href="/login?tab=signup&next=/job-search/all" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors">
              <span>Unlock All Openings</span>
            </a>
          </div>
        `}}catch(l){console.warn("Company drawer fetch failed, checking local jobs cache:",l);const r=z.filter(i=>e&&i.company?.slug===e||(i.company?.name||"").toLowerCase().includes(a.toLowerCase()));r.length>0?(t&&(t.textContent=`${a} (${r.length} Verified ${r.length===1?"Opening":"Openings"})`),s.innerHTML=r.map(i=>{const E=ue(i.published),d=Array.isArray(i.locations)?i.locations.join(" • "):i.locations||"Worldwide";return`
            <div class="p-4 rounded-xl border ${n&&i.id===n?"border-blue-300 bg-blue-50/30 ring-1 ring-blue-200":"border-slate-200 bg-white"} space-y-2.5 shadow-2xs hover:border-slate-300 transition-all">
              <div class="flex items-start justify-between gap-3">
                <h4 class="font-bold text-sm text-slate-900 leading-snug">${i.title}</h4>
                ${i.workArrangement?`<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold shrink-0">${i.workArrangement}</span>`:""}
              </div>
              <div class="flex flex-wrap items-center gap-2 pt-0.5">
                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/90 border border-blue-200/80 text-blue-900 text-[11px] font-semibold">
                  <span>Posted: <strong class="font-bold text-blue-950">${E.fullDate}</strong> (${E.relative})</span>
                </div>
              </div>
              <div class="text-xs text-slate-500">${d}</div>
              <div class="pt-2 flex items-center justify-between border-t border-slate-100">
                <span class="text-xs font-bold text-emerald-600">${i.salary?.max?`${i.salary.currency||"$"}${i.salary.max.toLocaleString()}`:"Direct ATS"}</span>
                <a href="${i.applicationUrl&&i.applicationUrl.startsWith("http")?i.applicationUrl:"#"}" ${i.applicationUrl&&i.applicationUrl.startsWith("http")?'target="_blank" rel="noopener noreferrer"':""} class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors">Apply Directly</a>
              </div>
            </div>
          `}).join("")):s.innerHTML='<div class="p-8 text-center text-xs text-rose-500 font-medium">Failed to load company openings. Please check your connection and try again.</div>'}}}G?.addEventListener("click",()=>{const{isLoggedIn:e}=S();if(!e){H("Sign in or create a free account to access saved job tracking.");return}Q()});Le();j();_();O();$e();ce();Z();const Me=S();Me.isLoggedIn?(document.getElementById("ssr-paywall-card")?.remove(),document.getElementById("ssr-blurred-teasers")?.remove(),T(v,!1)):(y&&(y.innerHTML='Page 1 of 1 <span class="text-blue-600 font-bold ml-1">(Free Preview: 5 Jobs)</span>'),g&&(g.disabled=!0),c&&(c.disabled=!1,c.innerHTML="Next →",c.title="Log in or sign up to unlock page 2"));w&&K();Be?.addEventListener("submit",e=>{e.preventDefault(),A=U?.value.trim()||"",q=oe?.checked||!1,m()});be?.addEventListener("change",()=>{we=be.value,m()});I?.addEventListener("change",()=>{b=I.value,m()});$?.addEventListener("change",()=>{f=$.value,m()});C?.addEventListener("change",()=>{x=C.value,m()});Ae?.addEventListener("click",pe);g?.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),v>1&&T(v-1,!0)});c?.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation();const{isLoggedIn:a}=S();if(!a){H("Sign in or create a free account to unlock Page 2 and all 100,000+ jobs.");return}T(v+1,!0)});ke?.addEventListener("click",e=>{const a=e.target;if(a.classList.contains("remove-cat-btn")){const n=a.dataset.cat;n&&(p.delete(n),j(),m());return}re?.classList.toggle("hidden")});document.querySelectorAll(".category-checkbox").forEach(e=>{e.addEventListener("change",a=>{const n=a.target;n.checked?p.add(n.value):p.delete(n.value),j(),m()})});Y?.addEventListener("input",()=>{const e=Y.value.toLowerCase().trim();document.querySelectorAll(".category-option").forEach(a=>{const n=a;(n.dataset.label?.toLowerCase()||"").includes(e)?n.classList.remove("hidden"):n.classList.add("hidden")})});Ee?.addEventListener("click",e=>{const a=e.target;if(a.classList.contains("remove-country-btn")){const n=a.dataset.country;n&&(h.delete(n),_(),m());return}ie?.classList.toggle("hidden")});document.querySelectorAll(".country-checkbox").forEach(e=>{e.addEventListener("change",a=>{const n=a.target;n.checked?h.add(n.value):h.delete(n.value),_(),m()})});X?.addEventListener("input",()=>{const e=X.value.toLowerCase().trim();document.querySelectorAll(".country-option").forEach(a=>{const n=a;(n.dataset.label?.toLowerCase()||"").includes(e)?n.classList.remove("hidden"):n.classList.add("hidden")})});document.addEventListener("click",e=>{const a=e.target;!ke?.contains(a)&&!re?.contains(a)&&re?.classList.add("hidden"),!Ee?.contains(a)&&!ie?.contains(a)&&ie?.classList.add("hidden")});document.getElementById("btn-close-company-drawer")?.addEventListener("click",()=>{document.getElementById("company-drawer")?.classList.add("hidden")});document.getElementById("company-drawer-backdrop")?.addEventListener("click",()=>{document.getElementById("company-drawer")?.classList.add("hidden")});document.getElementById("btn-close-report")?.addEventListener("click",()=>{document.getElementById("report-modal")?.classList.add("hidden")});document.getElementById("btn-cancel-report")?.addEventListener("click",()=>{document.getElementById("report-modal")?.classList.add("hidden")});document.getElementById("btn-submit-report")?.addEventListener("click",()=>{alert("Report received! Our team will verify the direct application URL within 4 hours."),document.getElementById("report-modal")?.classList.add("hidden")});const ge=document.getElementById("mobile-filter-drawer"),k=document.getElementById("filters-container"),N=document.getElementById("desktop-filters-sidebar"),se=document.getElementById("mobile-drawer-content");function De(){k&&se&&k.parentElement!==se&&se.appendChild(k),ge?.classList.remove("hidden"),document.body.style.overflow="hidden"}function ee(){ge?.classList.add("hidden"),document.body.style.overflow="",window.innerWidth>=1024&&k&&N&&k.parentElement!==N&&N.appendChild(k)}document.getElementById("btn-mobile-filters")?.addEventListener("click",De);document.getElementById("btn-close-mobile-drawer")?.addEventListener("click",ee);document.getElementById("mobile-drawer-backdrop")?.addEventListener("click",ee);document.getElementById("btn-mobile-apply")?.addEventListener("click",()=>{ee(),m()});document.getElementById("btn-mobile-clear-all")?.addEventListener("click",()=>{pe(),ee()});window.addEventListener("resize",()=>{window.innerWidth>=1024&&(k&&N&&k.parentElement!==N&&N.appendChild(k),ge?.classList.add("hidden"),document.body.style.overflow="")});window.addEventListener("popstate",()=>{Le(),j(),_(),O(),T(v,!1)});
