export const lektion1 = {
  title: "Lektion 1: Julia Santos begrüßt einen Gast",
  sections: [
    {
      id: "intro-text",
      type: "text",
      content: "## Julia Santos begrüßt einen Gast\n\nJulia Santos arbeitet seit zwei Jahren als Empfangssekretärin bei KFR Solar (GmbH) in Frankfurt am Main. KFR Solar ist ein Photovoltaik-Unternehmen, das 1999 in den USA gegründet wurde. Der Hauptsitz des international tätigen Unternehmens liegt in Atlanta, Georgia. Es gibt Tochterunternehmen in Europa und Asien und weltweit mehr als 20000 Mitarbeiter. In Deutschland gibt es drei Filialen, die deutsche Zentrale befindet sich in Frankfurt am Main."
    },
    {
      id: "ex-1",
      type: "exercise",
      exerciseType: "fill-in-the-blanks",
      question: "1. Welche Voraussetzungen sollte eine Empfangssekretärin wie Julia Santos für ihren Beruf mitbringen? Ordnen Sie die Ausdrücke in die Tabelle ein.",
      text: "Kenntnisse: {0}, {1}. Eigenschaften: {2}, {3}, {4}. Sonstiges: {5}, {6}.",
      answers: ["Englisch", "EDV-Kenntnisse", "geduldig", "höflich", "hilfsbereit", "gepflegtes Aussehen", "angenehme Stimme"],
      options: ["Englisch", "EDV-Kenntnisse", "geduldig", "höflich", "hilfsbereit", "gepflegtes Aussehen", "angenehme Stimme", "Mechanik"]
    },
    {
      id: "section-a-title",
      type: "text",
      content: "## A. Kunden begrüßen\n\nJulia Santos begrüßt Herrn Greiner von der Firma EE Nord AG. Herr Greiner, ein potenzieller Neukunde aus Hamburg, möchte sich die verschiedenen Lösungen für Solarmodule ansehen."
    },
    {
      id: "audio-a1",
      type: "audio",
      title: "Hören: Gespräch mit Herrn Greiner",
      audioUrl: "/audio/B1/Im_Beruf_Neu_B2_Lektion_1_Aufgabe_A1.mp3",
      duration: "1:20"
    },
    {
      id: "ex-a1",
      type: "exercise",
      exerciseType: "checkbox-group",
      question: "A1. Hören Sie das Gespräch. Welche Themen kommen vor? Markieren Sie.",
      options: [
        { text: "Wetter", isCorrect: true },
        { text: "Verabschiedung", isCorrect: false },
        { text: "Thema der Sitzung", isCorrect: true },
        { text: "Garderobe", isCorrect: true },
        { text: "Frage nach dem Befinden", isCorrect: true },
        { text: "etwas zu essen anbieten", isCorrect: false },
        { text: "Familie", isCorrect: false },
        { text: "Begrüßung", isCorrect: true },
        { text: "Probleme in der Arbeit", isCorrect: false },
        { text: "etwas zu trinken anbieten", isCorrect: true },
        { text: "finanzielle Situation", isCorrect: false },
        { text: "Anreise", isCorrect: true }
      ]
    },
    {
      id: "redemittel-a3",
      type: "text",
      content: "### Redemittel: Kunden begrüßen\n\n**jemanden begrüßen und sich vorstellen:**\n- Guten Tag, herzlich willkommen.\n- Schön, Sie bei uns begrüßen zu dürfen.\n- Guten Tag, mein Name ist...\n\n**über die Anreise sprechen:**\n- Wie war die Reise, Frau ... / Herr ...?\n- Hatten Sie einen guten Flug / eine gute Fahrt?\n- Sind Sie mit der Bahn gekommen?\n\n**etwas zu trinken anbieten:**\n- Was darf ich Ihnen anbieten?\n- Möchten Sie Kaffee oder Tee?\n- Kann ich Ihnen Wasser oder Saft anbieten?"
    },
    {
      id: "section-b-title",
      type: "text",
      content: "## B. Unternehmensstrukturen verstehen, über Aufgaben sprechen\n\nLesen Sie das Organigramm der KFR Solar. Wer arbeitet in welcher Abteilung?"
    },
    {
      id: "ex-b1a",
      type: "exercise",
      exerciseType: "multiple-choice",
      question: "B1a. Wer leitet die Geschäftsleitung?",
      options: [
        { text: "Dipl.-Ing. Christian Hübner", isCorrect: false },
        { text: "Peter Norman", isCorrect: true },
        { text: "Anna Fuchs", isCorrect: false }
      ]
    },
    {
      id: "ex-b1b",
      type: "exercise",
      exerciseType: "multiple-choice",
      question: "B1a. In welcher Abteilung arbeitet Thomas Berger?",
      options: [
        { text: "Einkauf", isCorrect: false },
        { text: "Personalabteilung", isCorrect: false },
        { text: "Vertrieb", isCorrect: true }
      ]
    },
    {
      id: "section-d-title",
      type: "text",
      content: "## D. Medienberichte über Ausbildung verstehen\n\n### DUALE AUSBILDUNG\nMehr als die Hälfte aller Jugendlichen in Deutschland macht nach dem Schulabschluss eine Berufsausbildung. Bei der Mehrzahl der staatlich anerkannten Ausbildungsberufe in Deutschland – ca. 350 – ist die Ausbildung dual aufgebaut, findet also an zwei Orten statt: 1 bis 2 Tage in der Berufsschule und den Rest der Woche im Betrieb.\n\nIn der Berufsschule wird das für den Beruf notwendige theoretische Wissen vermittelt, im Betrieb werden Stück für Stück die für den Beruf erforderlichen Tätigkeiten gelernt. Die duale Ausbildung dauert je nach Beruf 2,5 bis 3,5 Jahre und wird mit einer Prüfung abgeschlossen."
    },
    {
      id: "ex-d2b-1",
      type: "exercise",
      exerciseType: "true-false",
      question: "D2b. Richtig oder falsch? Herr Graf fühlt sich in manchen Bereichen schlecht auf den Berufseinstieg vorbereitet.",
      isTrue: true
    },
    {
      id: "ex-d2b-2",
      type: "exercise",
      exerciseType: "true-false",
      question: "D2b. Richtig oder falsch? Frau Sommer hat sechs Jahre studiert.",
      isTrue: false
    }
  ]
};

export const lektion1Chapters = [
  {
    id: "c1",
    title: "Lektion 1: Julia Santos begrüßt einen Gast",
    status: "in-progress",
    progress: 10,
    lessons: [
      { id: "l1-intro", title: "1.0 Einführung", status: "completed" },
      { id: "l1-a", title: "1.1 Kunden begrüßen", status: "in-progress" },
      { id: "l1-b", title: "1.2 Unternehmensstrukturen", status: "not_started" },
      { id: "l1-c", title: "1.3 Beruf vorstellen", status: "not_started" },
      { id: "l1-d", title: "1.4 Ausbildung verstehen", status: "not_started" }
    ]
  },
  {
    id: "c2",
    title: "Lektion 2: Der erste Arbeitstag",
    status: "not_started",
    progress: 0,
    lessons: [
      { id: "l2", title: "2.1 Sorin Mateis' erster Arbeitstag", status: "not_started" }
    ]
  }
];
