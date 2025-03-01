(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[684],{843:(e,t,s)=>{Promise.resolve().then(s.bind(s,2891))},5400:(e,t,s)=>{"use strict";s.d(t,{ProfileProvider:()=>o,x:()=>a});var r=s(5155),n=s(2115);let l=(0,n.createContext)(void 0);function o(e){let{children:t}=e,[s,o]=(0,n.useState)(()=>{{let e=localStorage.getItem("profile");return e?JSON.parse(e):{name:"",bio:"",profileImage:""}}});return(0,n.useEffect)(()=>{localStorage.setItem("profile",JSON.stringify(s))},[s]),(0,r.jsx)(l.Provider,{value:{...s,setProfile:o},children:t})}function a(){let e=(0,n.useContext)(l);if(!e)throw Error("useProfile must be used within a ProfileProvider");return e}},2891:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var r=s(5155),n=s(2115),l=s(8173),o=s.n(l),a=s(5400);let i=[{name:"Jane Doe",matchPercent:92,bio:"Loves hiking, cooking, and spontaneous road trips."},{name:"John Smith",matchPercent:85,bio:"Avid reader, coffee enthusiast, and tech geek."},{name:"Emily Johnson",matchPercent:78,bio:"Passionate about art, music, and outdoor adventures."}];function c(){let[e,t]=(0,n.useState)(0),{profileImage:s}=(0,a.x)(),[l,c]=(0,n.useState)(!1);(0,n.useEffect)(()=>{c(!0)},[]);let h=()=>{t(e=>e===i.length-1?0:e+1)},{name:d,matchPercent:m,bio:x}=i[e];return l?(0,r.jsxs)("div",{className:"relative min-h-screen bg-orange-200 flex flex-col items-center justify-center p-4",children:[(0,r.jsx)(o(),{href:"/profile",children:(0,r.jsx)("div",{className:"absolute top-4 right-4 bg-white p-2 sm:p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition",children:s?(0,r.jsx)("img",{suppressHydrationWarning:!0,src:s,alt:"Profile",className:"w-10 h-10 sm:w-10 sm:h-10 rounded-full object-cover"}):(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-10 h-10 sm:w-8 sm:h-8 text-gray-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5.121 17.804A12.07 12.07 0 0112 15c2.787 0  5.343.95 7.121 2.804M15 10a3 3 0  11-6 0 3 3 0 016 0z"})})})}),(0,r.jsxs)("div",{className:"relative w-full max-w-[800px]",children:[(0,r.jsxs)("div",{className:"relative w-full h-0 pb-[68.75%] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col justify-end",children:[(0,r.jsx)("div",{className:"absolute inset-0 flex items-center justify-center",children:(0,r.jsx)("span",{className:"text-gray-400 text-base sm:text-lg",children:"[ Image Placeholder ]"})}),(0,r.jsx)("div",{className:"absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/40 to-transparent text-white",children:(0,r.jsxs)("h2",{className:"font-bold text-lg sm:text-xl",children:[d,", ",m,"% match"]})}),(0,r.jsx)("div",{className:"bg-gradient-to-t from-white via-white to-transparent p-4",children:(0,r.jsx)("p",{className:"text-gray-700 text-sm sm:text-base",children:x})})]}),(0,r.jsx)("button",{onClick:()=>{t(e=>0===e?i.length-1:e-1)},"aria-label":"Previous Match",className:"absolute -left-8 sm:-left-12 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 rounded-full shadow hover:bg-pink-600 transition",children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6 sm:w-8 sm:h-8 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})})}),(0,r.jsx)("button",{onClick:h,"aria-label":"Next Match",className:"absolute -right-8 sm:-right-12 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 rounded-full shadow hover:bg-pink-600 transition",children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6 sm:w-8 sm:h-8 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})})]}),(0,r.jsxs)("div",{className:"flex items-center space-x-4 mt-6",children:[(0,r.jsx)("button",{onClick:()=>{alert("You rejected ".concat(i[e].name,".")),h()},"aria-label":"Reject",className:"flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition",children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6 sm:w-8 sm:h-8",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),(0,r.jsx)("button",{onClick:()=>{alert("You starred ".concat(i[e].name,"!")),h()},"aria-label":"Star",className:"flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition",children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6 sm:w-8 sm:h-8",fill:"currentColor",viewBox:"0 0 20 20",children:(0,r.jsx)("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1  0 00.95.69h4.162c.969 0 1.371 1.24.588  1.81l-3.37 2.448a1 1 0 00-.364  1.118l1.285 3.957c.3.922-.755  1.688-1.54 1.118L10 14.348l-3.948  2.88c-.784.57-1.84-.196-1.54-1.118l1.285-3.957a1  1 0 00-.364-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1  1 0 00.95-.69l1.286-3.958z"})})}),(0,r.jsx)("button",{onClick:()=>{alert("You accepted ".concat(i[e].name,"!")),h()},"aria-label":"Accept",className:"flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition",children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6 sm:w-8 sm:h-8",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})})})]}),(0,r.jsxs)("div",{className:"fixed bottom-0 left-1/2 transform -translate-x-1/2  w-2/3 shadow-md bg-white  flex justify-around items-center  rounded-t-full rounded-b-none py-3 z-10",children:[(0,r.jsxs)(o(),{href:"/match",className:"flex flex-col items-center space-y-1",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6 text-pink-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-4.35-4.35m2.85-5.65 a8 8 0 11-16 0 8 8 0 0116 0z"})}),(0,r.jsx)("span",{className:"text-xs font-medium text-gray-800",children:"Match"})]}),(0,r.jsxs)(o(),{href:"/matched",className:"flex flex-col items-center space-y-1",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6 text-pink-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4.318 6.318a4.5 4.5 0  016.364 0L12 7.657l1.318-1.339 a4.5 4.5 0 116.364 6.364l-7.07 7.07 a.997.997 0 01-1.414 0l-7.07-7.07 a4.5 4.5 0 010-6.364z"})}),(0,r.jsx)("span",{className:"text-xs font-medium text-gray-800",children:"Matched"})]})]})]}):null}}},e=>{var t=t=>e(e.s=t);e.O(0,[554,441,517,358],()=>t(843)),_N_E=e.O()}]);