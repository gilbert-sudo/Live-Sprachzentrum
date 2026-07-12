export const sampleLesson = {
  title: "Lektion 2: Der erste Arbeitstag",
  sections: [
    {
      id: "intro",
      type: "text",
      content: "## 1. Ein neuer Anfang\n\nHeute ist der erste Arbeitstag für Sorin. Er ist sehr aufgeregt. Er hat viele neue Informationen bekommen und muss sich im neuen Betrieb orientieren. Die Kollegen helfen ihm dabei.\n\nLesen Sie den Text und hören Sie sich danach das Gespräch an."
    },
    {
      id: "vocab-1",
      type: "vocabulary",
      words: [
        { word: "aufgeregt", translation: "excited, nervous", type: "Adjektiv" },
        { word: "der Arbeitstag", translation: "workday", type: "Nomen" },
        { word: "der Betrieb", translation: "company, workplace", type: "Nomen" },
        { word: "sich orientieren", translation: "to orient oneself", type: "Verb" }
      ]
    },
    {
      id: "audio-1",
      type: "audio",
      title: "Hören: Sorin stellt sich vor",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
      duration: "0:45"
    },
    {
      id: "exercise-1",
      type: "exercise",
      exerciseType: "fill-in-the-blanks",
      question: "Ergänzen Sie den Text. Tippen Sie die Wörter in die Lücken ein.",
      text: "Hallo, ich bin Sorin. Das ist mein erster {0}. Ich bin sehr {1}, aber alle Kollegen hier im {2} sind sehr freundlich und helfen mir.",
      answers: ["Arbeitstag", "aufgeregt", "Betrieb"],
      options: ["Arbeitstag", "aufgeregt", "Betrieb", "Urlaub", "müde", "Krankenhaus"] 
    },
    {
      id: "exercise-2",
      type: "exercise",
      exerciseType: "multiple-choice",
      question: "Was muss Sorin an seinem ersten Tag machen?",
      options: [
        { text: "Er muss sofort allein arbeiten.", isCorrect: false },
        { text: "Er muss sich im Betrieb orientieren.", isCorrect: true },
        { text: "Er muss Urlaub nehmen.", isCorrect: false }
      ]
    }
  ]
};

export const sampleChapters = [
  {
    id: "c1",
    title: "Lektion 1: Beruf & Kunden",
    status: "completed",
    progress: 100,
    lessons: [
      { id: "l1", title: "1.1 Begrüßung", status: "completed" },
      { id: "l2", title: "1.2 Berufe vorstellen", status: "completed" }
    ]
  },
  {
    id: "c2",
    title: "Lektion 2: Der erste Arbeitstag",
    status: "in-progress",
    progress: 45,
    lessons: [
      { id: "l3", title: "2.1 Sorin Mateis' erster Arbeitstag", status: "in-progress" },
      { id: "l4", title: "2.2 Ratschläge verstehen und geben", status: "not_started" },
      { id: "l5", title: "2.3 Eine Betriebsvereinbarung", status: "not_started" }
    ]
  },
  {
    id: "c3",
    title: "Lektion 3: Bewerbung um eine Stelle",
    status: "not_started",
    progress: 0,
    lessons: [
      { id: "l6", title: "3.1 Lebenslauf", status: "not_started" },
      { id: "l7", title: "3.2 Anschreiben", status: "not_started" }
    ]
  }
];
