const API_URL =
  "https://script.google.com/macros/s/AKfycbxjyN1rZbEWGQdz-K6009ouL9d1X9dGVAq36IhzgZkyDgeAIBmYJGLQ9Z4YSoQKx9S3/exec";

const RANKS = [
  "কনস্টেবল",
  "নায়েক",
  "এএসআই (নিরস্ত্র)",
  "এএসআই (সশস্ত্র)",
  "এটিএসআই",
  "এসআই (নিরস্ত্র)",
  "এসআই (সশস্ত্র)",
  "টিএসআই",
];

const POSITIONS = [
  "এলসি",
  "কম্পিউটার অপারেটর",
  "ওয়ার্লেস অপারেটর",
  "ড্রাইভার",
  "রিগুলার",
];

const UNITS = [
  "সদর থানা",
  "রুমা থানা",
  "রোয়াংছড়ি থানা",
  "নাইক্ষংছড়ি থানা",
  "আলীকদম থানা",
  "থানচি থানা",
  "লামা থানা",
  "ঘুমধুম তদন্ত কেন্দ্র",
  "বাইশারী তদন্ত কেন্দ্র",
  "টংকাবতি তদন্ত কেন্দ্র",
  "সদর ফাঁড়ি",
  "বাইশারী ফাঁড়ি",
  "কেয়াজুপাড়া ফাঁড়ি",
  "গজালিয়া ফাঁড়ি",
  "সোনাইছড়ি ফাঁড়ি",
  "ফাইতং ফাঁড়ি",
  "রাজবিল্লা ফাঁড়ি",
  "ডিবি",
  "ডিএসবি",
  "সদর কোর্ট",
  "লামা কোর্ট",
  "সদর ট্রাফিক",
  "লামা ট্রাফিক",
  "আলীকদম ট্রাফিক",
  "নাইক্ষ্যংছড়ি ট্রাফিক",
  "পুলিশ সুপারের কার্যালয়",
  "পুলিশ লাইন",
  "এমটি",
  "পুলিশ কন্ট্রোল রুম",
  "ডিপার্টমেন্টাল স্টোর",
  "অস্ত্রাগার",
  "রেশন স্টোর",
  "ব্যান্ড গ্রুপ",
  "রিজার্ভ অফিস",
  "সদর সার্কেল অফিস",
  "লামা সার্কেল অফিস",
  "রুমা সার্কেল অফিস",
  "আরআই অফিস",
  "মেজর অফিস",
  "চিম্বুক ক্যাম্প",
  "মেঘলা ক্যাম্প",
  "মিলনছড়ি ক্যাম্প",
  "হানসামপাড়া ক্যাম্প",
  "বেতছড়া ক্যাম্প",
  "তারাছামূখ ক্যাম্প",
  "তালুকদারপাড়া ক্যাম্প",
  "মুরংবাজার ক্যাম্প",
  "কৈক্ষ্যংঝিরি ক্যাম্প",
  "কুমারী ক্যাম্প",
  "আজিজনগর ক্যাম্প",
  "আলীক্ষ্যং ক্যাম্প",
  "২৬-কিলো ক্যাম্প",
  "রেইচা চেকপোষ্ট",
  "ডুলুপাড়া চেকপোষ্ট",
  "ইয়াংছা চেকপোষ্ট",
  "রুমা এসবি গার্ড",
  "রোয়াংছড়ি এসবি গার্ড",
  "বেতার বেইজ",
];

window.onload = function () {
  fillSelect("rank", RANKS);
  fillSelect("unit", UNITS);
  fillSelect("position", POSITIONS);

  loadPublicUsers();
};

function fillSelect(id, items) {
  const select = document.getElementById(id);

  items.forEach((item) => {
    const option = document.createElement("option");

    option.value = item;
    option.textContent = item;

    select.appendChild(option);
  });
}

/* =====================
   API
===================== */

async function api(data) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },

    body: JSON.stringify(data),
  });

  return await response.json();
}

/* =====================
   IP
===================== */

async function getIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");

    const data = await response.json();

    return data.ip || "";
  } catch (error) {
    return "";
  }
}

/* =====================
   NAVIGATION
===================== */

function hideAll() {
  ["home", "entry", "userDashboard", "adminDashboard"].forEach((id) => {
    document.getElementById(id).classList.add("hidden");
  });
}

function goHome() {
  hideAll();

  document.getElementById("home").classList.remove("hidden");
}

function openEntry() {
  hideAll();

  document.getElementById("entry").classList.remove("hidden");

  loadPublicUsers();
}

/* =====================
   AUTH MODAL
===================== */

function openAuth() {
  document.getElementById("authModal").classList.remove("hidden");

  showRegister();
}

function closeAuth() {
  document.getElementById("authModal").classList.add("hidden");
}

function showRegister() {
  document.getElementById("registerBox").classList.remove("hidden");

  document.getElementById("loginBox").classList.add("hidden");

  document.getElementById("authTitle").textContent = "Registration Form";
}

function showLogin() {
  document.getElementById("registerBox").classList.add("hidden");

  document.getElementById("loginBox").classList.remove("hidden");

  document.getElementById("authTitle").textContent = "User Login";
}

/* =====================
   BP VALIDATION
===================== */

document.getElementById("bp").addEventListener("input", function () {
  // শুধু English uppercase BP এবং সংখ্যা
  this.value = this.value.toUpperCase().replace(/[^BP0-9]/g, "");

  // BP ছাড়া শুরু করা যাবে না
  if (this.value.length > 0 && !this.value.startsWith("BP")) {
    this.value = "BP";
  }

  // সর্বোচ্চ 12
  this.value = this.value.substring(0, 12);
});

/* =====================
   REGISTRATION
===================== */

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const bp = document.getElementById("bp").value.trim().toUpperCase();

    if (!/^BP\d{10}$/.test(bp)) {
      alert("BP অবশ্যই BP দিয়ে শুরু হয়ে মোট ১২ characters হতে হবে।");

      return;
    }

    const password = document.getElementById("password").value;

    if (password.length < 6 || password.length > 12) {
      alert("Password ৬ থেকে ১২ characters হতে হবে।");

      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,12}$/.test(password)) {
      alert("Password-এ English letter, number এবং symbol থাকতে হবে।");

      return;
    }

    const ip = await getIP();

    const data = {
      action: "register",

      bp: bp,

      rank: document.getElementById("rank").value,

      brashNumber: document.getElementById("brashNumber").value.trim(),

      name: document.getElementById("name").value.trim(),

      unit: document.getElementById("unit").value,

      mobile: document.getElementById("mobile").value.trim(),

      position: document.getElementById("position").value,

      password: password,

      remark: document.getElementById("remark").value.trim(),

      ip: ip,
    };

    try {
      const result = await api(data);

      alert(result.message);

      if (result.success) {
        document.getElementById("registerForm").reset();

        showLogin();

        loadPublicUsers();
      }
    } catch (error) {
      alert("Server-এর সঙ্গে সংযোগ স্থাপন করা যাচ্ছে না।");
    }
  });

/* =====================
   USER LOGIN
===================== */

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const ip = await getIP();

    const result = await api({
      action: "login",

      bp: document.getElementById("loginBP").value.trim().toUpperCase(),

      password: document.getElementById("loginPassword").value,

      ip: ip,
    });

    if (!result.success) {
      alert(result.message);
      return;
    }

    closeAuth();

    showUserDashboard(result.user);
  });

function showUserDashboard(user) {
  hideAll();

  document.getElementById("userDashboard").classList.remove("hidden");

  document.getElementById("userInfo").innerHTML = `

      <p><b>BP:</b>
      ${escapeHTML(user.bp)}</p>

      <p><b>Rank:</b>
      ${escapeHTML(user.rank)}</p>

      <p><b>Brash Number:</b>
      ${escapeHTML(user.brashNumber || "")}</p>

      <p><b>Name:</b>
      ${escapeHTML(user.name)}</p>

      <p><b>Unit:</b>
      ${escapeHTML(user.unit)}</p>

      <p><b>Mobile:</b>
      ${escapeHTML(user.mobile)}</p>

      <p><b>Position:</b>
      ${escapeHTML(user.position)}</p>

      <p><b>Remark:</b>
      ${escapeHTML(user.remark || "")}</p>

    `;
}

function userLogout() {
  goHome();
}

/* =====================
   PUBLIC LIST
===================== */

async function loadPublicUsers() {
  try {
    const result = await api({
      action: "publicUsers",
    });

    const table = document.getElementById("publicTable");

    table.innerHTML = "";

    if (!result.success) {
      table.innerHTML = '<tr><td colspan="7">Data পাওয়া যায়নি</td></tr>';

      return;
    }

    result.users.forEach((user) => {
      table.innerHTML += `

        <tr>

          <td>${user.sl}</td>

          <td>
          ${escapeHTML(user.unit)}
          </td>

          <td>
          ${escapeHTML(user.rank)}
          </td>

          <td>
          ${escapeHTML(user.name)}
          </td>

          <td>
          ${escapeHTML(user.position)}
          </td>

          <td>
          ${escapeHTML(user.mobile)}
          </td>

          <td>
          ${escapeHTML(user.remark || "")}
          </td>

        </tr>

      `;
    });
  } catch (error) {
    console.error(error);
  }
}

/* =====================
   ADMIN LOGIN
===================== */

function openAdminLogin() {
  document.getElementById("adminModal").classList.remove("hidden");
}

function closeAdminLogin() {
  document.getElementById("adminModal").classList.add("hidden");
}

document
  .getElementById("adminForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const ip = await getIP();

    const id = document.getElementById("adminID").value.trim();

    const password = document.getElementById("adminPassword").value;

    const result = await api({
      action: "adminLogin",

      id: id,

      password: password,

      ip: ip,
    });

    if (!result.success) {
      alert(result.message);
      return;
    }

    closeAdminLogin();

    sessionStorage.setItem("adminID", id);

    sessionStorage.setItem("adminPassword", password);

    hideAll();

    document.getElementById("adminDashboard").classList.remove("hidden");

    loadAdminUsers();
  });

/* =====================
   ADMIN DATA
===================== */

async function loadAdminUsers() {
  const id = sessionStorage.getItem("adminID");

  const password = sessionStorage.getItem("adminPassword");

  if (!id || !password) {
    goHome();
    return;
  }

  const result = await api({
    action: "adminUsers",

    id: id,

    password: password,
  });

  const table = document.getElementById("adminTable");

  table.innerHTML = "";

  if (!result.success) {
    alert(result.message);

    adminLogout();

    return;
  }

  result.users.forEach((user) => {
    table.innerHTML += `

      <tr>

        <td>${user.sl}</td>

        <td>${escapeHTML(user.bp)}</td>

        <td>${escapeHTML(user.rank)}</td>

        <td>
        ${escapeHTML(user.brashNumber || "")}
        </td>

        <td>${escapeHTML(user.name)}</td>

        <td>${escapeHTML(user.unit)}</td>

        <td>${escapeHTML(user.mobile)}</td>

        <td>${escapeHTML(user.position)}</td>

        <td>${escapeHTML(user.remark || "")}</td>

        <td>
        ${escapeHTML(user.registrationDateTime)}
        </td>

        <td>${escapeHTML(user.ip || "")}</td>

        <td>${escapeHTML(user.status)}</td>

        <td>

          ${
            user.status === "ACTIVE"
              ? `<button
              class="btn danger"
              onclick="deleteUser(${user.row})">
              Delete
            </button>`
              : "-"
          }

        </td>

      </tr>

    `;
  });
}

/* =====================
   DELETE
===================== */

async function deleteUser(row) {
  if (!confirm("এই ডাটা Recycle Data-তে পাঠাবেন?")) {
    return;
  }

  const result = await api({
    action: "deleteUser",

    id: sessionStorage.getItem("adminID"),

    password: sessionStorage.getItem("adminPassword"),

    row: row,

    ip: await getIP(),
  });

  alert(result.message);

  if (result.success) {
    loadAdminUsers();
  }
}

/* =====================
   RECYCLE
===================== */

async function loadRecycle() {
  document.getElementById("adminDataCard").classList.add("hidden");

  document.getElementById("recycleCard").classList.remove("hidden");

  const result = await api({
    action: "recycleUsers",

    id: sessionStorage.getItem("adminID"),

    password: sessionStorage.getItem("adminPassword"),
  });

  const table = document.getElementById("recycleTable");

  table.innerHTML = "";

  if (!result.success) {
    alert(result.message);
    return;
  }

  result.users.forEach((user) => {
    table.innerHTML += `

      <tr>

        <td>${user.sl}</td>

        <td>${escapeHTML(user.bp)}</td>

        <td>${escapeHTML(user.rank)}</td>

        <td>${escapeHTML(user.name)}</td>

        <td>${escapeHTML(user.unit)}</td>

        <td>${escapeHTML(user.position)}</td>

        <td>
        ${escapeHTML(user.deletedDateTime)}
        </td>

        <td>

          <button
            class="btn primary"
            onclick="restoreUser(${user.row})">
            Restore
          </button>

          <button
            class="btn danger"
            onclick="permanentDelete(${user.row})">
            Permanent Delete
          </button>

        </td>

      </tr>

    `;
  });
}

/* =====================
   RESTORE
===================== */

async function restoreUser(row) {
  if (!confirm("এই ডাটা Restore করতে চান?")) {
    return;
  }

  const result = await api({
    action: "restoreUser",

    id: sessionStorage.getItem("adminID"),

    password: sessionStorage.getItem("adminPassword"),

    row: row,

    ip: await getIP(),
  });

  alert(result.message);

  if (result.success) {
    loadRecycle();
  }
}

/* =====================
   PERMANENT DELETE
===================== */

async function permanentDelete(row) {
  if (!confirm("সতর্কতা: এই ডাটা স্থায়ীভাবে মুছে যাবে। Continue?")) {
    return;
  }

  const result = await api({
    action: "permanentDelete",

    id: sessionStorage.getItem("adminID"),

    password: sessionStorage.getItem("adminPassword"),

    row: row,

    ip: await getIP(),
  });

  alert(result.message);

  if (result.success) {
    loadRecycle();
  }
}

/* =====================
   ADMIN LOGOUT
===================== */

function adminLogout() {
  sessionStorage.removeItem("adminID");

  sessionStorage.removeItem("adminPassword");

  goHome();
}

/* =====================
   PASSWORD SHOW/HIDE
===================== */

function togglePassword(id) {
  const input = document.getElementById(id);

  input.type = input.type === "password" ? "text" : "password";
}

/* =====================
   HTML SECURITY
===================== */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
