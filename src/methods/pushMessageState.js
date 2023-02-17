import emitter from '@/methods/emitter';

// eslint-disable-next-line func-names
export default function (res, title = '更新') {
  if (res.data.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
    });
  } else {
    // 有些訊息是字串，有些則是陣列，在此統一格式
    // eslint-disable-next-line operator-linebreak
    const message =
      typeof res.data.message === 'string'
        ? [res.data.message]
        : res.data.message;
    if (res.data.message === 'favor') {
      emitter.emit('push-message', {
        style: 'danger',
        title: `${title}`,
      });
    } else {
      emitter.emit('push-message', {
        style: 'danger',
        title: `${title}失敗`,
        content: message.join('、'),
      });
    }
  }
}
