(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{801:(e,r,t)=>{Promise.resolve().then(t.bind(t,5400)),Promise.resolve().then(t.t.bind(t,347,23))},5400:(e,r,t)=>{"use strict";t.d(r,{ProfileProvider:()=>s,x:()=>n});var o=t(5155),i=t(2115);let l=(0,i.createContext)(void 0);function s(e){let{children:r}=e,[t,s]=(0,i.useState)(()=>{{let e=localStorage.getItem("profile");return e?JSON.parse(e):{name:"",bio:"",profileImage:""}}});return(0,i.useEffect)(()=>{localStorage.setItem("profile",JSON.stringify(t))},[t]),(0,o.jsx)(l.Provider,{value:{...t,setProfile:s},children:r})}function n(){let e=(0,i.useContext)(l);if(!e)throw Error("useProfile must be used within a ProfileProvider");return e}},347:()=>{}},e=>{var r=r=>e(e.s=r);e.O(0,[690,441,517,358],()=>r(801)),_N_E=e.O()}]);