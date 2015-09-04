var options = {
    numBits: 2048,
    userId: 'DUMMY <dummy@example.org>',
    passphrase: 'password'
};

var startDecryptMessage = function(pgpMessageString, privkeyString) {
    var privateKeyObject = openpgp.key.readArmored(privkeyString).keys[0];
    privateKeyObject.decrypt('password');

    console.log(pgpMessageString);
    var pgpMessageObject = openpgp.message.readArmored(pgpMessageString);

    openpgp.decryptMessage(privateKeyObject, pgpMessageObject).then(function(plaintext) {
        // success
        console.log(plaintext);
    }).catch(function(error) {
        // failure
        alert('decryption error');
    });
};

var startEncryptMessage = function(pubkeyString, privkeyString) {
    var publicKeysObject = openpgp.key.readArmored(pubkeyString.toString());
    openpgp.encryptMessage(publicKeysObject.keys, 'Hello, World!').then(function(pgpMessageString) {
        // success
        startDecryptMessage(pgpMessageString, privkeyString);
    }).catch(function(error) {
        // failure
        alert('encryption error');
    });
};

openpgp.generateKeyPair(options).then(function(keypair) {
    // success
    var pubkeyString = keypair.publicKeyArmored;
    var privkeyString = keypair.privateKeyArmored;
    startEncryptMessage(pubkeyString, privkeyString);
}).catch(function(error) {
    // failure
    alert('error generating keypair');
});

var myAlert = function(){
    alert(document.getElementsByName("passphrase")[0].value);
};
