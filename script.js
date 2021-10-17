let data;

(async () => {
	let response = await fetch("/Time-tracking-dashboard//data.json");
	data = await response.json();
		buttons[1].click();
})();

let cards = {
	Work: {
		now: document.getElementById("WorkNow"),
		lastWeek: document.getElementById("WorkLastWeek"),
	},
	Play: {
		now: document.getElementById("PlayNow"),
		lastWeek: document.getElementById("PlayLastWeek"),
	},
	Study: {
		now: document.getElementById("StudyNow"),
		lastWeek: document.getElementById("StudyLastWeek"),
	},
	Exercise: {
		now: document.getElementById("ExerciseNow"),
		lastWeek: document.getElementById("ExerciseLastWeek"),
	},
	Social: {
		now: document.getElementById("SocialNow"),
		lastWeek: document.getElementById("SocialLastWeek"),
	},
	SelfCare: {
		now: document.getElementById("SelfCareNow"),
		lastWeek: document.getElementById("SelfCareLastWeek"),
	},
};

let buttons = [
	document.getElementById("daily"),
	document.getElementById("weekly"),
	document.getElementById("monthly"),
];

let activeButton;

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", () => {
		if (activeButton + 1 > 0) buttons[activeButton].classList.toggle("active");
		buttons[i].classList.toggle("active");
		activeButton = i;
		Update(i);
	});
}

/*
 	j = start point of counting
    k = end point of counting
    element  = element which value will be changed
	duration = wanted duration of the animation
 */

function counter(j, k, element, duration) {
	const localDuration = duration ? duration : 0;

	if (j < k)
		for (let i = j; i <= k; i++)
			setTimeout(() => {
				element.innerText = i;
			}, (localDuration / (k - j)) * i);
	else if (j > k)
		for (let i = j; i >= k; i--)
			setTimeout(() => {
				element.innerText = i;
			}, (localDuration / (j - k)) * (j - i));
}

// k = number of the clicked button

function Update(k) {
	const simplified = [
		cards.Work,
		cards.Play,
		cards.Study,
		cards.Exercise,
		cards.Social,
		cards.SelfCare,
	];

	if (k < 0 || k > 2) {
		console.error("Variable k must be in range form 0 to 2");
		return;
	}

	for (let i = 0; i < 6; i++) {
		const Menu = [
			data[i].timeframes.daily,
			data[i].timeframes.weekly,
			data[i].timeframes.monthly,
		];

		//Current time
		counter(
			parseInt(simplified[i].now.innerText)
				? parseInt(simplified[i].now.innerText)
				: 0,
			Menu[k].current,
			simplified[i].now
		);

		//Previous time

		counter(
			parseInt(simplified[i].lastWeek.innerText)
				? parseInt(simplified[i].lastWeek.innerText)
				: 0,
			Menu[k].previous,
			simplified[i].lastWeek
		);
	}
}
