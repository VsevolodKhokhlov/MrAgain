
module.exports = function isBot() {

    if(typeof document !=='undefined'){
        if(!document.documentElement.className
            || document.documentElement.className.indexOf('isBot')<0){
            return true;
        }
    }


    return false;

};
