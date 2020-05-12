require([
    'card'
], function (CardVisual) {

    var card

    var classChoice
    var rarityChoice
    var nameInput
    var atkInput
    var hpInput
    var buttonDownload
    var fileUpload
    var isCE

    var element
    var getCanvas;


  function init () {

      fileUpload = $("#fileUpload")
      buttonDownload = $('#buttonDownload')

      $("#classChoice, #nameInput, #rarityChoice, #atkInput, #hpInput").change(function() {
          updatePreview();
      });

      $('#isCE').change(
          function(){

             updatePreview();
          });

      buttonDownload.click(function() {
          renderContent();
      })

      $('body').find("#cardContainer").bind('mousewheel', function(e){
          if(e.originalEvent.wheelDelta /120 > 0) {
              // console.log('scrolling up !');
              card.zoomPicture("In", 10)
          }
          else{
              // console.log('scrolling down !');
              card.zoomPicture("Out", 10)
          }
      });



      fileUpload.change(function() {
          uploadPicture();
      })

      createFirstCard();

      $('body').ready(function() {
          $("#hideAll").css("display", "none")
      });




  }

  function createFirstCard(){

      randomChoice('classChoice');
      randomChoice('rarityChoice');

      updateValues();

      atkInput = Math.floor(Math.random()*10000);
      hpInput = Math.floor(Math.random()*10000);

      card = new CardVisual(classChoice, nameInput, rarityChoice, atkInput, hpInput);

      element = $('#card')

  }

  function updateValues() {

      classChoice = $("#classChoice option:selected").text();
      nameInput = $("#nameInput").val();
      rarityChoice= $("#rarityChoice option:selected").text();
      atkInput = $("#atkInput").val();
      hpInput = $("#hpInput").val();
      isCE = $("#isCE").prop("checked");

      rarityChoice = rarityChoice.slice(0, -1);



  }

  function randomChoice(pDivName) {
      var select = $('#' + pDivName);
      var items = select.find('option');
      var index = Math.floor(Math.random() * items.length);

      select.prop('selectedIndex',index);

  }

  function updatePreview() {


      updateValues();

      card.setRarity(rarityChoice, isCE);
      card.setClass(classChoice);
      card.setText(nameInput, atkInput, hpInput)


  }

  function uploadPicture() {

      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();

      reader.addEventListener("load", function () {
          card.setPicture(reader.result);

      }, false);

      if (file) {
          reader.readAsDataURL(file);
      }


  }

  function renderContent() {

        // html2canvas(document.querySelector("#cardFrame")).then(canvas => {
        //     $("body").append(canvas);
        //
        // });
        html2canvas(document.querySelector("#cardContainer").querySelector('#card'), {backgroundColor:null}).then(function(canvas) {

            $('#result').empty()

            document.querySelector("#cardContainer").querySelector("#result").appendChild(canvas);

            $('#result').addClass('animConverted');
        });

    }

  $(init)



})
