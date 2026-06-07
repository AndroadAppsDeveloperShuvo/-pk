// 🐔 আমার খামার - স্মার্ট ম্যানেজার
// 💊 ওষুধের তালিকা ও গতিশীল ভ্যাকসিন শিডিউল সিস্টেম

let currentBirdType = 'broiler';
let poultryMedicines = [];

const defaultPoultryMedicines = [
    // === بروائلার (Broiler) ===
    {
        id: "b1",
        birdType: "broiler",
        name: "গ্লুকোজ ও ইলেকট্রোলাইট পানি",
        days: "১-৩ দিন",
        time: "সকাল ও দুপুর (১২-২৪ ঘণ্টা)",
        purpose: "বাচ্চা পরিবহনজনিত ক্লান্তি ও ধকল দূর করতে",
        dosage: "১ গ্রাম প্রতি লিটার পরিষ্কার পানিতে মিশিয়ে খাওয়াতে হবে।",
        category: "electrolyte",
        icon: "💧"
    },
    {
        id: "b2",
        birdType: "broiler",
        name: "অ্যান্টিবায়োটিক থেরাপি (যেমন: এনরোফ্লক্সাসিন / নিওমাইসিন)",
        days: "১-৩ দিন",
        time: "রাত (৮-১২ ঘণ্টা)",
        purpose: "নাভি শুকানো এবং ব্যাকটেরিয়াজনিত ইনফেকশন প্রতিরোধে",
        dosage: "১ মিলি/গ্রাম প্রতি লিটার পানিতে মিশিয়ে টানা ৩ দিন।",
        category: "antibiotic",
        icon: "💊"
    },
    {
        id: "b3",
        birdType: "broiler",
        name: "ভিটামিন AD3E এবং বি-কমপ্লেক্স",
        days: "৪-৫ দিন",
        time: "সকাল ও রাত (১২ ঘণ্টা)",
        purpose: "বাচ্চার হাড় শক্ত করা, দৈহিক বৃদ্ধি ও ধকল দূর করতে",
        dosage: "AD3E: ১ মিলি প্রতি ৩-৪ লিটার এবং বি-কমপ্লেক্স: ১ মিলি প্রতি লিটার পানিতে।",
        category: "vitamin",
        icon: "🧪"
    },
    {
        id: "b4",
        birdType: "broiler",
        name: "রাণীক্ষেত ও ব্রঙ্কাইটিস ভ্যাকসিন (BCRDV / Ma5)",
        days: "৬ দিন",
        time: "সকাল (ঠান্ডা আবহাওয়ায়)",
        purpose: "মারাত্মক রাণীক্ষেত ও ব্রঙ্কাইটিস রোগ প্রতিরোধ করতে",
        dosage: "১ ফোঁটা করে প্রতিটি বাচ্চার এক চোখে দিতে হবে।",
        category: "vaccine",
        icon: "💉"
    },
    {
        id: "b5",
        birdType: "broiler",
        name: "ক্যালসিয়াম ও ভিটামিন ডি৩ (ক্যালডি-৩)",
        days: "৮-১০ দিন",
        time: "দুপুর (৮ ঘণ্টা)",
        purpose: "ল্যাংড়া হওয়া রোগ প্রতিরোধ ও বাচ্চার গ্রোথ তরান্বিত করতে",
        dosage: "১-২ মিলি প্রতি লিটার পানিতে মিশিয়ে খাওয়ান।",
        category: "calcium",
        icon: "🦴"
    },
    {
        id: "b6",
        birdType: "broiler",
        name: "গামবোরো ভ্যাকসিন (Gumboro - IBD)",
        days: "১২ দিন",
        time: "সকাল (সূর্য ওঠার আগে)",
        purpose: "গামবোরো (IBD) ভাইরাস রোগ হতে খামারকে শতভাগ সুরক্ষিত রাখতে",
        dosage: "এক ফোঁটা এক চোখে দিতে হবে অথবা ঠাণ্ডা পানিতে মিশিয়ে খাওয়াতে হবে।",
        category: "vaccine",
        icon: "💉"
    },
    {
        id: "b7",
        birdType: "broiler",
        name: "লিভার টনিক এবং কিডনি প্রটেক্টর",
        days: "১৪-১৬ দিন",
        time: "সকাল ও রাত (১২ ঘণ্টা)",
        purpose: "ওষুধের পার্শ্বপ্রতিক্রিয়া দূর করে লিভার ও কিডনি সচল রাখতে",
        dosage: "১ মিলি লিভার টনিক ও ১ মিলি কিডনি প্রটেক্টর প্রতি লিটার পানিতে।",
        category: "tonic",
        icon: "🌿"
    },
    {
        id: "b8",
        birdType: "broiler",
        name: "গামবোরো বুস্টার ভ্যাক্সিন (IBD Booster)",
        days: "১৯ দিন",
        time: "সকাল বা বিকেল",
        purpose: "গামবোরো রোগ প্রতিরোধ ক্ষমতা আরও সুদৃঢ় করতে",
        dosage: "পানির পাত্র সম্পূর্ণ পরিষ্কার করে ঠান্ডা পানিতে ডিস্ট্রিবিউট করতে হবে (২ ঘণ্টার মধ্যে)।",
        category: "vaccine",
        icon: "💉"
    },
    {
        id: "b9",
        birdType: "broiler",
        name: "জিঙ্ক ও ভিটামিন সি",
        days: "২১-২৩ দিন",
        time: "দুপুর ও রাত",
        purpose: "শরীরে পালক দ্রুত গজানো এবং গরমের ধকল ও হিট স্ট্রোক শান্ত করতে",
        dosage: "জিঙ্ক: ১ মিলি প্রতি লিটার এবং ভিটামিন সি: ১ গ্রাম প্রতি ৩ লিটার পানিতে।",
        category: "immunity",
        icon: "❄️"
    },
    {
        id: "b10",
        birdType: "broiler",
        name: "রাণীক্ষেত বুস্টার ভ্যাক্সিন (Lasota/BCRDV Booster)",
        days: "২৪ দিন",
        time: "সকাল (ঠান্ডা পানি)",
        purpose: "রাণীক্ষেত ভাইরাসের দীর্ঘমেয়াদী প্রতিরোধ ক্ষমতা সচল করতে",
        dosage: "ক্লোরিনমুক্ত ঠান্ডা পানিতে গুলিয়ে ২ ঘণ্টার মধ্যে খাওয়াতে হবে।",
        category: "vaccine",
        icon: "💉"
    },
    {
        id: "b11",
        birdType: "broiler",
        name: "ক্যালসিয়াম ও মাল্টি-ভিটামিন কোর্স",
        days: "২৮-৩০ দিন",
        time: "সকাল ও দুপুর",
        purpose: "চূড়ান্ত ওজন বৃদ্ধি, হাড়ের ঘনত্ব বাড়ানো ও মাংস কষাতে",
        dosage: "ক্যালসিয়াম: ২ মিলি এবং গ্রোথ প্রমোটার ১ মিলি প্রতি লিটার।",
        category: "calcium",
        icon: "⚖️"
    },

    // === কালার বার্ড (Color Bird) ===
    {
        id: "cb1",
        birdType: "color_bird",
        name: "ইলেক্ট্রোলাইট ও গ্লুকোজ পানি",
        days: "১-৩ দিন",
        time: "সকাল ও দুপুর",
        purpose: "বাচ্চা স্থানান্তর ধকল দূর করতে",
        dosage: "১.৫ গ্রাম গ্লুকোজ প্রতি লিটার পানিতে।",
        category: "electrolyte",
        icon: "💧"
    },
    {
        id: "cb2",
        birdType: "color_bird",
        name: "ভিটামিন AD3E সাপ্লিমেন্ট",
        days: "৪-৬ দিন",
        time: "সকাল ও রাত",
        purpose: "বাচ্চার রোগ প্রতিরোধ ক্ষমতা বাড়ানো ও চঞ্চল করতে",
        dosage: "১ মিলি AD3E প্রতি ৩ লিটার পানিতে।",
        category: "vitamin",
        icon: "🧪"
    },
    {
        id: "cb3",
        birdType: "color_bird",
        name: "রাণীক্ষেত এবং ব্রঙ্কাইটিস �        purpose: "রাণীক্ষেত রোগের বুস্টার প্রটেকশন",
        dosage: "পানিতে মিশিয়ে বিতরণ করতে হবে।",
        category: "vaccine",
        icon: "💉"
    },
    {
        id: "s8",
        birdType: "sonali",
        name: "ফাউল পক্স ভ্যাক্সিন (Fowl Pox)",
        days: "৩৫ দিন",
        time: "সকাল বা বিকেল",
        purpose: "বসন্ত বা পক্স রোগ প্রতিরোধ করা",
        dosage: "বিশেষ নিডেলের সাহায্যে ডানার চামড়ায় পুশ করতে হবে।",
        category: "vaccine",
        icon: "💉"
    },

    // === দেশি (Deshi) ===
    {
        id: "d1",
        birdType: "deshi",
        name: "লেবু-মধু ও ইমুনো পানি",
        days: "১-৩ দিন",
        time: "ভাত বা ফিড খাওয়ার পর",
        purpose: "বাচ্চার ধকল কমানো এবং প্রাকৃতিক শক্তি সরবরাহ",
        dosage: "১ চামচ মধু ও অর্ধেক লেবুর রস প্রতি লিটার পানিতে।",
        category: "electrolyte",
        icon: "💧"
    },
    {
        id: "d2",
        birdType: "deshi",
        name: "ভিটামিন ও অ্যামিনো অ্যাসিড",
        days: "৪-৬ দিন",
        time: "সকাল",
        purpose: "বাচ্চার রোগ প্রতিরোধ ক্ষমতা শক্তিশালী করতে",
        dosage: "১ মিলি প্রতি ২ লিটার পানিতে মিশিয়ে।",
        category: "vitamin",
        icon: "🧪"
    },
    {
        id: "d3",
        birdType: "deshi",
        name: "রাণীক্ষেত ভ্যাক্সিন চোখের ড্রপ (BCRDV)",
        days: "৮ দিন",
        time: "সকাল (ঠান্ডা সময়)",
        purpose: "দেশি মুরগির রাণীক্ষেত রোগ থেকে বাঁচতে",
        dosage: "১ ফোঁটা করে চোখে।",
        category: "vaccine",
        icon: "💉"
    },
    {
        id: "d4",
        birdType: "deshi",
        name: "গামবোরো ভ্যাক্সিন (IBD)",
        days: "১৫ দিন",
        time: "সকাল",
        purpose: "গামবোরো রোগ প্রতিরোধ গড়ে তুলতে",
        dosage: "চোখে এক ফোঁটা করে ড্রপ বা পানিতে।",
        category: "vaccine",
        icon: "💉"
    },
    {
        id: "d5",
        birdType: "deshi",
        name: "রাণীক্ষেত বুস্টার ভ্যাক্সিন লাসোটা",
        days: "২৭ দিন",
        time: "সকাল",
        purpose: "রাণীক্ষেত এর রোগ প্রতিরোধ ক্ষমতা সতেজ রাখতে",
        dosage: "পানি ছেঁকে ঠাণ্ডা পানিতে মিশিয়ে দিতে হবে।",
        category: "vaccine",
        icon: "💉"
    },
    {
        id: "d6",
        birdType: "deshi",
        name: "কৃমিনাশক ও গ্রোথ কোর্স (Deworming)",
        days: "৪০-৪৫ দিন",
        time: "সকাল (খালি পেটে)",
        purpose: "মুরগির পেটের কৃমি দূরীকরণ ও ওজনে ভারসাম্য রক্ষা",
        dosage: "প্যাকেটের গায়ে উল্লেখিত মাত্রা অনুযায়ী লিটার পানিতে গুলিয়ে খাওয়ান।",
        category: "tonic",
        icon: "🐛"
    }
];

// 🎨 উইজার্ড ফিল্টারিং ফাংশন   <div class="flex items-start gap-2.5">
                        <span class="material-symbols-outlined text-yellow-600 dark:text-yellow-400 text-lg flex-shrink-0 mt-0.5">healing</span>
                        <div>
                            <span class="font-bold text-gray-500 dark:text-gray-400 text-xs block">মূল কার্যকারিতা</span>
                            <span class="text-gray-700 dark:text-gray-300 font-medium">${med.purpose}</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-2.5">
                        <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg flex-shrink-0 mt-0.5">science</span>
                        <div>
                            <span class="font-bold text-gray-500 dark:text-gray-400 text-xs block">ব্যবহার ও মাত্রা</span>
                            <span class="text-gray-700 dark:text-gray-300 font-medium">${med.dosage}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ফায়ারবেস থেকে ওষুধগুলোর ডেটা রিয়েল-টাইম লোড ও সিঙ্ক করন
function initializeFirebaseMedicines(uid) {
    const activeUid = uid || (typeof currentUser !== 'undefined' && currentUser ? currentUser.uid : null);
    if (activeUid && typeof db !== 'undefined' && db) {
        db.ref(`users/${activeUid}/medicines`).on('value', s => {
            const data = s.val();
            if (data) {
                let list = [];
                if (Array.isArray(data)) {
                    list = data.filter(item => item !== null);
                } else {
                    list = Object.values(data);
                }
                poultryMedicines = list;
                renderFilteredMedicines();
            } else {
                // ফায়ারবেস ফাকা থাকলে প্রথমবার ডিফল্ট লিস্ট দিয়ে সেভ করা হবে (অটো-সীডিং)
                db.ref(`users/${activeUid}/medicines`).set(defaultPoultryMedicines)
                    .then(() => {
                        console.log("Firebase medicines list successfully seeded! ✅");
                    })
                    .catch(err => {
                        console.error("Failed to seed Firebase medicines:", err);
                    });
                poultryMedicines = [...defaultPoultryMedicines];
                renderFilteredMedicines();
            }
        }, err => {
            console.error("Failed to load medicines from Firebase, using offline defaults:", err);
            poultryMedicines = [...defaultPoultryMedicines];
            renderFilteredMedicines();
        });
    } else {
        // যদি ফায়ারবেস অবজেক্ট ডিটেক্ট না করা যায় বা লগইন না থাকে
        poultryMedicines = [...defaultPoultryMedicines];
        renderFilteredMedicines();
    }
}

// নতুন ওষুধের ফর্ম প্রস্তুতকরণ
function prepareMedicineForm() {
    document.getElementById('medicine-id').value = '';
    document.getElementById('medicine-name-input').value = '';
    document.getElementById('medicine-days').value = '';
    document.getElementById('medicine-time').value = '';
    document.getElementById('medicine-purpose').value = '';
    document.getElementById('medicine-dosage').value = '';
    document.getElementById('medicine-bird-type').value = currentBirdType;
    document.getElementById('medicine-category').value = 'electrolyte';
    document.getElementById('medicine-icon').value = '💧';
    
    document.getElementById('medicine-form-title').innerText = "নতুন ওষুধ যোগ করুন";
    navigate('add-medicine-page');
}

// ওষুধের তথ্য পরিবর্তন/সম্পাদনা
function editMedicine(medId) {
    const med = poultryMedicines.find(m => m.id === medId);
    if (!med) return;
    
    document.getElementById('medicine-id').value = med.id;
    document.getElementById('medicine-bird-type').value = med.birdType;
    document.getElementById('medicine-name-input').value = med.name;
    document.getElementById('medicine-days').value = med.days;
    document.getElementById('medicine-category').value = med.category || 'electrolyte';
    document.getElementById('medicine-time').value = med.time;
    document.getElementById('medicine-purpose').value = med.purpose;
    document.getElementById('medicine-dosage').value = med.dosage;
    document.getElementById('medicine-icon').value = med.icon || '💧';
    
    document.getElementById('medicine-form-title').innerText = "ওষুধ পরিবর্তন করুন";
    navigate('add-medicine-page');
}

// ওষুধ ফায়ারবেসে সংরক্ষন/আপডেট করা
function saveMedicine(e) {
    e.preventDefault();
    if (!currentUser) return alert("লগইন নেই");
    
    const medId = document.getElementById('medicine-id').value;
    const key = medId || db.ref(`users/${currentUser.uid}/medicines`).push().key;
    const d = {
        id: key,
        birdType: document.getElementById('medicine-bird-type').value,
        name: document.getElementById('medicine-name-input').value,
        days: document.getElementById('medicine-days').value,
        category: document.getElementById('medicine-category').value,
        time: document.getElementById('medicine-time').value,
        purpose: document.getElementById('medicine-purpose').value,
        dosage: document.getElementById('medicine-dosage').value,
        icon: document.getElementById('medicine-icon').value
    };
    
    if (!navigator.onLine) showToast("এড হয়েছে, আপডেট হতে নেটওয়ার্ক প্রয়োজন ⚠️");
    
    db.ref(`users/${currentUser.uid}/medicines/${key}`).set(d).then(() => {
        if (navigator.onLine) showToast("ওষুধ সফলভাবে সেভ হয়েছে ✅");
        goBack();
    }).catch(err => {
        showToast("ত্রুটি ঘটেছে ❌");
        console.error(err);
    });
}

// ওষুধ মুছে ফেলা
function deleteMedicine(medId) {
    if (!currentUser) return alert("লগইন নেই");
    if (confirm("এই ওষুধটি কি তালিকা থেকে মুছে ফেলবেন?")) {
        db.ref(`users/${currentUser.uid}/medicines/${medId}`).remove().then(() => {
            showToast("ওষুধ মুছে ফেলা হয়েছে ✅");
        }).catch(err => {
            showToast("মুছে ফেলা সম্ভব হয়নি ❌");
            console.error(err);
        });
    }
} ফাংশন
function setBirdFilter(typeBengali) {
    // বাংলা থেকে ইংরেজি কনভার্ট (যদি প্রয়োজন হয়)
    let typeMap = {
        'ব্রয়লার': 'broiler',
        'কালার বার্ড': 'color_bird',
        'সোনালি': 'sonali',
        'দেশি': 'deshi',
        'broiler': 'broiler',
        'color_bird': 'color_bird',
        'sonali': 'sonali',
        'deshi': 'deshi'
    };

    currentBirdType = typeMap[typeBengali] || 'broiler';

    // বাটন গুলোর অ্যাক্টিভ স্টাইল বা রিস্টাইল হ্যান্ডলিং
    document.querySelectorAll('.bird-filter-btn').forEach(btn => {
        const dType = btn.getAttribute('data-type');
        if (dType === currentBirdType) {
            btn.classList.remove('bg-white', 'dark:bg-gray-800', 'border', 'border-gray-200', 'dark:border-gray-700', 'text-gray-600', 'dark:text-gray-300');
            btn.classList.add('bg-teal-700', 'text-white', 'shadow-md', 'scale-105');
        } else {
            btn.classList.remove('bg-teal-700', 'text-white', 'shadow-md', 'scale-105');
            btn.classList.add('bg-white', 'dark:bg-gray-800', 'border', 'border-gray-200', 'dark:border-gray-700', 'text-gray-600', 'dark:text-gray-300');
        }
    });

    renderFilteredMedicines();
}

// 🔎 গতিশীল সার্চ এবং ওষুধ রেন্ডারিংই ইঞ্জিন
function renderFilteredMedicines() {
    const listContainer = document.getElementById('medicineListContainer');
    if (!listContainer) return;

    const searchQuery = document.getElementById('medicineSearch').value.toLowerCase().trim();
    
    // ক্যাটাগরি কালার থিম ম্যাপার
    const categoryColors = {
        electrolyte: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
        antibiotic: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
        vitamin: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
        vaccine: 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
        calcium: 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
        tonic: 'bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800',
        immunity: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800'
    };

    // ডেটা ফিল্টারিং
    const filtered = poultryMedicines.filter(med => {
        const matchesType = med.birdType === currentBirdType;
        const matchesSearch = med.name.toLowerCase().includes(searchQuery) ||
                              med.days.toLowerCase().includes(searchQuery) ||
                              med.time.toLowerCase().includes(searchQuery) ||
                              med.purpose.toLowerCase().includes(searchQuery);
        return matchesType && matchesSearch;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-16 px-4 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-750 shadow-sm">
                <span class="material-symbols-outlined text-gray-400 dark:text-gray-500 text-5xl">find_in_page</span>
                <p class="text-gray-500 dark:text-gray-400 mt-3 font-medium">কোনো ওষুধ বা ভ্যাক্সিন পাওয়া যায়নি</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">অনুগ্রহ করে ওষুধের নাম, দিন বা সময় অন্য কিছু লিখে চেষ্টা করুন।</p>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = filtered.map(med => {
        const catStyle = categoryColors[med.category] || 'bg-gray-100 text-gray-700 border-gray-200';
        return `
            <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                <div class="flex justify-between items-start mb-3">
                    <span class="text-xs px-3 py-1.5 rounded-full font-bold ${catStyle} border">
                        📅 ${med.days}
                    </span>
                    <span class="text-2xl">${med.icon}</span>
                </div>
                
                <h3 class="text-base font-bold text-gray-800 dark:text-gray-100 leading-tight mb-2">
                    ${med.name}
                </h3>
                
                <div class="space-y-2 mt-4 pt-4 border-t border-gray-50 dark:border-gray-700 text-sm">
                    <div class="flex items-start gap-2.5">
                        <span class="material-symbols-outlined text-teal-600 dark:text-teal-400 text-lg flex-shrink-0 mt-0.5">query_builder</span>
                        <div>
                            <span class="font-bold text-gray-500 dark:text-gray-400 text-xs block">সময়কাল</span>
                            <span class="text-gray-700 dark:text-gray-300 font-medium">${med.time}</span>
                        </div>
                    </div>
                    
                    <div class="flex items-start gap-2.5">
                        <span class="material-symbols-outlined text-yellow-600 dark:text-yellow-400 text-lg flex-shrink-0 mt-0.5">healing</span>
                        <div>
                            <span class="font-bold text-gray-500 dark:text-gray-400 text-xs block">মূল কার্যকারিতা</span>
                            <span class="text-gray-700 dark:text-gray-300 font-medium">${med.purpose}</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-2.5">
                        <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg flex-shrink-0 mt-0.5">science</span>
                        <div>
                            <span class="font-bold text-gray-500 dark:text-gray-400 text-xs block">ব্যবহার ও মাত্রা</span>
                            <span class="text-gray-700 dark:text-gray-300 font-medium">${med.dosage}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ফায়ারবেস থেকে ওষুধগুলোর ডেটা রিয়েল-টাইম লোড ও সিঙ্ক করন
function initializeFirebaseMedicines() {
    if (typeof db !== 'undefined' && db) {
        db.ref('medicines').on('value', s => {
            const data = s.val();
            if (data) {
                if (Array.isArray(data)) {
                    poultryMedicines = data.filter(item => item !== null);
                } else {
                    poultryMedicines = Object.values(data);
                }
                renderFilteredMedicines();
            } else {
                // ফায়ারবেস ফাকা থাকলে প্রথমবার ডিফল্ট লিস্ট দিয়ে সেভ করা হবে (অটো-সীডিং)
                db.ref('medicines').set(defaultPoultryMedicines)
                    .then(() => {
                        console.log("Firebase medicines list successfully seeded! ✅");
                    })
                    .catch(err => {
                        console.error("Failed to seed Firebase medicines:", err);
                    });
                poultryMedicines = [...defaultPoultryMedicines];
                renderFilteredMedicines();
            }
        }, err => {
            console.error("Failed to load medicines from Firebase, using offline defaults:", err);
            poultryMedicines = [...defaultPoultryMedicines];
            renderFilteredMedicines();
        });
    } else {
        // যদি ফায়ারবেস অবজেক্ট ডিটেক্ট না করা যায়
        poultryMedicines = [...defaultPoultryMedicines];
        renderFilteredMedicines();
    }
}

// 🚀 প্রথমবার লোডে ব্রয়লার দিয়ে শুরু ও ফায়ারবেস ইন্টিগ্রেটেড মেডিসিন লোডার
document.addEventListener('DOMContentLoaded', () => {
    initializeFirebaseMedicines();
});

// সরাসরি স্ক্রিপ্ট রান হবার সাথে সাথেও ফিল্টার যাতে রেন্ডার হয় ক্যাশ হীনতার জন্য
setTimeout(() => {
    initializeFirebaseMedicines();
}, 300);
