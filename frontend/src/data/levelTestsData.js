// Auto-generated normalized Level Tests Data (A2, B1, B2)
export const LEVEL_TESTS = {
  "a2": {
    "id": "a2",
    "targetLevel": "A2",
    "prerequisiteLevel": "A1",
    "title": "Einstufungstest für Kursniveau A2",
    "subtitle": "Prüfung der A1-Vorkenntnisse • Cornelsen DaF",
    "description": "Um in den Deutschkurs auf dem Niveau A2 einzusteigen, überprüfen Sie mit diesem offiziellen Test Ihre A1-Kenntnisse in Hörverstehen, Leseverstehen, Wortschatz und Grammatik anhand von 30 praxisnahen Aufgaben.",
    "shortDescription": "Absolvieren Sie die A1-Prüfung, um Ihre Berechtigung für den A2-Kurs zu testen.",
    "soundCheckAudio": "/level-tests/a2/media/audio_q03.mp3",
    "totalQuestions": 30,
    "estimatedMinutes": 75,
    "quellen": "A1-Test Quellenverzeichnis:\nS. 1: Cornelsen / Karin Wagenblatt\nS. 2: Shutterstock.com / nickpeps\nS. 3: Shutterstock.com / nickpeps\nS. 4: Cornelsen / Roland Beier\nS. 5: Cornelsen / Roland Beier\nS. 6: Cornelsen / Roland Beier\nS. 7: Cornelsen / Shutterstock.com / kanate\nS. 8: BVG / Oliver Lang\nS. 9: Shutterstock.com / Iakov Filimonov\nS. 10: Shutterstock.com / Alisa24\nS. 11: Shutterstock.com / Antonio Guillem\nS. 12: Shutterstock.com / Iakov Filimonov\nS. 13: Shutterstock.com / Beate22\nS. 14: Shutterstock.com / Olena Yakobchuk\nS. 15: Shutterstock.com / lightwavemedia\nS. 16: Shutterstock.com / David Papazian\nS. 17: Shutterstock.com / lightwavemedia\nS. 18: Shutterstock.com / wavebreakmedia\nS. 19: Cornelsen / Shutterstock.com / Boris15\nS. 20: Deutsche Bahn AG / Oliver Lauer\nS. 21: Shutterstock.com / linerpics\nS. 22: Cornelsen / Shutterstock.com / RossHelen (Hausmannsturm); Alexander Erdbeer (Semperoper); mauritius images / Ernst Wrba (Palais im Großen Garten)\nS. 23: Shutterstock.com / vitmark\nS. 24: Shutterstock.com / sirtravelalot\nS. 25: Shutterstock.com / Shooting Star Studio\nS. 26: Cornelsen / Karin Wagenblatt\nS. 27: Shutterstock.com / Monkey Business Images\nS. 28: Shutterstock.com / Monkey Business Images\nS. 29: Shutterstock.com / fizkes\nS. 30: Lotto Rheinland-Pfalz GmbH / Cornelsen / Deutscher Genossenschafts-Verlag eG",
    "evaluationScale": [
      {
        "min": 90,
        "max": 100,
        "level": "A2 oder höher",
        "badge": "Ausgezeichnet",
        "description": "Ausgezeichnet! Sie haben hervorragende Kenntnisse im Bereich A1 und darüber hinausgehend. Machen Sie auf keinen Fall einen Kurs unterhalb A2. Wir empfehlen Ihnen auch noch den A2-Einstufungstest durchzuführen, da Ihre Kenntnisse vielleicht weitergehend sind, als Sie zunächst angenommen hatten."
      },
      {
        "min": 70,
        "max": 89,
        "level": "A1.2 (Aufbau)",
        "badge": "Sehr gut / Gut",
        "description": "Sie haben gute bis sehr gute Kenntnisse im Bereich A1 und können einen Kurs besuchen, der vom Lernniveau A1 zum Lernniveau A2 hinführt."
      },
      {
        "min": 50,
        "max": 69,
        "level": "A1.1 (Zweite Hälfte)",
        "badge": "Grundkenntnisse",
        "description": "Ihre Kenntnisse im Bereich A1 weisen ein paar Lücken auf. Wir empfehlen Ihnen den Besuch eines Kurses, der mit der zweiten Hälfte A1 beginnt."
      },
      {
        "min": 0,
        "max": 49,
        "level": "A1 Anfänger",
        "badge": "Einstieg",
        "description": "Wir empfehlen Ihnen einen Anfängerkurs A1."
      }
    ],
    "questions": [
      {
        "id": 1,
        "category": "Leseverstehen & E-Mail",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Sie haben eine E-Mail von Ihrem Freund Tim bekommen. Was antworten Sie ihm?</strong></p>\n<p><em>Lesen Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus. Führen Sie diesen Vorgang bei jedem Feld durch.",
        "images": [
          "/level-tests/a2/media/S3_62661_Afg_1.png"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Hallo Tim,</p>\n<p>ja, [[SELECT:RESPONSE0]]!</p>\n<p>[[SELECT:RESPONSE1]] soll ich kommen?</p>\n<p>[[SELECT:RESPONSE2]]</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "gerne"
              },
              {
                "id": "1",
                "text": "bitteschön"
              },
              {
                "id": "2",
                "text": "hallo"
              }
            ],
            "correct": "0",
            "correctText": "gerne"
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "Wann"
              },
              {
                "id": "1",
                "text": "Wer"
              },
              {
                "id": "2",
                "text": "Was"
              }
            ],
            "correct": "0",
            "correctText": "Wann"
          },
          "RESPONSE2": {
            "options": [
              {
                "id": "0",
                "text": "Viele Grüße"
              },
              {
                "id": "1",
                "text": "Auf Wiedersehen"
              },
              {
                "id": "2",
                "text": "Achtung"
              }
            ],
            "correct": "0",
            "correctText": "Viele Grüße"
          }
        }
      },
      {
        "id": 2,
        "category": "Alltagssituationen & Dialog",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Vor Tims Haus:  Was sagen Sie?</strong></p>\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus.",
        "images": [
          "/level-tests/a2/media/S3_61855_11.1215654055-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Hallo Tim.<br>\nIch bin es. Ich stehe bei dir vor dem Haus und weiß nicht, wo du wohnst. </p>\n<p>[[SELECT:RESPONSE0]]</p>\n<p>In welchem Stock?</p>\n<p>Und [[SELECT:RESPONSE1]]</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "Wo wohnst du?"
              },
              {
                "id": "1",
                "text": "Wer wohnt da?"
              },
              {
                "id": "2",
                "text": "Was machst du da?"
              }
            ],
            "correct": "0",
            "correctText": "Wo wohnst du?"
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "wie ist dein Familienname?"
              },
              {
                "id": "1",
                "text": "wer bist du?"
              },
              {
                "id": "2",
                "text": "wie geht es deiner Familie?"
              }
            ],
            "correct": "0",
            "correctText": "wie ist dein Familienname?"
          }
        }
      },
      {
        "id": 3,
        "category": "Hörverstehen & Begrüßung",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Tim antwortet Ihnen. Wo müssen Sie klingeln?</strong></p>\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_61855_11.1215654055-H.jpg"
        ],
        "audio": "/level-tests/a2/media/audio_q03.mp3",
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Schumann"
          },
          {
            "id": "C0_1",
            "text": "Lehmann"
          },
          {
            "id": "C0_2",
            "text": "Schulze"
          }
        ],
        "correctAnswer": "C0_0",
        "correctAnswerText": "Schumann"
      },
      {
        "id": 4,
        "category": "Hörverstehen & Wohnen",
        "type": "multiple-choice",
        "rubricHtml": "<p><strong>Sie kommen bei Tim an. Tim stellt Ihnen seine Familie vor.  Wen stellt Tim vor?</strong></p>\n<p><em>Hören Sie und wählen Sie aus.<span> </span>Es sind mehrere Antworten richtig. </em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und beantworten Sie die Frage, indem Sie die Felder neben den korrekten Antworten durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_14653_723_img.jpg"
        ],
        "audio": "/level-tests/a2/media/audio_q04.mp3",
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Ehefrau"
          },
          {
            "id": "C0_1",
            "text": "Tochter"
          },
          {
            "id": "C0_2",
            "text": "Mutter"
          },
          {
            "id": "C0_3",
            "text": "Onkel"
          },
          {
            "id": "C0_4",
            "text": "Schwester"
          },
          {
            "id": "C0_5",
            "text": "Sohn"
          },
          {
            "id": "C0_6",
            "text": "Tante"
          },
          {
            "id": "C0_7",
            "text": "Vater"
          }
        ],
        "correctAnswers": [
          "C0_0",
          "C0_1",
          "C0_7"
        ],
        "correctAnswerTexts": [
          "Ehefrau",
          "Tochter",
          "Vater"
        ],
        "maxChoices": 3
      },
      {
        "id": 5,
        "category": "Wortschatz & Küche",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Sie lernen Tims Mutter kennen. Wie stellen Sie sich vor? </strong></p>\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus.",
        "images": [
          "/level-tests/a2/media/S3_14632_620_img.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Guten Tag. Mein Name [[SELECT:RESPONSE0]] … . Ich bin [[SELECT:RESPONSE1]] von Tim. Und [[SELECT:RESPONSE2]] heißen Sie?</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "ist"
              },
              {
                "id": "1",
                "text": "heißt"
              },
              {
                "id": "2",
                "text": "nennt sich"
              }
            ],
            "correct": "0",
            "correctText": "ist"
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "ein Freund/eine Freundin"
              },
              {
                "id": "1",
                "text": "ein Bruder/eine Schwester"
              },
              {
                "id": "2",
                "text": "ein Nachbar/eine Nachbarin"
              }
            ],
            "correct": "0",
            "correctText": "ein Freund/eine Freundin"
          },
          "RESPONSE2": {
            "options": [
              {
                "id": "0",
                "text": "wie"
              },
              {
                "id": "1",
                "text": "wie viel"
              },
              {
                "id": "2",
                "text": "wo"
              }
            ],
            "correct": "0",
            "correctText": "wie"
          }
        }
      },
      {
        "id": 6,
        "category": "Wortschatz & Haushaltsgeräte",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Im Wohnzimmer: Welches Bild passt zu welchem Dialog?</strong></p>\n<p><br>\n<em>Ergänzen Sie die Nummer.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in die Schreibfelder die Nummer des passenden Bildes ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/a2/media/S3_14633_621_img.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>A:</strong> Oma, dein Kuchen war sehr gut!<br>\n<strong>B:</strong> Ja? Wie viele Stücke hast du denn gegessen?<br>\nBild [[INPUT:RESPONSE0]]</p>\n<p><strong>C:</strong> Von wem hast du denn die schönen Blumen?<br>\n<strong>D:</strong> Von meiner Frau. Ich liebe Rosen!<br>\nBild [[INPUT:RESPONSE1]]</p>\n<p><strong>E:</strong> Möchtest du auch Bier?<br>\n<strong>F:</strong> Nein, danke. Ich trinke nur Wasser.<br>\nBild [[INPUT:RESPONSE2]]</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "2"
            ],
            "primaryAnswer": "2"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "1"
            ],
            "primaryAnswer": "1"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "3"
            ],
            "primaryAnswer": "3"
          }
        }
      },
      {
        "id": 7,
        "category": "Wortschatz & Einkaufen",
        "type": "multiple-choice",
        "rubricHtml": "<p><strong>Sie wollen einkaufen gehen und schreiben vorher eine Einkaufsliste.  In welche Geschäfte müssen Sie gehen? </strong></p>\n<p>Wählen Sie drei Geschäfte aus.</p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie die Felder neben den korrekten Antworten durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_61500_GER_Test_A1_Einkaufszettel.jpg"
        ],
        "audio": null,
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Bäckerei"
          },
          {
            "id": "C0_1",
            "text": "Post"
          },
          {
            "id": "C0_2",
            "text": "Supermarkt"
          },
          {
            "id": "C0_3",
            "text": "Apotheke"
          },
          {
            "id": "C0_4",
            "text": "Buchladen"
          },
          {
            "id": "C0_5",
            "text": "Getränkemarkt"
          },
          {
            "id": "C0_6",
            "text": "Schuhgeschäft"
          }
        ],
        "correctAnswers": [
          "C0_0",
          "C0_1",
          "C0_2"
        ],
        "correctAnswerTexts": [
          "Bäckerei",
          "Post",
          "Supermarkt"
        ],
        "maxChoices": 3
      },
      {
        "id": 8,
        "category": "Orientierung & Öffentlicher Verkehr",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Sie wollen mit der Straßenbahn ins Stadtzentrum fahren. Bis ins Zentrum sind es fünf Stationen.  Welche Fahrkarte müssen Sie kaufen?   </strong></p>\n<p>Wählen Sie aus. <strong> </strong></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_63606_9783464247549_DIGI_BVG_190604_001_Bildschirm_Lang.jpg"
        ],
        "audio": null,
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Einzelfahrt (1 Stunde) 1,90€"
          },
          {
            "id": "C0_1",
            "text": "Kurzstrecke (4 Stationen) 1,60€"
          },
          {
            "id": "C0_2",
            "text": "Familienkarte (2 Zonen) 4,50€"
          },
          {
            "id": "C0_3",
            "text": "Wochenkarte (2 Zonen) 12,00€"
          },
          {
            "id": "C0_4",
            "text": "Monatskarte (2 Zonen) 45,00€"
          }
        ],
        "correctAnswer": "C0_0",
        "correctAnswerText": "Einzelfahrt (1 Stunde) 1,90€"
      },
      {
        "id": 9,
        "category": "Hörverstehen & Preise",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Sie kaufen Obst auf dem Markt. Der Obsthändler sagt Ihnen die Preise.</strong></p>\n<p><em>Hören Sie und ergänzen Sie die Preise (X,XX).</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und beantworten Sie die Fragen, indem Sie die richtigen Preise in die vorgesehenen Schreibfelder eintragen.",
        "images": [
          "/level-tests/a2/media/S3_61840_11.646350211-H.jpg"
        ],
        "audio": "/level-tests/a2/media/audio_q09.mp3",
        "audios": null,
        "templateHtml": "<p><strong>Wie viel kostet ein Kilo Äpfel?</strong><br>\n[[INPUT:RESPONSE0]] Euro</p>\n<p><strong>Wie viel kostet ein Kilo Orangen?</strong><br>\n[[INPUT:RESPONSE1]] Euro</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "1,50",
              "1.50"
            ],
            "primaryAnswer": "1,50"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "2,00",
              "2.00",
              "2"
            ],
            "primaryAnswer": "2,00"
          }
        }
      },
      {
        "id": 10,
        "category": "Einkaufen & Verkaufsgespräch",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Auf dem Markt:  Sie haben eine schöne Blume gefunden. Sie sehen aber keinen Preis.</strong></p>\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_61837_11.544291555-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Wie fragen Sie nach dem Preis?</strong></p>\n<p>[[CHOICE_GROUP:RESPONSE0]]</p>\n<p><strong>Sie wollen die Blume in einer anderen Farbe. Wie fragen Sie?</strong></p>\n<p>[[CHOICE_GROUP:RESPONSE1]]</p>",
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": null,
            "options": [
              {
                "id": "C0_0",
                "text": "Entschuldigung. Wie viel kostet die Blume?"
              },
              {
                "id": "C0_1",
                "text": "Entschuldigung. Kostet die Blume 1 Euro?"
              },
              {
                "id": "C0_2",
                "text": "Entschuldigung. Wie lang ist die Blume?"
              }
            ],
            "correct": "C0_0",
            "correctText": "Entschuldigung. Wie viel kostet die Blume?"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": null,
            "options": [
              {
                "id": "C1_0",
                "text": "Haben Sie diese Blume auch in anderen Farben?"
              },
              {
                "id": "C1_1",
                "text": "Kann ich diese Blume umtauschen?"
              },
              {
                "id": "C1_2",
                "text": "Welche Farbe hat diese Blume?"
              }
            ],
            "correct": "C1_0",
            "correctText": "Haben Sie diese Blume auch in anderen Farben?"
          }
        ]
      },
      {
        "id": 11,
        "category": "Hörverstehen & An der Kasse",
        "type": "grouped-choice",
        "rubricHtml": "<p><b>In der Apotheke: Sie haben Kopfschmerzen und wollen Tabletten kaufen. Die Apothekerin hat zwei Medikamente. </b></p>\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie den Text und beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_61844_11.748964644-H.jpg"
        ],
        "audio": "/level-tests/a2/media/audio_q11.mp3",
        "audios": null,
        "templateHtml": "<p><strong>Welches Medikament ist billiger?</strong><br>\n[[CHOICE_GROUP:RESPONSE0]]</p>\n<p><strong>Wie viele Tabletten sind in einer Packung?</strong><br>\n[[CHOICE_GROUP:RESPONSE1]]</p>",
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": null,
            "options": [
              {
                "id": "C0_0",
                "text": "Relaxin"
              },
              {
                "id": "C0_1",
                "text": "Dolornix"
              },
              {
                "id": "C0_2",
                "text": "Beide Medikamente haben den gleichen Preis."
              }
            ],
            "correct": "C0_0",
            "correctText": "Relaxin"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": null,
            "options": [
              {
                "id": "C1_0",
                "text": "30"
              },
              {
                "id": "C1_1",
                "text": "3"
              },
              {
                "id": "C1_2",
                "text": "13"
              }
            ],
            "correct": "C1_0",
            "correctText": "30"
          }
        ]
      },
      {
        "id": 12,
        "category": "Wortschatz & Familie",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Im Buchladen:  Sie sprechen mit dem Verkäufer. Sie möchten ein Buch zurückgeben. </strong></p>\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus.",
        "images": [
          "/level-tests/a2/media/S3_61851_11.1189592065-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Sie: Guten Tag. Ich möchte dieses Buch zurückgeben. [[SELECT:RESPONSE0]]</p>\n<p>Verkäufer: Naja, wir können das Buch [[SELECT:RESPONSE1]]. Ich kann Ihnen aber nicht das Geld zurückgeben. [[SELECT:RESPONSE2]] Sie können ein anderes Buch nehmen oder Sie nehmen einen Gutschein.</p>\n<p>Sie: Dann nehme ich den Gutschein. Vielen Dank.</p>\n<p>Verkäufer: Bitte. Auf Wiedersehen. [[SELECT:RESPONSE3]]</p>\n<p>Sie: Danke. [[SELECT:RESPONSE4]]</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "Geht das?"
              },
              {
                "id": "1",
                "text": "Mache ich das?"
              },
              {
                "id": "2",
                "text": "Wie finden Sie das?"
              }
            ],
            "correct": "0",
            "correctText": "Geht das?"
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "zurücknehmen"
              },
              {
                "id": "1",
                "text": "schreiben"
              },
              {
                "id": "2",
                "text": "lesen"
              }
            ],
            "correct": "0",
            "correctText": "zurücknehmen"
          },
          "RESPONSE2": {
            "options": [
              {
                "id": "0",
                "text": "Das tut mir leid."
              },
              {
                "id": "1",
                "text": "Das tut mir nicht leid."
              },
              {
                "id": "2",
                "text": "Das tut mir weh!"
              }
            ],
            "correct": "0",
            "correctText": "Das tut mir leid."
          },
          "RESPONSE3": {
            "options": [
              {
                "id": "0",
                "text": "Ein schönes Wochenende!"
              },
              {
                "id": "1",
                "text": "Viel Spaß!"
              },
              {
                "id": "2",
                "text": "Herzlich Willkommen!"
              }
            ],
            "correct": "0",
            "correctText": "Ein schönes Wochenende!"
          },
          "RESPONSE4": {
            "options": [
              {
                "id": "0",
                "text": "Auf Wiedersehen!"
              },
              {
                "id": "1",
                "text": "Liebe Grüße!"
              },
              {
                "id": "2",
                "text": "Viel Glück!"
              }
            ],
            "correct": "0",
            "correctText": "Auf Wiedersehen!"
          }
        }
      },
      {
        "id": 13,
        "category": "Freizeit & Hobbys",
        "type": "multiple-choice",
        "rubricHtml": "<p><b>Sie besuchen einen Freund. Was gibt es zum Frühstück?</b></p>\n<p><em>Sehen Sie den Tisch an und wählen Sie die Lebensmittel aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie die Felder neben den korrekten Antworten durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_61843_11.686254462-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Brot"
          },
          {
            "id": "C0_1",
            "text": "Joghurt"
          },
          {
            "id": "C0_2",
            "text": "Kaffee"
          },
          {
            "id": "C0_3",
            "text": "Käse"
          },
          {
            "id": "C0_4",
            "text": "Milch"
          },
          {
            "id": "C0_5",
            "text": "Ananas"
          },
          {
            "id": "C0_6",
            "text": "Brötchen"
          },
          {
            "id": "C0_7",
            "text": "Ei"
          },
          {
            "id": "C0_8",
            "text": "Saft"
          },
          {
            "id": "C0_9",
            "text": "Wurst"
          }
        ],
        "correctAnswers": [
          "C0_1",
          "C0_2",
          "C0_3",
          "C0_4",
          "C0_6"
        ],
        "correctAnswerTexts": [
          "Joghurt",
          "Kaffee",
          "Käse",
          "Milch",
          "Brötchen"
        ],
        "maxChoices": 5
      },
      {
        "id": 14,
        "category": "Leseverstehen & Einladung",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Im Eiscafé:  Sie wollen einen Schoko-Eisbecher essen. Wie bestellen Sie? </strong></p>\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren",
        "images": [
          "/level-tests/a2/media/S3_61838_11.492002995-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Einen Schoko-Eisbecher, bitte."
          },
          {
            "id": "C0_1",
            "text": "Nehmen Sie einen Schoko-Eisbecher, bitte."
          },
          {
            "id": "C0_2",
            "text": "Wie ist der Schoko-Eisbecher?"
          }
        ],
        "correctAnswer": "C0_0",
        "correctAnswerText": "Einen Schoko-Eisbecher, bitte."
      },
      {
        "id": 15,
        "category": "Grammatik & Tagesablauf",
        "type": "inline-dropdown",
        "rubricHtml": "<p><b>Beim Kaffeetrinken: Sie sind bei Andrea eingeladen. Was sagen sie?</b></p>\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus.",
        "images": [
          "/level-tests/a2/media/S3_61832_11.153038393-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Sie: Mmh, die Kekse sind [[SELECT:RESPONSE0]]. Hast du die selbst gemacht?</p>\n<p>Andrea: Ja, natürlich. Möchtest du noch mehr?</p>\n<p>Sie: Nein, [[SELECT:RESPONSE1]]. Aber ich nehme gern noch Kaffee.</p>\n<p>Andrea: [[SELECT:RESPONSE2]], bitte. Ich muss erst neuen Kaffee machen.</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "gut"
              },
              {
                "id": "1",
                "text": "mag ich"
              },
              {
                "id": "2",
                "text": "schmecken"
              }
            ],
            "correct": "0",
            "correctText": "gut"
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "danke"
              },
              {
                "id": "1",
                "text": "tschüs"
              },
              {
                "id": "2",
                "text": "bitte"
              }
            ],
            "correct": "0",
            "correctText": "danke"
          },
          "RESPONSE2": {
            "options": [
              {
                "id": "0",
                "text": "Einen Moment"
              },
              {
                "id": "1",
                "text": "In Ordnung"
              },
              {
                "id": "2",
                "text": "Vorsicht"
              }
            ],
            "correct": "0",
            "correctText": "Einen Moment"
          }
        }
      },
      {
        "id": 16,
        "category": "Gesundheit & Beim Arzt",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Sie müssen gehen und Sie verabschieden sich an der Tür. Was sagen Sie? </strong></p>\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_62000_11.183432542-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Danke und bis bald!"
          },
          {
            "id": "C0_1",
            "text": "Super! Ich kann gehen."
          },
          {
            "id": "C0_2",
            "text": "Tschüs! Viel Glück!"
          }
        ],
        "correctAnswer": "C0_0",
        "correctAnswerText": "Danke und bis bald!"
      },
      {
        "id": 17,
        "category": "Hörverstehen & Terminvereinbarung",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Sie wollen Ihre Freundin Andrea in ein Restaurant einladen. Sie fragen sie, was sie gerne mag. Welches Restaurant passt am besten?</strong></p>\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_61833_11.154947881-H.jpg"
        ],
        "audio": "/level-tests/a2/media/audio_q17.mp3",
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Restaurant „Neptun“ – Meeresfrüchte und Fischgerichte frisch auf den Tisch"
          },
          {
            "id": "C0_1",
            "text": "Gasthof „Zur Linde“ – traditionelle deutsche Küche aus Omas Zeit"
          },
          {
            "id": "C0_2",
            "text": "Pizzeria „Napoli“ – italienische Spezialitäten aus Alfredos Meisterhand"
          }
        ],
        "correctAnswer": "C0_0",
        "correctAnswerText": "Restaurant „Neptun“ – Meeresfrüchte und Fischgerichte frisch auf den Tisch"
      },
      {
        "id": 18,
        "category": "Alltag & Im Restaurant",
        "type": "inline-dropdown",
        "rubricHtml": "<p><b>Im Bistro: Sie möchten etwas bestellen. Der Kellner kommt. </b></p>\n<p><em>Wählen Sie aus. Jeder Satz wird nur ein Mal verwendet. </em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus.",
        "images": [
          "/level-tests/a2/media/S3_61842_11.710184487-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Kellner: Bitte schön? Was nehmen Sie?</p>\n<p>Sie: [[SELECT:RESPONSE0]]</p>\n<p>Kellner: Was möchten Sie trinken?</p>\n<p>Sie: [[SELECT:RESPONSE1]]</p>\n<p>Kellner: Mit Milch und Zucker?</p>\n<p>Sie: [[SELECT:RESPONSE2]]</p>\n<p>Kellner: Ist das alles?</p>\n<p>Sie: [[SELECT:RESPONSE3]]</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "Ich nehme ein Sandwich mit Käse."
              },
              {
                "id": "1",
                "text": "Ja, mit Milch bitte, aber ohne Zucker."
              },
              {
                "id": "2",
                "text": "Ja, danke."
              },
              {
                "id": "3",
                "text": "Einen Kaffee, bitte."
              }
            ],
            "correct": "0",
            "correctText": "Ich nehme ein Sandwich mit Käse."
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "Einen Kaffee, bitte."
              },
              {
                "id": "1",
                "text": "Ja, mit Milch bitte, aber ohne Zucker."
              },
              {
                "id": "2",
                "text": "Ja, danke."
              },
              {
                "id": "3",
                "text": "Ich nehme ein Sandwich mit Käse."
              }
            ],
            "correct": "0",
            "correctText": "Einen Kaffee, bitte."
          },
          "RESPONSE2": {
            "options": [
              {
                "id": "0",
                "text": "Ja, mit Milch bitte, aber ohne Zucker."
              },
              {
                "id": "1",
                "text": "Einen Kaffee, bitte."
              },
              {
                "id": "2",
                "text": "Ja, danke."
              },
              {
                "id": "3",
                "text": "Ich nehme ein Sandwich mit Käse."
              }
            ],
            "correct": "0",
            "correctText": "Ja, mit Milch bitte, aber ohne Zucker."
          },
          "RESPONSE3": {
            "options": [
              {
                "id": "0",
                "text": "Ja, danke."
              },
              {
                "id": "1",
                "text": "Ja, mit Milch bitte, aber ohne Zucker."
              },
              {
                "id": "2",
                "text": "Ich nehme ein Sandwich mit Käse."
              },
              {
                "id": "3",
                "text": "Einen Kaffee, bitte."
              }
            ],
            "correct": "0",
            "correctText": "Ja, danke."
          }
        }
      },
      {
        "id": 19,
        "category": "Leseverstehen & Wetterbericht",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Sie möchten die Stadt Dresden besuchen und finden zwei Wetterberichte im Internet. Ist das in beiden Wetterberichten identisch/gleich?</strong></p>\n<p><em>Lesen Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_63852_Wettervorhersage1.PNG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Viel Regen in Dresden.</p>\n<p>[[SELECT:RESPONSE0]]</p>\n<p>Circa 16 Grad in Dresden.</p>\n<p>[[SELECT:RESPONSE1]]</p>\n<p>Kein Wind in Dresden.</p>\n<p>[[SELECT:RESPONSE2]]</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "ja"
              },
              {
                "id": "1",
                "text": "nein"
              }
            ],
            "correct": "1",
            "correctText": "nein"
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "ja"
              },
              {
                "id": "1",
                "text": "nein"
              }
            ],
            "correct": "0",
            "correctText": "ja"
          },
          "RESPONSE2": {
            "options": [
              {
                "id": "0",
                "text": "ja"
              },
              {
                "id": "1",
                "text": "nein"
              }
            ],
            "correct": "0",
            "correctText": "ja"
          }
        }
      },
      {
        "id": 20,
        "category": "Hörverstehen & Durchsage im Zug",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Im Zug hören Sie eine Durchsage. Was sagt der Schaffner?</strong></p>\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie den Text und beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_61857_DEUTBA_190416_001_DB116783.jpg"
        ],
        "audio": "/level-tests/a2/media/audio_q20.mp3",
        "audios": null,
        "templateHtml": "<p><strong>Welche Haltestelle ist die nächste?</strong><br>\n[[CHOICE_GROUP:RESPONSE0]]</p>\n<p><strong>Wann fährt der Zug nach Meißen?</strong><br>\n[[CHOICE_GROUP:RESPONSE1]]</p>",
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": null,
            "options": [
              {
                "id": "C0_0",
                "text": "Dresden-Neustadt"
              },
              {
                "id": "C0_1",
                "text": "Dresden-Flughafen"
              },
              {
                "id": "C0_2",
                "text": "Dresden Hauptbahnhof"
              }
            ],
            "correct": "C0_0",
            "correctText": "Dresden-Neustadt"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": null,
            "options": [
              {
                "id": "C1_0",
                "text": "13:15 Uhr"
              },
              {
                "id": "C1_1",
                "text": "7:00 Uhr"
              },
              {
                "id": "C1_2",
                "text": "13:00 Uhr"
              }
            ],
            "correct": "C1_0",
            "correctText": "13:15 Uhr"
          }
        ]
      },
      {
        "id": 21,
        "category": "Grammatik & Höfliche Bitte",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>In der Tourist-Information:  Sie fragen nach Informationsbroschüren über die Stadt. Wie fragen Sie?</strong></p>\n<p><em>Wählen Sie aus. </em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus.",
        "images": [
          "/level-tests/a2/media/S3_62963_11.53356627-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Guten Tag. [[SELECT:RESPONSE0]] mir bitte Informationsmaterial über Dresden geben?</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "Können Sie"
              },
              {
                "id": "1",
                "text": "Haben Sie"
              },
              {
                "id": "2",
                "text": "Müssen Sie"
              }
            ],
            "correct": "0",
            "correctText": "Können Sie"
          }
        }
      },
      {
        "id": 22,
        "category": "Leseverstehen & Sehenswürdigkeiten",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Sie informieren sich über Sehenswürdigkeiten und Veranstaltungen in Dresden. Was ist richtig?</strong></p>\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in die Schreibfelder die Nummer des passenden Bildes ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/a2/media/S3_63608_9783464247549_DIGI_11.686827978-H.jpg",
          "/level-tests/a2/media/S3_63607_9783464247549_DIGI_16.1097374-H__1_.jpg",
          "/level-tests/a2/media/S3_63609_9783464247549_DIGI_11.230867077-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>1. Schlossturm: Schlossplatz, Georgenbau, April-Okt. Di-So 10-18 Uhr; Erwachsene 3,50 €, Ermäßigt 2 €</p>\n<p>2. Der Große Garten ist ein sehr schöner, alter Park. Viele Menschen treiben dort Sport. Sie fahren Rad, spielen Golf und joggen.</p>\n<p>3. „Die Zauberflöte“ von Mozart in der Semperoper, 05.10.-28.11., Karten: 48,-€ im Vorverkauf<br>\n </p>\n<p>Sie können den Schlossturm im November besichtigen.</p>\n<p>[[CHOICE_GROUP:RESPONSE0]]</p>\n<p>Den Schlossturm können Sie im Mai montags besichtigen.</p>\n<p>[[CHOICE_GROUP:RESPONSE1]]</p>\n<p>Sie können die Zauberflöte im November sehen.</p>\n<p>[[CHOICE_GROUP:RESPONSE2]]</p>\n<p>Im Großen Garten können Sie joggen gehen. </p>\n<p>[[CHOICE_GROUP:RESPONSE3]]</p>",
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": null,
            "options": [
              {
                "id": "C0_0",
                "text": "richtig"
              },
              {
                "id": "C0_1",
                "text": "falsch"
              }
            ],
            "correct": "C0_1",
            "correctText": "falsch"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": null,
            "options": [
              {
                "id": "C1_0",
                "text": "richtig"
              },
              {
                "id": "C1_1",
                "text": "falsch"
              }
            ],
            "correct": "C1_1",
            "correctText": "falsch"
          },
          {
            "id": "RESPONSE2",
            "responseId": "RESPONSE2",
            "title": null,
            "options": [
              {
                "id": "C2_0",
                "text": "richtig"
              },
              {
                "id": "C2_1",
                "text": "falsch"
              }
            ],
            "correct": "C2_0",
            "correctText": "richtig"
          },
          {
            "id": "RESPONSE3",
            "responseId": "RESPONSE3",
            "title": null,
            "options": [
              {
                "id": "C3_0",
                "text": "richtig"
              },
              {
                "id": "C3_1",
                "text": "falsch"
              }
            ],
            "correct": "C3_0",
            "correctText": "richtig"
          }
        ]
      },
      {
        "id": 23,
        "category": "Hörverstehen & Führung",
        "type": "text-gap",
        "rubricHtml": "<p><b>Besuch der Gläsernen Manufaktur: Man muss sich anmelden. Sie rufen an. Eine Frau sagt Ihnen, wann die nächste Führung ist. Wann können Sie an einer Führung teilnehmen?</b></p>\n<p><em>Hören Sie und ergänzen Sie Wochentag und Uhrzeit. (Beispiel: Montag  11.45)</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und beantworten Sie die Frage, indem Sie in die vorgesehenen Schreibfelder jeweils die richtige Information schreiben, um das Gehörte wiederzugeben.",
        "images": [
          "/level-tests/a2/media/S3_61828_11.84981487-H.jpg"
        ],
        "audio": "/level-tests/a2/media/audio_q23.mp3",
        "audios": null,
        "templateHtml": "<p>am [[INPUT:RESPONSE0]] um [[INPUT:RESPONSE1]] Uhr</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "Sonntag",
              "sonntag",
              "sontag",
              "Sontag"
            ],
            "primaryAnswer": "Sonntag"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "15:30",
              "15.30",
              "15 30"
            ],
            "primaryAnswer": "15:30"
          }
        }
      },
      {
        "id": 24,
        "category": "Satzbau & Wegbeschreibung",
        "type": "order-sequence",
        "rubricHtml": "<p><strong>Nach Ihrem Besuch müssen Sie zurück zum Hauptbahnhof. Sie fragen eine Passantin nach dem Weg. </strong></p>\n<p><em>Ordnen Sie den Dialog.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe ordnen Sie die Dialogteile in die richtige Reihenfolge. Sie können Ihre Wahl jederzeit ändern. Ziehen Sie einfach den Dialogteil an eine andere Stelle.",
        "images": [
          "/level-tests/a2/media/S3_61841_11.659993368-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "items": [
          {
            "id": "SC0",
            "text": "Entschuldigung. Wo ist der Hauptbahnhof?"
          },
          {
            "id": "SC1",
            "text": "Also, Sie müssen zuerst über den Marktplatz gehen. Dort ist die Prager Straße. Gehen Sie die Prager Straße entlang bis zum Bahnhof."
          },
          {
            "id": "SC2",
            "text": "Ist der Hauptbahnhof am Ende der Prager Straße?"
          },
          {
            "id": "SC3",
            "text": "Ja. Sie laufen dann direkt auf den Hauptbahnhof zu."
          },
          {
            "id": "SC4",
            "text": "Vielen Dank! Auf Wiedersehen!"
          },
          {
            "id": "SC5",
            "text": "Gern geschehen! Auf Wiedersehen."
          }
        ],
        "correctOrder": [
          "SC0",
          "SC1",
          "SC2",
          "SC3",
          "SC4",
          "SC5"
        ],
        "correctOrderTexts": [
          "Entschuldigung. Wo ist der Hauptbahnhof?",
          "Also, Sie müssen zuerst über den Marktplatz gehen. Dort ist die Prager Straße. Gehen Sie die Prager Straße entlang bis zum Bahnhof.",
          "Ist der Hauptbahnhof am Ende der Prager Straße?",
          "Ja. Sie laufen dann direkt auf den Hauptbahnhof zu.",
          "Vielen Dank! Auf Wiedersehen!",
          "Gern geschehen! Auf Wiedersehen."
        ]
      },
      {
        "id": 25,
        "category": "Hörverstehen & Bewerbungsgespräch",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Sie haben sich bei einer Firma beworben. Sie haben noch keine Antwort. Sie rufen dort an. Was sagt der Sekretär?</strong></p>\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie den Text und beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_61846_11.758052616-H.jpg"
        ],
        "audio": "/level-tests/a2/media/audio_q25.mp3",
        "audios": null,
        "templateHtml": "<p><strong>Wann sollen Sie zum Bewerbungsgespräch kommen?</strong><br>\n[[CHOICE_GROUP:RESPONSE0]]</p>\n<p><strong>Wie lange dauert das Bewerbungsgespräch wahrscheinlich?</strong><br>\n[[CHOICE_GROUP:RESPONSE1]]</p>",
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": null,
            "options": [
              {
                "id": "C0_0",
                "text": "Montag"
              },
              {
                "id": "C0_1",
                "text": "Donnerstag"
              },
              {
                "id": "C0_2",
                "text": "Nächsten Monat"
              }
            ],
            "correct": "C0_0",
            "correctText": "Montag"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": null,
            "options": [
              {
                "id": "C1_0",
                "text": "30 Minuten"
              },
              {
                "id": "C1_1",
                "text": "20 Minuten"
              },
              {
                "id": "C1_2",
                "text": "40 Minuten"
              }
            ],
            "correct": "C1_0",
            "correctText": "30 Minuten"
          }
        ]
      },
      {
        "id": 26,
        "category": "Leseverstehen & Information suchen",
        "type": "text-gap",
        "rubricHtml": "<p><b>Sie wollen ein Buch über Bewerbungsgespräche lesen. Sie möchten eines von der Bibliothek ausleihen. Das Problem: Es ist Samstag 11 Uhr! Welche Bibliothek hat noch geöffnet?</b></p>\n<p><em>Ergänzen<em> </em>Sie die Nummer der geöffneten Bibliothek. </em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in das Schreibfeld die Zahl der passenden Bibliothek ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/a2/media/S3_61501_GER_Test_A1_Bibliotheken.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Bibliothek Nummer [[INPUT:RESPONSE0]] hat noch geöffnet.</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "3"
            ],
            "primaryAnswer": "3"
          }
        }
      },
      {
        "id": 27,
        "category": "Hörverstehen & Am Telefon",
        "type": "grouped-choice",
        "rubricHtml": "<p><b>Bei der Arbeit: Das Telefon klingelt. Herr Meier ruft an. Wie antworten Sie? </b></p>\n<p><em>Hören Sie und wählen Sie aus. </em></p>",
        "promptHtml": "",
        "help": "Klicken Sie bei 1, beziehungsweise 2 auf das Feld \"Play\". Hören Sie die Texte und bearbeiten Sie die Aufgabe, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/a2/media/S3_61839_11.633287756-H.jpg"
        ],
        "audio": "/level-tests/a2/media/audio_q27.mp3",
        "audios": null,
        "templateHtml": "<p><strong>Ihre Antwort auf Frage 1:</strong></p>\n<p>[[CHOICE_GROUP:RESPONSE0]]</p>\n<p><strong>Ihre Antwort auf Frage 2:</strong></p>\n<p>[[CHOICE_GROUP:RESPONSE1]]</p>",
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": null,
            "options": [
              {
                "id": "C0_0",
                "text": "Tut mir leid! Sie ist nicht da."
              },
              {
                "id": "C0_1",
                "text": "Vielen Dank. Ich sage es Frau Kramer."
              },
              {
                "id": "C0_2",
                "text": "Wir haben nur noch 1 Stunde geöffnet."
              }
            ],
            "correct": "C0_0",
            "correctText": "Tut mir leid! Sie ist nicht da."
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": null,
            "options": [
              {
                "id": "C1_0",
                "text": "Heute leider nicht mehr, aber morgen vielleicht."
              },
              {
                "id": "C1_1",
                "text": "Gestern, aber nur bis 12 Uhr."
              },
              {
                "id": "C1_2",
                "text": "Sie war krank."
              }
            ],
            "correct": "C1_0",
            "correctText": "Heute leider nicht mehr, aber morgen vielleicht."
          }
        ]
      },
      {
        "id": 28,
        "category": "Hörverstehen & Telefonnotiz",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Ihre Kollegin soll Herrn Meier nächste Woche zurückrufen. Herr Meier gibt Ihnen seine Telefonnummer. </strong></p>\n<p><i>Hören Sie </i><em>und ergänzen Sie die Telefonnummer.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und bearbeiten Sie die Aufgabe, indem Sie in das vorgesehene Schreibfeld die Telefonnummer schreiben. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/a2/media/S3_61839_11.633287756-H.jpg"
        ],
        "audio": "/level-tests/a2/media/audio_q28.mp3",
        "audios": null,
        "templateHtml": "<p>Die Telefonnummer von Herrn Meier ist: [[INPUT:RESPONSE0]]</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "01622081430",
              "0 1 6 2 2 0 8 1 4 3 0"
            ],
            "primaryAnswer": "01622081430"
          }
        }
      },
      {
        "id": 29,
        "category": "Satzbau & Gespräch am Arbeitsplatz",
        "type": "order-sequence",
        "rubricHtml": "<p><strong>Das Kind von Ihrem Kollegen ist krank. Er muss in die Schule fahren und sein Kind abholen. Er redet mit der Chefin. </strong></p>\n<p><em>Ordnen Sie den Dialog. </em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe ordnen Sie die Dialogteile in die richtige Reihenfolge. Sie können Ihre Wahl jederzeit ändern. Ziehen Sie einfach den Dialogteil an eine andere Stelle.",
        "images": [
          "/level-tests/a2/media/S3_61850_11.1007757580-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "items": [
          {
            "id": "SC0",
            "text": "Entschuldigen Sie, bitte. Mein Kind ist krank. Ich muss in die Schule. Kann ich für 2 Stunden weg?"
          },
          {
            "id": "SC1",
            "text": "Ja, natürlich! Können Sie um 14 Uhr wieder da sein?"
          },
          {
            "id": "SC2",
            "text": "Ich bin mir nicht sicher. Vielleicht bin ich erst 15 Uhr wieder da."
          },
          {
            "id": "SC3",
            "text": "Na gut. In Ordnung. Bis dann."
          }
        ],
        "correctOrder": [
          "SC0",
          "SC1",
          "SC2",
          "SC3"
        ],
        "correctOrderTexts": [
          "Entschuldigen Sie, bitte. Mein Kind ist krank. Ich muss in die Schule. Kann ich für 2 Stunden weg?",
          "Ja, natürlich! Können Sie um 14 Uhr wieder da sein?",
          "Ich bin mir nicht sicher. Vielleicht bin ich erst 15 Uhr wieder da.",
          "Na gut. In Ordnung. Bis dann."
        ]
      },
      {
        "id": 30,
        "category": "Leseverstehen & Formulare",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Sie brauchen verschiedene Formulare. Welches Formular brauchen Sie wofür? </strong></p>\n<p><em>Ergänzen Sie die passenden Nummern. </em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie in die jeweiligen Schreibfelder die Nummer des passenden Formulars eingeben. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/a2/media/S3_63610_Lotto__vhs_Anmeldung___berweisung.JPG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Sie wollen einen Kurs an der Volkshochschule buchen.</strong><br>\nFormular [[INPUT:RESPONSE0]]</p>\n<p><strong>Sie wollen bei einem Quiz oder Gewinnspiel mitmachen.</strong><br>\nFormular [[INPUT:RESPONSE1]]</p>\n<p><strong>Sie wollen eine Rechnung bezahlen.</strong><br>\nFormular [[INPUT:RESPONSE2]]</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "2"
            ],
            "primaryAnswer": "2"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "1"
            ],
            "primaryAnswer": "1"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "3"
            ],
            "primaryAnswer": "3"
          }
        }
      }
    ]
  },
  "b1": {
    "id": "b1",
    "targetLevel": "B1",
    "prerequisiteLevel": "A2",
    "title": "Einstufungstest für Kursniveau B1",
    "subtitle": "Prüfung der A2-Vorkenntnisse • Cornelsen DaF",
    "description": "Um in den Deutschkurs auf dem Niveau B1 einzusteigen, überprüfen Sie mit diesem offiziellen Test Ihre A2-Kenntnisse in Alltagssituationen, Hör- und Leseverstehen sowie Dialogen anhand von 29 interaktiven Aufgaben.",
    "shortDescription": "Absolvieren Sie die A2-Prüfung, um Ihre Berechtigung für den B1-Kurs zu testen.",
    "soundCheckAudio": "/level-tests/b1/media/S3_63584_GER-Test_A2_2.mp3",
    "totalQuestions": 29,
    "estimatedMinutes": 80,
    "quellen": "A2-Test Quellenverzeichnis:\nS. 1: Shutterstock.com/ WAYHOME studio\nS. 2: Shutterstock.com/ Rob Bouwman\nS. 3: Shutterstock.com/ Iakov Filimonov\nS. 4: Shutterstock.com/ Iakov Filimonov\nS. 5: Cornelsen/ Karin Wagenblatt\nS. 6/Papier: Shutterstock.com/ Feng Yu; S. 6/Anzeigen: Cornelsen/ Karin Wagenblatt\nS. 7: Cornelsen/ Karin Wagenblatt\nS. 8: Shutterstock.com/ ASDF_MEDIA\nS. 9: Cornelsen/ Karin Wagenblatt\nS. 10: Shutterstock.com/ g-stockstudio\nS. 11: Shutterstock.com/ Oleg Golovnev\nS. 12: Cornelsen/ Karin Wagenblatt\nS. 13: Shutterstock.com/ Jacob Lund\nS. 14: Cornelsen/ Roland Beier\nS. 15: Shutterstock.com/ iiinuthiii\nS. 16: Shutterstock.com/ puhhha\nS. 17: Shutterstock.com/ Dean Drobot\nS. 18: Cornelsen/ Shutterstock.com/ Thana Thanadechakul\nS. 19: Cornelsen/ Shutterstock.com/ viviamo\nS. 20: Cornelsen/ Roland Beier\nS. 21: Shutterstock.com/ Tyler Olson\nS. 22: Cornelsen/ Shutterstock.com/ Thana Thanadechakul\nS. 23: Shutterstock.com/ Billion Photos\nS. 24: Cornelsen/ Shutterstock.com/ (Skyline) Sky and glass/ (Telefon) Boris15\nS. 25: Shutterstock.com/ Cristi Lucaci\nS. 26: Shutterstock.com/ Dragon Images\nS. 27: Shutterstock.com/ Pressmaster\nS. 28: Shutterstock.com/ CatwalkPhotos\nS. 29: Shutterstock.com/ Tatiana Popova",
    "evaluationScale": [
      {
        "min": 90,
        "max": 100,
        "level": "B1 oder höher (A2 abgeschlossen)",
        "badge": "Ausgezeichnet",
        "description": "Ausgezeichnet! Sie haben hervorragende Kenntnisse im Bereich A2 und darüber hinausgehend. Machen Sie auf keinen Fall einen Kurs unterhalb B1. Wir empfehlen Ihnen auch noch, den Test B1 durchzuführen, da Ihre Kenntnisse vielleicht weitergehend sind, als Sie zunächst angenommen hatten."
      },
      {
        "min": 70,
        "max": 89,
        "level": "A2.2 (Aufbau)",
        "badge": "Sehr gut / Gut",
        "description": "Sie haben gute bis sehr gute Kenntnisse im Bereich A2 und können einen Kurs besuchen, der vom Lernniveau A2 zum Lernniveau B1 hinführt."
      },
      {
        "min": 50,
        "max": 69,
        "level": "A2.1 (Grundstufe)",
        "badge": "Befriedigend",
        "description": "Ihre Kenntnisse liegen unterhalb des Lernniveaus A2. Wir empfehlen Ihnen einen Kurs, der mit der ersten Hälfte A2 beginnt."
      },
      {
        "min": 30,
        "max": 49,
        "level": "A1 Wiederholung / Vorbereitung A2",
        "badge": "Ausbaufähig",
        "description": "Ihre Kenntnisse liegen unterhalb des Lernniveaus A2. Wir empfehlen Ihnen einen Kurs, der mit der ersten Hälfte A2 beginnt."
      },
      {
        "min": 0,
        "max": 29,
        "level": "A1 Grundkenntnisse empfohlen",
        "badge": "Grundstufe",
        "description": "Ihre Kenntnisse liegen unterhalb des Lernniveaus A2. Bitte machen Sie zusätzlich den Test A1, um in den passenden Kurs eingestuft werden zu können."
      }
    ],
    "questions": [
      {
        "id": 1,
        "category": "Hörverstehen & Autoreparatur",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Ihr Auto ist kaputt. Sie rufen bei einem Freund an und fragen ihn um Rat. Was sollen Sie tun?</strong></p>\n\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_61847_11.771940201-H.jpg"
        ],
        "audio": "/level-tests/b1/media/S3_63584_GER-Test_A2_2.mp3",
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Sie sollen eine Werkstatt anrufen. Er kann das Auto nicht reparieren."
          },
          {
            "id": "C0_1",
            "text": "Sie sollen das Auto selbst reparieren. Er sagt Ihnen, was Sie tun müssen."
          },
          {
            "id": "C0_2",
            "text": "Sie sollen das Auto zu Ihrem Freund bringen. Er repariert es."
          }
        ],
        "correctAnswer": "C0_0",
        "correctAnswerText": "Sie sollen eine Werkstatt anrufen. Er kann das Auto nicht reparieren."
      },
      {
        "id": 2,
        "category": "Orientierung & Branchenbuch",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Sie suchen im Telefonbuch eine Werkstatt. Wo suchen Sie?</strong></p>\n\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_61830_11.95646526-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Auskunft"
          },
          {
            "id": "C0_1",
            "text": "Autoreparaturen"
          },
          {
            "id": "C0_2",
            "text": "Autovermietung"
          },
          {
            "id": "C0_3",
            "text": "Autoversicherung"
          },
          {
            "id": "C0_4",
            "text": "Autowäsche"
          }
        ],
        "correctAnswer": "C0_1",
        "correctAnswerText": "Autoreparaturen"
      },
      {
        "id": 3,
        "category": "Kommunikation & Beim Automechaniker",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Sie telefonieren mit dem Automechaniker. Er stellt Ihnen Fragen. Was sagen Sie?</strong></p>\n\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil neben dem Feld \"Bitte wählen\". Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus. Führen Sie diesen Vorgang bei jedem Feld durch.",
        "images": [
          "/level-tests/b1/media/S3_61856_11.1217556460-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Automechaniker: Wie lange ist das Auto schon kaputt?<br>Sie: [[SELECT:RESPONSE0]]</p>\n\n<p>Automechaniker: Ist das Auto sehr laut?\" <br>Sie: [[SELECT:RESPONSE1]]</p>\n\n<p>Automechaniker: Wie viele Kilometer ist das Auto insgesamt schon gefahren?<br>Sie: [[SELECT:RESPONSE2]]</p>\n\n<p>Automechaniker: Können Sie das Auto morgen um 7.15 Uhr in die Werkstatt bringen? <br>Sie: [[SELECT:RESPONSE3]]</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "Erst einen Tag."
              },
              {
                "id": "1",
                "text": "Jeden Tag."
              },
              {
                "id": "2",
                "text": "Bald."
              }
            ],
            "correct": "0",
            "correctText": "Erst einen Tag."
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "Nein, es ist leise."
              },
              {
                "id": "1",
                "text": "Ja, es ist noch neu."
              },
              {
                "id": "2",
                "text": "Nein, es ist sauber."
              }
            ],
            "correct": "0",
            "correctText": "Nein, es ist leise."
          },
          "RESPONSE2": {
            "options": [
              {
                "id": "0",
                "text": "Oh, das weiß ich nicht genau."
              },
              {
                "id": "1",
                "text": "Es ist ein silbergrauer Opel Astra."
              },
              {
                "id": "2",
                "text": "Nein, das Auto hatte noch keinen Unfall."
              }
            ],
            "correct": "0",
            "correctText": "Oh, das weiß ich nicht genau."
          },
          "RESPONSE3": {
            "options": [
              {
                "id": "0",
                "text": "Geht es auch etwas später?"
              },
              {
                "id": "1",
                "text": "Nein, das ist leider falsch."
              },
              {
                "id": "2",
                "text": "Ich kann das Auto erst um 7.30 Uhr abholen."
              }
            ],
            "correct": "0",
            "correctText": "Geht es auch etwas später?"
          }
        }
      },
      {
        "id": 4,
        "category": "Satzbau & Reklamation in der Werkstatt",
        "type": "order-sequence",
        "rubricHtml": "<p><strong>Eine Woche später: Die Werkstatt hat sich noch nicht bei Ihnen gemeldet. Sie rufen dort an und fragen, ob Sie Ihr Auto schon abholen können.</strong></p>\n\n<p><em>Ordnen Sie den Dialog.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe ziehen Sie den Dialogteil an die richtige Stelle. Sie können Ihre Wahl auch noch ändern, bevor Sie auf OK klicken. Ziehen Sie einfach den Dialogteil an eine andere Stelle.",
        "images": [
          "/level-tests/b1/media/S3_61856_11.1217556460-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "items": [
          {
            "id": "SC0",
            "text": "Mechaniker: Der silbergraue Opel Astra? Nein, der ist noch nicht fertig."
          },
          {
            "id": "SC1",
            "text": "Sie: Warum denn das? Das Auto ist doch schon seit einer Woche in der Werkstatt!"
          },
          {
            "id": "SC2",
            "text": "Mechaniker: Wir mussten ein Ersatzteil bestellen und das kommt erst morgen. Das tut uns leid."
          },
          {
            "id": "SC3",
            "text": "Sie: Oh nein, der Einbau dauert bestimmt auch noch ein paar Tage. Aber ich brauch doch morgen unbedingt das Auto!"
          },
          {
            "id": "SC4",
            "text": "Mechaniker: Können wir Ihnen vielleicht einen Leihwagen geben?"
          },
          {
            "id": "SC5",
            "text": "Sie: Ja, das ist eine gute Idee."
          }
        ],
        "correctOrder": [
          "SC0",
          "SC1",
          "SC2",
          "SC3",
          "SC4",
          "SC5"
        ],
        "correctOrderTexts": [
          "Mechaniker: Der silbergraue Opel Astra? Nein, der ist noch nicht fertig.",
          "Sie: Warum denn das? Das Auto ist doch schon seit einer Woche in der Werkstatt!",
          "Mechaniker: Wir mussten ein Ersatzteil bestellen und das kommt erst morgen. Das tut uns leid.",
          "Sie: Oh nein, der Einbau dauert bestimmt auch noch ein paar Tage. Aber ich brauch doch morgen unbedingt das Auto!",
          "Mechaniker: Können wir Ihnen vielleicht einen Leihwagen geben?",
          "Sie: Ja, das ist eine gute Idee."
        ]
      },
      {
        "id": 5,
        "category": "Leseverstehen & Werkstattrechnung",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Sie bekommen die Rechnung von der Autowerkstatt.</strong><strong> </strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus.</em><strong></strong></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_61502_GER-Test_A2_Rechnung.JPG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Wie viel Steuern müssen Sie zahlen?</strong></p>\n\n<p>[[CHOICE_GROUP:RESPONSE0]]</p>\n\n\n\n<p><strong>Wie sollen Sie zahlen?</strong></p>\n\n<p>[[CHOICE_GROUP:RESPONSE1]]</p>",
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": null,
            "options": [
              {
                "id": "C0_0",
                "text": "14,87 Euro"
              },
              {
                "id": "C0_1",
                "text": "14,00 Euro"
              },
              {
                "id": "C0_2",
                "text": "78,25 Euro"
              }
            ],
            "correct": "C0_0",
            "correctText": "14,87 Euro"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": null,
            "options": [
              {
                "id": "C1_0",
                "text": "per Überweisung"
              },
              {
                "id": "C1_1",
                "text": "in bar"
              },
              {
                "id": "C1_2",
                "text": "mit der Kreditkarte"
              }
            ],
            "correct": "C1_0",
            "correctText": "per Überweisung"
          }
        ]
      },
      {
        "id": 6,
        "category": "Leseverstehen & Stellenanzeigen",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Einige Bekannte von Ihnen, Stephan, Sonja und Annelies, suchen einen Job. Welches Angebot passt zu wem?</strong></p>\n\n<p><em>Ergänzen Sie die richtige Nummer.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in die Schreibfelder die Nummer des passenden Angebots ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b1/media/S3_61495_GER-Test_A2_Stellenangebote.JPG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Annelies ist 56 Jahre alt und arbeitet in einer Werbeagentur. Sie möchte sich darüber hinaus sozial engagieren. [[INPUT:RESPONSE0]]</p>\n\n<p>Sonja ist Studentin. Sie trifft gerne andere Menschen und hat während der Woche nicht viel Zeit. Welche Anzeige passt zu Sonja? [[INPUT:RESPONSE1]]</p>\n\n<p>Stephan, der 15jährige Sohn Ihres Nachbarn, möchte am Wochenende ein paar Stunden arbeiten. Welche Anzeige passt zu Stephan? [[INPUT:RESPONSE2]]</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "2"
            ],
            "primaryAnswer": "2"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "3"
            ],
            "primaryAnswer": "3"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "1"
            ],
            "primaryAnswer": "1"
          }
        }
      },
      {
        "id": 7,
        "category": "Leseverstehen & Arbeitsvertrag",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Eine Freundin von Ihnen beginnt eine neue Arbeit und hat ihren Arbeitsvertrag bekommen.</strong></p>\n\n<p><em>Lesen Sie und ergänzen Sie. </em></p>",
        "promptHtml": "",
        "help": "Zur Beantwortung der Frage geben Sie in das Schreibfeld die korrekte Uhrzeit ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b1/media/S3_61504_GER-Test_A2_Arbeitsvertrag.JPG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Wann kann sie frühestens nach Hause gehen?</strong></p>\n\n<p>um [[INPUT:RESPONSE0]] Uhr</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "16:30",
              "16.30",
              "16 30"
            ],
            "primaryAnswer": "16:30"
          }
        }
      },
      {
        "id": 8,
        "category": "Höflichkeit & Begrüßung im Beruf",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Sie unterhalten sich mit einem Besucher in Ihrer Firma.</strong></p>\n\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil neben dem Feld \"Bitte wählen\". Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus. Führen Sie diesen Vorgang bei jedem Feld durch.",
        "images": [
          "/level-tests/b1/media/S3_61852_11.1207192360-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Besucher: </strong>Guten Tag!</p>\n\n<p><strong>Sie: </strong>Guten Tag! [[SELECT:RESPONSE0]] Herr Kirsanow aus Russland?</p>\n\n<p><strong>Besucher: </strong>Ja.</p>\n\n<p><strong>Sie: </strong>[[SELECT:RESPONSE1]] hier in Deutschland! Wann sind Sie denn angekommen?</p>\n\n<p><strong>Besucher: </strong>Gestern Abend.</p>\n\n<p><strong>Sie: </strong>[[SELECT:RESPONSE2]] sind Sie geflogen?</p>\n\n<p><strong>Besucher: </strong>Der Flug hat 3 Stunden gedauert.</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "Sind Sie"
              },
              {
                "id": "1",
                "text": "Seid Ihr"
              },
              {
                "id": "2",
                "text": "Bist Du"
              }
            ],
            "correct": "0",
            "correctText": "Sind Sie"
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "Herzlich willkommen"
              },
              {
                "id": "1",
                "text": "Angenehm"
              },
              {
                "id": "2",
                "text": "Sehr erfreut"
              }
            ],
            "correct": "0",
            "correctText": "Herzlich willkommen"
          },
          "RESPONSE2": {
            "options": [
              {
                "id": "0",
                "text": "Wie lange"
              },
              {
                "id": "1",
                "text": "Womit"
              },
              {
                "id": "2",
                "text": "Wie schnell"
              }
            ],
            "correct": "0",
            "correctText": "Wie lange"
          }
        }
      },
      {
        "id": 9,
        "category": "Wortschatz & Bürokalender",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Im Büro hängt ein großer Terminkalender.</strong></p>\n\n<p><em>Ergänzen Sie den richtigen Wochentag (z.B.: Montag).</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in die Schreibfelder den jeweiligen Wochentag ein. Achten Sie auf die Rechtschreibung und verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b1/media/S3_61503_GER-Test_A2_Kalender.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Am [[INPUT:RESPONSE0]] ist frei.</p>\n\n<p>Am [[INPUT:RESPONSE1]] findet eine Weiterbildung statt.</p>\n\n<p>Am [[INPUT:RESPONSE2]] wird das Unternehmen 5 Jahre alt.</p>\n\n<p>Am [[INPUT:RESPONSE3]] ist die Arbeit an einem Projekt beendet.</p>\n\n<p>Am [[INPUT:RESPONSE4]] kann morgens niemand am Computer arbeiten.</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "Montag",
              "montag"
            ],
            "primaryAnswer": "Montag"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "Freitag",
              "freitag"
            ],
            "primaryAnswer": "Freitag"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "Donnerstag",
              "donnerstag"
            ],
            "primaryAnswer": "Donnerstag"
          },
          "RESPONSE3": {
            "correctAnswers": [
              "Mittwoch",
              "mittwoch"
            ],
            "primaryAnswer": "Mittwoch"
          },
          "RESPONSE4": {
            "correctAnswers": [
              "Dienstag",
              "dienstag"
            ],
            "primaryAnswer": "Dienstag"
          }
        }
      },
      {
        "id": 10,
        "category": "Redemittel & Firmenjubiläum",
        "type": "multiple-choice",
        "rubricHtml": "<p><strong>Die Firma, in der Sie arbeiten, wird fünf Jahre alt. Alle Mitarbeiter trinken Sekt und stoßen an.</strong><strong> Was kann man in dieser Situation sagen?</strong></p>\n\n<p><em>Wählen Sie zwei Möglichkeiten aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben den korrekten Antworten durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_61854_11.1053695489-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Alles Gute für die Zukunft!"
          },
          {
            "id": "C0_1",
            "text": "Auf die Firma!"
          },
          {
            "id": "C0_2",
            "text": "Frohes neues Jahr!"
          },
          {
            "id": "C0_3",
            "text": "Gute Besserung!"
          },
          {
            "id": "C0_4",
            "text": "Mahlzeit!"
          }
        ],
        "correctAnswers": [
          "C0_0",
          "C0_1"
        ],
        "correctAnswerTexts": [
          "Alles Gute für die Zukunft!",
          "Auf die Firma!"
        ],
        "maxChoices": 2
      },
      {
        "id": 11,
        "category": "Arbeitsplatz & Urlaub beantragen",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Sie möchten in der nächsten Woche einen Tag Urlaub nehmen. Wie fragen Sie?</strong></p>\n\n<p><em>Wählen Sie aus. </em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_61826_11.47355808-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Ich muss nächsten Freitag doch nicht kommen, oder?"
          },
          {
            "id": "C0_1",
            "text": "Ich plane nächste Woche einen Feiertag. Ist das ok?"
          },
          {
            "id": "C0_2",
            "text": "Kann ich nächste Woche einen Tag frei haben?"
          }
        ],
        "correctAnswer": "C0_2",
        "correctAnswerText": "Kann ich nächste Woche einen Tag frei haben?"
      },
      {
        "id": 12,
        "category": "Leseverstehen & Kleinanzeigen",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Sie sind umgezogen und brauchen eine große Warmwasser-Waschmaschine. Sie suchen in einer Zeitung nach Anzeigen für Waschmaschinen. Welche Waschmaschine ist wohl am praktischsten/besten?</strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus. </em></p>",
        "promptHtml": "",
        "help": "Zur Beantwortung der Frage geben Sie in das Schreibfeld die Nummer der passenden Anzeige ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b1/media/S3_61505_GER-Test_A2_zu_verkaufen.JPG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Nummer [[INPUT:RESPONSE0]]</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "2"
            ],
            "primaryAnswer": "2"
          }
        }
      },
      {
        "id": 13,
        "category": "Telefongespräch & Kaufanfrage",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Sie rufen bei dem Anbieter aus der Zeitung an.</strong></p>\n\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil neben dem Feld \"Bitte wählen\". Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus. Führen Sie diesen Vorgang bei jedem Feld durch.",
        "images": [
          "/level-tests/b1/media/S3_61849_11.790755064-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Sie: [[SELECT:RESPONSE0]]</p>\n\n<p>Anbieter: Guten Tag. </p>\n\n<p>Sie: Ich habe Ihre Anzeige in der Zeitung gesehen. [[SELECT:RESPONSE1]]</p>\n\n<p>Anbieter: [[SELECT:RESPONSE2]] Die habe ich heute schon verkauft.</p>\n\n<p>Sie: Gut, [[SELECT:RESPONSE3]]. [[SELECT:RESPONSE4]] Auf Wiederhören.</p>\n\n<p>Anbieter: Ja, das tut mir leid. Tschüs.</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "Guten Tag."
              },
              {
                "id": "1",
                "text": "Hallo Leute."
              },
              {
                "id": "2",
                "text": "Was geht?"
              }
            ],
            "correct": "0",
            "correctText": "Guten Tag."
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "Haben Sie die Waschmaschine noch?"
              },
              {
                "id": "1",
                "text": "Haben Sie eine Waschmaschine?"
              },
              {
                "id": "2",
                "text": "Wie viele Waschmaschinen möchten Sie?"
              }
            ],
            "correct": "0",
            "correctText": "Haben Sie die Waschmaschine noch?"
          },
          "RESPONSE2": {
            "options": [
              {
                "id": "0",
                "text": "Nein, leider nicht mehr."
              },
              {
                "id": "1",
                "text": "Ja, klar."
              },
              {
                "id": "2",
                "text": "Immer doch!"
              }
            ],
            "correct": "0",
            "correctText": "Nein, leider nicht mehr."
          },
          "RESPONSE3": {
            "options": [
              {
                "id": "0",
                "text": "alles klar"
              },
              {
                "id": "1",
                "text": "es geht so"
              },
              {
                "id": "2",
                "text": "das gefällt mir"
              }
            ],
            "correct": "0",
            "correctText": "alles klar"
          },
          "RESPONSE4": {
            "options": [
              {
                "id": "0",
                "text": "Vielen Dank."
              },
              {
                "id": "1",
                "text": "Bitte."
              },
              {
                "id": "2",
                "text": "Super!"
              }
            ],
            "correct": "0",
            "correctText": "Vielen Dank."
          }
        }
      },
      {
        "id": 14,
        "category": "Wortschatz & Kaufhaus Produktschild",
        "type": "gap-match",
        "rubricHtml": "<p><strong>Im Kaufhaus: Sie suchen nach einer Waschmaschine. An einer Waschmaschine hängt ein Informationsschild, aber die Kategorien fehlen.</strong></p>\n\n<p><em>Ordnen Sie die Kategorien zu. Ein Wort passt nicht.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie auf eine Kategorie in der oberen Hälfte der Tabelle und ziehen Sie diese an die richtige Stelle in der unteren Hälfte der Tabelle. Sie können Ihre Wahl auch noch ändern, bevor Sie auf OK klicken. Ziehen Sie einfach die Kategorie an eine andere Stelle.",
        "images": [
          "/level-tests/b1/media/S3_16237_657_img.jpg"
        ],
        "audio": null,
        "audios": null,
        "tokens": [
          {
            "id": "GTID0_0",
            "text": "Typ"
          },
          {
            "id": "GTID1_0",
            "text": "Garantie"
          },
          {
            "id": "GTID2_0",
            "text": "Farbe"
          },
          {
            "id": "GTID3_0",
            "text": "Preis"
          },
          {
            "id": "GTID3_1",
            "text": "Programme"
          }
        ],
        "slots": {
          "ID0": {
            "slotId": "ID0",
            "label": "Aussage 1",
            "description": "Lavatim Öko Plus 2000, Frontlader",
            "correctTokenId": "GTID0_0",
            "correctText": "Typ"
          },
          "ID1": {
            "slotId": "ID1",
            "label": "Aussage 2",
            "description": "2 Jahre",
            "correctTokenId": "GTID1_0",
            "correctText": "Garantie"
          },
          "ID2": {
            "slotId": "ID2",
            "label": "Aussage 3",
            "description": "Sonderedition: metallic oder weiß-hellblau",
            "correctTokenId": "GTID2_0",
            "correctText": "Farbe"
          },
          "ID3": {
            "slotId": "ID3",
            "label": "Aussage 4",
            "description": "699,00 € (Sonderpreis bei Selbstabholung!) auch Ratenzahlung möglich: 24,99 € monatlich (Laufzeit: 32 Monate)",
            "correctTokenId": "GTID3_0",
            "correctText": "Preis"
          }
        }
      },
      {
        "id": 15,
        "category": "Hörverstehen & Kaufhaus-Durchsage",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Sie haben im Kaufhaus doch keine passende Waschmaschine gefunden. Sie haben auch noch Ihren Schlüssel verloren! Da hören Sie eine Durchsage.</strong></p>\n\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "<p><strong>Wo können Sie Ihren Schlüssel abholen?</strong></p>",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_61817_11.699997795-H.jpg"
        ],
        "audio": "/level-tests/b1/media/S3_63582_GER-Test_A2_4.mp3",
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "am Informationszentrum"
          },
          {
            "id": "C0_1",
            "text": "an der Kasse im 3. Stock"
          },
          {
            "id": "C0_2",
            "text": "in der Elektro-Abteilung"
          }
        ],
        "correctAnswer": "C0_1",
        "correctAnswerText": "an der Kasse im 3. Stock"
      },
      {
        "id": 16,
        "category": "Zuordnung & Katalogbestellung",
        "type": "associate-pairs",
        "rubricHtml": "<p><strong>Sie finden eine sehr gute Waschmaschine in einem Katalog und möchten diese bestellen. Sie rufen dort an.</strong></p>\n\n<p><i>Verbinden Sie.</i></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in die Schreibfelder die passenden Angaben ein. Achten Sie bitte auf die Rechtschreibung und verwenden Sie bitte keine zusätzlichen Leerzeichen. Sie können die Angaben oben markieren und mit der Maus an die richtige Stelle ziehen.",
        "images": [
          "/level-tests/b1/media/S3_61831_11.96120500-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "leftItems": [
          {
            "id": "A1",
            "text": "Was möchten Sie bestellen?"
          },
          {
            "id": "A2",
            "text": "Wie lautet die Bestellnummer?"
          },
          {
            "id": "A3",
            "text": "Wie möchten Sie zahlen? Bitte wählen Sie aus: Kreditkarte, Rechnung, Überweisungsauftrag."
          },
          {
            "id": "A4",
            "text": "Welche Farbe soll die Waschmachine haben?"
          },
          {
            "id": "A5",
            "text": "Möchten Sie in Raten zahlen?"
          },
          {
            "id": "A6",
            "text": "Wie lautet Ihre Handynummer?"
          },
          {
            "id": "A7",
            "text": "Wann sollen wir die Waschmaschine liefern?"
          }
        ],
        "rightItems": [
          {
            "id": "B1",
            "text": "Eine Waschmaschine, bitte."
          },
          {
            "id": "B2",
            "text": "XH7994"
          },
          {
            "id": "B3",
            "text": "Rechnung, bitte."
          },
          {
            "id": "B4",
            "text": "weiß"
          },
          {
            "id": "B5",
            "text": "Ja."
          },
          {
            "id": "B6",
            "text": "01622082784"
          },
          {
            "id": "B7",
            "text": "Sofort."
          }
        ],
        "correctPairs": [
          "A1 B1",
          "A2 B2",
          "A3 B3",
          "A4 B4",
          "A5 B5",
          "A6 B6",
          "A7 B7"
        ],
        "correctPairTexts": [
          "Was möchten Sie bestellen? ➔ Eine Waschmaschine, bitte.",
          "Wie lautet die Bestellnummer? ➔ XH7994",
          "Wie möchten Sie zahlen? Bitte wählen Sie aus: Kreditkarte, Rechnung, Überweisungsauftrag. ➔ Rechnung, bitte.",
          "Welche Farbe soll die Waschmachine haben? ➔ weiß",
          "Möchten Sie in Raten zahlen? ➔ Ja.",
          "Wie lautet Ihre Handynummer? ➔ 01622082784",
          "Wann sollen wir die Waschmaschine liefern? ➔ Sofort."
        ]
      },
      {
        "id": 17,
        "category": "Hörverstehen & An der Kasse",
        "type": "single-choice",
        "rubricHtml": "<p><b>Im Supermarkt: Sie bezahlen an der Kasse. Die Kassiererin fragt Sie etwas. Wie antworten Sie?</b></p>\n\n<p><em>Hören Sie und wählen Sie aus. </em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_61848_11.777034621-H.jpg"
        ],
        "audio": "/level-tests/b1/media/S3_63581_GER-Test_A2_5.mp3",
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Danke, Ihnen auch."
          },
          {
            "id": "C0_1",
            "text": "Ja, ich habe alles gefunden."
          },
          {
            "id": "C0_2",
            "text": "Ja, ich habe es sogar passend."
          },
          {
            "id": "C0_3",
            "text": "Nein, danke."
          },
          {
            "id": "C0_4",
            "text": "Nein, nicht nötig."
          }
        ],
        "correctAnswer": "C0_2",
        "correctAnswerText": "Ja, ich habe es sogar passend."
      },
      {
        "id": 18,
        "category": "Orientierung & Supermarkt-Lageplan",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Im Supermarkt: </strong><strong>Sie suchen die Kühlregale, weil Sie Butter brauchen. Wohin müssen Sie gehen?</strong></p>\n\n<p><i>Sehen Sie sich den Lageplan an und wählen Sie aus. </i></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_62957_Supermarkt_Info.PNG"
        ],
        "audio": null,
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "geradeaus"
          },
          {
            "id": "C0_1",
            "text": "nach links"
          },
          {
            "id": "C0_2",
            "text": "nach rechts"
          },
          {
            "id": "C0_3",
            "text": "zurück"
          }
        ],
        "correctAnswer": "C0_1",
        "correctAnswerText": "nach links"
      },
      {
        "id": 19,
        "category": "Leseverstehen & Lebensmittelpackung",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Sie suchen im Supermarkt noch etwas Süßes und finden eine Packung „Russisch Brot“. Auf der Packung steht ein Informationstext über das Produkt.</strong><strong> </strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_62816_Russisch_Brot.PNG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Seit wann gibt es Russisch Brot in Deutschland?</strong></p>\n\n<p>[[CHOICE_GROUP:RESPONSE0]]</p>\n\n\n\n<p><strong>Welchen Beruf hatte Ferdinand Wilhelm Hanke?</strong></p>\n\n<p>[[CHOICE_GROUP:RESPONSE1]]</p>\n\n\n\n<p><strong>Woher kommt Ferdinand Wilhelm Hanke?</strong></p>\n\n<p>[[CHOICE_GROUP:RESPONSE2]]</p>",
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": null,
            "options": [
              {
                "id": "C0_0",
                "text": "seit 1816"
              },
              {
                "id": "C0_1",
                "text": "seit 1844"
              },
              {
                "id": "C0_2",
                "text": "seit 1880"
              }
            ],
            "correct": "C0_1",
            "correctText": "seit 1844"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": null,
            "options": [
              {
                "id": "C1_0",
                "text": "Er war Bäcker."
              },
              {
                "id": "C1_1",
                "text": "Er war Diplomat."
              },
              {
                "id": "C1_2",
                "text": "Er war Erfinder."
              }
            ],
            "correct": "C1_0",
            "correctText": "Er war Bäcker."
          },
          {
            "id": "RESPONSE2",
            "responseId": "RESPONSE2",
            "title": null,
            "options": [
              {
                "id": "C2_0",
                "text": "aus Dresden"
              },
              {
                "id": "C2_1",
                "text": "aus Sankt Petersburg"
              },
              {
                "id": "C2_2",
                "text": "aus Wien"
              }
            ],
            "correct": "C2_0",
            "correctText": "aus Dresden"
          }
        ]
      },
      {
        "id": 20,
        "category": "Handlungsanweisungen & Backrezept",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Sie finden ein Rezept für „Russisch Brot“. Aber etwas stimmt nicht: Die Reihenfolge der Bilder passt nicht zur Reihenfolge der Arbeitsschritte.</strong></p>\n\n<p><em>Sehen Sie sich die Bilder an und ergänzen Sie die Bildnummern.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in die Schreibfelder die Nummer des passenden Bildes ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b1/media/S3_16239_662_img.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Arbeitsschritte:</strong></p>\n\n<p>Das Eiweiß steif schlagen (Eischnee). Bild [[INPUT:RESPONSE0]]</p>\n\n<p>Den Zucker, den Vanillezucker und den Kakao dazugeben und mit dem Mixer unterrühren. Zuletzt das Mehl dazugeben und alles verrühren. Bild [[INPUT:RESPONSE1]]</p>\n\n<p>Backpapier auf das Backblech legen. Bild [[INPUT:RESPONSE2]]</p>\n\n<p>Die Masse gleichmäßig auf das Backblech geben. Bild [[INPUT:RESPONSE3]]</p>\n\n<p>Den Backofen auf 170° C vorheizen. Den Teig 10 Minuten backen. Bild [[INPUT:RESPONSE4]]</p>\n\n<p>Das Blech aus dem Ofen nehmen und das Brot in kleine Buchstaben schneiden. (Danach noch mal für 5 Minuten in den Backofen schieben und knusprig backen.) Fertig! Bild [[INPUT:RESPONSE5]]</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "4"
            ],
            "primaryAnswer": "4"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "5"
            ],
            "primaryAnswer": "5"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "2"
            ],
            "primaryAnswer": "2"
          },
          "RESPONSE3": {
            "correctAnswers": [
              "6"
            ],
            "primaryAnswer": "6"
          },
          "RESPONSE4": {
            "correctAnswers": [
              "1"
            ],
            "primaryAnswer": "1"
          },
          "RESPONSE5": {
            "correctAnswers": [
              "3"
            ],
            "primaryAnswer": "3"
          }
        }
      },
      {
        "id": 21,
        "category": "Alltagssituationen & Am Probierstand",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Im Supermarkt gibt es einen Probierstand mit verschiedenen Käsesorten und Käsespezialitäten.</strong></p>\n\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_61836_11.437597119-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Die Bedienung bietet Ihnen Käse zum Probieren an. Was sagen Sie?</strong></p>\n\n<p>[[CHOICE_GROUP:RESPONSE0]]</p>\n\n<p><strong>Der Käse schmeckt Ihnen sehr gut. Was sagen Sie?</strong></p>\n\n<p>[[CHOICE_GROUP:RESPONSE1]]</p>\n\n<p><strong>Die Bedienung bietet Ihnen ein Sonderangebot an: 300 g von drei verschiedenen Käsesorten kosten 7,99 Euro. Sie haben aber gestern schon Käse gekauft.</strong></p>\n\n<p>[[CHOICE_GROUP:RESPONSE2]]</p>",
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": null,
            "options": [
              {
                "id": "C0_0",
                "text": "Alles Gute!"
              },
              {
                "id": "C0_1",
                "text": "Das freut mich."
              },
              {
                "id": "C0_2",
                "text": "Ja, das ist schade!"
              },
              {
                "id": "C0_3",
                "text": "Ja, gerne. Danke."
              }
            ],
            "correct": "C0_3",
            "correctText": "Ja, gerne. Danke."
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": null,
            "options": [
              {
                "id": "C1_0",
                "text": "Angenehm!"
              },
              {
                "id": "C1_1",
                "text": "Furchtbar!"
              },
              {
                "id": "C1_2",
                "text": "Lecker!"
              },
              {
                "id": "C1_3",
                "text": "Satt!"
              }
            ],
            "correct": "C1_2",
            "correctText": "Lecker!"
          },
          {
            "id": "RESPONSE2",
            "responseId": "RESPONSE2",
            "title": null,
            "options": [
              {
                "id": "C2_0",
                "text": "Danke, das nehme ich. Können Sie mir bitte eine Tüte dazu geben?"
              },
              {
                "id": "C2_1",
                "text": "Das ist ein gutes Angebot, aber ich brauche gerade keinen Käse. Danke."
              },
              {
                "id": "C2_2",
                "text": "Das klingt toll. Ich nehme aber nur 200 g."
              },
              {
                "id": "C2_3",
                "text": "Moment. Ich kann mich nicht entscheiden, welche Käsesorten ich nehmen soll."
              }
            ],
            "correct": "C2_1",
            "correctText": "Das ist ein gutes Angebot, aber ich brauche gerade keinen Käse. Danke."
          }
        ]
      },
      {
        "id": 22,
        "category": "Leseverstehen & Kundenkarte",
        "type": "single-choice",
        "rubricHtml": "<p><strong>An der Kasse gibt es ein Hinweisschild. Was für ein Schild ist das?</strong></p>\n\n<p><em>Wählen Sie aus. </em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_62955_Kundenkarte_2.PNG"
        ],
        "audio": null,
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "ein Schild für das Sonderangebot der Woche"
          },
          {
            "id": "C0_1",
            "text": "ein Hinweisschild zur Zahlung mit der Kreditkarte"
          },
          {
            "id": "C0_2",
            "text": "ein Werbeschild für die Karte des Supermarktes"
          }
        ],
        "correctAnswer": "C0_2",
        "correctAnswerText": "ein Werbeschild für die Karte des Supermarktes"
      },
      {
        "id": 23,
        "category": "Hörverstehen & Einkaufsgespräch",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Mit einer Freundin unterhalten Sie sich darüber, wo Sie einkaufen. Welche Frage passt zu ihrer Antwort?</strong></p>\n\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_61834_11.305898497-H.jpg"
        ],
        "audio": "/level-tests/b1/media/S3_63588_GER-Test_A2_6.mp3",
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Wann kaufst du lieber ein: am Tag oder abends?"
          },
          {
            "id": "C0_1",
            "text": "Wohin gehst du zum Einkaufen?"
          },
          {
            "id": "C0_2",
            "text": "Kennst du einen türkischen Supermarkt?"
          }
        ],
        "correctAnswer": "C0_1",
        "correctAnswerText": "Wohin gehst du zum Einkaufen?"
      },
      {
        "id": 24,
        "category": "Leseverstehen & Reiseangebote",
        "type": "text-gap",
        "rubricHtml": "<p><b>Im Reisebüro:</b> <b>Sie möchten in die Türkei in Urlaub fahren. Die Angestellte zeigt Ihnen mehrere Angebote. Welches Angebot passt?</b></p>\n\n<p><em>Lesen Sie und ergänzen Sie die Nummern.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in die Schreibfelder die Nummer des passenden Angebots ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b1/media/S3_62812_Fl_ge.PNG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Sie möchten nicht mehr als 150 Euro ausgeben.<br>Angebot [[INPUT:RESPONSE0]]</p>\n\n<p>Sie möchten erst nach Weihnachten fliegen.<br>Angebot [[INPUT:RESPONSE1]]</p>\n\n<p>Sie möchten einen Flug ohne Zwischenstopp haben.<br>Angebot [[INPUT:RESPONSE2]]</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "3"
            ],
            "primaryAnswer": "3"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "1"
            ],
            "primaryAnswer": "1"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "2"
            ],
            "primaryAnswer": "2"
          }
        }
      },
      {
        "id": 25,
        "category": "Hörverstehen & Wetterbericht",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Im Radio hören Sie eine Meldung über Istanbul. Was wird über das Wetter heute in Istanbul gesagt?</strong></p>\n\n<p><em>Hören Sie und wählen Sie aus. </em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_61827_11.84520762-H.jpg"
        ],
        "audio": "/level-tests/b1/media/S3_63585_GER-Test_A2_7.mp3",
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Die Temperatur ist 15 °C."
          },
          {
            "id": "C0_1",
            "text": "Es fällt Schnee."
          },
          {
            "id": "C0_2",
            "text": "Es gibt eine Überschwemmung."
          }
        ],
        "correctAnswer": "C0_1",
        "correctAnswerText": "Es fällt Schnee."
      },
      {
        "id": 26,
        "category": "Telefongespräch & Fluggepäck",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Sie haben noch eine Frage zu Ihrem Gepäck. Sie rufen deshalb bei Ihrer Fluggesellschaft an.</strong></p>\n\n<p><em>Wählen Sie aus. Jeder Satz kann nur ein Mal verwendet werden.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil neben dem Feld \"Bitte wählen\". Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus. Führen Sie diesen Vorgang bei jedem Feld durch.",
        "images": [
          "/level-tests/b1/media/S3_61835_11.292901984-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Beraterin: </strong>Istanbul Air, guten Tag! Mein Name ist Karoline Schmidt. Was kann ich für Sie tun?</p>\n\n<p><strong>Sie: </strong>[[SELECT:RESPONSE0]]</p>\n\n<p><strong>Beraterin: </strong>Für welchen Flug?</p>\n\n<p><strong>Sie: </strong>[[SELECT:RESPONSE1]]</p>\n\n<p><strong>Beraterin: </strong>Sie dürfen zwei Gepäckstücke mitnehmen. Diese dürfen zusammen nicht mehr als 30 kg wiegen.</p>\n\n<p><strong>Sie: </strong>[[SELECT:RESPONSE2]]</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "Guten Tag. Ich möchte wissen, wie viel Gepäck ich mitnehmen darf."
              },
              {
                "id": "1",
                "text": "Gut, vielen Dank. Auf Wiederhören."
              },
              {
                "id": "2",
                "text": "Ich fliege von Berlin nach Istanbul."
              }
            ],
            "correct": "0",
            "correctText": "Guten Tag. Ich möchte wissen, wie viel Gepäck ich mitnehmen darf."
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "Ich fliege von Berlin nach Istanbul."
              },
              {
                "id": "1",
                "text": "Guten Tag. Ich möchte wissen, wie viel Gepäck ich mitnehmen darf."
              },
              {
                "id": "2",
                "text": "Gut, vielen Dank. Auf Wiederhören."
              }
            ],
            "correct": "0",
            "correctText": "Ich fliege von Berlin nach Istanbul."
          },
          "RESPONSE2": {
            "options": [
              {
                "id": "0",
                "text": "Gut, vielen Dank. Auf Wiederhören."
              },
              {
                "id": "1",
                "text": "Ich fliege von Berlin nach Istanbul."
              },
              {
                "id": "2",
                "text": "Guten Tag. Ich möchte wissen, wie viel Gepäck ich mitnehmen darf."
              }
            ],
            "correct": "0",
            "correctText": "Gut, vielen Dank. Auf Wiederhören."
          }
        }
      },
      {
        "id": 27,
        "category": "Hörverstehen & Flughafen-Durchsage",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Auf dem Flughafen hören Sie eine Durchsage. </strong><strong>Über was wird informiert?</strong></p>\n\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b1/media/S3_61853_11.1156919401-H.jpg"
        ],
        "audio": "/level-tests/b1/media/S3_63583_GER-Test_A2_8.mp3",
        "audios": null,
        "options": [
          {
            "id": "C0_0",
            "text": "Eine Person wird gesucht. Sie soll zum Check-In kommen."
          },
          {
            "id": "C0_1",
            "text": "Der Flug nach Istanbul verspätet sich um 8 Minuten."
          },
          {
            "id": "C0_2",
            "text": "Der Flugsteig für die Maschine nach Istanbul hat sich geändert."
          }
        ],
        "correctAnswer": "C0_2",
        "correctAnswerText": "Der Flugsteig für die Maschine nach Istanbul hat sich geändert."
      },
      {
        "id": 28,
        "category": "Gesprächssituationen & Im Flugzeug",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Sie sitzen im Flugzeug und unterhalten sich mit Ihrer Nachbarin. Sie stellen fest, dass Sie die gleiche Meinung und ähnliche Erfahrungen haben. Was sagen Sie?</strong></p>\n\n<p><em>Wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil neben dem Feld \"Bitte wählen\". Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus. Führen Sie diesen Vorgang bei jedem Feld durch.",
        "images": [
          "/level-tests/b1/media/S3_61845_11.734532688-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Nachbarin:<em> </em></strong>Ich fliege eigentlich nicht gerne. </p>\n\n<p><strong>Sie: </strong>[[SELECT:RESPONSE0]]</p>\n\n<p><strong>Nachbarin:<em> </em></strong>Ich war schon oft in Istanbul. </p>\n\n<p><strong>Sie: </strong>[[SELECT:RESPONSE1]]</p>\n\n<p><strong>Nachbarin:<em> </em></strong>Hier ist es aber kalt</p>\n\n<p><strong>Sie: </strong>[[SELECT:RESPONSE2]]</p>",
        "dropdowns": {
          "RESPONSE0": {
            "options": [
              {
                "id": "0",
                "text": "Ich auch nicht."
              },
              {
                "id": "1",
                "text": "Ich aber."
              },
              {
                "id": "2",
                "text": "Ich ja."
              }
            ],
            "correct": "0",
            "correctText": "Ich auch nicht."
          },
          "RESPONSE1": {
            "options": [
              {
                "id": "0",
                "text": "Ich auch."
              },
              {
                "id": "1",
                "text": "Ich doch nicht."
              },
              {
                "id": "2",
                "text": "Aber ich."
              }
            ],
            "correct": "0",
            "correctText": "Ich auch."
          },
          "RESPONSE2": {
            "options": [
              {
                "id": "0",
                "text": "Das finde ich auch."
              },
              {
                "id": "1",
                "text": "Ohne mich."
              },
              {
                "id": "2",
                "text": "Ich auch."
              }
            ],
            "correct": "0",
            "correctText": "Das finde ich auch."
          }
        }
      },
      {
        "id": 29,
        "category": "Schreiben & Postkarte aus dem Urlaub",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Sie sind gut in Istanbul angekommen und schreiben eine Postkarte an Ihren Freund Matthias.</strong></p>\n\n<p><i>Ergänzen Sie.</i></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in das jeweilige Schreibfeld das korrekte Wort ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b1/media/S3_61829_11.92761900-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Lieber Matthias,</p>\n\n<p>wie geht es dir? Mir geht es gut. [[INPUT:RESPONSE0]] ist ein bisschen kalt hier, aber die Sonne [[INPUT:RESPONSE1]]. Heute war ich lange auf dem Basar. Morgen fliege ich weiter [[INPUT:RESPONSE2]] Ankara.</p>\n\n<p>[[INPUT:RESPONSE3]] bald!</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "Es"
            ],
            "primaryAnswer": "Es"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "scheint",
              "lacht",
              "STRAHLT",
              "strahlt",
              "SCHEINT",
              "LACHT"
            ],
            "primaryAnswer": "scheint"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "nach",
              "Nach",
              "NACH"
            ],
            "primaryAnswer": "nach"
          },
          "RESPONSE3": {
            "correctAnswers": [
              "Bis",
              "bis",
              "Auf",
              "auf"
            ],
            "primaryAnswer": "Bis"
          }
        }
      }
    ]
  },
  "b2": {
    "id": "b2",
    "targetLevel": "B2",
    "prerequisiteLevel": "B1",
    "title": "Einstufungstest für Kursniveau B2",
    "subtitle": "Prüfung der B1-Vorkenntnisse • Cornelsen DaF",
    "description": "Um in den Deutschkurs auf dem Niveau B2 einzusteigen, überprüfen Sie mit diesem offiziellen Test Ihre B1-Kenntnisse mit komplexeren Lese- und Hörtexten, Dialogen und Sprachbausteinen in 30 Aufgaben.",
    "shortDescription": "Absolvieren Sie die B1-Prüfung, um Ihre Berechtigung für den B2-Kurs zu testen.",
    "soundCheckAudio": "/level-tests/b2/media/S3_63591_GER-Test_B1_3.mp3",
    "totalQuestions": 30,
    "estimatedMinutes": 90,
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
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Sie haben eine E-Mail von Ihrem Freund Peter bekommen.</strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_61512_GER-Test_B1_E-Mail.JPG"
        ],
        "audio": null,
        "audios": null,
        "groups": [
          {
            "id": "RESPONSE0",
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
            "correct": "C0_3",
            "correctText": "Sie ist beim Sport gestürzt."
          },
          {
            "id": "RESPONSE1",
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
            "correct": "C1_1",
            "correctText": "etwa 10 Tage"
          }
        ]
      },
      {
        "id": 2,
        "category": "Dialogverständnis • Im Krankenhaus",
        "type": "dialogue-order",
        "rubricHtml": "<p><strong>Sie gehen Barbara im Krankenhaus besuchen. Sie sprechen erst mit einer Krankenschwester.</strong><strong> </strong></p>\n\n<p><em>Ordnen Sie den Dialog.&nbsp;</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe ziehen Sie den Dialogteil an die richtige Stelle. Sie können Ihre Wahl auch noch ändern, bevor Sie auf OK klicken. Ziehen Sie einfach den Dialogteil an eine andere Stelle.",
        "images": [
          "/level-tests/b2/media/S3_16199_683_img.jpg"
        ],
        "audio": null,
        "audios": null,
        "speakers": [
          "Sie:",
          "Krankenschwester:",
          "Sie:",
          "Krankenschwester:",
          "Sie:"
        ],
        "dialogueItems": [
          {
            "id": "SC1",
            "text": "Guten Tag. Ich möchte zu Barbara Lange, aber ich weiß nicht wo sie liegt."
          },
          {
            "id": "SC3",
            "text": "Im Zimmer 11.05. Sie ist gestern umgezogen."
          },
          {
            "id": "SC5",
            "text": "Alles klar, 11.05. Und wie komme ich da hin?"
          },
          {
            "id": "SC7",
            "text": "Sie müssen den Gang bis ganz nach hinten gehen. Dann gehen Sie durch die Glastür und die zweite Tür auf der linken Seite ist das Zimmer 11.05. Brauchen Sie eine Vase für die Blumen?"
          },
          {
            "id": "SC9",
            "text": "Ja, das wäre sehr nett. Aber nur eine kleine. Danke."
          }
        ],
        "initialOrder": [
          "SC3",
          "SC1",
          "SC7",
          "SC9",
          "SC5"
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
        "type": "audio-gap-match",
        "rubricHtml": "<p><strong>Barbara erzählt über ihre Verletzung.</strong></p>\n\n\t\t\t<p><em>Hören Sie und ordnen Sie die Hörtexte den Ratschlägen zu.&nbsp;</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie bei A, B beziehungsweise C auf das Feld \"Play\". Hören Sie, was Barbara sagt und bearbeiten Sie die Aufgabe, indem Sie in das vorgesehene Schreibfeld die Nummer des passenden Ratschlags eintragen.",
        "images": [
          "/level-tests/b2/media/S3_16205_696_img.jpg"
        ],
        "audio": null,
        "audios": null,
        "audioCards": [
          {
            "id": "A1",
            "audio": "/level-tests/b2/media/S3_63601_GER-Test_B1_2.1.mp3",
            "label": "Hörtext A"
          },
          {
            "id": "A2",
            "audio": "/level-tests/b2/media/S3_63603_GER-Test_B1_2.2.mp3",
            "label": "Hörtext B"
          },
          {
            "id": "A3",
            "audio": "/level-tests/b2/media/S3_63589_GER-Test_B1_2.3.mp3",
            "label": "Hörtext C"
          }
        ],
        "slots": {
          "slot_0": {
            "slotId": "slot_0",
            "label": "Ratschlag 1",
            "text": "Bis dahin geht es dir bestimmt schon recht gut. Du kannst den Arzt ja vielleicht fragen, ob Du schon einen Tag früher nach Hause kannst.",
            "correctCardId": "A3",
            "correctLabel": "Hörtext C"
          },
          "slot_1": {
            "slotId": "slot_1",
            "label": "Ratschlag 2",
            "text": "Frag doch, ob Du ein anderes Zimmer haben kannst. Oder vielleicht kann sie Einzelzimmer wechseln?",
            "correctCardId": "A1",
            "correctLabel": "Hörtext A"
          },
          "slot_2": {
            "slotId": "slot_2",
            "label": "Ratschlag 3",
            "text": "Nimmst Du keine Schmerztabletten? Frag doch den Arzt noch mal, oder Schwester.",
            "correctCardId": "A2",
            "correctLabel": "Hörtext B"
          }
        }
      },
      {
        "id": 4,
        "category": "Wortschatz & Leseverstehen • Kurklinik Bad Lausick",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Ihre Freundin soll nach dem Krankenhausaufenthalt eine Kur (=eine Behandlung zur Erholung nach einer schweren Krankheit oder Verletzung) machen. Auf ihrem Nachttisch liegt eine Broschüre. Sie möchten den Text lesen, aber einige Teile fehlen.</strong></p>\n\n<p><em>Ergänzen Sie. Zwei Wörter bleiben übrig, jedes Wort wird nur ein Mal verwendet.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in die Schreibfelder das passende Wort ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b2/media/S3_61819_11.462074038-H.jpg"
        ],
        "audio": null,
        "audios": null,
        "wordBank": [
          "angenehm",
          "freundlich",
          "praktisch",
          "sportlich",
          "modern",
          "schön",
          "kulturell"
        ],
        "templateHtml": "<p>Rehabilitationszentrum Bad Lausick</p>\n\n<p>Unsere Klinik ist top[[INPUT:RESPONSE0]] und bietet eine freundliche Atmosphäre. Unsere Fachgebiete sind Erkrankungen des Bewegungsapparates (Orthopädie) und Herz- und Kreislauferkrankungen.</p>\n\n<p>Wir bieten verschiedene Therapien an: Bewegungstherapien, Wärmetherapien, Massagen und elektromagnetische Behandlungen.&nbsp;Die Klinik verfügt über 230 Einzel- und Zweitbettzimmer sowie eine Cafeteria, eine Bibliothek und Leseräume.<br>Im Schwimmbad (mit Sauna), Gymnastikraum und Fitness-Center können Sie sich [[INPUT:RESPONSE1]] betätigen.</p>\n\n<p>Unser freundliches Personal und die wunder[[INPUT:RESPONSE2]]e Landschaft ebenso wie Wochenendausflüge und [[INPUT:RESPONSE3]]e Angebote garantieren einen [[INPUT:RESPONSE4]]en Aufenthalt.</p>\n\n<p>Wir freuen uns auf Ihren Besuch!</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "modern"
            ],
            "primaryAnswer": "modern"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "sportlich"
            ],
            "primaryAnswer": "sportlich"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "schön"
            ],
            "primaryAnswer": "schön"
          },
          "RESPONSE3": {
            "correctAnswers": [
              "kulturell"
            ],
            "primaryAnswer": "kulturell"
          },
          "RESPONSE4": {
            "correctAnswers": [
              "angenehm"
            ],
            "primaryAnswer": "angenehm"
          }
        }
      },
      {
        "id": 5,
        "category": "Hörverstehen • Medikamenteneinnahme",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Eine Krankenschwester kommt ins Zimmer. Sie gibt Barbara die Medikamente und erklärt dazu etwas.</strong></p>\n\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_16206_697_img.jpg"
        ],
        "audio": "/level-tests/b2/media/S3_63591_GER-Test_B1_3.mp3",
        "audios": null,
        "groups": [
          {
            "id": "RESPONSE0",
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
            "correct": "C0_2",
            "correctText": "zweimal täglich eine"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": "Wie soll Barbara die Blut verdünnenden Mittel einnehmen?",
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
            "correct": "C1_2",
            "correctText": "Sie soll die Tabletten mit Tee unzerkaut schlucken."
          }
        ]
      },
      {
        "id": 6,
        "category": "Leseverstehen • Streik im Krankenhaus",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Im Flur des Krankenhauses sehen Sie ein Plakat.</strong><strong> </strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_61517_GER-Test_B1_Streik.JPG"
        ],
        "audio": null,
        "audios": null,
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
        "type": "single-choice",
        "rubricHtml": "<p><strong>Sie informieren sich im Internet über die Preise für die Fahrschulausbildung.</strong><strong> </strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_62811_Fahrschule.PNG"
        ],
        "audio": null,
        "audios": null,
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
        "type": "text-gap",
        "rubricHtml": "<p><strong>Freunde von Ihnen möchten eine Weiterbildung machen und suchen ein passendes Angebot in der Zeitung. Sie helfen Ihnen. Welche Anzeige passt zu welcher Person?</strong></p>\n\n<p><em>Lesen Sie und ergänzen Sie die Anzeigennummer. Eine Anzeige bleibt übrig.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in das vorgesehene Schreibfeld die Nummer der passenden Anzeige ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b2/media/S3_62813_Kleinanzeigen.PNG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Walter</strong><br>… ist pensioniert und möchte seinen Roman, den er schon vor 5 Jahren angefangen hat, fertig schreiben.&nbsp;Er wünscht sich einen Experten an seiner Seite und möchte andere Schreibende kennen lernen.</p>\n\n<p>Anzeige&nbsp;[[INPUT:RESPONSE0]]</p>\n\n<p><strong>Daniel</strong><br>… spielt seit seiner Schulzeit in verschiedenen Theatergruppen und möchte das Hobby zu seinem Beruf machen.</p>\n\n<p>Anzeige [[INPUT:RESPONSE1]]</p>\n\n<p><strong>Julia</strong><br>… hat Energie- und Umwelttechnik studiert und arbeitet seit 2 Jahren in einer Firma, die sich mit der Vermarktung von regenerativen Energien beschäftigt. Sie möchte mehr im Bereich Management lernen.</p>\n\n<p>Anzeige [[INPUT:RESPONSE2]]</p>\n\n<p><strong>Elena</strong><br>… arbeitet in einem Kinderheim. Davor hat sie eine Ausbildung zur Kindergärtnerin gemacht,&nbsp;weil sie gern mit Kindern zusammen arbeitet. Sie ist sehr kreativ und möchte sich nun in diesem Bereich weiterbilden.</p>\n\n<p>Anzeige&nbsp;[[INPUT:RESPONSE3]]</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "4"
            ],
            "primaryAnswer": "4"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "5"
            ],
            "primaryAnswer": "5"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "1"
            ],
            "primaryAnswer": "1"
          },
          "RESPONSE3": {
            "correctAnswers": [
              "3"
            ],
            "primaryAnswer": "3"
          }
        }
      },
      {
        "id": 9,
        "category": "Leseverstehen • Tag der offenen Tür an der VHS",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Sie bekommen einen Brief von der Volkshochschule.</strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_62818_Volkshochschule.PNG"
        ],
        "audio": null,
        "audios": null,
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": "Warum bekommen Sie einen Brief von der Volkshochschule?",
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
            "correct": "C0_1",
            "correctText": "Weil die Volkshochschule einen Tag der offenen Tür veranstaltet."
          },
          {
            "id": "RESPONSE1",
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
            "correct": "C1_0",
            "correctText": "Sie informieren über die Inhalte der Kurse."
          }
        ]
      },
      {
        "id": 10,
        "category": "Hörverstehen • Telekolleg & Bildungsfernsehen",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Im Radio: </strong><strong>Der Moderator kündigt einen Beitrag an.</strong><strong> </strong></p>\n\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und bearbeiten Sie die Aufgabe, indem Sie mit der Maus auf den Pfeil neben dem Feld \"Bitte wählen\" klicken. Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus. Führen Sie diesen Vorgang bei jedem Feld durch. Sie können sich den Text zwei Mal anhören.",
        "images": [
          "/level-tests/b2/media/S3_61818_11.699018271-H.jpg"
        ],
        "audio": "/level-tests/b2/media/S3_63593_GER-Test_B1_4.mp3",
        "audios": null,
        "templateHtml": "<p>Das Telekolleg gibt es seit [[SELECT:RESPONSE0]].</p>\n\n<p>Das Telekolleg war [[SELECT:RESPONSE1]].</p>\n\n<p>Mit dem Telekolleg konnte man [[SELECT:RESPONSE2]].</p>",
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
        }
      },
      {
        "id": 11,
        "category": "Leseverstehen • Portrait Joschka Fischer",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>In einer Zeitung finden Sie einen interessanten Artikel zur Person Joschka Fischers.</strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_61515_GER-Test_B1_Joschka_Fischer.JPG"
        ],
        "audio": null,
        "audios": null,
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": "Welche Überschrift passt am besten zu diesem Text?",
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
            "correct": "C0_0",
            "correctText": "der Werdegang Joschka Fischers vor seiner politischen Karriere"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": "Was ist „Libresso“?",
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
            "correct": "C1_0",
            "correctText": "eine Buchhandlung"
          },
          {
            "id": "RESPONSE2",
            "responseId": "RESPONSE2",
            "title": "Was für eine Ausbildung begann Joschka Fischer nach seiner Schulzeit?",
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
            "correct": "C2_1",
            "correctText": "eine Ausbildung zum Fotografen"
          }
        ]
      },
      {
        "id": 12,
        "category": "Leseverstehen • VHS Computerkurs",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Sie interessieren sich für einen Computerkurs. Sie finden folgende Kursbeschreibung.</strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_61518_GER-Test_B1_Vhs.JPG"
        ],
        "audio": null,
        "audios": null,
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": "An wen richtet sich der Kurs?",
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
            "correct": "C0_1",
            "correctText": "an Menschen, die den Computer für die Arbeit oder die Freizeit nutzen möchten"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": "Welches Thema wird z.B. im Kurs behandelt?",
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
            "correct": "C1_3",
            "correctText": "Textverarbeitung"
          }
        ]
      },
      {
        "id": 13,
        "category": "Hörverstehen • Physiker Stephen Hawking",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Sie hören im Radio eine Meldung. Ein Freund von Ihnen interessiert sich für Physik. Was berichten Sie ihm?</strong></p>\n\n<p><em>Hören Sie und wählen Sie aus.&nbsp;</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und bearbeiten Sie die Aufgabe, Sie mit der Maus auf den Pfeil neben dem Feld \"Bitte wählen\" klicken. Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus. Führen Sie diesen Vorgang bei jedem Feld durch. Sie können sich den Text zwei Mal anhören.",
        "images": [
          "/level-tests/b2/media/S3_61818_11.699018271-H.jpg"
        ],
        "audio": "/level-tests/b2/media/S3_63594_GER-Test_B1_5.mp3",
        "audios": null,
        "templateHtml": "<p>Ich habe im Radio gehört, dass Stephen Hawking [[SELECT:RESPONSE0]].</p>\n\n<p>Eine Wissenschaftsjournalistin hat [[SELECT:RESPONSE1]].</p>\n\n<p>Im Radio wurde [[SELECT:RESPONSE2]].</p>",
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
        }
      },
      {
        "id": 14,
        "category": "Leseverstehen & Zuordnung • Kulturveranstaltungen",
        "type": "text-gap",
        "rubricHtml": "<p><strong>In der Kulturzeitschrift Ihrer Stadt finden Sie viele interessante Veranstaltungen. Mit wem gehen Sie wohin?</strong></p>\n\n<p><em>Lesen Sie und ergänzen Sie die Nummer der passenden Veranstaltung. Eine Anzeige bleibt übrig.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in das vorgesehene Schreibfeld die Nummer der passenden Veranstaltung ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b2/media/S3_63865_GER-Test_B1_Veranstaltungskalender.JPG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>Anna</strong><br>... liebt klassische Musik und singt selbst in einem Chor.</p>\n\n<p>Anzeige&nbsp;[[INPUT:RESPONSE0]]</p>\n\n<p><strong>Erik</strong><br>... liest gern und viel, mag die neuere und unkonventionelle Literatur,&nbsp;interessiert sich für Computer.</p>\n\n<p>Anzeige [[INPUT:RESPONSE1]]</p>\n\n<p><strong>Maria<br></strong>... interessiert sich für die Geschichte Osteuropas und Russlands, mag&nbsp;Liebesfilme.</p>\n\n<p>Anzeige [[INPUT:RESPONSE2]]</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "1"
            ],
            "primaryAnswer": "1"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "2"
            ],
            "primaryAnswer": "2"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "4"
            ],
            "primaryAnswer": "4"
          }
        }
      },
      {
        "id": 15,
        "category": "Leseverstehen • Radwandern in Mitteldeutschland",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>In einem Fahrrad-Laden haben Sie eine Broschüre zum Thema Radwandern gefunden. Sie erzählen einem Freund davon. Was sagen Sie?</strong></p>\n\n<p><em>Lesen Sie und ergänzen Sie die Sätze.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_62956_Radwandern.PNG"
        ],
        "audio": null,
        "audios": null,
        "groups": [
          {
            "id": "RESPONSE0",
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
            "correct": "C0_1",
            "correctText": "dass man in Thüringen sehr schöne Radtouren machen kann."
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": "Die Radwanderwege …",
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
            "correct": "C1_2",
            "correctText": "sind nicht zu anspruchsvoll."
          }
        ]
      },
      {
        "id": 16,
        "category": "Leseverstehen • Radiosender Kolibri",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Ein Radiosender sucht Interessierte, die bei einer Sendung mitwirken möchten.&nbsp;Wer soll sich bei dem Radiosender melden?</strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus. </em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_62814_Kolibri-Radio.PNG"
        ],
        "audio": null,
        "audios": null,
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
        "type": "text-gap",
        "rubricHtml": "<p><b>Sie möchten im Radio ein Interview mit der Balletttänzerin Lena Ivanova hören. Der Empfang ist aber ganz schlecht. Sie verstehen die Fragen nicht.</b> <b>Was hat die Moderatorin wann gesagt?</b></p>\n\n<p><em>Ordnen Sie die Dialogteile der Moderatorin den Antworten von Lena Ivanova zu.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie bei A, B, C beziehungsweise D auf das Feld \"Play\". Hören Sie sich die Antworten der Tänzerin an und tragen Sie in das vorgesehene Schreibfeld die Nummer des passenden Dialogteils ein, die zu dieser Antwort passt. Sie können sich jeden Hörtext zwei Mal anhören.",
        "images": [
          "/level-tests/b2/media/S3_61816_11.701649550-H.jpg"
        ],
        "audio": null,
        "audios": [
          "/level-tests/b2/media/S3_63592_GER-Test_B1_6.2.mp3",
          "/level-tests/b2/media/S3_63595_GER-Test_B1_6.4.mp3",
          "/level-tests/b2/media/S3_63596_GER-Test_B1_6.3.mp3",
          "/level-tests/b2/media/S3_63590_GER-Test_B1_6.1.mp3"
        ],
        "templateHtml": "<p><strong>1</strong> Haben Sie dann Tanzunterricht genommen?</p>\n\n<p><strong>2</strong> In unserer Reihe „Hobbys und Passionen“ begrüße ich heute&nbsp;Lena.&nbsp;Herzlich Willkommen,&nbsp;Lena.</p>\n\n<p><strong>3</strong> Lena, Sie sind 22 Jahre alt und tanzen seit 17 Jahren. Wie sind Sie&nbsp;dazu&nbsp;gekommen?</p>\n\n<p><strong>4</strong> Und heute geben Sie selbst Ballettunterricht?</p>\n\n\n\n<p>Moderatorin:&nbsp;[[INPUT:RESPONSE0]]<br>Lena: Hörtext A</p>\n\n<p>Moderatorin:&nbsp;[[INPUT:RESPONSE1]]<br>Lena: Hörtext B</p>\n\n<p>Moderatorin:&nbsp;[[INPUT:RESPONSE2]]<br>Lena: Hörtext C</p>\n\n<p>Moderatorin:&nbsp;[[INPUT:RESPONSE3]]<br>Lena: Hörtext D</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "2"
            ],
            "primaryAnswer": "2"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "3"
            ],
            "primaryAnswer": "3"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "1"
            ],
            "primaryAnswer": "1"
          },
          "RESPONSE3": {
            "correctAnswers": [
              "4"
            ],
            "primaryAnswer": "4"
          }
        }
      },
      {
        "id": 18,
        "category": "Leseverstehen • Kochbücher im Vergleich",
        "type": "inline-dropdown",
        "rubricHtml": "<strong></strong>\n\t\t\t<p><strong>Sie möchten einer Freundin, die sich sehr für das Kochen interessiert, ein Buch schenken. Sie sind im Buchladen und haben zwei schöne Bücher gefunden.&nbsp;Sie lesen die Klappentexte und überlegen, welches Sie nehmen.</strong></p>\n\n\t\t\t<p><em>Lesen Sie und wählen Sie aus.&nbsp;</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil neben dem Feld \"Bitte wählen\". Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus. Führen Sie diesen Vorgang bei jedem Feld durch.",
        "images": [
          "/level-tests/b2/media/S3_16200_688_img.jpg"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p><strong>1. Die 100 besten Rezepte</strong><br>Das Buch richtet sich an Vegetarier oder einfach an Personen, die ab und zu fleischlos kochen. Auf ihren Reisen hat Christiane Fichtel in die Küchen der Welt geschaut und dabei Vegetarisches für Feinschmecker zusammengetragen. Hier finden Sie lateinamerikanische und fernöstliche Kreationen, ebenso wie traditionelle und neue Gerichte aus ganz Europa.</p>\n          <p>Mir gefällt dieses Buch, weil [[SELECT:RESPONSE0]].</p>\n          <hr class=\"my-4 border-surface-variant/40\" />\n          <p><strong>2. Schönecks Kochschule</strong><br>Kochen lernen mit Friedrich Schöneck! Jetzt kann man nachlesen, wie er die wichtigsten Klassiker zubereitet. Er zeigt, wie er Semmelknödel macht, stellt grundlegende Garmethoden vor und verrät, wie er Bratkartoffeln perfekt brät. Alle wichtigen Kochvorgänge sind in Fotos Schritt für Schritt dargestellt.</p>\n          <p>Mir gefällt dieses Buch, weil [[SELECT:RESPONSE1]].</p>",
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
        }
      },
      {
        "id": 19,
        "category": "Hörverstehen • Herr Neumanns Beruf",
        "type": "single-choice",
        "rubricHtml": "<p><strong>Herr Neumann erzählt. Welchen Beruf hat Herr Neumann?</strong></p>\n\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_16218_707_img.jpg"
        ],
        "audio": "/level-tests/b2/media/S3_63599_GER-Test_B1_7.mp3",
        "audios": null,
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
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Im Dorfmuseum können Sie sich über die Geschichte von Rabbendorf informieren.</strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus.&nbsp;</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_62659_Rabbendorf.PNG"
        ],
        "audio": null,
        "audios": null,
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": "Welche geografischen Informationen bekommen Sie über Rabbendorf?",
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
            "correct": "C0_1",
            "correctText": "Das Dorf liegt in einem Flusstal."
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": "Was wird über die Anfänge des Dorfes berichtet?",
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
            "correct": "C1_2",
            "correctText": "Es gab zunächst zwei Dörfer, die dann zusammengelegt wurden."
          },
          {
            "id": "RESPONSE2",
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
            "correct": "C2_2",
            "correctText": "1870"
          }
        ]
      },
      {
        "id": 21,
        "category": "Leseverstehen & Zuordnung • Vereinslandschaft",
        "type": "text-gap",
        "rubricHtml": "<p><strong>In Rabbendorf gibt es viele Vereine. Im Informationsblatt zum Dorfjubiläum werden die verschiedenen Vereine vorgestellt.</strong></p>\n\n<p><em>Lesen Sie und ergänzen Sie die passende Vereinsnummer. Drei Vereine bleiben übrig.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in das vorgesehene Schreibfeld die Nummer des passenden Vereins ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b2/media/S3_61516_GER-Test_B1_Vereine_in_Rabbendorf.JPG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>[[INPUT:RESPONSE0]]<br>Den Verein gründete eine Gruppe älterer Dorfbewohner erst letztes Jahr und hat nach so kurzer Zeit schon große Erfolge zu verzeichnen. Getreu dem Motto „Fit und gesund ins Alter“ bietet der Verein Seniorengymnastik, Yoga und schonendes Nordic-Walking-Training an. 36 Mitglieder zählt die unternehmensfreudige Sportgruppe bereits.</p>\n\n<p>[[INPUT:RESPONSE1]]<br>Der Verein wurde 1991 gegründet und hat sich zur Aufgabe gemacht, die verschiedenen Wanderwege in und um Rabbendorf zu pflegen und zu erweitern. Historische Orte, Naturbesonderheiten und landschaftliche Kostbarkeiten sollen zugänglich gemacht werden. Die ehemalige Wassermühle im nahe gelegenen Rabbenwald wurde gemeinschaftlich restauriert und dient als Veranstaltungsort für verschiedene Sommerfeste und kulturelle Events.</p>\n\n<p>[[INPUT:RESPONSE2]]<br>Dieser traditionsreiche Verein gründete sich bereits 1812 und stellt somit den ältesten Verein des Dorfes dar. Alljährlich findet das überregional bekannte so genannte „Rabbendorfer Schießfest“ statt, bei dem es um Treffsicherheit im Tontauben-Schießen, Pfeil-und-Bogen-Schießen und Blechbüchsenwerfen geht.</p>\n\n<p>[[INPUT:RESPONSE3]]<br>Wenn´s mal brennt sind sie zur Stelle: Die 25 Jungen und Mädchen trainieren regelmäßig einmal pro Woche auf dem Dorfplatz und im Depot neben dem Löschwasserteich. Engagierte Väter haben den Verein 1975 ins Leben gerufen und deren Kinder leiten und organisieren heute die Übungen.</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "7"
            ],
            "primaryAnswer": "7"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "4"
            ],
            "primaryAnswer": "4"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "6"
            ],
            "primaryAnswer": "6"
          },
          "RESPONSE3": {
            "correctAnswers": [
              "5"
            ],
            "primaryAnswer": "5"
          }
        }
      },
      {
        "id": 22,
        "category": "Hörverstehen • Stimmen auf dem Jahrmarkt",
        "type": "text-gap",
        "rubricHtml": "<p><b>Anlässlich der 700-Jahr-Feier des Ortes gibt es auf dem Dorfplatz einen Jahrmarkt. Viele Menschen sind dort und es ist sehr laut. Alle reden durcheinander.</b> <b>Welche Gesprächsteile gehören zusammen?</b></p>\n\n<p><em>Hören Sie und ergänzen Sie die passende Nummer. Drei Dialogteile bleiben übrig.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie bei A, B beziehungsweise C auf das Feld \"Play\". Hören Sie sich die Dialogteile an und beantworten Sie die Frage, indem Sie in das vorgesehene Schreibfeld die Nummer des passenden Dialogteils schreiben. Sie können jeden Hörtext mehrmals anhören.",
        "images": [
          "/level-tests/b2/media/S3_63850_BEIERO_060101_012_Volksfest.jpg"
        ],
        "audio": null,
        "audios": [
          "/level-tests/b2/media/S3_63597_GER-Test_B1_8.1.mp3",
          "/level-tests/b2/media/S3_63598_GER-Test_B1_8.2.mp3",
          "/level-tests/b2/media/S3_63600_GER-Test_B1_8.3.mp3"
        ],
        "templateHtml": "<p><strong>Mögliche Antworten:</strong><br>\n          <strong>1</strong> – Doch, bestimmt geht es gleich los.<br>\n          <strong>2</strong> – Ja, auf dem Kunsthandwerksmarkt gibt es welche.<br>\n          <strong>3</strong> – Ja, die Fahrt kostet nur 1 Euro, aber vor dem Eingang steht eine lange Warteschlange.<br>\n          <strong>4</strong> – Nein, das ist mir jetzt zu süß, ich brauch irgendwas Herzhaftes. Möchte jemand eine Bratwurst?<br>\n          <strong>5</strong> – Nein, ich hab kein Kleingeld mehr. Nur einen 10-Euro-Schein.<br>\n          <strong>6</strong> – Nein, nirgends, nur noch auf dem Parkplatz am Ortseingang.</p>\n          <p><strong>Hörbeispiel 1</strong> – Dialogteil (Nr. 1–6): [[INPUT:RESPONSE0]]</p>\n          <p><strong>Hörbeispiel 2</strong> – Dialogteil (Nr. 1–6): [[INPUT:RESPONSE1]]</p>\n          <p><strong>Hörbeispiel 3</strong> – Dialogteil (Nr. 1–6): [[INPUT:RESPONSE2]]</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "4"
            ],
            "primaryAnswer": "4"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "2"
            ],
            "primaryAnswer": "2"
          },
          "RESPONSE2": {
            "correctAnswers": [
              "6"
            ],
            "primaryAnswer": "6"
          }
        }
      },
      {
        "id": 23,
        "category": "Wortschatz & Logik • Die Eiskarte",
        "type": "multiple-choice",
        "rubricHtml": "<p><b>Sie möchten auf dem Jahrmarkt Eis essen. Jemand hat zum Spaß die Tafel des Eisstandes verändert! Wenn das der Verkäufer wüsste!</b> <b>Welche der folgenden Geschmacksrichtungen muss&nbsp;er herausstreichen?</b></p>\n\n<p><em>Lesen Sie und wählen Sie aus. Es sind mehrere Antworten richtig.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Frage, indem Sie das Feld neben den korrekten Antworten durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_16202_690_img.jpg"
        ],
        "audio": null,
        "audios": null,
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
        "correctAnswerTexts": [
          "Buch",
          "Fisch",
          "Kartoffel",
          "Vaseline"
        ],
        "maxChoices": null
      },
      {
        "id": 24,
        "category": "Hörverstehen • Begegnung auf dem Jahrmarkt",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Sie lernen auf dem Jahrmarkt Frau Richter kennen. Später erzählen Sie von der Begegnung.</strong></p>\n\n<p><em>Hören Sie und wählen Sie aus.&nbsp;</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\" und hören Sie sich den Text an. Zur Bearbeitung der Aufgabe klicken Sie dann bitte mit der Maus auf den Pfeil neben dem Feld \"Bitte wählen\". Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus. Führen Sie diesen Vorgang bei jedem Feld durch. Sie können sich den Text zwei Mal anhören.",
        "images": [
          "/level-tests/b2/media/S3_16217_710_img.jpg"
        ],
        "audio": "/level-tests/b2/media/S3_63604_GER-Test_B1_9.mp3",
        "audios": null,
        "templateHtml": "<p>Ich hatte gefragt, [[SELECT:RESPONSE0]].</p>\n\n<p>Dann hat sie mir erzählt, dass&nbsp;[[SELECT:RESPONSE1]].</p>",
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
        }
      },
      {
        "id": 25,
        "category": "Hörverstehen • Verband Fremdsprachiger Medien",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Im Radio hören Sie einen Beitrag über den „Verband Fremdsprachiger Medien“.</strong></p>\n\n<p><em>Hören Sie und wählen Sie aus.&nbsp;</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\". Hören Sie sich den Text an und beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. Sie können sich den Text zwei Mal anhören.",
        "images": [
          "/level-tests/b2/media/S3_61815_11.706787863-H.jpg"
        ],
        "audio": "/level-tests/b2/media/S3_63602_GER-Test_B1_10.mp3",
        "audios": null,
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": "Mit wem spricht der Moderator?",
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
            "correct": "C0_1",
            "correctText": "mit der Vorsitzenden des Verbandes"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": "Welche Aufgaben hat der Verband?",
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
            "correct": "C1_0",
            "correctText": "Beratung und Vermarktung"
          },
          {
            "id": "RESPONSE2",
            "responseId": "RESPONSE2",
            "title": "Was wird im Archiv gesammelt?",
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
            "correct": "C2_1",
            "correctText": "fremdsprachige Publikationen, die im deutschen Sprachraum erschienen sind"
          }
        ]
      },
      {
        "id": 26,
        "category": "Hörverstehen • Kulturnachrichten im Radio",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Dann hören Sie die Kulturnachrichten. Es werden interessante Veranstaltungen für das ganze Jahr angekündigt.&nbsp;Wo finden die Veranstaltungen statt?&nbsp;</strong></p>\n\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Klicken Sie auf das Feld \"Play\" und hören Sie sich den Text an. Zur Bearbeitung der Aufgabe ziehen Sie den Dialogteil an die richtige Stelle. Sie können Ihre Wahl auch noch ändern, bevor Sie auf OK klicken. Ziehen Sie einfach den Dialogteil an eine andere Stelle.",
        "images": [
          "/level-tests/b2/media/S3_61818_11.699018271-H.jpg"
        ],
        "audio": "/level-tests/b2/media/S3_63605_GER-Test_B1_11.mp3",
        "audios": null,
        "templateHtml": "<p><strong>Bundesgartenschau:</strong> [[SELECT:RESPONSE0]]</p>\n          <p><strong>Dokumenta:</strong> [[SELECT:RESPONSE1]]</p>\n          <p><strong>Handball-WM:</strong> [[SELECT:RESPONSE2]]</p>\n          <p><strong>Radsport-WM:</strong> [[SELECT:RESPONSE3]]</p>",
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
        }
      },
      {
        "id": 27,
        "category": "Leseverstehen • Werbebrief Ulmer Volkszeitung",
        "type": "inline-dropdown",
        "rubricHtml": "<p><strong>Sie bekommen einen Werbebrief.&nbsp;</strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus.&nbsp;</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil neben dem Feld \"Bitte wählen\". Es öffnet sich ein Menü mit Antwortmöglichkeiten. Wählen Sie die richtige Lösung durch erneutes Anklicken mit der Maus aus. Führen Sie diesen Vorgang bei jedem Feld durch.",
        "images": [
          "/level-tests/b2/media/S3_61513_GER-Test_B1_Ulmer_Stadtzeitung.JPG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Der Chefredakteur der Ulmer Volkszeitung schreibt diesen Brief, [[SELECT:RESPONSE0]].</p>\n\n<p>Mit dem Gutschein kann man [[SELECT:RESPONSE1]].</p>",
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
        }
      },
      {
        "id": 28,
        "category": "Leseverstehen • Regisseur Florian Henckel",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>In der Zeitung finden Sie einen Artikel über den Regisseur Florian Henckel von Donnersmarck.</strong></p>\n\n<p><em>Lesen Sie und wählen Sie aus.</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_62958_Florian_Henkel_von_Donnersmarck.JPG"
        ],
        "audio": null,
        "audios": null,
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": "Wofür bekommt Donnersmarck den Bayrischen und den Deutschen Filmpreis?",
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
            "correct": "C0_2",
            "correctText": "für Regie und Drehbuch seines ersten Spielfilms"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": "Was hat der Regisseur nach dem Abitur zuerst studiert?",
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
            "correct": "C1_2",
            "correctText": "Donnersmark studierte Russisch in Leningrad."
          }
        ]
      },
      {
        "id": 29,
        "category": "Leseverstehen & Recherche • Filmsuche im Web",
        "type": "text-gap",
        "rubricHtml": "<p><strong>Sie suchen daraufhin im Internet Informationen über den Film. Sie sehen das Suchergebnis: Diese Internet-Seiten haben Sie zur Auswahl.</strong></p>\n\n<p><em>Lesen Sie und ergänzen Sie die passende Nummer.</em></p>",
        "promptHtml": "",
        "help": "Zur Bearbeitung der Aufgabe geben Sie in das vorgesehene Schreibfeld die Nummer der passenden Internetseite ein. Verwenden Sie bitte keine zusätzlichen Leerzeichen.",
        "images": [
          "/level-tests/b2/media/S3_62810_Das_Leben_der_Anderen.PNG"
        ],
        "audio": null,
        "audios": null,
        "templateHtml": "<p>Auf welcher Seite finden Sie eine Inhaltsangabe des Films?&nbsp;</p>\n\n<p>[[INPUT:RESPONSE0]]</p>\n\n<p>Auf welcher Seite können Sie erfahren, wo der Film gezeigt wird?&nbsp;</p>\n\n<p>[[INPUT:RESPONSE1]]<br>&nbsp;</p>",
        "gaps": {
          "RESPONSE0": {
            "correctAnswers": [
              "2"
            ],
            "primaryAnswer": "2"
          },
          "RESPONSE1": {
            "correctAnswers": [
              "4"
            ],
            "primaryAnswer": "4"
          }
        }
      },
      {
        "id": 30,
        "category": "Leseverstehen • Filmbeschreibung 'Das Leben der Anderen'",
        "type": "grouped-choice",
        "rubricHtml": "<p><strong>Sie finden daraufhin diese Filmbeschreibung im Internet.</strong></p>\n\n<p><em>Lesen Sie den Text und wählen Sie aus..</em></p>",
        "promptHtml": "",
        "help": "Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren.",
        "images": [
          "/level-tests/b2/media/S3_63851_Leben_der_Anderen_1.jpg"
        ],
        "audio": null,
        "audios": null,
        "groups": [
          {
            "id": "RESPONSE0",
            "responseId": "RESPONSE0",
            "title": "Was für ein Film ist „Das Leben der Anderen“?",
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
            "correct": "C0_1",
            "correctText": "ein Thriller über einen Stasi-Mitarbeiter und ein Paar, das überwacht wird"
          },
          {
            "id": "RESPONSE1",
            "responseId": "RESPONSE1",
            "title": "Welche Rolle spielt Ulrich Mühe?",
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
            "correct": "C1_2",
            "correctText": "einen Mitarbeiter der Stasi"
          }
        ]
      }
    ]
  }
};

export const LEVEL_TEST_LIST = [
  LEVEL_TESTS.a2,
  LEVEL_TESTS.b1,
  LEVEL_TESTS.b2,
];
