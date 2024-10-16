// Menambahkan event listener pada tombol "Mulai Input Nilai"
document.getElementById('startInput').addEventListener('click', function () {
    const nama = document.getElementById('nama').value;
    const jumlahMataPelajaran = parseInt(document.getElementById('jumlahMataPelajaran').value);

    if (!nama || jumlahMataPelajaran < 1 || jumlahMataPelajaran > 6) {
        alert('Harap masukkan nama dan jumlah mata pelajaran yang valid (1-6).');
        return;
    }

    // Menampilkan bagian input nilai
    document.querySelector('.input-section').classList.add('hidden');
    document.querySelector('.nilai-section').classList.remove('hidden');

    const nilaiInputsDiv = document.getElementById('nilaiInputs');
    nilaiInputsDiv.innerHTML = ''; // Mengosongkan sebelumnya

    for (let i = 1; i <= jumlahMataPelajaran; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Nilai ke-${i} (0-100)`;
        input.id = `nilai${i}`;
        nilaiInputsDiv.appendChild(input);
    }
});

// Fungsi untuk mengirim nilai dan menampilkan hasil
document.getElementById('submitNilai').addEventListener('click', function () {
    const nama = document.getElementById('nama').value;
    const jumlahMataPelajaran = parseInt(document.getElementById('jumlahMataPelajaran').value);
    let totalNilai = 0;
    let nilaiTertinggi = 0;
    let nilaiTerendah = 100;
    const nilaiArray = []; // Menyimpan nilai untuk histogram

    for (let i = 1; i <= jumlahMataPelajaran; i++) {
        const nilai = parseFloat(document.getElementById(`nilai${i}`).value);
        if (nilai < 0 || nilai > 100 || isNaN(nilai)) {
            alert('Nilai harus antara 0 dan 100.');
            return;
        }
        totalNilai += nilai;
        nilaiTertinggi = Math.max(nilaiTertinggi, nilai);
        nilaiTerendah = Math.min(nilaiTerendah, nilai);
        nilaiArray.push(nilai); // Menambahkan nilai ke array
    }

    const rataRata = totalNilai / jumlahMataPelajaran;
    let grade;

    if (rataRata >= 90) grade = 'A';
    else if (rataRata >= 80) grade = 'B';
    else if (rataRata >= 75) grade = 'C';
    else if (rataRata >= 60) grade = 'D';
    else grade = 'F';

    // Menampilkan hasil
    document.querySelector('.nilai-section').classList.add('hidden');
    document.querySelector('.output-section').classList.remove('hidden');

    const hasilDiv = document.getElementById('hasil');
    hasilDiv.innerHTML = `
        <p><strong>Nama Murid:</strong> ${nama}</p>
        <p><strong>Jumlah Mata Pelajaran:</strong> ${jumlahMataPelajaran}</p>
        <p><strong>Nilai Tertinggi:</strong> ${nilaiTertinggi}</p>
        <p><strong>Nilai Terendah:</strong> ${nilaiTerendah}</p>
        <p><strong>Rata-rata Nilai:</strong> ${rataRata.toFixed(2)}</p>
        <p><strong>Grade:</strong> ${grade}</p>
    `;

    // Menampilkan grafik
    displayChart(nilaiArray);
    addToHistory(nama, nilaiArray);
});

// Fungsi untuk menampilkan grafik
function displayChart(nilaiArray) {
    const ctx = document.getElementById('grafikNilai').getContext('2d');
    // Menghapus grafik lama jika ada
    if (window.chart) {
        window.chart.destroy();
    }
    window.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nilaiArray.map((_, index) => `Nilai ${index + 1}`),
            datasets: [{
                label: 'Nilai Murid',
                data: nilaiArray,
                backgroundColor: '#8B4513', // Warna coklat
                borderColor: '#5b3d10',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Nilai'
                    }
                }
            }
        }
    });
}

// Menambahkan histori nilai
function addToHistory(nama, nilaiArray) {
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('li');
    historyItem.textContent = `${nama}: ${nilaiArray.join(', ')}`;
    historyList.appendChild(historyItem);
    document.querySelector('.history-section').classList.remove('hidden');
}

// Reset fungsi
document.getElementById('reset').addEventListener('click', function () {
    // Menghapus input nama dan jumlah mata pelajaran
    document.getElementById('nama').value = '';
    document.getElementById('jumlahMataPelajaran').value = '';
    document.getElementById('nilaiInputs').innerHTML = '';

    // Menyembunyikan output dan history
    document.querySelector('.output-section').classList.add('hidden');
    document.querySelector('.history-section').classList.add('hidden');

    // Menampilkan kembali input section
    document.querySelector('.input-section').classList.remove('hidden');

    // Menghapus grafik jika ada
    const canvasContainer = document.getElementById('grafikNilai').parentElement;
    canvasContainer.style.display = 'none'; // Menyembunyikan grafik
    if (window.chart) {
        window.chart.destroy(); // Menghapus chart yang ada
    }
});


// Fitur rahasia
document.getElementById('secretFeature').addEventListener('click', function () {
    alert('Fitur Rahasia: Selamat datang di aplikasi kami! Anda hebat!');
});

// Menampilkan grafik
function displayChart(nilaiArray) {
    const ctx = document.getElementById('grafikNilai').getContext('2d');
    // Menghapus grafik lama jika ada
    if (window.chart) {
        window.chart.destroy();
    }
    window.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nilaiArray.map((_, index) => `Nilai ${index + 1}`),
            datasets: [{
                label: 'Nilai Murid',
                data: nilaiArray,
                backgroundColor: '#8B4513', 
                borderColor: '#5b3d10',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Nilai'
                    }
                }
            }
        }
    });

    // Menampilkan canvas dengan animasi
    const canvasContainer = document.getElementById('grafikNilai').parentElement;
    canvasContainer.style.display = 'block';
    canvasContainer.classList.add('fadeIn'); // Menambahkan kelas fadeIn untuk efek
}
