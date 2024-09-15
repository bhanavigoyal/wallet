import React , { createContext, useContext, useState } from "react";
import CryptoJS from 'crypto-js';

const AuthContext = createContext();

export const AuthProvider= ({children})=>{

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [privateKey, setPrivateKey] = useState(null);

    const authenticate = (password)=>{
        const encryptedPrivateKey = localStorage.getItem('encryptedPrivateKey');
        if(!encryptedPrivateKey){
            throw new Error("no encrypted key found in the local storage")
        }

        try{
            const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, password);
            const decryptedPrivateKey = bytes.toString(CryptoJS.enc.Utf8);

            if (/^(0x)?[0-9a-fA-F]{64}$/.test(decryptedPrivateKey)) {
                setIsAuthenticated(true);
                setPrivateKey(decryptedPrivateKey);
                return true;
              } else {
                console.error('Invalid private key format:', decryptedPrivateKey);
                return false;
              }
        }catch(err){
            console.error('Decryption failed',err)
        }
        return false;
    }
    return <AuthContext.Provider value = {{isAuthenticated, authenticate,privateKey}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () =>useContext(AuthContext);