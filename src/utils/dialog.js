import { showConfirmDialog } from 'vant'

export function confirmDialog(msg) {
    showConfirmDialog({
        title: '提示',
        message: msg,
    }).then(() => {
        // on confirm
    }).catch(() => {
        // on cancel
    })
}
