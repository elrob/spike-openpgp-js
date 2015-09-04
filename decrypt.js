var decryptMessage = function(pgpMessageString, privkeyString, passphrase) {

    var privateKeyObject = openpgp.key.readArmored(privkeyString).keys[0];
    privateKeyObject.decrypt(passphrase);

    var pgpMessageObject = openpgp.message.readArmored(pgpMessageString);

    openpgp.decryptMessage(privateKeyObject, pgpMessageObject).then(function(plaintext) {
        // success
        document.getElementById('pgp-message').value = plaintext;
    }).catch(function(error) {
        // failure
        alert('decryption error');
    });
};

function readFileAndContinue(file, passphrase) {
    reader = new FileReader();
    reader.onload = function(e) {
        var privateKey = e.target.result;
        var pgpMessage = document.getElementById('pgp-message').value;
        decryptMessage(pgpMessage, privateKey, passphrase);
    };
    reader.readAsText(file);
}

var submitFunction = function(){
    passphrase = document.getElementsByName("passphrase")[0].value;
    privKey = readFileAndContinue(document.getElementById('private-key').files[0], passphrase);
};
