// 🐔 আমার খামার - স্মার্ট ম্যানেজার
// 📈 দৈনিক রিপোর্ট (মৃত্যু ও গড় ওজন ট্র্যাকার)

function openDailyReportPage() {
    setupDailyReportHTML();
    navigate('daily-report-page');
    populateShipmentDropdown();
}

function setupDailyReportHTML() {
    if (document.getElementById('daily-report-page')) return;

    const mainApp = document.getElementById('main-app');
    if (!mainApp) return;

    const dailyReportPageHTML = `
        <div id="daily-report-page" class="page bg-gray-50 dark:bg-gray-900 pb-28">
            <header class="sticky top-0 z-10 p-5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 flex justify-between items-center shadow-sm">
                <div class="flex items-center">
                    <button onclick="goBack()" class="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <span class="material-symbols-outlined dark:text-white">arrow_back</span>
                    </button>
                    <h1 class="text-lg font-bold dark:text-white">দৈনিক রিপোর্ট</h1>
                </div>
            </header>

            <div class="p-5 space-y-5">
                <!-- 🐔 চালান সিলেক্টর -->
                <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-750">
                    <label class="text-xs font-bold text-gray-400 block mb-1.5">চালান নির্বাচন করুন</label>
                    <select id="report-shipment-select" onchange="onReportShipmentChanged()" class="w-full p-3.5 rounded-xl border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold text-sm">
                        <option value="">-- কোনো চালান পাওয়া যায়নি --</option>
                    </select>
                </div>

                <!-- 📊 মৃত্যুর হার ও গড় গ্রোথ চার্ট কার্ড -->
                <div id="report-stats" class="hidden grid grid-cols-2 gap-4">
                    <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-750 text-center">
                        <span class="text-xs text-gray-400 font-bold block">মোট স্ট্রোক/মৃত্যু</span>
                        <h3 id="stat-total-deaths" class="text-2xl font-black text-red-500 mt-1">০ টি</h3>
                        <p id="stat-mortality-rate" class="text-[10px] text-gray-400 font-bold mt-1">(হার: ০.০০%)</p>
                    </div>
                    <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-750 text-center">
                        <span class="text-xs text-gray-400 font-bold block">বর্তমান জ্যান্ত মুরগি</span>
                        <h3 id="stat-alive-chickens" class="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1">০ টি</h3>
                        <p id="stat-current-weight" class="text-[10px] text-gray-400 font-bold mt-1">গড় ওজন: ০ গ্রাম</p>
                    </div>
                </div>

                <!-- 🖋️ নতুন দৈনিক এন্ট্রি ফর্ম -->
                <div id="report-form-card" class="hidden bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-750">
                    <h3 class="font-bold text-gray-800 dark:text-white text-sm mb-4 flex items-center gap-2">
                        <span class="material-symbols-outlined text-teal-700 dark:text-teal-400">edit_note</span>
                        আজকের রিপোর্ট লিপিবদ্ধ করুন
                    </h3>
                    
                    <form onsubmit="saveDailyReportEntry(event)" class="space-y-4">
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-gray-400 block mb-1">বয়স (দিন)</label>
                                <input type="number" id="report-bird-age" required class="w-full p-3.5 rounded-xl border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm font-bold">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-gray-400 block mb-1">তারিখ</label>
                                <input type="date" id="report-entry-date" required class="w-full p-3.5 rounded-xl border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs font-bold">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="text-xs font-bold text-gray-400 block mb-1">আজ মারা গেছে (টি)</label>
                                <input type="number" id="report-death-count" placeholder="০" class="w-full p-3.5 rounded-xl border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-gray-400 block mb-1">গড় ওজন (গ্রাম)</label>
                                <input type="number" id="report-avg-weight" placeholder="০" class="w-full p-3.5 rounded-xl border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm">
                            </div>
                        </div>

                        <div>
                            <label class="text-xs font-bold text-gray-400 block mb-1">খাবার খেয়েছে (কেজি / বস্তা)</label>
                            <input type="text" id="report-feed-consumed" placeholder="যেমন: ৫ কি.গ্রা. বা ১ বস্তা" class="w-full p-3.5 rounded-xl border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm">
                        </div>

                        <div>
                            <label class="text-xs font-bold text-gray-400 block mb-1">নোট (লিকুইড ওষুধ বা অন্যান্য)</label>
                            <input type="text" id="report-entry-note" placeholder="যেমন: দুপুর এ ৩ মিলি ভিটামিন সি" class="w-full p-3.5 rounded-xl border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm">
                        </div>

                        <button type="submit" class="w-full p-4 bg-teal-700 text-white font-extrabold rounded-xl shadow-lg hover:bg-teal-800 transition transform active:scale-95 text-sm">রিপোর্ট যুক্ত করুন</button>
                    </form>
                </div>

                <!-- 📋 পূর্ববর্তী দিনসমূহের রিপোর্ট -->
                <div id="report-log-section" class="hidden space-y-3">
                    <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">হিস্টরি রেকর্ড</h3>
                    <div id="report-history-container" class="space-y-3">
                        <!-- পূর্ববর্তী এন্ট্রিগুলো এখানে লোড হবে -->
                    </div>
                </div>
            </div>
        </div>
    `;

    // index.html এ থাকা main-app এর নেভিগেশন বারের ওপরে এটি যোগ করবে
    const navBar = mainApp.querySelector('nav');
    if (navBar) {
        navBar.insertAdjacentHTML('beforebegin', dailyReportPageHTML);
    } else {
        mainApp.appendChild(elementFromHTML(dailyReportPageHTML));
    }
}

function populateShipmentDropdown() {
    const selector = document.getElementById('report-shipment-select');
    if (!selector) return;

    selector.innerHTML = '<option value="">-- চালান সিলেক্ট করুন --</option>';

    if (typeof activeShipmentsForTimer !== 'undefined' && activeShipmentsForTimer && Object.keys(activeShipmentsForTimer).length > 0) {
        Object.keys(activeShipmentsForTimer).forEach(k => {
            const chalan = activeShipmentsForTimer[k];
            selector.innerHTML += `<option value="${k}">${chalan.name} (${chalan.chickenCount} মুরগি)</option>`;
        });
    } else {
        selector.innerHTML = '<option value="">-- কোনো সচল চালান পাওয়া যায়নি --</option>';
    }
}

function onReportShipmentChanged() {
    const selector = document.getElementById('report-shipment-select');
    const statsCard = document.getElementById('report-stats');
    const formCard = document.getElementById('report-form-card');
    const logSection = document.getElementById('report-log-section');

    if (!selector || selector.value === "") {
        if (statsCard) statsCard.classList.add('hidden');
        if (formCard) formCard.classList.add('hidden');
        if (logSection) logSection.classList.add('hidden');
        return;
    }

    const shipmentId = selector.value;
    const shipment = activeShipmentsForTimer[shipmentId];

    // দেখান
    statsCard.classList.remove('hidden');
    formCard.classList.remove('hidden');
    logSection.classList.remove('hidden');

    // বাচ্চার বয়স হিসাব করুন
    const startDate = new Date(shipment.startDate);
    const today = new Date();
    const diffTime = today.getTime() - startDate.getTime();
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 1) diffDays = 1;

    document.getElementById('report-bird-age').value = diffDays;
    document.getElementById('report-entry-date').valueAsDate = new Date();

    loadDailyLogs(shipmentId);
}

function loadDailyLogs(shipmentId) {
    const uid = currentUser ? currentUser.uid : "guest";
    const key = `poultry_logs_${uid}_${shipmentId}`;
    const stored = localStorage.getItem(key);
    const logs = stored ? JSON.parse(stored) : [];

    renderDailyLogs(shipmentId, logs);
}

function renderDailyLogs(shipmentId, logs) {
    const container = document.getElementById('report-history-container');
    const divTotalDeaths = document.getElementById('stat-total-deaths');
    const divMortalityRate = document.getElementById('stat-mortality-rate');
    const divAliveCount = document.getElementById('stat-alive-chickens');
    const divCurrentWeight = document.getElementById('stat-current-weight');

    if (!container) return;

    const shipment = activeShipmentsForTimer[shipmentId];
    const initialCount = parseInt(shipment.chickenCount) || 0;

    let totalDeaths = 0;
    let latestWeight = 0;

    logs.forEach(log => {
        totalDeaths += parseInt(log.deaths) || 0;
        if (parseInt(log.avgWeight) > 0) {
            latestWeight = log.avgWeight;
        }
    });

    const aliveCount = Math.max(0, initialCount - totalDeaths);
    const mortalityRate = initialCount > 0 ? ((totalDeaths / initialCount) * 100).toFixed(2) : "0.00";

    // আপার স্ট্যাটাস আপডেট
    if (divTotalDeaths) divTotalDeaths.innerText = `${totalDeaths} টি`;
    if (divMortalityRate) divMortalityRate.innerText = `(মৃত্যু হার: ${mortalityRate}%)`;
    if (divAliveCount) divAliveCount.innerText = `${aliveCount} টি`;
    if (divCurrentWeight) divCurrentWeight.innerText = `সর্বশেষ ওজন: ${latestWeight} গ্রাম`;

    if (logs.length === 0) {
        container.innerHTML = `
            <div class="text-center py-10 text-gray-400 dark:text-gray-500 text-xs bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-750">
                এই চালানে এখনও কোনো দৈনিক রিপোর্ট লিপিবদ্ধ নেই
            </div>
        `;
        return;
    }

    // সাজানো
    const sortedLogs = [...logs].reverse();

    container.innerHTML = sortedLogs.map(log => `
        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-105 dark:border-gray-750 flex justify-between items-start">
            <div>
                <span class="text-xs px-2.5 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-full font-bold">
                    দিন: ${log.age}
                </span>
                <h4 class="font-bold text-gray-800 dark:text-gray-100 text-sm mt-2">${log.date}</h4>
                ${log.note ? `<p class="text-xs text-gray-400 mt-1">📝 ${log.note}</p>` : ''}
            </div>
            
            <div class="text-right text-xs space-y-1 text-gray-500 dark:text-gray-400">
                ${log.deaths > 0 ? `<p class="font-bold text-red-500">মারা গেছে: ${log.deaths} টি</p>` : ''}
                ${log.avgWeight > 0 ? `<p>গড় ওজন: <span class="font-extrabold text-teal-700 dark:text-teal-400">${log.avgWeight} গ্রাম</span></p>` : ''}
                ${log.feed ? `<p>খাবার consumed: ${log.feed}</p>` : ''}
                <button onclick="deleteDailyLogEntry('${shipmentId}', ${log.timestamp})" class="text-red-400 hover:text-red-600 font-bold hover:underline text-[10px] block w-full text-right pt-2">মুছুন</button>
            </div>
        </div>
    `).join('');
}

function saveDailyReportEntry(e) {
    e.preventDefault();

    const shipmentId = document.getElementById('report-shipment-select').value;
    if (!shipmentId) return alert("কোনো চালান সিলেক্ট করা নেই");

    const age = parseInt(document.getElementById('report-bird-age').value) || 1;
    const date = document.getElementById('report-entry-date').value;
    const deaths = parseInt(document.getElementById('report-death-count').value) || 0;
    const avgWeight = parseInt(document.getElementById('report-avg-weight').value) || 0;
    const feed = document.getElementById('report-feed-consumed').value.trim();
    const note = document.getElementById('report-entry-note').value.trim();

    const uid = currentUser ? currentUser.uid : "guest";
    const key = `poultry_logs_${uid}_${shipmentId}`;
    const stored = localStorage.getItem(key);
    const logs = stored ? JSON.parse(stored) : [];

    const newLog = {
        timestamp: Date.now(),
        age,
        date,
        deaths,
        avgWeight,
        feed,
        note
    };

    logs.push(newLog);
    localStorage.setItem(key, JSON.stringify(logs));

    // রিসেট ইনপুট
    document.getElementById('report-death-count').value = '';
    document.getElementById('report-avg-weight').value = '';
    document.getElementById('report-feed-consumed').value = '';
    document.getElementById('report-entry-note').value = '';

    onReportShipmentChanged(); // লোড রিফ্রেশ
    showToast("দৈনিক রিপোর্ট সফলভাবে লিপিবদ্ধ হয়েছে ✅");
}

function deleteDailyLogEntry(shipmentId, timestamp) {
    if (!confirm("আপনি কি দৈনিক রিপোর্টের এই দিনটি মুছে ফেলতে চান?")) return;

    const uid = currentUser ? currentUser.uid : "guest";
    const key = `poultry_logs_${uid}_${shipmentId}`;
    const stored = localStorage.getItem(key);
    if (!stored) return;

    let logs = JSON.parse(stored);
    logs = logs.filter(l => l.timestamp !== timestamp);
    localStorage.setItem(key, JSON.stringify(logs));

    onReportShipmentChanged();
    showToast("রিপোর্ট ডিলিট করা হয়েছে ✅");
}

// ইউটিলিটি
function elementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
