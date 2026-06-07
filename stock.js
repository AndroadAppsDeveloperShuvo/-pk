// 🐔 আমার খামার - স্মার্ট ম্যানেজার
// 📦 ইনভেন্টরি ও আমার স্টক ম্যানেজমেন্ট সিস্টেম

function openStockPage() {
    setupStockHTML();
    navigate('stock-page');
    loadStockData();
}

function setupStockHTML() {
    if (document.getElementById('stock-page')) return;

    const mainApp = document.getElementById('main-app');
    if (!mainApp) return;

    const stockPageHTML = `
        <div id="stock-page" class="page bg-gray-50 dark:bg-gray-900 pb-28">
            <header class="sticky top-0 z-10 p-5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 flex justify-between items-center shadow-sm">
                <div class="flex items-center">
                    <button onclick="goBack()" class="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <span class="material-symbols-outlined dark:text-white">arrow_back</span>
                    </button>
                    <h1 class="text-lg font-bold dark:text-white">আমার স্টক</h1>
                </div>
                <button onclick="openAddStockModal()" class="px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold shadow hover:bg-teal-800 transition">
                    নতুন উপকরণ
                </button>
            </header>

            <div class="p-5 space-y-6">
                <!-- 📊 ভিজ্যুয়াল স্ট্যাটাস সামারি -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-750">
                        <span class="text-xs text-gray-400 font-bold uppercase">মোট আইটেম</span>
                        <h2 id="total-stock-items" class="text-2xl font-bold mt-1 text-teal-600 dark:text-teal-400">০ টি</h2>
                    </div>
                    <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-750">
                        <span class="text-xs text-gray-400 font-bold uppercase">কম পণ্য সতর্কবার্তা</span>
                        <h2 id="danger-stock-items" class="text-2xl font-bold mt-1 text-red-500">০ টি</h2>
                    </div>
                </div>

                <!-- 🛒 স্টকের তালিকা -->
                <div class="space-y-4">
                    <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">উপকরণের তালিকা</h3>
                    <div id="stock-list" class="space-y-3">
                        <!-- স্টকের ডেটা এখানে ডাইনামিকভাবে রেন্ডার হবে -->
                    </div>
                </div>
            </div>

            <!-- 📥 উপকরণ যুক্ত করার মডাল -->
            <div id="add-stock-modal" class="hidden fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-sm relative shadow-2xl border dark:border-gray-750">
                    <button onclick="closeAddStockModal()" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                    <h2 class="text-lg font-bold text-gray-800 dark:text-white mb-4">নতুন উপকরণ যুক্ত করুন</h2>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="text-xs font-bold text-gray-400 block mb-1">উপকরণের নাম</label>
                            <input type="text" id="new-stock-name" placeholder="যেমন: স্টার্টার খাবার বস্তা, তুষ" class="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-400 block mb-1">পরিমাণ (সংখ্যা)</label>
                            <input type="number" id="new-stock-qty" placeholder="যেমন: ১০" class="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-400 block mb-1">পরিমাপ একক</label>
                            <select id="new-stock-unit" class="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
                                <option>বস্তা</option>
                                <option>কেজি</option>
                                <option>লিটার</option>
                                <option>পিস</option>
                                <option>বক্স</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-400 block mb-1">ন্যূনতম সতর্কবার্তা সীমা</label>
                            <input type="number" id="new-stock-alert" placeholder="যেমন: ২" class="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
                        </div>
                        <button onclick="saveNewStockItem()" class="w-full p-3.5 bg-teal-700 text-white font-bold rounded-xl shadow hover:bg-teal-800 transition transform active:scale-95 text-sm">সেভ করুন</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // index.html এ থাকা main-app এর নেভিগেশন বারের ওপরে এটি যোগ করবে
    const navBar = mainApp.querySelector('nav');
    if (navBar) {
        navBar.insertAdjacentHTML('beforebegin', stockPageHTML);
    } else {
        mainApp.appendChild(elementFromHTML(stockPageHTML));
    }
}

// ডিফল্ট ডেমো আইটেম
const defaultStockItems = [
    { id: "st1", name: "স্টার্টার খাবার বস্তা", qty: 15, alertLimit: 3, unit: "বস্তা", icon: "🌾" },
    { id: "st2", name: "গ্রোয়ার খাবার বস্তা", qty: 25, alertLimit: 5, unit: "বস্তা", icon: "🌾" },
    { id: "st3", name: "কাঠের গুড়া (লिटर)", qty: 8, alertLimit: 2, unit: "বস্তা", icon: "🪵" },
    { id: "st4", name: "জীবাণুনাশক লিকুইড", qty: 4, alertLimit: 1, unit: "লিটার", icon: "🧪" }
];

function loadStockData() {
    const uid = currentUser ? currentUser.uid : "guest";
    let stored = localStorage.getItem(`poultry_stock_${uid}`);
    let stockItems = stored ? JSON.parse(stored) : defaultStockItems;

    renderStock(stockItems);
}

function saveStockToLocalStorage(items) {
    const uid = currentUser ? currentUser.uid : "guest";
    localStorage.setItem(`poultry_stock_${uid}`, JSON.stringify(items));
}

function renderStock(items) {
    const list = document.getElementById('stock-list');
    const totalCount = document.getElementById('total-stock-items');
    const alertCount = document.getElementById('danger-stock-items');
    if (!list) return;

    list.innerHTML = '';
    let alertNum = 0;

    items.forEach(item => {
        const isLow = item.qty <= item.alertLimit;
        if (isLow) alertNum++;

        // সুন্দর আইকন চয়ন
        let itemIcon = item.icon || "📦";
        if (item.name.includes("খাবার") || item.name.includes("ফিড")) itemIcon = "🌾";
        else if (item.name.includes("গুড়া") || item.name.includes("তুষ") || item.name.includes("কাঠ")) itemIcon = "🪵";
        else if (item.name.includes("জীবাণু") || item.name.includes("স্প্রে")) itemIcon = "🧪";
        else if (item.name.includes("ঔষধ") || item.name.includes("ভ্যাকসিন")) itemIcon = "💊";

        list.innerHTML += `
            <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-750 flex items-center justify-between shadow-sm hover:shadow transition">
                <div class="flex items-center gap-3.5 min-w-0">
                    <span class="text-2xl">${itemIcon}</span>
                    <div class="min-w-0">
                        <h4 class="font-bold text-gray-800 dark:text-gray-100 text-sm truncate">${item.name}</h4>
                        <p class="text-xs text-gray-400 mt-0.5">${item.alertLimit} ${item.unit} এর কম হলে নোটিফাই করবে</p>
                    </div>
                </div>

                <div class="flex items-center gap-3 flex-shrink-0">
                    <div class="flex items-center border dark:border-gray-700 bg-gray-50 dark:bg-gray-750 rounded-lg p-0.5 overflow-hidden">
                        <button onclick="adjustQuantity('${item.id}', -1)" class="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition font-bold text-sm">-</button>
                        <span class="px-2 text-sm font-extrabold ${isLow ? 'text-red-500' : 'text-teal-700 dark:text-teal-400'} scroll-py-1 min-w-[24px] text-center">${item.qty}</span>
                        <button onclick="adjustQuantity('${item.id}', 1)" class="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition font-bold text-sm">+</button>
                    </div>
                    <span class="text-[11px] font-bold text-gray-400">${item.unit}</span>
                    <button onclick="deleteStockItem('${item.id}')" class="text-gray-300 hover:text-red-500 transition p-1">
                        <span class="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            </div>
        `;
    });

    if (totalCount) totalCount.innerText = `${items.length} টি`;
    if (alertCount) alertCount.innerText = `${alertNum} টি`;
}

function adjustQuantity(id, change) {
    const uid = currentUser ? currentUser.uid : "guest";
    let stored = localStorage.getItem(`poultry_stock_${uid}`);
    let items = stored ? JSON.parse(stored) : defaultStockItems;

    items = items.map(item => {
        if (item.id === id) {
            const newQty = Math.max(0, item.qty + change);
            if (newQty <= item.alertLimit && newQty < item.qty) {
                showToast(`সতর্কবার্তা ⚠️: ${item.name} এর স্টক কমে গেছে!`);
            }
            return { ...item, qty: newQty };
        }
        return item;
    });

    saveStockToLocalStorage(items);
    renderStock(items);
}

function deleteStockItem(id) {
    if (!confirm("আপনি কি স্টকের এই উপকরণটি মুছে ফেলতে চান?")) return;
    const uid = currentUser ? currentUser.uid : "guest";
    let stored = localStorage.getItem(`poultry_stock_${uid}`);
    let items = stored ? JSON.parse(stored) : defaultStockItems;

    items = items.filter(i => i.id !== id);

    saveStockToLocalStorage(items);
    renderStock(items);
    showToast("সফলভাবে মুছে ফেলা হয়েছে ✅");
}

function openAddStockModal() {
    document.getElementById('add-stock-modal').classList.remove('hidden');
}

function closeAddStockModal() {
    document.getElementById('add-stock-modal').classList.add('hidden');
    // রিসেট ইনপুট
    document.getElementById('new-stock-name').value = '';
    document.getElementById('new-stock-qty').value = '';
    document.getElementById('new-stock-alert').value = '';
}

function saveNewStockItem() {
    const name = document.getElementById('new-stock-name').value.trim();
    const qty = parseInt(document.getElementById('new-stock-qty').value) || 0;
    const unit = document.getElementById('new-stock-unit').value;
    const alertLimit = parseInt(document.getElementById('new-stock-alert').value) || 2;

    if (!name) {
        alert("দয়া করে উপকরণের নাম দিন");
        return;
    }

    const uid = currentUser ? currentUser.uid : "guest";
    let stored = localStorage.getItem(`poultry_stock_${uid}`);
    let items = stored ? JSON.parse(stored) : defaultStockItems;

    const newItem = {
        id: "st_" + Date.now(),
        name,
        qty,
        unit,
        alertLimit
    };

    items.push(newItem);
    saveStockToLocalStorage(items);
    renderStock(items);
    closeAddStockModal();
    showToast("নতুন উপকরণ স্টক এ যুক্ত হয়েছে ✅");
}
