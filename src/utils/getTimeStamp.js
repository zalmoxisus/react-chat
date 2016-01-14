export default function getTimeStamp(msgTime) {
  const date = new Date(msgTime * 1000);
  const day = date.getDate();
  const minutes = '0' + date.getMinutes();

  const todayTimeStamp = Date.now() / 1000 | 0;
  const today = new Date(todayTimeStamp * 1000);

  let time;
  if (day === today.getDate()) {
    time = (date.getHours() + ':' + minutes.substr(-2));
  } else {
    time = day +
      '.' + (date.getMonth() + 1) +
      '.' + date.getFullYear() +
      ' ' + (date.getHours() +
      ':' + minutes.substr(-2));
  }
  return time;
}
