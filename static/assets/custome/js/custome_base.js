/*********************************************************************************************/
function parseQuerystring() {
    var foo = window.location.href.split('?')[1].split('#')[0].split('&');
    var dict = {};
    var elem = [];
    for (var i = foo.length - 1; i >= 0; i--) {
        elem = foo[i].split('=');
        dict[elem[0]] = elem[1];
    }
    return dict;
}
/*********************************************************************************************/
/*********************************************************************************************/
/**
 * This is a method override of the default JS replaceAll method to replace
 * {search} occurrences
 * @param      {String} search  The date to be converted
 * @param      {String} replace The date to be converted
 * @return     {String}  String.
 */
String.prototype.replaceAll2 = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
/*********************************************************************************************/
function isPasswordValid(str)
{
	// at least one number, one lowercase and one uppercase letter
	// at least six characters that are letters, numbers or the underscore
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
	return re.test(str);
}
/*********************************************************************************************/
/**
 * This creates an array of numbers with in a given range
 * @param      {Number} start   start from
 * @param      {Number} end     stop at
 * @return     {Integer Array}  .
 */
function rangeArray(start, end) {
    let myArray = [];
    for (let i = start; i <= end; i += 1) {
        myArray.push(i);
    }
    return myArray;
}
/*********************************************************************************************/
function objectsMerge(firstObject, secondObject) {
    for (let key in secondObject) {
        if (secondObject.hasOwnProperty(key)) {
            firstObject[key] = secondObject[key];
        }
    }
    return firstObject;
}
/*********************************************************************************************/
/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variabl
 es/
 * @param {String} url The URL
 * @return {Object}
 The URL parameters
 */
let getParams =  url=> {
    let params = {};
    let parser = document.createElement('a');
    parser.href = url;
    const query = parser.search.substring(1);
    const vars = query.split('&');
    if(vars.length < 1 || vars[0]==''){
        return null;
    }
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if(decodeURIComponent(pair[1]).trim() == ''){
            return null;
        }
        if(decodeURIComponent(pair[1]) == "undefined"){
            return null;
        }
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};
/*********************************************************************************************/
function emptyInputs ( arrInput_ids , arrSelect_ids ) {

    for(let i = 0 ; i < arrInput_ids.length ; i ++){
        let id = arrInput_ids[i];
        $("#"+id).val('');
    }
    for(let i = 0 ; i < arrSelect_ids.length ; i ++){
        let id = arrSelect_ids[i];
        $("#"+id).val('null');
    }

}
/*********************************************************************************************/
function error_perInput(inputElement, errorMessage) {
    if (errorMessage === '') {
        $(inputElement).css(
	          {
		          "border-color":"black"
	          }
        );
        //$(inputElement).text("");
    } else {
        $(inputElement).text(errorMessage);
        $(inputElement).css({
	        "border-color": "red"
        });
        showErrorMessage(errorMessage, 5.5);
    }
}
/*********************************************************************************************/
function error_input_element(isTrue , elementId) {
    if(isTrue){
        $('#'+elementId).css({
            "border": "1px solid red",
            "background": "#ff4e44"
        });

    }else{
        $('#'+elementId).css({
            "border": "",
            "background": ""
        });
    }

}
/*********************************************************************************************/
function logInAccessError(responseFromServer ){
    if(responseFromServer === 'unf_1'){
        window.location.href = "sign-in.php?lerror=err_login";
    }
}
/*********************************************************************************************/
function getcurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd ;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return mm + '/' + dd + '/' + yyyy;
}
/*********************************************************************************************/
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

/*********************************************************************************************/
function randString(x) {
    var s = "";
    while (s.length < x && x > 0) {
        var r = Math.random();
        s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    return s;
}
/*********************************************************************************************/
/**
 * Gets the random integer between min and max (both included)
 *
 * @param      {number}  min     The minimum
 * @param      {number}  max     The maximum
 * @return     {<type>}  The random integer.
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*********************************************************************************************/
/**
 * Creates a random receipt Number between min and max (both included)
 * @return     {<String>}  random receipt Number.
 */
function receiptNumber() {
    let ret = "";
    ret = getcurrentDate(); //  dd + '/' + mm + '/' + yyyy;
    let dd = ret.split('/')[0];
    let mm = ret.split('/')[1];
    let yyyy = ret.split('/')[2];
    let ranS = randString(getRndInteger(5, 8)).toUpperCase();
    ret = dd + ranS.substring(2, 4) + ranS.charAt(getRndInteger(1, 2)) + '-' + mm + '-' + ranS.charAt(getRndInteger(1, 4)) + yyyy;
    return ret;
}
/*********************************************************************************************/
/**
 * Converts a Turkish Z-Date format to  date form MM/DD/YYYY
 * @param      {String} zDate   The date to be converted
 * @return     {String}  Date String.
 */
function dateConvertor(zDate) {
    return new Date(zDate).toDateString();
}
/*********************************************************************************************/
/**
 * Converts a Turkish Z-Date format to  date form MM/DD/YYYY
 * @param      {String} zDate   The date to be converted
 * @return     {String}  Date String.
 */
function getDateConvertion(zdate) {
    let date = new Date(zdate);
    return ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
}
/*********************************************************************************************/
function getCurrentTimeLong(){
   return new Date().getTime();
}
/*********************************************************************************************/
/**
 * Creates a random String based on the chars input <br>
 * example of usage: randomString(5); or randomString(5,
 * 'PICKCHARSFROMTHISSET');
 * <br>
 * @param {integer} length - size of the output .
 * @param {string} chars - can be ignored ,but the the characters to use in
 *         creating the output.
 * @returns {String} Random string of size @param lenSize
 */
function randomIDString(lenSize, chars) {
    let charSet = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = "";
    for (let i = 0; i < lenSize; i++) {
        let position = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(position, position + 1);
    }
    return randomString;
}
function randomNumbers ( min , max ) {
    return (Math.floor(Math.random() * max) + min);
}
/*********************************************************************************************/
/**
 * Create a random String of alphabet and numbers
 * @returns {string} Random String
 */
function randomStringID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
/*********************************************************************************************/

/*********************************************************************************************/

    function capitaliseTextFristLetter ( string ) {

        return string.charAt(0).toUpperCase() + string.slice(1);
    }

/*********************************************************************************************/
function capitaliseTextFirstCaseForWords(text) {
    var firstLtr = 0;
    for (var i = 0;i < text.length;i++){
        if (i == 0 &&/[a-zA-Z]/.test(text.charAt(i)))
            firstLtr = 2;
        if (firstLtr == 0 &&/[a-zA-Z]/.test(text.charAt(i)))
            firstLtr = 2;
        if (firstLtr == 1 &&/[^a-zA-Z]/.test(text.charAt(i))){
            if (text.charAt(i) == "'"){
                if (i + 2 == text.length &&/[a-zA-Z]/.test(text.charAt(i + 1))) firstLtr = 3;
                else if (i + 2 < text.length &&/[^a-zA-Z]/.test(text.charAt(i + 2))) firstLtr = 3;
            }
            if (firstLtr == 3) firstLtr = 1;
            else firstLtr = 0;
        }
        if (firstLtr == 2){
            firstLtr = 1;
            text = text.substr(0, i) + text.charAt(i).toUpperCase() + text.substr(i + 1);
        }
        else {
            text = text.substr(0, i) + text.charAt(i).toLowerCase() + text.substr(i + 1);
        }
    }
    return text;
}

/*********************************************************************************************/
/**can be applied to any table*/
function noDataRow ( numberOfColumns , noDataMessage ) {
  let td = ``;
  for ( let i = 0 ; i < numberOfColumns ; i ++ ) {
    td += `
              <td style='color:red;'> ${ noDataMessage } </td>
            `;
  }
  return `<tr> ${ td } </tr>`;
}
/*********************************************************************************************/
/**can be applied to any table*/
function noDataRowDFlex ( numberOfColumns , noDataMessage ) {
  let td = ``;
    let isEven =   numberOfColumns % 2 === 0 ;
    let col = isEven ? 12 / numberOfColumns  : 12 / (numberOfColumns + 1);
    col = 'col-' + col ;
  for ( let i = 0 ; i < numberOfColumns ; i ++ ) {
    td += `
              <td class="${col}" style='color:red;'> ${ noDataMessage } </td>
            `;
  }
  return `<tr class="d-flex"> ${ td } </tr>`;
}

/*********************************************************************************************/
/*********************************************************************************************/
/**
 * const arr = [
  { id: 1, name: "king" },
  { id: 2, name: "master" },
  { id: 3, name: "lisa" },
  { id: 4, name: "ion" },
  { id: 5, name: "jim" },
  { id: 6, name: "gowtham" },
  { id: 1, name: "jam" },
  { id: 1, name: "lol" },
  { id: 2, name: "kwick" },
  { id: 3, name: "april" },
  { id: 7, name: "sss" },
  { id: 8, name: "brace" },
  { id: 8, name: "peiter" },
  { id: 5, name: "hey" },
  { id: 6, name: "mkl" },
  { id: 9, name: "melast" },
  { id: 9, name: "imlast" },
  { id: 10, name: "glow" }
];
 * usagae console.log(getUnique(arr,'id')*/
function getUnique(arr, comp) {

    const unique = arr
        .map(e => e[comp])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);

    return unique;
}

/*********************************************************************************************/
String.prototype.replaceAll = function(f,r){return this.split(f).join(r);}
/*********************************************************************************************/
function groupBy ( xs , f ) {
	return xs.reduce (
		( r , v , i , a , k = f ( v ) ) => ( ( r[ k ] || ( r[ k ] = [] ) ).push (    v ), r ) , {} );
}
/*********************************************************************************************/


function showGeneralMessage (messageText,time) {
	iziToast.info({
		title: 'Information',
		message: messageText,
	});
		//__notify(messageText , 'top','right' , 'fa fa-check','inverse','animated fadeInRight','animated fadeOutRight',time , '');
}

function showErrorMessage (messageText,time) {
		//__notify(messageText , 'top','right' , 'fa fa-check','danger','animated fadeInRight','animated fadeOutRight',time,'');
	iziToast.error({
		title: 'Error',
		message: messageText,
	});
}


function showSuccessMessage (messageText,time) {
	iziToast.success({
		title: 'Success',
		message: messageText,
	});
		//__notify(messageText , 'top','right' , 'fa fa-check','success','animated fadeInRight','animated fadeOutRight',time , '');
}