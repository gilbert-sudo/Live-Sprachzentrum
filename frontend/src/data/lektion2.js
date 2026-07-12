export const lektion2 = {
  title: "Lektion 2: Der erste Arbeitstag",
  sections: [
    {
      id: "audio-l2-1",
      type: "audio",
      title: "Hören: Der erste Arbeitstag - Einführung",
      audioUrl: "/audio/B1/Im_Beruf_Neu_B2_Lektion_1_Aufgabe_A1.mp3",
      duration: "2:45"
    },
    {
      id: "ex-l2-1",
      type: "exercise",
      exerciseType: "multiple-choice",
      question: "Was macht Sorin am ersten Arbeitstag?",
      options: [
        { text: "Er lernt die Kollegen kennen.", isCorrect: true },
        { text: "Er geht nach Hause.", isCorrect: false },
        { text: "Er macht Urlaub.", isCorrect: false }
      ]
    },
    {
      id: "ex-l2-2",
      type: "exercise",
      exerciseType: "fill-in-the-blanks",
      question: "Ergänzen Sie den Satz:",
      text: "Am ersten Tag ist es wichtig, {0} zu sein.",
      answers: ["pünktlich"],
      options: ["pünktlich", "unpünktlich", "müde"]
    }
  ]
};
