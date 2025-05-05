export async function getSunsetTime() {
  try {
    const res = await fetch(
      "https://api.sunrisesunset.io/json?lat=20.54966&lng=74.53462",
    );
    const sunsetTime = await res.json();
    console.log(sunsetTime)
    return sunsetTime;
  } catch (error) {
    return "error";
  }
}
