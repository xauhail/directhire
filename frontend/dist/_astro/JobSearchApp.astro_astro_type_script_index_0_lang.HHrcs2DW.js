import{s as ye}from"./api.CZoghtsc.js";import"./auth-client.D3LPu-IL.js";function S(){const e=localStorage.getItem("ch_token"),a=localStorage.getItem("ch_user");let t=null;if(a)try{t=JSON.parse(a)}catch{}const r=!!(e||t),s=!!(t?.isSubscribed||t?.plan&&t?.plan!=="free");return{isLoggedIn:r,isSubscribed:s,user:t}}const N=document.getElementById("auth-gate-modal"),be=document.getElementById("auth-gate-reason"),Ae=document.getElementById("btn-close-auth-gate");function O(e){be&&e&&(be.textContent=e),N&&N.classList.remove("hidden")}function we(){N&&N.classList.add("hidden")}Ae?.addEventListener("click",we);N?.addEventListener("click",e=>{e.target===N&&we()});const ke=[{label:"Engineering",value:"engineering"},{label:"Software",value:"software"},{label:"Technology",value:"technology"},{label:"Data & Analytics",value:"data-and-analytics"},{label:"Art & Design",value:"art-and-design"},{label:"Creative & Media",value:"creative-and-media"},{label:"Management & Leadership",value:"management-and-leadership"},{label:"Consulting",value:"consulting"},{label:"Administrative",value:"administrative"},{label:"Legal",value:"legal"},{label:"Finance & Accounting",value:"finance-and-accounting"},{label:"Human Resources",value:"human-resources"},{label:"Manufacturing",value:"manufacturing"},{label:"Environmental & Sustainability",value:"environmental-and-sustainability"},{label:"Security & Safety",value:"security-and-safety"},{label:"Science & Research",value:"science-and-research"},{label:"Food & Beverage",value:"food-and-beverage"},{label:"Hospitality",value:"hospitality"},{label:"Sales",value:"sales"},{label:"Marketing",value:"marketing"},{label:"Government & Public Sector",value:"government-and-public-sector"},{label:"Healthcare",value:"healthcare"},{label:"Agriculture",value:"agriculture"},{label:"Education",value:"education"},{label:"Customer Service & Support",value:"customer-service-and-support"},{label:"Social Services",value:"social-services"},{label:"Construction",value:"construction"},{label:"Trades",value:"trades"},{label:"Transportation",value:"transportation"},{label:"Logistics",value:"logistics"},{label:"Retail",value:"retail"},{label:"Energy",value:"energy"},{label:"Sports & Recreation",value:"sports-and-recreation"}];let p=new Set,v=new Set,f="",h="",y="",M="",F=!1,k=!1,Ee="RELEVANCE",x=1,$=0,q=[];const Te=document.getElementById("search-form"),W=document.getElementById("search-input"),le=document.getElementById("exact-search-toggle"),c=document.getElementById("jobs-container"),P=document.getElementById("jobs-skeleton"),Y=document.getElementById("jobs-count-number"),re=document.getElementById("active-filter-chips"),Me=document.getElementById("btn-reset-filters"),fe=document.getElementById("sort-select"),C=document.getElementById("filter-remote"),B=document.getElementById("filter-salary"),A=document.getElementById("filter-date"),G=document.getElementById("btn-toggle-saved"),he=document.getElementById("saved-count-badge"),m=document.getElementById("btn-prev-page"),d=document.getElementById("btn-next-page"),w=document.getElementById("page-indicator"),Le=document.getElementById("category-select-box"),ne=document.getElementById("category-selected-pills"),X=document.getElementById("category-search-input"),ie=document.getElementById("category-dropdown-menu"),Se=document.getElementById("country-select-box"),ae=document.getElementById("country-selected-pills"),Z=document.getElementById("country-search-input"),de=document.getElementById("country-dropdown-menu");let se=null;function V(e,a=!0,t="/account#saved",r="View in Account"){const s=document.getElementById("save-toast"),n=document.getElementById("toast-message"),o=document.getElementById("toast-icon"),l=document.getElementById("toast-link");!s||!n||!o||(n.textContent=e,o.textContent=a?"✓":"✕",o.className=a?"text-base font-bold text-emerald-400":"text-base font-bold text-rose-400",l&&(t?(l.href=t,l.textContent=r,l.classList.remove("hidden")):l.classList.add("hidden")),s.classList.remove("translate-y-20","opacity-0","pointer-events-none"),s.classList.add("translate-y-0","opacity-100"),se&&clearTimeout(se),se=setTimeout(()=>{s.classList.add("translate-y-20","opacity-0","pointer-events-none"),s.classList.remove("translate-y-0","opacity-100")},3200))}function U(){try{return JSON.parse(localStorage.getItem("ch_saved_job_ids")||"[]")}catch{return[]}}function ce(){try{return JSON.parse(localStorage.getItem("ch_saved_jobs_cache")||"{}")}catch{return{}}}function K(){const e=U();he&&(he.textContent=String(e.length)),G&&(k?G.className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-400 bg-blue-50 text-blue-700 text-xs font-bold shadow-xs transition-all cursor-pointer ring-2 ring-blue-200":G.className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer")}function ue(){const e=U();document.querySelectorAll(".btn-save-job").forEach(a=>{const t=a,r=t.dataset.jobId,s=t.querySelector("svg");!r||!s||(e.includes(r)?(t.classList.remove("text-slate-400"),t.classList.add("text-blue-600","bg-blue-50"),s.setAttribute("fill","currentColor"),t.title="Saved to your bookmarks (click to remove)"):(t.classList.remove("text-blue-600","bg-blue-50"),t.classList.add("text-slate-400"),s.setAttribute("fill","none"),t.title="Save this job"))}),K()}function Ie(){const e=new URLSearchParams(window.location.search);M=e.get("title")||e.get("query")||e.get("q")||"",W&&(W.value=M),F=e.get("exact")==="true",le&&(le.checked=F),p.clear();const a=e.get("categories")||e.get("category");a&&a.split(",").map(s=>s.trim().toLowerCase()).filter(Boolean).forEach(s=>p.add(s));const t=window.location.pathname.split("/").filter(Boolean);t[0]==="job-search"&&t[1]&&t[1]!=="all"&&p.add(t[1].toLowerCase()),v.clear();const r=e.get("countries")||e.get("country");r&&r.split(",").map(s=>s.trim()).filter(Boolean).forEach(s=>v.add(s)),f=e.get("remote")||e.get("workplace")||"",e.get("isRemoteOnly")==="true"&&(f="remote-only"),C&&(C.value=f),h=e.get("salary")||"",e.get("hasCompensation")==="true"&&(h="with-salary"),B&&(B.value=h),y=e.get("daysAgo")||e.get("date")||"",A&&(A.value=y),x=parseInt(e.get("page")||"1",10)}function $e(){const e=new URLSearchParams;M&&e.set("title",M),p.size>0&&e.set("categories",Array.from(p).join(",")),v.size>0&&e.set("countries",Array.from(v).join(",")),f==="remote-only"?e.set("isRemoteOnly","true"):f&&e.set("remote",f),h==="with-salary"?e.set("hasCompensation","true"):h&&e.set("salaryMinimum",h),y&&e.set("daysAgo",y),x>1&&e.set("page",String(x)),F&&e.set("exact","true");const a=e.toString(),t=window.location.pathname,r=t.startsWith("/job-search")?t:"/job-search/all",s=a?`${r}?${a}`:r;window.location.pathname+window.location.search!==s&&window.history.pushState({page:x},"",s)}function R(){ne&&(ne.innerHTML="",p.forEach(e=>{const a=ke.find(r=>r.value===e)||{label:e},t=document.createElement("span");t.className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold select-none",t.innerHTML=`
        <span>${a.label}</span>
        <button type="button" class="remove-cat-btn text-slate-400 hover:text-rose-600 font-bold ml-0.5" data-cat="${e}" aria-label="Remove ${a.label}">✕</button>
      `,ne.appendChild(t)}),document.querySelectorAll(".category-checkbox").forEach(e=>{const a=e;a.checked=p.has(a.value)}),X&&(X.placeholder=p.size>0?"":"Category..."))}function _(){ae&&(ae.innerHTML="",v.forEach(e=>{const a=document.createElement("span");a.className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold select-none",a.innerHTML=`
        <span>${e}</span>
        <button type="button" class="remove-country-btn text-slate-400 hover:text-rose-600 font-bold ml-0.5" data-country="${e}" aria-label="Remove ${e}">✕</button>
      `,ae.appendChild(a)}),document.querySelectorAll(".country-checkbox").forEach(e=>{const a=e;a.checked=v.has(a.value)}),Z&&(Z.placeholder=v.size>0?"":"Country..."))}function z(){if(re){if(re.innerHTML="",p.forEach(e=>{const a=ke.find(t=>t.value===e)?.label||e;j(a,()=>{p.delete(e),R(),b()})}),v.forEach(e=>{j(e,()=>{v.delete(e),_(),b()})}),f&&j(f==="remote-only"?"Remote Only":f,()=>{f="",C&&(C.value=""),b()}),h){const e=h==="with-salary"?"With Salary":`$${parseInt(h).toLocaleString()}+`;j(e,()=>{h="",B&&(B.value=""),b()})}y&&j(`Past ${y} days`,()=>{y="",A&&(A.value=""),b()}),k&&j(`Saved Jobs (${U().length})`,()=>{ee(!1)})}}function j(e,a){const t=document.createElement("span");t.className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold",t.innerHTML=`<span>${e}</span><button type="button" class="text-blue-500 hover:text-blue-800 font-bold ml-0.5">✕</button>`,t.querySelector("button")?.addEventListener("click",a),re.appendChild(t)}function pe(e){if(!e)return{relative:"Recently",fullDate:"Recently",isRecent:!1};const a=new Date(e);if(isNaN(a.getTime()))return{relative:"Recently",fullDate:"Recently",isRecent:!1};const t=Date.now()-a.getTime(),r=Math.floor(t/6e4),s=Math.floor(r/60),n=Math.floor(s/24);let o="";r<60?o=`${Math.max(1,r)}m ago`:s<24?o=`${s}h ago`:n===1?o="Yesterday":n<30?o=`${n}d ago`:n<365?o=`${Math.floor(n/30)}mo ago`:o=`${Math.floor(n/365)}y ago`;const l=a.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});return{relative:o,fullDate:l,isRecent:n<=3}}function Ce(e){if(!c)return;c.innerHTML="";const{isLoggedIn:a,isSubscribed:t}=S(),r=t?e:e.slice(0,10);if(r.length===0){c.innerHTML=`
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
      `,document.getElementById("btn-empty-clear")?.addEventListener("click",ge);return}const s=U();if(r.forEach(n=>{const o=n.company?.name||"Direct ATS Employer",l=n.company?.logo||"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&q=80",u=Array.isArray(n.locations)?n.locations.join(" • "):n.locations||"Worldwide",E=n.salaryBadge||(n.salary?.max?`${n.salary.currency||"$"}${n.salary.min?n.salary.min.toLocaleString()+" - ":""}${n.salary.max.toLocaleString()} (${n.salary.currency||"USD"})`:n.salary?.min?`${n.salary.currency||"$"}${n.salary.min.toLocaleString()}+`:""),T=s.includes(n.id),i=pe(n.published),g={id:n.id,title:n.title,company:{name:o,logo:l,slug:n.company?.slug},locations:Array.isArray(n.locations)?n.locations:[u],workArrangement:n.workArrangement,salaryBadge:E,salary:n.salary,applicationUrl:n.applicationUrl||"#",descriptionExcerpt:n.descriptionExcerpt,published:n.published,skills:n.skills},I=document.createElement("div");I.className="job-card bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 space-y-4",I.dataset.jobId=n.id,I.innerHTML=`
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-3.5 min-w-0">
            <img
              src="${l}"
              alt="${o}"
              class="w-12 h-12 rounded-lg object-cover border border-slate-100 bg-slate-50 shrink-0"
              onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&q=80'"
            />
            <div class="min-w-0">
              <h3 class="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer truncate job-title-btn" data-job-id="${n.id}">
                ${n.title}
              </h3>
              <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                <span class="font-semibold text-slate-700">${o}</span>
                <span>•</span>
                <span>${u}</span>
                ${n.workArrangement?`<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-[11px]">${n.workArrangement}</span>`:""}
                <span class="text-slate-400">• Posted: <strong class="text-slate-600 font-semibold">${i.fullDate}</strong> (${i.relative})</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn-save-job p-2 rounded-lg ${T?"text-blue-600 bg-blue-50":"text-slate-400"} hover:text-blue-600 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
            data-job-id="${n.id}"
            data-job-json="${encodeURIComponent(JSON.stringify(g))}"
            aria-label="Save job"
            title="${T?"Saved to your bookmarks (click to remove)":"Save this job"}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${T?"currentColor":"none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="save-icon">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
            </svg>
          </button>
        </div>

        ${E?`
          <div class="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md w-fit border border-emerald-200/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span>${E}</span>
          </div>
        `:""}

        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
          ${n.descriptionExcerpt||""}
        </p>

        ${n.skills&&n.skills.length>0?`
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${n.skills.slice(0,5).map(H=>`
              <span class="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium">${H}</span>
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
              data-job-json="${encodeURIComponent(JSON.stringify(g))}"
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
              data-company-name="${o}"
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
            data-company="${o}"
          >
            Report
          </button>
        </div>
      `,c.appendChild(I)}),!t){const n=document.createElement("div");n.id="client-paywall-card",n.className="relative overflow-hidden rounded-2xl border-2 border-blue-600/80 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-8 shadow-xl mt-6",n.innerHTML=`
        <div class="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-5 text-center max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Free Preview (First 10 of ${$.toLocaleString()||"100,000"}+ Jobs)</span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            Unlock 100,000+ Direct ATS Jobs & Apply Instantly
          </h3>

          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            You are viewing the free 10 job preview. Apply directly on company career portals before roles get flooded by crowded LinkedIn applicant queues.
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
            ${a?`
              <div class="text-xs text-blue-200 font-semibold px-3 py-2 bg-white/10 rounded-lg border border-white/15">
                Current Plan: <strong class="text-white">Free Plan</strong> (10 Job Preview Limit)
              </div>
            `:`
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
            `}

            <button
              type="button"
              data-trigger-checkout
              data-tier="monthly"
              class="btn-trigger-checkout-dynamic w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>Upgrade to Pro ($29/mo)</span>
              <span class="text-[10px] font-bold bg-slate-900/20 px-1.5 py-0.5 rounded">Fast Track</span>
            </button>
          </div>
        </div>
      `,c.appendChild(n);const o=document.createElement("div");o.id="client-blurred-teasers",o.className="space-y-4 mt-4 relative cursor-pointer",o.innerHTML=`
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
      `,o.addEventListener("click",()=>{O("Sign in or create a free account to unlock hidden direct ATS roles.")}),c.appendChild(o),n.querySelector(".btn-trigger-checkout-dynamic")?.addEventListener("click",l=>{l.preventDefault(),window.triggerCheckout&&window.triggerCheckout("monthly",l.currentTarget)})}Be()}function Q(){if(!c)return;const e=U(),a=ce(),t=e.map(r=>a[r]).filter(Boolean);if($=t.length,Y&&(Y.textContent=String($)),t.length===0){c.innerHTML=`
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
      `,document.getElementById("btn-browse-all-from-saved")?.addEventListener("click",()=>{ee(!1)}),m&&(m.disabled=!0),d&&(d.disabled=!0),w&&(w.textContent="Saved Jobs");return}Ce(t),m&&(m.disabled=!0),d&&(d.disabled=!0),w&&(w.textContent=`${t.length} Bookmarked`)}function ee(e){k=typeof e=="boolean"?e:!k,K(),$e(),z(),k?Q():D(1)}async function D(e=1,a=!1){if(k){Q();return}if(x=e,a){const o=document.getElementById("jobs-count-display")||c;if(o){const l=o.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:Math.max(0,l),behavior:"smooth"})}}c&&(c.style.opacity="0.45",c.style.pointerEvents="none",c.style.transition="opacity 0.15s ease"),m&&(m.disabled=!0),d&&(d.disabled=!0),e===1&&q.length===0&&P&&P.classList.remove("hidden");const t={};p.size>0&&(t.categories=Array.from(p)),v.size>0&&(t.countries=Array.from(v)),f==="remote-only"?t.isRemoteOnly=!0:f&&(t.workArrangements=[f]),h==="with-salary"?t.hasCompensation=!0:h&&(t.salaryMinimum=Number(h)),y&&(t.daysAgo=y);const{isLoggedIn:r,isSubscribed:s}=S(),n=s?15:10;try{const o=await ye({page:s?e:1,pageSize:n,query:M,queryMode:F?"EXACT":"FLEXIBLE",sort:Ee,filters:t},s,r);P&&P.classList.add("hidden"),$=o.totalJobs||0,q=o.items||[],Y&&(Y.textContent=$.toLocaleString());const l=s?q:q.slice(0,10);if(Ce(l),c&&(c.style.opacity="1",c.style.pointerEvents="auto"),!s)w&&(w.innerHTML='Page 1 of 1 <span class="text-blue-600 font-bold ml-1">(Free Preview: 10 Jobs)</span>'),m&&(m.disabled=!0),d&&(d.disabled=!1,d.innerHTML="Next →",d.title=r?"Upgrade to Pro to unlock page 2":"Log in or sign up to unlock page 2");else{const u=Math.max(1,Math.ceil($/15));w&&(w.textContent=`Page ${e} of ${u}`),m&&(m.disabled=e<=1),d&&(d.disabled=e*15>=$||e>=u,d.innerHTML="Next →",d.title="")}$e(),z()}catch(o){P&&P.classList.add("hidden"),c&&(c.style.opacity="1",c.style.pointerEvents="auto"),m&&(m.disabled=x<=1),d&&(d.disabled=x*15>=$),console.error("Failed to search jobs:",o)}}function b(){if(k){ee(!1);return}x=1,D(1,!1)}function ge(){p.clear(),v.clear(),f="",h="",y="",M="",k=!1,W&&(W.value=""),C&&(C.value=""),B&&(B.value=""),A&&(A.value=""),R(),_(),z(),K(),x=1,D(1,!0)}function ve(e){if(e.dataset.jobJson)try{const o=e.dataset.jobJson;return JSON.parse(o.startsWith("%")?decodeURIComponent(o):o)}catch{}const a=e.closest(".job-card"),t=e.dataset.jobId||a?.dataset.jobId||"",r=a?.querySelector(".job-title-btn")?.textContent?.trim()||"Verified Direct ATS Job",s=a?.querySelector(".font-semibold.text-slate-700")?.textContent?.trim()||"Direct ATS Employer",n=a?.querySelector(".btn-apply-direct")?.href||"#";return{id:t,title:r,company:{name:s},locations:["Worldwide"],workArrangement:"Verified Direct",salaryBadge:"Competitive Salary",applicationUrl:n}}function Be(){document.querySelectorAll(".job-title-btn, .btn-more-jobs").forEach(e=>{e.addEventListener("click",a=>{const t=a.currentTarget,r=t.dataset.jobId,s=t.dataset.companySlug,n=t.dataset.companyName;De(s||"",n||"Direct ATS Employer",r)})}),document.querySelectorAll(".btn-save-job").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation();const{isLoggedIn:t}=S();if(!t){O("Sign in or create a free account to bookmark jobs to your personal tracker.");return}const r=a.currentTarget,s=r.dataset.jobId;if(!s)return;let n=U();const o=ce();if(n.includes(s))n=n.filter(l=>l!==s),delete o[s],localStorage.setItem("ch_saved_job_ids",JSON.stringify(n)),localStorage.setItem("ch_saved_jobs_cache",JSON.stringify(o)),V("Job removed from bookmarks",!1),ue(),k&&Q();else{n.push(s);const l=ve(r);o[s]=l,localStorage.setItem("ch_saved_job_ids",JSON.stringify(n)),localStorage.setItem("ch_saved_jobs_cache",JSON.stringify(o)),V("Job saved to your bookmarks!",!0,"/account#saved","View in Account"),ue()}})}),document.querySelectorAll(".btn-apply-direct").forEach(e=>{e.addEventListener("click",a=>{const t=a.currentTarget,{isLoggedIn:r}=S(),s=t.getAttribute("href")||t.dataset.url;if(!r&&(!s||s==="#"||!s.startsWith("http"))){a.preventDefault(),O("Sign in or create a free account to access direct ATS application links.");return}if(!s||s==="#"||!s.startsWith("http")){a.preventDefault(),V("Direct application link is currently undergoing live verification.",!1);return}const n=t.dataset.jobId;if(!n)return;const o=ve(t),l=ce();l[n]=o,localStorage.setItem("ch_saved_jobs_cache",JSON.stringify(l));let u=JSON.parse(localStorage.getItem("ch_applied_job_ids")||"[]");u.includes(n)||(u.unshift(n),localStorage.setItem("ch_applied_job_ids",JSON.stringify(u))),V("Application tracked to your account!",!0,"/account#applications","View Applications")})}),document.querySelectorAll(".btn-report-job").forEach(e=>{e.addEventListener("click",a=>{a.currentTarget;const t=document.getElementById("report-modal");t&&t.classList.remove("hidden")})})}async function De(e,a,t){const r=document.getElementById("company-drawer"),s=document.getElementById("drawer-company-name"),n=document.getElementById("drawer-jobs-list");if(!(!r||!n)){s&&(s.textContent=`${a} Openings`),n.innerHTML=`
      <div class="py-12 px-4 text-center space-y-3">
        <div class="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-xs text-slate-500 font-medium">Fetching active openings from ${a}...</p>
      </div>
    `,r.classList.remove("hidden");try{const l=(await ye({filters:{companySlug:e||void 0,company:a},query:e?void 0:a,pageSize:25})).items||[],{isLoggedIn:u,isSubscribed:E}=S(),T=E?l:l.slice(0,5);if(s&&(s.textContent=`${a} (${l.length} Active ${l.length===1?"Opening":"Openings"})`),l.length===0){n.innerHTML=`
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
        `;return}if(n.innerHTML=T.map(i=>{const g=pe(i.published),I=Array.isArray(i.locations)?i.locations.join(" • "):i.locations||"Worldwide",H=t&&i.id===t;return`
        <div class="p-4 rounded-xl border ${H?"border-blue-300 bg-blue-50/30 ring-1 ring-blue-200":"border-slate-200 bg-white"} space-y-2.5 shadow-2xs hover:border-slate-300 transition-all">
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
              <span>Posted: <strong class="font-bold text-blue-950">${g.fullDate}</strong> (${g.relative})</span>
            </div>

            ${g.isRecent?`
              <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase tracking-wide">
                New
              </span>
            `:""}

            ${H?`
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
            <span>${I}</span>
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
        `}).join(""),!E&&l.length>5){const i=l.length-5;n.innerHTML+=`
          <div class="p-4 rounded-xl border border-blue-200 bg-blue-50/70 text-center space-y-2 mt-2">
            <div class="inline-flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase tracking-wide">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>+${i} More Openings Locked</span>
            </div>
            <p class="text-xs text-slate-600">Free plan and guests can preview up to 5 verified ATS jobs per company. Upgrade to CareerHound Pro for full access to all ${l.length} openings at ${a}.</p>
            <div class="pt-1 flex flex-wrap items-center justify-center gap-2">
              ${u?"":`
                <a href="/login?tab=signup&next=/job-search/all" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors">
                  <span>Sign Up Free</span>
                </a>
              `}
              <button type="button" data-trigger-checkout data-tier="monthly" class="btn-drawer-upgrade-pro inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer">
                <span>Unlock All ${a} Openings</span>
              </button>
            </div>
          </div>
        `,n.querySelector(".btn-drawer-upgrade-pro")?.addEventListener("click",g=>{g.preventDefault(),window.triggerCheckout?window.triggerCheckout("monthly",g.currentTarget):window.location.href="/pricing"})}}catch(o){console.warn("Company drawer fetch failed, checking local jobs cache:",o);const l=q.filter(u=>e&&u.company?.slug===e||(u.company?.name||"").toLowerCase().includes(a.toLowerCase()));if(l.length>0){const{isLoggedIn:u,isSubscribed:E}=S(),T=E?l:l.slice(0,5);if(s&&(s.textContent=`${a} (${l.length} Verified ${l.length===1?"Opening":"Openings"})`),n.innerHTML=T.map(i=>{const g=pe(i.published),I=Array.isArray(i.locations)?i.locations.join(" • "):i.locations||"Worldwide";return`
            <div class="p-4 rounded-xl border ${t&&i.id===t?"border-blue-300 bg-blue-50/30 ring-1 ring-blue-200":"border-slate-200 bg-white"} space-y-2.5 shadow-2xs hover:border-slate-300 transition-all">
              <div class="flex items-start justify-between gap-3">
                <h4 class="font-bold text-sm text-slate-900 leading-snug">${i.title}</h4>
                ${i.workArrangement?`<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold shrink-0">${i.workArrangement}</span>`:""}
              </div>
              <div class="flex flex-wrap items-center gap-2 pt-0.5">
                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/90 border border-blue-200/80 text-blue-900 text-[11px] font-semibold">
                  <span>Posted: <strong class="font-bold text-blue-950">${g.fullDate}</strong> (${g.relative})</span>
                </div>
              </div>
              <div class="text-xs text-slate-500">${I}</div>
              <div class="pt-2 flex items-center justify-between border-t border-slate-100">
                <span class="text-xs font-bold text-emerald-600">${i.salary?.max?`${i.salary.currency||"$"}${i.salary.max.toLocaleString()}`:"Direct ATS"}</span>
                <a href="${i.applicationUrl&&i.applicationUrl.startsWith("http")?i.applicationUrl:"#"}" ${i.applicationUrl&&i.applicationUrl.startsWith("http")?'target="_blank" rel="noopener noreferrer"':""} class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors">Apply Directly</a>
              </div>
            </div>
          `}).join(""),!E&&l.length>5){const i=l.length-5;n.innerHTML+=`
            <div class="p-4 rounded-xl border border-blue-200 bg-blue-50/70 text-center space-y-2 mt-2">
              <div class="inline-flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase tracking-wide">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>+${i} More Openings Locked</span>
              </div>
              <p class="text-xs text-slate-600">Free plan and guests can preview up to 5 verified ATS jobs per company. Upgrade to CareerHound Pro for full access to all open positions.</p>
              <div class="pt-1 flex flex-wrap items-center justify-center gap-2">
                ${u?"":`
                  <a href="/login?tab=signup&next=/job-search/all" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors">
                    <span>Sign Up Free</span>
                  </a>
                `}
                <button type="button" data-trigger-checkout data-tier="monthly" class="btn-drawer-fallback-upgrade inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer">
                  <span>Unlock All Openings ($29/mo)</span>
                </button>
              </div>
            </div>
          `,n.querySelector(".btn-drawer-fallback-upgrade")?.addEventListener("click",g=>{g.preventDefault(),window.triggerCheckout?window.triggerCheckout("monthly",g.currentTarget):window.location.href="/pricing"})}}else n.innerHTML='<div class="p-8 text-center text-xs text-rose-500 font-medium">Failed to load company openings. Please check your connection and try again.</div>'}}}G?.addEventListener("click",()=>{const{isLoggedIn:e}=S();if(!e){O("Sign in or create a free account to access saved job tracking.");return}ee()});Ie();R();_();z();Be();ue();K();const xe=S();xe.isSubscribed?(document.getElementById("ssr-paywall-card")?.remove(),document.getElementById("ssr-blurred-teasers")?.remove(),D(x,!1)):(w&&(w.innerHTML='Page 1 of 1 <span class="text-blue-600 font-bold ml-1">(Free Preview: 10 Jobs)</span>'),m&&(m.disabled=!0),d&&(d.disabled=!1,d.innerHTML="Next →",d.title=xe.isLoggedIn?"Upgrade to Pro to unlock page 2":"Log in or sign up to unlock page 2"));k&&Q();Te?.addEventListener("submit",e=>{e.preventDefault(),M=W?.value.trim()||"",F=le?.checked||!1,b()});fe?.addEventListener("change",()=>{Ee=fe.value,b()});C?.addEventListener("change",()=>{f=C.value,b()});B?.addEventListener("change",()=>{h=B.value,b()});A?.addEventListener("change",()=>{y=A.value,b()});Me?.addEventListener("click",ge);m?.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),x>1&&D(x-1,!0)});d?.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation();const{isLoggedIn:a,isSubscribed:t}=S();if(!a){O("Sign in or create a free account to unlock Page 2 and all 100,000+ jobs.");return}if(!t){window.triggerCheckout?window.triggerCheckout("monthly",d):window.location.href="/pricing";return}D(x+1,!0)});Le?.addEventListener("click",e=>{const a=e.target;if(a.classList.contains("remove-cat-btn")){const t=a.dataset.cat;t&&(p.delete(t),R(),b());return}ie?.classList.toggle("hidden")});document.querySelectorAll(".category-checkbox").forEach(e=>{e.addEventListener("change",a=>{const t=a.target;t.checked?p.add(t.value):p.delete(t.value),R(),b()})});X?.addEventListener("input",()=>{const e=X.value.toLowerCase().trim();document.querySelectorAll(".category-option").forEach(a=>{const t=a;(t.dataset.label?.toLowerCase()||"").includes(e)?t.classList.remove("hidden"):t.classList.add("hidden")})});Se?.addEventListener("click",e=>{const a=e.target;if(a.classList.contains("remove-country-btn")){const t=a.dataset.country;t&&(v.delete(t),_(),b());return}de?.classList.toggle("hidden")});document.querySelectorAll(".country-checkbox").forEach(e=>{e.addEventListener("change",a=>{const t=a.target;t.checked?v.add(t.value):v.delete(t.value),_(),b()})});Z?.addEventListener("input",()=>{const e=Z.value.toLowerCase().trim();document.querySelectorAll(".country-option").forEach(a=>{const t=a;(t.dataset.label?.toLowerCase()||"").includes(e)?t.classList.remove("hidden"):t.classList.add("hidden")})});document.addEventListener("click",e=>{const a=e.target;!Le?.contains(a)&&!ie?.contains(a)&&ie?.classList.add("hidden"),!Se?.contains(a)&&!de?.contains(a)&&de?.classList.add("hidden")});document.getElementById("btn-close-company-drawer")?.addEventListener("click",()=>{document.getElementById("company-drawer")?.classList.add("hidden")});document.getElementById("company-drawer-backdrop")?.addEventListener("click",()=>{document.getElementById("company-drawer")?.classList.add("hidden")});document.getElementById("btn-close-report")?.addEventListener("click",()=>{document.getElementById("report-modal")?.classList.add("hidden")});document.getElementById("btn-cancel-report")?.addEventListener("click",()=>{document.getElementById("report-modal")?.classList.add("hidden")});document.getElementById("btn-submit-report")?.addEventListener("click",()=>{alert("Report received! Our team will verify the direct application URL within 4 hours."),document.getElementById("report-modal")?.classList.add("hidden")});const me=document.getElementById("mobile-filter-drawer"),L=document.getElementById("filters-container"),J=document.getElementById("desktop-filters-sidebar"),oe=document.getElementById("mobile-drawer-content");function Pe(){L&&oe&&L.parentElement!==oe&&oe.appendChild(L),me?.classList.remove("hidden"),document.body.style.overflow="hidden"}function te(){me?.classList.add("hidden"),document.body.style.overflow="",window.innerWidth>=1024&&L&&J&&L.parentElement!==J&&J.appendChild(L)}document.getElementById("btn-mobile-filters")?.addEventListener("click",Pe);document.getElementById("btn-close-mobile-drawer")?.addEventListener("click",te);document.getElementById("mobile-drawer-backdrop")?.addEventListener("click",te);document.getElementById("btn-mobile-apply")?.addEventListener("click",()=>{te(),b()});document.getElementById("btn-mobile-clear-all")?.addEventListener("click",()=>{ge(),te()});window.addEventListener("resize",()=>{window.innerWidth>=1024&&(L&&J&&L.parentElement!==J&&J.appendChild(L),me?.classList.add("hidden"),document.body.style.overflow="")});window.addEventListener("popstate",()=>{Ie(),R(),_(),z(),D(x,!1)});
