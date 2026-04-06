const scenario = {
  title: "The Great Fire of Rome — 64 AD",
  setting: "Rome, July 64 AD. Nine days of fire have destroyed ten of the city's fourteen districts.",

  briefing: [
    {
      title: "Rome, 64 AD",
      image: "images/map-rome.jpg",
      text: "The Circus Maximus. The Palatine Hill. The Subura. The Forum. The Campus Martius.\n\nRemember these names. Before the night is over, most of them will be gone."
    },
    {
      title: "A City of One Million",
      image: "images/briefing-1.jpg",
      text: "Down in those streets: a million people crammed into a maze of narrow alleys and wooden towers. Apartment blocks rise six stories high — families of four in rooms the size of a closet. Cook-fires on every floor. Oil lamps on every table. A hundred small fires break out every day.\n\nRome is a tinderbox. Everyone knows it. Nobody does anything about it."
    },
    {
      title: "The Night of July 18th",
      image: "images/briefing-2.jpg",
      text: "Just after midnight, fire erupts in the oil shops beneath the Circus Maximus. Wind whips the flames along the full length of the arena — two thousand feet of wooden seating, awnings, and market stalls catch instantly.\n\nThe narrow streets act as chimneys, funneling flame from block to block. People don't know which way to run. Some flee toward neighborhoods already burning.\n\nRome's 7,000 firefighters are overwhelmed. They try to demolish buildings to create firebreaks. The wind carries embers over the gaps."
    },
    {
      title: "From Above",
      image: "images/map-fire-night1.jpg",
      text: "Within hours, the fire is climbing the Palatine Hill. The Circus Maximus — that arena you just saw — is fully engulfed. The emperor's own palace is burning.\n\nThe fire burns for six days. It's brought under control. Then it reignites — on property connected to the Emperor's closest ally — and burns for three more days."
    },
    {
      title: "What's Left",
      image: "images/map-fire-peak.jpg",
      text: "Ten of Rome's fourteen districts are destroyed. Three leveled to bare ground. Seventy percent of the city — gone.\n\nThe same streets. The same hills. Unrecognizable."
    },
    {
      title: "The Silence",
      image: "images/briefing-3.jpg",
      text: "When the smoke clears, there is nothing. Charred stone where temples stood for centuries. Ash where families lived. The smell of wet cinder and something worse underneath.\n\nA few figures pick through the rubble, looking for anything that survived. Most find nothing."
    },
    {
      title: "And Then Something Strange Happens",
      image: "images/aftermath-domus-aurea.jpg",
      text: "Emperor Nero — the man everyone suspects — builds the largest palace in Roman history on the cleared land. Three hundred rooms. An artificial lake. A 120-foot bronze statue of himself. \"At last,\" he says, \"I can live like a human being.\"\n\nMeanwhile, a small religious sect called the Christians is rounded up, tortured, and burned alive in Nero's gardens as punishment for a crime they may not have committed."
    }
  ],

  assignment: {
    image: "images/cover.jpg",
    text: "The official story has been written by senators who hated Nero and historians born after the fire. The truth is buried under 2,000 years of politics, bias, and legend.\n\nYou're going back. Three witnesses. Three versions of that night. One of them knows what really happened.\n\nYour job: Figure out who started the Great Fire of Rome."
  },

  witnesses: {
    nero: {
      id: "nero",
      name: "Nero",
      title: "Emperor of Rome",
      age: 26,
      portrait: "images/nero.jpg",
      claims: "Was at Antium, 35 miles away",
      profile: "Young emperor, artistic, theatrical. Rushed back to organize relief — opened gardens, brought food, lowered grain prices. Then built the largest palace in Roman history on the cleared land."
    },
    tigellinus: {
      id: "tigellinus",
      name: "Tigellinus",
      title: "Prefect of the Praetorian Guard",
      age: 55,
      portrait: "images/tigellinus.jpg",
      claims: "Was fighting the fire all night",
      profile: "Commander of the emperor's personal guard. Cold, calculating, ruthless. The fire reignited on property connected to him. Organized the relief camps — and the Christian roundup."
    },
    miriam: {
      id: "miriam",
      name: "Miriam",
      title: "Resident of the Subura District",
      age: 34,
      portrait: "images/miriam.jpg",
      claims: "Was home in the Subura",
      profile: "Jewish-Christian woman who lost her home. Was in the streets that night — one of the first to see the fire spread. Her community was scapegoated and tortured for a crime they didn't commit."
    }
  },

  caseFile: {
    fire: {
      title: "The Fire",
      facts: [
        "Started: July 18, ~midnight",
        "Location: Circus Maximus oil shops",
        "Duration: 9 days (6 + reignition + 3)",
        "Destroyed: 10 of 14 districts",
        "3 districts leveled to bare ground",
        "~70% of Rome destroyed"
      ]
    },
    keyFacts: {
      title: "Key Facts",
      facts: [
        "Nero was at Antium (35 mi) when fire started",
        "Fire reignited on Tigellinus's property",
        "Domus Aurea built on cleared land",
        "Christians blamed & publicly tortured",
        "Witnesses saw men with torches claiming 'orders'",
        "Nero's own palace also destroyed in fire",
        "Nero organized shelters, food, lower grain prices"
      ]
    },
    sources: {
      title: "Ancient Sources",
      facts: [
        "Tacitus (c. 116 AD): \"uncertain\" — both sides",
        "Suetonius (c. 121 AD): Nero did it",
        "Cassius Dio (c. 225 AD): Nero sent arsonists",
        "All three were senators who despised Nero",
        "Josephus refused to write about it — too biased"
      ]
    }
  },

  theories: {
    nero_ordered: {
      id: "nero_ordered",
      label: "Nero ordered the fire",
      description: "You believe Emperor Nero deliberately set fire to Rome to clear land for his Golden Palace.",
      strength: "moderate",
      response: {
        headline: "Many Ancient Sources Agree With You",
        summary: "Suetonius, Cassius Dio, and Pliny the Elder all blamed Nero directly. But modern historians have serious doubts.",
        forEvidence: [
          "He built the Domus Aurea — the largest palace in Roman history — on the cleared land",
          "Multiple ancient sources blame him directly",
          "Witnesses reported men throwing torches and claiming to have \"orders\"",
          "The fire reignited on his closest ally's property",
          "He immediately blamed Christians — a classic deflection"
        ],
        againstEvidence: [
          "The fire destroyed his own palace (Domus Transitoria) — why burn your own home?",
          "He was 35 miles away in Antium when it started",
          "His relief efforts were genuine and substantial",
          "Tacitus — the most reliable source — refused to endorse the arson story",
          "A full moon that night would have made arsonists easy to spot"
        ],
        modernConsensus: "Most modern historians doubt Nero ordered the fire. The ancient sources were all written by senators who hated him. Tacitus, the most careful historian of the era, called it \"uncertain\" and described Nero's genuine relief efforts."
      }
    },
    accident_exploited: {
      id: "accident_exploited",
      label: "An accident that Nero exploited",
      description: "You believe the fire started accidentally — but Nero and his allies seized the opportunity to reshape Rome for their own benefit.",
      strength: "strong",
      response: {
        headline: "Most Modern Historians Agree With You",
        summary: "This is closest to the current scholarly consensus. Rome was a tinderbox — the fire was almost inevitable. What happened afterward is where the real story lies.",
        forEvidence: [
          "Rome had ~100 small fires every day — a major conflagration was inevitable",
          "Timber buildings, oil lamps, narrow streets, hot July winds — a perfect storm",
          "Tacitus wrote: \"whether accidental or caused by the emperor is uncertain\"",
          "The fire started in flammable oil shops — a likely accident site",
          "Nero's own palace burned — suggesting he didn't plan the fire's path"
        ],
        exploitationEvidence: [
          "The Domus Aurea plans were drawn up suspiciously fast after the fire",
          "The reignition on Tigellinus's property suggests deliberate extension",
          "Christians were rounded up with lists prepared remarkably quickly",
          "Nero's building codes conveniently cleared land for his projects",
          "\"At last I can live like a human being\" — not the words of a grieving emperor"
        ],
        modernConsensus: "The scholarly consensus is that the fire was likely accidental, but the response was calculated. Nero and Tigellinus saw the opportunity before the ashes cooled. The real crime may not be arson — it's what they did next."
      }
    },
    political_enemies: {
      id: "political_enemies",
      label: "Political enemies started the fire",
      description: "You believe Nero's enemies in the Senate started the fire to destroy his popularity and set the stage for his removal.",
      strength: "weak",
      response: {
        headline: "A Real Theory, But the Evidence Is Thinnest Here",
        summary: "Political arson was not unknown in Rome, and the Senate had every reason to want Nero gone. But direct evidence is scarce.",
        forEvidence: [
          "The Senate despised Nero — within a year, the Pisonian Conspiracy would try to assassinate him",
          "Political arson had precedent in Roman history",
          "All surviving accounts come from the senatorial class who had reason to redirect blame",
          "Nero was popular with common people — the fire destroyed that base"
        ],
        againstEvidence: [
          "No ancient source even hints at senatorial involvement",
          "The Pisonian Conspiracy of 65 AD was a separate plot with different methods",
          "Starting a fire in the Circus Maximus would primarily hurt common people, not Nero",
          "The Senate lacked the organized manpower witness testimony describes",
          "Destroying Rome to remove one emperor is extreme and self-destructive"
        ],
        modernConsensus: "While senators clearly benefited from Nero's eventual downfall, there is no credible evidence they started the fire. This theory requires the most speculation and the least evidence supports it."
      }
    }
  },

  keyClues: [
    { witness: "nero", clue: "His grief over the Domus Transitoria rings hollow — he immediately built something 10x grander" },
    { witness: "nero", clue: "Can't explain why fire safety codes weren't enacted before the fire" },
    { witness: "nero", clue: "Oddly specific knowledge of which districts burned — for someone who arrived late" },
    { witness: "nero", clue: "Deflects when asked about Tigellinus and the reignition" },
    { witness: "tigellinus", clue: "Describes the fire's spread like a military campaign — studying it, not fighting it" },
    { witness: "tigellinus", clue: "His explanations about the reignition shift when pressed" },
    { witness: "tigellinus", clue: "Had Christian arrest lists prepared with suspicious speed" },
    { witness: "tigellinus", clue: "Knows Domus Aurea details suggesting involvement before the fire" },
    { witness: "miriam", clue: "Saw organized men near the Circus Maximus before the fire started" },
    { witness: "miriam", clue: "Saw men near Tigellinus's property before the reignition" },
    { witness: "miriam", clue: "Heard a Praetorian soldier mention \"orders\" about not fighting the fire" },
    { witness: "miriam", clue: "Hiding that she was out for a secret Christian meeting — makes her seem unreliable" }
  ]
};

module.exports = scenario;
