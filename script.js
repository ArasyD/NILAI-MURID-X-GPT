// Menambahkan input nilai sesuai jumlah mata pelajaran
document.getElementById('jumlahMataPelajaran').addEventListener('input', function() {
    const jumlah = parseInt(this.value);
    const nilaiInputsContainer = document.getElementById('nilaiInputs');
    nilaiInputsContainer.innerHTML = ''; // Kosongkan input sebelumnya
    
    for (let i = 1; i <= jumlah; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Nilai ke-${i} (0-100)`;
        input.required = true;
        nilaiInputsContainer.appendChild(input);
    }
});

// Fungsi untuk menghitung median
function hitungMedian(nilaiArray) {
    nilaiArray.sort((a, b) => a - b);
    const mid = Math.floor(nilaiArray.length / 2);
    return nilaiArray.length % 2 !== 0 ? nilaiArray[mid] : (nilaiArray[mid - 1] + nilaiArray[mid]) / 2;
}

// Fungsi untuk menghitung modus
function hitungModus(nilaiArray) {
    const frekuensi = {};
    nilaiArray.forEach((nilai) => {
        frekuensi[nilai] = (frekuensi[nilai] || 0) + 1;
    });
    const maxFrekuensi = Math.max(...Object.values(frekuensi));
    return Object.keys(frekuensi).filter((key) => frekuensi[key] === maxFrekuensi);
}

// Tombol submit untuk menampilkan hasil di modal
document.getElementById('submitBtn').addEventListener('click', function() {
    const namaMurid = document.getElementById('namaMurid').value.trim();
    const nilaiInputs = document.querySelectorAll('#nilaiInputs input');
    let nilaiArray = [];

    // Validasi input nilai
    for (let input of nilaiInputs) {
        let nilai = parseFloat(input.value);
        if (nilai >= 0 && nilai <= 100) {
            nilaiArray.push(nilai);
        } else {
            alert('Nilai harus antara 0 dan 100.');
            return;
        }
    }

    // Hitung rata-rata, nilai tertinggi, dan terendah
    const rataRata = nilaiArray.reduce((a, b) => a + b, 0) / nilaiArray.length;
    const nilaiTertinggi = Math.max(...nilaiArray);
    const nilaiTerendah = Math.min(...nilaiArray);
    const grade = (rataRata >= 90) ? 'A' :
                  (rataRata >= 80) ? 'B' :
                  (rataRata >= 75) ? 'C' :
                  (rataRata >= 60) ? 'D' : 'F';

    // Menentukan komentar berdasarkan grade
    let comment = '';
    if (rataRata < 60) {
        comment = 'Peringatan: Rata-rata nilai di bawah standar!';
    } else {
        switch (grade) {
            case 'A':
                comment = 'Sangat Bagus! Teruskan kerja kerasmu!';
                break;
            case 'B':
                comment = 'Bagus! Cobalah untuk lebih baik lagi.';
                break;
            case 'C':
                comment = 'Cukup baik, tapi ada ruang untuk perbaikan.';
                break;
            case 'D':
                comment = 'Perlu lebih banyak usaha.';
                break;
            case 'F':
                comment = 'Jangan menyerah, pelajari kembali materi!';
                break;
        }
    }

        // Hitung median dan modus
        const median = hitungMedian(nilaiArray);
        const modus = hitungModus(nilaiArray).join(', '); // Mengonversi array modus menjadi string
    
        // Menampilkan hasil di modal
        document.getElementById('infoNama').innerText = `Nama Murid: ${namaMurid}`;
        document.getElementById('jumlahNilai').innerText = `Jumlah Nilai: ${nilaiArray.length}`;
        document.getElementById('nilaiTertinggi').innerText = `Nilai Tertinggi: ${nilaiTertinggi}`;
        document.getElementById('nilaiTerendah').innerText = `Nilai Terendah: ${nilaiTerendah}`;
        document.getElementById('rataRata').innerText = `Rata-rata Nilai: ${rataRata.toFixed(2)}`;
        document.getElementById('grade').innerText = `Grade: ${grade}`;
        document.getElementById('comment').innerText = comment;
        document.getElementById('median').innerText = `Median: ${median}`;
        document.getElementById('modus').innerText = `Modus: ${modus}`;
    
        // Menampilkan grafik nilai menggunakan Chart.js
        const ctx = document.getElementById('nilaiChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({ length: nilaiArray.length }, (_, i) => `Mata Pelajaran ${i + 1}`),
                datasets: [{
                    label: 'Nilai',
                    data: nilaiArray,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Nilai'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Mata Pelajaran'
                        }
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    }
                }
            }
        });
    
        // Menampilkan modal
        document.getElementById('modal').style.display = 'block';
    
        // Menyimpan riwayat penilaian
        const historyList = document.getElementById('historyList');
        const historyItem = document.createElement('li');
        historyItem.innerText = `${namaMurid}: Rata-rata ${rataRata.toFixed(2)}, Grade ${grade}`;
        historyList.appendChild(historyItem);
    });
    
    // Tombol close modal
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
    });
    
    // Menutup modal saat mengklik di luar modal
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // Reset semua input
    document.getElementById('resetBtn').addEventListener('click', function() {
        document.getElementById('namaMurid').value = '';
        document.getElementById('jumlahMataPelajaran').value = '';
        document.getElementById('nilaiInputs').innerHTML = '';
        document.getElementById('historyList').innerHTML = '';
        document.getElementById('modal').style.display = 'none';
    });
    
    // Unduh hasil penilaian
    document.getElementById('downloadBtn').addEventListener('click', function() {
        const namaMurid = document.getElementById('infoNama').innerText;
        const hasil = `
        ${namaMurid}
        ${document.getElementById('jumlahNilai').innerText}
        ${document.getElementById('nilaiTertinggi').innerText}
        ${document.getElementById('nilaiTerendah').innerText}
        ${document.getElementById('rataRata').innerText}
        ${document.getElementById('grade').innerText}
        ${document.getElementById('comment').innerText}
        ${document.getElementById('median').innerText}
        ${document.getElementById('modus').innerText}
        `;
        
        const blob = new Blob([hasil], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hasil_penilaian.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
    