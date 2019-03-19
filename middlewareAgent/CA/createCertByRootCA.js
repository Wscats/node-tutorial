const forge = require('node-forge');
const pki = forge.pki;
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

// CNanme
var domain = 'github.com';

var caCertPem = fs.readFileSync(path.join(__dirname, '../../rootCA/rootCA.crt'));
var caKeyPem = fs.readFileSync(path.join(__dirname, '../../rootCA/rootCA.key.pem'));
var caCert = forge.pki.certificateFromPem(caCertPem);
var caKey = forge.pki.privateKeyFromPem(caKeyPem);

var keys = pki.rsa.generateKeyPair(1024);
var cert = pki.createCertificate();
cert.publicKey = keys.publicKey;

cert.serialNumber = (new Date()).getTime() + '';
cert.validity.notBefore = new Date();
cert.validity.notBefore.setFullYear(cert.validity.notBefore.getFullYear() - 1);
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notAfter.getFullYear() + 1);

var attrs = [{
    name: 'commonName',
    value: domain
}, {
    name: 'countryName',
    value: 'CN'
}, {
    shortName: 'ST',
    value: 'GuangDong'
}, {
    name: 'localityName',
    value: 'ShengZhen'
}, {
    name: 'organizationName',
    value: 'https-mitm-proxy-handbook'
}, {
    shortName: 'OU',
    value: 'https://github.com/wuchangming/https-mitm-proxy-handbook'
}];

cert.setIssuer(caCert.subject.attributes);
cert.setSubject(attrs);

cert.setExtensions([{
    name: 'basicConstraints',
    critical: true,
    cA: false
}, {
    name: 'keyUsage',
    critical: true,
    digitalSignature: true,
    contentCommitment: true,
    keyEncipherment: true,
    dataEncipherment: true,
    keyAgreement: true,
    keyCertSign: true,
    cRLSign: true,
    encipherOnly: true,
    decipherOnly: true
}, {
    name: 'subjectKeyIdentifier'
}, {
    name: 'extKeyUsage',
    serverAuth: true,
    clientAuth: true,
    codeSigning: true,
    emailProtection: true,
    timeStamping: true
}, {
    name: 'authorityKeyIdentifier'
}]);
cert.sign(caKey, forge.md.sha256.create());

var certPem = pki.certificateToPem(cert);
var keyPem = pki.privateKeyToPem(keys.privateKey);
console.log(certPem);
console.log(keyPem);


mkdirp.sync(path.join(__dirname, '../../cert'));
fs.writeFileSync(path.join(__dirname, '../../cert/my.crt'), certPem);
fs.writeFileSync(path.join(__dirname, '../../cert/my.key.pem'), keyPem);