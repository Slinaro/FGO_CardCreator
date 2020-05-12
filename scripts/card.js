define([

], function() {

    var template = $("#templateCard").html()

    function CardVisual(pClass, pName, pRarity, pAtk, pHp, pPicture) {
        this.view = $(template);
        this.cardPicture = this.view.find('#cardPicture');
        this.cardFrame = this.view.find('#cardFrame');
        this.classIcon = this.view.find('#classIcon');

        this.classText = this.view.find('#classText');
        this.nameText = this.view.find('#nameText');
        this.atkText = this.view.find('#atkText');
        this.hpText = this.view.find('#hpText');

        this.originalWidth;
        this.originalHeight;
        this.isCE = false;
        this.class = pClass;
        this.name = pName;
        this.rarity = pRarity;
        this.atk = pAtk;
        this.hp = pHp;
        this.image =  "asset/exemples/exemple" + Math.floor(Math.random()*33) +".jpg"

        this.init()

    }

    CardVisual.prototype.init = function() {

        this.setAll();


        $('body').find("#cardContainer").append(this.view)



    }

    CardVisual.prototype.ifIsCEText = function() {

        if(this.isCE){
            $('body').find("#classChoice").css("opacity", 0.5);
            this.view.css("border-radius", "25px");

        }
        else {
            $('body').find("#classChoice").css("opacity", 1);
            this.view.css("border-radius", "0px");
        }


    }

    CardVisual.prototype.setAll = function() {
        this.setText();
        this.setClass();
        this.setRarity();
        this.setPicture();
    }

    CardVisual.prototype.setPicture = function(pPicture) {

        if(pPicture){
            this.image = pPicture;
        }

        this.cardPicture.css("background-image", "url( " + this.image + ")");
        this.cardPicture.draggable()

        this.cardPicture.css({
            "position" : "absolute"
        })

        this.setWidthPicture(this.cardPicture)
    }


    CardVisual.prototype.setRarity = function (pRarity, pIsCE) {

        var lPath;
        var lZoomAmountIfCE = 100

        if(pRarity){
            this.rarity = pRarity
        }

        if(pIsCE) {
            lPath = "CE_" + this.rarity
        }else {
            lPath = this.rarity;
        }



        this.cardFrame.css("background-image", "url(asset/frame/" + lPath + 'Star.png' + ")");

        if(pIsCE && !this.isCE){
            this.zoomPicture("In", lZoomAmountIfCE)
            this.isCE = pIsCE;
        }else if(!pIsCE && this.isCE){
            this.zoomPicture("Out", lZoomAmountIfCE)
            this.isCE = pIsCE;
        }
    };


    CardVisual.prototype.setClass = function(pClass) {

        if(this.isCE){
            this.classIcon.hide();
            return;
        }
        else {
            this.classIcon.show();
        }

        if(pClass){
            this.class = pClass;
        }

        if(pClass == "Alter Ego"){
            this.class = "alterego";
        }

        if(pClass == "Moon Cancer"){
            this.class = "mooncancer";
        }



        this.getColorFrame();
        this.classIcon.css("background-image", "url(asset/icons/" + this.class.toLowerCase() + "_"  + this.colorFrame +  ".png)")
    }



    CardVisual.prototype.getColorFrame = function(){

        if(this.rarity < 3) {
            this.colorFrame = 'bronze'
        }
        else if (this.rarity == 3) {
            this.colorFrame = 'silver'
        }
        else if(this.rarity > 3) {
            this.colorFrame = 'gold'
        }
    }

    CardVisual.prototype.setText = function(pName, pAtk, pHp) {

        if(pName){
            this.name = pName
        }

        if(pAtk){
            this.atk = pAtk
        }

        if(pHp){
            this.hp = pHp
        }



        if(!this.isCE){

            if(this.class == "alterego"){
                this.classText.text("Alter Ego")
            }
            else if(this.class == "mooncancer"){
                this.classText.text("Moon Cancer")
            }else {
                this.classText.text(this.class)
            }

            this.nameText.text(this.name)
            this.atkText.text(this.atk)
            this.hpText.text(this.hp)

        }else {
            this.classText.text(this.name)
            this.nameText.text("Craft Essence")

            this.atkText.text("+" + this.atk)
            this.hpText.text("+" + this.hp)
        }

        this.ifIsCEText();


    }

    CardVisual.prototype.setWidthPicture = function(pPicture) {

        var lImageRef = new Image();
        var lWidth
        var lHeight
        var lFinalHeight

        lImageRef.src = this.image

        lImageRef.onload = function() {
            lWidth =  lImageRef.width;
            lHeight = lImageRef.height;

            lFinalHeight = (lWidth * pPicture.height())/ lHeight;

            pPicture.css("width", lFinalHeight)

            this.originalWidth = lFinalHeight;

        }

    }

    CardVisual.prototype.zoomPicture = function(pInOrOut, pAmountZoom) {


        if(pInOrOut == "In"){
            this.cardPicture.css("width", this.cardPicture.width() + pAmountZoom + "px")
            this.cardPicture.css("height", this.cardPicture.height() + pAmountZoom + "px")

        }
        else {
            if(this.cardPicture.width() - pAmountZoom < this.originalWidth){
                return;
            }

            this.cardPicture.css("width", this.cardPicture.width() - pAmountZoom + "px")
            this.cardPicture.css("height", this.cardPicture.height() - pAmountZoom + "px")
        }



    }

    return CardVisual

})
