import moment from "moment-timezone";
moment.tz.setDefault("Asia/Kolkata");

type SalahKey = "fajr" | "zohr" | "asr" | "isha" | "juma" | "maghrib";

interface PrayerTime {
  currentSalah: SalahKey;
  timeUntilNext: string;
  formattedTime: string;
}

const PRAYER_TIMES = {
  fajr: { start: 2200, end: 630 }, // Fajr: 10:00 PM to 6:30 AM
  zohr: { start: 630, end: 1430 }, // Zohr: 6:30 AM to 2:30 PM
  asr: { start: 1430, end: 1730 }, // Asr: 2:30 PM to 5:30 PM
  maghrib: { start: 1730, end: 1830 }, // Maghrib: 5:30 PM to 6:30 PM
  isha: { start: 1831, end: 2200 }, // Isha: 6:30 PM to 10:00 PM
};

export async function getCurrentPrayer(): Promise<PrayerTime> {
  const now = moment();
  const currentTime = parseInt(now.format("HHmm"));
  const formattedTime = now.format("hh:mm A");
  const isFriday = now.day() === 5; // 5 represents Friday in moment.js

  let currentSalah: SalahKey;
  let nextPrayer: SalahKey;

  if (isFriday && currentTime >= 1200 && currentTime < PRAYER_TIMES.asr.start) {
    currentSalah = "juma";
    nextPrayer = "asr";
  } else if (
    currentTime >= PRAYER_TIMES.fajr.start ||
    currentTime < PRAYER_TIMES.fajr.end
  ) {
    currentSalah = "fajr";
    nextPrayer = "zohr";
  } else if (
    currentTime >= PRAYER_TIMES.zohr.start &&
    currentTime < PRAYER_TIMES.zohr.end
  ) {
    currentSalah = "zohr";
    nextPrayer = "asr";
  } else if (
    currentTime >= PRAYER_TIMES.asr.start &&
    currentTime < PRAYER_TIMES.asr.end
  ) {
    currentSalah = "asr";
    nextPrayer = "maghrib";
  } else if (
    currentTime >= PRAYER_TIMES.maghrib.start &&
    currentTime < PRAYER_TIMES.maghrib.end
  ) {
    currentSalah = "maghrib";
    nextPrayer = "isha";
  } else {
    currentSalah = "isha";
    nextPrayer = "fajr";
  }

  // Calculate time until next prayer
  const nextPrayerTime = moment().set({
    hour: Math.floor(PRAYER_TIMES[nextPrayer].start / 100),
    minute: PRAYER_TIMES[nextPrayer].start % 100,
  });

  if (nextPrayerTime.isBefore(now)) {
    nextPrayerTime.add(1, "day");
  }

  const timeUntilNext = moment.duration(nextPrayerTime.diff(now)).humanize();

  return {
    currentSalah,
    timeUntilNext,
    formattedTime,
  };
}