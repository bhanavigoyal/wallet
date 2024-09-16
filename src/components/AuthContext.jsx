import React , { createContext, useContext, useState } from "react";
import CryptoJS from 'crypto-js';

const AuthContext = createContext();

export const AuthProvider= ({children})=>{

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState(null);


    function isValidExtendedKey(key) {
        // Assuming base58 format, you should use a library to validate base58 keys
        // This regex is simplistic and might not cover all valid base58 formats
        const base58Regex = /^[A-HJ-NP-Za-km-z1-9]{51,}$/;
        return base58Regex.test(key);
    }

    const authenticate = (password)=>{
        const encryptedMasterKey = localStorage.getItem('encryptedMasterKey');
        if(!encryptedMasterKey){
            throw new Error("no encrypted address found in the local storage")
        }

        try{
            const bytes = CryptoJS.AES.decrypt(encryptedMasterKey, password);
            const decryptedMasterKey= bytes.toString(CryptoJS.enc.Utf8);

            // Check if the decrypted value is a valid Ethereum address
            if (isValidExtendedKey(decryptedMasterKey)) {
                setIsAuthenticated(true);
                setPassword(password);
                return true;
            } else {
                console.error('Invalid wallet address format:', decryptedMasterKey);
                return false;
            }

        }catch(err){
            console.error('Decryption failed',err)
        }
        return false;
    }
    return <AuthContext.Provider value = {{isAuthenticated, authenticate, password}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () =>useContext(AuthContext);