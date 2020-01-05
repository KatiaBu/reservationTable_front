const helpers = {
    appendLeadingZeroes: function(n){
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }
}
export default helpers;