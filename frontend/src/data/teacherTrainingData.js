// Lehrerhandbuch - Teacher Training Program Data
// Digitalized from Lehrerhandbuch Live-Sprachzentrum (Oktober 2026)
// Deutsch unterrichten auf Deutsch - Hueber Verlag Lehrwerke

export const handbookMeta = {
  title: "Lehrerhandbuch",
  subtitle: "Deutsch unterrichten auf Deutsch – mit den Lehrwerken des Hueber Verlags",
  schoolName: "Live-Sprachzentrum",
  slogan: "Deutsch erleben",
  location: "Lot 218B Antanetibe Antehiroka, Ambohidratrimo 105 – Madagascar",
  date: "Stand: Oktober 2026",
  director: "Frau Loïsa",
  totalPagesInOriginal: 16
};

export const trainingModules = [
  {
    id: "vorwort",
    number: "Vorwort",
    badge: "Einführung",
    title: "Vorwort der Schulleitung",
    shortTitle: "Vorwort",
    icon: "waving_hand",
    readTime: "3 Min.",
    summary: "Begrüßung von Direktorin Frau Loïsa und die drei Leitprinzipien: Orientierung, Werkzeuge und Einheitlichkeit.",
    content: {
      salutation: "Liebe Kolleginnen und Kollegen,",
      lead: "Im Live-Sprachzentrum lernen unsere Kursteilnehmenden Deutsch – und zwar auf Deutsch. Dieses Handbuch beschreibt, wie wir unterrichten: mit den Lehrwerken des Hueber Verlags als roter Faden und mit einer gemeinsamen Methode, die Bedeutung ohne Übersetzung vermittelt.",
      pillarsTitle: "Das Handbuch soll Ihnen drei Dinge geben:",
      pillars: [
        {
          title: "Orientierung",
          subtitle: "Was erwartet die Schule von jeder Lehrkraft im Unterricht?",
          icon: "explore",
          color: "from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300"
        },
        {
          title: "Werkzeuge",
          subtitle: "Wie erkläre ich ein neues Wort, eine Regel oder eine Aufgabe, ohne Französisch oder Malagasy zu benutzen?",
          icon: "handyman",
          color: "from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300"
        },
        {
          title: "Einheitlichkeit",
          subtitle: "Lernende, die die Klasse oder die Lehrkraft wechseln, finden überall denselben Ablauf und dieselben Regeln.",
          icon: "sync_alt",
          color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
        }
      ],
      closing: "Bitte lesen Sie das Handbuch vor Ihrem ersten Kurs vollständig und nutzen Sie die Checkliste am Ende für jede Unterrichtsvorbereitung. Vorschläge zur Verbesserung sind jederzeit willkommen.",
      signature: {
        role: "Ihre Direktorin",
        name: "Frau Loïsa",
        school: "Live-Sprachzentrum · Deutsch erleben"
      }
    }
  },
  {
    id: "philosophie",
    number: "1",
    badge: "Kapitel 1",
    title: "Unsere Philosophie: Deutsch im Deutschunterricht",
    shortTitle: "1. Philosophie: Deutsch auf Deutsch",
    icon: "psychology",
    readTime: "7 Min.",
    summary: "Warum einsprachiger Unterricht ab Tag 1 zum Erfolg führt, die 5 Klassenregeln, erlaubte Ausnahmen und Intonation.",
    content: {
      corePrinciple: "Im Unterricht wird so wenig wie möglich eine andere Sprache als Deutsch gesprochen – von der ersten Stunde A1 an. Wer Deutsch hört, versteht und benutzt, lernt schneller als jemand, der jedes Wort übersetzt bekommt.",
      reasonsTitle: "Warum einsprachig?",
      reasons: [
        {
          title: "Mehr Kontakt mit der Sprache",
          text: "Jede Minute auf Französisch oder Malagasy ist eine Minute weniger Deutsch.",
          icon: "schedule"
        },
        {
          title: "Echtes Verstehen",
          text: "Wer ein Wort über ein Bild, eine Geste oder ein Beispiel erschließt, merkt es sich besser als eine Übersetzung.",
          icon: "lightbulb"
        },
        {
          title: "Strategien für später",
          text: "In Deutschland – in der Ausbildung, im Beruf, in der Familie – übersetzt niemand. Unsere Lernenden üben schon jetzt, mit Nichtverstehen umzugehen und nachzufragen.",
          icon: "flight_takeoff"
        },
        {
          title: "Selbstvertrauen",
          text: "Lernende erleben früh, dass sie auf Deutsch kommunizieren können.",
          icon: "sentiment_very_satisfied"
        }
      ],
      classroomRulesTitle: "Unsere Regeln im Klassenzimmer",
      classroomRules: [
        {
          step: 1,
          rule: "Die Lehrkraft spricht im Unterricht immer Deutsch",
          detail: "Auch bei Organisatorischem, wenn es irgendwie möglich ist."
        },
        {
          step: 2,
          rule: "Lernende fragen auf Deutsch nach",
          detail: "Z. B. „Was bedeutet …?“, „Können Sie das bitte wiederholen?“. Die Redemittel dafür hängen sichtbar im Raum (siehe Kapitel 6)."
        },
        {
          step: 3,
          rule: "Mindestens drei Erklärungstechniken vor Übersetzung",
          detail: "Bevor übersetzt wird, probiert die Lehrkraft mindestens drei Erklärungstechniken aus Kapitel 3 aus."
        },
        {
          step: 4,
          rule: "Gegenseitige Hilfe auf Deutsch",
          detail: "Lernende helfen sich gegenseitig auf Deutsch, nicht in der Muttersprache."
        },
        {
          step: 5,
          rule: "Kein Handy als Übersetzer während der Erklärung",
          detail: "Das Handy dient nicht als Übersetzer während der Erklärungsphase; das einsprachige Wörterbuch ist ab B1 erwünscht."
        }
      ],
      exceptions: {
        title: "Erlaubte Ausnahmen",
        subtitle: "Die Muttersprache bleibt ein Notfallwerkzeug, kein Unterrichtsmittel. Erlaubt ist sie kurz:",
        points: [
          "bei abstrakten Wörtern, die nach drei Versuchen nicht verstanden werden – dann ein einziges Wort, danach sofort zurück ins Deutsche;",
          "bei wichtigen organisatorischen Informationen (Prüfungstermine, Zahlungen, Sicherheit), die alle sicher verstehen müssen;",
          "in persönlichen Gesprächen, wenn es einer Person nicht gut geht."
        ]
      },
      firstHourIntro: {
        title: "Die erste Stunde (A1 und A2): Übliche Ausdrücke",
        text: "In der ersten Stunde führt die Lehrkraft die üblichen Ausdrücke des Unterrichts ein (Arbeitsblatt „Übliche Ausdrücke“, siehe Anhang). Hier ist die Muttersprache ausnahmsweise erlaubt: Die Lernenden sollen diese Sätze von Anfang an sicher verstehen, damit danach der ganze Unterricht auf Deutsch laufen kann.",
        steps: [
          {
            num: 1,
            title: "Vorspielen mit Mimik und Gestik",
            desc: "Jeder Ausdruck wird mit einer festen Geste gezeigt – z. B. Hand hinter das Ohr für „Lauter, bitte!“, Hände nach unten bewegen für „Langsamer, bitte!“, Schulterzucken für „Ich weiß nicht“."
          },
          {
            num: 2,
            title: "Kurz in der Muttersprache erklären",
            desc: "Bedeutung und Situation, in der man den Ausdruck benutzt."
          },
          {
            num: 3,
            title: "Synonyme und Gegenteile zeigen",
            desc: "Wiederholen Sie bitte! = Noch einmal, bitte! · Lauter ≠ leiser · Langsamer ≠ schneller."
          },
          {
            num: 4,
            title: "Intonation bewusst machen",
            desc: "Die Stimme steigt am Ende (↗): Ja/Nein-Frage. Die Stimme fällt am Ende (↘): Aussage, Bitte oder W-Frage. So erkennen Lernende schon an der Melodie, ob eine Frage gestellt und eine Antwort erwartet wird."
          },
          {
            num: 5,
            title: "Üben",
            desc: "Chorsprechen mit Gesten, dann Partnerarbeit und kleine Situationen."
          }
        ]
      },
      intonationGuide: {
        title: "Mehr zur Intonation: die drei Satzmelodien",
        explanation: "Die Satzmelodie zeigt, was der Satz will. Sie ist oft wichtiger als die Wortstellung: Derselbe Satz kann Aussage oder Frage sein.",
        melodies: [
          {
            type: "fallend",
            arrow: "↘",
            name: "Fallend",
            when: "Aussage, Bitte, Aufforderung, W-Frage",
            examples: [
              "Ich verstehe das nicht. ↘",
              "Langsamer, bitte! ↘",
              "Wie heißen Sie? ↘"
            ],
            color: "border-red-500 bg-red-500/5 text-red-600 dark:text-red-400"
          },
          {
            type: "steigend",
            arrow: "↗",
            name: "Steigend",
            when: "Ja/Nein-Frage, Rückfrage, Erstaunen",
            examples: [
              "Sind Sie fertig? ↗",
              "Sie kommen aus Toamasina? ↗",
              "Wie bitte? ↗"
            ],
            color: "border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
          },
          {
            type: "gleichbleibend",
            arrow: "→",
            name: "Gleichbleibend",
            when: "Satz ist noch nicht fertig, Aufzählung",
            examples: [
              "Ich kaufe Reis →, Tomaten → und Brot. ↘",
              "Wenn ich Zeit habe →, komme ich. ↘"
            ],
            color: "border-amber-500 bg-amber-500/5 text-amber-600 dark:text-amber-400"
          }
        ],
        importantNote: "Wichtig: W-Fragen fallen normalerweise (Was bedeutet das? ↘). Steigt eine W-Frage, klingt sie besonders freundlich oder ist eine Rückfrage („Wie heißen Sie noch mal?“ ↗).",
        techniques: [
          { name: "Handbewegung", desc: "Die Hand zeigt die Melodie in der Luft – nach oben ↗ oder nach unten ↘. Die Lernenden machen die Geste beim Sprechen mit." },
          { name: "Pfeile an der Tafel", desc: "Jede neue Frage und jeder Dialog bekommt Pfeile am Satzende, auch im Vokabelheft." },
          { name: "Minimalpaare", desc: "„Sie sind fertig. ↘“ / „Sie sind fertig? ↗“ – die Lehrkraft spricht, die Lernenden zeigen mit der Hand: Aussage oder Frage?" },
          { name: "Summen", desc: "Den Satz ohne Wörter nur summen („mm-mm-mm ↗“). So hören die Lernenden nur die Melodie." },
          { name: "Übertreiben", desc: "Am Anfang die Melodie deutlich übertreiben, später natürlich sprechen." },
          { name: "Mit Gefühl sprechen", desc: "Denselben Satz müde, fröhlich, überrascht, ärgerlich sagen („Ist alles klar?“) – verbindet Intonation mit Mimik." },
          { name: "Hörtexte nutzen", desc: "Bei der Foto-Hörgeschichte einen Satz stoppen und fragen: „Steigt oder fällt die Stimme?“" }
        ],
        reminder: "Die Intonation wird nicht nur in der ersten Stunde geübt, sondern in jeder Lektion bei neuen Fragen und Dialogen. Ab der zweiten Stunde benutzt die Lehrkraft nur noch Gesten und deutsche Ausdrücke. Das Arbeitsblatt hängt als Plakat im Raum. Alles Organisatorische wird zusätzlich schriftlich in der WhatsApp-Gruppe mitgeteilt."
      }
    }
  },
  {
    id: "lehrwerk",
    number: "2",
    badge: "Kapitel 2",
    title: "Das Lehrwerk: Schritte plus Neu",
    shortTitle: "2. Lehrwerk: Schritte plus Neu",
    icon: "auto_stories",
    readTime: "5 Min.",
    summary: "Der rote Faden von A1 bis B1 (und Sicher! für B2), Lektionsaufbau und unsere verbindlichen Grundsätze.",
    content: {
      intro: "Schritte plus Neu ist unser roter Faden von A1 bis B1; für B2 arbeiten wir mit Sicher! aktuell. Wir haben uns für Schritte plus Neu entschieden, weil es kleinschrittig aufgebaut ist: Jede Lektion führt in kleinen, klaren Schritten zu einem kommunikativen Ziel.",
      levelsTable: [
        { level: "A1", series: "Schritte plus Neu", books: "Bände 1 und 2", note: "Grundstufe 1" },
        { level: "A2", series: "Schritte plus Neu", books: "Bände 3 und 4", note: "Grundstufe 2" },
        { level: "B1", series: "Schritte plus Neu", books: "Bände 5 und 6", note: "Mittelstufe 1 / Zertifikat B1" },
        { level: "B2", series: "Sicher! aktuell", books: "Bände B2.1 und B2.2", note: "Mittelstufe 2" }
      ],
      mediaInfo: "Jeder Band enthält Kursbuch und Arbeitsbuch in einem Buch. Die Hörtexte und Filme finden Sie auf Hueber Media (media.hueber.de).",
      lessonStructure: [
        {
          part: "Foto-Hörgeschichte",
          badge: "Einstieg",
          desc: "Eine Bildergeschichte mit Audio stellt die Situation, die Personen und die neuen Strukturen vor. Sie ist der Ausgangspunkt jeder Lektion.",
          icon: "photo_library"
        },
        {
          part: "Lernschritte A bis C",
          badge: "Grammatik & Wortschatz",
          desc: "Neue Grammatik und neuer Wortschatz werden aus der Geschichte heraus eingeführt, geübt und angewendet. Die Kopfzeile jeder Seite nennt das Lernziel.",
          icon: "menu_book"
        },
        {
          part: "Lernschritte D und E",
          badge: "4 Fertigkeiten",
          desc: "Training der Fertigkeiten – Lesen, Hören, Schreiben, Sprechen – in alltagsnahen Situationen.",
          icon: "record_voice_over"
        },
        {
          part: "Grammatik und Kommunikation",
          badge: "Übersicht",
          desc: "Übersicht über die Strukturen und Redemittel der Lektion zum Nachschlagen.",
          icon: "table_chart"
        },
        {
          part: "Zwischendurch mal …",
          badge: "Auflockerung",
          desc: "Lieder, Spiele, Projekte, Landeskunde, Filme – zur Auflockerung und Wiederholung.",
          icon: "celebration"
        },
        {
          part: "Arbeitsbuch",
          badge: "Vertiefung",
          desc: "Übungen zu jedem Lernschritt, Fokus-Seiten (z. B. Beruf, Alltag), Lernwortschatz und Tests.",
          icon: "edit_note"
        }
      ],
      principles: [
        {
          title: "Reihenfolge einhalten",
          desc: "Wir folgen der Reihenfolge der Lernschritte; wir überspringen keine Schritte ohne Absprache.",
          icon: "format_list_numbered"
        },
        {
          title: "Original-Lehrwerk & Urheberrecht",
          desc: "Jede Lehrkraft nutzt das Original-Lehrwerk. Fotokopien des Buches sind aus Urheberrechtsgründen nicht erlaubt.",
          icon: "verified"
        },
        {
          title: "Basis, nicht Grenze",
          desc: "Das Buch ist die Basis, nicht die Grenze: Bilder, Gegenstände, Spiele und eigene Beispiele aus Madagaskar machen den Unterricht lebendig.",
          icon: "public"
        }
      ]
    }
  },
  {
    id: "bedeutung-erklaeren",
    number: "3",
    badge: "Kapitel 3",
    title: "Bedeutung erklären ohne Übersetzung",
    shortTitle: "3. Bedeutung ohne Übersetzung",
    icon: "lightbulb",
    readTime: "9 Min.",
    summary: "Der komplette didaktische Baukasten mit 10 Techniken: Synonyme, Gegenteile, Bilder, Mimik, Kontext und Ablauf.",
    content: {
      intro: "Jedes neue Wort wird mit einer oder mehreren der folgenden Techniken erklärt. Die Lehrkraft wählt die Technik, die zum Wort und zum Niveau passt, und kombiniert, wenn nötig.",
      overviewTable: [
        { technique: "Bilder zeigen", suitable: "Gegenstände, Lebensmittel, Orte, Tiere, Kleidung", level: "ab A1" },
        { technique: "Zeichnen an der Tafel", suitable: "Formen, Wege, Positionen, Größen, Wetter", level: "ab A1" },
        { technique: "Mimik und Gestik", suitable: "Verben, Gefühle, Adjektive, Präpositionen", level: "ab A1" },
        { technique: "Gegenteile", suitable: "Adjektive, Adverbien, einige Verben", level: "ab A1" },
        { technique: "Internationalismen", suitable: "Wörter, die es ähnlich im Französischen gibt", level: "ab A1" },
        { technique: "Wortbildung", suitable: "zusammengesetzte Nomen, Vorsilben, Nachsilben", level: "ab A1, verstärkt A2/B1" },
        { technique: "Beispiele und Kontext", suitable: "abstrakte Wörter, Zeitangaben, Redewendungen", level: "ab A2" },
        { technique: "Bedeutung aus dem Kontext erschließen", suitable: "Lesetexte, Hörtexte", level: "ab A2" },
        { technique: "Synonyme und gehobene Alternativen", suitable: "Wortschatzerweiterung, Register", level: "ab A2, verstärkt B1/B2" }
      ],
      sections: [
        {
          subId: "3.1",
          title: "3.1 Synonyme und gehobene Alternativen",
          desc: "Ein unbekanntes Wort wird durch ein bekanntes Wort mit gleicher oder ähnlicher Bedeutung erklärt. Ab B1 lernen die Teilnehmenden außerdem die gehobene oder formelle Variante eines bekannten Wortes.",
          examples: [
            { basic: "anfangen", elevated: "beginnen", symbol: "=" },
            { basic: "bekommen", elevated: "erhalten", symbol: "→ gehoben:" },
            { basic: "machen", elevated: "durchführen, erledigen", symbol: "→ gehoben:" },
            { basic: "wichtig", elevated: "bedeutend, wesentlich", symbol: "→ gehoben:" },
            { basic: "Ich habe keine Zeit.", elevated: "Ich bin beschäftigt.", symbol: "=" }
          ],
          tip: "Tipp: An der Tafel mit „=“ (gleich) und „≈“ (ähnlich) arbeiten. Darauf hinweisen, wenn ein Synonym nur in bestimmten Situationen passt („erhalten schreibt man oft in Briefen und E-Mails“).",
          frenchSynonymsPrinciple: "Unser Prinzip: Synonyme, die dem Französischen ähnlich sind. Wo es möglich ist, wählen wir als Erklärung ein deutsches Synonym, das einem französischen Wort ähnelt. So erschließen die Lernenden die Bedeutung selbst – ohne Übersetzung – und lernen gleichzeitig zwei deutsche Wörter, die sie beide benutzen können.",
          frenchSynonymsList: [
            { word: "die Auskunft", frenchSynonym: "die Information", frOrigin: "l'information" },
            { word: "die Anschrift", frenchSynonym: "die Adresse", frOrigin: "l'adresse" },
            { word: "verbessern", frenchSynonym: "korrigieren", frOrigin: "corriger" },
            { word: "überprüfen", frenchSynonym: "kontrollieren", frOrigin: "contrôler" },
            { word: "besprechen", frenchSynonym: "diskutieren", frOrigin: "discuter" },
            { word: "buchen", frenchSynonym: "reservieren", frOrigin: "réserver" },
            { word: "die Lage", frenchSynonym: "die Situation", frOrigin: "la situation" },
            { word: "die Schwierigkeit", frenchSynonym: "das Problem", frOrigin: "le problème" },
            { word: "in Ordnung bringen", frenchSynonym: "reparieren", frOrigin: "réparer" },
            { word: "der Beruf", frenchSynonym: "die Profession", frOrigin: "la profession (selten, aber verständlich)" }
          ],
          frenchNote: "An der Tafel stehen beide Wörter mit „=“ nebeneinander. Die Lernenden sollen im Gespräch abwechselnd beide Wörter benutzen."
        },
        {
          subId: "3.2",
          title: "3.2 Gegenteile",
          desc: "Das neue Wort wird über sein bekanntes Gegenteil erklärt. Die Gegenteile werden als Paar an die Tafel geschrieben, gern mit Pfeilen.",
          pairs: [
            { a: "billig", b: "teuer" },
            { a: "voll", b: "leer" },
            { a: "ankommen", b: "abfahren" },
            { a: "die Ausnahme", b: "die Regel" },
            { a: "ehrlich", b: "nicht ehrlich, er lügt" }
          ],
          scaleTip: "Tipp: Eine Skala zeichnen: eiskalt – kalt – kühl – warm – heiß. So werden auch Zwischenstufen klar."
        },
        {
          subId: "3.3",
          title: "3.3 Ein Wort durch Bilder darstellen",
          desc: "Fotos, Bildkarten oder Realia (echte Gegenstände) zeigen das Wort direkt. Das ist die schnellste Technik für konkrete Wörter.",
          bulletPoints: [
            "Die Foto-Hörgeschichte und die Bilder im Buch zuerst nutzen.",
            "Eine Bildkartei pro Niveau anlegen (Lebensmittel, Berufe, Wohnung, Körper …) – sie funktioniert auch ohne Strom und Beamer.",
            "Echte Gegenstände mitbringen: Obst vom Markt, ein Fahrkartenbeispiel, eine Speisekarte.",
            "Bilder mit Bezug zu Madagaskar und zu Deutschland zeigen (der Markt in Analakely – der Wochenmarkt in Deutschland)."
          ]
        },
        {
          subId: "3.4",
          title: "3.4 Zeichnen",
          desc: "Eine schnelle Skizze an der Tafel reicht – sie muss nicht schön sein, nur klar.",
          bulletPoints: [
            "Positionen und Präpositionen: Kasten und Ball für in, auf, unter, neben, zwischen",
            "Wege: Stadtplan mit geradeaus, links, rechts, an der Ampel",
            "Zeit: Zeitstrahl für gestern, heute, morgen, früher, später und für das Perfekt",
            "Wetter, Gesichter für Gefühle, einfache Strichmännchen für Handlungen"
          ],
          tip: "Tipp: Die Lernenden selbst zeichnen lassen: „Zeichnen Sie das Dach!“ Das zeigt sofort, ob sie verstanden haben."
        },
        {
          subId: "3.5",
          title: "3.5 Mimik und Gestik",
          desc: "Der Körper ist das wichtigste Werkzeug der Lehrkraft.",
          bulletPoints: [
            "Verben vorspielen: trinken, schlafen, laufen, sich waschen, suchen",
            "Gefühle zeigen: müde, traurig, überrascht, wütend, nervös",
            "Adjektive: groß/klein mit den Händen, schwer mit einer Tasche",
            "Feste Gesten für den Unterricht vereinbaren und immer gleich verwenden: Hand hinter das Ohr = Hören Sie!, Daumen nach hinten = Vergangenheit, Kreisbewegung = Bitte noch einmal!"
          ],
          tip: "Tipp: Pantomime als Spiel: Ein Lernender spielt ein Wort vor, die anderen raten."
        },
        {
          subId: "3.6",
          title: "3.6 Durch Beispiele erklären",
          desc: "Für abstrakte Wörter, die man weder zeigen noch zeichnen kann, helfen Beispielsätze und Situationen. Mehrere kurze Beispiele sind besser als eine lange Definition.",
          examples: [
            { term: "die Erfahrung", ex: "„Ich arbeite seit zehn Jahren als Lehrerin. Ich habe viel Erfahrung.“" },
            { term: "pünktlich", ex: "„Der Kurs beginnt um 8 Uhr. Ich komme um 8 Uhr – ich bin pünktlich. Ich komme um 8.20 Uhr – ich bin nicht pünktlich.“" },
            { term: "die Möbel", ex: "„Der Tisch, der Stuhl, das Bett, der Schrank – das sind Möbel.“ (Oberbegriff über Beispiele)" },
            { term: "Definition (ab A2)", ex: "„Ein Bäcker ist eine Person. Er macht Brot.“ (mit einfachen Worten)" }
          ]
        },
        {
          subId: "3.7",
          title: "3.7 Internationalismen & Falsche Freunde",
          desc: "Viele deutsche Wörter sind dem Französischen sehr ähnlich. Sie geben Anfängern sofort Sicherheit: „Ich verstehe schon viel!“",
          cognates: "das Hotel, die Universität, das Telefon, die Familie, das Restaurant, die Musik, das Museum · Verben auf -ieren: telefonieren, studieren, organisieren, reservieren",
          falseFriendsAlert: "Achtung, falsche Freunde:",
          falseFriends: [
            { word: "das Gymnasium", realMeaning: "Schule (Gymnasium)", falseMeaning: "kein Sportraum / salle de gym" },
            { word: "die Note", realMeaning: "Schulnote (z.B. 1 bis 6)", falseMeaning: "nicht nur Musiknote / remarque" },
            { word: "bekommen", realMeaning: "erhalten / recevoir", falseMeaning: "nicht „devenir“ (das ist werden!)" },
            { word: "der Chef", realMeaning: "Vorgesetzter / patron", falseMeaning: "nicht Koch / cuisinier" }
          ],
          posterTip: "Diese Wörter sammeln wir auf einem eigenen Plakat im Klassenraum."
        },
        {
          subId: "3.8",
          title: "3.8 Wortbildung: Wörter zerlegen",
          desc: "Deutsche Wörter sind oft aus bekannten Teilen gebaut. Wer sie zerlegt, versteht neue Wörter allein.",
          bulletPoints: [
            "Zusammengesetzte Nomen: das Kinderzimmer = Kinder + Zimmer; der Bahnhof = Bahn + Hof. Der Artikel kommt immer vom letzten Wort.",
            "Vorsilben: un- = nicht (unfreundlich, unpünktlich); ver-, be-, ab-, an- mit Beispielen.",
            "Nachsilben: -in (Lehrer → Lehrerin), -ung (wohnen → die Wohnung), -bar (essbar = man kann es essen)."
          ],
          tip: "Tipp: Wörter mit Schere-Geste an der Tafel trennen: Kinder | zimmer."
        },
        {
          subId: "3.9",
          title: "3.9 Bedeutung aus dem Kontext erschließen",
          desc: "Bevor die Lehrkraft erklärt, versuchen die Lernenden selbst, die Bedeutung zu finden. Das ist die wichtigste Strategie für das Leben in Deutschland.",
          steps: [
            "1. Satz oder kurzen Text lesen bzw. hören.",
            "2. Fragen: „Was glauben Sie: Was bedeutet …? Ist es ein Ding, eine Person, eine Aktivität?“",
            "3. Hinweise im Satz suchen: Bilder, bekannte Wörter, Gegenteile, Internationalismen.",
            "4. Vermutung prüfen – erst dann bestätigt oder erklärt die Lehrkraft."
          ],
          globalReadingNote: "Nicht jedes Wort muss genau verstanden werden. Die Lernenden üben, einen Text auch mit unbekannten Wörtern global zu verstehen."
        },
        {
          subId: "3.10",
          title: "3.10 Die verbindliche Reihenfolge im Unterricht",
          desc: "Ein stringenter 6-Schritte-Pfad für jedes neue Vokabular:",
          steps: [
            { n: 1, action: "Zeigen", detail: "Bild, Gegenstand, Geste oder Zeichnung – wenn das Wort konkret ist." },
            { n: 2, action: "Verbinden", detail: "Gegenteil oder Synonym aus dem bekannten Wortschatz." },
            { n: 3, action: "Einbetten", detail: "Zwei bis drei Beispielsätze aus dem Alltag der Lernenden." },
            { n: 4, action: "Prüfen", detail: "Verständnisfrage stellen – nicht „Verstanden?“, sondern „Ist ein Elefant klein?“, „Zeigen Sie mir das Fenster!“" },
            { n: 5, action: "Festigen", detail: "Wort mit Artikel und Farbe (der=blau / das=grün / die=rot) an die Tafel. Lernende schreiben ins Vokabelheft – mit Bild, Gegenteil oder Beispielsatz, nie mit Übersetzung." },
            { n: 6, action: "Notfall", detail: "Erst wenn drei Techniken nicht geholfen haben, ein Wort in der Muttersprache – und dann sofort zurück ins Deutsche." }
          ]
        }
      ]
    }
  },
  {
    id: "ablauf-lektion",
    number: "4",
    badge: "Kapitel 4",
    title: "Ablauf einer Lektion",
    shortTitle: "4. Ablauf einer Lektion",
    icon: "timeline",
    readTime: "6 Min.",
    summary: "Der didaktische Bogen: vom Verstehen über das gelenkte Üben zum freien Sprechen in 6 klaren Phasen.",
    content: {
      intro: "Jede Lektion folgt demselben Weg: vom Verstehen über das gelenkte Üben zum freien Sprechen. Alle Phasen laufen auf Deutsch.",
      phases: [
        {
          number: "1",
          name: "Einstieg und Vorentlastung",
          badge: "Phase 1",
          icon: "play_circle",
          items: [
            "Lernziel der Lektion nennen und an die Tafel schreiben.",
            "Die Fotos der Foto-Hörgeschichte betrachten: „Wer ist das? Wo sind die Personen? Was machen sie?“",
            "Wichtige neue Wörter mit den Techniken aus Kapitel 3 vorentlasten – nur die Wörter, die für das Verstehen nötig sind."
          ]
        },
        {
          number: "2",
          name: "Foto-Hörgeschichte",
          badge: "Phase 2",
          icon: "headphones",
          items: [
            "Erst global hören (Bücher geschlossen oder nur Fotos): „Worum geht es?“",
            "Dann Aufgaben im Buch: Bilder ordnen, richtig/falsch, Fragen beantworten.",
            "Schlüsselsätze nachsprechen und mit verteilten Rollen lesen oder vorspielen."
          ]
        },
        {
          number: "3",
          name: "Lernschritte A bis C: Strukturen entdecken und üben",
          badge: "Phase 3",
          icon: "extension",
          items: [
            "Die neue Struktur aus der Geschichte holen (Beispielsatz an die Tafel).",
            "Regel gemeinsam entdecken (siehe Kapitel 5), Grammatik-Kasten im Buch ansehen.",
            "Gelenkte Übungen im Buch, dann Partnerarbeit mit den Redemitteln.",
            "Abschluss jedes Lernschritts: eine kleine, freie Sprechaufgabe."
          ]
        },
        {
          number: "4",
          name: "Lernschritte D und E: Fertigkeiten trainieren",
          badge: "Phase 4",
          icon: "fitness_center",
          items: [
            "Lese- und Hörtexte mit Aufgabe vor dem Lesen/Hören bearbeiten.",
            "Schreibaufgaben (E-Mail, Notiz, Formular) mit Modelltext.",
            "Rollenspiele in realistischen Situationen (beim Arzt, in der Ausbildung, im Amt)."
          ]
        },
        {
          number: "5",
          name: "Zwischendurch mal … und Wiederholung",
          badge: "Phase 5",
          icon: "sports_esports",
          items: [
            "Lied, Spiel, Projekt oder Film zur Auflockerung.",
            "Wortschatzspiele (Pantomime, Bilder raten, Gegenteil-Ping-Pong)."
          ]
        },
        {
          number: "6",
          name: "Hausaufgabe und Selbstkontrolle",
          badge: "Phase 6",
          icon: "assignment_turned_in",
          items: [
            "Passende Übungen im Arbeitsbuch aufgeben; Lösungen in der nächsten Stunde besprechen.",
            "Lernwortschatz mit Bild, Gegenteil oder Beispielsatz ins Vokabelheft eintragen.",
            "Am Ende der Lektion: Test im Arbeitsbuch und Seite „Grammatik und Kommunikation“ als Zusammenfassung."
          ]
        }
      ],
      speakingTimeRule: {
        title: "Faustregel für die Sprechzeit (Teacher Talking Time)",
        text: "Die Lernenden sprechen mehr als die Lehrkraft! Partner- und Gruppenarbeit gehören verbindlich in jede einzelne Stunde.",
        highlight: "Mindestens 60% Schüler-Sprechzeit · Höchstens 40% Lehrer-Sprechzeit."
      }
    }
  },
  {
    id: "grammatik",
    number: "5",
    badge: "Kapitel 5",
    title: "Grammatik einsprachig vermitteln",
    shortTitle: "5. Grammatik einsprachig",
    icon: "architecture",
    readTime: "8 Min.",
    summary: "Induktives Entdecken, Farbcodierung der Artikel, Satzklammer, und die bewährte 7-Schritte-Strategie.",
    content: {
      philosophy: "Grammatik wird bei uns entdeckt, nicht vorgetragen: erst Beispiele, dann die Regel, dann Übung.",
      inductiveSteps: [
        { step: 1, title: "Beispiele sammeln", desc: "Drei bis vier Sätze aus der Foto-Hörgeschichte an die Tafel schreiben." },
        { step: 2, title: "Markieren", desc: "Die neue Form farbig hervorheben (Verb rot, Endung unterstreichen, Satzklammer mit Bogen)." },
        { step: 3, title: "Entdecken lassen", desc: "Fragen stellen: „Was ist gleich? Was ist anders? Wo steht das Verb?“" },
        { step: 4, title: "Regel formulieren", desc: "Gemeinsam eine kurze Regel in einfachem Deutsch formulieren, mit dem Grammatik-Kasten im Buch vergleichen." },
        { step: 5, title: "Üben", desc: "Von gelenkt (Lücken, Zuordnung) zu frei (Sprechen über sich selbst)." }
      ],
      visualAids: [
        {
          title: "Farben für Artikel",
          desc: "In der gesamten Schule einheitlich geregelt:",
          items: [
            { article: "der", colorName: "Blau", bgClass: "bg-blue-600 text-white", borderClass: "border-blue-600" },
            { article: "das", colorName: "Grün", bgClass: "bg-emerald-600 text-white", borderClass: "border-emerald-600" },
            { article: "die", colorName: "Rot", bgClass: "bg-red-600 text-white", borderClass: "border-red-600" },
            { article: "Plural", colorName: "Gelb", bgClass: "bg-amber-400 text-black", borderClass: "border-amber-400" }
          ]
        },
        {
          title: "Satzklammer",
          desc: "Verbteile in zwei Kästchen, der Rest dazwischen:",
          example: { prefix: "Ich [ rufe ]", middle: "dich morgen", suffix: "[ an ]." }
        },
        {
          title: "Zeitstrahl",
          desc: "Vergangenheit – jetzt – Zukunft für Perfekt, Präteritum und Futur."
        },
        {
          title: "Feste Wandtabellen",
          desc: "Konjugation und Deklination als permanente Referenztabellen an der Wand."
        },
        {
          title: "Körper-Gesten",
          desc: "Daumen nach hinten = Vergangenheit, Hände als Klammer = trennbare Verben."
        }
      ],
      sevenStepsStrategy: {
        title: "Unsere Schritt-für-Schritt-Strategie",
        intro: "Komplexe Strukturen (Nebensätze, Relativsätze, Satzbau) zerlegen wir in feste, nummerierte Schritte. Diese Methode wurde im Live-Sprachzentrum für unsere madagassischen Lernenden entwickelt: Sie gibt Sicherheit, weil man jeden Satz nach demselben Weg bauen und kontrollieren kann.",
        exampleHeader: "Praxisbeispiel: Der Relativsatz",
        sentence1: "Satz 1: Die Köchin arbeitet in Berlin.",
        sentence2: "Satz 2: Sie kocht unglaublich gut.",
        targetSentence: "Die Köchin, die unglaublich gut kocht, arbeitet in Berlin.",
        steps: [
          {
            num: 1,
            title: "Bezugswort finden",
            desc: "Das Wort, das in Satz 1 und Satz 2 vorkommt. In Satz 2 steht es oft als Pronomen (er, sie, es, ihn …) oder mit einem anderen Artikel (eine Köchin → die Köchin):",
            result: "die Köchin (in Satz 2: sie)"
          },
          {
            num: 2,
            title: "Satz 1 bis zum Bezugswort schreiben",
            desc: "Beginnen Sie Satz 1 und stoppen Sie genau nach dem Bezugswort:",
            result: "Die Köchin"
          },
          {
            num: 3,
            title: "Komma setzen",
            desc: "Direkt nach dem Bezugswort ein Komma setzen:",
            result: "Die Köchin,"
          },
          {
            num: 4,
            title: "Bezugswort in Satz 2 grammatisch analysieren",
            desc: "Bestimmen Sie Genus, Numerus und Kasus in Satz 2:",
            result: "Genus: feminin · Numerus: Singular · Kasus: Nominativ (Subjekt in Satz 2)"
          },
          {
            num: 5,
            title: "Passendes Relativpronomen schreiben",
            desc: "Meist die gleiche Form wie der bestimmte Artikel. Gibt es eine Präposition, steht sie davor. Wichtig: Das Relativpronomen ersetzt das Bezugswort aus Satz 2 – das Wort oder Pronomen aus Satz 2 darf NICHT wiederholt werden (nicht: „die sie gut kocht“, nicht: „die die Köchin gut kocht“).",
            result: "die"
          },
          {
            num: 6,
            title: "Relativsatz mit finitem Verb am Ende schreiben",
            desc: "Schreiben Sie Satz 2 als Nebensatz mit konjugiertem Verb ganz am Ende:",
            result: "die unglaublich gut kocht"
          },
          {
            num: 7,
            title: "Komma + Rest von Satz 1 anfügen",
            desc: "Komma schließen (wenn der Relativsatz eingeschoben ist) und den verbleibenden Teil von Satz 1 beenden:",
            result: "Die Köchin, die unglaublich gut kocht, arbeitet in Berlin."
          }
        ],
        pronounRules: "Regeln für Schritt 5: Nominativ und Akkusativ = bestimmter Artikel (der/den, das, die); Dativ = dem, der, dem, Plural denen; mit Präposition steht die Präposition vor dem Relativpronomen (die Freundin, mit der ich ins Kino gehe).",
        practiceNote: "Die Lernenden schreiben die Schritte zuerst mit, dann lösen sie Übungen selbst nach dem Schema – und kontrollieren ihre Sätze damit.",
        technicalTermsNote: "Grammatische Fachbegriffe (Verb, Nomen, Akkusativ …) führen wir auf Deutsch ein, mit Beispiel und Farbe. Sie ersetzen keine Erklärung, sondern geben ihr einen Namen."
      }
    }
  },
  {
    id: "unterrichtssprache",
    number: "6",
    badge: "Kapitel 6",
    title: "Unterrichtssprache: Redemittel für alle",
    shortTitle: "6. Redemittel für alle",
    icon: "forum",
    readTime: "6 Min.",
    summary: "Das Standard-Repertoire für Lehrkräfte und Schüler: Redemittel für Anweisungen, Verständnis, Hilfe und Alltag.",
    content: {
      intro: "Diese Sätze werden in den ersten Stunden A1 eingeführt und hängen als Plakat in jedem Raum. Sie machen Einsprachigkeit ab dem ersten Tag möglich.",
      teacherPhrases: [
        {
          situation: "Arbeitsanweisungen",
          icon: "task",
          phrases: [
            "Öffnen Sie bitte das Buch auf Seite …",
            "Hören Sie.",
            "Lesen Sie.",
            "Schreiben Sie.",
            "Kreuzen Sie an.",
            "Ordnen Sie zu.",
            "Ergänzen Sie."
          ]
        },
        {
          situation: "Sozialformen",
          icon: "diversity_3",
          phrases: [
            "Arbeiten Sie zu zweit.",
            "Bilden Sie Gruppen.",
            "Fragen Sie Ihren Partner / Ihre Partnerin."
          ]
        },
        {
          situation: "Verständnis prüfen",
          icon: "quiz",
          phrases: [
            "Zeigen Sie mir …",
            "Ist das richtig oder falsch?",
            "Wiederholen Sie bitte.",
            "Erklären Sie es mit anderen Worten."
          ]
        },
        {
          situation: "Loben",
          icon: "thumb_up",
          phrases: [
            "Sehr gut!",
            "Genau!",
            "Prima!",
            "Das ist richtig."
          ]
        },
        {
          situation: "Ermutigen",
          icon: "sentiment_satisfied",
          phrases: [
            "Fast!",
            "Noch einmal, bitte.",
            "Versuchen Sie es noch einmal."
          ]
        }
      ],
      studentPhrases: [
        {
          situation: "Nicht verstehen",
          icon: "help_outline",
          phrases: [
            "Das verstehe ich nicht.",
            "Können Sie das bitte wiederholen?",
            "Langsamer, bitte."
          ]
        },
        {
          situation: "Nach Bedeutung fragen",
          icon: "search",
          phrases: [
            "Was bedeutet …?",
            "Was ist das Gegenteil von …?",
            "Können Sie ein Beispiel geben?"
          ]
        },
        {
          situation: "Nach Formen fragen",
          icon: "spellcheck",
          phrases: [
            "Wie schreibt man das?",
            "Wie heißt das auf Deutsch?",
            "Ist das der, das oder die?",
            "Wie ist der Plural?"
          ]
        },
        {
          situation: "Um Hilfe bitten",
          icon: "support_agent",
          phrases: [
            "Können Sie mir helfen?",
            "Ich habe eine Frage.",
            "Ich weiß es nicht."
          ]
        },
        {
          situation: "Organisatorisches",
          icon: "event",
          phrases: [
            "Darf ich auf die Toilette gehen?",
            "Entschuldigung, ich bin zu spät.",
            "Ich war krank."
          ]
        }
      ],
      progressionNote: "Ab A2 erweitern wir die Liste, ab B1 umschreiben die Lernenden selbst: „Ich weiß das Wort nicht. Das ist ein Ding, mit dem man …“"
    }
  },
  {
    id: "fehlerkorrektur",
    number: "7",
    badge: "Kapitel 7",
    title: "Fehlerkorrektur und Feedback",
    shortTitle: "7. Fehlerkorrektur & Feedback",
    icon: "rate_review",
    readTime: "5 Min.",
    summary: "Wertschätzend, gezielt und auf Deutsch: Mündliche Korrekturtechniken und die einheitlichen Korrekturzeichen der Schule.",
    content: {
      philosophy: "Fehler sind ein normaler Teil des Lernens. Wir korrigieren freundlich, gezielt und auf Deutsch.",
      oralCorrection: {
        title: "Mündliche Korrektur",
        points: [
          {
            situation: "Bei Übungen zur Form (Grammatik, Aussprache)",
            method: "Direkt korrigieren, am besten durch Selbstkorrektur anregen – z.B. „Ich habe gestern …?“ oder mit einer vereinbarten Geste.",
            icon: "record_voice_over"
          },
          {
            situation: "Bei freiem Sprechen",
            method: "Nicht unterbrechen! Fehler diskret notieren und am Ende der Phase anonym an der Tafel gemeinsam im Plenum besprechen und verbessern.",
            icon: "campaign"
          },
          {
            situation: "Indirekte Korrektur (Recasting)",
            method: "Den Satz natürlich und korrekt wiederholen: Lerner sagt: „Ich bin gegangen ins Kino.“ → Lehrkraft: „Ah, Sie sind ins Kino gegangen. Schön!“",
            icon: "repeat"
          },
          {
            situation: "Fokus auf das aktuelle Lernziel",
            method: "Nicht jeden einzelnen Fehler korrigieren, sondern gezielt jene Fehler aufgreifen, die zum aktuellen Lernziel der Lektion gehören.",
            icon: "track_changes"
          }
        ]
      },
      writtenCorrection: {
        title: "Schriftliche Korrektur: Unsere einheitlichen Korrekturzeichen",
        subtitle: "Wir verwenden in der ganzen Schule dieselben Korrekturzeichen am Rand:",
        symbols: [
          { symbol: "R", meaning: "Rechtschreibung", example: "Fehler bei Buchstaben, Groß-/Kleinschreibung", badgeClass: "bg-red-500 text-white" },
          { symbol: "Gr", meaning: "Grammatik (Endung, Kasus, Konjugation)", example: "Falsche Verbform, falsche Deklinationsendung", badgeClass: "bg-purple-600 text-white" },
          { symbol: "W", meaning: "Wortwahl / falsches Wort", example: "Unpassendes Vokabular oder falscher Falscher Freund", badgeClass: "bg-amber-500 text-white" },
          { symbol: "St", meaning: "Satzstellung (Wortstellung)", example: "Verb nicht an Position 2 oder nicht am Ende im Nebensatz", badgeClass: "bg-blue-600 text-white" },
          { symbol: "A", meaning: "Artikel", example: "Falscher bestimmter/unbestimmter Artikel (der/das/die)", badgeClass: "bg-teal-600 text-white" },
          { symbol: "✓", meaning: "gut gelungen", example: "Schöne Formulierung, treffender Ausdruck, fehlerfrei", badgeClass: "bg-emerald-600 text-white" }
        ],
        procedure: "Die Lernenden verbessern ihre Fehler selbst und geben den Text noch einmal ab. Rückmeldungen beginnen immer mit dem, was gut gelungen ist, und enden mit ein bis zwei konkreten Tipps für die Weiterentwicklung. Korrekturen werden unterschrieben mit „Ihre Lehrerin / Ihr Lehrer – Frau/Herr …“."
      }
    }
  },
  {
    id: "schulalltag",
    number: "8",
    badge: "Kapitel 8",
    title: "Praktisches im Schulalltag",
    shortTitle: "8. Praxis & Plan B",
    icon: "storefront",
    readTime: "5 Min.",
    summary: "Plan B bei Stromausfall in Madagaskar, digitale Medien & Plattformen und strikte Einhaltung des Urheberrechts.",
    content: {
      powerOutage: {
        title: "Stromausfall und kein Beamer: Plan B",
        lead: "Jede Stunde muss auch ohne Strom funktionieren. In Madagaskar ist dies elementar:",
        rules: [
          {
            title: "Audiodateien offline bereithalten",
            desc: "Hörtexte vorher auf das Handy herunterladen und einen aufgeladenen Bluetooth-Lautsprecher stets griffbereit halten.",
            icon: "speaker"
          },
          {
            title: "Plan B ohne Technik vorbereiten",
            desc: "Für jede Lektion einen Plan B ohne Beamer/Laptop parat haben: Tafelanschrieb, Bildkarten, Rollenspiel, Pantomime.",
            icon: "draw"
          },
          {
            title: "Physische Bildkartei nutzen",
            desc: "Bilder nicht nur digital zeigen – die physische Bildkartei der Schule nutzen oder Bildmaterial vorab groß ausdrucken.",
            icon: "perm_media"
          },
          {
            title: "Live-Vorlesen bei Tonausfall",
            desc: "Fällt der Strom während eines Hörtextes aus: Die Lehrkraft liest den Text mit verteilten, lebendigen Stimmen vor.",
            icon: "record_voice_over"
          }
        ]
      },
      mediaPlatforms: {
        title: "Medien und Plattformen",
        platforms: [
          {
            name: "Hueber Media (media.hueber.de)",
            purpose: "Offizielle Hörtexte und Filme zu Schritte plus Neu und Sicher!",
            icon: "language"
          },
          {
            name: "Lernplattform Live-Sprachzentrum",
            purpose: "Digitale Bibliothek der Lehrwerke für alle Lernenden und Dozenten.",
            icon: "computer"
          },
          {
            name: "Deutschfuchs",
            purpose: "Zusätzliche interaktive Übungen und digitale Aufgaben für Kursteilnehmende.",
            icon: "pets"
          },
          {
            name: "WhatsApp-Gruppe pro Kurs",
            purpose: "Hausaufgaben, Termine und Infos – kurz, auf Deutsch, und bei wichtigen Organisationsfragen zusätzlich einfach erklärt.",
            icon: "chat"
          }
        ]
      },
      copyright: {
        title: "Urheberrecht & Lehrwerkschutz",
        text: "Wir kopieren keine Seiten aus dem Lehrwerk. Jede teilnehmende Person arbeitet mit dem Original-Buch. Eigene Arbeitsblätter, Bildkarten und didaktische Spiele sind herzlich willkommen und können gerne mit den Kolleginnen und Kollegen geteilt werden.",
        icon: "copyright"
      }
    }
  },
  {
    id: "checkliste-musterstunde",
    number: "9",
    badge: "Kapitel 9",
    title: "Checkliste und Musterstunde",
    shortTitle: "9. Checkliste & Musterstunde",
    icon: "checklist",
    readTime: "7 Min.",
    summary: "Vorbereitungs-Checkliste vor jedem Kurs und eine vollständige 90-Minuten-Musterstunde (A1: Lebensmittel einkaufen).",
    content: {
      checklistIntro: "Checkliste für jede Unterrichtsvorbereitung:",
      checklistItems: [
        { id: "chk_1", text: "Lernziel der Stunde aus der Kopfzeile von Schritte plus Neu notiert" },
        { id: "chk_2", text: "Neue Wörter herausgesucht und für jedes Wort eine Erklärungstechnik gewählt (Bild, Zeichnung, Geste, Gegenteil, Synonym, Beispiel)" },
        { id: "chk_3", text: "Bilder, Bildkarten oder echte Gegenstände (Realia) bereitgelegt" },
        { id: "chk_4", text: "Hörtexte auf dem Smartphone offline verfügbar, Bluetooth-Lautsprecher geladen" },
        { id: "chk_5", text: "Plan B ohne Strom vorbereitet (Tafelbild, Spiel, Pantomime)" },
        { id: "chk_6", text: "Tafelbild mit verbindlichen Farben für Artikel und Grammatik vorgeplant" },
        { id: "chk_7", text: "Mindestens eine Partner- oder Gruppenarbeit fest eingeplant" },
        { id: "chk_8", text: "Gezielte Verständnisfragen vorbereitet (keine bloßen „Verstanden?“-Fragen)" },
        { id: "chk_9", text: "Hausaufgabe im Arbeitsbuch festgelegt und für die WhatsApp-Gruppe vorbereitet" }
      ],
      sampleLesson: {
        title: "Musterstunde (A1, 90 Minuten): Lebensmittel einkaufen",
        subtitle: "Didaktischer Ablaufplan nach der Live-Sprachzentrum Methodik",
        phases: [
          {
            time: "10 Min.",
            phase: "Einstieg",
            activity: "Korb mit echtem Obst und Gemüse vom Markt: „Was ist das?“",
            technique: "Realia, Bilder",
            icon: "shopping_basket"
          },
          {
            time: "15 Min.",
            phase: "Foto-Hörgeschichte",
            activity: "Fotos im Kursbuch beschreiben, global hören, Bilder ordnen",
            technique: "Bilder, Mimik",
            icon: "image"
          },
          {
            time: "15 Min.",
            phase: "Wortschatz",
            activity: "teuer/billig, viel/wenig, das Kilo, das Stück einführen",
            technique: "Gegenteile, Zeichnung (Waage an Tafel), Gesten",
            icon: "scale"
          },
          {
            time: "20 Min.",
            phase: "Lernschritt A",
            activity: "„Ich möchte …“ / „Wie viel kostet …?“ entdecken und gelenkt üben",
            technique: "Tafelbild mit Farben (der/das/die), Beispiele",
            icon: "record_voice_over"
          },
          {
            time: "20 Min.",
            phase: "Rollenspiel",
            activity: "Marktstand im Klassenzimmer simulieren: einkaufen, wiegen, zahlen",
            technique: "Redemittel-Plakat, Partnerarbeit",
            icon: "store"
          },
          {
            time: "10 Min.",
            phase: "Abschluss",
            activity: "Fehlersätze von der Tafel gemeinsam anonym verbessern, Hausaufgabe bekanntgeben",
            technique: "Selbstkorrektur im Plenum",
            icon: "task_alt"
          }
        ],
        goldenRule: "Während der gesamten 90 Minuten wird kein einziges Wort übersetzt. Wenn ein Wort unklar bleibt, hilft zuerst ein anderer Lernender auf Deutsch – erst danach greift im äußersten Fall die Notfallregel aus Kapitel 1."
      }
    }
  },
  {
    id: "uebliche-ausdruecke",
    number: "10",
    badge: "Anhang",
    title: "Anhang: Arbeitsblatt „Übliche Ausdrücke“",
    shortTitle: "Anhang: Übliche Ausdrücke",
    icon: "description",
    readTime: "6 Min.",
    summary: "Das komplette Arbeitsblatt für die erste A1-Stunde mit Intonationspfeilen (↗/↘), Synonymen, Gegenteilen und Antworten.",
    content: {
      header: "Deutsch A1 – erste Stunde · Referenz-Plakat",
      intonationSummary: [
        {
          arrow: "↗",
          direction: "Die Stimme steigt",
          explanation: "Ja/Nein-Frage: Die Lehrkraft fragt und wartet auf ein klares Ja oder Nein.",
          badgeClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
        },
        {
          arrow: "↘",
          direction: "Die Stimme fällt",
          explanation: "Aussage, Bitte oder W-Frage (was, wie, wer …).",
          badgeClass: "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300"
        }
      ],
      categories: [
        {
          category: "BITTEN",
          icon: "front_hand",
          items: [
            { expression: "Wiederholen Sie bitte!", arrow: "↘", relationType: "synonym", relation: "= Noch einmal, bitte!" },
            { expression: "Lauter, bitte!", arrow: "↘", relationType: "antonym", relation: "≠ Leiser, bitte!" },
            { expression: "Langsamer, bitte!", arrow: "↘", relationType: "antonym", relation: "≠ Schneller, bitte!" }
          ]
        },
        {
          category: "HÖFLICH SEIN",
          icon: "favorite",
          items: [
            { expression: "Entschuldigung!", arrow: "↘", relationType: "synonym", relation: "= Verzeihung!" },
            { expression: "Tut mir leid!", arrow: "↘", relationType: "standalone", relation: "" },
            { expression: "Danke (schön)!", arrow: "↘", relationType: "reply", relation: "→ Bitte (schön)!" }
          ]
        },
        {
          category: "FRAGEN DER LEHRKRAFT",
          icon: "school",
          items: [
            { expression: "Haben Sie Fragen?", arrow: "↗", relationType: "reply", relation: "→ Ja, ich habe eine Frage. / Nein, (ich habe) keine Fragen." },
            { expression: "(Sind Sie) fertig?", arrow: "↗", relationType: "reply", relation: "→ Ja. / Noch nicht." },
            { expression: "Ist alles klar?", arrow: "↗", relationType: "reply", relation: "→ Ja. / Nein." }
          ]
        },
        {
          category: "SAGEN, WAS LOS IST",
          icon: "chat_bubble",
          items: [
            { expression: "Ich habe eine Frage.", arrow: "↘", relationType: "standalone", relation: "" },
            { expression: "Ich verstehe das nicht.", arrow: "↘", relationType: "standalone", relation: "" },
            { expression: "Ich weiß es nicht.", arrow: "↘", relationType: "synonym", relation: "= Keine Ahnung!" },
            { expression: "Ich habe es vergessen.", arrow: "↘", relationType: "standalone", relation: "" },
            { expression: "Ich bin dran!", arrow: "↘", relationType: "standalone", relation: "" },
            { expression: "Das ist alles!", arrow: "↘", relationType: "standalone", relation: "" }
          ]
        },
        {
          category: "NACH WÖRTERN FRAGEN",
          icon: "quiz",
          items: [
            { expression: "Was bedeutet das? / Was bedeutet …?", arrow: "↘", relationType: "standalone", relation: "" },
            { expression: "Wie heißt das auf Deutsch?", arrow: "↘", relationType: "standalone", relation: "" }
          ]
        }
      ],
      intonationProTip: "Tipp: Derselbe Satz, andere Melodie! „Sie sind fertig. ↘“ (Aussage) · „Sie sind fertig? ↗“ (Frage)."
    }
  }
];

