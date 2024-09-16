import { HDNodeWallet, Wallet } from "ethers";
import CryptoJS from "crypto-js";

export const addWallet=(password, currentIndex)=>{

    const encryptedMasterKey = localStorage.getItem("encryptedMasterKey");
    if(!encryptedMasterKey){
        return {
            error: "no master key found"
        }
    }
    const bytes = CryptoJS.AES.decrypt(encryptedMasterKey, password);
    const decryptedMasterKey = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedMasterKey || decryptedMasterKey === '') {
        return {
            error: "decryption failed"
        }
    }

    const hdNode = HDNodeWallet.fromExtendedKey(decryptedMasterKey);
    const derivationPath = `m/44'/60'/0'/0/${currentIndex}`;
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);


    return {
        address: wallet.address,
        newIndex: currentIndex + 1
    }
}
