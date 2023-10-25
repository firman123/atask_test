import Aes from 'react-native-aes-crypto';

import {
  decryptData,
  encryptText,
  processDecrypt,
} from '../../utils/encriptions';

jest.mock('react-native-aes-crypto', () => ({
  pbkdf2: jest.fn(),
  randomKey: jest.fn(),
  encrypt: jest.fn(),
  decrypt: jest.fn(),
}));

describe('Crypto Functions', () => {
  beforeEach(() => {
    Aes.pbkdf2.mockClear();
    Aes.randomKey.mockClear();
    Aes.encrypt.mockClear();
    Aes.decrypt.mockClear();
  });

  it('should encrypt data', async () => {
    Aes.randomKey.mockResolvedValue('iv');
    Aes.encrypt.mockResolvedValue('cipher');

    const encryptedData = await encryptText({text: 'text', key: 'password'});
    expect(encryptedData.cipher).toBe('cipher');
    expect(encryptedData.iv).toBe('iv');
  });

  it('should decrypt data', async () => {
    Aes.decrypt.mockResolvedValue('decryptedData');

    const decryptedData = await decryptData('cipher', 'iv', 'key');
    expect(decryptedData).toBe('decryptedData');
  });

  it('should process decryption of a list', async () => {
    const list = [
      {cipher: 'cipher1', iv: 'iv1', key: 'key1'},
      {cipher: 'cipher2', iv: 'iv2', key: 'key2'},
    ];

    Aes.decrypt.mockResolvedValue('decryptedData');

    const decryptedList = await processDecrypt(list);
    expect(decryptedList).toEqual([
      {cipher: 'cipher1', iv: 'iv1', key: 'key1', text: 'decryptedData'},
      {cipher: 'cipher2', iv: 'iv2', key: 'key2', text: 'decryptedData'},
    ]);
  });
});
