const API_URL = "https://jtimfood-api.onrender.com/reviews";

async function loadReview() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        tampilkan(data);
    } catch (e) {
        console.log("Gagal mengambil data:", e);
    }
}

function tampilkan(data) {
    const list = document.getElementById("reviewList");
    list.innerHTML = "";

    data.forEach(r => {
        list.innerHTML += `
        <div class="review-card">
            <h3>${r.tempat} — ⭐${r.rating}</h3>
            <p><strong>Kota:</strong> ${r.kota}</p>
            <p>${r.ulasan}</p>
            <p><em>Oleh: ${r.nama}</em></p>
        </div>
        `;
    });
}

async function kirimReview() {
    const nama = document.getElementById("nama").value;
    const tempat = document.getElementById("tempat").value;
    const kota = document.getElementById("kota").value;
    const rating = document.getElementById("rating").value;
    const ulasan = document.getElementById("ulasan").value;

    if (!nama || !tempat || !kota || !rating || !ulasan) {
        alert("Semua kolom harus diisi!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, tempat, kota, rating, ulasan })
    });

    loadReview();
}

function cariReview() {
    const key = document.getElementById("cari").value.toLowerCase();

    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const filter = data.filter(r =>
                r.tempat.toLowerCase().includes(key) ||
                r.kota.toLowerCase().includes(key)
            );
            tampilkan(filter);
        });
}

loadReview();
