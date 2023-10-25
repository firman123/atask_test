import Aes from 'react-native-aes-crypto';

const generateKey = (
  password: string,
  salt: string,
  cost: number,
  length: number,
) => Aes.pbkdf2(password, salt, cost, length, 'aes-256-cbc');

const encryptData = (text: string, key: string) => {
  return Aes.randomKey(16).then(iv => {
    return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
      cipher,
      iv,
    }));
  });
};

export const decryptData = async (cipher: any, iv: any, key: string) => {
  const decrypt = await Aes.decrypt(cipher, key, iv, 'aes-256-cbc');
  return decrypt;
};

export const encryptText = async ({text, key}: any) => {
  try {
    const genKey = await generateKey(key, 'salt', 5000, 256);
    const encrpt = await encryptData(text, genKey);
    return {...encrpt, key: genKey};
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const processDecrypt = async (list: any[]) => {
  if (list.length > 0) {
    const listData = await Promise.all(
      list.map(async data => {
        const decryptResult = await decryptData(data.cipher, data.iv, data.key);

        return {...data, text: decryptResult};
      }),
    );

    return listData;
  }
};
