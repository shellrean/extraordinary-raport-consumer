class Notif {
    static createID() {
        return `${new Date().getTime()}-${Math.random()}`
    }

    static createNotif(params = { msg: "", notif: [] }) {
        const { msg, notif } = params
        const id = Notif.createID()
        notif.push({
            id: id,
            msg: msg,
        })
        const idx = notif.map((item) => item.id).indexOf(id)
        if (idx !== -1) {
            setTimeout(() => { notif.splice(idx, 1) }, 3000)
        }
    }

    constructor(code, message) {
        this.code = code
        this.message = message
    }

    sweetAlertNotif(vue) {
        vue.$swal('Kesalahan '+this.code, this.message,'error')
    }
}

export default Notif