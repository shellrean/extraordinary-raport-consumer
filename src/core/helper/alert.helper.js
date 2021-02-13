import Message from '@/core/domain/message.domain'

function showSweetError(vue, err) {
    const error = new Message(err)
    const message = error.getMessage()
    const code = error.getCode()

    vue.$swal('Kesalahan '+code, message,'error')
}

export { showSweetError }