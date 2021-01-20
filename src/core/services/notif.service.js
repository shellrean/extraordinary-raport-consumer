class Notif {
    static createID() {
        return new Date().getTime()
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
}

export default Notif