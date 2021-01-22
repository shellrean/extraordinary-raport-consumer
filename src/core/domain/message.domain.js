class Message {
    
    static ErrUnExpHappen = {
        message: "Terjadi kesalahan yang tidak dapat dijelaskan"
    }
    
    static ErrNotSendRequest = {
        message: "Terjadi kesalahan saat mengirim request ke server"
    }

    constructor(error) {
        this.errors = [
            {code: 1000, message: "Terjadi kesalahan pada server, hubungi administrator"},
            {code: 1001, message: "Header tidak terisi dengan baik"},
            {code: 1002, message: "Parameter tidak terisi sebagaimana seharusnya"},
            {code: 1003, message: "Offset atau limit tidak sesuai"},
            {code: 1004, message: "Lokal komputer jaringan salah"},
            {code: 1005, message: "Timezone pada komputer salah"},
            {code: 1006, message: "Limit request pada server mencapai batas"},
            {code: 1007, message: "Parameter yang diinputkan tidak sesuai dengan yang diharapkan"},
            {code: 1008, message: "Duplikat pada data yang seharusnya unik"},
            {code: 1009, message: "Data tidak ditemukan pada"},
            {code: 1101, message: "Anda tidak dikenali"},
            {code: 1102, message: "Anda tidak memiliki akses untuk mengambil data"},
            {code: 1103, message: "Sepertinya data yang anda kirimkan tidak sesuai dengan yang diharapkan"},
            {code: 1104, message: "Authentikasi gagal"},
            {code: 1105, message: "Data yang diminta tidak ditemukan"},
            {code: 1106, message: "Validasi data gagal, silakan cek form yang anda kirimkan"},
            {code: 1201, message: "Sesi anda sepertinya expired, coba login kembali"},
            {code: 1202, message: "Anda memasukkan token yang tidak dikenali"},
            {code: 1203, message: "Anda memasukkan token yang tidak dikenali"},
            {code: 1204, message: "Anda memasukkan token yang tidak dikenali"},
            {code: 1205, message: "Sesi anda tidak dikenali, silakan login kembali"},
            {code: 1301, message: "Email atau Password salah, silakan coba kembali"},
            {code: 1305, message: "Akun anda telah disuspend oleh adiministrator"},
            {code: 1401, message: "Kelas akademik tidak ditemukan, pastikan anda memasukkan kelas akademik hanya yang tersedia"},
            {code: 1402, message: "Mata pelajaran tidak ditemukan, pastikan anda memasukkan mata pelajaran hanya yang tersedia"},
            {code: 1403, message: "Pengguna tidak ditemukan, pastikan anda memasukkan pengguna hanya yang tersedia"},
            {code: 1404, message: "Matpel kelas tidak ditemukan"},
            {code: 1405, message: "Kelas tidak ditemukan"},
            {code: 1406, message: "Setting tidak ditemukan"},
            {code: 1407, message: "Siswa kelas tidak ditemukan"},
            {code: 1408, message: "Siswa tidak ditemukan"},
            {code: 1501, message: "Tahun akademik telah dibuat untuk tahun ini"},
            {code: 1502, message: "Duplikat pada kelas akademik, Kelas ini telah dibuat sebelumnya"},
            {code: 1503, message: "Duplikat penempatan siswa, Siswa ini telah ditempatkan di kelas"},
            {code: 1504, message: "Email telah digunakan oleh pengguna lain"},
        ]
        this.error = error
    }

    getMessage() {
        if (typeof this.error.error_code == 'undefined') {
            return "Terjadi kesalahan yang tidak dapat dijelaskan"
        }
        const errors = this.errors.filter((item) => item.code == this.error.error_code)
        if (errors.length > 0) {
            return errors[0].message
        }
        return "Terjadi kesalahan yang tidak dapat dijelaskan"
    }

    getCode() {
        return typeof this.error.error_code == 'undefined' ? '-' : this.error.error_code
    }
}

export default Message