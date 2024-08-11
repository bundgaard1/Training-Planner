export function distanceStingToNumber(distance: string): number {
	if (distance === "") {
		return 0;
	}
	return Number(distance);
}

export function distanceString(distance: number): string {
	if (distance === 0) {
		return "";
	}
	return String(distance);
}

export function timeStringToNumber(time: string): number {
	if (!time.includes(":")) {
		return Number(time);
	}
	let [hoursS, minutesS] = time.split(":");

	if (minutesS.length === 3) {
		hoursS += minutesS[0];
		minutesS = minutesS.slice(1);
	} else if (minutesS.length === 1) {
		minutesS = hoursS[hoursS.length - 1] + minutesS;
		hoursS = hoursS.slice(0, -1);
		if (hoursS.length === 0) {
			hoursS = "0";
		}
	}
	if (hoursS.length > 1) {
		// Dont allow more than 99 hours
		hoursS = hoursS.slice(-1);
	}

	let hours = parseInt(hoursS);
	let minutes = parseInt(minutesS);
	return hours * 60 + minutes;
}

export function timeString(time: number): string {
	if (time === 0) {
		return "";
	}
	const minutes = Math.round(time % 60)
		.toString()
		.padStart(2, "0");
	const hours = Math.floor(time / 60).toString();
	return `${hours}:${minutes}`;
}
