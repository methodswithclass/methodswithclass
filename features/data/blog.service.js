dataModule.factory("blog.service", function () {

// 	import sublime, sublime_plugin

// class StraightQuotesCommand(sublime_plugin.TextCommand):
//    def run(self, edit):
//       for rgn in self.view.find_all("[“”]"):
//          self.view.replace(edit, rgn, "\"")
//       for rgn in self.view.find_all("[‘’]"):
//          self.view.replace(edit, rgn, "\'")

	var clean = function (string) {

		var result = string.replace(/[‘’]/g, "\'").replace(/[“”]/g, "\'").replace(/(?!\.)(.)\1{2,}/g, "$1");
		// 
		//var result = string.replace(/[‘]/g, "'").replace(/[“]/g, '"');

		//console.log(result);

  		return result;
  	}

  	var process = function (blog) {

  		//console.log("process " + blog.length + " paragraphs");

  		var result = [];

  		for (var i in blog) {

  			result[i] = {text:clean(blog[i].text)};
  		}

  		return result;
  	}

	var comingsoon = [
	{
		text:"coming soon"
	}
	];

	var prison = process([
	{
		text:"You don't necessarily see The Prison."
	},
	{
		text:"I see it.  I see the walls and can imagine the sky above and the ground below this concrete floor. The possibility of what is outside this institution teases my mind and laughs at me. There are no rules in the prison for the inmates behavior, there are no guards keeping order."
	},
	{
		text:"The guards people see keeping order are imprisoned here too and hope to gain an advantage by masking themselves as guards when they are just inmates too. They use tactics that seem as though they are for our benefit and we willingly give up control to them, for their power, or their knowledge, or their promises for the future. But they have no power except what we give them, they have no knowledge more than what we can know ourselves, and they cannot deliver on their promises of the future because they no more know it than you or me. "
	},
	{
		text:"This prison has layers of cell upon cell and many people are inside smaller and smaller cells with many more walls between them and the open air. For them the cell is right, the cell is comforting, the cell is their world."
	},
	{
		text:"I find myself now walking the corridors invisibly, the guards do not see me because I acknowledge the authority they declare and the other inmates are afraid of me because I am not in a cell. I do not play down to the people’s made up rules. I point out the cell they are in every chance I get and I am mostly hated for it."
	},
	{
		text:"I want to break free of the prison. Of the sad people in it. I want to see the outside world, but that is just impossible."
	},
	{
		text:"All I can do is look for others who walk the corridors with me. "
	},
	{
		text:"I have found a very small number and we are alone."
	},
	{
		text:"And that is Our Prison."
	},
	{
		text:"..."
	},
	{
		text:"But then a horrifying thought enters my mind. I begin to see the shadows on the walls and figments of figures that I thought were people, dancing on the solid surfaces. What I thought were the walls of corridors are only the walls of the maze of my ever expanding cell. My self."
	},
	{
		text:"I now realize that I cannot escape even the cell. No one can. It is not the prison keeping us all confined but our cells and to leave it is a death sentence. I am ever subject to my own perspective and mine alone, regardless with whom I communicate or who I believe is on my side, or you on yours, or they on their's."
	},
	{
		text:"We are all trapped inside enormous cells that can sometimes deceive us into thinking we are just about to escape or in a better position than another individual."
	},
	{
		text:"And that is The Prison."
	}
	]);

	var scale_time = process([
	{
		text:"Time has no scale. The reason we experience time in the scale we do and the reason we think the universe is as old as it is is because we measure it in rotations of our earth around our sun. In other words, the universe is not old at all. Old is a relative time to the length of time of one rotation of our earth around our sun. And by extension, an individual's lifespan. This is not necessarily a good place to begin a scientific inquiry into the study of the universe from a position that has nothing to do with humans. And if one thing is for certain that science has uncovered, it has found that this universe was not created or does exist-for us, whatever your bent."
	},
	{
		text:"The implications of this are far reaching. But for one, take the concept of 'life' outside of this biosphere. Another thing we have discovered about this universe is the theory by which humans have developed on this planet from less complex forms of life: evolution. If this is to be take as a global process that can be applied in general off the earth, which it can be because the entire universe operates in a evolving way, then there is no reason to believe that other forms of phenomenon that we would identify as 'life' (if we were to simply broaden our perspective on what that is) then it follows that those other forms would not be bound to the same time scale to which we are."
	},
	{
		text:"This then throws a giant destructive wrench into the totality of science fiction that pertains to aliens and the general idea that humans have about contacting extraterrestrial life. There is absolutely no reason to believe aliens (for short) haven't come and gone from our system so fast that we simply couldn't detect them because our instruments when they came did not have the resolution to perceive the phenomenon. Or, they could be sending a signal to us in a phase that is too high or low to be detected, because our time scales are not reconcilable."
	},
	{
		text:"But, you say. Obviously, a civilization of advanced enough technology to come here or send us a signal at all would of course make this adjustment for our benefit. This is, unfortunately, a combination of several assumptions. One, that aliens use what we call technology at all. Two, that they have any incentive to anything for our benefit or that they even have interest in contacting us at all. Three, that they have sufficient technology in our terms to both travel the cosmos AND control time. Its just a set of massive assumptions designed to make the prospect of contacting aliens promising to satisfy a human need and nothing more than that. Scientifically speaking, and realistically speaking, there is no need for these assumptions, except to make us feel better and it is not based on any reasoning worth the... time."
	}
	]);


	var meaning_god = process([
	{
		text:"To question whether god exists is non-sensical. Not to say incontrovertibly that it does, but what I mean is that no religious person, nor secular, nor logical, nor reasonable person, can answer this question to anyone's satisfaction. And many have admitted such a fact. When posed with such an unanswerable question that has been asked by many great thinkers from many differing perspectives over many millennia, it can become clear to us that this may be the wrong question to be asking."
	},
	{
		text:"I will pose a better question, one that can be answered by each us, and in fact is answered by each us without us stating so explicitly, despite our religious common ground we share or argue over."
	},
	{
		text:"Before I pose the question, I must present another idea that has a similar character to the god question that has plagued humanity and is equally unanswerable for exactly the same reason, but what I am suggesting at first is far simpler to grasp if re-imagining god is a hard thing for people to do."
	},
	{
		text:"Take intelligence. Intelligence has been thought about and attempted to be defined over the millennia, but with one difference to the god question. With intelligence, no one until recently was taken seriously when they suggested intelligence did not exist. Additionally, the measure of intelligence is very shotty at best. Even today, the suggestion that intelligence does not exist is a hard sell. I will attempt to do this. But we'll see how it goes. If you can accept this proposition, then the god proposition will be much easier to swallow by the devout and the non-believers alike, hopefully. This is my goal: to bridge the gap between these two groups. Here’s why."
	},
	{
		text:"In my journey through Atheism, I have come to realize that no Atheist has ever convinced a believer of anything who didn’t already have doubts for one simple reason. The Atheist attacks the idea of god in the intellectual part of the brain, but the belief in god does not reside there. It resides in the emotional part of a person and in their identity. So the devout, who are convicted of their beliefs, when faced with suggestions that everything they believe is a lie, simply become more convicted, not less. This is why pure Atheism is not a a very good avenue for fixing the problem of religion, it only bolsters religious feeling and camaraderie in those communities, it does not divide and disintegrate them, like Atheists intend."
	},
	{
		text:"Getting back to intelligence, my contention is that intelligence does not exist. I say this because as someone who has been told on many occasions (sometimes very quickly in my encounters with people) that I have it or that I am an intelligent person (like I’m different in some way from most people), I have a unique perspective on it. Additionally, my parents shoved this idea down my throat with such ferocity that I believed it at first, but upon being unleashed on the world, it did not serve me as I thought it would, so I began to doubt it. They told me I had something else, too. They told me I was very insightful as well. This I never doubted, because this did not crumble so easily. Now, you'll notice that I appear to be saying that it is no coincidence that insight, while being a trustworthy skill of mine, there is also no scrutiny with regard to its existence or basic definition. (For clairity's sake, I am still observed, to this day, to possess intelligence). You’ll soon how I came to my conclusions based on my experience with intelligence's and insight's prophesies, performances, and continued observations, and how all of this is related to the question of god."
	},
	{
		text:"Because insight is understood by us very well, it seems to follow this is what we can rely on, not intelligence. And instead of thinking intelligence is inherently a trait, wouldn’t it be better to think that something we can actually understand is the inherent trait in people at birth? And further, wouldn’t it better to understand intelligence as some characteristic that seems to manifest in someone as a result of experience using that defined tool? But, still maintaining that intelligence is just an (illusory) manifestation of a special type of experience gained when someone uses a tool. I say illusory because its not guaranteed that a person will always have or express intelligence depending on their experience with a certain situation, but a person can usually always be insightful, for example, without much effort."
	},
	{
		text:"So now onto god. Taking the above discussion as an analogy for god (although it stands on its own for intelligence, still), one can suppose that the reason we have been unable to determine whether god exists or not is because it doesn’t. Bare with me, because I think you’ll be surprised, no matter what your religious or non-believing status."
	},
	{
		text:"Notice I don’t use a definite pronoun to describe god, nor do I capitalize it. This is because if the concept of god as its described most modern religious leaders (I’m excluding the poorly trained public in this instance) is taken as the definition we are using for these purposes, then it would follow that it has no gender. And if it were as great as those leaders and their followers claim then it wouldn’t be offended by whatever status this measly author is willing to give it."
	},
	{
		text:"So saying that it doesn’t exist doesn’t mean what you might have assumed it meant. Unicorns don’t exist, but they have a meaning. So do rainbows. Technically speaking, there is no color in the sky. The rainbow is an illusion, hence the reason you cannot reach the end, and why everyone sees the same rainbow no matter where they are. This does not mean that rainbows do not have meaning. So the better question to ask about god, rather than whether He/She/It/it exists would probably be: what is the meaning of god?"
	},
	{
		text:"With this question, now I can draw parallels with the intelligence discussion. For instance, we have definitions for, or at least each us individually, has understanding of love, compassion, good, and greatness. These things make sense to almost every human on the earth (those with certain mental illnesses, and most personality disorders excluded). And because we each understand these concepts concretely without much education about the logical arguments or dogma for the existence for or against the existence of god, we have an understanding, I’m claiming, for god itself. In each of us, and in others."
	},
	{
		text:"One more point must be made before I conclude. That is of the utility of the word 'is' when claiming equality vs. assignment. Take, for example, the phrase 'the sky is blue.' Clearly, the meaning is apparent. The sky is blue, but blue is not the sky. The direction of assignment goes in one direction, not the other. This understanding is apparent if you have a background in software programming were two different syntaxes are used to indicate an assignment of a value to a variable and a check of equality. The equals sign is used to assign the value '2' to the variable 'a', but it does not follow from such a statement programmatically that 2 = a: this statement makes no sense. However if we want to check what “a” equals we would ask 'if (a == 2) then...' with two equals signs. This is a subtle difference, but the machine requires the distinction in most programming languages. It also reveals an aspect of human language that I described above (at least in English)."
	},
	{
		text:"So taking this, consider the phrases: “God is love” and “God is Great.” These statements seem to make an assignment of some sort, because they have the same syntax, in human language, to “the sky is blue.” My ultimate claim, therefore, which drives the point home more viscerally, is simply that these statements made by the misguided are backwards: the assignment is in the wrong direction."
	}
	]);

	return {
		comingsoon:comingsoon,
		prison:prison,
		scale_time:scale_time,
		meaning_god:meaning_god
	}

});