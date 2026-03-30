'use strict';

/**
 * 生成根证书
 */

console.log('生成根证书\n');

const forge = require('node-forge');
const pki = forge.pki;
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const keys = pki.rsa.generateKeyPair(1024);
const cert = pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = (new Date()).getTime() + '';
cert.validity.notBefore = new Date();
cert.validity.notBefore.setFullYear(cert.validity.notBefore.getFullYear() - 5);
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notAfter.getFullYear() + 20);
const attrs = [{
    name: 'commonName',
    value: 'https-mitm-proxy-handbook'
}, {
    name: 'countryName',
    value: 'CN'
}, {
    shortName: 'ST',
    value: 'GuangDong'
}, {
    name: 'localityName',
    value: 'ShenZhen'
}, {
    name: 'organizationName',
    value: 'https-mitm-proxy-handbook'
}, {
    shortName: 'OU',
    value: 'https://github.com/wuchangming/https-mitm-proxy-handbook'
}];
cert.setSubject(attrs);
cert.setIssuer(attrs);
cert.setExtensions([{
    name: 'basicConstraints',
    critical: true,
    cA: true
}, {
    name: 'keyUsage',
    critical: true,
    keyCertSign: true
}, {
    name: 'subjectKeyIdentifier'
}]);

// self-sign certificate
cert.sign(keys.privateKey, forge.md.sha256.create());

const certPem = pki.certificateToPem(cert);
const keyPem = pki.privateKeyToPem(keys.privateKey);
const certPath = path.join(__dirname, '../CA/rootCA/rootCA.crt');
const keyPath = path.join(__dirname, '../CA/rootCA/rootCA.key.pem');

console.log('公钥内容：\n');
console.log(certPem);
console.log('私钥内容：\n');
console.log(keyPem);
console.log(`公钥存放路径：\n ${certPath}\n`);
console.log(`私钥存放路径：\n ${keyPath}\n`);

mkdirp.sync(path.join(__dirname, '../CA/rootCA'));
fs.writeFileSync(certPath, certPem);
fs.writeFileSync(keyPath, keyPem);