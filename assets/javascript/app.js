$(document).ready(function() {

	var questionnaire = [
		{
			question: "In the Chinese language, what is the literal meaning of Hong Kong?", 
			options: ["Fragrant Harbor", "Fishing Village", "Happy Island", "Trade Port"], 
			answer: "Fragrant Harbor",
			image: "assets/images/question_1.jpg"
			// image: "https://www.abercrombiekent.com/assets_global/media/images/photo_gallery/country/96/Hong-Kong-Junkboat-(1024x460).jpg"
		}, 

		{
			question: "According to the 2010 Census, approximately what is the population of Hong Kong?",
			options: ["7 Million", "10 Million", "13 Million", "16 Million"],
			answer: "7 Million",
			image: "assets/images/question_2.jpg"
			// image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/People_in_hong_kong.JPG/1024px-People_in_hong_kong.JPG"
		}, 

		{
			question: "Every year in late March, an international sporting festival is held in Hong Kong that involves athletes and visitors from all over the world. What sport is it?",
			options: ["Dragon Boat Racing", "Rugby Sevens", "Wushu", "Snooker"],
			answer: "Rugby Sevens", 
			image: "assets/images/question_3.jpg"
			// image: "https://i.dmarge.com/2016/03/Hong-Kong-Sevens-Final-Live-Streaming.jpg"
		}, 

		{
			question: "How many Octopus cards are in circulation in Hong Kong?", 
			options: ["7 Million", "10 Million", "15 Million", "30 Million"],
			answer: "30 Million",
			image: "assets/images/question_4.jpg"
			// image: "http://www.discoverhongkong.com/us/images/plan-your-trip/large/5.2.2.2.8-Octopus-card_03b.jpg"
		}, 

		{
			question: "How many islands are there in Hong Kong?",
			options: ["56", "124", "201", "263"],
			answer: "263",
			image: "assets/images/question_5.jpg"
			// image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/1_lamma_island_aerial_2016.jpg/1200px-1_lamma_island_aerial_2016.jpg"
		}, 

		{
			question: "Which of these following Hollywood movies was based on a Hong Kong film?",
			options: ["The Hunger Games", "Gone Girl", "The Departed", "King Kong"],
			answer: "The Departed",
			image: "assets/images/question_6.jpg"
			// image: "http://www.tasteofcinema.com/wp-content/uploads/2017/02/infernal-affairs-departed.jpg"
		}, 

		{
			question: "The unique Hong Kong drink Yuanyang is a mixture of what?",
			options: ["Chocolate Milk & Horlicks", "Ed Wine & Lemonade", "Coffee & Tea", "Soda & Milk Tea"], 
			answer: "Coffee & Tea", 
			image: "assets/images/question_7.jpg"
			// image: "http://sg.articles.images.travelog.me/wp-content/uploads/2016/02/01040916/coverimage-770x578.jpg"
		}, 

		{
			question: "Hong Kong has more skyscrapers than which of the following?", 
			options: ["New York", "Dubai", "Chicago", "All Of The Above"],
			answer: "All Of The Above",
			image: "assets/images/question_8.jpg"
			// image: "http://i2.cdn.cnn.com/cnnnext/dam/assets/160421121543-01-hong-kong-urban-jungle-super-169.jpg"
		}, 

		{
			question: "Which of the following activity is legal in Hong Kong?",
			options: ["Jaywalking", "Prostitution", "Gambling", "Feeding Wild Monkeys"],
			answer: "Prostitution",
			image: "assets/images/question_9.jpg"
			// image: "http://i.dailymail.co.uk/i/pix/2014/11/05/article-urn:publicid:ap.org:a62f277ca61a45b7899bdfab5407ccbd-6TrRJaaIZ-HSK1-688_634x436.jpg"
		}, 

		{
			question: "Hong Kong has more of which of the following per person than any other city in the world?",
			options: ["Rolls Royces", "iPhones", "Toyotas", "Yeezys"],
			answer: "Rolls Royces",
			image: "assets/images/question_10.jpg"
			// image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/HK_Sheung_Wan_Wing_Lok_Street_Rolls-Royce_automobile_L_yellow_Dec-2012.JPG"
		}
	];

	// different for each round
	var correctAnswers = 0; 
	var incorrectAnswers = 0;
	var unanswered = 0;

	// different for each question
	var count = 0; // keeps track of the current question
	var interval;
	var timeLeft; 
	var currentQuestion;
	var correctAnswer;
	var userAnswer = "";

	$(".options").hide();
	$(".start_over").hide();

	$(".start").on("click", function() {
		$(".start").hide();
		displayQuestion();
	});

	$(".start_over").on("click", function() {
		correctAnswers = 0;
		incorrectAnswers = 0;
		unanswered = 0;
		count = 0;
		$(".start_over").hide();
		displayQuestion();		
	});

	$(".options").on("click", function() {
		userAnswer = $(this).text();
		clearInterval(interval);
		displayAnswer();
		setTimeout(displayQuestion, 3000);
	});

	function decrement() {
		timeLeft--;
		$(".time_remaining").html("<strong>Time Remaining: " + timeLeft + " Seconds</stong>");
		if (timeLeft === 0) {
			clearInterval(interval);
			displayAnswer();
			setTimeout(displayQuestion, 3000);
		}
	};

	function displayAnswer() {
		$(".question").empty();
		$(".options").hide();
		console.log(userAnswer);
		if (userAnswer === "") {
			result = $("<p></p>").text("You didn't answer your question.");
			unanswered++;
		} else if (userAnswer === currentQuestion["answer"]) {
			result = $("<p></p>").text("Correct!");
			correctAnswers++;
		} else {
			result = $("<p></p>").text("Wrong!");
			incorrectAnswers++;
		}
		$(".result").html(result);
		$(".result").append("<p>The correct answer was <strong>" + correctAnswer + "</strong>.</p>");
		$(".result").append("<img class='img-responsive' src='" + currentQuestion["image"] + "'/>");
	};

	function displayQuestion() {
		$(".result").empty();
		if (count === questionnaire.length) {
			console.log("done!");
			clearInterval(interval);
			$(".result").html("<p>All done, here's how you did!</p>");
			$(".result").append("<p>Correct Answers: " + correctAnswers + "</p>");
			$(".result").append("<p>Incorrect Answers: " + incorrectAnswers + "</p>");
			$(".result").append("<p>Unanswered: " + unanswered + "</p>");
			$(".start_over").show();
			// $(".result").append("<div>Start Over?</div>")
			// $(".result").find("div").addClass("start_over");
		} else {
			console.log(count);
			timeLeft = 30;
			$(".time_remaining").html("<strong>Time Remaining: " + timeLeft + " Seconds</stong>");
			interval = setInterval(decrement, 1000);
			currentQuestion = questionnaire[count];
			correctAnswer = currentQuestion["answer"];
			userAnswer = "";
			console.log(currentQuestion);
			console.log(correctAnswer);
			$(".question").html("<strong>" + currentQuestion["question"] + "</stong>");
			$(".options").show();
			$("#option_1").text(currentQuestion["options"][0]);
			$("#option_2").text(currentQuestion["options"][1]);
			$("#option_3").text(currentQuestion["options"][2]);
			$("#option_4").text(currentQuestion["options"][3]);
			count++;
		};
	}; 

});