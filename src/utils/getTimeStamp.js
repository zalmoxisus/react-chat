export default function getTimeStamp(msgTime) {
  let date = new Date(msgTime * 1000);
  let hours = date.getHours();
  let minutes = '0' + date.getMinutes();
  return (hours + ':' + minutes.substr(-2));
}