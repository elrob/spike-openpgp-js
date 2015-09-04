var pgpMessageElement = document.getElementById('pgp-message');

var decryptMessage = function(pgpMessageString, privkeyString, passphrase) {
    var privateKeyObject = openpgp.key.readArmored(privkeyString).keys[0];
    privateKeyObject.decrypt(passphrase);

    var pgpMessageObject = openpgp.message.readArmored(pgpMessageString);

    openpgp.decryptMessage(privateKeyObject, pgpMessageObject).then(function(plaintext) {
        pgpMessageElement.value = plaintext;
    }).catch(function(error) {
        alert('decryption error');
    });
};

function readFileAndContinue(file, passphrase) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var privateKey = e.target.result;
        var pgpMessage = pgpMessageElement.value;
        decryptMessage(pgpMessage, privateKey, passphrase);
    };
    reader.readAsText(file);
}

var submitFunction = function(){
    var passphrase = document.getElementsByName("passphrase")[0].value;
    readFileAndContinue(document.getElementById('private-key').files[0], passphrase);
};
