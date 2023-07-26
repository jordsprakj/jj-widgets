$(document).ready(function() {
  var currentVerse;
  var showNIV = false;
  var showKJV = false;
  var showYLT = false;
 

  // refresh button
  showNIV = $('#option1').click(function() {
    showKJV = false;
    showYLT = false;
    showNIV = true;
    $('.kjv').hide();
    $('.ylt').hide();
    $('.niv').show();
  });

  showKJV = $('#option2').click(function() {
    showKJV = true;
    showYLT = false;
    showNIV = false;
    $('.kjv').show();
    $('.ylt').hide();
    $('.niv').hide();
  });

  showYLT = $('#option3').click(function() {
    showKJV = false;
    showYLT = true;
    showNIV = false;
    $('.kjv').hide();
    $('.ylt').show();
    $('.niv').hide();
  });

  $(document).on('click', '.refresh', function() {
    if (showKJV) {
      showkjv();
    } else if (showYLT) {
      showylt();
    } else if (showNIV) {
      showniv();
    }
  });

  function showkjv() {
    $.ajax({
      url: 'https://labs.bible.org/api/',
      type: 'GET',
      dataType: 'jsonp',
      data: {
        passage: 'random',
        type: 'json',
        formatting: 'plain'
      },
      success: function(response) {
        var data1 = response[0];
        $('.reference').text(data1.bookname + ' ' + data1.chapter + ':' + data1.verse);

        function againKJV() {
          $.ajax({
            url: 'https://bible-api.com/' + data1.bookname + data1.chapter + ':' + data1.verse + '?' + 'translation=kjv',
            type: 'GET',
            dataType: 'jsonp',
            success: function(verseKJV) {
              $('.kjv').text(verseKJV.text);
            },
            error: function(error) {
              console.error('Request failed. Status:', error);
            }
          });
        }

        function KsetNIV() {
          $('.niv').text(data1.text)
        }

        function KsetYLT(bookNr) {
          $.ajax({
            url: 'https://api.getbible.net/v2/ylt/' + bookNr + '/' + data1.chapter + '.json',
            type: 'GET',
            success: function(versionYLT) {
              var verses102 = versionYLT.verses;
              var targetVerse102 = verses102.find(verse => parseInt(verse.verse) === parseInt(data1.verse));
              
              if (targetVerse102) {
                $('.ylt').text(targetVerse102.text);
              } else {
                console.error('Verse is not found');
              }
            },
            error: function(error) {
              console.error('Request failed. Status:', error);
            }
          });
        }
        getBookNr(data1.bookname, function(bookNr) {
          KsetYLT(bookNr);
        });
        
        againKJV();
        KsetNIV();
        KsetYLT();

      },
      error: function(error) {
        console.error('Request failed. Status:', error);
      }
    });
  }

  function showylt() {
    console.log('showylt() called');
    $.ajax({
      url: 'https://labs.bible.org/api/',
      type: 'GET',
      dataType: 'jsonp',
      data: {
        passage: 'random',
        type: 'json',
        formatting: 'plain'
      },
      success: function(response) {
        var data2 = response[0];

        function againYLT(bookNr) {
          $.ajax({
            url: 'https://api.getbible.net/v2/ylt/' + bookNr + '/' + data2.chapter + '.json',
            type: 'GET',
            success: function(versionYLT101) {
              var verses101 = versionYLT101.verses;
              var targetVerse101 = verses101.find(verse => parseInt(verse.verse) === parseInt(data2.verse));
              
              if (targetVerse101) {
                $('.ylt').text(targetVerse101.text);
              
              } else {
                console.error('Verse is not found');
              }
            },
            error: function(error) {
              console.error('Request failed. Status:', error);
            }
          });
        }

        getBookNr(data2.bookname, function(bookNr) {
          againYLT(bookNr);
        });

        function YsetNIV() {
          $('.niv').text(data2.text)
        }

        function YsetKJV() {
          $.ajax({
            url: 'https://bible-api.com/' + data2.bookname + data2.chapter + ':' + data2.verse + '?' + 'translation=kjv',
            type: 'GET',
            dataType: 'jsonp',
            success: function(verseKJV) {
              $('.kjv').text(verseKJV.text);
            },
            error: function(error) {
              console.error('Request failed. Status:', error);
            }
          });
        }
        againYLT();
        YsetNIV();
        YsetKJV();
      },
      error: function(error) {
        console.error('Request failed. Status:', error);
      }
    });
  }

  function getBookNr(bookname, callback) {
    for (var key in Books) {
      var book = Books[key];
      if (Books.hasOwnProperty(key) && book.name === bookname) {
        var bookNr = book.nr;
        callback(bookNr);
        break;
      }
    }
  }

  function showniv() {
    $.ajax({
      url: 'https://labs.bible.org/api/',
      type: 'GET',
      dataType: 'jsonp',
      data: {
        passage: 'random',
        type: 'json',
        formatting: 'plain'
      },
      success: function(response) {
        data3 = response[0];
        displayNIV();
        $('.reference').text(data3.bookname + ' ' + data3.chapter + ':' + data3.verse);

        

        function NsetKJV() {
          $.ajax({
            url: 'https://bible-api.com/' + data3.bookname + data3.chapter + ':' + data3.verse + '?' + 'translation=kjv',
            type: 'GET',
            dataType: 'jsonp',
            success: function(verseKJV) {
              $('.kjv').text(verseKJV.text);
            },
            error: function(error) {
              console.error('Request failed. Status:', error);
            }
          });
        }

        function NsetYLT(bookNr) {
          $.ajax({
            url: 'https://api.getbible.net/v2/ylt/' + bookNr + '/' + data3.chapter + '.json',
            type: 'GET',
            success: function(versionYLT) {
              var verses103 = versionYLT.verses;
              var targetVerse103 = verses103.find(verse => parseInt(verse.verse) === parseInt(data3.verse));
              
              if (targetVerse103) {
                $('.ylt').text(targetVerse103.text);
              
              } else {
                console.error('Verse is not found');
              }
            },
            error: function(error) {
              console.error('Request failed. Status:', error);
            }
          });
        }
        getBookNr(data3.bookname, function(bookNr) {
          NsetYLT(bookNr);
        });

        displayNIV();
        NsetYLT();
        NsetKJV();
      },
      error: function( status, error) {
        console.error('Request failed. Status:', status, 'Error:', error);
      }
    });
  }

  // To upload the verse
  function getVerse() {
    $.ajax({
      url: 'https://labs.bible.org/api/',
      type: 'GET',
      dataType: 'jsonp',
      data: {
        passage: 'random',
        type: 'json',
        formatting: 'plain'
      },
      success: function(response) {
        currentVerse = response[0];
        displayNIV();
        fetchKJV();
        getBookNr(currentVerse.bookname, function(bookNr) {
          fetchYLT(bookNr);
        });
      },
      error: function( status, error) {
        console.error('Request failed. Status:', status, 'Error:', error);
      }
   });
  };

  function displayNIV() {
    $('.verse').text(currentVerse.text);
    $('.reference').text(currentVerse.bookname + ' ' + currentVerse.chapter + ':' + currentVerse.verse);
  };

  function fetchKJV() { 
    $.ajax({
      url: 'https://bible-api.com/' + currentVerse.bookname + currentVerse.chapter + ':' + currentVerse.verse + '?' + 'translation=kjv',
      type: 'GET',
      dataType: 'jsonp',
      success: function(versionKJV) {
        $('.kjv').text(versionKJV.text);
        $('.kjv').hide();
      },
      error: function(error) {
        console.error('Request failed. Status:', error);
      }
    });
  };

  function fetchYLT(bookNr) {
    $.ajax({
      url: 'https://api.getbible.net/v2/ylt/' + bookNr + '/' + currentVerse.chapter + '.json',
      type: 'GET',
      success: function(versionYLT) {
        var verses = versionYLT.verses;
        var targetVerse = verses.find(verse => parseInt(verse.verse) === parseInt(currentVerse.verse));

        if (targetVerse) {
          $('.ylt').text(targetVerse.text);
        } else {
          console.error('Verse is not found');
        }
      },
      error: function(error) {
        console.error('Request failed. Status:', error);
      }
    });
  }

getVerse();

var Books = {
  "1": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 1,
    "name": "Genesis",
    "url": "https://api.getbible.net/v2/ylt/1.json",
    "sha": "5c7ca97b53877bf2751ecd56a5afd8a261fac986"
  },
  "2": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 2,
    "name": "Exodus",
    "url": "https://api.getbible.net/v2/ylt/2.json",
    "sha": "6bd6c6799a5e81876e4499739ab4a7eaa3e4713d"
  },
  "3": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 3,
    "name": "Leviticus",
    "url": "https://api.getbible.net/v2/ylt/3.json",
    "sha": "18b424e8067debf5b1ae1d535bd5f258d0cc18dd"
  },
  "4": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 4,
    "name": "Numbers",
    "url": "https://api.getbible.net/v2/ylt/4.json",
    "sha": "0ff448ffd46a00b1569dfec5568bf9cbf9c6cb43"
  },
  "5": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 5,
    "name": "Deuteronomy",
    "url": "https://api.getbible.net/v2/ylt/5.json",
    "sha": "deb1930a504dee6a2d6d42597e0f4dd0cb589e9d"
  },
  "6": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 6,
    "name": "Joshua",
    "url": "https://api.getbible.net/v2/ylt/6.json",
    "sha": "c6f5f61da6c41526241b9d850eaf85513c1914e0"
  },
  "7": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 7,
    "name": "Judges",
    "url": "https://api.getbible.net/v2/ylt/7.json",
    "sha": "8173e73b21c2a84d5d9abc9cfae27d7e95e51e47"
  },
  "8": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 8,
    "name": "Ruth",
    "url": "https://api.getbible.net/v2/ylt/8.json",
    "sha": "f87448f3c6725f7c26b8870cd7c5cf246bd01fec"
  },
  "9": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 9,
    "name": "1 Samuel",
    "url": "https://api.getbible.net/v2/ylt/9.json",
    "sha": "bdd27d815ba2b50ae61d048e00c724a41f0b0dc8"
  },
  "10": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 10,
    "name": "2 Samuel",
    "url": "https://api.getbible.net/v2/ylt/10.json",
    "sha": "027c297405005d4701763adb34c51701d8901680"
  },
  "11": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 11,
    "name": "1 Kings",
    "url": "https://api.getbible.net/v2/ylt/11.json",
    "sha": "7b4470b6ed42bb7bede4aa3cd67d2ff38cde3018"
  },
  "12": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 12,
    "name": "2 Kings",
    "url": "https://api.getbible.net/v2/ylt/12.json",
    "sha": "1b88067cac7a364d67272ba9b0f8aa4610551a56"
  },
  "13": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 13,
    "name": "1 Chronicles",
    "url": "https://api.getbible.net/v2/ylt/13.json",
    "sha": "8eaaa80b582869f52923a21ec914dd0bd9761d53"
  },
  "14": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 14,
    "name": "2 Chronicles",
    "url": "https://api.getbible.net/v2/ylt/14.json",
    "sha": "908714f23f61f1195c355f307bc76cb48293aead"
  },
  "15": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 15,
    "name": "Ezra",
    "url": "https://api.getbible.net/v2/ylt/15.json",
    "sha": "f51e4eb38f51c50346a631251267a24ec4e47250"
  },
  "16": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 16,
    "name": "Nehemiah",
    "url": "https://api.getbible.net/v2/ylt/16.json",
    "sha": "2417148a77f24041d2258a7b639ba17bb3646595"
  },
  "17": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 17,
    "name": "Esther",
    "url": "https://api.getbible.net/v2/ylt/17.json",
    "sha": "c863d25de9fd4690e07f6c15a9fd3fa85879d3e0"
  },
  "18": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 18,
    "name": "Job",
    "url": "https://api.getbible.net/v2/ylt/18.json",
    "sha": "328fdf92fa2fe0c742dad952b9e6d2dbb78204b6"
  },
  "19": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 19,
    "name": "Psalms",
    "url": "https://api.getbible.net/v2/ylt/19.json",
    "sha": "65321fcfa35d553b0c9393ddc90e858bf4680219"
  },
  "20": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 20,
    "name": "Proverbs",
    "url": "https://api.getbible.net/v2/ylt/20.json",
    "sha": "36ffa4acdf0abb1b9d7400e5b752ea3480f6ad41"
  },
  "21": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 21,
    "name": "Ecclesiastes",
    "url": "https://api.getbible.net/v2/ylt/21.json",
    "sha": "2ed6fa4a65fdfab64cccb44b90b31ca42ed8db9f"
  },
  "22": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 22,
    "name": "Song of Songs",
    "url": "https://api.getbible.net/v2/ylt/22.json",
    "sha": "e83b01ee9168f5844947af3a2bfa90d567b9ba37"
  },
  "23": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 23,
    "name": "Isaiah",
    "url": "https://api.getbible.net/v2/ylt/23.json",
    "sha": "6374a611ec5e07140201e78d0ece1c4ed2da6397"
  },
  "24": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 24,
    "name": "Jeremiah",
    "url": "https://api.getbible.net/v2/ylt/24.json",
    "sha": "b49b3e46da9fe4741b59e132e563af8704f1d6ff"
  },
  "25": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 25,
    "name": "Lamentations",
    "url": "https://api.getbible.net/v2/ylt/25.json",
    "sha": "900efe17eb8876d1d162848d6a7c5150985bcc31"
  },
  "26": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 26,
    "name": "Ezekiel",
    "url": "https://api.getbible.net/v2/ylt/26.json",
    "sha": "fa21169c3d459a89f195f5e7f872eefcc206de17"
  },
  "27": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 27,
    "name": "Daniel",
    "url": "https://api.getbible.net/v2/ylt/27.json",
    "sha": "cfe9dc9e80d12d7472070799e8240c5f609c806d"
  },
  "28": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 28,
    "name": "Hosea",
    "url": "https://api.getbible.net/v2/ylt/28.json",
    "sha": "7080667e50caab4babbd11a3a0ab4b8d03bb002c"
  },
  "29": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 29,
    "name": "Joel",
    "url": "https://api.getbible.net/v2/ylt/29.json",
    "sha": "cc88895b4981117d80a9f0fddcf4547e19f4fc76"
  },
  "30": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 30,
    "name": "Amos",
    "url": "https://api.getbible.net/v2/ylt/30.json",
    "sha": "b14e6a3d1fa28f2fd5d18a2a3f8d1615c4f8a6db"
  },
  "31": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 31,
    "name": "Obadiah",
    "url": "https://api.getbible.net/v2/ylt/31.json",
    "sha": "026b6e1168a68632ccb6fec73df6b49eacf0c37f"
  },
  "32": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 32,
    "name": "Jonah",
    "url": "https://api.getbible.net/v2/ylt/32.json",
    "sha": "9bc0b6f0f5078b406afe264e627c7dbaff3a3851"
  },
  "33": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 33,
    "name": "Micah",
    "url": "https://api.getbible.net/v2/ylt/33.json",
    "sha": "71f55e90ba9f7fb628c30ebe70834faa409e4aa3"
  },
  "34": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 34,
    "name": "Nahum",
    "url": "https://api.getbible.net/v2/ylt/34.json",
    "sha": "9fb9cfa3611d3ccb8f6e6c76d8381a3638e8a139"
  },
  "35": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 35,
    "name": "Habakkuk",
    "url": "https://api.getbible.net/v2/ylt/35.json",
    "sha": "16adf9458485a3e16ad921d0c9b931c14bb3d070"
  },
  "36": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 36,
    "name": "Zephaniah",
    "url": "https://api.getbible.net/v2/ylt/36.json",
    "sha": "d3b71bebc7ab716ac9d04dd95131fac2e0d799fa"
  },
  "37": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 37,
    "name": "Haggai",
    "url": "https://api.getbible.net/v2/ylt/37.json",
    "sha": "596fa57642a8b91659a8c3510f9c200804566b4e"
  },
  "38": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 38,
    "name": "Zechariah",
    "url": "https://api.getbible.net/v2/ylt/38.json",
    "sha": "5a5fa0284083aa67435dac4a72270f349488e567"
  },
  "39": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 39,
    "name": "Malachi",
    "url": "https://api.getbible.net/v2/ylt/39.json",
    "sha": "4242e314bdcbc91acf70421b10607322bea362fd"
  },
  "40": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 40,
    "name": "Matthew",
    "url": "https://api.getbible.net/v2/ylt/40.json",
    "sha": "d5fcb3846e9e60d0c53590c7eba9c45ffcc35157"
  },
  "41": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 41,
    "name": "Mark",
    "url": "https://api.getbible.net/v2/ylt/41.json",
    "sha": "522e36835477e325b28f7f68dbd5c6c0648b17c0"
  },
  "42": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 42,
    "name": "Luke",
    "url": "https://api.getbible.net/v2/ylt/42.json",
    "sha": "44cf789e2caa76125a730c5e66044540637f07ad"
  },
  "43": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 43,
    "name": "John",
    "url": "https://api.getbible.net/v2/ylt/43.json",
    "sha": "ad0b72e10161928cc2121be19da5dec7f3fb6851"
  },
  "44": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 44,
    "name": "Acts",
    "url": "https://api.getbible.net/v2/ylt/44.json",
    "sha": "2a72f6ca26104ec68d87bd2320be411d978efd3e"
  },
  "45": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 45,
    "name": "Romans",
    "url": "https://api.getbible.net/v2/ylt/45.json",
    "sha": "bad7c40512494e5d7d0e55bd88892725b6204805"
  },
  "46": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 46,
    "name": "1 Corinthians",
    "url": "https://api.getbible.net/v2/ylt/46.json",
    "sha": "2a348d9abdedf7bbe924a40898f85ac965517b46"
  },
  "47": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 47,
    "name": "2 Corinthians",
    "url": "https://api.getbible.net/v2/ylt/47.json",
    "sha": "fa97f25767c08b83f46e6160c8b3437a64cd7706"
  },
  "48": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 48,
    "name": "Galatians",
    "url": "https://api.getbible.net/v2/ylt/48.json",
    "sha": "ab6905eddc8cc595f8623b67c2c00f740156b6c8"
  },
  "49": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 49,
    "name": "Ephesians",
    "url": "https://api.getbible.net/v2/ylt/49.json",
    "sha": "298e00e3e2d0dd0b26330d0e21c104403c1378b2"
  },
  "50": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 50,
    "name": "Philippians",
    "url": "https://api.getbible.net/v2/ylt/50.json",
    "sha": "b6f7aaec00a02f6620ca010dc29d57ceb43c1068"
  },
  "51": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 51,
    "name": "Colossians",
    "url": "https://api.getbible.net/v2/ylt/51.json",
    "sha": "101f995ea2b28ad477bc076320117617c146dd08"
  },
  "52": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 52,
    "name": "1 Thessalonians",
    "url": "https://api.getbible.net/v2/ylt/52.json",
    "sha": "2d00841b5d946f5d7e0f44b8fc8d8844b0b450c2"
  },
  "53": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 53,
    "name": "2 Thessalonians",
    "url": "https://api.getbible.net/v2/ylt/53.json",
    "sha": "19ed2eae2909dca5954fd3a3442bd51eaf555064"
  },
  "54": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 54,
    "name": "1 Timothy",
    "url": "https://api.getbible.net/v2/ylt/54.json",
    "sha": "3cf10bad4dc1e0c053c746f685f0e460c3db07de"
  },
  "55": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 55,
    "name": "2 Timothy",
    "url": "https://api.getbible.net/v2/ylt/55.json",
    "sha": "b1bf508416ea0d3a51798438047bd7022abb46ed"
  },
  "56": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 56,
    "name": "Titus",
    "url": "https://api.getbible.net/v2/ylt/56.json",
    "sha": "a98a7c5f64a0c9d0767eae77730472b3108c7dd7"
  },
  "57": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 57,
    "name": "Philemon",
    "url": "https://api.getbible.net/v2/ylt/57.json",
    "sha": "3bd557caba54b88d20f6638aa6add24943f91066"
  },
  "58": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 58,
    "name": "Hebrews",
    "url": "https://api.getbible.net/v2/ylt/58.json",
    "sha": "ca78afed265db30ba8e41bac67e0c2d337b17ff3"
  },
  "59": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 59,
    "name": "James",
    "url": "https://api.getbible.net/v2/ylt/59.json",
    "sha": "972c8a35e8cccd35124a31affa66466dc2c3c3c1"
  },
  "60": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 60,
    "name": "1 Peter",
    "url": "https://api.getbible.net/v2/ylt/60.json",
    "sha": "12d79b5c07b76d9d663c7750f4bc131d27505317"
  },
  "61": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 61,
    "name": "2 Peter",
    "url": "https://api.getbible.net/v2/ylt/61.json",
    "sha": "c4f4326cdb8297979d947554f9a07cc21846658e"
  },
  "62": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 62,
    "name": "1 John",
    "url": "https://api.getbible.net/v2/ylt/62.json",
    "sha": "fbdfd6fc5bd45edbc388942c84589b8daa8231f4"
  },
  "63": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 63,
    "name": "2 John",
    "url": "https://api.getbible.net/v2/ylt/63.json",
    "sha": "04a3a22deb9222829809207e8eb95b28e4facf09"
  },
  "64": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 64,
    "name": "3 John",
    "url": "https://api.getbible.net/v2/ylt/64.json",
    "sha": "2d7001c352691a020c0ca5d616b445dfda566a7c"
  },
  "65": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 65,
    "name": "Jude",
    "url": "https://api.getbible.net/v2/ylt/65.json",
    "sha": "658f4b250add31740a9f5d9252132ded0ed4ac66"
  },
  "66": {
    "translation": "Young's Literal Translation",
    "abbreviation": "ylt",
    "lang": "en",
    "language": "English",
    "direction": "LTR",
    "encoding": "",
    "nr": 66,
    "name": "Revelation",
    "url": "https://api.getbible.net/v2/ylt/66.json",
    "sha": "ada1b7c5de6c64dbd85071d9ab9a4076b35ee348"
  }
}

})

