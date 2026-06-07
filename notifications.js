// 🐔 আমার খামার - স্মার্ট ম্যানেজার
// 🔔 নোটিফিকেশন সিস্টেম

function toggleNotifications() {
    const dropdown = document.getElementById('notif-dropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('hidden');
    if (!dropdown.classList.contains('hidden')) {
        renderNotifications();
    }
}

function clearNotifications() {
    const notifList = document.getElementById('notif-list');
    const badge = document.getElementById('notif-badge');
    if (notifList) {
        notifList.innerHTML = `
            <div class="p-6 text-center text-gray-400 dark:text-gray-500 text-xs">
                কোনো নোটিফিকেশন নেই
            </div>
        `;
    }
    if (badge) badge.classList.add('hidden');
}

function renderNotifications() {
    const notifList = document.getElementById('notif-list');
    const badge = document.getElementById('notif-badge');
    if (!notifList) return;

    let notifications = [];

    // ১. স্বয়ংক্রিয় ভ্যাকসিন নোটিফিকেশন (ড্যাশবোর্ড চালান অনুযায়ী)
    if (typeof activeShipmentsForTimer !== 'undefined' && activeShipmentsForTimer) {
        const now = new Date().getTime();
        Object.keys(activeShipmentsForTimer).forEach(k => {
            const chalan = activeShipmentsForTimer[k];
            const targetDateStr = chalan.timestamp ? chalan.timestamp : `${chalan.startDate}T00:00:00`;
            const startTime = new Date(targetDateStr).getTime();
            const difference = now - startTime;
            const daysPassed = Math.floor(difference / (1000 * 60 * 60 * 24));

            if (daysPassed >= 0) {
                // ব্রয়লার ভ্যাক্সিন নোটিফিকেশন উদাহরণ
                if (daysPassed === 5 || daysPassed === 6) {
                    notifications.push({
                        title: "রাণীক্ষেত ভ্যাকসিন সেশন! 💉",
                        desc: `"${chalan.name}" চালানের বয়স আজ ${daysPassed} দিন। আগামীকালের মধ্যে ১ম ভ্যাকসিন (BCRDV) স সম্পন্ন করুন।`,
                        time: "আজকের টিপস",
                        icon: "📌"
                    });
                } else if (daysPassed === 11 || daysPassed === 12) {
                    notifications.push({
                        title: "গামবোরো ভ্যাকসিন সেশন! 💉",
                        desc: `"${chalan.name}" চালানের বয়স আজ ${daysPassed} দিন। গামবোরো (IBD) প্রতিরোধের টিকা দিন।`,
                        time: "জরুরী",
                        icon: "⏰"
                    });
                } else if (daysPassed === 23 || daysPassed === 24) {
                    notifications.push({
                        title: "বুস্টার ভ্যাকসিন সেশন! 💉",
                        desc: `"${chalan.name}" চালানের বয়স আজ ${daysPassed} দিন। রাণীক্ষেত বুস্টার ডোজ (LaSota) দিতে ভুলবেন না।`,
                        time: "স্মারক",
                        icon: "⚡"
                    });
                }
            }
        });
    }

    // ২. সাধারণ শিক্ষামূলক ও খামার পরিচালনা টিপস
    const tips = [
        {
            title: "হিট স্ট্রোক প্রতিরোধ ❄️",
            desc: "তাপমাত্রা বেশি হলে পানির সাথে স্যালাইন অথবা ভিটামিন সি মিশিয়ে দিন। দুপুর ১২টা হতে বিকাল ৪টা পর্যন্ত বেশি খাবার দেওয়া পরিহার করুন।",
            time: "ঋতু সতর্কবার্তা"
        },
        {
            title: "খামারের জৈবনিরাপত্তা 🛡️",
            desc: "অননুমোদিত কোনো দর্শনার্থী বা ব্যক্তিকে খামারে ঢুকতে দেবেন না। প্রতিটি ঘর সর্বদা জীবাণুমুক্ত রাখুন।",
            time: "টিপস"
        },
        {
            title: "সঠিক তাপমাত্রা নিয়ন্ত্রণ 🌡️",
            desc: "বাচ্চা ব্রুডিং কালীন প্রথম দিন ঘরের তাপমাত্রা ৯৫° ফা. নিশ্চিত করুন। প্রতি সপ্তাহে ৫ ডিগ্রি করে কমাতে পারেন।",
            time: "ব্রুডিং গাইড"
        }
    ];

    // র্যান্ডম ১টি টিপস অ্যাড করুন যাতে খামারি উপকৃত হন
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    notifications.push({
        title: randomTip.title,
        desc: randomTip.desc,
        time: randomTip.time,
        icon: "💡"
    });

    // ব্যাজ আপডেট
    if (badge) {
        if (notifications.length > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    // নোটিফিকেশন রেন্ডারিং
    if (notifications.length === 0) {
        notifList.innerHTML = `
            <div class="p-6 text-center text-gray-400 dark:text-gray-500 text-xs">
                কোনো নোটিফিকেশন নেই
            </div>
        `;
        return;
    }

    notifList.innerHTML = notifications.map(notif => `
        <div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition flex gap-3">
            <span class="text-xl flex-shrink-0 mt-0.5">${notif.icon || "🔔"}</span>
            <div class="min-w-0 flex-grow">
                <h4 class="font-bold text-gray-800 dark:text-gray-100 text-sm leading-snug">${notif.title}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">${notif.desc}</p>
                <span class="text-[10px] font-bold text-teal-600 dark:text-teal-400 block mt-1.5 uppercase tracking-wider">${notif.time}</span>
            </div>
        </div>
    `).join('');
}

// প্রতি ১০ মিনিটে নোটিফিকেশন চেক ও রেন্ডার
setInterval(renderNotifications, 10 * 60 * 1000);

// প্রথম সেটআপ
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(renderNotifications, 1500);
});
