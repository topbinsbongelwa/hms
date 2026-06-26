<<<<<<< HEAD

=======
const COLORS = ['#0d9488','#3b82f6','#8b5cf6','#f59e0b','#ef4444','#10b981'];
const appointments = [
  { name:'Dr E Finity',    doc:'Dr. E. Finity · Physician',   time:'09:00 AM', status:'confirmed' },
  { name:'Dr E Blanch',   doc:'Dr. E. Blanch · General',        time:'09:30 AM', status:'progress' },
  { name:'Dr K Ngarivume', doc:'Dr. K. Ngarivume · Physician',  time:'10:00 AM', status:'waiting' },
  { name:'Dr M Moyo',    doc:'Dr. M. Moyo · Pharmacist',   time:'09:00 AM', status:'confirmed' },
  { name:'Dr Fungai', doc:'Dr. F. Musiname · Doctor',   time:'11:00 AM', status:'confirmed' },
];

const schedules = [
  { name:'Morning Staff Meeting',   time:'08:00 AM', desc:'Discuss team tasks for the day.', faces:['#0d9488','#3b82f6','#8b5cf6'] },
  { name:'Patient Consultation',    time:'09:00 AM', desc:'Review inpatient progress notes.', faces:['#f59e0b','#ef4444'] },
  { name:'Meeting with Ward Heads', time:'11:00 AM', desc:'Facility capacity planning.', faces:['#10b981','#0d9488','#3b82f6'] },
  { name:'Afternoon Surgery',       time:'14:00 PM', desc:'Theatre 2 – Appendectomy.', faces:['#8b5cf6','#f59e0b'] },
];

function initAppointments() {
  const list = document.getElementById('appt-list');
  list.innerHTML = appointments.map((a, i) => {
    const initials = a.name.split(' ').map(w=>w[0]).join('').substring(0,2);
    const badgeClass = a.status === 'confirmed' ? 'badge-confirmed' : a.status === 'progress' ? 'badge-progress' : 'badge-waiting';
    const badgeLabel = a.status === 'confirmed' ? 'Confirmed' : a.status === 'progress' ? 'In Progress' : 'Waiting';
    return `<div class="appt-row">
      <div class="appt-avatar" style="background:${COLORS[i%COLORS.length]}">${initials}</div>
      <div class="appt-info">
        <div class="pname">${a.name}</div>
        <div class="pdoc">${a.doc}</div>
      </div>
      <div class="appt-meta">
        <div class="appt-time">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
          ${a.time}
        </div>
        <span class="badge ${badgeClass}">${badgeLabel}</span>
      </div>
    </div>`;
  }).join('');
}
function initCalendar() {
  const grid = document.getElementById('cal-grid');
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const today = 23;
  const hasAppt = [3,7,10,14,17,19,23,25,28];
  let html = days.map(d=>`<div class="cal-day-name">${d}</div>`).join('');
  for(let i=0;i<1;i++) html += `<div class="cal-day other"></div>`;
  for(let d=1;d<=30;d++){
    const cls = d===today ? 'cal-day today' : hasAppt.includes(d) ? 'cal-day has-appt' : 'cal-day';
    html += `<div class="${cls}">${d}</div>`;
  }
  grid.innerHTML = html;
}

function initSchedule() {
  const list = document.getElementById('sched-list');
  list.innerHTML = schedules.map(s => {
    const faces = s.faces.map(c=>`<div class="sched-face" style="background:${c}">+</div>`).join('');
    return `<div class="sched-item">
      <div class="sched-top">
        <div class="sched-name">${s.name}</div>
        <div class="sched-time">${s.time}</div>
      </div>
      <div class="sched-desc">${s.desc}</div>
      <div style="display:flex;align-items:center">
        <div class="sched-faces">${faces}</div>
        <div class="sched-btns">
          <button class="sched-btn reject" title="Decline">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
          <button class="sched-btn accept" title="Accept">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function setPage(page) {
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.remove('active'));
  const items = document.querySelectorAll('.nav-item');
  const map = {dashboard:0,patients:1,doctors:2,appointments:3,billing:4,pharmacy:5,reports:6,settings:7};
  if(map[page]!==undefined) items[map[page]].classList.add('active');
}

const modalTpls = {
  appt: `
    <h2 style="font-size:18px;font-weight:700;margin-bottom:4px">New Appointment</h2>
    <p style="color:#64748b;font-size:13px;margin-bottom:20px">Victoria Falls Community Health</p>
    ${field('Patient Name','text','e.g. Tatenda Moyo')}
    ${field('Doctor','select','',['Dr. N. Sibanda – Cardiology','Dr. F. Ncube – General','Dr. M. Mukwasi – Paediatrics','Dr. T. Murewa – Obs & Gynae'])}
    ${field('Date','date','')}
    ${field('Time','time','')}
    ${field('Notes (optional)','textarea','Any additional information')}
    <button class="btn btn-primary form-action-btn" onclick="alert('Appointment booked!');closeModal()">Book Appointment</button>`,
  patient: `
    <h2 style="font-size:18px;font-weight:700;margin-bottom:4px">Register New Patient</h2>
    <p style="color:#64748b;font-size:13px;margin-bottom:20px">Victoria Falls Community Health</p>
    ${field('Full Name','text','e.g. Blessing Dube')}
    ${field('Date of Birth','date','')}
    ${field('Gender','select','',['Female','Male'])}
    ${field('Phone Number','text','+263 …')}
    ${field('Address','text','Victoria Falls, Zimbabwe')}
    ${field('Medical Aid / Insurance','text','e.g. MARS, PSMAS,EMRAS')}
    <button class="btn btn-primary form-action-btn" onclick="alert('Patient registered!');closeModal()">Register Patient</button>`,
};

function field(label, type, placeholder, opts) {
  const id = label.toLowerCase().replace(/\s/g,'-');
  let inp;
  if(type==='select') {
    inp = `<select id="${id}" class="form-control">
      ${opts.map(o=>`<option>${o}</option>`).join('')}
    </select>`;
  } else if(type==='textarea') {
    inp = `<textarea id="${id}" placeholder="${placeholder}" rows="3" class="form-control"></textarea>`;
  } else {
    inp = `<input id="${id}" type="${type}" placeholder="${placeholder}" class="form-control"/>`;
  }
  return `<div class="form-field"><label for="${id}">${label}</label>${inp}</div>`;
}

function openModal(type) {
  document.getElementById('modal-content').innerHTML = modalTpls[type]||'';
  document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal(e) {
  if(!e || e.target===document.getElementById('modal-overlay')) {
    document.getElementById('modal-overlay').style.display = 'none';
  }
}

initAppointments();
initCalendar();
initSchedule();
>>>>>>> 961adbe (Initial commit - VFHealth project)
