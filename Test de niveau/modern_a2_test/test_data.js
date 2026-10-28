// Cornelsen Deutsch als Fremdsprache - Niveau A1 Einstufungstest Data
const TEST_DATA = {
  "title": "Deutsch als Fremdsprache – Niveau A1",
  "subtitle": "Cornelsen Einstufungstest",
  "totalQuestions": 30,
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
      "images": [
        "media/S3_62661_Afg_1.png"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen&#160;Feld.&#160; Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. F&#252;hren Sie diesen Vorgang bei jedem Feld durch. showInHeader",
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
      "images": [
        "media/S3_61855_11.1215654055-H.jpg"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. showInHeader",
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
      "images": [
        "media/S3_61855_11.1215654055-H.jpg"
      ],
      "audio": "media/audio_q03.mp3",
      "help": "_self Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie sich den Text an und beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. &#160; showInHeader",
      "responseId": "RESPONSE0",
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
      "rubricHtml": "<p><strong>Sie kommen bei Tim an. Tim stellt Ihnen seine Familie vor.  Wen stellt Tim vor?</strong></p>\n<p><em>Hören Sie und wählen Sie aus.<span style=\"display: inline !important; float: none; background-color: transparent; color: rgb(0, 0, 0); cursor: text; font-family: Times New Roman; font-size: 16px; font-style: italic; font-variant: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-decoration: none; text-indent: 0px; text-transform: none; -webkit-text-stroke-width: 0px; white-space: normal; word-spacing: 0px;\"> </span>Es sind mehrere Antworten richtig. </em></p>",
      "images": [
        "media/S3_14653_723_img.jpg"
      ],
      "audio": "media/audio_q04.mp3",
      "help": "_self Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie sich den Text an und beantworten Sie die Frage, indem Sie die Felder neben den korrekten Antworten durch Anklicken mit der Maus markieren. showInHeader",
      "responseId": "RESPONSE0",
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
      "images": [
        "media/S3_14632_620_img.jpg"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. showInHeader",
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
      "images": [
        "media/S3_14633_621_img.jpg"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe geben Sie in die Schreibfelder die Nummer des passenden Bildes ein. Verwenden Sie bitte keine zus&#228;tzlichen Leerzeichen. showInHeader",
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
      "images": [
        "media/S3_61500_GER_Test_A1_Einkaufszettel.jpg"
      ],
      "audio": null,
      "help": "_self Beantworten Sie die Frage, indem Sie die Felder neben den korrekten Antworten durch Anklicken mit der Maus markieren. showInHeader",
      "responseId": "RESPONSE0",
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
      "images": [
        "media/S3_63606_9783464247549_DIGI_BVG_190604_001_Bildschirm_Lang.jpg"
      ],
      "audio": null,
      "help": "_self Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. showInHeader",
      "responseId": "RESPONSE0",
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
      "images": [
        "media/S3_61840_11.646350211-H.jpg"
      ],
      "audio": "media/audio_q09.mp3",
      "help": "_self Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie sich den Text an und beantworten Sie die Fragen, indem Sie die richtigen Preise in die vorgesehenen Schreibfelder eintragen. showInHeader",
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
      "images": [
        "media/S3_61837_11.544291555-H.jpg"
      ],
      "audio": null,
      "help": "_self Beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. showInHeader",
      "templateHtml": "<p><strong>Wie fragen Sie nach dem Preis?</strong></p>\n<p>[[CHOICE_GROUP:RESPONSE0]]</p>\n<p><strong>Sie wollen die Blume in einer anderen Farbe. Wie fragen Sie?</strong></p>\n<p>[[CHOICE_GROUP:RESPONSE1]]</p>",
      "groups": [
        {
          "responseId": "RESPONSE0",
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
          "correctAnswer": "C0_0",
          "correctAnswerText": "Entschuldigung. Wie viel kostet die Blume?"
        },
        {
          "responseId": "RESPONSE1",
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
          "correctAnswer": "C1_0",
          "correctAnswerText": "Haben Sie diese Blume auch in anderen Farben?"
        }
      ]
    },
    {
      "id": 11,
      "category": "Hörverstehen & An der Kasse",
      "type": "grouped-choice",
      "rubricHtml": "<p><b>In der Apotheke: Sie haben Kopfschmerzen und wollen Tabletten kaufen. Die Apothekerin hat zwei Medikamente. </b></p>\n<p><em>Hören Sie und wählen Sie aus.</em></p>",
      "images": [
        "media/S3_61844_11.748964644-H.jpg"
      ],
      "audio": "media/audio_q11.mp3",
      "help": "_self Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie den Text und beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. showInHeader",
      "templateHtml": "<p><strong>Welches Medikament ist billiger?</strong><br>\n[[CHOICE_GROUP:RESPONSE0]]</p>\n<p><strong>Wie viele Tabletten sind in einer Packung?</strong><br>\n[[CHOICE_GROUP:RESPONSE1]]</p>",
      "groups": [
        {
          "responseId": "RESPONSE0",
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
          "correctAnswer": "C0_0",
          "correctAnswerText": "Relaxin"
        },
        {
          "responseId": "RESPONSE1",
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
          "correctAnswer": "C1_0",
          "correctAnswerText": "30"
        }
      ]
    },
    {
      "id": 12,
      "category": "Wortschatz & Familie",
      "type": "inline-dropdown",
      "rubricHtml": "<p><strong>Im Buchladen:  Sie sprechen mit dem Verkäufer. Sie möchten ein Buch zurückgeben. </strong></p>\n<p><em>Wählen Sie aus.</em></p>",
      "images": [
        "media/S3_61851_11.1189592065-H.jpg"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. showInHeader",
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
      "images": [
        "media/S3_61843_11.686254462-H.jpg"
      ],
      "audio": null,
      "help": "_self Beantworten Sie die Frage, indem Sie die Felder neben den korrekten Antworten durch Anklicken mit der Maus markieren. showInHeader",
      "responseId": "RESPONSE0",
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
      "images": [
        "media/S3_61838_11.492002995-H.jpg"
      ],
      "audio": null,
      "help": "_self Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren showInHeader",
      "responseId": "RESPONSE0",
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
      "images": [
        "media/S3_61832_11.153038393-H.jpg"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. showInHeader",
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
      "images": [
        "media/S3_62000_11.183432542-H.jpg"
      ],
      "audio": null,
      "help": "_self Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. showInHeader",
      "responseId": "RESPONSE0",
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
      "images": [
        "media/S3_61833_11.154947881-H.jpg"
      ],
      "audio": "media/audio_q17.mp3",
      "help": "_self Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie sich den Text an und beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. showInHeader",
      "responseId": "RESPONSE0",
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
      "images": [
        "media/S3_61842_11.710184487-H.jpg"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. showInHeader",
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
      "images": [
        "media/S3_63852_Wettervorhersage1.PNG"
      ],
      "audio": null,
      "help": "_self Beantworten Sie die Frage, indem Sie das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. showInHeader",
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
      "images": [
        "media/S3_61857_DEUTBA_190416_001_DB116783.jpg"
      ],
      "audio": "media/audio_q20.mp3",
      "help": "_self Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie den Text und beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. showInHeader",
      "templateHtml": "<p><strong>Welche Haltestelle ist die nächste?</strong><br>\n[[CHOICE_GROUP:RESPONSE0]]</p>\n<p><strong>Wann fährt der Zug nach Meißen?</strong><br>\n[[CHOICE_GROUP:RESPONSE1]]</p>",
      "groups": [
        {
          "responseId": "RESPONSE0",
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
          "correctAnswer": "C0_0",
          "correctAnswerText": "Dresden-Neustadt"
        },
        {
          "responseId": "RESPONSE1",
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
          "correctAnswer": "C1_0",
          "correctAnswerText": "13:15 Uhr"
        }
      ]
    },
    {
      "id": 21,
      "category": "Grammatik & Höfliche Bitte",
      "type": "inline-dropdown",
      "rubricHtml": "<p><strong>In der Tourist-Information:  Sie fragen nach Informationsbroschüren über die Stadt. Wie fragen Sie?</strong></p>\n<p><em>Wählen Sie aus. </em></p>",
      "images": [
        "media/S3_62963_11.53356627-H.jpg"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe klicken Sie bitte mit der Maus auf den Pfeil im grauen Feld. Es &#246;ffnet sich ein Men&#252; mit Antwortm&#246;glichkeiten. W&#228;hlen Sie die richtige L&#246;sung durch erneutes Anklicken mit der Maus aus. showInHeader",
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
      "images": [
        "media/S3_63608_9783464247549_DIGI_11.686827978-H.jpg",
        "media/S3_63607_9783464247549_DIGI_16.1097374-H__1_.jpg",
        "media/S3_63609_9783464247549_DIGI_11.230867077-H.jpg"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe geben Sie in die Schreibfelder die Nummer des passenden Bildes ein. Verwenden Sie bitte keine zus&#228;tzlichen Leerzeichen. showInHeader",
      "templateHtml": "<p>1. Schlossturm: Schlossplatz, Georgenbau, April-Okt. Di-So 10-18 Uhr; Erwachsene 3,50 €, Ermäßigt 2 €</p>\n<p>2. Der Große Garten ist ein sehr schöner, alter Park. Viele Menschen treiben dort Sport. Sie fahren Rad, spielen Golf und joggen.</p>\n<p>3. „Die Zauberflöte“ von Mozart in der Semperoper, 05.10.-28.11., Karten: 48,-€ im Vorverkauf<br>\n </p>\n<p>Sie können den Schlossturm im November besichtigen.</p>\n<p>[[CHOICE_GROUP:RESPONSE0]]</p>\n<p>Den Schlossturm können Sie im Mai montags besichtigen.</p>\n<p>[[CHOICE_GROUP:RESPONSE1]]</p>\n<p>Sie können die Zauberflöte im November sehen.</p>\n<p>[[CHOICE_GROUP:RESPONSE2]]</p>\n<p>Im Großen Garten können Sie joggen gehen. </p>\n<p>[[CHOICE_GROUP:RESPONSE3]]</p>",
      "groups": [
        {
          "responseId": "RESPONSE0",
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
          "correctAnswer": "C0_1",
          "correctAnswerText": "falsch"
        },
        {
          "responseId": "RESPONSE1",
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
          "correctAnswer": "C1_1",
          "correctAnswerText": "falsch"
        },
        {
          "responseId": "RESPONSE2",
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
          "correctAnswer": "C2_0",
          "correctAnswerText": "richtig"
        },
        {
          "responseId": "RESPONSE3",
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
          "correctAnswer": "C3_0",
          "correctAnswerText": "richtig"
        }
      ]
    },
    {
      "id": 23,
      "category": "Hörverstehen & Führung",
      "type": "text-gap",
      "rubricHtml": "<p><b>Besuch der Gläsernen Manufaktur: Man muss sich anmelden. Sie rufen an. Eine Frau sagt Ihnen, wann die nächste Führung ist. Wann können Sie an einer Führung teilnehmen?</b></p>\n<p><em>Hören Sie und ergänzen Sie Wochentag und Uhrzeit. (Beispiel: Montag  11.45)</em></p>",
      "images": [
        "media/S3_61828_11.84981487-H.jpg"
      ],
      "audio": "media/audio_q23.mp3",
      "help": "_self Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie sich den Text an und beantworten Sie die Frage, indem Sie in die vorgesehenen Schreibfelder jeweils die richtige Information schreiben, um das Geh&#246;rte wiederzugeben. showInHeader",
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
      "images": [
        "media/S3_61841_11.659993368-H.jpg"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe ordnen Sie die Dialogteile in die richtige&#160;Reihenfolge. Sie k&#246;nnen Ihre Wahl jederzeit &#228;ndern. Ziehen Sie einfach den Dialogteil an eine andere Stelle. showInHeader",
      "responseId": "RESPONSE0",
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
      "images": [
        "media/S3_61846_11.758052616-H.jpg"
      ],
      "audio": "media/audio_q25.mp3",
      "help": "_self Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie den Text und beantworten Sie die Fragen, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. showInHeader",
      "templateHtml": "<p><strong>Wann sollen Sie zum Bewerbungsgespräch kommen?</strong><br>\n[[CHOICE_GROUP:RESPONSE0]]</p>\n<p><strong>Wie lange dauert das Bewerbungsgespräch wahrscheinlich?</strong><br>\n[[CHOICE_GROUP:RESPONSE1]]</p>",
      "groups": [
        {
          "responseId": "RESPONSE0",
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
          "correctAnswer": "C0_0",
          "correctAnswerText": "Montag"
        },
        {
          "responseId": "RESPONSE1",
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
          "correctAnswer": "C1_0",
          "correctAnswerText": "30 Minuten"
        }
      ]
    },
    {
      "id": 26,
      "category": "Leseverstehen & Information suchen",
      "type": "text-gap",
      "rubricHtml": "<p><b>Sie wollen ein Buch über Bewerbungsgespräche lesen. Sie möchten eines von der Bibliothek ausleihen. Das Problem: Es ist Samstag 11 Uhr! Welche Bibliothek hat noch geöffnet?</b></p>\n<p><em>Ergänzen<em> </em>Sie die Nummer der geöffneten Bibliothek. </em></p>",
      "images": [
        "media/S3_61501_GER_Test_A1_Bibliotheken.jpg"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe geben Sie in das Schreibfeld die Zahl der passenden Bibliothek ein. Verwenden Sie bitte keine zus&#228;tzlichen Leerzeichen. showInHeader",
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
      "images": [
        "media/S3_61839_11.633287756-H.jpg"
      ],
      "audio": "media/audio_q27.mp3",
      "help": "_self Klicken Sie bei 1, beziehungsweise 2 auf das Feld &#34;Play&#34;. H&#246;ren Sie die Texte und bearbeiten Sie die Aufgabe, indem Sie jeweils das Feld neben der korrekten Antwort durch Anklicken mit der Maus markieren. showInHeader",
      "templateHtml": "<p><strong>Ihre Antwort auf Frage 1:</strong></p>\n<p>[[CHOICE_GROUP:RESPONSE0]]</p>\n<p><strong>Ihre Antwort auf Frage 2:</strong></p>\n<p>[[CHOICE_GROUP:RESPONSE1]]</p>",
      "groups": [
        {
          "responseId": "RESPONSE0",
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
          "correctAnswer": "C0_0",
          "correctAnswerText": "Tut mir leid! Sie ist nicht da."
        },
        {
          "responseId": "RESPONSE1",
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
          "correctAnswer": "C1_0",
          "correctAnswerText": "Heute leider nicht mehr, aber morgen vielleicht."
        }
      ]
    },
    {
      "id": 28,
      "category": "Hörverstehen & Telefonnotiz",
      "type": "text-gap",
      "rubricHtml": "<p><strong>Ihre Kollegin soll Herrn Meier nächste Woche zurückrufen. Herr Meier gibt Ihnen seine Telefonnummer. </strong></p>\n<p><i>Hören Sie </i><em>und ergänzen Sie die Telefonnummer.</em></p>",
      "images": [
        "media/S3_61839_11.633287756-H.jpg"
      ],
      "audio": "media/audio_q28.mp3",
      "help": "_self Klicken Sie auf das Feld &#34;Play&#34;. H&#246;ren Sie sich den Text an und bearbeiten Sie die Aufgabe, indem Sie in das vorgesehene Schreibfeld die Telefonnummer schreiben. Verwenden Sie bitte keine zus&#228;tzlichen Leerzeichen. showInHeader",
      "templateHtml": "<p style=\"line-height:1.38;margin-top:0pt;margin-bottom:0pt;\">Die Telefonnummer von Herrn Meier ist: [[INPUT:RESPONSE0]]</p>",
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
      "images": [
        "media/S3_61850_11.1007757580-H.jpg"
      ],
      "audio": null,
      "help": "_self Zur Bearbeitung der Aufgabe ordnen Sie die Dialogteile in die richtige&#160;Reihenfolge. Sie k&#246;nnen Ihre Wahl jederzeit &#228;ndern. Ziehen Sie einfach den Dialogteil an eine andere Stelle. showInHeader",
      "responseId": "RESPONSE0",
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
      "images": [
        "media/S3_63610_Lotto__vhs_Anmeldung___berweisung.JPG"
      ],
      "audio": null,
      "help": "_self Beantworten Sie die Frage, indem Sie in die jeweiligen Schreibfelder die Nummer des passenden Formulars eingeben. Verwenden Sie bitte keine zus&#228;tzlichen Leerzeichen. showInHeader",
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
};
