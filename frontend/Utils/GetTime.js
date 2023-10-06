export default function getTime(temp) {
  if (temp === "1 hour") return 3600 * 1000;
  else if (temp === "1 min") return 60 * 1000;
  else if (temp === "5 mins") return 60 * 5 * 1000;
  else return 60 * 30 * 1000;
}
