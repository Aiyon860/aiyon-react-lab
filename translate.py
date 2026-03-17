import os
import glob

replacements = {
    "Pesan Singkat": "Short Message",
    "Batas maksimal adalah": "Maximum limit is",
    "karakter!": "characters!",
    "Kalkulator Sederhana": "Simple Calculator",
    "Bilangan pertama": "First number",
    "Pilih operasi": "Select operation",
    "Bilangan kedua": "Second number",
    "Tidak bisa membagi dengan nol!": "Cannot divide by zero!",
    "Hasil:": "Result:",
    "Kurangi angka": "Decrease number",
    "Tambah angka": "Increase number",
    "Demo Functional Update & Limitasi Angka": "Functional Update & Number Limitation Demo",
    "Tips: Coba gunakan functional update": "Tip: Try using functional update",
    "Apa yang ingin dikerjakan?": "What needs to be done?",
    "Tambah": "Add",
    "Ups! Tugas tidak boleh kosong.": "Oops! Task cannot be empty.",
    "Daftar tugas": "Task list",
    "Belum ada tugas hari ini...": "No tasks for today...",
    "Simpan": "Save",
    "Batal": "Cancel",
    "Teks edit tidak boleh kosong!": "Edit text cannot be empty!",
    "Kembali ke Menu": "Back to Menu",
    "Menu Utama": "Main Menu",
    "Pilih Demo": "Choose Demo",
    "Demo mengelola state lokal dan interaksi UI.": "Demo managing local state and UI interactions.",
    "Demo side-effects, fetch API, dan cleanup.": "Demo side-effects, fetch API, and cleanup.",
    "Demo optimasi performa dengan useMemo.": "Demo performance optimization with useMemo.",
    "Demo mencegah re-render dengan useCallback.": "Demo preventing re-renders with useCallback.",
    "Demo berbagi data global tanpa prop-drilling.": "Demo sharing global data without prop-drilling.",
    "Demo state kompleks dengan pola reducer.": "Demo complex state with reducer pattern.",
    "Fokus pada implementasi satu Hook fundamental pada satu waktu.": "Focus on implementing one fundamental Hook at a time.",
    "Lihat demo": "View demo",
    "Lompat ke konten utama": "Skip to main content",
    "Komponen EditProfile untuk mengedit profil user": "EditProfile component to edit user profile",
    "Demo penggunaan useContext untuk mengelola state global.": "Demo of using useContext to manage global state.",
    
    # UseEffect
    "Gagal mengambil data.": "Failed to fetch data.",
    "Memuat...": "Loading...",
    "Memuat Data...": "Loading Data...",
    "Memuat data...": "Loading data...",
    "Tidak ada data ditemukan.": "No data found.",
    "Data Kosong": "Empty Data",
    "Cari ID (1-100)": "Search ID (1-100)",
    "Cari": "Search",
    "ID harus antara 1 dan 100": "ID must be between 1 and 100",
    "Tampilkan Timer": "Show Timer",
    "Sembunyikan Timer": "Hide Timer",
    "Timer berjalan": "Timer is running",
    "Waktu:": "Time:",
    "detik": "seconds",
    "Lebar Jendela": "Window Width",
    "Tinggi Jendela": "Window Height",
    "Mode Gelap": "Dark Mode",
    "Mode Terang": "Light Mode",
    "Ganti Tema": "Toggle Theme",
    "Warna Background": "Background Color",
    "Acak Warna": "Random Color",
    "Hitung": "Count",
    "Klik saya": "Click me",
    "Anda telah mengklik": "You clicked",
    "kali": "times",
    "Status:": "Status:",
    "Aktif": "Active",
    "Tidak Aktif": "Inactive",
    "Ganti Status": "Toggle Status",

    # UseReducer
    "Keranjang Belanja": "Shopping Cart",
    "Daftar Produk": "Product List",
    "Total:": "Total:",
    "Kosongkan": "Clear",
    "Hapus": "Delete",
    "Keranjang Kosong": "Cart is Empty",
    "Harga:": "Price:",

    # UseMemo
    "Cari Produk": "Search Product",
    "Semua Kategori": "All Categories",
    "Filter:": "Filter:",
    "Urutkan:": "Sort by:",
    "Harga Terendah": "Lowest Price",
    "Harga Tertinggi": "Highest Price",
    "Termurah": "Cheapest",
    "Termahal": "Most Expensive",
    "Tidak ada produk": "No products",
    
    # Generic
    "Nama": "Name",
    "Umur": "Age",
    "Tugas": "Task",
    "Deskripsi": "Description",
    "Kategori": "Category",
    "Harga": "Price",
    "Aksi": "Action",
    "Kembali": "Back",
    
    "Pengaturan": "Settings",
    "Profil": "Profile",
    "Keluar": "Logout",
    
    "Pesan": "Message",
    "Kirim": "Send",
    "Batal": "Cancel",

    "Penggunaan": "Usage",
    "Contoh": "Example",
    
    "useEffect Demo": "useEffect Demo",
    "useState Demo": "useState Demo",
    "useReducer Demo": "useReducer Demo",
    "useMemo Demo": "useMemo Demo",
    "useCallback Demo": "useCallback Demo",
    "useContext Demo": "useContext Demo",

    "Demo penggunaan": "Demo of using",
    "untuk mengelola": "to manage",
    "state global": "global state",
    "state kompleks": "complex state",
    "mengoptimalkan performa": "optimizing performance",
    "mencegah re-render": "preventing re-renders",
    "efek samping": "side effects",

    "Kalkulator Faktorial": "Factorial Calculator",
    "Hitung Faktorial": "Calculate Factorial",
    "Masukkan angka": "Enter number",
    
    "Daftar Anggota": "Member List",
    "Tambah Anggota": "Add Member",
    
    "Tandai Selesai": "Mark as Done",
    "Batal Selesai": "Undo Done"
}

files = glob.glob('src/**/*.jsx', recursive=True)

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for id_text, en_text in replacements.items():
        content = content.replace(id_text, en_text)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Replacement done!")
