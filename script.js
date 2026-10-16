'use strict';
// Prototype only: localStorage is not suitable for confidential documents or production accounts.
const $ = id => document.getElementById(id);
const key = 'fundohbiz-clickers-demo-v1';
const defaults = {profile:{owner:'',business:'',industry:'Retail and trading'}, answers:[], reminders:[]};
function load(){try{const d=JSON.parse(localStorage.getItem(key));return d&&typeof d==='object'?{...defaults,...d}:structuredClone(defaults)}catch{return structuredClone(defaults)}}
let state=load();
function save(){localStorage.setItem(key,JSON.stringify(state))}
const questions=[
 ['registered','My business is registered with CIPC'],
 ['bank','I have a business bank account'],
 ['tax','I understand and have checked my SARS tax compliance status'],
 ['records','I keep records of income and expenses'],
 ['statements','I have recent bank statements available'],
 ['plan','I have a business plan or business overview'],
 ['budget','I know how much funding I need and what I will use it for'],
 ['documents','I have the supporting documents required by my chosen funder']
];
const services={cipc:{name:'CIPC annual return',url:'https://annualreturns.cipc.co.za/'},sars:{name:'SARS tax compliance review',url:'https://www.sars.gov.za/'},coida:{name:'COIDA Letter of Good Standing',url:'https://cfonline.labour.gov.za/OnlineSubmissions/'},bbbee:{name:'B-BBEE affidavit review',url:'https://www.cipc.co.za/'},custom:{name:'Other document',url:''}};
function node(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e}
function init(){['owner','business','industry'].forEach(id=>$(id).value=state.profile[id]||'');const q=$('questions');questions.forEach(([id,label])=>{const div=node('div',undefined,'question'),l=node('label'),c=document.createElement('input');c.type='checkbox';c.value=id;c.checked=state.answers.includes(id);l.append(c,document.createTextNode(label));div.append(l);q.append(div)});renderReminders()}
$('saveProfile').addEventListener('click',()=>{state.profile={owner:$('owner').value.trim(),business:$('business').value.trim(),industry:$('industry').value};save();$('profileFeedback').textContent='Profile saved in this browser.'});
$('calculate').addEventListener('click',()=>{state.answers=[...document.querySelectorAll('#questions input:checked')].map(x=>x.value);save();const count=state.answers.length,score=Math.round(count/questions.length*100),result=$('results');result.replaceChildren();result.hidden=false;result.append(node('h3',`Your readiness guide: ${score}%`),node('p',`You have marked ${count} of ${questions.length} items as ready. This score is only a checklist guide; it does not guarantee funding.`));const missing=questions.filter(([id])=>!state.answers.includes(id));if(missing.length){result.append(node('strong','Suggested next steps:'));const ul=node('ul');missing.forEach(([,label])=>ul.append(node('li',label)));result.append(ul)}else result.append(node('p','All checklist items are marked. Check each funder’s specific eligibility and document requirements.'))});
$('addDoc').addEventListener('click',()=>{const type=$('docType').value,date=$('dueDate').value,note=$('docNote').value.trim();if(!date){$('trackerFeedback').textContent='Please select a due date.';return}state.reminders.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2),type,date,note});save();$('dueDate').value='';$('docNote').value='';$('trackerFeedback').textContent='Reminder added to this browser.';renderReminders()});
function daysUntil(date){const today=new Date(),start=Date.UTC(today.getFullYear(),today.getMonth(),today.getDate());const [y,m,d]=date.split('-').map(Number);return Math.round((Date.UTC(y,m-1,d)-start)/86400000)}
function renderReminders(){const target=$('reminders');target.replaceChildren();if(!state.reminders.length){target.append(node('p','No reminders yet. Add your first compliance deadline above.'));return}const list=[...state.reminders].sort((a,b)=>a.date.localeCompare(b.date));list.forEach(r=>{const service=services[r.type]||services.custom,d=daysUntil(r.date),wrap=node('div',undefined,'reminder'),left=node('div'),title=node('strong',service.name),status=d<0?`Overdue by ${Math.abs(d)} day(s)`:d===0?'Due today':`${d} day(s) remaining`;left.append(title,node('p',`Due: ${r.date} · ${status}`,d<0?'overdue':d<=30?'warning':'ok'));if(r.note)left.append(node('p',r.note));const right=node('div');if(service.url){const a=node('a','Open official website ↗');a.href=service.url;a.target='_blank';a.rel='noopener noreferrer';right.append(a)}else right.append(node('span','Check the document issuer'));const del=node('button','Remove');del.type='button';del.style.marginLeft='10px';del.addEventListener('click',()=>{state.reminders=state.reminders.filter(x=>x.id!==r.id);save();renderReminders()});right.append(del);wrap.append(left,right);target.append(wrap)})}
init();
