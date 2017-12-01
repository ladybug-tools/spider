
console.log( '', 23 );

	var divTooToo = divTooToo || undefined;

	let synth;
	let voices;

	let textPlaya = [

		"Everything goes so fast, but it takes forever.",
		"I’m going to make dinner because my colors taste like hungry.",
		"Where are the regular bathrooms?",
		"If art doesn’t make you want to fight, fuck or philosophize then it probably isn’t very good.",
		"Just wait till right now.",
		"Wow, this place is big. I didn’t know I needed a bike.",
		"The drugs are certainly working… I had to physically confirm that my LED strip was off.",
		"Meth is great if you need to peel a whole bowl of grapes.",
		"Burning Man is a place where you leave things behind….like time. And underwear.",
		"It’s not gay if it’s at Burning Man.",
		"I can’t keep the velcro on my work gloves from catching the hem of my tutu…",
		"This food is from the Martha Stewart Prison Cookbook.",
		"This is like the Saturday morning cartoons as a kid, only WE are the cartoon!",
		"I’m going to fix another drink then continue exposing myself.",
		"Do you ever notice when the color of the sound changes?",
		"It’s beautiful to see the sunrise after a night when you thought you never would again.",
		"I’ll be right back.",
		"Wash your own brain, lady, we’re not a cult.",
		"Next year I’m gonna do a rogue gynecology camp.",
		"Technically, alcohol is a solution.",
		"Acid makes Rangering better.",
		"I think I’m smarter than acid.",
		"When do they turn the music off?",

	];


	let count = -1;
	const b = '<br>';

	init();

	function init() {

		if ( !divTooToo ) {

			divTooToo = document.body.appendChild( document.createElement( 'div' ) );
			divTooToo.style.cssText = 
				'background-color: white; border: 1px solid red; max-width: 350px; opacity: 0.85; ' +
				' padding: 10px; position: fixed; right: 30px; top: 20px; z-index:100000; ';

		}

		let txt = 'lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?';

		divTooToo.innerHTML = 
`
		<div id = "header" ><h1><a id = "title" href = "" ></a></h1></div>
		<p><button onclick='sayThis("“Do you want cream or sugar?”")'; "What the Java Cow asks" >Say test test</button></p>
		<p><button onclick='sayTextFromPlaya()'; >Say text from the Playa</button></p>
		<p>from: <a href="http://sound-fix.com/2015920ill-be-right-back-other-hilarious-things-overheard-at-burning-man/" target="_blank">“I’ll be right back” & Other Hilarious Things Overheard at Burning Man</a></p>
		<p><button onclick=synth.cancel();count=-1; >Shut Up!</button></p>
`;

		if ( 'speechSynthesis' in window ) {

//console.log( 'You\'re good to go!' )

		} else {

console.log( 'Sorry, speech synthesis isn\'t supported.' );

		}

		synth = window.speechSynthesis;

		synth.onvoiceschanged = function() {

			voices = window.speechSynthesis.getVoices();
//			sayThis( 'Hello, world!' );

		}

//		sayThis( '<?xml version="1.0"?><speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd" xml:lang="en-US" ><mark name="here" > yo  here, to there <mark name="there"/></speak>' );

//		sayThis( 'e' );

// console.log( 'synth', synth );

		window.addEventListener( 'unload', function() { synth.cancel(); }, false );

	}



	function sayThis( text ) {

		var utterThis;

		if ( !voices ) { voices = window.speechSynthesis.getVoices(); }

		synth.cancel();

		utterThis = new SpeechSynthesisUtterance( text );
// console.log( 'voices', voices );


		for ( i = 0; i < voices.length ; i++ ) {

			if ( voices[ i ].voiceURI.toLowerCase().includes( 'female' ) ) {
// console.log( '', voices[ i ].voiceURI.toLowerCase() );

				utterThis.voice = voices[ i ];

				break;

			}

		}

// console.log( 'utterThis', utterThis );

//		utterThis.pitch = 0.5;
//		utterThis.rate = 0.5;

//		utterThis.onstart = function(){ console.log( 'start', 11 ); }
//		utterThis.onend = function(){ console.log( 'end', 88 ); }

		synth.speak( utterThis );

	}



	function sayTextFromPlaya() {

		var utterThis;

		synth.cancel();

		count = ++count < textPlaya.length ? count : 0;
 
		utterThis = new SpeechSynthesisUtterance( textPlaya[ Math.floor( Math.random() * textPlaya.length ) ] );

		for ( i = 0; i < voices.length ; i++ ) {

			if ( voices[ i ].voiceURI.toLowerCase().includes( 'female' ) ) {
// console.log( '', voices[ i ].voiceURI.toLowerCase() );

				utterThis.voice = voices[ i ];

				break;

			}

		}

		utterThis.rate = 0.6;
		utterThis.pitch = 0.8;
		utterThis.volume = 0.5;

		utterThis.onend = function(){ if ( count ) { sayTextFromPlaya(); } }

		synth.speak( utterThis );

	}


	function onExplainMapOverlay() {

//console.log( '', 23 );

		parent.ifrContents.src = 'r6/mnu-overlays.html#go';

console.log( 'nn', parent.mnuOverlays );

		parent.mnuOverlays.focus();

		text = "oo"; // 

		var utterThis;

		synth.cancel();

		utterThis = new SpeechSynthesisUtterance( textOverlay[ count ] );

		count = count++ < textOverlay.length ? count : -1;


		for ( i = 0; i < voices.length ; i++ ) {

			if ( voices[ i ].voiceURI.toLowerCase().includes( 'female' ) ) {
// console.log( '', voices[ i ].voiceURI.toLowerCase() );

				utterThis.voice = voices[ i ];

				break;

			}

		}

		utterThis.rate = 0.6;
		utterThis.pitch = 0.8;
		utterThis.volume = 0.5;

		utterThis.onend = function(){ if ( count ) { onExplainMapOverlay(); } }

		synth.speak( utterThis );

	}
