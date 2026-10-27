// Cornelsen Deutsch als Fremdsprache - Niveau B1 Einstufungstest Data
const TEST_DATA = {
  "title": "Deutsch als Fremdsprache – Niveau B1",
  "subtitle": "Cornelsen Einstufungstest (B1/B2)",
  "badge": "DaF B1",
  "totalQuestions": 30,
  "quellen": "B1-Test Quellenverzeichnis:\nS. 1: Cornelsen/ Karin Wagenblatt\nS. 2: Cornelsen/ Roland Beier\nS. 3: Cornelsen/ Roland Beier\nS. 4: Shutterstock.com/ hbpictures\nS. 5: Cornelsen/ Roland Beier\nS. 6: Cornelsen/ Karin Wagenblatt\nS. 7: Cornelsen/ Shutterstock.com/ (Hintergrund) nanano/ (Auto) Siberica\nS. 8: Cornelsen/ Shutterstock.com/ Feng Yu\nS. 9: Cornelsen/ Shutterstock.com/ Roman Samokhin\nS. 10: Shutterstock.com/ Kolbakova Olga\nS. 11: Cornelsen/ Karin Wagenblatt\nS. 12: Cornelsen/ Karin Wagenblatt\nS. 13: Shutterstock.com/ Kolbakova Olga\nS. 14: Cornelsen/ Karin Wagenblatt\nS. 15: Cornelsen/ Shutterstock.com/ Henrik Winther Andersen\nS. 16: Cornelsen/ Shutterstock.com/ (Kolibri) Aniko Gerendi Enderle/ (Lightbox) Enmaler\nS. 17: Shutterstock.com/ Prostock-studio\nS. 18: Cornelsen/ Roland Beier\nS. 19: Cornelsen/ Roland Beier\nS. 20: Cornelsen/ Shutterstock.com/ NatalieBakunina\nS. 21: Cornelsen/ Karin Wagenblatt\nS. 22: Cornelsen/ Roland Beier\nS. 23: Cornelsen/ Roland Beier\nS. 24: Cornelsen/ Roland Beier\nS. 25: Shutterstock.com/ Olena Hromova\nS. 26: Shutterstock.com/ Kolbakova Olga\nS. 27: Cornelsen/ Karin Wagenblatt\nS. 28: Cornelsen/ Karin Wagenblatt\nS. 29: Cornelsen/ Karin Wagenblatt\nS. 30: Cornelsen/ Karin Wagenblatt",
  "evaluationScale": [
    {
      "min": 90,
      "max": 100,
      "level": "B2 (oder höher)",
      "badge": "Ausgezeichnet",
      "description": "Ausgezeichnet! Sie haben hervorragende Kenntnisse im Bereich B1 und darüber hinausgehend. Machen Sie auf keinen Fall einen Kurs unterhalb B2."
    },
    {
      "min": 70,
      "max": 89,
      "level": "Brückenkurs B1 / B2",
      "badge": "Sehr gut / Gut",
      "description": "Sie haben gute bis sehr gute Kenntnisse im Bereich B1 und können einen Kurs besuchen, der vom Lernniveau B1 zum Lernniveau B2 hinführt."
    },
    {
      "min": 60,
      "max": 69,
      "level": "B1.2 (Zweite Hälfte)",
      "badge": "Befriedigend",
      "description": "Ihre Kenntnisse im Bereich B1 weisen ein paar Lücken auf. Wir empfehlen Ihnen den Besuch eines Kurses, der mit der zweiten Hälfte B1 beginnt."
    },
    {
      "min": 30,
      "max": 59,
      "level": "B1.1 (Erste Hälfte)",
      "badge": "Grundlagen B1",
      "description": "Ihre Kenntnisse liegen unterhalb des Lernniveaus B1. Wir empfehlen Ihnen einen Kurs, der mit der 1. Hälfte B1 beginnt."
    },
    {
      "min": 0,
      "max": 29,
      "level": "A2 empfohlen",
      "badge": "Unterhalb B1",
      "description": "Ihre Kenntnisse liegen unterhalb des Lernniveaus B1. Bitte machen Sie zusätzlich den A2-Test, um in den passenden Kurs eingestuft werden zu können."
    }
  ],
  "questions": [
    {
      "id": 1,
      "category": "Leseverstehen • E-Mail aus dem Krankenhaus",
      "rubricHtml": "<p><strong>Sie haben eine E-Mail von Ihrem Freund Peter bekommen.<strong><p>\n\n<p><em>Lesen Sie und wählen Sie aus.<em><p>\n<div>",
      "images": [
        "media/S3_61512_GER-Test_B1_E-Mail.JPG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "grouped-choice",
      "groups": [
        {
          "responseId": "RESPONSE0",
          "title": "Was ist Barbara letzte Woche passiert?",
          "options": [
            {
              "id": "C0_0",
              "text": "Sie konnte keine Mails schreiben."
            },
            {
              "id": "C0_1",
              "text": "Sie ist auf einer vereisten Straße hingefallen."
            },
            {
              "id": "C0_2",
              "text": "Sie ist auf dem Weg zur Arbeit ausgerutscht."
            },
            {
              "id": "C0_3",
              "text": "Sie ist beim Sport gestürzt."
            }
          ],
          "correctAnswer": "C0_3",
          "correctAnswerText": "Sie ist beim Sport gestürzt."
        },
        {
          "responseId": "RESPONSE1",
          "title": "Wie lange ist Barbara noch im Krankenhaus?",
          "options": [
            {
              "id": "C1_0",
              "text": "1 Woche"
            },
            {
              "id": "C1_1",
              "text": "etwa 10 Tage"
            },
            {
              "id": "C1_2",
              "text": "14 Tage"
            },
            {
              "id": "C1_3",
              "text": "ca. 21 Tage"
            }
          ],
          "correctAnswer": "C1_1",
          "correctAnswerText": "etwa 10 Tage"
        }
      ]
    },
    {
      "id": 2,
      "category": "Dialogverständnis • Im Krankenhaus",
      "rubricHtml": "<p><strong>Sie gehen Barbara im Krankenhaus besuchen. Sie sprechen erst mit einer Krankenschwester.​<strong><strong> <strong><p>\n\n<p><em>Ordnen Sie den Dialog.&nbsp;<em><p>\n<div>",
      "images": [
        "media/S3_16199_683_img.jpg"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Zur Bearbeitung der Aufgabe ziehen Sie den Dialogteil an die richtige Stelle. Sie k&#246;nnen Ihre Wahl auch noch &#228;ndern, bevor Sie auf OK klicken. Ziehen Sie einfach den Dialogteil an eine andere Stelle.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "dialogue-order",
      "dialogueItems": [
        {
          "id": "SC0",
          "fixed": true,
          "text": "Sie:"
        },
        {
          "id": "SC1",
          "fixed": false,
          "text": "Guten Tag. Ich möchte zu Barbara Lange, aber ich weiß nicht wo sie liegt."
        },
        {
          "id": "SC2",
          "fixed": true,
          "text": "Krankenschwester:"
        },
        {
          "id": "SC3",
          "fixed": false,
          "text": "Im Zimmer 11.05. Sie ist gestern umgezogen."
        },
        {
          "id": "SC4",
          "fixed": true,
          "text": "Sie:"
        },
        {
          "id": "SC5",
          "fixed": false,
          "text": "Alles klar, 11.05. Und wie komme ich da hin?"
        },
        {
          "id": "SC6",
          "fixed": true,
          "text": "Krankenschwester:"
        },
        {
          "id": "SC7",
          "fixed": false,
          "text": "Sie müssen den Gang bis ganz nach hinten gehen. Dann gehen Sie durch die Glastür und die zweite Tür auf der linken Seite ist das Zimmer 11.05. Brauchen Sie eine Vase für die Blumen?"
        },
        {
          "id": "SC8",
          "fixed": true,
          "text": "Sie:"
        },
        {
          "id": "SC9",
          "fixed": false,
          "text": "Ja, das wäre sehr nett. Aber nur eine kleine. Danke."
        }
      ],
      "correctOrder": [
        "SC1",
        "SC3",
        "SC5",
        "SC7",
        "SC9"
      ],
      "correctOrderTexts": [
        "1. Guten Tag. Ich möchte zu Barbara Lange, aber ich weiß nicht wo sie liegt.",
        "2. Im Zimmer 11.05. Sie ist gestern umgezogen.",
        "3. Alles klar, 11.05. Und wie komme ich da hin?",
        "4. Sie müssen den Gang bis ganz nach hinten gehen. Dann gehen Sie durch die Glastür und die zweite Tür auf der linken Seite ist das Zimmer 11.05. Brauchen Sie eine Vase für die Blumen?",
        "5. Ja, das wäre sehr nett. Aber nur eine kleine. Danke."
      ]
    },
    {
      "id": 3,
      "category": "Hörverstehen • Barbaras Genesung",
      "rubricHtml": "<table><tbody><tr><td>\n\t\t\t<p><img src=\"S3_16205_696_img.jpg?filename=696_img.jpg\" alt=\"\" id=\"16205\" class=\"\" style=\"background-color: transparent; color: rgb(0, 0, 0); cursor: default; font-family: Times New Roman; font-size: 16px; font-style: normal; font-variant: normal; font-weight: 700; height: 270px; letter-spacing: normal; orphans: 2; text-align: left; text-decoration: none; text-indent: 0px; text-transform: none; -webkit-text-stroke-width: 0px; white-space: normal; width: 356px; word-spacing: 0px;\" data-author=\"{}\"><img><p>\n\t\t\t<td><td style=\"vertical-align: top;\">\n\t\t\t<p><strong>Barbara erzählt über ihre Verletzung.<strong><p>\n\n\t\t\t<p><em>Hören Sie und ordnen Sie die Hörtexte den Ratschlägen zu.&nbsp;<em><p>\n\t\t\t<td><tr><tbody><table>\n\n<p style=\"background-color: transparent; border-bottom-color: rgb(0, 0, 0); border-bottom-style: none; border-bottom-width: 0px; border-image-outset: 0; border-image-repeat: stretch; border-image-slice: 100%; border-image-source: none; border-image-width: 1; border-left-color: rgb(0, 0, 0); border-left-style: none; border-left-width: 0px; border-right-color: rgb(0, 0, 0); border-right-style: none; border-right-width: 0px; border-top-color: rgb(0, 0, 0); border-top-style: none; border-top-width: 0px; color: rgb(0, 0, 0); font-family: Times New Roman; font-size: 16px; font-style: normal; font-variant: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-decoration: none; text-indent: 0px; text-transform: none; -webkit-text-stroke-width: 0px; white-space: normal; word-spacing: 0px;\">&nbsp;<p>\n<div>",
      "images": [
        "media/S3_16205_696_img.jpg"
      ],
      "audio": null,
      "audios": [
        "media/S3_63589_GER-Test_B1_2.3.mp3",
        "media/S3_63601_GER-Test_B1_2.1.mp3",
        "media/S3_63603_GER-Test_B1_2.2.mp3"
      ],
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Klicken Sie bei A, B beziehungsweise C auf das Feld &#34;Play&#34;. H&#246;ren Sie, was Barbara sagt und bearbeiten Sie die Aufgabe, indem Sie in das vorgesehene Schreibfeld die Nummer des passenden Ratschlags eintragen.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "audio-gap-match",
      "audioCards": [
        {
          "id": "A1",
          "audio": "media/S3_63601_GER-Test_B1_2.1.mp3",
          "label": "Hörtext A"
        },
        {
          "id": "A2",
          "audio": "media/S3_63603_GER-Test_B1_2.2.mp3",
          "label": "Hörtext B"
        },
        {
          "id": "A3",
          "audio": "media/S3_63589_GER-Test_B1_2.3.mp3",
          "label": "Hörtext C"
        }
      ],
      "slots": [
        {
          "slotId": "slot_0",
          "text": "Bis dahin geht es dir bestimmt schon recht gut. Du kannst den Arzt ja vielleicht fragen, ob Du schon einen Tag früher nach Hause kannst.",
          "correctAudioId": "A3",
          "correctAudioLabel": "Hörtext C"
        },
        {
          "slotId": "slot_1",
          "text": "Frag doch, ob Du ein anderes Zimmer haben kannst. Oder vielleicht kann sie Einzelzimmer wechseln?",
          "correctAudioId": "A1",
          "correctAudioLabel": "Hörtext A"
        },
        {
          "slotId": "slot_2",
          "text": "Nimmst Du keine Schmerztabletten? Frag doch den Arzt noch mal, oder Schwester.",
          "correctAudioId": "A2",
          "correctAudioLabel": "Hörtext B"
        }
      ]
    },
    {
      "id": 4,
      "category": "Wortschatz & Leseverstehen • Kurklinik Bad Lausick",
      "rubricHtml": "<p><strong>Ihre Freundin soll nach dem Krankenhausaufenthalt eine Kur (=eine Behandlung zur Erholung nach einer schweren Krankheit oder Verletzung) machen. Auf ihrem Nachttisch liegt eine Broschüre. Sie möchten den Text lesen, aber einige Teile fehlen.<strong><p>\n\n<p><em>Ergänzen Sie. Zwei Wörter bleiben übrig, jedes Wort wird nur ein Mal verwendet.<em><p>\n<div>",
      "images": [
        "media/S3_61819_11.462074038-H.jpg"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Zur Bearbeitung der Aufgabe geben Sie in die Schreibfelder&#160;das passende Wort&#160;ein. Verwenden Sie bitte keine zus&#228;tzlichen Leerzeichen.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "text-gap",
      "gaps": {
        "RESPONSE0": {
          "expected": "modern",
          "validAnswers": [
            "modern"
          ]
        },
        "RESPONSE1": {
          "expected": "sportlich",
          "validAnswers": [
            "sportlich"
          ]
        },
        "RESPONSE2": {
          "expected": "schön",
          "validAnswers": [
            "schön"
          ]
        },
        "RESPONSE3": {
          "expected": "kulturell",
          "validAnswers": [
            "kulturell"
          ]
        },
        "RESPONSE4": {
          "expected": "angenehm",
          "validAnswers": [
            "angenehm"
          ]
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p><strong>angenehm - freundlich - praktisch - sportlich - modern - schön - kulturell<strong><p>\n\n<p>Rehabilitationszentrum Bad Lausick<p>\n\n<p>Unsere Klinik ist top<textEntryInteraction responseIdentifier=\"RESPONSE0\"><textEntryInteraction> und bietet eine freundliche Atmosphäre. Unsere Fachgebiete sind Erkrankungen des Bewegungsapparates (Orthopädie) und Herz- und Kreislauferkrankungen.<p>\n\n<p>Wir bieten verschiedene Therapien an: Bewegungstherapien, Wärmetherapien, Massagen und elektromagnetische Behandlungen.&nbsp;Die Klinik verfügt über 230 Einzel- und Zweitbettzimmer sowie eine Cafeteria, eine Bibliothek und Leseräume.<br><br>\nIm Schwimmbad (mit Sauna), Gymnastikraum und Fitness-Center können Sie sich <textEntryInteraction responseIdentifier=\"RESPONSE1\"><textEntryInteraction> betätigen.<p>\n\n<p>Unser freundliches Personal und die wunder<textEntryInteraction responseIdentifier=\"RESPONSE2\"><textEntryInteraction>e Landschaft ebenso wie Wochenendausflüge und <textEntryInteraction responseIdentifier=\"RESPONSE3\"><textEntryInteraction>e Angebote garantieren einen <textEntryInteraction responseIdentifier=\"RESPONSE4\"><textEntryInteraction>en Aufenthalt.<p>\n\n<p>Wir freuen uns auf Ihren Besuch!<p>\n<div><div>"
    },
    {
      "id": 5,
      "category": "Hörverstehen • Medikamenteneinnahme",
      "rubricHtml": "<p><strong>Eine Krankenschwester kommt ins Zimmer. Sie gibt Barbara die Medikamente und erklärt dazu etwas.<strong><p>\n\n<p><em>Hören Sie und wählen Sie aus.<em><p>\n<div>",
      "images": [
        "media/S3_16206_697_img.jpg"
      ],
      "audio": "media/S3_63591_GER-Test_B1_3.mp3",
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie sich den Text an und beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "grouped-choice",
      "groups": [
        {
          "responseId": "RESPONSE0",
          "title": "Wie viele Schmerztabletten bekommt Barbara?",
          "options": [
            {
              "id": "C0_0",
              "text": "eine pro Tag"
            },
            {
              "id": "C0_1",
              "text": "gar keine mehr"
            },
            {
              "id": "C0_2",
              "text": "zweimal täglich eine"
            }
          ],
          "correctAnswer": "C0_2",
          "correctAnswerText": "zweimal täglich eine"
        },
        {
          "responseId": "RESPONSE1",
          "title": "Wie soll Barbara die Blut verdünnenden Mittel einnehmen?​",
          "options": [
            {
              "id": "C1_0",
              "text": "Sie bekommt eine Spritze von der Schwester."
            },
            {
              "id": "C1_1",
              "text": "Sie soll die Tabletten im Tee aufgelöst einnehmen."
            },
            {
              "id": "C1_2",
              "text": "Sie soll die Tabletten mit Tee unzerkaut schlucken."
            }
          ],
          "correctAnswer": "C1_2",
          "correctAnswerText": "Sie soll die Tabletten mit Tee unzerkaut schlucken."
        }
      ]
    },
    {
      "id": 6,
      "category": "Leseverstehen • Streik im Krankenhaus",
      "rubricHtml": "<p><strong>Im Flur des Krankenhauses sehen Sie ein Plakat.​<strong><strong> <strong><p>\n\n<p><em>Lesen Sie und wählen Sie aus.<em><p>\n\n<p>&nbsp;<p>\n<div>",
      "images": [
        "media/S3_61517_GER-Test_B1_Streik.JPG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> <p>&#160;</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "single-choice",
      "options": [
        {
          "id": "C0_0",
          "text": "Alle Patienten werden in der Notaufnahme behandelt."
        },
        {
          "id": "C0_1",
          "text": "Die Patienten werden in anderen Krankenhäusern in Berlin und Brandenburg behandelt."
        },
        {
          "id": "C0_2",
          "text": "Es werden keine Patienten behandelt und keine neuen Patienten mehr aufgenommen."
        },
        {
          "id": "C0_3",
          "text": "Nur die wichtigsten Behandlungen werden vorgenommen."
        }
      ],
      "correctAnswer": "C0_3",
      "correctAnswerText": "Nur die wichtigsten Behandlungen werden vorgenommen."
    },
    {
      "id": 7,
      "category": "Leseverstehen • Fahrschulausbildung",
      "rubricHtml": "<p><strong>Sie informieren sich im Internet über die Preise für die Fahrschulausbildung.​<strong><strong> <strong><p>\n\n<p><em>Lesen Sie und wählen Sie aus.<em><p>\n<div>",
      "images": [
        "media/S3_62811_Fahrschule.PNG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> <p>&#160;</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "single-choice",
      "options": [
        {
          "id": "C0_0",
          "text": "Der Fahrschüler sollte den Preis vorher genau von der Fahrschule berechnen lassen."
        },
        {
          "id": "C0_1",
          "text": "Der Preis für die Ausbildung ist regional unterschiedlich."
        },
        {
          "id": "C0_2",
          "text": "Qualität muss nicht teuer sein."
        },
        {
          "id": "C0_3",
          "text": "Vor allem die Qualität der Fahrschulausbildung ist wichtig."
        }
      ],
      "correctAnswer": "C0_3",
      "correctAnswerText": "Vor allem die Qualität der Fahrschulausbildung ist wichtig."
    },
    {
      "id": 8,
      "category": "Leseverstehen & Zuordnung • Weiterbildungsangebote",
      "rubricHtml": "<p><strong>Freunde von Ihnen möchten eine Weiterbildung machen und suchen ein passendes Angebot in der Zeitung. Sie helfen Ihnen. Welche Anzeige passt zu welcher Person?<strong><p>\n\n<p><em>Lesen Sie und ergänzen Sie die Anzeigennummer. Eine Anzeige bleibt übrig.<em><p>\n<div>",
      "images": [
        "media/S3_62813_Kleinanzeigen.PNG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Zur Bearbeitung der Aufgabe geben Sie in das vorgesehene Schreibfeld die Nummer der&#160;passenden Anzeige&#160;ein. Verwenden Sie bitte keine zus&#228;tzlichen Leerzeichen.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "text-gap",
      "gaps": {
        "RESPONSE0": {
          "expected": "4",
          "validAnswers": [
            "4"
          ]
        },
        "RESPONSE1": {
          "expected": "5",
          "validAnswers": [
            "5"
          ]
        },
        "RESPONSE2": {
          "expected": "1",
          "validAnswers": [
            "1"
          ]
        },
        "RESPONSE3": {
          "expected": "3",
          "validAnswers": [
            "3"
          ]
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p><strong>Walter<strong><br><br>\n… ist pensioniert und möchte seinen Roman, den er schon vor 5 Jahren angefangen hat, fertig schreiben.&nbsp;Er wünscht sich einen Experten an seiner Seite und möchte andere Schreibende kennen lernen.<p>\n\n<p>Anzeige&nbsp;<textEntryInteraction responseIdentifier=\"RESPONSE0\"><textEntryInteraction><p>\n\n<p><strong>Daniel<strong><br><br>\n… spielt seit seiner Schulzeit in verschiedenen Theatergruppen und möchte das Hobby zu seinem Beruf machen.<p>\n\n<p>Anzeige <textEntryInteraction responseIdentifier=\"RESPONSE1\"><textEntryInteraction><p>\n\n<p><strong>Julia<strong><br><br>\n… hat Energie- und Umwelttechnik studiert und arbeitet seit 2 Jahren in einer Firma, die sich mit der Vermarktung von regenerativen Energien beschäftigt. Sie möchte mehr im Bereich Management lernen.<p>\n\n<p>Anzeige <textEntryInteraction responseIdentifier=\"RESPONSE2\"><textEntryInteraction><p>\n\n<p><strong>Elena<strong><br><br>\n… arbeitet in einem Kinderheim. Davor hat sie eine Ausbildung zur Kindergärtnerin gemacht,&nbsp;weil sie gern mit Kindern zusammen arbeitet. Sie ist sehr kreativ und möchte sich nun in diesem Bereich weiterbilden.<p>\n\n<p>Anzeige&nbsp;<textEntryInteraction responseIdentifier=\"RESPONSE3\"><textEntryInteraction><p>\n<div><div>"
    },
    {
      "id": 9,
      "category": "Leseverstehen • Tag der offenen Tür an der VHS",
      "rubricHtml": "<p><strong>Sie bekommen einen Brief von der Volkshochschule.<strong><p>\n\n<p><em>Lesen Sie und wählen Sie aus.<em><p>\n<div>",
      "images": [
        "media/S3_62818_Volkshochschule.PNG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "grouped-choice",
      "groups": [
        {
          "responseId": "RESPONSE0",
          "title": "Warum bekommen Sie einen Brief von der Volkshochschule?​",
          "options": [
            {
              "id": "C0_0",
              "text": "Weil die Volkshochschule umgebaut wurde."
            },
            {
              "id": "C0_1",
              "text": "Weil die Volkshochschule einen Tag der offenen Tür veranstaltet."
            },
            {
              "id": "C0_2",
              "text": "Weil die Volkshochschule zu einem Semesterabschlussfest einlädt."
            },
            {
              "id": "C0_3",
              "text": "Weil in der Volkshochschule ein Sprachentag stattfindet."
            }
          ],
          "correctAnswer": "C0_1",
          "correctAnswerText": "Weil die Volkshochschule einen Tag der offenen Tür veranstaltet."
        },
        {
          "responseId": "RESPONSE1",
          "title": "Welche Hilfestellung leisten die Kursleiter und Kursleiterinnen?",
          "options": [
            {
              "id": "C1_0",
              "text": "Sie informieren über die Inhalte der Kurse."
            },
            {
              "id": "C1_1",
              "text": "Sie koordinieren die kulturellen Beiträge der Kursteilnehmer."
            },
            {
              "id": "C1_2",
              "text": "Sie nehmen die Anmeldung für ihre Kurse persönlich entgegen."
            },
            {
              "id": "C1_3",
              "text": "Sie stellen Lehr- und Lernmaterialien zur Verfügung."
            }
          ],
          "correctAnswer": "C1_0",
          "correctAnswerText": "Sie informieren über die Inhalte der Kurse."
        }
      ]
    },
    {
      "id": 10,
      "category": "Hörverstehen • Telekolleg & Bildungsfernsehen",
      "rubricHtml": "<p><strong>Im Radio: <strong><strong>Der Moderator kündigt einen Beitrag an.​<strong><strong> <strong><p>\n\n<p><em>Hören Sie und wählen Sie aus.<em><p>\n<div>",
      "images": [
        "media/S3_61818_11.699018271-H.jpg"
      ],
      "audio": "media/S3_63593_GER-Test_B1_4.mp3",
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie sich den Text an und bearbeiten Sie die Aufgabe, indem Sie mit der Maus auf den Pfeil neben dem Feld &#34;Bitte w&#228;hlen&#34; klicken. Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. F&#252;hren Sie diesen Vorgang bei jedem Feld durch. Sie k&#246;nnen sich den Text zwei Mal anh&#246;ren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "inline-dropdown",
      "dropdowns": {
        "RESPONSE0": {
          "options": [
            {
              "id": "0",
              "text": "1967"
            },
            {
              "id": "1",
              "text": "14 Jahren"
            },
            {
              "id": "2",
              "text": "1940"
            }
          ],
          "correct": "0",
          "correctText": "1967"
        },
        "RESPONSE1": {
          "options": [
            {
              "id": "0",
              "text": "eine Fernsehsendung"
            },
            {
              "id": "1",
              "text": "eine Videoreihe"
            },
            {
              "id": "2",
              "text": "eine Radiosendung"
            }
          ],
          "correct": "0",
          "correctText": "eine Fernsehsendung"
        },
        "RESPONSE2": {
          "options": [
            {
              "id": "0",
              "text": "einen Schulabschluss erwerben"
            },
            {
              "id": "1",
              "text": "ein Hochschulstudium absolvieren"
            },
            {
              "id": "2",
              "text": "einen neuen Beruf lernen"
            }
          ],
          "correct": "0",
          "correctText": "einen Schulabschluss erwerben"
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p>Das Telekolleg gibt es seit <inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE0\"><inlineChoice identifier=\"0\">1967<inlineChoice><inlineChoice identifier=\"1\">14 Jahren<inlineChoice><inlineChoice identifier=\"2\">1940<inlineChoice><inlineChoiceInteraction>.<p>\n\n<p>Das Telekolleg war <inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE1\"><inlineChoice identifier=\"0\">eine Fernsehsendung<inlineChoice><inlineChoice identifier=\"1\">eine Videoreihe<inlineChoice><inlineChoice identifier=\"2\">eine Radiosendung<inlineChoice><inlineChoiceInteraction>.<p>\n\n<p>Mit dem Telekolleg konnte man <inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE2\"><inlineChoice identifier=\"0\">einen Schulabschluss erwerben<inlineChoice><inlineChoice identifier=\"1\">ein Hochschulstudium absolvieren<inlineChoice><inlineChoice identifier=\"2\">einen neuen Beruf lernen<inlineChoice><inlineChoiceInteraction>.<p>\n<div><div>"
    },
    {
      "id": 11,
      "category": "Leseverstehen • Portrait Joschka Fischer",
      "rubricHtml": "<p><strong>In einer Zeitung finden Sie einen interessanten Artikel zur Person Joschka Fischers.<strong><p>\n\n<p><em>Lesen Sie und wählen Sie aus.<em><p>\n<div>",
      "images": [
        "media/S3_61515_GER-Test_B1_Joschka_Fischer.JPG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "grouped-choice",
      "groups": [
        {
          "responseId": "RESPONSE0",
          "title": "Welche Überschrift passt am besten zu diesem Text?​",
          "options": [
            {
              "id": "C0_0",
              "text": "der Werdegang Joschka Fischers vor seiner politischen Karriere"
            },
            {
              "id": "C0_1",
              "text": "die Rolle Joschka Fischers in der Studentenbewegung"
            },
            {
              "id": "C0_2",
              "text": "Fischers „Basisarbeit“ - ein Beispiel für sozialistische Aktivitäten in den 60ern, 70ern und 80ern"
            },
            {
              "id": "C0_3",
              "text": "Joschka Fischers EU-Ratspräsidentschaft"
            }
          ],
          "correctAnswer": "C0_0",
          "correctAnswerText": "der Werdegang Joschka Fischers vor seiner politischen Karriere"
        },
        {
          "responseId": "RESPONSE1",
          "title": "​Was ist „Libresso“?​",
          "options": [
            {
              "id": "C1_0",
              "text": "eine Buchhandlung"
            },
            {
              "id": "C1_1",
              "text": "eine Studentengruppe"
            },
            {
              "id": "C1_2",
              "text": "eine Zweigstelle der Universitätsbibliothek"
            },
            {
              "id": "C1_3",
              "text": "ein Verlag"
            }
          ],
          "correctAnswer": "C1_0",
          "correctAnswerText": "eine Buchhandlung"
        },
        {
          "responseId": "RESPONSE2",
          "title": "​Was für eine Ausbildung begann Joschka Fischer nach seiner Schulzeit?​",
          "options": [
            {
              "id": "C2_0",
              "text": "eine Ausbildung zum Automonteur"
            },
            {
              "id": "C2_1",
              "text": "eine Ausbildung zum Fotografen"
            },
            {
              "id": "C2_2",
              "text": "eine Ausbildung zum Metzger"
            },
            {
              "id": "C2_3",
              "text": "eine Ausbildung zum Spielwarenverkäufer"
            }
          ],
          "correctAnswer": "C2_1",
          "correctAnswerText": "eine Ausbildung zum Fotografen"
        }
      ]
    },
    {
      "id": 12,
      "category": "Leseverstehen • VHS Computerkurs",
      "rubricHtml": "<p><strong>Sie interessieren sich für einen Computerkurs. Sie finden folgende Kursbeschreibung.<strong><p>\n\n<p><em>Lesen Sie und wählen Sie aus.<em><p>\n<div>",
      "images": [
        "media/S3_61518_GER-Test_B1_Vhs.JPG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "grouped-choice",
      "groups": [
        {
          "responseId": "RESPONSE0",
          "title": "An wen richtet sich der Kurs?​",
          "options": [
            {
              "id": "C0_0",
              "text": "an Menschen, die bereits mehrere Kurse besucht haben"
            },
            {
              "id": "C0_1",
              "text": "an Menschen, die den Computer für die Arbeit oder die Freizeit nutzen möchten"
            },
            {
              "id": "C0_2",
              "text": "an Menschen, die einen eigenen tragbaren Computer besitzen"
            },
            {
              "id": "C0_3",
              "text": "an Menschen, die viel Erfahrung mit Medien haben"
            }
          ],
          "correctAnswer": "C0_1",
          "correctAnswerText": "an Menschen, die den Computer für die Arbeit oder die Freizeit nutzen möchten"
        },
        {
          "responseId": "RESPONSE1",
          "title": "Welches Thema wird z.B. im Kurs behandelt?​",
          "options": [
            {
              "id": "C1_0",
              "text": "digitale Fotografie"
            },
            {
              "id": "C1_1",
              "text": "Navigation im Internet"
            },
            {
              "id": "C1_2",
              "text": "Programmiersprachen"
            },
            {
              "id": "C1_3",
              "text": "Textverarbeitung"
            }
          ],
          "correctAnswer": "C1_3",
          "correctAnswerText": "Textverarbeitung"
        }
      ]
    },
    {
      "id": 13,
      "category": "Hörverstehen • Physiker Stephen Hawking",
      "rubricHtml": "<p><strong>Sie hören im Radio eine Meldung. Ein Freund von Ihnen interessiert sich für Physik. Was berichten Sie ihm?<strong><p>\n\n<p><em>Hören Sie und wählen Sie aus.&nbsp;<em><p>\n<div>",
      "images": [
        "media/S3_61818_11.699018271-H.jpg"
      ],
      "audio": "media/S3_63594_GER-Test_B1_5.mp3",
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie sich den Text an und bearbeiten Sie die Aufgabe, Sie mit der Maus auf den Pfeil neben dem Feld &#34;Bitte w&#228;hlen&#34; klicken. Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. F&#252;hren Sie diesen Vorgang bei jedem Feld durch. Sie k&#246;nnen sich den Text&#160;zwei Mal anh&#246;ren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "inline-dropdown",
      "dropdowns": {
        "RESPONSE0": {
          "options": [
            {
              "id": "0",
              "text": "leider 2018 verstorben ist"
            },
            {
              "id": "1",
              "text": "einen Sprachcomputer entwickelt hat"
            },
            {
              "id": "2",
              "text": "Laien für Astrologie begeistert"
            }
          ],
          "correct": "0",
          "correctText": "leider 2018 verstorben ist"
        },
        "RESPONSE1": {
          "options": [
            {
              "id": "0",
              "text": "ihn zu seinem 65. Geburtstag besucht"
            },
            {
              "id": "1",
              "text": "ein Portrait über ihn gemacht"
            },
            {
              "id": "2",
              "text": "seine Theorien in einem Bericht zusammengefasst"
            }
          ],
          "correct": "0",
          "correctText": "ihn zu seinem 65. Geburtstag besucht"
        },
        "RESPONSE2": {
          "options": [
            {
              "id": "0",
              "text": "er „Popstar der Physik“ genannt"
            },
            {
              "id": "1",
              "text": "seine Theorie über schwarze Löcher erklärt"
            },
            {
              "id": "2",
              "text": "ein wichtiges wissenschaftliches Werk von ihm vorgestellt"
            }
          ],
          "correct": "0",
          "correctText": "er „Popstar der Physik“ genannt"
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p>Ich habe im Radio gehört, dass Stephen Hawking <inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE0\"><inlineChoice identifier=\"0\">leider 2018 verstorben ist<inlineChoice><inlineChoice identifier=\"1\">einen Sprachcomputer entwickelt hat<inlineChoice><inlineChoice identifier=\"2\">Laien für Astrologie begeistert<inlineChoice><inlineChoiceInteraction>.<p>\n\n<p>Eine Wissenschaftsjournalistin hat <inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE1\"><inlineChoice identifier=\"0\">ihn zu seinem 65. Geburtstag besucht<inlineChoice><inlineChoice identifier=\"1\">ein Portrait über ihn gemacht<inlineChoice><inlineChoice identifier=\"2\">seine Theorien in einem Bericht zusammengefasst<inlineChoice><inlineChoiceInteraction>.<p>\n\n<p>Im Radio wurde <inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE2\"><inlineChoice identifier=\"0\">er „Popstar der Physik“ genannt<inlineChoice><inlineChoice identifier=\"1\">seine Theorie über schwarze Löcher erklärt<inlineChoice><inlineChoice identifier=\"2\">ein wichtiges wissenschaftliches Werk von ihm vorgestellt<inlineChoice><inlineChoiceInteraction>.<p>\n<div><div>"
    },
    {
      "id": 14,
      "category": "Leseverstehen & Zuordnung • Kulturveranstaltungen",
      "rubricHtml": "<p><strong>In der Kulturzeitschrift Ihrer Stadt finden Sie viele interessante Veranstaltungen. Mit wem gehen Sie wohin?<strong><p>\n\n<p><em>Lesen Sie und ergänzen Sie die Nummer der passenden Veranstaltung. Eine Anzeige bleibt übrig.<em><p>\n<div>",
      "images": [
        "media/S3_63865_GER-Test_B1_Veranstaltungskalender.JPG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Zur Bearbeitung der Aufgabe geben Sie in das vorgesehene Schreibfeld die Nummer der passenden&#160;Veranstaltung&#160;ein. Verwenden Sie bitte keine zus&#228;tzlichen Leerzeichen.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "text-gap",
      "gaps": {
        "RESPONSE0": {
          "expected": "1",
          "validAnswers": [
            "1"
          ]
        },
        "RESPONSE1": {
          "expected": "2",
          "validAnswers": [
            "2"
          ]
        },
        "RESPONSE2": {
          "expected": "4",
          "validAnswers": [
            "4"
          ]
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p><strong>Anna​<strong><br><br>\n... liebt klassische Musik und singt selbst in einem Chor.<p>\n\n<p>Anzeige&nbsp;<textEntryInteraction responseIdentifier=\"RESPONSE0\"><textEntryInteraction><p>\n\n<p><strong>Erik​<strong><br><br>\n... liest gern und viel, mag die neuere und unkonventionelle Literatur,&nbsp;interessiert sich für Computer.<p>\n\n<p>Anzeige <textEntryInteraction responseIdentifier=\"RESPONSE1\"><textEntryInteraction><p>\n\n<p><strong>Maria<br><br>\n​<strong>... interessiert sich für die Geschichte Osteuropas und Russlands, mag&nbsp;Liebesfilme.<p>\n\n<p>Anzeige <textEntryInteraction responseIdentifier=\"RESPONSE2\"><textEntryInteraction><p>\n<div><div>"
    },
    {
      "id": 15,
      "category": "Leseverstehen • Radwandern in Mitteldeutschland",
      "rubricHtml": "<p><strong>In einem Fahrrad-Laden haben Sie eine Broschüre zum Thema Radwandern gefunden. Sie erzählen einem Freund davon. Was sagen Sie?<strong><p>\n\n<p><em>Lesen Sie und ergänzen Sie die Sätze.​<em><p>\n<div>",
      "images": [
        "media/S3_62956_Radwandern.PNG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "grouped-choice",
      "groups": [
        {
          "responseId": "RESPONSE0",
          "title": "In dem Artikel stand, ...",
          "options": [
            {
              "id": "C0_0",
              "text": "dass man beim Bahnfahren viele landschaftliche Schönheiten erkunden kann."
            },
            {
              "id": "C0_1",
              "text": "dass man in Thüringen sehr schöne Radtouren machen kann."
            },
            {
              "id": "C0_2",
              "text": "dass Radrouten in Mitteldeutschland überwiegend bergig sind."
            },
            {
              "id": "C0_3",
              "text": "dass die Radwanderwege in Mitteldeutschland meist an Flüssen entlang führen."
            }
          ],
          "correctAnswer": "C0_1",
          "correctAnswerText": "dass man in Thüringen sehr schöne Radtouren machen kann."
        },
        {
          "responseId": "RESPONSE1",
          "title": "​Die Radwanderwege …",
          "options": [
            {
              "id": "C1_0",
              "text": "sind eher für Radprofis geeignet."
            },
            {
              "id": "C1_1",
              "text": "sind sorgfältig geplant."
            },
            {
              "id": "C1_2",
              "text": "sind nicht zu anspruchsvoll."
            },
            {
              "id": "C1_3",
              "text": "werden zurzeit ausgebaut."
            }
          ],
          "correctAnswer": "C1_2",
          "correctAnswerText": "sind nicht zu anspruchsvoll."
        }
      ]
    },
    {
      "id": 16,
      "category": "Leseverstehen • Radiosender Kolibri",
      "rubricHtml": "<p><strong>Ein Radiosender sucht Interessierte, die bei einer Sendung mitwirken möchten.&nbsp;Wer soll sich bei dem Radiosender melden?<strong><p>\n\n<p><em>Lesen Sie und wählen Sie aus. ​<em><p>\n<div>",
      "images": [
        "media/S3_62814_Kolibri-Radio.PNG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> <p>&#160;</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "single-choice",
      "options": [
        {
          "id": "C0_0",
          "text": "Menschen, die besondere Hobbys haben"
        },
        {
          "id": "C0_1",
          "text": "Menschen, die ehrenamtlich in Vereinen tätig sind"
        },
        {
          "id": "C0_2",
          "text": "Menschen, die einen kuriosen Weltrekord aufstellen wollen"
        },
        {
          "id": "C0_3",
          "text": "Menschen, die sich für Sport oder Musik interessieren"
        }
      ],
      "correctAnswer": "C0_0",
      "correctAnswerText": "Menschen, die besondere Hobbys haben"
    },
    {
      "id": 17,
      "category": "Hörverstehen & Dialog • Interview mit Ballerina",
      "rubricHtml": "<p><b>Sie möchten im Radio ein Interview mit der Balletttänzerin Lena Ivanova hören. Der Empfang ist aber ganz schlecht. Sie verstehen die Fragen nicht.<b> <b>Was hat die Moderatorin wann gesagt?​<b><p>\n\n<p><em>Ordnen Sie die Dialogteile der Moderatorin den Antworten von Lena Ivanova zu.<em><p>\n<div>",
      "images": [
        "media/S3_61816_11.701649550-H.jpg"
      ],
      "audio": null,
      "audios": [
        "media/S3_63592_GER-Test_B1_6.2.mp3",
        "media/S3_63595_GER-Test_B1_6.4.mp3",
        "media/S3_63596_GER-Test_B1_6.3.mp3",
        "media/S3_63590_GER-Test_B1_6.1.mp3"
      ],
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Klicken Sie bei A, B, C beziehungsweise D auf das Feld &#34;Play&#34;. H&#246;ren Sie sich&#160;die Antworten der T&#228;nzerin an und tragen Sie in das vorgesehene Schreibfeld die Nummer des passenden Dialogteils ein, die zu dieser Antwort passt. Sie k&#246;nnen&#160;sich jeden H&#246;rtext&#160;zwei Mal anh&#246;ren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "text-gap",
      "gaps": {
        "RESPONSE0": {
          "expected": "2",
          "validAnswers": [
            "2"
          ]
        },
        "RESPONSE1": {
          "expected": "3",
          "validAnswers": [
            "3"
          ]
        },
        "RESPONSE2": {
          "expected": "1",
          "validAnswers": [
            "1"
          ]
        },
        "RESPONSE3": {
          "expected": "4",
          "validAnswers": [
            "4"
          ]
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p><strong>1<strong> Haben Sie dann Tanzunterricht genommen?<p>\n\n<p><strong>2<strong> In unserer Reihe „Hobbys und Passionen“ begrüße ich heute&nbsp;Lena.&nbsp;Herzlich Willkommen,&nbsp;Lena.<p>\n\n<p><strong>3<strong> Lena, Sie sind 22 Jahre alt und tanzen seit 17 Jahren. Wie sind Sie&nbsp;dazu&nbsp;gekommen?<p>\n\n<p><strong>4<strong> Und heute geben Sie selbst Ballettunterricht?<p>\n\n<p>&nbsp;<p>\n\n<p>Moderatorin:&nbsp;<textEntryInteraction responseIdentifier=\"RESPONSE0\"><textEntryInteraction><br><br>\nLena: Hörtext A<p>\n\n<p>Moderatorin:&nbsp;<textEntryInteraction responseIdentifier=\"RESPONSE1\"><textEntryInteraction><br><br>\n​Lena: Hörtext B<p>\n\n<p>Moderatorin:&nbsp;<textEntryInteraction responseIdentifier=\"RESPONSE2\"><textEntryInteraction><br><br>\n​Lena: Hörtext C<p>\n\n<p>Moderatorin:&nbsp;<textEntryInteraction responseIdentifier=\"RESPONSE3\"><textEntryInteraction><br><br>\n​Lena: Hörtext D<p>\n<div><div>"
    },
    {
      "id": 18,
      "category": "Leseverstehen • Kochbücher im Vergleich",
      "rubricHtml": "<table><tbody><tr><td style=\"text-align: left; vertical-align: top; width: 260px;\"><strong><img src=\"S3_16200_688_img.jpg?filename=688_img.jpg\" alt=\"\" id=\"16200\" class=\"\" style=\"width: 220px; height: 167px;\" data-author=\"{}\"><img><strong><td><td style=\"text-align: left; vertical-align: top;\">\n\t\t\t<p><strong>Sie möchten einer Freundin, die sich sehr für das Kochen interessiert, ein Buch schenken. Sie sind im Buchladen und haben zwei schöne Bücher gefunden.&nbsp;Sie lesen die Klappentexte und überlegen, welches Sie nehmen.<strong><p>\n\n\t\t\t<p><em>Lesen Sie und wählen Sie aus.&nbsp;<em><p>\n\t\t\t<td><tr><tbody><table>\n<div>",
      "images": [
        "media/S3_16200_688_img.jpg"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil neben dem Feld &#34;Bitte w&#228;hlen&#34;. Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. F&#252;hren Sie diesen Vorgang bei jedem Feld durch.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "inline-dropdown",
      "dropdowns": {
        "RESPONSE0": {
          "options": [
            {
              "id": "0",
              "text": "es vielfältig und international ist"
            },
            {
              "id": "1",
              "text": "es das Kochbuch des Jahres ist"
            },
            {
              "id": "2",
              "text": "es gute praktische Tipps enthält"
            }
          ],
          "correct": "0",
          "correctText": "es vielfältig und international ist"
        },
        "RESPONSE1": {
          "options": [
            {
              "id": "0",
              "text": "es gute praktische Tipps enthält"
            },
            {
              "id": "1",
              "text": "es das Kochbuch des Jahres ist"
            },
            {
              "id": "2",
              "text": "es vielfältig und international ist"
            }
          ],
          "correct": "0",
          "correctText": "es gute praktische Tipps enthält"
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><table class=\"table-default\"><tbody><tr><td>\n\t\t\t<p><strong>Die 100 besten Rezepte<strong><p>\n\t\t\t<td><td><strong>Schönecks Kochschule<strong><td><tr><tr><td>Das Buch richtet sich an Vegetarier oder einfach an Personen, die ab und zu fleischlos kochen.&nbsp;Auf ihren Reisen hat Christiane Fichtel in die Küchen der Welt geschaut und dabei Vegetarisches für&nbsp;Feinschmecker zusammengetragen.&nbsp;Hier finden Sie lateinamerikanische und fernöstliche Kreationen, ebenso wie traditionelle und neue Gerichte aus ganz Europa.<td><td>Kochen lernen mit Friedrich Schöneck! Jetzt kann man nachlesen, wie er die wichtigsten Klassiker zubereitet. Er zeigt, wie er Semmelknödel macht, stellt&nbsp;grundlegende Garmethoden vor und verrät, wie er Bratkartoffeln perfekt brät.&nbsp;Alle wichtigen Kochvorgänge sind in Fotos Schritt für Schritt dargestellt.<td><tr><tr><td>\n\t\t\t<p>Mir gefällt dieses Buch, weil …<p>\n\n\t\t\t<p><inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE0\"><inlineChoice identifier=\"0\">es vielfältig und international ist<inlineChoice><inlineChoice identifier=\"1\">es das Kochbuch des Jahres ist<inlineChoice><inlineChoice identifier=\"2\">es gute praktische Tipps enthält<inlineChoice><inlineChoiceInteraction>.<p>\n\t\t\t<td><td>\n\t\t\t<p>Mir gefällt dieses Buch, weil …<p>\n\n\t\t\t<p><inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE1\"><inlineChoice identifier=\"0\">es gute praktische Tipps enthält<inlineChoice><inlineChoice identifier=\"1\">es das Kochbuch des Jahres ist<inlineChoice><inlineChoice identifier=\"2\">es vielfältig und international ist<inlineChoice><inlineChoiceInteraction>.<p>\n\t\t\t<td><tr><tbody><table>\n<div><div>"
    },
    {
      "id": 19,
      "category": "Hörverstehen • Herr Neumanns Beruf",
      "rubricHtml": "<p><strong>Herr Neumann erzählt. Welchen Beruf hat Herr Neumann?<strong><p>\n\n<p><em>Hören Sie und wählen Sie aus.<em><p>\n<div>",
      "images": [
        "media/S3_16218_707_img.jpg"
      ],
      "audio": "media/S3_63599_GER-Test_B1_7.mp3",
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "single-choice",
      "options": [
        {
          "id": "C0_0",
          "text": "Er ist Grundbesitzer."
        },
        {
          "id": "C0_1",
          "text": "Er ist Schauspieler."
        },
        {
          "id": "C0_2",
          "text": "Er ist Schulleiter."
        },
        {
          "id": "C0_3",
          "text": "Er ist Tierzüchter."
        }
      ],
      "correctAnswer": "C0_2",
      "correctAnswerText": "Er ist Schulleiter."
    },
    {
      "id": 20,
      "category": "Leseverstehen • Geschichte von Rabbendorf",
      "rubricHtml": "<p><strong>Im Dorfmuseum können Sie sich über die Geschichte von Rabbendorf informieren.<strong><p>\n\n<p><em>Lesen Sie und wählen Sie aus.&nbsp;<em><p>\n<div>",
      "images": [
        "media/S3_62659_Rabbendorf.PNG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "grouped-choice",
      "groups": [
        {
          "responseId": "RESPONSE0",
          "title": "Welche geografischen Informationen bekommen Sie über Rabbendorf?​",
          "options": [
            {
              "id": "C0_0",
              "text": "Das Dorf liegt auf einem bewaldeten Berg."
            },
            {
              "id": "C0_1",
              "text": "Das Dorf liegt in einem Flusstal."
            },
            {
              "id": "C0_2",
              "text": "Das Dorf liegt in einer flachen Fluss- und Waldlandschaft."
            },
            {
              "id": "C0_3",
              "text": "Das Dorf wird durch einen Fluss in zwei Hälften geteilt."
            }
          ],
          "correctAnswer": "C0_1",
          "correctAnswerText": "Das Dorf liegt in einem Flusstal."
        },
        {
          "responseId": "RESPONSE1",
          "title": "Was wird über die Anfänge des Dorfes berichtet?​",
          "options": [
            {
              "id": "C1_0",
              "text": "Rabbendorf wurde von Cuno von Rabbendorf gegründet."
            },
            {
              "id": "C1_1",
              "text": "Es begann mit der Textilindustrie."
            },
            {
              "id": "C1_2",
              "text": "Es gab zunächst zwei Dörfer, die dann zusammengelegt wurden."
            },
            {
              "id": "C1_3",
              "text": "1306 siedelten sich am Schwarzbach erste Müller an."
            }
          ],
          "correctAnswer": "C1_2",
          "correctAnswerText": "Es gab zunächst zwei Dörfer, die dann zusammengelegt wurden."
        },
        {
          "responseId": "RESPONSE2",
          "title": "Wann wurde das Krankenhaus gebaut?",
          "options": [
            {
              "id": "C2_0",
              "text": "erst in den letzten Jahren"
            },
            {
              "id": "C2_1",
              "text": "im 18. Jahrhundert"
            },
            {
              "id": "C2_2",
              "text": "1870"
            },
            {
              "id": "C2_3",
              "text": "1902-1904"
            }
          ],
          "correctAnswer": "C2_2",
          "correctAnswerText": "1870"
        }
      ]
    },
    {
      "id": 21,
      "category": "Leseverstehen & Zuordnung • Vereinslandschaft",
      "rubricHtml": "<p><strong>In Rabbendorf gibt es viele Vereine. Im Informationsblatt zum Dorfjubiläum werden die verschiedenen Vereine vorgestellt.<strong><p>\n\n<p><em>Lesen Sie und ergänzen Sie die passende Vereinsnummer. Drei Vereine bleiben übrig.<em><p>\n<div>",
      "images": [
        "media/S3_61516_GER-Test_B1_Vereine_in_Rabbendorf.JPG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Zur Bearbeitung der Aufgabe geben Sie in das vorgesehene Schreibfeld die&#160;Nummer des passenden&#160;Vereins ein. Verwenden Sie bitte keine zus&#228;tzlichen Leerzeichen.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "text-gap",
      "gaps": {
        "RESPONSE0": {
          "expected": "7",
          "validAnswers": [
            "7"
          ]
        },
        "RESPONSE1": {
          "expected": "4",
          "validAnswers": [
            "4"
          ]
        },
        "RESPONSE2": {
          "expected": "6",
          "validAnswers": [
            "6"
          ]
        },
        "RESPONSE3": {
          "expected": "5",
          "validAnswers": [
            "5"
          ]
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p><textEntryInteraction responseIdentifier=\"RESPONSE0\"><textEntryInteraction><br><br>\nDen Verein gründete eine Gruppe älterer Dorfbewohner erst letztes Jahr und hat nach so kurzer Zeit schon große Erfolge zu verzeichnen. Getreu dem Motto „Fit und gesund ins Alter“ bietet der Verein Seniorengymnastik, Yoga und schonendes Nordic-Walking-Training an. 36 Mitglieder zählt die unternehmensfreudige Sportgruppe bereits.<p>\n\n<p><textEntryInteraction responseIdentifier=\"RESPONSE1\"><textEntryInteraction><br><br>\nDer Verein wurde 1991 gegründet und hat sich zur Aufgabe gemacht, die verschiedenen Wanderwege in und um Rabbendorf zu pflegen und zu erweitern. Historische Orte, Naturbesonderheiten und landschaftliche Kostbarkeiten sollen zugänglich gemacht werden. Die ehemalige Wassermühle im nahe gelegenen Rabbenwald wurde gemeinschaftlich restauriert und dient als Veranstaltungsort für verschiedene Sommerfeste und kulturelle Events.<p>\n\n<p><textEntryInteraction responseIdentifier=\"RESPONSE2\"><textEntryInteraction><br><br>\nDieser traditionsreiche Verein gründete sich bereits 1812 und stellt somit den ältesten Verein des Dorfes dar. Alljährlich findet das überregional bekannte so genannte „Rabbendorfer Schießfest“ statt, bei dem es um Treffsicherheit im Tontauben-Schießen, Pfeil-und-Bogen-Schießen und Blechbüchsenwerfen geht.<p>\n\n<p><textEntryInteraction responseIdentifier=\"RESPONSE3\"><textEntryInteraction><br><br>\nWenn´s mal brennt sind sie zur Stelle: Die 25 Jungen und Mädchen trainieren regelmäßig einmal pro Woche auf dem Dorfplatz und im Depot neben dem Löschwasserteich. Engagierte Väter haben den Verein 1975 ins Leben gerufen und deren Kinder leiten und organisieren heute die Übungen.<p>\n\n<p>&nbsp;<p>\n<div><div>"
    },
    {
      "id": 22,
      "category": "Hörverstehen • Stimmen auf dem Jahrmarkt",
      "rubricHtml": "<p><b>Anlässlich der 700-Jahr-Feier des Ortes gibt es auf dem Dorfplatz einen Jahrmarkt. Viele Menschen sind dort und es ist sehr laut. Alle reden durcheinander.<b> <b>Welche Gesprächsteile gehören zusammen?​<b><p>\n\n<p><em>Hören Sie und ergänzen Sie die passende Nummer. Drei Dialogteile bleiben übrig.<em><p>\n<div>",
      "images": [
        "media/S3_63850_BEIERO_060101_012_Volksfest.jpg"
      ],
      "audio": null,
      "audios": [
        "media/S3_63597_GER-Test_B1_8.1.mp3",
        "media/S3_63598_GER-Test_B1_8.2.mp3",
        "media/S3_63600_GER-Test_B1_8.3.mp3"
      ],
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <windowTop></windowTop> <windowLeft></windowLeft> <URL></URL> <text><p>Klicken Sie bei A, B beziehungsweise C auf das Feld &#34;Play&#34;. H&#246;ren Sie sich die Dialogteile an und beantworten Sie die Frage, indem Sie in das vorgesehene Schreibfeld die&#160;Nummer des passenden Dialogteils schreiben. Sie k&#246;nnen&#160;jeden H&#246;rtext mehrmals anh&#246;ren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> <userVisibility>All</userVisibility> </Downloadable>",
      "type": "text-gap",
      "gaps": {
        "RESPONSE0": {
          "expected": "4",
          "validAnswers": [
            "4"
          ]
        },
        "RESPONSE1": {
          "expected": "2",
          "validAnswers": [
            "2"
          ]
        },
        "RESPONSE2": {
          "expected": "6",
          "validAnswers": [
            "6"
          ]
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p>1 Doch, bestimmt geht es gleich los.<br><br>\n2 Ja, auf dem Kunsthandwerksmarkt gibt es welche.<br><br>\n3 Ja, die Fahrt kostet nur 1 Euro, aber vor dem Eingang steht eine lange&nbsp;Warteschlange.<br><br>\n4 Nein, das ist mir jetzt zu süß, ich brauch irgendwas Herzhaftes. Möchte&nbsp;jemand eine&nbsp;Bratwurst?<br><br>\n5 Nein, ich hab kein Kleingeld mehr. Nur einen 10-Euro-Schein.<br><br>\n6 Nein, nirgends, nur noch auf dem Parkplatz am Ortseingang.<p>\n\n<table align=\"right\"><tbody><tr><td style=\"text-align: left; vertical-align: top;\">\n\t\t\t<p style=\"margin-left: 160px;\"><object data=\"S3_63597_GER-Test_B1_8.1\" type=\"audio/audio\" alt=\"\" id=\"63597\" style=\"width: 125px; height: 125px;\" data-author=\"{}\"><object><p>\n\t\t\t<td><td style=\"text-align: left; vertical-align: top;\">\n\t\t\t<p style=\"margin-left: 160px;\">Dialogteil:<p>\n\t\t\t<td><td style=\"text-align: left; vertical-align: top;\">\n\t\t\t<p style=\"margin-left: 160px;\"><textEntryInteraction responseIdentifier=\"RESPONSE0\"><textEntryInteraction><p>\n\t\t\t<td><tr><tr><td style=\"text-align: left; vertical-align: top;\">\n\t\t\t<p style=\"margin-left: 160px;\"><object data=\"S3_63598_GER-Test_B1_8.2\" type=\"audio/audio\" alt=\"\" id=\"63598\" style=\"width: 125px; height: 125px;\" data-author=\"{}\"><object><p>\n\t\t\t<td><td style=\"text-align: left; vertical-align: top;\">\n\t\t\t<p style=\"margin-left: 160px;\">Dialogteil:<p>\n\t\t\t<td><td style=\"text-align: left; vertical-align: top;\">\n\t\t\t<p style=\"margin-left: 160px;\"><textEntryInteraction responseIdentifier=\"RESPONSE1\"><textEntryInteraction><p>\n\t\t\t<td><tr><tr><td style=\"text-align: left; vertical-align: top;\">\n\t\t\t<p style=\"margin-left: 160px;\"><object data=\"S3_63600_GER-Test_B1_8.3\" type=\"audio/audio\" alt=\"\" id=\"63600\" style=\"width: 125px; height: 125px;\" data-author=\"{}\"><object><p>\n\t\t\t<td><td style=\"text-align: left; vertical-align: top;\">\n\t\t\t<p style=\"margin-left: 160px;\">Dialogteil:<p>\n\t\t\t<td><td style=\"text-align: left; vertical-align: top;\">\n\t\t\t<p style=\"margin-left: 160px;\"><textEntryInteraction responseIdentifier=\"RESPONSE2\"><textEntryInteraction><p>\n\t\t\t<td><tr><tbody><table>\n<div><div>"
    },
    {
      "id": 23,
      "category": "Wortschatz & Logik • Die Eiskarte",
      "rubricHtml": "<p><b>Sie möchten auf dem Jahrmarkt Eis essen. Jemand hat zum Spaß die Tafel des Eisstandes verändert! Wenn das der Verkäufer wüsste!<b> <b>Welche der folgenden Geschmacksrichtungen muss&nbsp;er herausstreichen?​<b><p>\n\n<p><em>Lesen Sie und wählen Sie aus. Es sind mehrere Antworten richtig.<em><p>\n<div>",
      "images": [
        "media/S3_16202_690_img.jpg"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Frage, indem Sie das Feld neben den korrekten Antworten durch Anklicken mit der Maus markieren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "multiple-choice",
      "options": [
        {
          "id": "C0_0",
          "text": "Erdbeere"
        },
        {
          "id": "C0_1",
          "text": "Himbeere"
        },
        {
          "id": "C0_2",
          "text": "Buch"
        },
        {
          "id": "C0_3",
          "text": "Fisch"
        },
        {
          "id": "C0_4",
          "text": "Joghurt"
        },
        {
          "id": "C0_5",
          "text": "Karamell"
        },
        {
          "id": "C0_6",
          "text": "Kartoffel"
        },
        {
          "id": "C0_7",
          "text": "Sauerkirsche"
        },
        {
          "id": "C0_8",
          "text": "Schokolade"
        },
        {
          "id": "C0_9",
          "text": "Vaseline"
        }
      ],
      "correctAnswers": [
        "C0_2",
        "C0_3",
        "C0_6",
        "C0_9"
      ],
      "correctAnswersText": [
        "Buch",
        "Fisch",
        "Kartoffel",
        "Vaseline"
      ]
    },
    {
      "id": 24,
      "category": "Hörverstehen • Begegnung auf dem Jahrmarkt",
      "rubricHtml": "<p><strong>Sie lernen auf dem Jahrmarkt Frau Richter kennen. Später erzählen Sie von der Begegnung.<strong><p>\n\n<p><em>Hören Sie und wählen Sie aus.&nbsp;<em><p>\n<div>",
      "images": [
        "media/S3_16217_710_img.jpg"
      ],
      "audio": "media/S3_63604_GER-Test_B1_9.mp3",
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Klicken Sie auf das Feld &#34;Play&#34; und h&#246;ren Sie sich den Text an. Zur Bearbeitung der Aufgabe klicken Sie dann bitte mit der Maus auf den Pfeil neben dem Feld &#34;Bitte w&#228;hlen&#34;. Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. F&#252;hren Sie diesen Vorgang bei jedem Feld durch. Sie k&#246;nnen sich den Text zwei Mal anh&#246;ren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "inline-dropdown",
      "dropdowns": {
        "RESPONSE0": {
          "options": [
            {
              "id": "0",
              "text": "ob sie schon immer in Rabbendorf wohnt"
            },
            {
              "id": "1",
              "text": "ob sie auch beim Umzug mitgemacht hatte"
            },
            {
              "id": "2",
              "text": "warum sie nach Rabbendorf gezogen ist"
            }
          ],
          "correct": "0",
          "correctText": "ob sie schon immer in Rabbendorf wohnt"
        },
        "RESPONSE1": {
          "options": [
            {
              "id": "0",
              "text": "ihr die Ruhe und die Natur gefällt"
            },
            {
              "id": "1",
              "text": "ihre Kinder auch in Rabbendorf leben"
            },
            {
              "id": "2",
              "text": "sie es manchmal langweilig in dem Dorf findet"
            }
          ],
          "correct": "0",
          "correctText": "ihr die Ruhe und die Natur gefällt"
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p>Ich hatte gefragt, <inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE0\"><inlineChoice identifier=\"0\">ob sie schon immer in Rabbendorf wohnt<inlineChoice><inlineChoice identifier=\"1\">ob sie auch beim Umzug mitgemacht hatte<inlineChoice><inlineChoice identifier=\"2\">warum sie nach Rabbendorf gezogen ist<inlineChoice><inlineChoiceInteraction>.<p>\n\n<p>Dann hat sie mir erzählt, dass&nbsp;<inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE1\"><inlineChoice identifier=\"0\">ihr die Ruhe und die Natur gefällt<inlineChoice><inlineChoice identifier=\"1\">ihre Kinder auch in Rabbendorf leben<inlineChoice><inlineChoice identifier=\"2\">sie es manchmal langweilig in dem Dorf findet<inlineChoice><inlineChoiceInteraction>.<p>\n<div><div>"
    },
    {
      "id": 25,
      "category": "Hörverstehen • Verband Fremdsprachiger Medien",
      "rubricHtml": "<p><strong>Im Radio hören Sie einen Beitrag über den „Verband Fremdsprachiger Medien“.<strong><p>\n\n<p><em>Hören Sie und wählen Sie aus.&nbsp;<em><p>\n<div>",
      "images": [
        "media/S3_61815_11.706787863-H.jpg"
      ],
      "audio": "media/S3_63602_GER-Test_B1_10.mp3",
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie sich den Text an und beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. Sie k&#246;nnen sich den Text zwei Mal anh&#246;ren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "grouped-choice",
      "groups": [
        {
          "responseId": "RESPONSE0",
          "title": "Mit wem spricht der Moderator?​",
          "options": [
            {
              "id": "C0_0",
              "text": "mit der Bibliothekarin des Verbandes"
            },
            {
              "id": "C0_1",
              "text": "mit der Vorsitzenden des Verbandes"
            },
            {
              "id": "C0_2",
              "text": "mit einem Mitarbeiter des Verbandes"
            }
          ],
          "correctAnswer": "C0_1",
          "correctAnswerText": "mit der Vorsitzenden des Verbandes"
        },
        {
          "responseId": "RESPONSE1",
          "title": "Welche Aufgaben hat der Verband?​",
          "options": [
            {
              "id": "C1_0",
              "text": "Beratung und Vermarktung"
            },
            {
              "id": "C1_1",
              "text": "Finanzierung"
            },
            {
              "id": "C1_2",
              "text": "Schreiben von Pressemitteilungen"
            }
          ],
          "correctAnswer": "C1_0",
          "correctAnswerText": "Beratung und Vermarktung"
        },
        {
          "responseId": "RESPONSE2",
          "title": "Was wird im Archiv gesammelt?​",
          "options": [
            {
              "id": "C2_0",
              "text": "deutsche Medien, die im Ausland erschienen sind"
            },
            {
              "id": "C2_1",
              "text": "fremdsprachige Publikationen, die im deutschen Sprachraum erschienen sind"
            },
            {
              "id": "C2_2",
              "text": "Literatur zur Minderheitenproblematik"
            }
          ],
          "correctAnswer": "C2_1",
          "correctAnswerText": "fremdsprachige Publikationen, die im deutschen Sprachraum erschienen sind"
        }
      ]
    },
    {
      "id": 26,
      "category": "Hörverstehen • Kulturnachrichten im Radio",
      "rubricHtml": "<p><strong>Dann hören Sie die Kulturnachrichten. Es werden interessante Veranstaltungen für das ganze Jahr angekündigt.&nbsp;Wo finden die Veranstaltungen statt?&nbsp;<strong><p>\n\n<p><em>Hören Sie und wählen Sie aus.<em><p>\n<div>",
      "images": [
        "media/S3_61818_11.699018271-H.jpg"
      ],
      "audio": "media/S3_63605_GER-Test_B1_11.mp3",
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Klicken Sie auf das Feld &#34;Play&#34; und h&#246;ren Sie sich den Text an. Zur Bearbeitung der Aufgabe ziehen Sie den Dialogteil an die richtige Stelle. Sie k&#246;nnen Ihre Wahl auch noch &#228;ndern, bevor Sie auf OK klicken. Ziehen Sie einfach den Dialogteil an eine andere Stelle.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "inline-dropdown",
      "dropdowns": {
        "RESPONSE0": {
          "options": [
            {
              "id": "0",
              "text": "Gera"
            },
            {
              "id": "1",
              "text": "Kassel"
            },
            {
              "id": "2",
              "text": "Hamburg"
            },
            {
              "id": "3",
              "text": "Stuttgart"
            }
          ],
          "correct": "0",
          "correctText": "Gera"
        },
        "RESPONSE1": {
          "options": [
            {
              "id": "0",
              "text": "Kassel"
            },
            {
              "id": "1",
              "text": "Gera"
            },
            {
              "id": "2",
              "text": "Hamburg"
            },
            {
              "id": "3",
              "text": "Stuttgart"
            }
          ],
          "correct": "0",
          "correctText": "Kassel"
        },
        "RESPONSE2": {
          "options": [
            {
              "id": "0",
              "text": "Hamburg"
            },
            {
              "id": "1",
              "text": "Kassel"
            },
            {
              "id": "2",
              "text": "Gera"
            },
            {
              "id": "3",
              "text": "Stuttgart"
            }
          ],
          "correct": "0",
          "correctText": "Hamburg"
        },
        "RESPONSE3": {
          "options": [
            {
              "id": "0",
              "text": "Stuttgart"
            },
            {
              "id": "1",
              "text": "Hamburg"
            },
            {
              "id": "2",
              "text": "Gera"
            },
            {
              "id": "3",
              "text": "Stuttgart"
            }
          ],
          "correct": "0",
          "correctText": "Stuttgart"
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p>&nbsp;<p>\n\n<table><tbody><tr><td>\n\t\t\t<p>Bundesgartenschau<p>\n\t\t\t<td><td>\n\t\t\t<p><inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE0\"><inlineChoice identifier=\"0\">Gera<inlineChoice><inlineChoice identifier=\"1\">Kassel<inlineChoice><inlineChoice identifier=\"2\">Hamburg<inlineChoice><inlineChoice identifier=\"3\">Stuttgart<inlineChoice><inlineChoiceInteraction><p>\n\t\t\t<td><tr><tr><td>\n\t\t\t<p>Dokumenta&nbsp;&nbsp;<p>\n\t\t\t<td><td>\n\t\t\t<p><inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE1\"><inlineChoice identifier=\"0\">Kassel<inlineChoice><inlineChoice identifier=\"1\">Gera<inlineChoice><inlineChoice identifier=\"2\">Hamburg<inlineChoice><inlineChoice identifier=\"3\">Stuttgart<inlineChoice><inlineChoiceInteraction><p>\n\t\t\t<td><tr><tr><td>\n\t\t\t<p>Handball-WM<p>\n\t\t\t<td><td>\n\t\t\t<p><inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE2\"><inlineChoice identifier=\"0\">Hamburg<inlineChoice><inlineChoice identifier=\"1\">Kassel<inlineChoice><inlineChoice identifier=\"2\">Gera<inlineChoice><inlineChoice identifier=\"3\">Stuttgart<inlineChoice><inlineChoiceInteraction><p>\n\t\t\t<td><tr><tr><td>\n\t\t\t<p>Radsport-WM<p>\n\t\t\t<td><td><inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE3\"><inlineChoice identifier=\"0\">Stuttgart<inlineChoice><inlineChoice identifier=\"1\">Hamburg<inlineChoice><inlineChoice identifier=\"2\">Gera<inlineChoice><inlineChoice identifier=\"3\">Stuttgart<inlineChoice><inlineChoiceInteraction><td><td>&nbsp;<td><tr><tbody><table>\n\n<p>&nbsp;<p>\n<div><div>"
    },
    {
      "id": 27,
      "category": "Leseverstehen • Werbebrief Ulmer Volkszeitung",
      "rubricHtml": "<p><strong>Sie bekommen einen Werbebrief.&nbsp;<strong><p>\n\n<p><em>Lesen Sie und wählen Sie aus.&nbsp;<em><p>\n<div>",
      "images": [
        "media/S3_61513_GER-Test_B1_Ulmer_Stadtzeitung.JPG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil neben dem Feld &#34;Bitte w&#228;hlen&#34;. Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. F&#252;hren Sie diesen Vorgang bei jedem Feld durch.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "inline-dropdown",
      "dropdowns": {
        "RESPONSE0": {
          "options": [
            {
              "id": "0",
              "text": "weil die Zeitung ein neues Konzept hat"
            },
            {
              "id": "1",
              "text": "wegen Ihres Abonnements"
            },
            {
              "id": "2",
              "text": "weil Sie an einer Umfrage teilnehmen sollen"
            },
            {
              "id": "3",
              "text": "weil Sie etwas gewonnen haben"
            }
          ],
          "correct": "0",
          "correctText": "weil die Zeitung ein neues Konzept hat"
        },
        "RESPONSE1": {
          "options": [
            {
              "id": "0",
              "text": "eine kostenlose Zeitung bekommen"
            },
            {
              "id": "1",
              "text": "am 13.01. an einer Veranstaltung teilnehmen"
            },
            {
              "id": "2",
              "text": "Informationen zum regionalen Geschehen anfordern"
            },
            {
              "id": "3",
              "text": "14 Tage lang die UVZ kostenlos bekommen"
            }
          ],
          "correct": "0",
          "correctText": "eine kostenlose Zeitung bekommen"
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p>Der Chefredakteur der Ulmer Volkszeitung schreibt diesen Brief, <inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE0\"><inlineChoice identifier=\"0\">weil die Zeitung ein neues Konzept hat<inlineChoice><inlineChoice identifier=\"1\">wegen Ihres Abonnements<inlineChoice><inlineChoice identifier=\"2\">weil Sie an einer Umfrage teilnehmen sollen<inlineChoice><inlineChoice identifier=\"3\">weil Sie etwas gewonnen haben<inlineChoice><inlineChoiceInteraction>.<p>\n\n<p>Mit dem Gutschein kann man <inlineChoiceInteraction shuffle=\"true\" responseIdentifier=\"RESPONSE1\"><inlineChoice identifier=\"0\">eine kostenlose Zeitung bekommen<inlineChoice><inlineChoice identifier=\"1\">am 13.01. an einer Veranstaltung teilnehmen<inlineChoice><inlineChoice identifier=\"2\">Informationen zum regionalen Geschehen anfordern<inlineChoice><inlineChoice identifier=\"3\">14 Tage lang die UVZ kostenlos bekommen<inlineChoice><inlineChoiceInteraction>.<p>\n<div><div>"
    },
    {
      "id": 28,
      "category": "Leseverstehen • Regisseur Florian Henckel",
      "rubricHtml": "<p><strong>In der Zeitung finden Sie einen Artikel über den Regisseur Florian Henckel von Donnersmarck.<strong><p>\n\n<p><em>Lesen Sie und wählen Sie aus.​<em><p>\n<div>",
      "images": [
        "media/S3_62958_Florian_Henkel_von_Donnersmarck.JPG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "grouped-choice",
      "groups": [
        {
          "responseId": "RESPONSE0",
          "title": "Wofür bekommt Donnersmarck den Bayrischen und den Deutschen Filmpreis?​",
          "options": [
            {
              "id": "C0_0",
              "text": "für den Film „In Love and War“"
            },
            {
              "id": "C0_1",
              "text": "für die perfekte Besetzung der Hauptrollen"
            },
            {
              "id": "C0_2",
              "text": "für Regie und Drehbuch seines ersten Spielfilms"
            },
            {
              "id": "C0_3",
              "text": "für seine vielen Kurzfilme"
            }
          ],
          "correctAnswer": "C0_2",
          "correctAnswerText": "für Regie und Drehbuch seines ersten Spielfilms"
        },
        {
          "responseId": "RESPONSE1",
          "title": "Was hat der Regisseur nach dem Abitur zuerst studiert?​",
          "options": [
            {
              "id": "C1_0",
              "text": "Er studierte Philosophie, Politik und Volkswirtschaft."
            },
            {
              "id": "C1_1",
              "text": "Er hat ein Regie-Praktikum absolviert."
            },
            {
              "id": "C1_2",
              "text": "Donnersmark studierte Russisch in Leningrad."
            },
            {
              "id": "C1_3",
              "text": "Er hat in München Filmregie studiert.."
            }
          ],
          "correctAnswer": "C1_2",
          "correctAnswerText": "Donnersmark studierte Russisch in Leningrad."
        }
      ]
    },
    {
      "id": 29,
      "category": "Leseverstehen & Recherche • Filmsuche im Web",
      "rubricHtml": "<p><strong>Sie suchen daraufhin im Internet Informationen über den Film. Sie sehen das Suchergebnis: Diese Internet-Seiten haben Sie zur Auswahl.<strong><p>\n\n<p><em>Lesen Sie und ergänzen Sie die passende Nummer.<em><p>\n\n<p>&nbsp;<p>\n<div>",
      "images": [
        "media/S3_62810_Das_Leben_der_Anderen.PNG"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Zur Bearbeitung der Aufgabe geben Sie in das vorgesehene Schreibfeld die Nummer der passenden Internetseite ein. Verwenden Sie bitte keine zus&#228;tzlichen Leerzeichen.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "text-gap",
      "gaps": {
        "RESPONSE0": {
          "expected": "2",
          "validAnswers": [
            "2"
          ]
        },
        "RESPONSE1": {
          "expected": "4",
          "validAnswers": [
            "4"
          ]
        }
      },
      "templateHtml": "<div><div id=\"contentblock\"><p>Auf welcher Seite finden Sie eine Inhaltsangabe des Films?&nbsp;<p>\n\n<p><textEntryInteraction responseIdentifier=\"RESPONSE0\"><textEntryInteraction><p>\n\n<p>Auf welcher Seite können Sie erfahren, wo der Film gezeigt wird?&nbsp;<p>\n\n<p><textEntryInteraction responseIdentifier=\"RESPONSE1\"><textEntryInteraction><br><br>\n&nbsp;<p>\n<div><div>"
    },
    {
      "id": 30,
      "category": "Leseverstehen • Filmbeschreibung 'Das Leben der Anderen'",
      "rubricHtml": "<p><strong>Sie finden daraufhin diese Filmbeschreibung im Internet.<strong><p>\n\n<p><em>Lesen Sie den Text und wählen Sie aus.​.<em><p>\n<div>",
      "images": [
        "media/S3_63851_Leben_der_Anderen_1.jpg"
      ],
      "audio": null,
      "audios": null,
      "help": "<Downloadable> <customtype></customtype> <target>_self</target> <windowOpen></windowOpen> <URL></URL> <text><p>Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.</p> </text> <attachmentLink>showInHeader</attachmentLink> <loModes/> </Downloadable>",
      "type": "grouped-choice",
      "groups": [
        {
          "responseId": "RESPONSE0",
          "title": "Was für ein Film ist „Das Leben der Anderen“?​",
          "options": [
            {
              "id": "C0_0",
              "text": "eine Komödie über das politische Leben in der DDR"
            },
            {
              "id": "C0_1",
              "text": "ein Thriller über einen Stasi-Mitarbeiter und ein Paar, das überwacht wird"
            },
            {
              "id": "C0_2",
              "text": "eine Dokumentation über das Private in Film und Theater der 80er"
            },
            {
              "id": "C0_3",
              "text": "ein Drama über die Freundschaft zwischen einem Stasi-Hauptmann und einem Schauspieler"
            }
          ],
          "correctAnswer": "C0_1",
          "correctAnswerText": "ein Thriller über einen Stasi-Mitarbeiter und ein Paar, das überwacht wird"
        },
        {
          "responseId": "RESPONSE1",
          "title": "Welche Rolle spielt Ulrich Mühe?​",
          "options": [
            {
              "id": "C1_0",
              "text": "einen berühmten Theaterschauspieler"
            },
            {
              "id": "C1_1",
              "text": "einen Künstler aus Ost-Berlin"
            },
            {
              "id": "C1_2",
              "text": "einen Mitarbeiter der Stasi"
            },
            {
              "id": "C1_3",
              "text": "einen Staatsfeind der DDR"
            }
          ],
          "correctAnswer": "C1_2",
          "correctAnswerText": "einen Mitarbeiter der Stasi"
        }
      ]
    }
  ]
};
