$(document).ready(function() {
    // Validasi formulir pendaftaran
    $("#daftarForm").submit(function(event) {
        event.preventDefault();

        // Validasi field
        var nama = $("#nama").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var paket = $("#paket").val();
        var syaratKetentuan = $("#syaratKetentuan").is(":checked");

        if (nama === "" || email === "" || password === "" || paket === "" || !syaratKetentuan) {
            alert("Harap isi semua field dan setujui Syarat dan Ketentuan.");
            return false;
        }

        // Jika validasi berhasil, lanjutkan pengiriman formulir
        // (Anda dapat menambahkan kode untuk mengirim data ke server)
        alert("Formulir berhasil dikirim!");
        $("#daftarForm")[0].reset();
        $("#daftarModal").modal('hide'); 
    });

    // Submit Formulir Berlangganan
    $("#subscribeForm").submit(function(event) {
        event.preventDefault();

        // Mendapatkan data dari formulir
        var nama = $("#nama").val();
        var email = $("#email").val();
        var nomorTelepon = $("#nomorTelepon").val();
        var metodePembayaran = $("#metodePembayaran").val();
        var paket = $("#selectedPaket").val();

        // Validasi formulir (tambahkan validasi sesuai kebutuhan)
        if (nama === "" || email === "" || nomorTelepon === "" || metodePembayaran === "") {
            alert("Harap isi semua field.");
            return false;
        }

        // Kirim data formulir ke server menggunakan Ajax
        $.ajax({
            url: '/submit-subscription', // Ganti dengan URL server Anda
            type: 'POST',
            data: {
                nama: nama,
                email: email,
                nomorTelepon: nomorTelepon,
                metodePembayaran: metodePembayaran,
                paket: paket
            },
            success: function(response) {
                // Tampilkan pesan sukses atau lakukan tindakan lainnya
                alert("Berlangganan berhasil!");
                $("#subscribeForm")[0].reset();
                $("#subscribeModal").modal('hide');
            },
            error: function(error) {
                // Tampilkan pesan error
                alert("Terjadi kesalahan. Silakan coba lagi.");
            }
        });
    });

    // Tombol Berlangganan
    $('.pricing .btn').click(function() {
        var paket = $(this).data('paket');
        $('#selectedPaket').val(paket);
    });

    // Sticky Navbar
    window.addEventListener('scroll', function() {
        var navbar = document.querySelector('#mainNav');
        var sticky = navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    $("#search-form").submit(function(event) {
        event.preventDefault();
        var searchQuery = $("#search-query").val().toLowerCase(); // Ubah ke lowercase

        // Data Dokter (Anda perlu mengisinya dengan data dokter yang akurat)
        var doctors = [
            { name: "Dr. Amelia Putri", specialization: "Kardiologi", location: "Jakarta" },
            { name: "Dr. Budiman Supriadi", specialization: "Psikiatri", location: "Bandung" },
            { name: "Dr. Citra Dewi", specialization: "Ortopedi", location: "Surabaya" },
            { name: "Dr. Dimas Pratama", specialization: "Gastroenterologi", location: "Denpasar" },
            // Tambahkan data dokter lainnya di sini...
        ];

        // Tampilkan hasil pencarian
        let resultsHTML = "";
        doctors.forEach(function(doctor) {
            // Filter berdasarkan query pencarian (jika ada)
            if (searchQuery === "" || 
                doctor.name.toLowerCase().includes(searchQuery) || 
                doctor.specialization.toLowerCase().includes(searchQuery)) {

                resultsHTML += `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${doctor.name}</h5>
                            <p class="card-text">Spesialisasi: ${doctor.specialization}</p>
                            <p class="card-text">Lokasi: ${doctor.location}</p>
                            <a href="#" class="btn btn-primary">Lihat Profil</a>
                        </div>
                    </div>
                `;
            }
        });

        $("#search-results").html(resultsHTML);
    });
        });