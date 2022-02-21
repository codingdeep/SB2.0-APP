import {getMessageTimestamp} from './Storage';

export default async function checkNewMessage(threadId, createTime) {
  if (createTime) {
    createTime = new Date(createTime).getTime();
    let time = await getMessageTimestamp(threadId);
    if (time) {
      if (parseInt(time) < createTime) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  return false;
}
