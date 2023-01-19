import i18n from '@/i18n';

var utils = {
    
    setCartStructure(cart){
        var sCart = [];
        cart.forEach(item => {
            sCart.push({"productId": item.id, "quantity": item.quantity});
        });
        return sCart
    },

    queryLang(){
        return '?lang=' + i18n.global.locale;
    },

    queryParams(params){

        var query = '';
        
        Object.keys(params).forEach(key => {
            if(params[key]){
                query += '&';
                query += key + '=' + params[key];
            }
            
        });

        return query;
    },

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    },

    hashSha256(message){
        var sha256 = require('js-sha256');
        var hash = sha256.create();
        console.log(sha256(message));
        return message;
    },

    ValidatePassword(password) {
        var validRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if(password.match(validRegex)){
            return true;
        } else {
            return false;
        }
    },

    ValidatePhone(phone) {
        var validRegex = /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/;
        if(phone.match(validRegex)){
            return true;
        } else {
            return false;
        }
    },

    ValidateFullName(name) {
        var validRegex = /^[àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\sA-Za-z]{3,50}$/;
        if(name.match(validRegex)){
            return true;
        } else {
            return false;
        }
    },

    ValidateText(text) {
        var validRegex = /^[:"'.,!?-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\sA-Za-z]{8,}$/;
        if(text.match(validRegex)){
            return true;
        } else {
            return false;
        }
    },

    ValidateName(name) {
        var validRegex = /^[àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœA-Za-z]{3,15}$/;
        if(name.match(validRegex)){
            return true;
        } else {
            return false;
        }
    },

    ValidateEmail(email) {
        var validRegex = /^^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (email.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    },

    validateAddress(address) {
        return this.validateStreet(address.street)
                && this.validateNumber(address.number)
                && this.validatePostalCode(address.postalCode)
                && this.validateCity(address.city)
                && this.validateCountry(address.country);
    },

    validateStreet(street){
        return this.ValidateFullName(street);
    },

    validateNumber(number){
        var validRegex = /^([1-9][0-9]{0,4})$/;
        if (number.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    },

    validatePostalCode(postalCode){
        var validRegex = /^[0-9]{4}$/;
        if (postalCode.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    },

    validateCity(city){
        return this.ValidateName(city);
    },

    validateCountry(country){
        return this.ValidateName(country);
        return true;
    }
}

export default utils;